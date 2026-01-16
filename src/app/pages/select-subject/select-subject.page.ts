import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));

    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetExam',
      { params: { examId: this.examId } }
    ).subscribe(res => {
      this.subjects = res.Subjects.filter((x: any) => x.classId === this.classId);
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
