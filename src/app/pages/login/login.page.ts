import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: async (role) => {

        // 🔥 SUPER ADMIN → NO PROFILE API
        if (role === 'SuperAdmin') {

          await Preferences.set({
            key: 'user_profile',
            value: JSON.stringify({
              role: 'SuperAdmin',
              name: 'System Administrator'
            })
          });

          this.router.navigateByUrl('/super-admin/dashboard', { replaceUrl: true });
          return;
        }

        // 🔁 OTHER ROLES → LOAD PROFILE
        this.authService.getMyProfile(this.username).subscribe({
          next: profile => {

            if (profile.role === 'Student') {
              this.router.navigateByUrl('/student/dashboard', { replaceUrl: true });
            }
            else if (profile.role === 'Teacher') {
              this.router.navigateByUrl('/teacher/dashboard', { replaceUrl: true });
            }
            else if (profile.role === 'SchoolAdmin') {
              this.router.navigateByUrl('/admin/dashboard', { replaceUrl: true });
            }

            this.loading = false;
          }
        });
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
