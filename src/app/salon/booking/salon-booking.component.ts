import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-salon-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salon-booking.component.html',
  styleUrl: './salon-booking.component.scss'
})
export class SalonBookingComponent {
  constructor(private fb: FormBuilder, private booking: BookingService) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,}$/)]],
    email: ['', [Validators.email]],
    service: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    note: ['']
  });

  submitting = false;
  submitted = false;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.booking.create(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.form.reset();
      },
      error: () => {
        this.submitting = false;
      }
    });
  }
}
