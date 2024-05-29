import {Component} from '@angular/core';
import {SubFromFooterService} from '../../services/footer-service/sub-from-footer.service';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = '';
  validator = ''
  clicked = false

  routing(url: string) {
    window.location.assign(url)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  constructor(private service: SubFromFooterService, private snackBar: MatSnackBar) {
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  subscribe() {
    if (this.validateEmail(this.email)) {
      this.service.subscribe(this.email)
        .subscribe({
          next: () => {
            this.email = '';
            this.openSnackBar('le changement a été fait avec succès', 'fermer')
            this.clicked = false
          }
        });

    }      this.clicked = true


  }
}
