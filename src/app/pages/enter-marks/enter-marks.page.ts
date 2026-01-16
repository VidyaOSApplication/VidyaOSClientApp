import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

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
  schoolId!: number;

  students: any[] = [];
  marks: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.subjectId = Number(this.route.snapshot.paramMap.get('subjectId'));

    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;

    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any>(
      'https://localhost:7201/api/Student/GetStudentsByClass',
      { params: { classId: this.classId } }
    ).subscribe(res => {
      this.students = res.data;
      this.marks = this.students.map((s: any) => ({
        studentId: s.studentId,
        subjectId: this.subjectId,
        marksObtained: 0,
        isAbsent: false
      }));
    });
  }

  saveMarks() {
    this.http.post(
      'https://localhost:7201/api/Exam/SaveMarks',
      {
        schoolId: this.schoolId,
        examId: this.examId,
        classId: this.classId,
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
