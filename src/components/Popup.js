export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._element = document.querySelector(this._selector);
        this._closeBtnSelector = '.button_close';

        this._handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        }
    }

    open() {

        this._element.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);

    }

    setEventListener() {
        //Закрытие по пустому месту
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._selector.slice(1))) {
                this.close();
            }
        });

        //Закрытие по кнопке
        const closeBtn = this._element.querySelector(this._closeBtnSelector);
        closeBtn.addEventListener('click', () => {
            this.close();
        })

    }

}
