let popup = document.querySelector('.popup');

let editButton = document.querySelector('.button_edit');
let closeButton = document.querySelector('.button_close');

// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()

let nameInput = document.querySelector('.form__profile-name');
let jobInput = document.querySelector('.form__profile-job');

let nameNow = document.querySelector('.profile__person');
let jobNow = document.querySelector('.profile__job');

// Выберите элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__person');
let job = document.querySelector('.profile__job');

function showPopup() {

    popup.classList.toggle('popup_opened');


    nameInput.value = nameNow.textContent;
    jobInput.value = jobNow.textContent;
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {

// Получите значение полей из свойства value
    let nameNew = document.querySelector('#editProfileName').value;
    let jobNew = document.querySelector('#editProfileJob').value;

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM

    // Вставьте новые значения с помощью textContent

    name.textContent = nameNew;
    job.textContent = jobNew;


    popup.classList.toggle('popup_opened');


}


editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', showPopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

