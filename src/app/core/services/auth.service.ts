import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { UserProfile } from '../../models/userProfile';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
    expiresIn: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7201/api';

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN → FETCH PROFILE
  login(username: string, password: string): Observable<UserProfile> {
    return this.http.post<any>(
      `${this.apiUrl}/Auth/Login`,
      { username, password }
    ).pipe(
      tap(async res => {
        if (res.success) {
          await this.saveAuthData(res.data);
        }
      }),
      switchMap(() => this.getMyProfile(username)) // 👈 auto call
    );
  }

  // 👤 GET PROFILE
  getMyProfile(username: string) {
    return this.http.get<any>(`${this.apiUrl}/Common/Me`).pipe(
      tap(async profile => {

        // 🔥 MERGE USERNAME INTO PROFILE
        const enrichedProfile = {
          ...profile,
          username: username
        };

        await Preferences.set({
          key: 'user_profile',
          value: JSON.stringify(enrichedProfile)
        });
      })
    );
  }


  // 💾 SAVE JWT
  private async saveAuthData(data: {
    token: string;
    role: string;
    expiresIn: number;
  }) {
    const expiryTime = Date.now() + data.expiresIn * 1000;

    await Preferences.set({ key: 'jwt_token', value: data.token });
    await Preferences.set({ key: 'user_role', value: data.role });
    await Preferences.set({ key: 'token_expiry', value: expiryTime.toString() });
  }

  // 📦 READ PROFILE ANYWHERE
  async getStoredProfile(): Promise<UserProfile | null> {
    const result = await Preferences.get({ key: 'user_profile' });
    return result.value ? JSON.parse(result.value) : null;
  }

  // 🔑 TOKEN FOR INTERCEPTOR
  async getToken(): Promise<string | null> {
    const result = await Preferences.get({ key: 'jwt_token' });
    return result.value;
  }

  async logout() {
    await Preferences.clear();
  }
}
