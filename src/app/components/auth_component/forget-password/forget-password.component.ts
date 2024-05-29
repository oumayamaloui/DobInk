import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private service: AuthService) {
  }

  email!: string

  forgotPassword(email: string) {
    this.service.forgotPassword(email).subscribe(()=>(
      window.location.assign('login')
    ))
  }
}
