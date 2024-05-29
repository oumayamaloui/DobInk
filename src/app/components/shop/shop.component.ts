import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {ProductDetailedComponent} from "../product-detailed/product-detailed.component";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ItemsComponent,
    ProductCardComponent,
    NgStyle,
    ProductDetailedComponent,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements AfterContentInit {
  product!: ProductModel[]
  selectedItem: ProductModel | undefined
  category = 'shops'
  selectedSortOption: string = 'default';


  min!: number
  max!: number
  ig: boolean = false;
  cg: boolean = false;
  md: boolean = false;
  im: boolean = false;
  searchTerm: string = '';

  sortProducts() {
    switch (this.selectedSortOption) {
      case 'a-z':
        this.product.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        this.product.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        this.product.sort((a, b) => {
          const aPriceAfterOffer = parseFloat(a.price) * (1 - parseFloat(a.offer) / 100);
          const bPriceAfterOffer = parseFloat(b.price) * (1 - parseFloat(b.offer) / 100);
          return aPriceAfterOffer - bPriceAfterOffer;
        });
        break;
      case 'price-desc':
        this.product.sort((a, b) => {
          const aPriceAfterOffer = parseFloat(a.price) * (1 - parseFloat(a.offer) / 100);
          const bPriceAfterOffer = parseFloat(b.price) * (1 - parseFloat(b.offer) / 100);
          return bPriceAfterOffer - aPriceAfterOffer;
        });
        break;
      default:
        // Do nothing or apply a default sorting
        break;
    }
  }
  shouldShowItem(item: ProductModel): boolean {
    if (!this.ig && !this.cg && !this.md && !this.im) {
      return true;
    }

    return (
      (this.ig && item.category.toLowerCase() === 'Impression Grandformat'.toLowerCase()) ||
      (this.cg && item.category.toLowerCase() === 'Conception Graphique'.toLowerCase()) ||
      (this.md && item.category.toLowerCase() === 'Marketing Digital'.toLowerCase()) ||
      (this.im && item.category.toLowerCase() === 'Imperssion numerique'.toLowerCase())
    );
  }


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
      this.sortProducts();
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


  protected readonly parseFloat = parseFloat;
  protected readonly parseInt = parseInt;
}
