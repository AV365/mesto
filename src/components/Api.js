export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
        console.log(this.headers);
    }


    //Забираем все карточки
    getCards() {
        return fetch(`${this.url}cards`, {headers: this.headers})
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка получения карточек: ${res.status}`);
            })
            .then((result) => {
                return result;
                // console.log(result);
            })
            .catch(err => this._displayErr(err));
    }

    //Получаем информацию о пользователе
    getUserInfo() {
        return fetch(`${this.url}users/me`, {headers: this.headers})
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка получения информации о пользователе: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
                return result;

            })
            .catch(err => this._displayErr(err));
    }

    updateUserInfo(name, about) {
        return fetch(`${this.url}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return res;
                console.log(res)
            });

    }

    _displayErr(err) {
        alert(err);
    }
}
