import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {

    constructor(selector, title, link) {
        super(selector);

        this._iamge = document.querySelector(link);
        this._name = document.querySelector(title);

        super.setEventListener();
    }


    open(link, name) {
        this._iamge.src = link;
        this._name.textContent = name;
        this._iamge.alt = name;

        super.open();
    }
}
