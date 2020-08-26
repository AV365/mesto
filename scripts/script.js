function showPopup() {
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_opened');

    let nameNow = document.querySelector('#profileName').textContent;
    let jobNow = document.querySelector('#profileJob').textContent;

    let nameInput = document.querySelector('#editProfileName');
    let jobInput = document.querySelector('#editProfileJob');
    nameInput.value = nameNow;
    jobInput.value = jobNow;
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM

    // Получите значение полей из свойства value
    let nameNew = document.querySelector('#editProfileName').value;
    let jobNew = document.querySelector('#editProfileJob').value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('#profileName');
    let job = document.querySelector('#profileJob');


    // Вставьте новые значения с помощью textContent
    name.textContent = nameNew;
    job.textContent = jobNew;


    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_opened');


}

editButton = document.querySelector('#editButton');
closeButton = document.querySelector('#closeButton');

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', showPopup);


// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

