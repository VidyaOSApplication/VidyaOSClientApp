import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'https://localhost:7201/api/Teacher';

  constructor(private http: HttpClient) { }

  getStudents(
    schoolId: number,
    classId: number,
    sectionId: number,
    date: string
  ): Observable<any> {

    const params = new HttpParams()
      .set('schoolId', schoolId)
      .set('classId', classId)
      .set('sectionId', sectionId)
      .set('date', date);

    return this.http.get(
      `${this.apiUrl}/GetStudents/students`,
      { params }
    );
  }
  markAttendance(payload: any) {
    return this.http.post(
      `${this.apiUrl}/MarkAttendance/mark`,
      payload
    );
  }
}
