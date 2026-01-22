import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { UserProfile } from '../../models/userProfile';
import { API_BASE_URL } from 'src/app/core/api-base';

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

  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  // 🔐 LOGIN
  login(username: string, password: string): Observable<string> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/Auth/Login`,
      { username, password }
    ).pipe(
      tap(async res => {
        if (res.success) {
          await this.saveAuthData(res.data);
        }
      }),
      map(res => res.data.role)
    );
  }

  // 👤 PROFILE
  getMyProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/Common/Me`
    ).pipe(
      tap(async profile => {
        const enrichedProfile = { ...profile, username };
        await Preferences.set({
          key: 'user_profile',
          value: JSON.stringify(enrichedProfile)
        });
      })
    );
  }

  // 💾 SAVE TOKEN
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

  async getRole(): Promise<string | null> {
    const res = await Preferences.get({ key: 'user_role' });
    return res.value;
  }

  async getStoredProfile(): Promise<UserProfile | null> {
    const res = await Preferences.get({ key: 'user_profile' });
    return res.value ? JSON.parse(res.value) : null;
  }

  async getToken(): Promise<string | null> {
    const res = await Preferences.get({ key: 'jwt_token' });
    return res.value;
  }

  async logout() {
    await Preferences.clear();
  }
}
