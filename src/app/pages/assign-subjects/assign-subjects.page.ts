import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './assign-subjects.page.html'
})
export class AssignSubjectsPage implements OnInit {

  examId!: number;
  classId!: number;
  examName = '';

  subjects: any[] = [];
  selectedSubjects: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.loadData();
  }

  loadData() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetExamToAddSubjects',
      {
        params: {
          examId: this.examId,
          classId: this.classId
        }
      }
    ).subscribe(res => {
      this.examName = res.data.examName;
      this.subjects = res.data.subjects || [];
    });
  }

  addSubject(s: any) {
    if (this.selectedSubjects.some(x => x.subjectId === s.subjectId)) return;

    this.selectedSubjects.push({
      subjectId: s.subjectId,
      subjectName: s.subjectName,
      examDate: new Date().toISOString().substring(0, 10),
      maxMarks: 100
    });
  }

  save() {
    this.http.post(
      'https://localhost:7201/api/Exam/AddExamSubjects',
      {
        examId: this.examId,
        classId: this.classId,
        subjects: this.selectedSubjects.map(s => ({
          subjectId: s.subjectId,
          examDate: s.examDate,
          maxMarks: s.maxMarks
        }))
      }
    ).subscribe(async () => {
      (await this.toast.create({
        message: 'Subjects assigned',
        color: 'success',
        duration: 2000
      })).present();
    });
  }
}
