import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {ProductDetailedComponent} from "../product-detailed/product-detailed.component";
import {CartModel} from "../../models/cart.model";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ItemsComponent,
    ProductCardComponent,
    NgStyle,
    ProductDetailedComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements AfterContentInit {
  product!: ProductModel[]
  selectedItem: ProductModel | undefined
  category = 'shops'
  filter = 'ahmed mo7sen'


  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }


  comparing(path: string, category: string) {
    return path.toLowerCase() === category.toLowerCase();
  }


  ngAfterContentInit() {
    this.loadProduct()
  }

  constructor(private snackBar: MatSnackBar, private service: ShopService, @Inject(DOCUMENT) private document: Document) {
    this.loadCategoryFromLocalStorage()
  }

  saveSelectedItemToLocalStorage(item: ProductModel) {
    const selectedItem = JSON.stringify(item);
    this.document.defaultView?.localStorage.setItem('selectedItem', selectedItem);
    window.location.assign('details')
  }

  loadCategoryFromLocalStorage() {
    const category = this.document.defaultView?.localStorage.getItem('category');
    if (category) {
      this.category = JSON.parse(category);
    }
  }


  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  addToCart(productId: string | undefined, flag: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.addToCart(productId, flag, user).subscribe(() => {
        this.openSnackBar('Produit a été ajouter au panier', 'fermer')
      })
  }

  toggleFavourite(productId: string | undefined) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.toggleFavourite(productId, user).subscribe(() => {
        this.openSnackBar('Changement a été fait avec succès', 'fermer')

      })
  }


}
