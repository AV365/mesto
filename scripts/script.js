const initialCards = [
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

const popupProfile = document.querySelector('.js-popup-profile');
const popupCard = document.querySelector('.js-popup-card');
const popupPlace = document.querySelector('.js-popup-place');

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

const imagePreview = document.querySelector('.preview__image');
const titlePreview = document.querySelector('.preview__title');

const cardSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('.js-card-item-template').content;

function nullImg(element) {

    const replaceImg = element.closest('.card-item__pic');

    replaceImg.attributes.src.value = './images/no-image.svg';

}

function showPopup(evt) {

    if (evt.target.classList.contains('button_edit')) {

        popupProfile.classList.toggle('popup_opened');

        nameInput.value = nameNow.textContent;
        jobInput.value = jobNow.textContent;

    } else if (evt.target.classList.contains('button_add')) {

        popupCard.classList.toggle('popup_opened');
        placeInput.focus();

    } else if (evt.target.classList.contains('card-item__pic')) {
        popupPlace.classList.toggle('popup_opened');

        imagePreview.src = evt.target.attributes.src.value;
        titlePreview.innerText = evt.target.attributes.alt.value;
        imagePreview.alt = evt.target.attributes.alt.value;

    }


}

function closePopup(evt) {
    const currentPopup = evt.target.closest('section');
    currentPopup.classList.toggle('popup_opened');

}


function formProfileSubmitHandler(evt) {

    evt.preventDefault();
    nameNow.textContent = nameInput.value;
    jobNow.textContent = jobInput.value;

    popupProfile.classList.toggle('popup_opened');
}


function formCardSubmitHandler(evt) {

    evt.preventDefault();

    const addPlace = {};
    addPlace['name'] = placeInput.value;
    addPlace['link'] = urlInput.value;

    createCard(addPlace);
    placeInput.value = '';
    urlInput.value = '';

    popupCard.classList.toggle('popup_opened');

}


function createCard(card) {


    let cardNew = cardTemplate.cloneNode(true);

    cardNew.querySelector('.card-item__title').innerText = card.name;

    const cardImg = cardNew.querySelector('.card-item__pic');

    cardImg.src = card.link;
    cardImg.alt = card.name;

    let deleteButton = cardNew.querySelector('.js-card-delete');
    deleteButton.addEventListener('click', deleteCard);

    let likeButton = cardNew.querySelector('.js-card-like');
    likeButton.addEventListener('click', likeCard);

    let imgButton = cardNew.querySelector('.card-item__pic');
    imgButton.addEventListener('click', showPopup);

    cardSection.appendChild(cardNew);

}

function initCards(cards) {
    cards.forEach(createCard);
}

function deleteCard(evt) {
    let deleteCard = evt.target.parentNode;
    deleteCard.classList.toggle('card-item_closed');

    setTimeout(function () {
        deleteCard.remove()
    }, 150);

}

function likeCard(evt) {
    let likeCard = evt.target;
    likeCard.classList.toggle('button_like-isset');

}

function addButtonsListeners() {

    editButton.addEventListener('click', showPopup);
    addCardButton.addEventListener('click', showPopup);

    document.querySelectorAll('.button_close').forEach((button) => button.addEventListener('click', closePopup));

    formElementProfile.addEventListener('submit', formProfileSubmitHandler);
    formElementCard.addEventListener('submit', formCardSubmitHandler);
}


addButtonsListeners();

initCards(initialCards);
