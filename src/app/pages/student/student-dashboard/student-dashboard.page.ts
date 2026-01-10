import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss']
})
export class StudentDashboardPage {

  studentName = '';
  subtitle = '';

  dashboardItems = [
    { title: 'My Profile', icon: 'person-outline' },
    { title: 'Attendance', icon: 'calendar-outline' },
    { title: 'Fees', icon: 'wallet-outline' },
    { title: 'Homework', icon: 'book-outline' },
    { title: 'Exam Results', icon: 'clipboard-outline' },
    { title: 'Timetable', icon: 'time-outline' },
    { title: 'Circulars', icon: 'notifications-outline', count: 1 },
    { title: 'Apply Leave', icon: 'document-text-outline' },
    { title: 'Communication', icon: 'chatbubbles-outline' }

  ];
  constructor(private authService: AuthService) { }
  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.studentName = profile.username; // 👈 from API
      this.subtitle = `Class ${profile.classId} - ${profile.sectionId}`;
    }
  }
}
