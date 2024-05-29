import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = ''
  password = ''
  error = '';


  constructor(private authService: AuthService) {
  }

  routing(url: string) {
    window.location.assign(url)
  }


  login() {
    const credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials, 'client').subscribe(
      (response) => {
        console.log('Login successful:', response);
        window.location.assign('')
      },
      (error) => {
        console.error('Login failed:', error);
        this.error = error.error.error || 'Une erreur s\'est produite lors de la connexion.';
      }
    );
  }

}
