import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
interface DashboardItem {
  title: string;
  icon: string;
  route: string; // 👈 REQUIRED, not optional
}

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

  dashboardItems: DashboardItem[] = [
    {
      title: 'Register Student',
      icon: 'person-add-outline',
      route: '/register-student'
    },
    {
      title: 'Register Teacher',
      icon: 'school-outline',
      route: '/register-teacher'
    },
    { title: 'Leave Requests', icon: 'document-text-outline', route: 'admin-pending-leaves' },
    {
      title: 'Mark Fees',
      icon: 'cash-outline',
      route: 'admin/fees'
    },

    { title: 'Attendance', icon: 'calendar-outline', route: '/fees' },
    { title: 'Homework', icon: 'book-outline', route: '/fees' },


    { title: 'Circulars', icon: 'notifications-outline' ,route: '/fees' },

    { title: 'Remarks', icon: 'chatbubble-outline', route: '/fees' },
    { title: 'Calendar', icon: 'today-outline', route: '/fees' },
    { title: 'Birthdays', icon: 'gift-outline', route: '/fees' },
    { title: 'Examination', icon: 'clipboard-outline', route: '/fees' },
    { title: 'Communication', icon: 'megaphone-outline', route: '/fees' },
    { title: 'Announcements', icon: 'volume-high-outline', route: '/fees' }
  ];

  constructor(private authService: AuthService, private router: Router) { }
  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolName = profile.schoolName; // 👈 from API
    }

  }
  goTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
