import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip!: Trip;
  @Output() editTrip = new EventEmitter<Trip>();

  constructor(
    private authenticationService: Authentication
  ) {}

  edit(): void {
    this.editTrip.emit(this.trip);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}