import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  unavailableDates: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      symptoms: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.fetchUnavailableDates();
  }

  fetchUnavailableDates() {
    this.http.get<string[]>('http://localhost:4200' + '/unavailable-dates').subscribe(
      (dates) => {
        this.unavailableDates = dates
      },
      (error) => console.error('Error fetching unavailable dates', error)
    );
  }

  isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const formattedDate = date.toISOString().split('T')[0];

    return date > today || this.unavailableDates.includes(formattedDate);
  };

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log('Booking details:', this.appointmentForm.value);
      // Call API to save the reservation
    }
  }
}
