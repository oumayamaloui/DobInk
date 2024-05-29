import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-hovered-picture-member',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './hovered-picture-member.component.html',
  styleUrl: './hovered-picture-member.component.scss'
})
export class HoveredPictureMemberComponent {

  @Input({required: true})
  imagePath!: string

  @Input({required: true})
  name!: string
  @Input({required: true})
  role!: string

}
