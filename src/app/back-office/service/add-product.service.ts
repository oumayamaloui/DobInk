import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Contact} from "../../models/reclamation.model";
import {UserModel} from "../../models/user.model";
import {CommandeModel} from "../../models/commande.model";

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {
  }

  uploadImage(vals: any): Observable<any> {
    return this.http.post("https://api.cloudinary.com/v1_1/dwkp2dnfs/upload", vals)
  }

  addProduct(productData: any) {
    return this.http.post(`${this.apiUrl}/product/add`, productData);
  }

  updateProduct(productId: string, updatedProductData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/update/${productId}`, updatedProductData);
  }

  updateRecalamtionStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/visitor/updateReclamation`, data);
  }

  updateContactStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/visitor/updateContact`, data);
  }
  updateCommandeStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/updateCommande`, data);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/delete/${productId}`);
  }

  loadReclamation(): Observable<Contact[]> {
    return this.http.get<any>(`${this.apiUrl}/visitor/loadReclamation`)
      .pipe(
        map(data => data as Contact[])
      );
  }

  loadContact(): Observable<Contact[]> {
    return this.http.get<any>(`${this.apiUrl}/visitor/loadContact`)
      .pipe(
        map(data => data as Contact[])
      );
  }

  loadCommande(): Observable<CommandeModel[]> {
    return this.http.get<any>(`${this.apiUrl}/product/loadCommande`)
      .pipe(
        map(data => data as CommandeModel[])
      );
  }

  updateUserStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/updateStatus`, data);
  }

  loadUsers(): Observable<UserModel[]> {
    return this.http.get<any>(`${this.apiUrl}/auth/loadUsers`)
      .pipe(
        map(data => data as UserModel[])
      );
  }

  loadSubscribers(): Observable<{ id: string, email: string }[]> {
    return this.http.get<any>(`${this.apiUrl}/subscription/load`)
  }

  sendEmail(emailData: { recipients: string, subject: string, body: string }) {
    return this.http.post(`${this.apiUrl}/auth/send-email`, emailData);
  }


}
