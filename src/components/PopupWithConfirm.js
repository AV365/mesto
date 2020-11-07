import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({selector, submitFnc}, formSelector) {
        super(selector);

        this._submitFnc = submitFnc;

        this._form = document.querySelector(formSelector);

        this.setEventListener();
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    }

    _submit() {
        this._submitFnc(this._idCard);
    }

    open(id) {
        this._idCard = id;
        super.open();
    }
}
