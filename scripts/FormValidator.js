export default class FormValidator {
    constructor(settings, formSelector) {
        this._settings = settings;
        this._formSelector = formSelector;
        this._form = document.querySelector(this._formSelector);
    }


    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disableSaveBtn();
        });

        this._setEventListeners();
    }


    _disableSaveBtn() {
        const saveBtn = this._form.querySelector(this._settings['submitButtonSelector']);
        saveBtn.classList.add(this._settings.inactiveButtonClass);
        saveBtn.disabled = true;
    }


    _setEventListeners() {
        const inputs = Array.from(this._form.querySelectorAll(this._settings['inputSelector']));
        const saveBtn = this._form.querySelector(this._settings['submitButtonSelector']);
        this._toggleButtonState(inputs, saveBtn);

        inputs.forEach(inputElement => {
                inputElement.addEventListener('input', () => {
                    this._checkValidity(inputElement);
                    this._toggleButtonState(inputs, saveBtn);
                })
            }
        );
    }


    _inputIsValid(inputElement) {
        return inputElement.validity.valid;
    }


    _checkValidity(inputElement) {
        if (!this._inputIsValid(inputElement)) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings['inactiveButtonClass']);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings['inactiveButtonClass']);
            buttonElement.removeAttribute("disabled");
        }
    }


    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }


    _showInputError(inputElement) {
        const inputId = inputElement.id;

        const errorElement = document.querySelector(`#${inputId}-error`);

        errorElement.textContent = inputElement.validationMessage;

        errorElement.classList.add(this._settings['errorClass']);
        inputElement.classList.add(this._settings['inputErrorClass']);
    };


    _hideInputError(inputElement) {
        const inputId = inputElement.id;
        const errorElement = document.querySelector(`#${inputId}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._settings['errorClass']);

        inputElement.classList.remove(this._settings['inputErrorClass']);
    };
}
