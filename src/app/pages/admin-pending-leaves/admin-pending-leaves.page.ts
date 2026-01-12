import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-admin-pending-leaves',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './admin-pending-leaves.page.html',
  styleUrls: ['./admin-pending-leaves.page.scss']
})
export class AdminPendingLeavesPage implements OnInit {

  loading = false;
  leaves: any[] = [];
  schoolId = 0;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      this.schoolId = JSON.parse(profile.value).schoolId;
      this.loadPendingLeaves();
    }
  }

  loadPendingLeaves() {
    this.loading = true;

    this.http.get<any>(
      `https://localhost:7201/api/School/GetPendingLeaves?schoolId=${this.schoolId}`
    ).subscribe({
      next: (res) => {
        this.leaves = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load pending leaves', 'danger');
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
    toast.present();
  }
}
