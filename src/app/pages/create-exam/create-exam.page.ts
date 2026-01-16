import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.page.html',
  styleUrls: ['./create-exam.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CreateExamPage implements OnInit {

  classes: number[] = [];
  selectedClasses: number[] = [];

  examName = '';
  examType = 'Midterm';      // ✅ ADD THIS
  examDate = '';             // ✅ ADD THIS
  academicYear = '';
  schoolId = 0;
  saving = false;

  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);

    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;

    const y = new Date().getFullYear();
    this.academicYear = `${y}-${(y + 1).toString().slice(2)}`;
  }

  toggleClass(cls: number, checked: boolean) {
    checked
      ? this.selectedClasses.push(cls)
      : this.selectedClasses = this.selectedClasses.filter(c => c !== cls);
  }

  createExam() {
    if (!this.examName || !this.examDate || this.selectedClasses.length === 0) {
      this.showToast('Fill all required fields', 'danger');
      return;
    }

    this.saving = true;

    const payload = {
      schoolId: this.schoolId,
      examName: this.examName,
      examType: this.examType,     // ✅ USED
      examDate: this.examDate,     // ✅ USED
      academicYear: this.academicYear,
      classIds: this.selectedClasses
    };

    this.http.post<any>(
      'https://localhost:7201/api/Exam/CreateExam',
      payload
    ).subscribe({
      next: async () => {
        this.saving = false;
        await this.showToast('Exam created successfully', 'success');
        this.router.navigateByUrl('admin/exam-list');
      },
      error: async () => {
        this.saving = false;
        await this.showToast('Failed to create exam', 'danger');
      }
    });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const t = await this.toast.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    t.present();
  }
}
