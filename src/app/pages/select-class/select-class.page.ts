// select-class.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-select-class',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './select-class.page.html'
})
export class SelectClassPage implements OnInit {

  examId!: number;
  schoolId!: number;
  classes: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));

    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;

    this.loadClasses();
  }

  loadClasses() {
    this.loading = true;

    this.http.get<any>(
      'https://localhost:7201/api/Exam/GetExams',
      { params: { schoolId: this.schoolId } }
    ).subscribe(res => {
      const exam = res.data?.find((e: any) => e.examId === this.examId);
      this.classes = exam?.classes || [];
      this.loading = false;
    });
  }

  selectClass(classId: number) {
    // 🔥 ALWAYS GO TO SELECT SUBJECT FOR MARKS
    this.router.navigate([
      'admin/select-subject',
      this.examId,
      classId
    ]);
  }
}
