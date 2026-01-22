import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schedule-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './schedule-exam.page.html'
})
export class ScheduleExamPage implements OnInit {

  examId!: number;
  classId!: number;
  schoolId!: number;
  subjects: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    const profile = await Preferences.get({ key: 'user_profile' });
    if (!profile.value) {
      this.showError('User session expired');
      return;
    }

    this.schoolId = JSON.parse(profile.value).schoolId;

    this.loadSubjects();
  }

  trackById(_: number, item: any) {
    return item.subjectId;
  }

  loadSubjects() {
    this.http.get<any>(
      `${environment.apiBaseUrl}/Exam/GetSubjectsForSchedule`,
      {
        params: {
          examId: this.examId,
          classId: this.classId
        }
      }
    ).subscribe(res => {
      const today = new Date().toISOString().slice(0, 10);

      this.subjects = (res.data || []).map((s: any) => ({
        subjectId: s.subjectId,
        subjectName: s.subjectName,
        examDate: s.examDate ?? today,
        maxMarks: s.maxMarks ?? 100
      }));
    });
  }

  async save() {
    await this.http.post(
      `${environment.apiBaseUrl}/Exam/ScheduleExam`,
      {
        examId: this.examId,
        classId: this.classId,
        schoolId: this.schoolId,
        subjects: this.subjects
      }
    ).toPromise();

    (await this.toast.create({
      message: 'Schedule saved successfully',
      color: 'success',
      duration: 2000
    })).present();
  }

  async showError(message: string) {
    const t = await this.toast.create({
      message,
      color: 'danger',
      duration: 2000
    });
    await t.present();
  }
}
