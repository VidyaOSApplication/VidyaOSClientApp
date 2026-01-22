import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'src/app/core/api-base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = `${API_BASE_URL}/School`;

  constructor(private http: HttpClient) { }

  // 🔹 GET SUBJECTS
  getSubjectsForClassSection(
    schoolId: number,
    classId: number,
    sectionId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/GetSubjectsForClassSection`,
      {
        params: {
          schoolId,
          classId,
          sectionId
        }
      }
    );
  }

  // 🔹 SAVE TIMETABLE
  createClassTimetable(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/CreateClassTimetable`,
      payload
    );
  }
}
