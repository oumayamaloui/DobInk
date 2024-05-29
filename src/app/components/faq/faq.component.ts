import {Component, Input, Signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {toSignal} from "../../utils/signals/signal.util";
import {FAQModel} from "../../models/FAQ.model";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: FAQModel[] = [
    {
      question: 'COMMENT MA COMMANDE SERA-T-ELLE LIVRÉE?',
      response: 'Votre commande sera livrée via un service de messagerie fiable directement à votre adresse.',
      open: false
    },
    {
      question: 'QUE DOIS-JE SAVOIR?',
      response: 'Vous devez vous assurer que votre adresse de livraison et vos informations de contact sont correctes.',
      open: false
    },
    {
      question: 'COMMENT SAURAI-JE SI MA COMMANDE EST PASSÉE AVEC SUCCÈS?',
      response: 'Vous recevrez un e-mail de confirmation une fois que votre commande sera passée avec succès.',
      open: false
    },
    {
      question: 'COMMENT PUIS-JE VÉRIFIER LE STATUT DE MA COMMANDE?',
      response: 'Vous pouvez vérifier le statut de votre commande en vous connectant à votre compte sur notre site web.',
      open: false
    },
    {
      question: 'PUIS-JE ANNULER MA COMMANDE?',
      response: 'Oui, vous pouvez annuler votre commande tant qu\'elle n\'a pas encore été expédiée.',
      open: false
    }
  ]


  closeAllQuestions(index: number) {
    if (this.faqs) {
      for (let i = 0; i < this.faqs.length; i++) {
        if (this.faqs[i]) {
          this.faqs[i].open = false;
        }
      }
      if (this.faqs[index]) {
        this.faqs[index].open = true;
      }
    }
  }
}
