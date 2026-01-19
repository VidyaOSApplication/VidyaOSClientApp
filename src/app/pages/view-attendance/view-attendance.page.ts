import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

interface AttendanceStudent {
  rollNo: number;
  admissionNo: string;
  fullName: string;
  status: 'Present' | 'Absent' | 'Leave' | 'NotMarked';

}

interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  leave: number;
  notMarked: number;
}

@Component({
  selector: 'app-view-attendance',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './view-attendance.page.html',
  styleUrls: ['./view-attendance.page.scss']
})
export class ViewAttendancePage implements OnInit {

  // 🔹 Filters
  date = '';
  today = '';
  classId!: number;
  sectionId!: number;

  // 🔹 Attendance data
  summary?: AttendanceSummary;
  students: AttendanceStudent[] = [];

  // 🔹 From Storage
  schoolId!: number;
  streamId: number | null = null;

  streams = [
    { id: 1, name: 'PCM' },
    { id: 2, name: 'PCB' },
    { id: 3, name: 'Commerce' },
    { id: 4, name: 'Arts' }
  ];

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    // Date setup
    const localDate = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    );

    this.today = localDate.toISOString().split('T')[0];
    this.date = this.today;

    // Load schoolId from storage
    await this.loadSchoolId();
  }
  ngOnChanges() {
    if (this.classId !== 11 && this.classId !== 12) {
      this.streamId = null;
    }
  }

  // ✅ Read schoolId from Capacitor Storage
  async loadSchoolId() {
    const { value } = await Preferences.get({
      key: 'user_profile'
    });

    if (!value) {
      this.showToast('User profile not found. Please login again.');
      return;
    }

    const profile = JSON.parse(value);
    this.schoolId = profile.schoolId;

    console.log('✅ School ID loaded:', this.schoolId);
  }

  async viewAttendance() {
    if (!this.date || !this.classId || !this.sectionId) {
      this.showToast('Please select date, class and section');
      return;
    }

    if (!this.schoolId) {
      this.showToast('School not identified');
      return;
    }
    if ((this.classId === 11 || this.classId === 12) && !this.streamId) {
      this.showToast('Please select stream for class 11/12');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Loading attendance...'
    });
    await loading.present();

    this.http.get<any>(
      `https://localhost:7201/api/School/ViewAttendance`,
      {
        params: {
          schoolId: this.schoolId,
          classId: this.classId,
          sectionId: this.sectionId,
          date: this.date,
          streamId:
            (this.classId === 11 || this.classId === 12)
              ? this.streamId!
              : ''
        }
      }
    ).subscribe({
      next: res => {
        this.summary = res.summary;
        this.students = res.students || [];
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.showToast('Failed to load attendance');
      }
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'Present': return 'success';
      case 'Absent': return 'danger';
      case 'Leave': return 'warning';
      default: return 'medium';
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
