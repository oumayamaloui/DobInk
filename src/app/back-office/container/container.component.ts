import {AfterViewInit, Component} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Contact} from "../../models/reclamation.model";
import {UserModel} from "../../models/user.model";
import {AddProductService} from "../service/add-product.service";
import {ShopService} from "../../services/shop-service/shop.service";
import {ProductModel} from "../../models/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {AuthService} from "../../services/auth-service/auth.service";
import {CommandeModel} from "../../models/commande.model";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements AfterViewInit {
  files: File[] = []
  product!: ProductModel[]
  reclamation: Contact[] = []
  contact: Contact[] = []
  userlist: UserModel[] = []
  commandeList: CommandeModel[] = []

  category = 'Imperssion numerique';
  newProductPrice = ''
  newProductName = ''
  newProductDescription = ''
  fileName = 'Choisir une image'
  reclamationStatus = 'non lu'
  contactStatus = 'non lu'
  clicked = false


  selectedElement = 'Products'
  selectedProduct!: ProductModel
  selectedReclamation!: Contact
  selectedContact!: Contact
  selectedUser!: UserModel
  selectedCommande!: CommandeModel
  subs!: { id: string, email: string }[]


  emailSubject!: string
  emailBody!: string


  add = ''
  selectedFilter = 'Tous les commandes'
  showOverlay: boolean = false;


  constructor(private snackBar: MatSnackBar,
              private service: AddProductService, private productService: ShopService, private authService: AuthService) {

  }


  logOut() {
    this.authService.logout()
    window.location.assign('admin/login')
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  ngAfterViewInit() {
    this.loadReclamation()
    this.loadProduct()
    this.loadContact()
    this.loadUsers()
    this.loadSub()
    this.loadcommande()
  }


  loadProduct() {
    this.productService.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  loadcommande() {
    this.service.loadCommande().subscribe(res => {
      this.commandeList = res
      console.log(this.commandeList[0])

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

  updateProduct() {
    let offre = parseInt(this.selectedProduct.offer)

    const updatedProductData = {
      price: this.selectedProduct.price,
      name: this.selectedProduct.name,
      category: this.selectedProduct.category,
      description: this.selectedProduct.description,
      imagePath: this.selectedProduct.imagePath,
      offer: this.selectedProduct.offer
    };
    if (offre >= 0 && offre <= 100) {
      if (this.selectedProduct._id) {
        this.service.updateProduct(this.selectedProduct._id, updatedProductData).subscribe(
          (res) => {
            // Handle success response if needed
            console.log('Product updated successfully:', res);
            this.loadProduct()
            this.openSnackBar('le produit a été modifier', 'fermer')
            this.add = ''

          },
          (error) => {
            console.error('Error updating product:', error);
            this.clicked = false
          }
        )
      }
    } else {
      this.clicked = true

    }
  }

  deleteProduct(product: ProductModel) {
    if (product._id)
      this.service.deleteProduct(product._id).subscribe((res) => {
        console.log('Product deleted successfully:', res);
        this.toggleOverlay()
        this.loadProduct()
      })


  }


  loadReclamation() {
    this.service.loadReclamation().subscribe(res => {
      this.reclamation = res
    })
  }

  loadContact() {
    this.service.loadContact().subscribe(res => {
      this.contact = res
    })
  }

  loadUsers() {
    this.service.loadUsers().subscribe(res => {
      this.userlist = res
    })
  }

  loadSub(): void {
    this.service.loadSubscribers().subscribe(
      res => {
        this.subs = res
      },
    );
  }


  onSelect(event: any) {
    this.files = [];
    const firstFile = event.addedFiles[0];
    if (firstFile) {
      this.files.push(firstFile);
    }
    this.fileName = this.files[0].name
  }

  async addProduct() {

    let imagePath: string


    if (!this.newProductDescription || !this.newProductName || !this.newProductPrice || !this.files[0]) {
      if (!this.files[0]) {
        alert('Choisir une image ')
      }
      alert('données manquantes')
    }
    const file_data = this.files[this.files.length - 1]
    const data = new FormData()
    data.append('file', file_data)
    data.append('upload_preset', 'pfe_product')
    data.append('cloud_name', 'dwkp2dnfs')
    this.service.uploadImage(data).subscribe((res) => {
      imagePath = res.url

      const product = {
        name: this.newProductName,
        price: this.newProductPrice,
        imagePath: imagePath,
        description: this.newProductDescription,
        category: this.category
      }
      this.service.addProduct(product).subscribe(() => {
          this.openSnackBar('le produit a été ajouter', 'fermer')

          this.loadProduct()
          this.add = ''

        },
        (error) => {
          console.error('Login failed:', error);
        })

    })


  }


  updateReclamation() {
    const data = {
      id: this.selectedReclamation._id,
      newStatus: this.selectedReclamation.status
    }
    this.service.updateRecalamtionStatus(data).subscribe(() => {
      this.openSnackBar('la reclamation a été modifier', 'fermer')
      this.loadReclamation()
      this.add = ''

    })
  }

  updateContact() {
    const data = {
      id: this.selectedContact._id,
      newStatus: this.selectedContact.status
    }
    this.service.updateContactStatus(data).subscribe(() => {
      this.openSnackBar('le contact a été modifier', 'fermer')
      this.loadContact()
      this.add = ''

    })
  }

  updateCommande() {
    const data = {
      id: this.selectedCommande._id,
      newStatus: this.selectedCommande.status
    }
    this.service.updateCommandeStatus(data).subscribe(() => {
      this.openSnackBar('la commande a été modifier', 'fermer')
      this.loadcommande()
      this.add = ''

    })
  }

  updateUserStatus() {
    const data = {
      id: this.selectedUser._id,
      status: this.selectedUser.status,
      role: this.selectedUser.role
    }
    this.service.updateUserStatus(data).subscribe(() => {
      this.openSnackBar("l'utilisateur a été modifier", 'fermer')
      this.add = ''

    })
  }


  sendEmailToMultipleRecipients() {
    const emailAddresses = this.subs.map(sub => sub.email).join(',');
    const emailData = {

      recipients: emailAddresses,
      subject: this.emailSubject,
      body: this.emailBody
    };
    if (emailAddresses && this.emailBody && this.emailSubject) {
      this.service.sendEmail(emailData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);

        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    }

    this.openSnackBar("Email a été envoyer", 'fermer')

    this.emailSubject = ''
    this.emailBody = ''


  }


  sendEmail(email: string) {

    const emailData = {

      recipients: email,
      subject: this.emailSubject,
      body: this.emailBody
    };
    if (email && this.emailBody && this.emailSubject) {
      this.service.sendEmail(emailData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);


        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    }
    this.openSnackBar("Email a été envoyer", 'fermer')
    this.emailSubject = ''
    this.emailBody = ''
    this.add = ''


  }


  //// local functions
  //client data
  getClientNamesFromId(id: string) {
    for (let i = 0; i < this.userlist.length; i++) {
      if (this.userlist[i]._id === id) {
        return this.userlist[i].username
      }

    }
    return undefined

  }

  getClientEmailFromId(id: string) {
    for (let i = 0; i < this.userlist.length; i++) {
      if (this.userlist[i]._id === id) {
        return this.userlist[i].email
      }

    }
    return undefined

  }

  getClientPhoneFromId(id: string) {
    for (let i = 0; i < this.userlist.length; i++) {
      if (this.userlist[i]._id === id) {
        return this.userlist[i].phone

      }

    }
    return undefined

  }

  //product

  getProductNamesFromId(id: string) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {
        return this.product[i].name
      }

    }
    return undefined

  }

  getProductPriceFromId(id: string): string {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i]._id === id) {
        return this.product[i].price
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
    return '0';
  }

  formatDateToDDMMYYYY(dateString: Date): string {
    const DateString = dateString.toString()
    const date = new Date(DateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  total() {
    let total = 0;
    for (let i = 0; i < this.selectedCommande.items.length; i++) {
      const item = this.selectedCommande.items[i]
      total += parseInt(item.amount)
        * parseInt(this.getProductPriceFromId(item.productId))
        * (1 - parseInt(this.getProductOffreFromId(item.productId)) / 100);

    }
    return total

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


  protected readonly parseInt = parseInt;
}
