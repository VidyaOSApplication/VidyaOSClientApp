import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './exam-list.page.html',
  styleUrls: ['./exam-list.page.scss']
})
export class ExamListPage implements OnInit {

  exams: any[] = [];
  schoolId!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    const profile = JSON.parse(
      (await Preferences.get({ key: 'user_profile' })).value!
    );
    this.schoolId = profile.schoolId;
    this.load();
  }

  load() {
    this.http.get<any>(
      `${environment.apiBaseUrl}/Exam/GetExams`,
      { params: { schoolId: this.schoolId } }
    ).subscribe(res => {
      this.exams = res.data.map((e: any) => ({
        ...e,
        selectedClass: null   // 👈 REQUIRED
      }));
    });
  }

  openSchedule(exam: any) {
    if (!exam.selectedClass) {
      this.showToast('Please select class first', 'danger');
      return;
    }

    this.router.navigate([
      '/admin/schedule-exam',
      exam.examId,
      exam.selectedClass
    ]);
  }

  openMarks(exam: any) {
    if (!exam.selectedClass) {
      this.showToast('Please select class first', 'danger');
      return;
    }

    this.router.navigate([
      '/admin/enter-marks',
      exam.examId,
      exam.selectedClass
    ]);
  }

  declareResult(exam: any) {
    this.http.post(
      `${environment.apiBaseUrl}/Exam/DeclareResult`,
      { examId: exam.examId }
    ).subscribe(() => {
      this.showToast('Result declared', 'success');
      this.load();
    });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const t = await this.toast.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await t.present();
  }

  getStatusColor(status: string): 'primary' | 'warning' | 'success' | 'medium' {
    switch (status) {
      case 'Draft':
        return 'medium';
      case 'Subjects Assigned':
        return 'warning';
      case 'Marks Entered':
        return 'primary';
      case 'Result Declared':
        return 'success';
      default:
        return 'medium';
    }
  }
}
