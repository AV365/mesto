export default class Card {

    constructor(data, selector, popupFnc) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._popup = popupFnc;
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

    _remove() {
        this._element.classList.toggle('card-item_closed');
        // Мне бы хотелось сохранить плавность удаления карточки, я изменил свойства css класса, сейчас ошибки нет.
        this._element.addEventListener('transitionend', () => {
            this._element.remove();
            this._element = null;
        });
    }


    _preview() {
        this._popup();
            }


    _getCardTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card-item')
            .cloneNode(true);
    }


    _setEventListeners() {
        this._element.querySelector('.button_like').addEventListener('click', (evt) => {
            this._like(evt.target);
        });

        this._element.querySelector('.card-item__pic').addEventListener('click', () => {
            this._preview();
        });

        this._element.querySelector('.js-card-delete').addEventListener('click', () => {
            this._remove();
        });
    }
}

