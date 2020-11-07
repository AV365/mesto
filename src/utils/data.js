import pic1 from '../images/photo1.jpg';
import pic2 from '../images/photo2.jpg';
import pic3 from '../images/photo3.jpg';
import pic4 from '../images/photo4.jpg';
import pic5 from '../images/photo5.png';
import pic6 from '../images/photo6.jpg';


export const initialCards = [
    {
        name: 'Алтай',
        link: pic1
    },
    {
        name: 'Крым',
        link: pic2
    },
    {
        name: 'Териберка',
        link: pic3
    },
    {
        name: 'Калининград',
        link: pic4
    },
    {
        name: 'Камчатка',
        link: pic5
    },
    {
        name: 'Башкирия',
        link: pic6
    },
];


export const validatorSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active'
};

export const apiSettings = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/',
    headers: 'Content-Type" : "application/json',
    token: '26855ddc-0b32-46bf-95f9-95a4c6a68cde'
};

export const selectorsSettings = {
    cardsSelector: '.cards',
    cardTplSelector: '.js-card-item-template',
    cardTitleSelector: '.card-item__title',
    cardPicSelector: '.card-item__pic',
    cardLikeBtnSelector: '.button_like',
    cardLikeCountSelector: '.card-item__like-count',
    cardDeleteBtnSelector: '.js-card-delete',

    popupProfileSelector: '.js-popup-profile',
    popupNewCardSelector: '.js-popup-card',
    popupPreviewSelector: '.js-popup-place',

    formProfileSelector: '.js-form-profile',
    formCardSelector: '.js-form-card',

    previewImageSelector: '.preview__image',
    previewTitleSelector: '.preview__title',

    buttonEditProfileSelector: '.button_edit',
    buttonAddCardSelector: '.button_add',

    inputProfileNameSelector: '.form__profile-name',
    inputProfileInfoSelector: '.form__profile-job',

    profileNameSelector: '.profile__person',
    profileAboutSelector: '.profile__job',
    profileAvatarSelector: '.profile__avatar'
};
