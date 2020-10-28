import Popup from "./Popup.js";

const imagePreview = document.querySelector('.preview__image');
const titlePreview = document.querySelector('.preview__title');

export default class PopupWithImage extends Popup {
    constructor(selector, data) {
        super(selector);

        this._link = data.link;
        this._name = data.name;
        super.setEventListener();
    }

        open()
        {
            imagePreview.src = this._link;
            titlePreview.textContent = this._name;
            imagePreview.alt = this._name;

            super.open();

        }


}
