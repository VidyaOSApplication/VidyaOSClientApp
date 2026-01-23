import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.page.html',
  styleUrls: ['./register-school.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  standalone: true
})
export class RegisterSchoolPage {

  registerForm: FormGroup;
  apiUrl = 'https://localhost:7201/api/School/RegisterSchool'; // change in prod

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.fb.group({
      schoolName: ['', Validators.required],
      schoolCode: ['', Validators.required],
      boardType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adminUsername: ['', Validators.required],
      adminPassword: ['', [Validators.required, Validators.minLength(6)]],
      registrationNumber: ['', Validators.required],
      affiliationNumber: [''],
      yearOfFoundation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  async registerSchool() {

    if (this.registerForm.invalid) {
      this.showToast('Please fill all required fields properly');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registering school...'
    });
    await loading.present();

    this.http.post<any>(this.apiUrl, this.registerForm.value)
      .subscribe({
        next: async (res) => {
          await loading.dismiss();

          if (res.success) {
            this.showToast('School registered successfully!');
            this.registerForm.reset();
          } else {
            this.showToast(res.message || 'Registration failed');
          }
        },
        error: async (err) => {
          await loading.dismiss();

          if (err.status === 0) {
            this.showToast('Server not reachable. Please check backend.');
          } else {
            this.showToast(err.error?.message || 'Something went wrong');
          }
        }
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }
}
