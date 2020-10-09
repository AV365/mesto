const popupPlace = document.querySelector('.js-popup-place');

const imagePreview = document.querySelector('.preview__image');
const titlePreview = document.querySelector('.preview__title');


export default class Card {

    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._close = data.closeFunc;
        this._selector = selector;
    }

    create() {
        this._element = this._getCardTemplate();
        this._element.querySelector('.card-item__pic').src = this._link;
        this._element.querySelector('.card-item__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _like(evt) {
        evt.classList.toggle('button_like-isset');
    }


    _remove(deleteItem) {
        deleteItem.classList.toggle('card-item_closed');
        deleteItem.addEventListener('transitionend', () => {
            deleteItem.remove();
        });
    }


    _preview(evt) {
        imagePreview.src = this._link;
        titlePreview.textContent = this._name;
        imagePreview.alt = this._name;

        this._close(popupPlace);
    }


    _getCardTemplate() {
        const template = document
            .querySelector(this._selector)
            .content
            .querySelector('.card-item')
            .cloneNode(true);
        return template;
    }


    _setEventListeners() {
        this._element.querySelector('.button_like').addEventListener('click', (evt) => {
            this._like(evt.target);
        });

        this._element.querySelector('.card-item__pic').addEventListener('click', (evt) => {
            this._preview(this._element);
        });

        this._element.querySelector('.js-card-delete').addEventListener('click', (evt) => {
            this._remove(this._element);
        });
    }
}

