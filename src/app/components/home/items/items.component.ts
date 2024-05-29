import {Component, Input, Signal} from '@angular/core';
import {toSignal} from "../../../utils/signals/signal.util";
import {ProductModel} from "../../../models/product.model";
import {ProductCardComponent} from "../../../widgets/product-card/product-card.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  @Input({transform: toSignal})
  selectedFilter!: Signal<string>
  @Input({transform: toSignal})
  items!: Signal<ProductModel[]>


}
