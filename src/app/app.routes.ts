import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.page')
        .then(m => m.AdminDashboardPage)
  },
  {
    path: 'student/dashboard',
    loadComponent: () =>
      import('./pages/student/student-dashboard/student-dashboard.page')
        .then(m => m.StudentDashboardPage)
  },
  {
    path: 'teacher/dashboard',
    loadComponent: () => import('./pages/teacher-dashboard/teacher-dashboard.page').then( m => m.TeacherDashboardPage)
  },
  {
    path: 'take-attendance',
    loadComponent: () => import('./pages/attendance/take-attendance/take-attendance.page').then( m => m.TakeAttendancePage)
  },
  {
    path: 'teacher/attendance/take-attendance',
    loadComponent: () =>
      import('./pages/attendance/take-attendance/take-attendance.page')
        .then(m => m.TakeAttendancePage)
  },
  {
    path: 'super-admin-dashboard',
    loadComponent: () => import('./pages/super-admin-dashboard/super-admin-dashboard.page').then( m => m.SuperAdminDashboardPage)
  },
  {
    path: 'super-admin/dashboard',
    loadComponent: () =>
      import('./pages/super-admin-dashboard/super-admin-dashboard.page')
        .then(m => m.SuperAdminDashboardPage)
  }
];
