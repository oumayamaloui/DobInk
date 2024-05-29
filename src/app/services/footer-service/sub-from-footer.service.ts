import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubFromFooterService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:3000/api/subscription/subscribe';


  subscribe(email: string) {
    return this.http.post(`${this.apiUrl}`, {email, tag: 'add'});
  }
}
