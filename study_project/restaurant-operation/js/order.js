export default class Order {
    // private
    #status = false; // false : 대기중,  true : 요리중

    #orderMenus = [];

    constructor() {
        this.count = 0;
        this.parent = document.querySelector("#orderContainer");
    }

    // Getter Setter
    getOrderStatus() {
        return this.#status;
    }

    setOrderStatus(status) {
        this.#status = status;
    }

    getOrderMenu() {
        return this.#orderMenus;
    }

    setOrderMenu(menu) {
        this.orderMenu(menu);
        this.orderMenuView(menu);
    }


    // Data
    orderMenu(menu) {
        this.count++;
        this.#orderMenus.push(menu);
    }


    // View
    orderMenuView(menu) {
        const template = `
            <div id=menu_${this.count}>
                <div>주문${this.count}</div>
                <div>${menu}</div>
                <div>${this.#status === "waiting" ? "대기중" : "요리중"}</div>
            </div>
        `;

        this.parent.insertAdjacentHTML("beforeend", template);
    }

}