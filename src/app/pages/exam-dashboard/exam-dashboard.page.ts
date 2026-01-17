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
      title: 'Exam List',
      icon: 'book-outline',
      route: 'admin/exam-list'
    }
  ];

  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
