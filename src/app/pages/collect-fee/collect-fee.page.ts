import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  AlertController,
  ToastController
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collect-fee',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './collect-fee.page.html',
  styleUrls: ['./collect-fee.page.scss']
})
export class CollectFeePage implements OnInit {

  // ---------- STATE ----------
  loading = false;
  saving = false;

  schoolId = 0;

  classes: number[] = [];
  sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  classId: number | null = null;
  sectionId: number | null = null;

  students: any[] = [];
  selectedStudent: any = null;
  showStudentList = false;

  fees: any[] = [];
  selectedMonths: string[] = [];

  paymentMode = 'Cash';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  // ---------- INIT ----------
  async ngOnInit() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);

    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      this.schoolId = JSON.parse(profile.value).schoolId;
    }
  }

  // ---------- LOAD STUDENTS ----------
  loadStudents() {
    this.students = [];
    this.selectedStudent = null;
    this.fees = [];
    this.selectedMonths = [];
    this.showStudentList = true;

    if (!this.classId || !this.sectionId) return;

    this.http.get<any>(
      `${environment.apiBaseUrl}/School/GetStudentsByClassSection`,
      {
        params: {
          schoolId: this.schoolId,
          classId: this.classId,
          sectionId: this.sectionId
        }
      }
    ).subscribe({
      next: (res) => {
        this.students = res.data || [];
      },
      error: () => {
        this.showToast('Failed to load students', 'danger');
      }
    });
  }

  // ---------- SELECT STUDENT ----------
  loadFees(student: any) {
    this.selectedStudent = student;
    this.showStudentList = false;
    this.fees = [];
    this.selectedMonths = [];
    this.loading = true;

    this.http.get<any>(
      `${environment.apiBaseUrl}/School/GetStudentFeeHistory?studentId=${student.studentId}`
    ).subscribe({
      next: (res) => {
        this.fees = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load fees', 'danger');
      }
    });
  }

  changeStudent() {
    this.selectedStudent = null;
    this.fees = [];
    this.selectedMonths = [];
    this.showStudentList = true;
  }

  // ---------- MONTH SELECTION ----------
  toggleMonth(month: string, checked: boolean) {
    if (checked) {
      if (!this.selectedMonths.includes(month)) {
        this.selectedMonths.push(month);
      }
    } else {
      this.selectedMonths = this.selectedMonths.filter(m => m !== month);
    }
  }

  get totalAmount(): number {
    return this.fees
      .filter(f => this.selectedMonths.includes(f.feeMonth))
      .reduce((sum, f) => sum + f.amount, 0);
  }

  // ---------- COLLECT FEE ----------
  collectFee() {
    if (!this.selectedStudent || this.selectedMonths.length === 0) {
      this.showToast('Select at least one pending month', 'danger');
      return;
    }

    this.saving = true;

    const payload = {
      schoolId: this.schoolId,
      studentId: this.selectedStudent.studentId,
      feeMonths: this.selectedMonths,
      paymentMode: this.paymentMode
    };

    this.http.post<any>(
      `${environment.apiBaseUrl}/School/CollectFees`,
      payload
    ).subscribe({
      next: async (res) => {
        this.saving = false;
        await this.showSuccess(res.data);
        this.loadFees(this.selectedStudent);
      },
      error: () => {
        this.saving = false;
        this.showToast('Failed to collect fee', 'danger');
      }
    });
  }

  // ---------- UI ----------
  async showSuccess(data: any) {
    const alert = await this.alertCtrl.create({
      header: '💰 Fee Collected',
      backdropDismiss: false,
      message: `
        ${data.receiptNo}
        ${data.paidMonths.join(', ')}
        ${data.totalAmount}
        Payment successful
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  formatMonth(month: string): string {
    const [year, m] = month.split('-').map(Number);
    const date = new Date(year, m - 1);
    return date.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }

  async showToast(msg: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
