import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-assign-class-subjects',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './assign-class-subjects.page.html'
})
export class AssignClassSubjectsPage implements OnInit {

  schoolId!: number;

  classes: number[] = [];
  classId!: number;

  showStream = false;
  streamId: number | null = null;

  streams = [
    { id: 1, name: 'PCM' },
    { id: 2, name: 'PCB' },
    { id: 3, name: 'Commerce' },
    { id: 4, name: 'Arts' }
  ];

  subjects: any[] = [];
  saving = false;

  constructor(
    private http: HttpClient,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);

    const profile = await Preferences.get({ key: 'user_profile' });
    this.schoolId = JSON.parse(profile.value!).schoolId;
  }

  onClassChange() {
    this.subjects = [];
    this.streamId = null;
    this.showStream = this.classId === 11 || this.classId === 12;

    if (!this.showStream) {
      this.loadSubjects();
    }
  }

  loadSubjects() {
    if (!this.classId) return;
    if (this.showStream && !this.streamId) return;

    let params: any = {
      schoolId: this.schoolId,
      classId: this.classId
    };

    if (this.showStream && this.streamId) {
      params.streamId = this.streamId;
    }

    this.http.get<{ data: any[] }>(
      'https://localhost:7201/api/School/GetSubjectsForAssignment',
      { params }
    ).subscribe(res => {
      console.log(res);
      this.subjects = (res.data || []).map(s => ({
        subjectId: s.subjectId,
        subjectName: s.subjectName,
        selected: s.assigned
      }));
    });
  }

  async save() {
    const subjectIds = this.subjects
      .filter(s => s.selected)
      .map(s => s.subjectId);

    if (!subjectIds.length) {
      this.showToast('Select at least one subject', 'danger');
      return;
    }

    this.saving = true;

    const payload: any = {
      schoolId: this.schoolId,
      classId: this.classId,
      subjectIds
    };

    if (this.showStream) {
      payload.streamId = this.streamId;
    }
    console.log("payload", payload);

    this.http.post(
      'https://localhost:7201/api/School/AssignClassSubjects',
      payload
    ).subscribe({
      next: async () => {
        this.saving = false;
        this.showToast('Subjects assigned successfully', 'success');
      },
      error: async () => {
        this.saving = false;
        this.showToast('Failed to assign subjects', 'danger');
      }
    });
  }

  async showToast(msg: string, color: 'success' | 'danger') {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color
    });
    t.present();
  }
}
