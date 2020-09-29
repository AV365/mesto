function enableValidation(settings) {
// Определяем формы и инпуты
    const forms = document.querySelectorAll(settings['formSelector']);
    const inputs = document.querySelectorAll(settings['inputSelector']);


    //отключаем сабмит
    forms.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    });

    //Обрабатываем все инпуты
    // inputs.forEach(inputElement => {
    //     inputElement.addEventListener('input', checkValidity(settings))
    // });

    inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkValidity(inputElement, settings);
        })
        }
    );


}

function inputIsValid(inputElement) {

    if (inputElement.validity.valid) {
        return true;
    } else {
        return false;
    }

}

function checkValidity(inputElement, settings) {

    if (!inputIsValid(inputElement)) {
        showInputError(inputElement, settings);

    } else {

        hideInputError(inputElement, settings);
    }

}


function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');
    } else {
        buttonElement.classList.remove('button_inactive');
    }

}


const showInputError = (formElement, settings) => {

    console.log(formElement.validationMessage);
    console.log(formElement.id);
    console.log(settings);

    inputElement = formElement.id;
    errorElement = document.querySelector(`#${inputElement}-error`);
    console.log(errorElement);
    errorElement.textContent = formElement.validationMessage;

    errorElement.classList.add(settings['errorClass']);
};

const hideInputError = (formElement, settings) => {

    inputElement = formElement.id;
    errorElement = document.querySelector(`#${inputElement}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(settings['errorClass']);
};


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__error_active'
});


