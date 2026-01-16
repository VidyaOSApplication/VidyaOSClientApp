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
    path: 'student/dashboard',
    loadComponent: () =>
      import('./pages/student/student-dashboard/student-dashboard.page')
        .then(m => m.StudentDashboardPage)
  },
  {
    path: 'teacher/dashboard',
    loadComponent: () =>
      import('./pages/teacher-dashboard/teacher-dashboard.page')
        .then(m => m.TeacherDashboardPage)
  },

  // ======================
  // ADMIN – EXAMS (FINAL FLOW)
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

  // 🔐 STEP 1: Select Class
  {
    path: 'admin/select-class/:examId',
    loadComponent: () =>
      import('./pages/select-class/select-class.page')
        .then(m => m.SelectClassPage)
  },

  // 🔐 STEP 2: Assign Subjects (ADMIN)
  {
    path: 'admin/assign-subjects/:examId/:classId',
    loadComponent: () =>
      import('./pages/assign-subjects/assign-subjects.page')
        .then(m => m.AssignSubjectsPage)
  },

  // 🔐 STEP 3: Select Subject (TEACHER / MARKS)
  { path: 'admin/select-subject/:examId/:classId', loadComponent: () => import('./pages/select-subject/select-subject.page').then(m => m.SelectSubjectPage) },

  { path: 'admin/enter-marks/:examId/:classId/:subjectId', loadComponent: () => import('./pages/enter-marks/enter-marks.page').then(m => m.EnterMarksPage) },
];
