import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}

  create(payload: AppointmentPayload): Observable<any> {
    return this.http.post(this.api, payload);
  }
}
