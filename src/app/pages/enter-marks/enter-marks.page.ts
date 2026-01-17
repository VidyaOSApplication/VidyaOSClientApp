import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-enter-marks',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './enter-marks.page.html'
})
export class EnterMarksPage implements OnInit {

  examId!: number;
  classId!: number;
  subjectId!: number;

  students: any[] = [];
  marks: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.subjectId = Number(this.route.snapshot.paramMap.get('subjectId'));

    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;

    this.http.get<any[]>(
      'https://localhost:7201/api/Exam/GetStudentsForMarks',
      {
        params: {
          examId: this.examId,
          classId: this.classId,
          subjectId: this.subjectId
        }
      }
    ).subscribe({
      next: (res) => {
        this.students = res;
        this.marks = res.map(s => ({
          studentId: s.studentId,
          marksObtained: s.mark?.marksObtained ?? 0,
          isAbsent: s.mark?.isAbsent ?? false
        }));
        this.loading = false;
      },
      error: async () => {
        this.loading = false;
        (await this.toast.create({
          message: 'Failed to load students',
          color: 'danger',
          duration: 2000
        })).present();
      }
    });
  }

  saveMarks() {
    this.http.post(
      'https://localhost:7201/api/Exam/SaveMarks',
      {
        examId: this.examId,
        classId: this.classId,
        subjectId: this.subjectId,
        marks: this.marks
      }
    ).subscribe(async () => {
      (await this.toast.create({
        message: 'Marks saved',
        color: 'success',
        duration: 2000
      })).present();
    });
  }
}
