import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-service-section',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss'
})
export class ServiceSectionComponent {

}
