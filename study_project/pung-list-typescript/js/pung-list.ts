interface IContents {
    id: string;
    content: string;
    timer: number;
    timerID: number;
    isToggle: boolean;
}

interface IPungList {
    pungLists: IContents[];
    pungListsElement: HTMLElement;
    init: () => void;
    initElement: () => void;

    // DATA
    add: (options: IContents) => void;
    remove: (id: string) => void;
    update: (id: string) => void;
    toggle: (id: string) => void;
    stop: (id: string) => void;
    start: (id: string) => void;

    // VIEW
    addView: (viewData: IContents) => void;
    removeView: (id: string) => void;
    updateView: (id: string, timer: number) => void;
    toggleView: (id: string, isToggle: boolean) => void;
    stopView: (id: string) => void;
    startView: (id: string) => void;

    // TIMER
    setTimer: (id: string, timer: number) => void;
    setTimerClear: (timerID: number) => void;

    // ETC
    setPungListCounter: () => void;
    setPungListAverge: () => void;

    // GET
    getTarget: (id: string) => IContents;
    getTargetIdx: (id: string) => number;

    // BIND
    bindEventNewList: (id: string) => void;

    // HANDLER
    handleClickTimer: (contentTarget: HTMLInputElement, oEvent: MouseEvent) => void;
    handleClickTimerPlus: (id: string) => void;
    handleClickTimerToggle: (id: string) => void;
    handleClickTimerRemove: (id: string) => void;
    handleClickListDoubleCopy: () => void;
    handleClickSecondPlusAll: () => void;
    handleClickStopAll: () => void;
    handleClickStartAll: () => void;
    handleClickRemoveAll: () => void;
}

