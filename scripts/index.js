import {initialCards, validatorSettings} from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = Array.from(document.querySelectorAll('.popup'));
const cardSection = document.querySelector('.cards');

const popupProfile = document.querySelector('.js-popup-profile');
const popupCard = document.querySelector('.js-popup-card');

const editButton = document.querySelector('.button_edit');
const addCardButton = document.querySelector('.button_add');

const formElementProfile = document.querySelector('.js-form-profile');
const formElementCard = document.querySelector('.js-form-card');

const nameInput = document.querySelector('.form__profile-name');
const jobInput = document.querySelector('.form__profile-job');
const placeInput = document.querySelector('.form__card-name');
const urlInput = document.querySelector('.form__card-url');

const nameNow = document.querySelector('.profile__person');
const jobNow = document.querySelector('.profile__job');


function setPopupOpened(element) {
    element.classList.add('popup_opened');
}


const showPopupCardPreview = (popup) => {
    setPopupOpened(popup);
    setEscListener();
}


function showPopupProfile() {
    setPopupOpened(popupProfile);
    setEscListener();
    nameInput.value = nameNow.textContent;
    nameInput.focus();
    jobInput.value = jobNow.textContent;
}


function showPopupAddCard() {
    setPopupOpened(popupCard);
    setEscListener();
    placeInput.focus();
}


function setEscListener() {
    document.addEventListener('keyup', escListener);
}


function escListener(evt) {
    if (evt.key === "Escape") {
        closePopup();
        document.removeEventListener('keyup', escListener);
    }
}


function closePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup.classList.remove('popup_opened');
}


function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameNow.textContent = nameInput.value;
    jobNow.textContent = jobInput.value;
    closePopup();
}


function formCardSubmitHandler(evt) {
    evt.preventDefault();

    const addPlace = {};
    addPlace['name'] = placeInput.value;
    addPlace['link'] = urlInput.value;
    addPlace.closeFunc = showPopupCardPreview;

    const newCard = new Card(addPlace, '.js-card-item-template');
    const myCard = newCard.create();
    addCard(myCard);

    formElementCard.reset();
    closePopup();
}


function addCard(cardElement) {
    cardSection.prepend(cardElement);
}


function addButtonsListeners() {
    editButton.addEventListener('click', showPopupProfile);
    addCardButton.addEventListener('click', showPopupAddCard);

    popups.forEach(popup => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('button_close')) {
                closePopup();
            }
        });
    });

    formElementProfile.addEventListener('submit', formProfileSubmitHandler);
    formElementCard.addEventListener('submit', formCardSubmitHandler);
}


addButtonsListeners();


initialCards.forEach((item) => {
    item.closeFunc = showPopupCardPreview;
    const newCard = new Card(item, '.js-card-item-template');
    const card = newCard.create();

    document.querySelector('.cards').appendChild(card);
});


const validateProfile = new FormValidator(validatorSettings, '.js-form-profile');
validateProfile.enableValidation();

const validateCard = new FormValidator(validatorSettings, '.js-form-card');
validateCard.enableValidation();

