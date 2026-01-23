import { HttpInterceptorFn } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 🔥 Skip token for Login endpoint
  if (req.url.includes('/Auth/Login')) {
    return next(req);
  }

  return from(Preferences.get({ key: 'jwt_token' })).pipe(
    switchMap(tokenResult => {

      const token = tokenResult.value;

      // If no token → continue request normally
      if (!token) {
        return next(req);
      }

      // Attach token
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(authReq);
    })
  );
};
