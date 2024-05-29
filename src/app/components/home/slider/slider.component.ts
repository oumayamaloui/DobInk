import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  selectedSlide = true
  // constructor() {
  //   setInterval(() => {
  //     this.selectedSlide = !this.selectedSlide;
  //   }, 4000);
  // }

  navigate(){
    window.location.assign('shop')
  }


}
