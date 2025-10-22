import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-salon-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './salon-home.component.html',
  styleUrl: './salon-home.component.scss'
})
export class SalonHomeComponent {}
