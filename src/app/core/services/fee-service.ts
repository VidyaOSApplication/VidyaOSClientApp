import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'src/app/core/api-base';

@Injectable({
  providedIn: 'root',
})
export class FeeService {

  private apiUrl = `${API_BASE_URL}/School`;

  constructor(private http: HttpClient) { }

  getFeeStructures(schoolId: number) {
    return this.http.get<any>(
      `${this.apiUrl}/GetFeeStructures?schoolId=${schoolId}`
    );
  }

  saveFeeStructure(payload: any) {
    return this.http.post<any>(
      `${this.apiUrl}/SaveFeeStructure`,
      payload
    );
  }

  generateMonthlyFee(payload: any) {
    return this.http.post<any>(
      `${this.apiUrl}/GenerateMonthlyFee`,
      payload
    );
  }

  getPendingFees(schoolId: number) {
    return this.http.get<any>(
      `${this.apiUrl}/pending/${schoolId}`
    );
  }

  collectFee(payload: any) {
    return this.http.post<any>(
      `${this.apiUrl}/collect`,
      payload
    );
  }

  getStudentFeeHistory(studentId: number) {
    return this.http.get<any>(
      `${this.apiUrl}/student/${studentId}`
    );
  }

  getFeeReceipt(studentId: number, feeMonth: string) {
    return this.http.get<any>(
      `${this.apiUrl}/GetFeeReceipt?studentId=${studentId}&feeMonth=${feeMonth}`
    );
  }
}
