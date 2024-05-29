import {AfterContentInit, Component, Inject} from '@angular/core';
import {CartModel} from "../models/cart.model";
import {FactureService} from "../services/facture-service/facture.service";
import {ShopService} from "../services/shop-service/shop.service";
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {CommandeService} from "../services/commande/commande.service";

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent implements AfterContentInit {
  cart!: CartModel[]
  cartItemsTotalPrice = 0

  ngAfterContentInit() {
    this.loadCartItems()
    this.createCommande()
  }


  constructor(private commande: CommandeService,
              @Inject(DOCUMENT) private document: Document,
              private service: FactureService,
              private shopService: ShopService,
  ) {
  }

  createCommande() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    console.log(user)
    const method = 'Paiement en ligne'
    this.commande.addCommande(user, method).subscribe(() => {
      this.shopService.deleteCart(user).subscribe(() => {
      }, (error) => {
        console.error('Error ss bill:', error);
      })
    }, (error) => {
      console.error('Error Commande bill:', error);
    })

  }


  generateFacture() {
    this.loadCartItems()
    this.service.generateBill(this.cart).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'facture.pdf';
      link.click();
    }, (error) => {
      console.error('Error generating bill:', error);
    });
  }

  deleteCart() {
    window.location.assign('shop')
  }


  loadCartItems() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.shopService.getCartItems(user).subscribe(data => {
      this.cart = data
      this.calculateTotalPrice()
    })
    this.cartItemsTotalPrice = 0
  }

  calculateTotalPrice() {
    this.cartItemsTotalPrice = this.cart.reduce((total, cartItem) => {
      return total + (parseInt(cartItem.product.price) * cartItem.amount);
    }, 0);
  }


}
