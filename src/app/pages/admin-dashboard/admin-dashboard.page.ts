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

    { title: 'Examination', icon: 'clipboard-outline', route: 'admin/exam-dashboard' },
    { title: 'Birthdays', icon: 'gift-outline', route: '/birthdays' },
    { title: 'Attendance', icon: 'calendar-outline', route: 'admin/view-attendance' },
    
    {
      title: 'Collect Fee',
      icon: 'cash-outline',
      route: '/admin/collect-fee' // 👈 NEW
    },
    {
      title: 'Fee Management',
      icon: 'cash-outline',
      route: 'admin/fees'
    },

    
    { title: 'Assign Subjects', icon: 'book-outline', route: 'assign-class-subjects' },
    { title: 'Subject Management', icon: 'today-outline', route: 'admin-master-subjects' },
    { title: 'Time Table', icon: 'today-outline', route: 'class-timetable' },
    { title: 'Add TimeTable', icon: 'calendar-outline', route: 'add-class-timetable' },
    
  ];

  constructor(private authService: AuthService, private router: Router) { }
  async ngOnInit() {
    const profile = await this.authService.getStoredProfile();

    if (profile) {
      this.schoolName = profile.schoolName; // 👈 from API
    }

  }
  goTo(route: string) {
    console.log(route);
    this.router.navigateByUrl(route);
  }

}
