import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: false,
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList {
  trips$: Observable<Trip[]>;
  selectedTrip: Trip | null = null;

  constructor(private tripDataService: TripData) {
    this.trips$ = this.tripDataService.getTrips();
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