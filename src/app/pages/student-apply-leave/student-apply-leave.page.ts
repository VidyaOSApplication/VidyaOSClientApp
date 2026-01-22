import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './student-apply-leave.page.html',
  styleUrls: ['./student-apply-leave.page.scss']
})
export class StudentApplyLeavePage implements OnInit {

  submitting = false;
  submitted = false;

  form = {
    schoolId: 0,
    studentId: 0,
    fromDate: '',
    toDate: '',
    reason: ''
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });

    if (profile.value) {
      const user = JSON.parse(profile.value);
      this.form.schoolId = user.schoolId;
      this.form.studentId = user.userId;
    }
  }

  // ---------- VALIDATIONS ----------
  isInvalid(field: string): boolean {
    return this.submitted && !this.form[field as keyof typeof this.form];
  }

  isInvalidDateRange(): boolean {
    if (!this.form.fromDate || !this.form.toDate) return false;
    return new Date(this.form.fromDate) > new Date(this.form.toDate);
  }

  // ---------- SUBMIT ----------
  submit() {
    this.submitted = true;

    if (
      !this.form.schoolId ||
      !this.form.studentId ||
      !this.form.fromDate ||
      !this.form.toDate ||
      !this.form.reason
    ) {
      this.showToast('Please fill all required fields', 'danger');
      return;
    }

    if (this.isInvalidDateRange()) {
      this.showToast('From date cannot be after To date', 'danger');
      return;
    }

    this.submitting = true;

    const payload = {
      ...this.form,
      fromDate: new Date(this.form.fromDate).toISOString(),
      toDate: new Date(this.form.toDate).toISOString()
    };

    this.http.post(
      `${environment.apiBaseUrl}/School/ApplyLeave`,
      payload
    ).subscribe({
      next: () => {
        this.submitting = false;
        this.showToast('Leave applied successfully', 'success');
        this.resetForm();
      },
      error: () => {
        this.submitting = false;
        // global interceptor handles message
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.form.fromDate = '';
    this.form.toDate = '';
    this.form.reason = '';
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
