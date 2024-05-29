import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ContactService} from "../../services/contact-service/contact.service";
import {FormsModule} from "@angular/forms";
import {Contact} from "../../models/reclamation.model";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  name = '';
  email = '';
  phone = '';
  description = '';
  clicked = false


  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  constructor(private snackBar: MatSnackBar
    , private service: ContactService) {
  }

  contact() {
    const contactData: Contact = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      description: this.description,
      status: 'non lu'
    }

    this.clicked = true


    if (this.name.length > 0 && this.email.length > 0 && this.phone.length > 0 && this.description.length > 0) {


      this.service.contact(contactData).subscribe(
        () => {
          this.openSnackBar('Message Envoyeé avec succée', 'Fermer')
          this.description = ''
          this.email = ''
          this.phone = ''
          this.name = ''
          this.clicked = false
        },
        error => {
          console.log(error)
        }
      )

    }
  }
}
