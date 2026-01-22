import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enter-marks',
  templateUrl: './enter-marks.page.html',
  styleUrls: ['./enter-marks.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EnterMarksPage implements OnInit {

  examId!: number;
  classId!: number;
  schoolId!: number;
  subjectId!: number;

  subjects: any[] = [];
  students: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;

    this.loadSubjects();
  }

  loadSubjects() {
    this.http.get<any>(
      `${environment.apiBaseUrl}/Exam/GetSubjectsForMarks`,
      {
        params: {
          examId: this.examId,
          classId: this.classId
        }
      }
    ).subscribe(res => {
      this.subjects = res.data.subjects || [];
    });
  }

  loadStudents() {
    this.http.get<any>(
      `${environment.apiBaseUrl}/Exam/GetStudentsForMarks`,
      {
        params: {
          examId: this.examId,
          classId: this.classId,
          subjectId: this.subjectId,
          schoolId: this.schoolId
        }
      }
    ).subscribe(res => {
      this.students = (res.students || []).map((s: any) => ({
        ...s,
        marksObtained: s.marksObtained ?? null,
        isAbsent: s.isAbsent ?? false
      }));
    });
  }

  save() {
    const payload = {
      examId: this.examId,
      classId: this.classId,
      subjectId: this.subjectId,
      schoolId: this.schoolId,

      // 🔥 CORE FIX (skip empty students)
      marks: this.students
        .filter(s => s.isAbsent || s.marksObtained !== null)
        .map(s => ({
          studentId: s.studentId,
          isAbsent: s.isAbsent,
          marksObtained: s.isAbsent ? null : s.marksObtained
        }))
    };

    this.http.post(
      `${environment.apiBaseUrl}/Exam/SaveMarks`,
      payload
    ).subscribe({
      next: () => this.showToast('Marks saved successfully', 'success'),
      error: () => this.showToast('Something went wrong', 'danger')
    });
  }

  async showToast(message: string, color: string) {
    const t = await this.toast.create({
      message,
      color,
      duration: 2000
    });
    await t.present();
  }
}
