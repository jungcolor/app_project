class Food {
    constructor(menu) {
        this.name = menu;
        this.parent = document.querySelector(`#foodContainer`);
        this.createElement();
    }

    createElement() {
        
    }
}

export function initFood(menu) {
    return new Food(menu);
}