// 객체 내부 속성이나 메서드는 객체 자체에 타입을 선언해 줘야한다
const pungList: IPungList = {
    pungLists: [],

    pungListsElement: null!,

    // INITIALIZE ===================================================================================================================
    init: function (): void {
        this.initElement();
    },

    initElement: function (): void {
        const pungContent = document.querySelector(".pungContent") as HTMLInputElement;
        const pungAdds = Array.from([...document.querySelectorAll<HTMLButtonElement>(".pungAdd > button")]);
        const pungReset = document.querySelector(".pungReset") as HTMLButtonElement;
        const pungDouble = document.querySelector(".pungDouble") as HTMLButtonElement;
        const pungSecondPlusAll = document.querySelector(".pungSecondPlusAll") as HTMLButtonElement;
        const pungStopAll = document.querySelector(".pungStopAll") as HTMLButtonElement;
        const pungStartAll = document.querySelector(".pungStartAll") as HTMLButtonElement;

        this.pungListsElement = document.querySelector(".pungList")!;

        pungAdds.forEach((pungAdd) => {
            pungAdd.addEventListener("click", this.handleClickTimer.bind(this, pungContent));
        });
        pungReset.addEventListener("click", this.handleClickRemoveAll.bind(this));
        pungDouble.addEventListener("click", this.handleClickListDoubleCopy.bind(this));
        pungSecondPlusAll.addEventListener("click", this.handleClickSecondPlusAll.bind(this));
        pungStopAll.addEventListener("click", this.handleClickStopAll.bind(this));
        pungStartAll.addEventListener("click", this.handleClickStartAll.bind(this));
    },

    // DATA ===================================================================================================================
    add: function (options: IContents): void {
        const { id, content, timer, isToggle, timerID } = options;
        const newList: IContents = { id: id || `pung-list-${crypto.randomUUID()}`, isToggle, content, timer, timerID };

        this.pungLists = this.pungLists.concat(newList);
        this.pungLists.sort((a: { timer: number }, b: { timer: number }) => {
            return a.timer - b.timer;
        });
        this.addView(newList);
    },

    remove: function (id: string): void {
        const removeList = this.getTarget(id);
        const removeListIdx = this.getTargetIdx(id);

        this.pungLists.splice(removeListIdx, 1);
        if (removeList.timerID) {
            this.setTimerClear(removeList.timerID);
        }
        this.setPungListAverge();
        this.setPungListCounter();
        this.removeView(id);
    },

    update: function (id: string): void {
        const updateList = this.getTarget(id);

        updateList.timer += 5;

        if (updateList.timerID) {
            this.setTimerClear(updateList.timerID);
        }

        this.updateView(id, updateList.timer);

        if (!updateList.isToggle) {
            this.setTimer(id, updateList.timer);
        }
    },

    toggle: function (id: string): void {
        const toggleList = this.getTarget(id);

        toggleList.isToggle = !toggleList.isToggle;

        if (toggleList.isToggle) {
            if (toggleList.timerID) {
                this.setTimerClear(toggleList.timerID);
            }
        } else {
            if (toggleList.timer) {
                this.setTimer(id, toggleList.timer);
            }
        }

        this.toggleView(id, toggleList.isToggle);
    },

    stop: function (id: string): void {
        const stopList = this.getTarget(id);

        stopList.isToggle = true;

        if (stopList.timerID) {
            this.setTimerClear(stopList.timerID);
        }

        this.stopView(id);
    },

    start: function (id: string): void {
        const startList = this.getTarget(id);

        startList.isToggle = false;
        this.setTimer(id, startList.timer);
        this.startView(id);
    },

    // VIEW ===================================================================================================================
    addView: function (viewData: IContents): void {
        const { id, content, isToggle, timer } = viewData;
        const liElement = document.createElement("li");
        liElement.setAttribute("id", id);
        const template = `
            <div class="pungListContent">${content}</div>
            <div class="pungListTimer">${timer}초</div>
            <div class="pungListEtc">
                <button type="button" class="pungListTimerPlus">+5초</button>
                <button type="button" class="pungListToggle">${isToggle ? "시작" : "중지"}</button>
                <button type="button" class="pungListRemove">삭제</button>
            </div>
        `;

        liElement.innerHTML = template;

        const afterNodeIdx = this.pungLists.findIndex((x: { id: string }) => x.id === id) + 1;
        const afterNodeID = this.pungLists[afterNodeIdx] && this.pungLists[afterNodeIdx].id;

        if (afterNodeID) {
            const afterNode = document.querySelector(`#${afterNodeID}`);
            this.pungListsElement.insertBefore(liElement, afterNode);
        } else {
            this.pungListsElement.appendChild(liElement);
        }

        this.setTimer(id, timer);
        this.bindEventNewList(id);
    },

    removeView: function (id: string): void {
        const removeElement = document.querySelector(`#${id}`);

        if (removeElement) {
            this.pungListsElement.removeChild(removeElement);
        }
    },

    updateView: function (id: string, timer: number): void {
        const updateElement = document.querySelector(`#${id} .pungListTimer`);

        if (updateElement) {
            updateElement.textContent = `${timer}초`;
        }

        this.setPungListAverge();
    },

    toggleView: function (id: string, isToggle: boolean): void {
        const toggleElement = document.querySelector(`#${id} .pungListEtc .pungListToggle`);
        const value = isToggle ? "시작" : "중지";

        if (toggleElement) {
            toggleElement.textContent = value;
        }
    },

    stopView: function (id: string): void {
        this.toggleView(id, true);
    },

    startView: function (id: string): void {
        this.toggleView(id, false);
    },

    setTimer: function (id: string, timer: number): void {
        const targetList = this.getTarget(id);

        this.setPungListCounter();
        this.setPungListAverge();

        const timerID = setInterval(() => {
            const listTimer = document.querySelector(`#${id} .pungListTimer`);

            if (timer < 2) {
                this.remove(id);
                this.setPungListAverge();
                this.setPungListCounter();
                return;
            }

            timer--;
            if (listTimer) {
                listTimer.textContent = `${timer}초`;
            }
            targetList.timer = timer;
            this.setPungListAverge();
            this.setPungListCounter();
        }, 1000);

        targetList.timerID = timerID;
        targetList.timer = timer;
    },

    setTimerClear: function (timerID: number): void {
        clearInterval(timerID);
    },

    setPungListCounter: function (): void {
        const countElement = document.querySelector("#pungCount");

        if (countElement) {
            countElement.textContent = this.pungLists.length.toString();
        }
    },

    setPungListAverge: function (): void {
        const avergeElement = document.querySelector("#pungAverge");
        let averge: number;
        let avergeSum: number = 0;

        this.pungLists.forEach((pungList: { timer: number }) => {
            avergeSum += pungList.timer;
        });

        averge = avergeSum / this.pungLists.length;

        if (!averge) {
            averge = 0;
        }

        if (avergeElement) {
            avergeElement.textContent = averge.toFixed(1);
        }
    },

    getTarget: function (id: string): IContents {
        return this.pungLists.filter((pungList: { id: string }) => pungList.id === id)[0];
    },

    getTargetIdx: function (id: string): number {
        return this.pungLists.findIndex((pungList: { id: string }) => pungList.id === id);
    },

    bindEventNewList: function (id: string): void {
        const timerPlus = document.querySelector(`#${id} .pungListEtc .pungListTimerPlus`) as HTMLElement;
        const timerToggle = document.querySelector(`#${id} .pungListEtc .pungListToggle`) as HTMLElement;
        const timerRemove = document.querySelector(`#${id} .pungListEtc .pungListRemove`) as HTMLElement;

        timerPlus.addEventListener("click", this.handleClickTimerPlus.bind(this, id));
        timerToggle.addEventListener("click", this.handleClickTimerToggle.bind(this, id));
        timerRemove.addEventListener("click", this.handleClickTimerRemove.bind(this, id));
    },

    // HANDLER ===================================================================================================================
    handleClickTimer: function (contentTarget: HTMLInputElement, oEvent: MouseEvent): void {
        const { value } = contentTarget;
        const { target } = oEvent;
        const { second } = (target as HTMLButtonElement).dataset;
        const timerID: number = 0;

        if (!value) {
            alert("내용을 입력해주세요!!");
            return;
        }

        this.add({ id: "", content: value, timer: Number(second), timerID: timerID, isToggle: false });
        contentTarget.value = "";
        contentTarget.focus();
    },

    handleClickTimerPlus: function (id: string): void {
        this.update(id);
    },

    handleClickTimerToggle: function (id: string): void {
        this.toggle(id);
    },

    handleClickTimerRemove: function (id: string): void {
        this.remove(id);
    },

    handleClickListDoubleCopy: function (): void {
        let copyLists: IContents[] = [];
        const timerID: number = 0;

        copyLists = copyLists.concat(this.pungLists);

        copyLists.forEach((copyList) => {
            this.add({ id: "", content: copyList.content, timer: copyList.timer, timerID: timerID, isToggle: false });
        });
    },

    handleClickSecondPlusAll: function (): void {
        this.pungLists.forEach((pungList: { id: string }) => {
            this.update(pungList.id);
        });
    },

    handleClickStopAll: function (): void {
        this.pungLists.forEach((pungList: { id: string }) => {
            this.stop(pungList.id);
        });
    },

    handleClickStartAll: function (): void {
        this.pungLists.forEach((pungList: { id: string }) => {
            this.start(pungList.id);
        });
    },

    handleClickRemoveAll: function (): void {
        this.pungLists.forEach((pungList: { timerID: number }) => {
            this.setTimerClear(pungList.timerID);
        });

        this.pungLists = []; // 초기화
        this.pungListsElement.innerHTML = "";

        this.setPungListCounter();
        this.setPungListAverge();
    },
};

pungList.init();
