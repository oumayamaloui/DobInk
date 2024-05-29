import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ContactComponent} from "./components/contact/contact.component";
import {LoginComponent} from "./components/auth_component/login/login.component";
import {FaqComponent} from "./components/faq/faq.component";
import {ShopComponent} from "./components/shop/shop.component";
import {OurServiceComponent} from "./components/our-service/our-service.component";
import {CartComponent} from "./components/cart/cart.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {SignupComponent} from "./components/auth_component/signup/signup.component";
import {ForgetPasswordComponent} from "./components/auth_component/forget-password/forget-password.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {authGuard, authGuardConnected} from "./auth-guard/auth.guard";
import {LoginAdminComponent} from "./back-office/login/login-admin/login-admin.component";
import {ProductDetailedComponent} from "./components/product-detailed/product-detailed.component";
import {FactureComponent} from "./facture/facture.component";

export const routes: Routes = [
  //** Client **//

  {path: '', component: HomeComponent},
  {path: 'faq', component: FaqComponent, canActivate: [authGuard]},
  {path: 'shop', component: ShopComponent, canActivate: [authGuard]},
  {path: 'details', component: ProductDetailedComponent, canActivate: [authGuard]},
  {path: 'ourServices', component: OurServiceComponent, canActivate: [authGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authGuardConnected]},
  {path: 'signup', component: SignupComponent, canActivate: [authGuardConnected]},
  {path: 'forgetPassword', component: ForgetPasswordComponent, canActivate: [authGuardConnected]},
  {path: 'about', component: AboutUsComponent, canActivate: [authGuard]},
  {path: 'bill', component: FactureComponent, canActivate: [authGuard]},
  {path: 'client/profile', component: SettingsComponent},


  //** Admin **//
  {path: 'admin', component: HomeComponent},
  {path: 'admin/login', component: LoginAdminComponent, canActivate: [authGuardConnected]},

  //** Redirect **//
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
