import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-birthdays',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './birthdays.page.html',
  styleUrls: ['./birthdays.page.scss']
})
export class BirthdaysPage implements OnInit {

  loading = false;
  students: any[] = [];
  schoolId = 0;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      this.schoolId = JSON.parse(profile.value).schoolId;
      this.loadBirthdays();
    }
  }

  loadBirthdays() {
    this.loading = true;

    this.http.get<any>(
      `${environment.apiBaseUrl}/School/GetTodaysBirthdays?schoolId=${this.schoolId}`
    ).subscribe({
      next: (res) => {
        this.students = res?.data?.students || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
