import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ModalController } from '@ionic/angular';
import { StudentCredentialsModal } from '../../modals/student-credentials/student-credentials.modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register-student.page.html',
  styleUrls: ['./register-student.page.scss']
})
export class RegisterStudentPage implements OnInit {

  saving = false;
  submitted = false;
  academicYears: string[] = [];

  mobileRegex = /^[6-9]\d{9}$/;

  classes: number[] = [];
  sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  form: any = {
    schoolId: 0,
    classId: null,
    sectionId: null,
    streamId: null,

    firstName: '',
    lastName: '',
    gender: '',

    dob: '',
    admissionDate: '',
    academicYear: '',

    parentPhone: '',
    fatherName: '',
    motherName: '',

    addressLine1: '',
    city: '',
    state: '',
    email: ''
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);
    this.generateAcademicYears();

    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      const parsed = JSON.parse(profile.value);
      this.form.schoolId = parsed.schoolId;
    }
  }

  // ---------- VALIDATIONS ----------
  isInvalid(field: string): boolean {
    return this.submitted && (!this.form[field] || this.form[field].toString().trim() === '');
  }

  isInvalidPhone(): boolean {
    return this.submitted && !this.mobileRegex.test(this.form.parentPhone);
  }

  isInvalidDOB(): boolean {
    if (!this.submitted || !this.form.dob) return false;

    const today = new Date();
    const dob = new Date(this.form.dob);

    if (dob > today) return true;

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age < 3;
  }

  generateAcademicYears() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startYear = month >= 4 ? year : year - 1;

    const currentAcademic =
      `${startYear}-${(startYear + 1).toString().slice(2)}`;
    const nextAcademic =
      `${startYear + 1}-${(startYear + 2).toString().slice(2)}`;

    this.academicYears = [currentAcademic, nextAcademic];
    this.form.academicYear = currentAcademic;
  }

  // ---------- SUBMIT ----------
  submit() {
    this.submitted = true;

    if (
      !this.form.schoolId ||
      !this.form.firstName ||
      !this.form.dob ||
      !this.form.classId ||
      !this.form.sectionId ||
      !this.form.academicYear ||
      !this.form.admissionDate ||
      !this.form.parentPhone
    ) {
      this.showToast('Please fill all required fields', 'danger');
      return;
    }

    if (this.isInvalidDOB()) {
      this.showToast(
        'Student must be at least 3 years old and DOB cannot be future',
        'danger'
      );
      return;
    }

    if (!this.mobileRegex.test(this.form.parentPhone)) {
      this.showToast('Invalid parent phone number', 'danger');
      return;
    }

    if (
      (this.form.classId === 11 || this.form.classId === 12) &&
      !this.form.streamId
    ) {
      this.showToast('Please select stream for class 11 / 12', 'danger');
      return;
    }

    this.saving = true;

    const payload = {
      ...this.form,
      dob: new Date(this.form.dob).toISOString(),
      admissionDate: new Date(this.form.admissionDate).toISOString()
    };

    this.http
      .post<any>(
        `${environment.apiBaseUrl}/Students/RegisterStudent`,
        payload
      )
      .subscribe({
        next: async (res) => {
          this.saving = false;

          const modal = await this.modalCtrl.create({
            component: StudentCredentialsModal,
            componentProps: {
              admissionNo: res.data.admissionNo,
              username: res.data.username,
              password: res.data.tempPassword
            },
            backdropDismiss: false
          });

          await modal.present();
          this.resetForm();
        },
        error: (err) => {
          this.saving = false;

          const msg =
            err?.error?.message ||
            'Student already exists with same name, date of birth and parent mobile number.';

          this.showToast(msg, 'danger');
        }
      });
  }

  resetForm() {
    this.submitted = false;
    this.form = {
      ...this.form,
      classId: null,
      sectionId: null,
      streamId: null,
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      admissionDate: '',
      academicYear: '',
      parentPhone: '',
      fatherName: '',
      motherName: '',
      addressLine1: '',
      city: '',
      state: '',
      email: ''
    };
  }

  onClassChange() {
    if (this.form.classId !== 11 && this.form.classId !== 12) {
      this.form.streamId = null;
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color
    });
    await toast.present();
  }
}
