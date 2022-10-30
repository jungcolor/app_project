const orderList: Order[] = [];

let orderNumber = 0;

function wait(second: number) {
    return new Promise(resolve => {
        setTimeout(resolve, second);
    });
}
class Order {
    menu: string;
    status: string;
    orderCount: string;
    el?: HTMLDivElement;
    parent: HTMLDivElement;

    constructor(menu: string) {
        this.menu = menu;
        this.status = "대기중";
        this.orderCount = `주문${++orderNumber}`;
        this.parent = document.querySelector("#orderContainer")!;
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

        if (div) {
            this.el = div;
        }

        this.parent?.append(div);

        orderList.push(this);
    }

    setStatus(status: string) {
        const el = this.el?.querySelector(".orderStatus");

        this.status = status;

        if (el) {
            el.textContent = this.status;
        }
    }

    removeOrder() {
        this.el?.remove();
    }
}


export function createOrder(menu: string) {
    new Order(menu);
}

export async function getOrder() {
    await wait(100);
    return orderList.shift();
}