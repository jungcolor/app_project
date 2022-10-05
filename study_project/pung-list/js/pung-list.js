const pungList = {
    pungLists: [],

    timerLists: {},

    pungListsElement: null,

    // INITIALIZE ===================================================================================================================
    init: function () {
        this.initElement();
    },

    initElement: function () {
        const pungContent = document.querySelector(".pungContent");
        const pungAdds = document.querySelectorAll(".pungAdd > button");
        const pungReset = document.querySelector(".pungReset");
        const pungDouble = document.querySelector(".pungDouble");
        const pungSecondPlusAll = document.querySelector(".pungSecondPlusAll");
        const pungStopAll = document.querySelector(".pungStopAll");
        const pungStartAll = document.querySelector(".pungStartAll");

        this.pungListsElement = document.querySelector(".pungList");

        pungAdds.forEach(pungAdd => {
            pungAdd.addEventListener("click", this.handleClickTimer.bind(this, pungContent));
        });
        pungReset.addEventListener("click", this.handleClickRemoveAll.bind(this));
        pungDouble.addEventListener("click", this.handleClickListDoubleCopy.bind(this));        
        pungSecondPlusAll.addEventListener("click", this.handleClickSecondPlusAll.bind(this));
        pungStopAll.addEventListener("click", this.handleClickStopAll.bind(this));
        pungStartAll.addEventListener("click", this.handleClickStartAll.bind(this));
    },


    // DATA ===================================================================================================================
    add: function (options) {
        const { content, timer, isToggle, timerID } = options;
        const newList = { id: `pung-list-${crypto.randomUUID()}`, isToggle, content, timer, timerID };

        this.pungLists = this.pungLists.concat(newList);
        this.pungLists.sort((a, b) => {
            return a.timer - b.timer;
        });
        this.addView(newList);
    },

    remove: function (id) {
        const removeList = this.getTarget(id);
        const removeListIdx = this.getTargetIdx(id);

        this.pungLists.splice(removeListIdx, 1);
        this.setTimerClear(removeList.timerID);
        this.setPungListAverge();
        this.setPungListCounter();
        this.removeView(id);
    },

    update: function (id) {
        const updateList = this.getTarget(id);

        updateList.timer += 5;
        this.setTimerClear(updateList.timerID);
        this.updateView(id, updateList.timer);

        if (!updateList.isToggle) {
            this.setTimer(id, updateList.timer);
        }
    },

    toggle: function (id) {
        const toggleList = this.getTarget(id);
        const { timer, timerID } = toggleList;
        let { isToggle } = toggleList;
        
        toggleList.isToggle = !toggleList.isToggle;

        if (toggleList.isToggle) {
            this.setTimerClear(toggleList.timerID);
        }
        else {
            this.setTimer(id, toggleList.timer);
        }

        this.toggleView(id, toggleList.isToggle);
    },

    stop: function (id) {
        const stopList = this.getTarget(id);

        stopList.isToggle = true;
        this.setTimerClear(stopList.timerID);
        this.stopView(id);
    },

    start: function (id) {
        const startList = this.getTarget(id);

        startList.isToggle = false;
        this.setTimer(id, startList.timer);
        this.startView(id);
    },


    // VIEW ===================================================================================================================
    addView: function (viewData) {
        const { id, content, isToggle, timer } = viewData;
        const liElement = document.createElement("li");
        liElement.setAttribute("id", id);
        const template = `
            <div class="pungListContent">${content}</div>
            <div class="pungListTimer">${timer}초</div>
            <div class="pungListEtc">
                <button type="button" class="pungListTimerPlus">+5초</button>
                <button type="button" class="pungListToggle">${isToggle ? '시작' : '중지'}</button>
                <button type="button" class="pungListRemove">삭제</button>
            </div>
        `;

        liElement.innerHTML = template;

        const afterNodeIdx = this.pungLists.findIndex(x => x.id === id) + 1;
        const afterNodeID = this.pungLists[afterNodeIdx] && this.pungLists[afterNodeIdx].id;

        if (afterNodeID) {
            const afterNode = document.querySelector(`#${afterNodeID}`);
            this.pungListsElement.insertBefore(liElement, afterNode);
        }
        else {
            this.pungListsElement.appendChild(liElement);
        }

        this.setTimer(id, timer);
        this.bindEventNewList(id);
    },

    removeView: function (id) {
        const removeElement = document.querySelector(`#${id}`);

        this.pungListsElement.removeChild(removeElement);
    },

    updateView: function (id, timer) {
        const updateElement = document.querySelector(`#${id} .pungListTimer`);
        updateElement.textContent = `${timer}초`;

        this.setPungListAverge();
    },

    toggleView: function (id, isToggle) {
        const toggleElement = document.querySelector(`#${id} .pungListEtc .pungListToggle`);

        if (isToggle) {
            toggleElement.textContent = "시작";
        }
        else {
            toggleElement.textContent = "중지";
        }
    },

    stopView: function (id) {
        const stopElement = document.querySelector(`#${id} .pungListEtc .pungListToggle`);
        stopElement.textContent = "시작";
    },

    startView: function (id) {
        const startElement = document.querySelector(`#${id} .pungListEtc .pungListToggle`);
        startElement.textContent = "중지";
    },

    setTimer: function (id, timer) {
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
            listTimer.textContent = `${timer}초`;
            targetList.timer = timer;
            this.setPungListAverge();
            this.setPungListCounter();
        }, 1000);

        targetList.timerID = timerID;
        targetList.timer = timer;
    },

    setTimerClear: function (timerID) {
        clearInterval(timerID);
    },

    setPungListCounter: function () {
        const countElement = document.querySelector("#pungCount");

        countElement.textContent = this.pungLists.length;
    },

    setPungListAverge: function () {
        const avergeElement = document.querySelector("#pungAverge");
        let averge;
        let avergeSum = 0;

        this.pungLists.forEach(pungList => {
            avergeSum += pungList.timer;
        });

        averge = avergeSum / this.pungLists.length;

        if(!averge) {
            averge = 0;
        }

        avergeElement.textContent = averge.toFixed(1);
    },

    getTarget: function (id) {
        return this.pungLists.filter(pungList => pungList.id === id)[0];
    },

    getTargetIdx: function (id) {
        return this.pungLists.findIndex(pungList => pungList.id === id);
    },

    bindEventNewList: function (id) {
        const timerPlus = document.querySelector(`#${id} .pungListEtc .pungListTimerPlus`);
        const timerToggle = document.querySelector(`#${id} .pungListEtc .pungListToggle`);
        const timerRemove = document.querySelector(`#${id} .pungListEtc .pungListRemove`);

        timerPlus.addEventListener("click", this.handleClickTimerPlus.bind(this, id));
        timerToggle.addEventListener("click", this.handleClickTimerToggle.bind(this, id));
        timerRemove.addEventListener("click", this.handleClickTimerRemove.bind(this, id));
    },


    // HANDLER ===================================================================================================================
    handleClickTimer: function (contentTarget, oEvent) {
        const { value } = contentTarget;
        const { target } = oEvent;
        const { second } = target.dataset;

        if (!value) {
            alert('내용을 입력해주세요!!');
            return;
        }

        this.add({ content: value, timer: Number(second), timerID: null, isToggle: false });
        contentTarget.value = "";
        contentTarget.focus();
    },

    handleClickTimerPlus: function (id) {
        this.update(id);
    },

    handleClickTimerToggle: function (id) {
        this.toggle(id);
    },
    
    handleClickTimerRemove: function (id) {
        this.remove(id);
    },

    handleClickListDoubleCopy: function () {
        let copyLists = [];
        copyLists = copyLists.concat(this.pungLists);

        copyLists.forEach(copyList => {
            this.add({ content: copyList.content, timer: copyList.timer, timerID: null, isToggle: false });
        });
    },

    handleClickSecondPlusAll: function () {
        this.pungLists.forEach(pungList => {
            this.update(pungList.id);
        });
    },

    handleClickStopAll: function () {
        this.pungLists.forEach(pungList => {
            this.stop(pungList.id);
        });
    },

    handleClickStartAll: function () {
        this.pungLists.forEach(pungList => {
            this.start(pungList.id);
        });
    },

    handleClickRemoveAll: function () {
        this.pungLists.forEach(pungList => {
            this.setTimerClear(pungList.timerID);
        });

        this.pungLists = []; // 초기화
        this.pungListsElement.innerHTML = "";

        this.setPungListCounter();
        this.setPungListAverge();
    },
}

pungList.init();