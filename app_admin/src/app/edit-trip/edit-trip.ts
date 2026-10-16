import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: false,
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnChanges {
  @Input() trip!: Trip;
  @Output() tripUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  editTrip!: Trip;

  constructor(private tripDataService: TripData) {}

  ngOnChanges(): void {
    if (this.trip) {
      this.editTrip = { ...this.trip };

      if (this.editTrip.start) {
        this.editTrip.start = this.editTrip.start.substring(0, 10);
      }
    }
  }

  updateTrip(): void {
    this.tripDataService.updateTrip(this.editTrip).subscribe({
      next: () => {
        this.tripUpdated.emit();
      },
      error: (err) => {
        console.error('Error updating trip:', err);
      }
    });
  }

  cancel(): void {
    this.cancelEdit.emit();
  }
}