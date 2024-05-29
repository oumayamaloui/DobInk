import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {ProfileModel} from "../../models/profile.model"; // Install the @auth0/angular-jwt package

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  readonly TOKEN_KEY = 'auth_token';
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {
    const userData = JSON.parse(localStorage.getItem(this.TOKEN_KEY) || '{}');
    if (userData.token) {
      const user = {
        token: userData.token,
        username: userData.username,
        role: userData.role
      };
      this.currentUserSubject.next(user);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token; // Returns true if token exists, false otherwise
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  forgotPassword(email: string) {
    return this.http.post(`http://localhost:3000/api/auth/reset`, {email});
  }

  login(credentials: any, expectedRole: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        const username = response.username;
        const email = credentials.email;
        const role = response.role;
        const id = response.id;
        if (response.role !== expectedRole) {
          throw new Error('Unauthorized role');
        }
        const userData = {token, username, role, email, id};
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  changePassword(oldpass: string, newpass: string, email: string) {
    return this.http.post(`${this.apiUrl}/change-password`, {email: email, oldpass: oldpass, newpass: newpass})
  }

  updateUsername(newUsername: string, email: string) {
    return this.http.post(`${this.apiUrl}/updateUsername`, {email: email, newUsername: newUsername})
  }

  updateAddress(newAddress: string, email: string) {
    return this.http.post(`${this.apiUrl}/updateAddress`, {email: email, newAddress: newAddress})
  }

  updatePhoneNumber(newPhoneNumber: string, email: string) {
    return this.http.post(`${this.apiUrl}/updatePhoneNumber`, {email: email, newPhoneNumber: newPhoneNumber})
  }

  getUserDetails(id: string): Observable<ProfileModel> {
    return this.http.get(`${this.apiUrl}/users/${id}`,)
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }


}
