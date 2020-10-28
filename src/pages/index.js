//TODO: PopupWithForm - добавление карточки


import './index.css';
import {initialCards, validatorSettings, selectorsSettings} from '../utils/data.js';
import UserInfo from "../components/UserInfo.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";



const editButton = document.querySelector('.button_edit');
const addCardButton = document.querySelector('.button_add');



const nameInput = document.querySelector('.form__profile-name');
const jobInput = document.querySelector('.form__profile-job');


//Функция создания карточек
function makeCard(items) {

    const insCards = new Section({
            items: items,
            renderer: (item) => {

                const newCard = new Card(item, selectorsSettings.cardTplSelector,
                    (handleCardClick) => {
                        const popupPlace = new PopupWithImage(selectorsSettings.popupPreviewSelector, item);
                        popupPlace.open();
                    }
                );
                const newCardElement = newCard.create();
                insCards.addItem(newCardElement);
            }
        },
        selectorsSettings.cardsSelector
    );
    insCards.renderItems();
}

//Popup с профилем
const userInfo = new UserInfo({name: '.profile__person', info: '.profile__job'});
const popupProfile = new PopupWithForm(
    {
        selector: selectorsSettings.popupProfileSelector,
        submitFnc: (evt) => {
            const insValues = popupProfile._getInputValues();
            userInfo.setUserInfo(insValues.name, insValues.info);
        }
    },
    selectorsSettings.formProfileSelector);




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

const popupNewCard = new PopupWithForm(
    {
        selector: selectorsSettings.popupNewCardSelector,
        submitFnc: (evt) => {
            let insValues = '';
            insValues = popupNewCard._getInputValues();
            let insValuesArray = '';
            insValuesArray = [{
                name: insValues.name,
                link: insValues.link,
            }];
            makeCard(insValuesArray);
        }
    },
    selectorsSettings.formCardSelector);

makeCard(initialCards);

const validateProfile = new FormValidator(validatorSettings, '.js-form-profile');
validateProfile.enableValidation();

const validateCard = new FormValidator(validatorSettings, '.js-form-card');
validateCard.enableValidation();


