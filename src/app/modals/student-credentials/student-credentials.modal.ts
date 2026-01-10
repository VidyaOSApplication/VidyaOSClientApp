import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-credentials-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './student-credentials.modal.html',
  styleUrls: ['./student-credentials.modal.scss']
})
export class StudentCredentialsModal {

  @Input() admissionNo!: string;
  @Input() username!: string;
  @Input() password!: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  // 📋 COPY TO CLIPBOARD (FIXES YOUR ERROR)
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

  // ❌ CLOSE MODAL
  close() {
    this.modalCtrl.dismiss();
  }
}
