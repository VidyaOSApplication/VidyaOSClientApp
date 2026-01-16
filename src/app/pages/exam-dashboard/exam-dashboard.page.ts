import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-dashboard',
  templateUrl: './exam-dashboard.page.html',
  styleUrls: ['./exam-dashboard.page.scss'], 
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class ExamDashboardPage {

  menus = [
    {
      title: 'Create Exam',
      icon: 'create-outline',
      route: 'admin/create-exam'
    },
    {
      title: 'Assign Subjects',
      icon: 'book-outline',
      route: 'admin/assign-subjects'
    },
    {
      title: 'Enter Marks',
      icon: 'clipboard-outline',
      route: 'admin/enter-marks'
    }
  ];

  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
