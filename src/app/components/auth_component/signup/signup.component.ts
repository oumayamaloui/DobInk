import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormsModule} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  address = '';
  phone = '';


  clicked = false

  firstNameError = 'Ce champ est obligatoire'
  lastNameError = 'Ce champ est obligatoire'
  emailError = 'Cette adresse email est invalide'
  addressError = 'Ce champ est obligatoire'
  phoneError = "Ce numéro de téléphone n'est pas valide"
  passwordError = 'Mot de passe trop court'

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  validatePhone(phone:string) {
    for (let i = 0; i < phone.length; i++) {
      if (phone[i] < '0' || phone[i] > '9') {
        return false;
      }
    }
    return true;
  }




  constructor(private authService: AuthService, private router: Router) {
  }

  register() {
    const userData = {
      username: this.firstName + this.lastName,
      email: this.email,
      password: this.password,
      role: 'client',
      status: 'active',
      address: this.address,
      phone: this.phone
    };
    if (this.firstName.length >= 0 && this.lastName.length >= 0 && this.validateEmail(this.email)
      &&  this.phone.length === 8 && this.password.length >= 8) {


      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Registration successful:', response);

          // Navigate to the login page
          const navigationExtras: NavigationExtras = {
            queryParams: {registered: 'true'}
          };
          this.router.navigate(['/login'], navigationExtras);

        },
        (error) => {
          console.error('Registration failed:', error);
          this.clicked = false

        }
      );
    }
    this.clicked = true
  }

}
