import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  schoolOutline,
  cashOutline,
  calendarOutline,
  todayOutline,
  giftOutline,
  clipboardOutline,
  megaphoneOutline,
  volumeHighOutline,
  chatbubbleOutline,

  bookOutline,
  notificationsOutline,
  documentTextOutline
} from 'ionicons/icons';

addIcons({
  'person-add-outline': personAddOutline,
  'school-outline': schoolOutline,
  'cash-outline': cashOutline,
  'calendar-outline': calendarOutline,
  'today-outline': todayOutline,
  'gift-outline': giftOutline,
  'clipboard-outline': clipboardOutline,
  'megaphone-outline': megaphoneOutline,
  'volume-high-outline': volumeHighOutline,
  'chatbubble-outline': chatbubbleOutline,

  'book-outline': bookOutline,
  'notifications-outline': notificationsOutline,
  'document-text-outline': documentTextOutline
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor]) // 🔥 REGISTER HERE
    ),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
  ],
});
