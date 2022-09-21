class Manager {
    constructor(name) {
        this.name = name;
        this.createElement();
        // this.orderWatchStart();
    }
    
    createElement() {
        this.parent = document.querySelector("#managerContainer");
        const template = `
            <div>
                <div>${this.name}</div>
                <div class="managerStatus">대기중</div>
            </div>
        `;

        this.parent.insertAdjacentHTML("beforeend", template);
    }

    async orderWatchStart() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log("주문기다리는중!!!!!!!!!!!");
        }
    }
}

export function initManager() {
    new Manager("매니저");
    new Manager("부매니저");
}