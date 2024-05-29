import {Component} from '@angular/core';
import {HoveredPictureMemberComponent} from "../../widgets/hovered-picture-member/hovered-picture-member.component";
import {HoveredPictureWidgetComponent} from "../../widgets/hovered-picture-widget/hovered-picture-widget.component";
import {NgOptimizedImage} from "@angular/common";
import {HoveredPicutreModel} from "../../models/hovered-picutre.model";

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [
    HoveredPictureMemberComponent,
    HoveredPictureWidgetComponent,
    NgOptimizedImage
  ],
  templateUrl: './our-service.component.html',
  styleUrl: './our-service.component.scss'
})
export class OurServiceComponent {


  product: HoveredPicutreModel[] = [

    {
      text: 'PILLOW PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hvnfuppizowvtnyhoiwo.jpg'
    },
    {
      text: 'T-SHIRT PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/s87kkvhm9ouryrpaljnj.jpg'
    },
    {
      text: 'DIGITAL PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hwimotbgvw9u3rvcpfgx.jpg'
    },
    {
      text: 'SURFACE PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/z0cmbg6nmlyezlv5cyfp.jpg'
    },
    {
      text: 'SCREEN PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/t1wbw7ihb8b96c14dlab.jpg'
    },
    {
      text: 'FLEXOGRAPHIC PRINTING',
      imagePath: 'https://printme-theme.myshopify.com/cdn/shop/files/abo01.jpg?v=1641808073'
    },


  ]
}
