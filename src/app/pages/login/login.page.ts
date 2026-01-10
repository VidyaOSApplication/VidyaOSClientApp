import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

      next: (profile) => {
        console.log('LOGIN PROFILE:', profile);
        console.log('ROLE:', profile.role);
        this.loading = false;
        if (profile.role === 'SchoolAdmin') {
          this.router.navigateByUrl('/admin/dashboard', { replaceUrl: true });
          return;
        }

        if (profile.role === 'Student') {
          this.router.navigateByUrl('/student/dashboard', { replaceUrl: true });
          return;
        }
        if (profile.role === 'Teacher') {
          this.router.navigateByUrl('/teacher/dashboard', { replaceUrl: true });
          return;
        }

        // Fallback (safety)
        this.router.navigateByUrl('/home', { replaceUrl: true });
      
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
