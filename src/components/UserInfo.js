export default class UserInfo {
    constructor(selectors) {
        this._nameSelector = selectors.name;
        this._infoSelector = selectors.info;
        this._avatarSelector = selectors.avatar;

        this._name = document.querySelector(this._nameSelector);
        this._info = document.querySelector(this._infoSelector);
        this._avatar = document.querySelector(this._avatarSelector);

    }

    getUserInfo() {
        return {name: this._name.textContent, info: this._info.textContent, avatar: this._avatar.src};
    }

    setUserInfo(name, info) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
    initUserInfo(data) {
        this.setUserInfo(data.name, data.about);
        this._avatar.src = data.avatar;
        this._avatar.alt = data.name;
        this.id = data._id;
    }

}
