import {Component, Input, output, signal, Signal} from '@angular/core';
import {ImageCardComponent} from "../image-card/image-card.component";
import {toSignal} from "../../utils/signals/signal.util";
import {ProductModel} from "../../models/product.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ImageCardComponent,
    NgClass
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({transform: toSignal})
  imageDimentions: Signal<number[]> = signal([360, 280])
  @Input({transform: toSignal})
  product!: Signal<ProductModel>
  check = output<void>();
  addTocart = output<void>();
  addToWishes = output<void>();

  hasOffer(): boolean {
    return parseInt(this.product().offer) > 0;
  }

  newPrice(price: string, offre: string): number {
    const originalPrice = parseFloat(price);
    const offerPercentage = parseFloat(offre);
    const discountedPrice = originalPrice - (originalPrice * offerPercentage / 100);
    return Math.round(discountedPrice * 100) / 100;
  }


}
