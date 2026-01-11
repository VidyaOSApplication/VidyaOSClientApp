import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-credentials-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './teacher-credentials.modal.html',
  styleUrls: ['./teacher-credentials.modal.scss']
})
export class TeacherCredentialsModal {

  @Input() fullName!: string;
  @Input() username!: string;
  @Input() password!: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  async copy(value: string) {
    await navigator.clipboard.writeText(value);
    const toast = await this.toastCtrl.create({
      message: 'Copied to clipboard',
      duration: 1200,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
}
