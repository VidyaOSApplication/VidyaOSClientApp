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
  personOutline,
  peopleOutline,
  locationOutline,
  bookOutline,
  notificationsOutline,
  documentTextOutline,
  checkboxOutline,
  createOutline,
  timeOutline,
  walletOutline,
  chatbubblesOutline,
  addCircleOutline,
  cardOutline,
  barChartOutline,
  helpCircleOutline,
  settingsOutline,
  lockClosedOutline

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
  'person-outline': personOutline,
  'people-outline': peopleOutline,
  'location-outline': locationOutline,
  'book-outline': bookOutline,
  'notifications-outline': notificationsOutline,
  'document-text-outline': documentTextOutline,
  'checkbox-outline': checkboxOutline,
  'create-outline': createOutline,
  'time-outline': timeOutline,
  'wallet-outline': walletOutline,
  'chatbubbles-outline': chatbubblesOutline,
  'add-circle-outline': addCircleOutline,
  'card-outline': cardOutline,
  'bar-chart-outline': barChartOutline,
  'help-circle-outline': helpCircleOutline,
  'settings-outline': settingsOutline,
  'lock-closed-outline': lockClosedOutline

});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      animated: false
    }),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor]) // 🔥 REGISTER HERE
    ),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
  ],
});
