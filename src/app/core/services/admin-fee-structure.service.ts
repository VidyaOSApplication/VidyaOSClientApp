import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'src/app/core/api-base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeStructureService {

  private apiUrl = `${API_BASE_URL}/School`;

  constructor(private http: HttpClient) { }

  // 🔄 LOAD FEES
  getFeeStructures(schoolId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/GetFeeStructures`,
      {
        params: { schoolId }
      }
    );
  }

  // 💾 SAVE / UPDATE
  saveFeeStructure(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/SaveFeeStructure`,
      payload
    );
  }
}
