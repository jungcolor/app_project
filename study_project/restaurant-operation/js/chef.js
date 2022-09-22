import { getFood, initFood } from "./food.js";

let chefList = [];

function wait(second) {
    return new Promise(resolve => {
        setTimeout(resolve, second);
    });
}

class Chef {
    constructor(name, timer) {
        this.name = name;
        this.timer = timer;
        this.status = "대기중";
        this.orderCount = "";
        this.menu = "";
        this.parent = document.querySelector("#chefContainer");
        this.createElement();
    }

    createElement() {
        const div = document.createElement("div");
        const template = `
            <div>${this.name}</div>
            <div class="chefStatus">${this.status}</div>
            <div class="chefOrderCount">${this.orderCount}</div>
        `;

        div.insertAdjacentHTML("beforeend", template);

        this.el = div;
        this.parent.append(div);

        chefList.push(this);
    }

    async setMenu(orderCount, menu) {
        const foodIns = initFood(menu, (menu === "스프") ? 10000 : 3000);

        if (this.status === "대기중") {
            this.setStatus("요리중");
            this.updateOrderCount(orderCount);

            await wait(this.timer); // 요리사의 시간만큼 기다린다

            foodIns.setFood();
            this.setStatus("대기중");
            this.updateOrderCount("");
            return true;
        }

        return false;
    }

    restoreChef() {
        chefList.push(this);
    }

    setStatus(status) {
        const el = this.el.querySelector(".chefStatus");

        this.status = status;
        el.textContent = this.status;
    }

    getStatus() {
        return this.status;
    }

    updateOrderCount(orderCount) {
        const el = this.el.querySelector(".chefOrderCount");

        this.orderCount = orderCount;
        el.textContent = this.orderCount;
    }
}

export function initChef() {
    new Chef("요리사1", 1000);
    new Chef("요리사2", 1500);
}

export function setChef(chef) {
    chefList.push(chef);
}

export function getChef() {
    return chefList.shift();
}