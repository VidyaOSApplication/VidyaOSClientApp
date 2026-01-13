import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeeService {
  constructor(private http: HttpClient) { }

  getFeeStructures(schoolId: number) {
    return this.http.get<any>(
      `/api/School/GetFeeStructures?schoolId=${schoolId}`
    );
  }

  saveFeeStructure(payload: any) {
    return this.http.post<any>(
      `/api/School/SaveFeeStructure`,
      payload
    );
  }

  generateMonthlyFee(payload: any) {
    return this.http.post<any>(
      `/api/School/GenerateMonthlyFee`,
      payload
    );
  }

  getPendingFees(schoolId: number) {
    return this.http.get<any>(
      `/api/School/pending/${schoolId}`
    );
  }

  collectFee(payload: any) {
    return this.http.post<any>(
      `/api/School/collect`,
      payload
    );
  }

  getStudentFeeHistory(studentId: number) {
    return this.http.get<any>(
      `/api/School/student/${studentId}`
    );
  }

  getFeeReceipt(studentId: number, feeMonth: string) {
    return this.http.get<any>(
      `/api/School/GetFeeReceipt?studentId=${studentId}&feeMonth=${feeMonth}`
    );
  }
}
