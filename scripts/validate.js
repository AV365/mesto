function enableValidation(settings) {

    const forms = document.querySelectorAll(settings['formSelector']);

    forms.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}


const setEventListeners = (formElement, settings) => {

    const inputs = Array.from(formElement.querySelectorAll(settings['inputSelector']));
    const saveBtn = formElement.querySelector(settings['submitButtonSelector']);
    toggleButtonState(inputs, saveBtn, settings);

    inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkValidity(inputElement, settings);
                toggleButtonState(inputs, saveBtn, settings);
            })
        }
    );

}

function inputIsValid(inputElement) {

    return inputElement.validity.valid;

}

function checkValidity(inputElement, settings) {

    if (!inputIsValid(inputElement)) {
        showInputError(inputElement, settings);
    } else {
        hideInputError(inputElement, settings);
    }

}


function toggleButtonState(inputList, buttonElement, settings) {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings['inactiveButtonClass']);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(settings['inactiveButtonClass']);
        buttonElement.removeAttribute("disabled");
    }

}

function hasInvalidInput(inputList) {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });

}


const showInputError = (inputElement, settings) => {

    const inputId = inputElement.id;


    errorElement = document.querySelector(`#${inputId}-error`);

    errorElement.textContent = inputElement.validationMessage;

    errorElement.classList.add(settings['errorClass']);
    inputElement.classList.add(settings['inputErrorClass']);
};

const hideInputError = (inputElement, settings) => {

    const inputId = inputElement.id;
    errorElement = document.querySelector(`#${inputId}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(settings['errorClass']);

    inputElement.classList.remove(settings['inputErrorClass']);

};


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active'
});


