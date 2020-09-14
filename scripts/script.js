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

// Находим форму в DOM
const formElementProfile = document.querySelector('.js-form-profile');
const formElementCard = document.querySelector('.js-form-card');

let nameInput = document.querySelector('.form__profile-name');
let jobInput = document.querySelector('.form__profile-job');
let placeInput = document.querySelector('.form__card-name');

let nameNow = document.querySelector('.profile__person');
let jobNow = document.querySelector('.profile__job');

// Выберите элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__person');
let job = document.querySelector('.profile__job');

//Превью фото
let imagePreview = document.querySelector('.preview__image');
let titlePreview = document.querySelector('.preview__title');

const cardSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('.js-card-item-template').content;

function nullImg(element) {

    let replaceImg = element.closest('.card-item__pic');
    replaceImg.attributes.src.value = './images/no-image.svg';

}

function showPopup(evt) {

    if (evt.target.classList.contains('button_edit')) {

        popupProfile.classList.toggle('popup_opened');
        let closeButton = popupProfile.querySelector('.button_close');
        closeButton.addEventListener('click', closePopup);

        nameInput.value = nameNow.textContent;
        jobInput.value = jobNow.textContent;

    } else if (evt.target.classList.contains('button_add')) {

        popupCard.classList.toggle('popup_opened');
        placeInput.focus();
        let closeButton = popupCard.querySelector('.button_close');
        closeButton.addEventListener('click', closePopup);
    } else if (evt.target.classList.contains('card-item__pic')) {
        popupPlace.classList.toggle('popup_opened');

        imagePreview.src = evt.target.attributes.src.value;
        titlePreview.innerText = evt.target.attributes.alt.value;
        imagePreview.alt = evt.target.attributes.alt.value;

        let closeButton = popupPlace.querySelector('.button_close');
        closeButton.addEventListener('click', closePopup);
    }


}

function closePopup(evt) {
    const currentPopup = evt.target.closest('section');
    currentPopup.classList.toggle('popup_opened');

}


function formProfileSubmitHandler(evt) {

    let nameNew = document.querySelector('.form__profile-name').value;
    let jobNew = document.querySelector('.form__profile-job').value;

    evt.preventDefault();
    name.textContent = nameNew;
    job.textContent = jobNew;

    popupProfile.classList.toggle('popup_opened');
}


function formCardSubmitHandler(evt) {


    let placeNew = document.querySelector('.form__card-name');
    let urlNew = document.querySelector('.form__card-url');
    evt.preventDefault();

    let addPlace = [];
    addPlace['name'] = placeNew.value;
    addPlace['link'] = urlNew.value;

    createCard(addPlace);
    placeNew.value = '';
    urlNew.value = '';

    popupCard.classList.toggle('popup_opened');

}


function createCard(card) {


    let cardNew = cardTemplate.cloneNode(true);

    cardNew.querySelector('.card-item__title').innerText = card.name;
    cardNew.querySelector('.card-item__pic').attributes.src.value = card.link;


    cardNew.querySelector('.card-item__pic').attributes.alt.value = card.name;

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

editButton.addEventListener('click', showPopup);
addCardButton.addEventListener('click', showPopup);


formElementProfile.addEventListener('submit', formProfileSubmitHandler);
formElementCard.addEventListener('submit', formCardSubmitHandler);


initCards(initialCards);
