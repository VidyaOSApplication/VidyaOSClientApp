import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FeeMenuItem {
  title: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-admin-fees',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './admin-fees.page.html',
  styleUrls: ['./admin-fees.page.scss']
})
export class AdminFeesPage implements OnInit {

  feeMenus: FeeMenuItem[] = [
    {
      title: 'Fee Structure',
      icon: 'list-outline',
      route: 'admin/fees/structure',
      description: 'Define class-wise monthly fees'
    },
    {
      title: 'Generate Monthly Fees',
      icon: 'calendar-outline',
      route: '/admin/fees/generate',
      description: 'Generate fees for a selected month'
    },
    {
      title: 'Pending Fees',
      icon: 'cash-outline',
      route: '/admin/fees/pending',
      description: 'View & collect pending fees'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
