import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hovered-picture-widget',
  standalone: true,
  imports: [],
  templateUrl: './hovered-picture-widget.component.html',
  styleUrl: './hovered-picture-widget.component.scss'
})
export class HoveredPictureWidgetComponent {

  @Input({required: true})
  imagePath!: string
  @Input({required: true})
  text!: string


}
