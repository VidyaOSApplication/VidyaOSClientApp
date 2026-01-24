import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Import specific standalone components
import {
  IonContent, IonCard, IonCardContent, IonItem,
  IonInput, IonButton, IonIcon, IonSpinner
} from '@ionic/angular/standalone';
// Import icon registration
import { addIcons } from 'ionicons';
import { schoolOutline, personOutline, lockClosedOutline } from 'ionicons/icons';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Add each component individually to the imports array
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner
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
  ) {
    // REQUIRED: Register the icons so they show up in the production build
    addIcons({ schoolOutline, personOutline, lockClosedOutline });
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (role: string) => {
        this.authService.getMyProfile(this.username).subscribe({
          next: () => {
            if (role === 'SuperAdmin') {
              this.router.navigateByUrl('/super-admin/dashboard', { replaceUrl: true });
            } else if (role === 'Student') {
              this.router.navigateByUrl('/student/dashboard', { replaceUrl: true });
            } else if (role === 'Teacher') {
              this.router.navigateByUrl('/teacher/dashboard', { replaceUrl: true });
            } else if (role === 'SchoolAdmin') {
              this.router.navigateByUrl('/admin/dashboard', { replaceUrl: true });
            }
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.errorMessage = 'Unable to load profile';
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
