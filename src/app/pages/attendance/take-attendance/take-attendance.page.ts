import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../../core/services/teacher-service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-take-attendance',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './take-attendance.page.html',
  styleUrls: ['./take-attendance.page.scss']
})
export class TakeAttendancePage implements OnInit {

  schoolId!: number;          // 🔐 from storage
  classId!: number;
  sectionId!: number;
  hasSearched = false;
  markedByUserId!: number;
  saving = false;


  attendanceDate = new Date().toISOString().split('T')[0];

  classes: number[] = [];     // 1 → 12
  students: any[] = [];
  loading = false;

  constructor(
    private attendanceService: TeacherService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolId = profile.schoolId;
      this.markedByUserId = profile.userId; // 👈 VERY IMPORTANT
    }

    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  takeAttendance() {
    if (!this.classId || !this.sectionId) return;

    this.loading = true;
    this.hasSearched = true;


    this.attendanceService.getStudents(
      this.schoolId,
      this.classId,
      this.sectionId,
      this.attendanceDate
    ).subscribe({
      next: (res) => {
        this.students = res.students ?? [];
        this.loading = false;
      },
      error: () => {
        this.students = [];
        this.loading = false;
      }
    });
  }

  saveAttendance() {
  if (!this.students.length) return;

  this.saving = true;

  const records = this.students
    .filter(s => s.isEditable) // ❌ exclude leave students
    .map(s => ({
      userId: s.userId,
      status: s.status // Present / Absent
    }));

  const payload = {
    schoolId: this.schoolId,
    classId: this.classId,
    sectionId: this.sectionId,
    attendanceDate: this.attendanceDate,
    markedByUserId: this.markedByUserId,
    records
  };

  this.attendanceService.markAttendance(payload).subscribe({
    next: async () => {
      this.saving = false;
      await this.showSuccessToast('Attendance saved successfully');
    },
    error: async () => {
      this.saving = false;
      await this.showErrorAlert('Failed to save attendance. Please try again.');
    }
  });
}

  onToggle(student: any, event: any) {
    student.status = event.detail.checked ? 'Present' : 'Absent';
  }
  async showSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom',
      icon: 'checkmark-circle-outline'
    });

    await toast.present();
  }
  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK'],
      cssClass: 'error-alert'
    });

    await alert.present();
  }
}
