import './index.css';
import {apiSettings, initialCards, validatorSettings, selectorsSettings} from '../utils/data.js';
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm";


const editButton = document.querySelector(selectorsSettings.buttonEditProfileSelector);
const addCardButton = document.querySelector(selectorsSettings.buttonAddCardSelector);
const nameInput = document.querySelector(selectorsSettings.inputProfileNameSelector);
const jobInput = document.querySelector(selectorsSettings.inputProfileInfoSelector);

const api = new Api({
    url: apiSettings.url,
    headers: {
        "authorization": apiSettings.token,
        "Content-Type": "application/json"
    },
});


//Пользователь
const userInfo = new UserInfo({
    name: selectorsSettings.profileNameSelector,
    info: selectorsSettings.profileAboutSelector,
    avatar: selectorsSettings.profileAvatarSelector
});

//загружаем информацию о пользователе
function initUserInfo() {
    api.getUserInfo().then(data => {
        userInfo.initUserInfo(data);

    });
}

initUserInfo();


const insCards = new Section({
        items: {},
        renderer: (item) => {
            const newCardElement = createCard(item);
            insCards.addItem(newCardElement);
        }
    },
    selectorsSettings.cardsSelector
);


function initCards(insCards) {
    api.getCards()
        .then((data) => {
            insCards.items = data;
            insCards.renderItems();
        });
}

initCards(insCards);

//insCards.renderItems();


//Создаем карточку
function createCard(item) {
    const newCard = new Card(
        userInfo.id,
        item,
        selectorsSettings,
        (handleCardClick) => {
            popupPlace.open(item.link, item.name);
        },
        (handleCardDelete) => {
            popupConfirm.open(item._id);
        },
        (handleCardLike) => {

            //Карточка имеет мой лайк - удаление лайка по клику
            if (newCard.hasMyLike()) {

                api.likeCard(item._id, 'DELETE').then(res => {
                    newCard.setLikeCount(res.likes.length);
                    newCard.likesObj = res.likes;
                });
            }//Я еще не лайкал - ставим
            else {
                api.likeCard(item._id, 'PUT').then(res => {
                    newCard.setLikeCount(res.likes.length);
                    newCard.likesObj = res.likes;
                });
            }
        }
    );
    const newCardElement = newCard.create();
    return newCardElement;

}


//Popup с превью
const popupPlace = new PopupWithImage(
    selectorsSettings.popupPreviewSelector,
    selectorsSettings.previewTitleSelector,
    selectorsSettings.previewImageSelector
);


//Popup c подтверждением
const popupConfirm = new PopupWithConfirm(
    {
        selector: selectorsSettings.popupConfirm,
        submitFnc: (id) => {
            api.deleteMyPlace(id).then(res => {
                console.log(res);
                if (!res.message) return new Promise.reject('Ошибка удаления');

                popupConfirm.close();

                const deleteELement = document.getElementById(id);
                deleteELement.classList.toggle('card-item_closed');
                deleteELement.addEventListener('transitionend', () => {
                    deleteELement.remove();
                    deleteELement = null;
                });
            })
                .catch(err => {
                    popupConfirm.close();
                });
        }
    },
    selectorsSettings.formConfirmSelector);

const popupProfile = new PopupWithForm(
    {
        selector: selectorsSettings.popupProfileSelector,
        submitFnc: (values) => {
            api.updateUserInfo(values.name, values.info).then(res => {
                    initUserInfo();
                }
            );
        }
    },
    selectorsSettings.formProfileSelector);


//Попап с новой карточкой
const popupNewCard = new PopupWithForm(
    {
        selector: selectorsSettings.popupNewCardSelector,
        submitFnc: (values) => {
            api.createNewPlace(values.name, values.link).then(res => {
                const newCard = createCard(res);
                insCards.prependItem(newCard);
            });

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


const validateProfile = new FormValidator(validatorSettings, selectorsSettings.formProfileSelector);
validateProfile.enableValidation();

const validateCard = new FormValidator(validatorSettings, selectorsSettings.formCardSelector);
validateCard.enableValidation();


