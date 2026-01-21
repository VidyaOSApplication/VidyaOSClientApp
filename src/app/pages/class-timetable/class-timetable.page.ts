import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-class-timetable',
  standalone: true,
  templateUrl: './class-timetable.page.html',
  styleUrls: ['./class-timetable.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule]
})
export class ClassTimetablePage {

  private apiUrl =
    'https://localhost:7201/api/School/GetClassTimetable';

  // 🔢 Selections (RESTORED)
  schoolId = 17;
  classId!: number;
  sectionId!: number;
  academicYear = '2025-26';

  // 📊 Raw API data
  timetable: any[] = [];

  // 🧾 Table view data
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  periods: number[] = [];
  table: any = {};

  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) { }

  loadTimetable() {
    if (!this.classId || !this.sectionId) {
      this.errorMessage = 'Please select class and section';
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    this.timetable = [];
    this.periods = [];
    this.table = {};

    const url =
      `${this.apiUrl}` +
      `?schoolId=${this.schoolId}` +
      `&classId=${this.classId}` +
      `&sectionId=${this.sectionId}` +
      `&academicYear=${this.academicYear}`;

    this.http.get<any>(url).subscribe({
      next: res => {
        this.timetable = res?.data ?? [];
        this.buildTable();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load timetable';
        this.loading = false;
      }
    });
  }

  buildTable() {
    for (const t of this.timetable) {

      if (!this.periods.includes(t.periodNo)) {
        this.periods.push(t.periodNo);
      }

      const day = this.days[t.dayOfWeek - 1];

      if (!this.table[t.periodNo]) {
        this.table[t.periodNo] = {};
      }

      this.table[t.periodNo][day] = {
        subject: t.subjectName,
        time: `${t.startTime} - ${t.endTime}`
      };
    }

    this.periods.sort((a, b) => a - b);
  }
}
