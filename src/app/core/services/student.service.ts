import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'https://localhost:7201/api/Students';

  constructor(private http: HttpClient) { }

  registerStudent(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/RegisterStudent`,
      payload
    );
  }
}
