import {Component} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {SliderComponent} from "./slider/slider.component";
import {AboutUsSectionComponent} from "./about-us-section/about-us-section.component";
import {ServiceSectionComponent} from "./service-section/service-section.component";
import {WhyUsComponent} from "./why-us/why-us.component";
import {RecentWorksComponent} from "./recent-works/recent-works.component";
import {BestSellingsComponent} from "./best-sellings/best-sellings.component";
import {CompanySpecsComponent} from "./company-specs/company-specs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    AboutUsSectionComponent,
    ServiceSectionComponent,
    BestSellingsComponent,
    WhyUsComponent,
    RecentWorksComponent,
    CompanySpecsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  bestSellingItems: ProductModel[] = []


}
