import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './schedule-exam.page.html'
})
export class ScheduleExamPage implements OnInit {

  examId!: number;
  classId!: number;

  subjects: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    console.log('ScheduleExam examId:', this.examId);
    console.log('ScheduleExam classId:', this.classId);

    this.loadSubjects();
  }
  trackById(_: number, item: any) {
    return item.subjectId;
  }

  loadSubjects() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetSubjectsForSchedule',
      {
        params: {
          examId: this.examId,
          classId: this.classId
        }
      }
    ).subscribe(res => {

      // 🔥 IMPORTANT: map to NEW objects (unfreezes ngModel)
      this.subjects = (res.data || []).map((s: any) => ({
        subjectId: s.subjectId,
        subjectName: s.subjectName,
        examDate: s.examDate,     // yyyy-MM-dd works
        maxMarks: s.maxMarks
      }));
    });
  }


  async save() {
    await this.http.post(
      'https://localhost:7201/api/Exam/ScheduleExam',
      {
        examId: this.examId,
        classId: this.classId,
        subjects: this.subjects
      }
    ).toPromise();

    (await this.toast.create({
      message: 'Schedule saved successfully',
      color: 'success',
      duration: 2000
    })).present();
  }
}
