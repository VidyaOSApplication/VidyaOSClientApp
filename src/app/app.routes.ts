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
  },
  {
    path: 'register-student',
    loadComponent: () => import('./pages/register-student/register-student.page').then( m => m.RegisterStudentPage)
  },
  {
    path: 'admin/register-student',
    loadComponent: () =>
      import('./pages/register-student/register-student.page')
        .then(m => m.RegisterStudentPage)
  },
  {
    path: 'register-teacher',
    loadComponent: () =>
      import('./pages/register-teacher/register-teacher.page')
        .then(m => m.RegisterTeacherPage)
  },
  {
    path: 'student-apply-leave',
    loadComponent: () => import('./pages/student-apply-leave/student-apply-leave.page').then( m => m.StudentApplyLeavePage)
  },
  {
    path: 'student/apply-leave',
    loadComponent: () =>
      import('./pages/student-apply-leave/student-apply-leave.page')
        .then(m => m.StudentApplyLeavePage)
  },
  {
    path: 'admin-pending-leaves',
    loadComponent: () => import('./pages/admin-pending-leaves/admin-pending-leaves.page').then( m => m.AdminPendingLeavesPage)
  },  {
    path: 'admin-fees',
    loadComponent: () => import('./pages/admin-fees/admin-fees.page').then( m => m.AdminFeesPage)
  },
  {
    path: 'admin/fees',
    loadComponent: () =>
      import('./pages/admin-fees/admin-fees.page')
        .then(m => m.AdminFeesPage)
  },
  {
    path: 'admin/fees/structure',
    loadComponent: () =>
      import('./pages/admin-fee-structure/admin-fee-structure.page')
        .then(m => m.AdminFeeStructurePage)
  }

];
