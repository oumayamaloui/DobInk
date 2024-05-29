import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-recent-works',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './recent-works.component.html',
  styleUrl: './recent-works.component.scss'
})
export class RecentWorksComponent {

}
