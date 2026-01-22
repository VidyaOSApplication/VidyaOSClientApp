import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/core/api-base';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = `${API_BASE_URL}/Teacher`;

  constructor(private http: HttpClient) { }

  getStudents(
    schoolId: number,
    classId: number,
    sectionId: number,
    date: string,
    streamId?: number | null
  ): Observable<any> {

    let params = new HttpParams()
      .set('schoolId', schoolId)
      .set('classId', classId)
      .set('sectionId', sectionId)
      .set('date', date);

    if (streamId !== null && streamId !== undefined) {
      params = params.set('streamId', streamId.toString());
    }

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
