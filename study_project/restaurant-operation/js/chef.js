class Chef {
    constructor() {
        this.initElement();
        this.render();
    }

    initElement() {
        this.parent = document.querySelector("#chefContainer");
    }

    render() {
        const template = `
            <div id=${id}>
                <div>${name}</div>
                <div class="chefStatus">대기중</div>
                <div class="chefOrderCount"></div>
            </div>
        `;

        this.parent.insertAdjacentHTML("beforeend", template);
    }
}

export function initChef () {
    return new Chef();
}