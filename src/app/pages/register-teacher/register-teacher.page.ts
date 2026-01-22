import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { TeacherCredentialsModal } from '../../modals/teacher-credentials/teacher-credentials.modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register-teacher.page.html',
  styleUrls: ['./register-teacher.page.scss']
})
export class RegisterTeacherPage implements OnInit {

  // 🔄 UI state
  saving = false;
  submitted = false;

  // 📞 Same regex as backend
  mobileRegex = /^[6-9]\d{9}$/;

  // 🧾 Form model
  form: any = {
    schoolId: 0,
    fullName: '',
    phone: '',
    email: '',
    joiningDate: '',
    qualification: ''
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  // 🚀 INIT
  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });

    if (profile.value) {
      const parsed = JSON.parse(profile.value);
      this.form.schoolId = parsed.schoolId;
    }
  }

  // 📨 SUBMIT
  submit() {
    this.submitted = true;

    if (
      !this.form.schoolId ||
      !this.form.fullName ||
      !this.form.phone ||
      !this.form.joiningDate
    ) {
      this.showToast('Please fill all required fields', 'danger');
      return;
    }

    if (!this.mobileRegex.test(this.form.phone)) {
      this.showToast('Invalid phone number', 'danger');
      return;
    }

    this.saving = true;

    const payload = {
      schoolId: this.form.schoolId,
      fullName: this.form.fullName.trim(),
      phone: this.form.phone.trim(),
      email: this.form.email || null,
      joiningDate: this.form.joiningDate,
      qualification: this.form.qualification || null
    };

    this.http.post<any>(
      `${environment.apiBaseUrl}/Teacher/RegisterTeacher`,
      payload
    ).subscribe({
      next: async (res) => {
        this.saving = false;

        if (res?.success && res?.data) {
          const modal = await this.modalCtrl.create({
            component: TeacherCredentialsModal,
            componentProps: {
              fullName: res.data.fullName,
              username: res.data.username,
              password: res.data.tempPassword
            },
            backdropDismiss: false
          });

          await modal.present();
          this.resetForm();
        }
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  // 🔁 RESET FORM
  resetForm() {
    this.form = {
      ...this.form,
      fullName: '',
      phone: '',
      email: '',
      joiningDate: '',
      qualification: ''
    };
    this.submitted = false;
  }

  // 🔔 TOAST
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3500,
      position: 'top',
      color
    });
    await toast.present();
  }
}
