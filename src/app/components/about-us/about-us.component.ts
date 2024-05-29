import {Component, Input, Signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {HoveredPictureWidgetComponent} from "../../widgets/hovered-picture-widget/hovered-picture-widget.component";
import {toSignal} from "../../utils/signals/signal.util";
import {HoveredPicutreModel} from "../../models/hovered-picutre.model";
import {HoveredPictureMemberComponent} from "../../widgets/hovered-picture-member/hovered-picture-member.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HoveredPictureWidgetComponent,
    HoveredPictureMemberComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {



  product: HoveredPicutreModel[] = [
    {
      text: 'IMPRESSION SUR OREILLER',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hvnfuppizowvtnyhoiwo.jpg'
    },
    {
      text: 'IMPRESSION SUR T-SHIRT',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/s87kkvhm9ouryrpaljnj.jpg'
    },
    {
      text: 'IMPRESSION NUMÉRIQUE',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hwimotbgvw9u3rvcpfgx.jpg'
    },
    {
      text: 'IMPRESSION SUR SURFACE',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/z0cmbg6nmlyezlv5cyfp.jpg'
    },
    {
      text: 'SCREEN PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/t1wbw7ihb8b96c14dlab.jpg'
    },
    {
      text: 'IMPRESSION FLEXOGRAPHIQUE',
      imagePath: 'https://printme-theme.myshopify.com/cdn/shop/files/abo01.jpg?v=1641808073'
    },
  ];


}
