import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';

interface FeeStructure {
  feeStructureId: number;
  classId: number;
  className: string;
  feeName: string;
  monthlyAmount: number;
  isActive: boolean;
}

@Component({
  selector: 'app-admin-fee-structure',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './admin-fee-structure.page.html',
  styleUrls: ['./admin-fee-structure.page.scss']
})
export class AdminFeeStructurePage implements OnInit {

  loading = false;
  saving = false;

  schoolId = 0;
  classes: number[] = [];
  feeStructures: FeeStructure[] = [];

  form = {
    classId: null as number | null,
    feeName: '',
    monthlyAmount: null as number | null
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);

    const profile = await Preferences.get({ key: 'user_profile' });
    if (profile.value) {
      this.schoolId = JSON.parse(profile.value).schoolId;
      this.loadFeeStructures();
    }
  }

  // 🔄 LOAD FEES
  loadFeeStructures() {
    this.loading = true;

    this.http.get<any>(
      `https://localhost:7201/api/School/GetFeeStructures?schoolId=${this.schoolId}`
    ).subscribe({
      next: res => {
        this.feeStructures = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 💾 SAVE / UPDATE
  saveFee() {
    if (!this.form.classId || !this.form.feeName || !this.form.monthlyAmount) {
      this.showToast('Please fill all required fields', 'danger');
      return;
    }

    this.saving = true;

    const payload = {
      schoolId: this.schoolId,
      classId: this.form.classId,
      feeName: this.form.feeName,
      monthlyAmount: this.form.monthlyAmount
    };

    this.http.post<any>(
      'https://localhost:7201/api/School/SaveFeeStructure',
      payload
    ).subscribe({
      next: res => {
        this.saving = false;
        this.showToast(res.message || 'Fee saved successfully', 'success');
        this.resetForm();
        this.loadFeeStructures();
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  // ✏ EDIT EXISTING
  editFee(fee: FeeStructure) {
    this.form.classId = fee.classId;
    this.form.feeName = fee.feeName;
    this.form.monthlyAmount = fee.monthlyAmount;
  }

  resetForm() {
    this.form = {
      classId: null,
      feeName: '',
      monthlyAmount: null
    };
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    toast.present();
  }
}
