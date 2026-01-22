import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generate-monthly-fee',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './generate-monthly-fee.page.html',
  styleUrls: ['./generate-monthly-fee.page.scss']
})
export class GenerateMonthlyFeePage implements OnInit {

  loading = false;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  years: number[] = [];

  form = {
    schoolId: 0,
    month: null as number | null,
    year: null as number | null
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    // 🔑 SchoolId from logged-in admin
    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      this.form.schoolId = JSON.parse(profile.value).schoolId;
    }

    // 📅 Current + next year
    const currentYear = new Date().getFullYear();
    this.years = [currentYear, currentYear + 1];
  }

  generateFee() {
    if (!this.form.month || !this.form.year) {
      this.showToast('Please select month and year', 'danger');
      return;
    }

    this.loading = true;

    const payload = {
      schoolId: this.form.schoolId,
      feeMonth: this.form.year + '-' + this.form.month
    };

    this.http
      .post<any>(
        `${environment.apiBaseUrl}/School/GenerateMonthlyFee`,
        payload
      )
      .subscribe({
        next: async (res) => {
          this.loading = false;

          const data = res.data;

          const alert = await this.alertCtrl.create({
            header: '✅ Fee Generated',
            message: `
              Month: ${data.feeMonth}
              Fees Generated: ${data.feesGenerated}
              Already Exists: ${data.skipped}
            `,
            buttons: ['OK']
          });

          await alert.present();
        },
        error: () => {
          this.loading = false;
          this.showToast('Failed to generate monthly fee', 'danger');
        }
      });
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
