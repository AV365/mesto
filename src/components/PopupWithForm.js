import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selector, submitFnc}, form) {
        super(selector);

        this._submitFnc = submitFnc;
        this._form = document.querySelector(form);
        this.setEventListener();
    }

    open() {
        super.open();
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__input');
        this._formValues = [];
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    }

    _submit() {
        const formValues = this._getInputValues();
        this._submitFnc(formValues);
    }

    close() {
        this._form.reset();
        super.close();
    }
}
