import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { TripList } from './trip-list/trip-list';
import { TripCard } from './trip-card/trip-card';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Navbar } from './navbar/navbar';
import { Login } from './login/login';
import { routes } from './app.routes';
import { jwtInterceptor } from './utils/jwt-interceptor';

@NgModule({
  declarations: [
    App,
    TripList,
    TripCard,
    AddTrip,
    EditTrip,
    Navbar,
    Login
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ],
  bootstrap: [App],
})
export class AppModule {}