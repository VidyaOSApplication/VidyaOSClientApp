import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-enter-marks',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './enter-marks.page.html',
  styleUrls: ['./enter-marks.page.scss']
})
export class EnterMarksPage implements OnInit {

  examId!: number;
  classId!: number;
  schoolId!: number;

  subjects: any[] = [];
  students: any[] = [];
  subjectId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    // ✅ CORRECT WAY (Capacitor Preferences)
    const profile = await Preferences.get({ key: 'user_profile' });
    if (!profile.value) {
      this.showError('User session expired');
      return;
    }

    this.schoolId = JSON.parse(profile.value).schoolId;

    this.loadSubjects();
  }

  loadSubjects() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetSubjectsForMarks',
      {
        params: {
          examId: this.examId,
          classId: this.classId
        }
      }
    ).subscribe({
      next: res => {
        console.log(res.data.subjects);
        this.subjects = res.data.subjects || [];
      },
      error: err => {
        console.error(err);
      }
    });
  }


  loadStudents() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetStudentsForMarks',
      {
        params: {
          examId: this.examId,
          classId: this.classId,
          subjectId: this.subjectId,
          schoolId: this.schoolId
        }
      }
    ).subscribe({
      next: res => {
        console.log(res);
        this.students = res.students || [];
      },
      error: () => {
        this.showError('Failed to load students');
      }
    });
  }

  save() {

    const payload = {
      examId: this.examId,
      classId: this.classId,
      subjectId: this.subjectId,
      schoolId: this.schoolId,
      marks: this.students.map(s => ({
        studentId: s.studentId,
        isAbsent: s.isAbsent ?? false,
        marksObtained: (s.isAbsent)
          ? null
          : (s.marksObtained ?? 0)   // ✅ CRITICAL FIX
      }))
    };

    console.log('Save payload:', payload);

    this.http.post<any>(
      'https://localhost:7201/api/Exam/SaveMarks',
      payload
    ).subscribe({
      next: res => {
        //console.log('Save success', res);
        this.showSuccess("Marks saved successfully")
      },
      error: err => {
        this.showError("some error occured while saving marks")
        console.error('Save failed', err.error);
      }
    });
  }



  async showError(message: string) {
    const t = await this.toast.create({
      message,
      color: 'danger',
      duration: 2000
    });
    t.present();
  }

  async showSuccess(message: string) {
    const t = await this.toast.create({
      message,
      color: 'success',
      duration: 2000
    });
    t.present();
  }
}
