const orderList = [];

let orderNumber = 0;

function wait(second) {
    return new Promise(resolve => {
        setTimeout(resolve, second);
    });
}
class Order {
    constructor(menu) {
        this.menu = menu;
        this.status = "대기중";
        this.orderCount = `주문${++orderNumber}`;
        this.parent = document.querySelector("#orderContainer");
        this.createElement();
    }

    createElement() {
        const div = document.createElement("div");
        const template = `
            <div>${this.orderCount}</div>
            <div>${this.menu}</div>
            <div class="orderStatus">${this.status}</div>
        `;

        div.insertAdjacentHTML("beforeend", template);

        this.el = div;
        this.parent.append(div);

        orderList.push(this);
    }

    setStatus(status) {
        const el = this.el.querySelector(".orderStatus");

        this.status = status;
        el.textContent = this.status;
    }

    removeOrder() {
        this.el.remove();
    }
}


export function createOrder(menu) {
    new Order(menu);
}

export async function getOrder() {
    await wait(100);
    return orderList.shift();
}