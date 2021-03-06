export default class Section {
    constructor({items, renderer}, selector) {
        this.items = items;

        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(this._selector);
    }

    renderItems() {
        this.items.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.appendChild(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }

}
