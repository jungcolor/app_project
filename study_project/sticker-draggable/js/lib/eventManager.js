class EventManager {
    constructor() {
        this._observers = [];
    }

    subscribe(observer) {
        this._observers.push(observer); // callback?
    }

    notify() {
        this._observers.forEach(observer => observer());
    }
}