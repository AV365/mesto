import './index.css';
import {initialCards, validatorSettings, selectorsSettings} from '../utils/data.js';
import UserInfo from "../components/UserInfo.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";


const editButton = document.querySelector(selectorsSettings.buttonEditProfileSelector);
const addCardButton = document.querySelector(selectorsSettings.buttonAddCardSelector);
const nameInput = document.querySelector(selectorsSettings.inputProfileNameSelector);
const jobInput = document.querySelector(selectorsSettings.inputProfileInfoSelector);

//Создаем карточку
function createCard(item) {
    const newCard = new Card(
        item,
        selectorsSettings.cardTplSelector,
        (handleCardClick) => {
            popupPlace.open(item.link, item.name);
        }
    );
    const newCardElement = newCard.create();
    return newCardElement;

}

// SECTION
const insCards = new Section({
        items: initialCards,
        renderer: (item) => {
            const newCardElement = createCard(item);
            insCards.addItem(newCardElement);
        }
    },
    selectorsSettings.cardsSelector
);


//Popup с превью
const popupPlace = new PopupWithImage(
    selectorsSettings.popupPreviewSelector,
    selectorsSettings.previewTitleSelector,
    selectorsSettings.previewImageSelector
);


//Popup с профилем
const userInfo = new UserInfo({name: '.profile__person', info: '.profile__job'});
const popupProfile = new PopupWithForm(
    {
        selector: selectorsSettings.popupProfileSelector,
        submitFnc: (values) => {
            userInfo.setUserInfo(values.name, values.info);
        }
    },
    selectorsSettings.formProfileSelector);


//Попап с новой карточкой
const popupNewCard = new PopupWithForm(
    {
        selector: selectorsSettings.popupNewCardSelector,
        submitFnc: (values) => {
            const newCard = createCard(values);
            insCards.prependItem(newCard);
        }
    },
    selectorsSettings.formCardSelector);


function setEventListeners() {
    addCardButton.addEventListener('click', (evt) => {
        popupNewCard.open();
    });

    editButton.addEventListener('click', (evt) => {
        const getUserInfo = userInfo.getUserInfo();

        nameInput.value = getUserInfo.name;
        nameInput.focus();
        jobInput.value = getUserInfo.info;
        popupProfile.open();
    });

}

setEventListeners();


insCards.renderItems();


const validateProfile = new FormValidator(validatorSettings, selectorsSettings.formProfileSelector);
validateProfile.enableValidation();

const validateCard = new FormValidator(validatorSettings, selectorsSettings.formCardSelector);
validateCard.enableValidation();


