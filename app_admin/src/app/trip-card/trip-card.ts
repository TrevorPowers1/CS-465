import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip!: Trip;
  @Output() editTrip = new EventEmitter<Trip>();

  edit(): void {
    this.editTrip.emit(this.trip);
  }
}