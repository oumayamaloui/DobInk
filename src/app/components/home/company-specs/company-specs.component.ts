import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-company-specs',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './company-specs.component.html',
  styleUrl: './company-specs.component.scss'
})
export class CompanySpecsComponent {

}
