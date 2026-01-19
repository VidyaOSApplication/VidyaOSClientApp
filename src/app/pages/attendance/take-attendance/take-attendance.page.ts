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

  // 🔐 From storage
  schoolId!: number;
  markedByUserId!: number;

  // 🔎 Filters
  classId!: number;
  sectionId!: number;
  streamId: number | null = null; // ✅ ONLY for 11 & 12

  hasSearched = false;
  loading = false;
  saving = false;

  classes: number[] = [];
  students: any[] = [];

  // ✅ Static streams (can be API later)
  streams = [
    { id: 1, name: 'PCM' },
    { id: 2, name: 'PCB' },
    { id: 3, name: 'Commerce' },
    { id: 4, name: 'Arts' }
  ];

  constructor(
    private attendanceService: TeacherService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  // ---------- INIT ----------
  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolId = profile.schoolId;
      this.markedByUserId = profile.userId;
    }

    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  // 🔁 Reset stream when class changes
  onClassChange() {
    if (this.classId !== 11 && this.classId !== 12) {
      this.streamId = null;
    }
  }

  // ---------- DATE ----------
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // ---------- LOAD STUDENTS ----------
  takeAttendance() {
    console.log(this.streamId);
    if (!this.classId || !this.sectionId) return;

    // 🚫 Stream mandatory for 11 & 12
    if ((this.classId === 11 || this.classId === 12) && !this.streamId) {
      this.showToast('Please select stream', 'danger');
      return;
    }

    this.loading = true;
    this.hasSearched = true;

    this.attendanceService.getStudents(
      this.schoolId,
      this.classId,
      this.sectionId,
      this.getTodayDate(),
      (this.classId === 11 || this.classId === 12) ? this.streamId : null
    ).subscribe({
      next: (res) => {
        this.students = res.students ?? [];
        console.log(this.students);
        this.loading = false;
      },
      error: () => {
        this.students = [];
        this.loading = false;
        this.showToast('Failed to load students', 'danger');
      }
    });
  }

  // ---------- SAVE ATTENDANCE ----------
  saveAttendance() {
    if (!this.students.length) return;

    this.saving = true;

    const records = this.students
      .filter(s => s.isEditable) // ❌ exclude leave students
      .map(s => ({
        userId: s.userId,
        status: s.status // Present / Absent
      }));

    const payload: any = {
      schoolId: this.schoolId,
      classId: this.classId,
      sectionId: this.sectionId,
      attendanceDate: this.getTodayDate(),
      markedByUserId: this.markedByUserId,
      records
    };

    // ✅ Send stream only for 11/12
    if (this.classId === 11 || this.classId === 12) {
      payload.streamId = this.streamId;
    }

    this.attendanceService.markAttendance(payload).subscribe({
      next: async () => {
        this.saving = false;
        await this.showToast('Attendance saved successfully', 'success');
      },
      error: async () => {
        this.saving = false;
        await this.showErrorAlert('Failed to save attendance. Please try again.');
      }
    });
  }

  // ---------- TOGGLE ----------
  onToggle(student: any, event: any) {
    student.status = event.detail.checked ? 'Present' : 'Absent';
  }

  // ---------- UI ----------
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
