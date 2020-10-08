import { initialCards } from './Card.js';
import Card from './Card.js';



initialCards.forEach(item => {

    const newCard = new Card(item, '.js-card-item-template');
    const card = newCard.create();

    document.querySelector('.cards').appendChild(card);
   //console.log(newCard);

});
