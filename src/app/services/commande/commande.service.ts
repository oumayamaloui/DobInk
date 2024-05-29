import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {
  }

  addCommande(id: string, mode: string) {
    const body = { userId: id, method: mode };
    return this.http.post(`${this.apiUrl}/product/commande`, body);
  }

  getCommandeByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/product/loadCommande/${userId}`;
    return this.http.get(url);
  }
}
