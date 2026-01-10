import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss']
})
export class AdminDashboardPage {
  schoolName = '';
  subtitle = 'Academic Year: 2025–26';

  dashboardItems = [
    { title: 'Register Student', icon: 'person-add-outline' },
    { title: 'Register Teacher', icon: 'people-outline' },
    { title: 'Attendance', icon: 'calendar-outline' },
    { title: 'Homework', icon: 'book-outline' },


    { title: 'Circulars', icon: 'notifications-outline', count: 2 },

    { title: 'Remarks', icon: 'chatbubble-outline' },
    { title: 'Calendar', icon: 'today-outline' },
    { title: 'Birthdays', icon: 'gift-outline' },
    { title: 'Examination', icon: 'clipboard-outline' },
    { title: 'Communication', icon: 'megaphone-outline' },
    { title: 'Leaves', icon: 'document-text-outline' },
    { title: 'Announcements', icon: 'volume-high-outline' }
  ];
  constructor(private authService: AuthService) { }
  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolName = profile.schoolName; // 👈 from API
    }
  }
}
