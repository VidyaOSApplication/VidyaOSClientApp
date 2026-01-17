import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
  schoolId!: number;

  subjects: any[] = [];
  selectedSubjects: any[] = [];

  saving = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    const profile = await this.authService.getStoredProfile();
    if (profile) {
      this.schoolId = profile.schoolId;
    }

    this.loadData();
  }

  loadData() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetExamToAddSubjects',
      {
        params: {
          examId: this.examId,
          classId: this.classId,
          schoolId: this.schoolId
        }
      }
    ).subscribe(res => {
      this.examName = res.data?.examName || '';
      this.subjects = res.data?.subjects || [];
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

  async save() {
    if (this.selectedSubjects.length === 0) {
      (await this.toast.create({
        message: 'Please select at least one subject',
        color: 'danger',
        duration: 2000
      })).present();
      return;
    }

    this.saving = true;

    try {
      await this.http.post(
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
      ).toPromise();

      (await this.toast.create({
        message: 'Subjects assigned successfully',
        color: 'success',
        duration: 1500
      })).present();

      // ✅ REDIRECT TO EXAM LIST
      setTimeout(() => {
        this.router.navigateByUrl('/admin/exam-list');
      }, 500);

    } catch {
      (await this.toast.create({
        message: 'Failed to assign subjects',
        color: 'danger',
        duration: 2000
      })).present();
    } finally {
      this.saving = false;
    }
  }
}
