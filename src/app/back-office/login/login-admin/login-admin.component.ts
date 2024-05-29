import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {NavigationExtras} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {
  email = ''
  password = ''

  constructor(private authService: AuthService) {
  }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    }
    this.authService.login(credentials, 'admin').subscribe(
      (response) => {
        console.log('Login successful:', response);
        window.location.assign('')
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
