import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {CardComponent} from "./widgets/card/card.component";
import {ImageCardComponent} from "./widgets/image-card/image-card.component";
import {ProductCardComponent} from "./widgets/product-card/product-card.component";
import {ToolbarComponent} from "./widgets/toolbar/toolbar.component";
import {FooterComponent} from "./widgets/footer/footer.component";
import {ServiceSectionComponent} from "./components/home/service-section/service-section.component";
import {AboutUsSectionComponent} from "./components/home/about-us-section/about-us-section.component";
import {WhyUsComponent} from "./components/home/why-us/why-us.component";
import {SliderComponent} from "./components/home/slider/slider.component";
import {RecentWorksComponent} from "./components/home/recent-works/recent-works.component";
import {ContactComponent} from "./components/contact/contact.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {FaqComponent} from "./components/faq/faq.component";
import {HomeComponent} from "./components/home/home.component";
import {BestSellingsComponent} from "./components/home/best-sellings/best-sellings.component";
import {CartComponent} from "./components/cart/cart.component";
import {OurServiceComponent} from "./components/our-service/our-service.component";
import {LoginComponent} from "./components/auth_component/login/login.component";
import {SignupComponent} from "./components/auth_component/signup/signup.component";
import {ShopComponent} from "./components/shop/shop.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {AuthService} from "./services/auth-service/auth.service";
import {LoginAdminComponent} from "./back-office/login/login-admin/login-admin.component";
import {ContainerComponent} from "./back-office/container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CardComponent,
    ImageCardComponent,
    ProductCardComponent,
    ToolbarComponent,
    BestSellingsComponent,
    FooterComponent,
    ServiceSectionComponent,
    AboutUsSectionComponent,
    WhyUsComponent,
    SliderComponent,
    RecentWorksComponent,
    ContactComponent,
    AboutUsComponent,
    FaqComponent,
    HomeComponent,
    CartComponent,
    OurServiceComponent,
    LoginComponent,
    SignupComponent,
    ShopComponent,
    SettingsComponent,
    LoginAdminComponent,
    ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentUser: any;
  username = ''
  userRole!: string
  currentRoute = ''


  constructor(private router: Router, private authService: AuthService) {
  }

  logout() {
    this.authService.logout()
  }

  pathTag() {
    if (this.currentRoute === '/admin/login') {
      return true
    } else if (this.currentRoute === '/bill') {
      return true
    } else return false

  }


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
    const token = localStorage.getItem(this.authService.TOKEN_KEY);
    if (token) {
      this.authService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.username = user.username;
        this.userRole = user.role;
      });
    }

  }


}
