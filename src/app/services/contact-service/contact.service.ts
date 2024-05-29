import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/visitor';


  constructor(private http: HttpClient) {
  }


  contact(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createContact`, data)
  }

  reclamation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createReclamation`, data)
  }
}
