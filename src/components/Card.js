import {selectorsSettings} from "../utils/data";

export default class Card {

    constructor(id, data, selectors, handleCardClick, handleCardDelete) {

        //console.log(data);

        this._myId = id;
        this._name = data.name;
        this._link = data.link;
        this._likeCount = 0;

        this._ownerId = data.owner._id;
        this._idCard = data._id;
        this._likeCount = data.likes.length;

        if (!data.itsVirtualCard) {

        }

        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;

        this._selector = selectors.cardTplSelector;
        this._cardTitleSelector = selectors.cardTitleSelector;
        this._cardPicSelector = selectors.cardPicSelector;
        this._cardLikeBtnSelector = selectors.cardLikeBtnSelector;
        this._cardLikeCountSelector = selectors.cardLikeCountSelector;
        this._cardDeleteBtnSelector = selectors.cardDeleteBtnSelector;

    }

    create() {

        this._element = this._getCardTemplate();
        this._element.id = this._idCard;
        this._element.querySelector(this._cardPicSelector).src = this._link;
        this._element.querySelector(this._cardTitleSelector).textContent = this._name;
        this._element.querySelector(this._cardLikeCountSelector).textContent = this._likeCount;

        if (!this._itsMyCard()) {
           this._element
               .querySelector(this._cardDeleteBtnSelector)
               .classList
               .add('button_visibility_hidden');
        };

        this._setEventListeners();

        return this._element;
    }

    _like() {
        this._element
            .querySelector(this._cardLikeBtnSelector)
            .classList
            .toggle('button_like-isset');
    }

    _remove() {

    }


    _getCardTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card-item')
            .cloneNode(true);
    }

    _itsMyCard() {
        if (this._myId === this._ownerId) return true;
        else return false;
    }


    _setEventListeners() {
        this._element.querySelector('.button_like').addEventListener('click', (evt) => {
            this._like();
        });

        this._element.querySelector('.card-item__pic').addEventListener('click', () => {
            this._handleCardClick();
        });

        // this._element.querySelector('.js-card-delete').addEventListener('click', () => {
        //     this._remove();
        //  });

        this._element.querySelector('.js-card-delete').addEventListener('click', () => {
            this._handleCardDelete();
        });

    }
}

