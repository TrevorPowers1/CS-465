import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app';
import { TripList } from './trip-list/trip-list';
import { TripCard } from './trip-card/trip-card';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

@NgModule({
  declarations: [
    App,
    TripList,
    TripCard,
    AddTrip,
    EditTrip
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App],
})
export class AppModule {}