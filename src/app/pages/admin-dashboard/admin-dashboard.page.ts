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
    {
      title: 'Mark Fees',
      icon: 'cash-outline',
      route: '/fees'
    }
  ];
    //{ title: 'Attendance', icon: 'calendar-outline' },
    //{ title: 'Homework', icon: 'book-outline' },


    //{ title: 'Circulars', icon: 'notifications-outline', count: 2 },

    //{ title: 'Remarks', icon: 'chatbubble-outline' },
    //{ title: 'Calendar', icon: 'today-outline' },
    //{ title: 'Birthdays', icon: 'gift-outline' },
    //{ title: 'Examination', icon: 'clipboard-outline' },
    //{ title: 'Communication', icon: 'megaphone-outline' },
    //{ title: 'Leaves', icon: 'document-text-outline' },
    //{ title: 'Announcements', icon: 'volume-high-outline' }

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
