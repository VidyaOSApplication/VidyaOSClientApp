import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

interface MasterSubject {
  masterSubjectId: number;
  subjectName: string;
}

@Component({
  selector: 'app-admin-master-subjects',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './admin-master-subjects.page.html'
})
export class AdminMasterSubjectsPage implements OnInit {

  schoolId!: number;

  subjectName = '';
  subjects: MasterSubject[] = [];

  saving = false;
  loading = false;

  private api = 'https://localhost:7201/api/School';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  // ---------------- INIT ----------------
  async ngOnInit() {
    const profile = await Preferences.get({ key: 'user_profile' });

    if (profile.value) {
      this.schoolId = JSON.parse(profile.value).schoolId;
      this.loadSubjects();
    }
  }

  // ---------------- LOAD ----------------
  loadSubjects() {
    this.loading = true;

    this.http.get<any>(
      `${this.api}/GetMasterSubjects`,
      { params: { schoolId: this.schoolId } }
    ).subscribe({
      next: res => {
        this.subjects = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load subjects', 'danger');
      }
    });
  }

  // ---------------- ADD ----------------
  addSubject() {
    if (!this.subjectName) return;

    this.saving = true;

    const payload = {
      schoolId: this.schoolId,
      subjectName: this.subjectName
    };

    this.http.post<any>(
      `${this.api}/AddMasterSubject`,
      payload
    ).subscribe({
      next: res => {
        this.saving = false;
        this.subjectName = '';
        this.showToast(res.message || 'Subject added', 'success');
        this.loadSubjects();
      },
      error: err => {
        this.saving = false;
        this.showToast(err.error?.message || 'Failed to add subject', 'danger');
      }
    });
  }

  // ---------------- DELETE ----------------
  async confirmDelete(subject: MasterSubject) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Subject',
      message: `Delete "${subject.subjectName}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteSubject(subject.masterSubjectId)
        }
      ]
    });

    await alert.present();
  }

  deleteSubject(id: number) {
    this.http.delete<any>(
      `${this.api}/DeleteMasterSubject?id=${id}`
    ).subscribe({
      next: res => {
        this.showToast(res.message || 'Subject deleted', 'success');
        this.loadSubjects();
      },
      error: err => {
        this.showToast(err.error?.message || 'Cannot delete subject', 'danger');
      }
    });
  }

  // ---------------- UI ----------------
  async showToast(msg: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
