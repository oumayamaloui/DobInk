import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {CartModel} from "../../models/cart.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {loadStripe} from "@stripe/stripe-js";
import {FormsModule} from "@angular/forms";
import {CommandeService} from "../../services/commande/commande.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements AfterContentInit {
  cart!: CartModel[]
  cartItemsTotalPrice = 0
  mode = false

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }


  constructor(private snackBar: MatSnackBar
    , @Inject(DOCUMENT) private document: Document, private service: ShopService, private commande: CommandeService) {
  }


  ngAfterContentInit() {
    this.loadCartItems()

  }

  routing(url: string) {
    window.location.assign(url)
  }


  createCommande() {
    if (this.mode) {
      const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
      let user = ''
      if (data) {
        user = JSON.parse(data).id
      }
      console.log(user)

      const method = 'Paiement en espèce à la livraison'
      this.commande.addCommande(user, method).subscribe(() => {
        this.service.deleteCart(user).subscribe(() => {
          this.openSnackBar('Commande envoyer', 'Fermer')
        })
      }, (error) => {
        console.error('Error generating Commande:', error);
      })
    }
  }


  async redirectToCheckout(amount: number) {

    if (this.cartItemsTotalPrice > 0) {
      try {
        const stripe = await loadStripe('pk_test_51Lyzt5GUzUAnKjP7GaetFbAkzNnUTx2ZOdcH1TqLtFhZJEZA59G6wfxp9Q7M70tRhCqjErdZeLN1dYxeyPFkRO9N007IOrrnzD');
        const response = await this.service.createCheckoutSession(amount).toPromise();

        if (response) {
          const {sessionId} = response;
          if (stripe) {
            await stripe.redirectToCheckout({
              sessionId,
            });
          }
        } else {
          console.error('Invalid response from createCheckoutSession');
        }
      } catch (error) {
        console.error('Error creating Stripe Checkout session:', error);
      }
    }
  }

  stringToInt(string: string) {
    return parseInt(string)
  }

  loadCartItems() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.service.getCartItems(user).subscribe(data => {
      this.cart = data
      this.calculateTotalPrice()
    })
    this.cartItemsTotalPrice = 0
  }

  addToCartFromCart(productId: string | undefined, flag: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.addToCart(productId, flag, user).subscribe(() => {
        this.loadCartItems()

      })
  }

  calculateTotalPrice() {
    this.cartItemsTotalPrice = this.cart.reduce((total, cartItem) => {
      return total + (parseInt(cartItem.product.price) * cartItem.amount);
    }, 0);
  }


}
