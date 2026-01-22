import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/core/api-base';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private apiUrl = `${API_BASE_URL}/Students`;

  constructor(private http: HttpClient) { }

  registerStudent(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/RegisterStudent`,
      payload
    );
  }
}
