//import initialCards from './data.js';

//TODO: like
//TODO: remove
//TODO: esc listener
//TODO outbox listener


export const initialCards = [
    {
        name: 'Алтай',
        link: 'https://av365.github.io/mesto/images/photo1.jpg'
    },
    {
        name: 'Крым',
        link: 'https://av365.github.io/mesto/images/photo2.jpg'
    },
    {
        name: 'Териберка',
        link: 'https://av365.github.io/mesto/images/photo3.jpg'
    },
    {
        name: 'Калининград',
        link: 'https://av365.github.io/mesto/images/photo4.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://av365.github.io/mesto/images/photo5.png'
    },
    {
        name: 'Башкирия',
        link: 'https://av365.github.io/mesto/images/photo6.jpg'
    },
];

const popupPlace = document.querySelector('.js-popup-place');

const imagePreview = document.querySelector('.preview__image');
const titlePreview = document.querySelector('.preview__title');

export default class Card {

    constructor(data, selector) {

        this._name = data.name;
        this._link = data.link;
        this._selector = selector;

    }

    create() {
        this._element = this._getCardTemplate();
        this._element.querySelector('.card-item__pic').src = this._link;
        this._element.querySelector('.card-item__title').textContent = this._name;

        this._setEventListeners();
        console.log(this._element);

        return this._element;

    }

    _like(evt) {
        evt.classList.toggle('button_like-isset');
    }


    _setPopupOpened(element) {
        element.classList.add('popup_opened');
    }

    _preview(evt) {
        imagePreview.src = this._link;
        titlePreview.textContent imagePreview.alt  = this._name;

        this._setPopupOpened(popupPlace);

        // _setPopupOpened(popupPlace);


        // setEscListener();
        //
        // imagePreview.src = evt.target.attributes.src.value;
        // titlePreview.innerText = evt.target.attributes.alt.value;
        // imagePreview.alt = evt.target.attributes.alt.value;


        console.log(evt);

    }


    _getCardTemplate() {

        const template = document
            .querySelector(this._selector)
            .content
            .querySelector('.card-item')
            .cloneNode(true);
        return template;

        //console.log(template);


    }

    _setEventListeners() {

        this._element.querySelector('.button_like').addEventListener('click', (evt) => {
            this._like(evt.target);
        });

        this._element.querySelector('.card-item__pic').addEventListener('click', (evt) => {
            this._preview(this._element);
        });

    }
}

