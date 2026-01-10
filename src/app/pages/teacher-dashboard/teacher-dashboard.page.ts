import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss']
})
export class TeacherDashboardPage implements OnInit {

  teacherName = '';
  subtitle = '';

  dashboardItems = [
    { title: 'My Profile', icon: 'person-outline' },
    { title: 'My Classes', icon: 'people-outline' },
    { title: 'Take Attendance', icon: 'checkbox-outline' },
    { title: 'Homework', icon: 'book-outline' },
    { title: 'Enter Marks', icon: 'create-outline' },
    { title: 'Student Remarks', icon: 'chatbubble-outline' },
    { title: 'Timetable', icon: 'time-outline' },
    { title: 'Apply Leave', icon: 'document-text-outline' },
    { title: 'Circulars', icon: 'notifications-outline', count: 1 }
  ];

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      // username stored during login enrichment
      this.teacherName = profile.username;

      // subtitle can be dynamic later
      this.subtitle = 'Assigned Classes | 2025–26';
    }
  }
}
