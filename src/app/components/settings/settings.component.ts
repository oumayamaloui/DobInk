import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {SettingService} from "../../services/settings-service/setting.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {ProfileModel} from "../../models/profile.model";
import {FormsModule} from "@angular/forms";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommandeService} from "../../services/commande/commande.service";
import {CommandeModel} from "../../models/commande.model";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProductCardComponent,
    NgStyle,
    FormsModule,
    NgClass
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterContentInit {
  wishes!: ProductModel[]
  commande!: CommandeModel[]
  subscribed = false
  userData!: ProfileModel
  address!: string
  phone!: string
  email!: string
  username!: string
  newpass!: string
  oldpass!: string
  currentSetting = 'Account'
  product!: ProductModel[]
  showOverlay: boolean = false;
  selectedCommande!: CommandeModel


  ngAfterContentInit() {
    this.loadWishes()
    this.getStatus()
    this.getUserDetails()
    this.loadCommande()
    this.loadProduct()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }


  constructor(@Inject(DOCUMENT) private document: Document,
              private snackBar: MatSnackBar,
              private service: ShopService,
              private settingService: SettingService,
              private authService: AuthService,
              private commandeService: CommandeService
  ) {
  }

  loadCommande() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.commandeService.getCommandeByUserId(user).subscribe((res) => {
      this.commande = res
    })

  }


  setInitialValues() {
    if (this.userData.phone) {
      this.phone = this.userData.phone
    }

    if (this.userData.address) {
      this.address = this.userData.address
    }

    if (this.userData.username) {
      this.username = this.userData.username
    }

  }

  getUserDetails() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let id = ''
    if (data) {
      id = JSON.parse(data).id
      this.email = JSON.parse(data).email
    }
    this.authService.getUserDetails(id).subscribe(res => {
      this.userData = res
      this.setInitialValues()
    })
  }

  loadWishes() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.service.getFavouriteItems(user).subscribe(data => {
      this.wishes = []
      data.forEach((item: { product: ProductModel; }) => {
        this.wishes.push(item.product);
      });
    })
  }

  toggleFavouriteInProfile(productId: string | undefined) {
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


  changeSettingNav(nav: string) {
    this.currentSetting = nav
  }

  subscribe() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    let tag = ''
    if (data) {
      user = JSON.parse(data).email
    }
    if (!this.subscribed) {
      tag = 'del'
    } else {
      tag = 'add'
    }
    this.settingService.subscribe(user, tag).subscribe(() => {
      this.openSnackBar('Changement a été fait avec succès', 'fermer')
    })
  }

  getStatus() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.settingService.getStatus(user).subscribe(res => {
      this.subscribed = res.isSubscribed
    })
  }


  changePassword(oldpass: string, newpass: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.changePassword(oldpass, newpass, user).subscribe(() => {
      window.location.reload()
    })
  }

  updatePhoneNumber(number: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updatePhoneNumber(number, user).subscribe(() => {
      window.location.reload()
    })
  }

  updateUserName(name: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updateUsername(name, user).subscribe(() => {
      window.location.reload()
    })
  }

  updateAdresse(adresse: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updateAddress(adresse, user).subscribe(() => {
      window.location.reload()
    })
  }


  update() {
    if (this.username) {
      this.updateUserName(this.username)
    }
    if (this.address) {
      this.updateAdresse(this.address)
    }
    if (this.phone) {
      this.updatePhoneNumber(this.phone)
    }

    if (this.newpass && this.oldpass) {
      this.changePassword(this.oldpass, this.newpass)
    }

    this.openSnackBar('Mise à jour du profil réussie', 'fermer')


  }

  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.showOverlay = false;
    }
  }

  formatDateToDDMMYYYY(dateString: Date): string {
    const DateString = dateString.toString()
    const date = new Date(DateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  getProductPriceFromId(id: string): string {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {
        return this.product[i].price
      }

    }
    return '0'

  }

  getProductNameFromId(id: string): string {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {
        return this.product[i].name
      }

    }
    return '0'

  }

  getProductImageFromId(id: string): string {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {
        return this.product[i].imagePath
      }

    }
    return '0'

  }

  getProductOffreFromId(id: string): string {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {

        return this.product[i].offer;
      }
    }
    return '00';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'en cours':
        return '#c4c400';
      case 'refusée':
        return 'red';
      default:
        return 'green';
    }
  }

  total(commande: CommandeModel) {
    let total = 0;
    for (let i = 0; i < commande.items.length; i++) {
      const item = commande.items[i]

      total += parseInt(item.amount)
        * parseInt(this.getProductPriceFromId(item.productId))
        * (1 - parseInt(this.getProductOffreFromId(item.productId)) / 100);

    }
    return total

  }


}
