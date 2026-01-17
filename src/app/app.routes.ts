import { Routes } from '@angular/router';

export const routes: Routes = [

  // ======================
  // ROOT & AUTH
  // ======================
  { path: '', redirectTo: 'login', pathMatch: 'full' },

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
  {
    path: 'super-admin/dashboard',
    loadComponent: () =>
      import('./pages/super-admin-dashboard/super-admin-dashboard.page')
        .then(m => m.SuperAdminDashboardPage)
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
  // REGISTRATION
  // ======================
  {
    path: 'admin/register-student',
    loadComponent: () =>
      import('./pages/register-student/register-student.page')
        .then(m => m.RegisterStudentPage)
  },
  {
    path: 'admin/register-teacher',
    loadComponent: () =>
      import('./pages/register-teacher/register-teacher.page')
        .then(m => m.RegisterTeacherPage)
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
  // BIRTHDAYS
  // ======================
  {
    path: 'birthdays',
    loadComponent: () =>
      import('./pages/birthdays/birthdays.page')
        .then(m => m.BirthdaysPage)
  },

  // ======================
  // EXAMS – FINAL ADMIN FLOW
  // ======================
  {
    path: 'admin/exam-dashboard',
    loadComponent: () =>
      import('./pages/exam-dashboard/exam-dashboard.page')
        .then(m => m.ExamDashboardPage)
  },
  {
    path: 'admin/exam-list',
    loadComponent: () =>
      import('./pages/exam-list/exam-list.page')
        .then(m => m.ExamListPage)
  },
  {
    path: 'admin/create-exam',
    loadComponent: () =>
      import('./pages/create-exam/create-exam.page')
        .then(m => m.CreateExamPage)
  },

  // STEP 1: Select Class (used for BOTH assign & marks)
  {
    path: 'admin/select-class/:examId/:mode',
    loadComponent: () =>
      import('./pages/select-class/select-class.page')
        .then(m => m.SelectClassPage)
  },

  // STEP 2A: Assign Subjects (ADMIN only)
  {
    path: 'admin/assign-subjects/:examId/:classId',
    loadComponent: () =>
      import('./pages/assign-subjects/assign-subjects.page')
        .then(m => m.AssignSubjectsPage)
  },

  // STEP 2B: Select Subject (MARKS flow)
  {
    path: 'admin/select-subject/:examId/:classId',
    loadComponent: () =>
      import('./pages/select-subject/select-subject.page')
        .then(m => m.SelectSubjectPage)
  },

  // STEP 3: Enter Marks
  {
    path: 'admin/enter-marks/:examId/:classId/:subjectId',
    loadComponent: () =>
      import('./pages/enter-marks/enter-marks.page')
        .then(m => m.EnterMarksPage)
  },

];
