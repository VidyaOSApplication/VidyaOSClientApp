import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './exam-list.page.html',
  styleUrls: ['./exam-list.page.scss']
})
export class ExamListPage implements OnInit {

  exams: any[] = [];
  loading = false;
  schoolId = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;
    this.loadExams();
  }

  loadExams() {
    this.loading = true;

    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetExams',
      { params: { schoolId: this.schoolId } }
    ).subscribe({
      next: res => {
        this.exams = res.data || [];
        this.loading = false;
      },
      error: async () => {
        this.loading = false;
        (await this.toast.create({
          message: 'Failed to load exams',
          color: 'danger',
          duration: 2000
        })).present();
      }
    });
  }

  goToAssignSubjects(exam: any) {
    this.router.navigate(['admin/select-class', exam.examId]);
  }

  goToEnterMarks(exam: any) {
    this.router.navigate(['admin/select-class', exam.examId]);
  }


  getStatusColor(status: string) {
    switch (status) {
      case 'Draft': return 'medium';
      case 'Subjects Assigned': return 'warning';
      case 'Marks Entered': return 'primary';
      default: return 'medium';
    }
  }
}
