let foodList = [];

export const foods = {
    soup: "스프",
    drink: "음료수"
}

class Food {
    constructor(menu, timer) {
        this.name = menu;
        this.timer = timer;
        this.timerID = null;
        this.count = this.timer / 1000;
        this.parent = document.querySelector(`#foodContainer`);

        foodList.push(this);
    }

    setFood() {
        const div = document.createElement("div");
        const template = `
            <div>${this.name}</div>
            <div class="timer">${this.count}</div>
        `;

        div.insertAdjacentHTML("beforeend", template);

        this.el = div;
        this.parent.append(div);

        this.setTimer();
    }

    removeFood() {
        this.el.remove();
        foodList.filter(food => food !== this);
    }

    setTimer() {
        this.timerID = setInterval(() => {
            const el = this.el.querySelector(".timer");

            if (this.count < 1) {
                this.clearTimer();
                this.removeFood();
                return;
            }

            el.textContent = this.count;
            this.count--;
        }, 1000);
    }

    clearTimer() {
        clearInterval(this.timerID);
        this.timerID = null;
    }
}

export function initFood(menu, timer) {
    return new Food(menu, timer);
}

export function getFood(name) {
    return foodList.filter(food => food.name === name)[0];
}