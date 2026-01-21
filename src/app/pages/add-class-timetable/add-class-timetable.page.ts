import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-class-timetable',
  standalone: true,
  templateUrl: './add-class-timetable.page.html',
  styleUrls: ['./add-class-timetable.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ]
})
export class AddClassTimetablePage {

  // 🔧 APIs
  private subjectApi =
    'https://localhost:7201/api/School/GetSubjectsForClassSection';

  private timetableApi =
    'https://localhost:7201/api/School/CreateClassTimetable';

  // 🔢 Fixed values
  schoolId = 17;
  academicYear = '2025-26';
  effectiveFrom = '2025-06-01';

  // 🔢 Selections
  classId!: number;
  sectionId!: number;
  subjectId!: number;
  dayOfWeek!: number;
  periodNo!: number;
  startTime = '';
  endTime = '';

  // 📦 Data
  subjects: { subjectId: number; subjectName: string }[] = [];

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) { }

  // 🔹 Load subjects when class OR section changes
  loadSubjects() {
    this.subjectId = undefined!;
    this.subjects = [];
    this.errorMessage = '';

    if (!this.classId || !this.sectionId) return;

    const url =
      `${this.subjectApi}` +
      `?schoolId=${this.schoolId}` +
      `&classId=${this.classId}` +
      `&sectionId=${this.sectionId}`;

    this.http.get<any>(url).subscribe({
      next: res => {
        this.subjects = res?.data ?? [];
      },
      error: () => {
        this.errorMessage = 'Failed to load subjects';
      }
    });
  }

  // 🔹 Save timetable
  saveTimetable() {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.classId ||
      !this.sectionId ||
      !this.subjectId ||
      !this.dayOfWeek ||
      !this.periodNo ||
      !this.startTime ||
      !this.endTime
    ) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const payload = {
      schoolId: this.schoolId,
      classId: this.classId,
      sectionId: this.sectionId,
      subjectId: this.subjectId,
      dayOfWeek: this.dayOfWeek,
      periodNo: this.periodNo,
      startTime: this.startTime,
      endTime: this.endTime,
      effectiveFrom: this.effectiveFrom,
      academicYear: this.academicYear
    };

    this.loading = true;

    this.http.post<any>(this.timetableApi, payload).subscribe({
      next: () => {
        this.successMessage = 'Timetable added successfully';
        this.loading = false;
      },
      error: err => {
        this.errorMessage =
          err?.error?.message || 'Failed to save timetable';
        this.loading = false;
      }
    });
  }
}
