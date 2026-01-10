import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StudentCredentialsModal } from '../../modals/student-credentials/student-credentials.modal';



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


  // ---------- FIELD VALIDATIONS ----------
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
    const month = today.getMonth() + 1; // Jan = 1

    let currentStartYear: number;

    // Academic year starts in April
    if (month >= 4) {
      currentStartYear = year;
    } else {
      currentStartYear = year - 1;
    }

    const currentAcademic =
      `${currentStartYear}-${(currentStartYear + 1).toString().slice(2)}`;

    const nextAcademic =
      `${currentStartYear + 1}-${(currentStartYear + 2).toString().slice(2)}`;

    this.academicYears = [currentAcademic, nextAcademic];

    // 🔥 Default select current academic year
    this.form.academicYear = currentAcademic;
  }


  // ---------- SUBMIT ----------
  submit() {
    this.submitted = true;

    // REQUIRED FIELD CHECK
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

    // DOB VALIDATION
    if (this.isInvalidDOB()) {
      this.showToast(
        'Student must be at least 3 years old and DOB cannot be future',
        'danger'
      );
      return;
    }

    // PHONE VALIDATION
    if (!this.mobileRegex.test(this.form.parentPhone)) {
      this.showToast('Invalid parent phone number', 'danger');
      return;
    }

    // ✅ ALL VALID — START LOADER
    this.saving = true;

    const payload = {
      ...this.form,
      dob: new Date(this.form.dob).toISOString(),
      admissionDate: new Date(this.form.admissionDate).toISOString()
    };

    this.http
      .post<any>('https://localhost:7201/api/Students/RegisterStudent', payload)
      .subscribe({
        next: async (res) => {
          this.saving = false;

          // ✅ OPEN SUCCESS MODAL
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
  async showSuccessAlert(admissionNo: string, username: string, password: string) {
    const alert = await this.alertCtrl.create({
      header: '🎉 Student Registered',
      backdropDismiss: false,
      message: `
      <div style="text-align:left; font-size:14px">
        <p><strong>Admission No:</strong> ${admissionNo}</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
        <hr/>
        <p style="color:#d97706; font-weight:600">
          ⚠ Please note down these details for future reference.
        </p>
      </div>
    `,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        }
      ]
    });

    await alert.present();
  }
  async showWarningAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: '⚠ Registration Warning',
      backdropDismiss: false,
      cssClass: 'warning-alert',
      message: `
      <div style="text-align:left">
        <p>${message}</p>
        <hr/>
        <p style="color:#b45309; font-weight:600">
          Please verify the student details and try again.
        </p>
      </div>
    `,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        }
      ]
    });

    await alert.present();
  }



  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color
    });
    toast.present();
  }
}
