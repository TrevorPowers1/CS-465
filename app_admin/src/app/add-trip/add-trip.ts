import { Component, EventEmitter, Output } from '@angular/core';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: false,
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  @Output() tripAdded = new EventEmitter<void>();

  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: 'reef1.jpg',
    description: ''
  };

  constructor(private tripDataService: TripData) {}

  addTrip(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.tripAdded.emit();

        this.trip = {
          code: '',
          name: '',
          length: '',
          start: '',
          resort: '',
          perPerson: '',
          image: 'reef1.jpg',
          description: ''
        };
      },
      error: (err) => {
        console.error('Error adding trip:', err);
      }
    });
  }
}