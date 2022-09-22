import { getOrder } from "./order.js";
import { initChef, getChef } from "./chef.js";

const checkOrderList = [];

function wait(second) {
    return new Promise(resolve => {
        setTimeout(resolve, second);
    });
}

class Manager {
    constructor(name) {
        this.name = name;
        this.status = "대기중";
        this.parent = document.querySelector("#managerContainer");
        this.createElement();
        // this.orderWatchStart();
        this.checkOrder();
    }

    createElement() {
        const div = document.createElement("div");
        const template = `
            <div>${this.name}</div>
            <div class="managerStatus">대기중</div>
        `;

        div.insertAdjacentHTML("beforeend", template);

        this.el = div;
        this.parent.append(div);
    }

    async checkOrder() {
        while(true) {
            this.setStatus("대기중");
            await wait(3000);
            console.log("주문 확인중!!!!!");
            this.orderWatchStart();
        }
    }

    async orderWatchStart() {
        const orderIns = await getOrder();
        wait(200);
        const chefIns = await getChef();
        wait(200);

        if (orderIns) {
            if (chefIns) {
                orderIns.setStatus("요리중..");
                const result = await chefIns.setMenu(orderIns.orderCount, orderIns.menu);
                await wait(0.9);

                if (result) {
                    orderIns.removeOrder();
                }
                chefIns.restoreChef();
            }
            else {
                orderIns.setStatus("대기중");
                this.setStatus("요리사 확인중..");
            }
        }

        chefIns.restoreChef();
    }

    setStatus(status) {
        const el = this.el.querySelector(".managerStatus");

        this.status = status;
        el.textContent = status;
    }

}

export function initManager() {
    new Manager("매니저");
    new Manager("부매니저");

    initChef();
}