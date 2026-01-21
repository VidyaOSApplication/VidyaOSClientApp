import { Routes } from '@angular/router';

export const routes: Routes = [

  // ======================
  // ROOT & AUTH
  // ======================
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

  // ======================
  // DASHBOARDS
  // ======================
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.page')
        .then(m => m.AdminDashboardPage)
  },
  {
    path: 'teacher/dashboard',
    loadComponent: () =>
      import('./pages/teacher-dashboard/teacher-dashboard.page')
        .then(m => m.TeacherDashboardPage)
  },
  {
    path: 'student/dashboard',
    loadComponent: () =>
      import('./pages/student/student-dashboard/student-dashboard.page')
        .then(m => m.StudentDashboardPage)
  },

  // ======================
  // ADMIN – EXAMS (SIMPLIFIED FLOW)
  // ======================

  // 📌 Exam Dashboard (optional landing)
  {
    path: 'admin/exam-dashboard',
    loadComponent: () =>
      import('./pages/exam-dashboard/exam-dashboard.page')
        .then(m => m.ExamDashboardPage)
  },

  // 📌 Exam List (MAIN HUB)
  {
    path: 'admin/exam-list',
    loadComponent: () =>
      import('./pages/exam-list/exam-list.page')
        .then(m => m.ExamListPage)
  },

  // 📌 Create Exam
  {
    path: 'admin/create-exam',
    loadComponent: () =>
      import('./pages/create-exam/create-exam.page')
        .then(m => m.CreateExamPage)
  },

  // 📌 Schedule Exam (dates + max marks for ALL subjects)
  {
    path: 'admin/schedule-exam/:examId/:classId',
    loadComponent: () =>
      import('./pages/schedule-exam/schedule-exam.page')
        .then(m => m.ScheduleExamPage)
  },
  {
    path: 'admin/enter-marks/:examId/:classId',
    loadComponent: () =>
      import('./pages/enter-marks/enter-marks.page')
        .then(m => m.EnterMarksPage)
  },

  // ======================
  // ATTENDANCE
  // ======================
  {
    path: 'teacher/attendance/take-attendance',
    loadComponent: () =>
      import('./pages/attendance/take-attendance/take-attendance.page')
        .then(m => m.TakeAttendancePage)
  },
  {
    path: 'admin/view-attendance',
    loadComponent: () =>
      import('./pages/view-attendance/view-attendance.page')
        .then(m => m.ViewAttendancePage)
  },

  // ======================
  // FEES
  // ======================
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
  },
  {
    path: 'fees/generate',
    loadComponent: () =>
      import('./pages/generate-monthly-fee/generate-monthly-fee.page')
        .then(m => m.GenerateMonthlyFeePage)
  },
  {
    path: 'admin/collect-fee',
    loadComponent: () =>
      import('./pages/collect-fee/collect-fee.page')
        .then(m => m.CollectFeePage)
  },

  // ======================
  // STUDENT FEATURES
  // ======================
  {
    path: 'student/apply-leave',
    loadComponent: () =>
      import('./pages/student-apply-leave/student-apply-leave.page')
        .then(m => m.StudentApplyLeavePage)
  },
  {
    path: 'register-student',
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
    path: 'admin-pending-leaves',
    loadComponent: () =>
      import('./pages/admin-pending-leaves/admin-pending-leaves.page')
        .then(m => m.AdminPendingLeavesPage)
  },
  {
    path: 'birthdays',
    loadComponent: () =>
      import('./pages/birthdays/birthdays.page')
        .then(m => m.BirthdaysPage)
  },  {
    path: 'assign-class-subjects',
    loadComponent: () => import('./pages/assign-class-subjects/assign-class-subjects.page').then( m => m.AssignClassSubjectsPage)
  },
  {
    path: 'admin-master-subjects',
    loadComponent: () => import('./pages/admin-master-subjects/admin-master-subjects.page').then( m => m.AdminMasterSubjectsPage)
  },
  {
    path: 'class-timetable',
    loadComponent: () => import('./pages/class-timetable/class-timetable.page').then( m => m.ClassTimetablePage)
  },
  {
    path: 'add-class-timetable',
    loadComponent: () => import('./pages/add-class-timetable/add-class-timetable.page').then( m => m.AddClassTimetablePage)
  },
  


  // ======================
  // FALLBACK (SAFETY)
  // ======================
  //{
  //  path: '**',
  //  redirectTo: 'login'
  //}

];
