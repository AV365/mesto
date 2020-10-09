export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }

    enableValidation() {
        console.log(this._settings);
    }

}
