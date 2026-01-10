import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

interface DashboardItem {
  title: string;
  icon: string;
  route: string;
  count?: number; // OPTIONAL
}

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  templateUrl: './super-admin-dashboard.page.html',
  styleUrls: ['./super-admin-dashboard.page.scss']
})
export class SuperAdminDashboardPage {

  // ✅ FIX 1
  superAdminName = 'Super Admin';

  // ✅ FIX 2 (count is optional)
  dashboardItems = [
    {
      title: 'Register School',
      icon: 'add-circle-outline',
      route: '/super-admin/register-school'
    },
    {
      title: 'Manage Schools',
      icon: 'school-outline',
      route: '/super-admin/schools'
    },
    {
      title: 'School Admins',
      icon: 'people-outline',
      route: '/super-admin/school-admins'
    },
    {
      title: 'Subscriptions',
      icon: 'card-outline',
      route: '/super-admin/subscriptions'
    },
    {
      title: 'Platform Analytics',
      icon: 'bar-chart-outline',
      route: '/super-admin/analytics'
    },
    {
      title: 'Support & Issues',
      icon: 'help-circle-outline',
      route: '/super-admin/support'
    },
    {
      title: 'System Settings',
      icon: 'settings-outline',
      route: '/super-admin/settings'
    }
  ];
;
}
