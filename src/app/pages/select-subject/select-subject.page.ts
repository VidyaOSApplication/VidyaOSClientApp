import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-select-subject',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './select-subject.page.html'
})
export class SelectSubjectPage implements OnInit {

  examId!: number;
  classId!: number;
  subjects: any[] = [];
  schoolId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService:AuthService
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolId = profile.schoolId; // 👈 from API
    }

    this.loadSubjects();
  }

  loadSubjects() {
    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetAssignedSubjects',
      {
        params: {
          examId: this.examId,
          classId: this.classId,
          schoolId: this.schoolId
        }
      }
    ).subscribe(res => {
      this.subjects = res.data.subjects || [];
    });
  }

  selectSubject(subject: any) {
    this.router.navigate([
      'admin/enter-marks',
      this.examId,
      this.classId,
      subject.subjectId
    ]);
  }
}
