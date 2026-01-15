import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
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
  adminUserId = 0;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });

    if (profile.value) {
      const p = JSON.parse(profile.value);
      this.adminUserId = p.userId;   // 🔥 IMPORTANT
      this.schoolId = p.schoolId;
    }

    this.loadPendingLeaves();
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

  // 🔥 APPROVE / REJECT HANDLER
  async takeAction(leave: any, action: 'Approved' | 'Rejected') {
    var fromDate = new Date(leave.fromDate).toLocaleDateString();
    var toDate = new Date(leave.toDate).toLocaleDateString();
    const alert = await this.alertCtrl.create({
      header: action === 'Approved' ? 'Approve Leave?' : 'Reject Leave?',
      message: `
      ${leave.name}
      ${fromDate} → ${toDate}
      Are you sure you want to ${action.toLowerCase()}
    `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: action === 'Approved' ? 'Approve' : 'Reject',
          role: 'confirm',
          handler: () => {
            this.confirmLeaveAction(leave, action);
          }
        }
      ]
    });

    await alert.present();
  }




  confirmLeaveAction(leave: any, action: 'Approved' | 'Rejected') {

    const payload = {
      leaveId: leave.leaveId,
      adminUserId: this.adminUserId,
      action: action
    };

    console.log('Leave action payload:', payload);

    this.http.post(
      'https://localhost:7201/api/School/TakeLeaveAction',
      payload
    ).subscribe({
      next: () => {
        this.showToast(
          `Leave ${action.toLowerCase()} successfully`,
          'success'
        );

        // remove from list instantly
        this.leaves = this.leaves.filter(
          l => l.leaveId !== leave.leaveId
        );
      },
      error: () => {
        this.showToast('Failed to update leave status', 'danger');
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
