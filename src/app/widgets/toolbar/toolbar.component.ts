import {AfterViewInit, Component, Inject, Input, output, signal} from '@angular/core';
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../../models/category.model";
import {RouterLink} from "@angular/router";
import {toSignal} from "../../utils/signals/signal.util";
import {CartModel} from "../../models/cart.model";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageCardComponent,
    ProductCardComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements AfterViewInit {
  @Input({transform: toSignal})
  userName = signal('')
  logout = output<void>();
  showCart = false;
  cartItemsTotalPrice = 0
  categories: CategoryModel[] = [
    {
      category: 'Impression Grandformat',
      product: [
        'Vinyle',
        'Bache',
        'Affiche',
        'Callendrier',
        'X-Banners',
      ]
    },
    {
      category: 'Conception Graphique',
      product: [
        'Création de logo',
        'Carte visite',
        'Papier-entête',
        'Identité graphique',
        'Conception catalogue',
      ]
    },
    {
      category: 'Marketing Digital',
      product: [
        'Community management',
        'Sponsoring',
        'Création sites E-commerce',
        'Vitrine',
      ]
    }, {
      category: 'Imperssion numerique', product: []
    }
  ]
  cart!: CartModel[]

  routing(url: string) {
    window.location.assign(url)
  }

  ngAfterViewInit() {
    this.loadCartItems()
  }

  logOut() {
    this.logout.emit()
    window.location.assign('login')
  }

  constructor(@Inject(DOCUMENT) private document: Document, private service: ShopService) {
  }

  saveCategoryToLocalStorage(item: string) {
    const category = JSON.stringify(item);
    this.document.defaultView?.localStorage.setItem('category', category);
    window.location.assign('shop')
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

  calculateTotalPrice() {
    this.cartItemsTotalPrice = this.cart.reduce((total, cartItem) => {
      return total + (parseInt(cartItem.product.price) * cartItem.amount);
    }, 0);
  }


  addToCartFromToolBar(productId: string | undefined, flag: string) {
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


}

