import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-list',
  standalone: false,
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList {
  trips$: Observable<Trip[]>;
  selectedTrip: Trip | null = null;

  constructor(
    private tripDataService: TripData,
    private authenticationService: Authentication
  ) {
    this.trips$ = this.tripDataService.getTrips();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onTripAdded(): void {
    this.refreshTrips();
  }

  onEditTrip(trip: Trip): void {
    this.selectedTrip = trip;
  }

  onTripUpdated(): void {
    this.selectedTrip = null;
    this.refreshTrips();
  }

  onCancelEdit(): void {
    this.selectedTrip = null;
  }

  refreshTrips(): void {
    this.trips$ = this.tripDataService.getTrips();
  }
}