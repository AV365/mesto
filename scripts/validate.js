function enableValidation(settings) {
// Определяем формы и инпуты
    const forms = document.querySelectorAll(settings['formSelector']);



    //отключаем сабмит
    forms.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });

    //Обрабатываем все инпуты
    // inputs.forEach(inputElement => {
    //     inputElement.addEventListener('input', checkValidity(settings))
    // });


}


const setEventListeners = (formElement, settings) => {

    const inputs = Array.from(formElement.querySelectorAll(settings['inputSelector']));
    const saveBtn = formElement.querySelector(settings['submitButtonSelector']);
    toggleButtonState(inputs, saveBtn, settings);

    //console.log(saveBtn);
    inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkValidity(inputElement, settings);
                toggleButtonState(inputs, saveBtn, settings);
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


function toggleButtonState(inputList, buttonElement, settings) {

    //console.log(inputList);
    console.log(buttonElement);
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings['inactiveButtonClass']);
    } else {
        buttonElement.classList.remove(settings['inactiveButtonClass']);
    }

}

function hasInvalidInput(inputList) {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });

}


const showInputError = (formElement, settings) => {

    //console.log(formElement.validationMessage);
    //console.log(formElement.id);
    //console.log(settings);

    inputElement = formElement.id;
    errorElement = document.querySelector(`#${inputElement}-error`);
    //console.log(errorElement);
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
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__error_active'
});


