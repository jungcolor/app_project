let foodList: Food[] = [];

export const foods = {
    soup: "스프",
    drink: "음료수"
}

class Food {
    name: string;
    timer: number;
    timerID: any;
    count: number;
    el?: HTMLDivElement;
    parent: HTMLDivElement;

    constructor(menu: string, timer: number) {
        this.name = menu;
        this.timer = timer;
        this.timerID = null;
        this.count = this.timer / 1000;
        this.parent = document.querySelector(`#foodContainer`)!;

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
        this.el?.remove();
        foodList.filter(food => food !== this);
    }

    setTimer() {
        this.timerID = setInterval((): any => {
            const el = this.el?.querySelector(".timer");

            if (this.count < 1) {
                this.clearTimer();
                this.removeFood();
                return null;
            }

            if (el) {
                el.textContent = this.count.toString();
            }
            this.count--;
        }, 1000);
    }

    clearTimer() {
        clearInterval(this.timerID);
        this.timerID = null;
    }
}

export function initFood(menu: string, timer: number) {
    return new Food(menu, timer);
}

export function getFood(name: string) {
    return foodList.filter(food => food.name === name)[0];
}