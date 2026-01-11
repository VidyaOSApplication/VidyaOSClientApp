import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const alertCtrl = inject(AlertController);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Something went wrong. Please try again.';

      const isLoginApi = req.url.includes('/login'); // 👈 adjust if needed

      // ✅ Backend-provided message always wins
      if (error.error?.message) {
        message = error.error.message;
      }

      // 🌐 Server unreachable
      if (error.status === 0) {
        message = 'Unable to connect to server. Check your internet.';
      }

      // 🔐 401 ONLY for protected APIs
      if (error.status === 401 && !isLoginApi) {
        message = 'Session expired. Please login again.';
        // optional: redirect to login
      }

      showAlert(alertCtrl, message);

      return throwError(() => error);
    })
  );
};

async function showAlert(alertCtrl: AlertController, message: string) {
  const alert = await alertCtrl.create({
    header: 'Error',
    message,
    buttons: ['OK']
  });
  await alert.present();
}
