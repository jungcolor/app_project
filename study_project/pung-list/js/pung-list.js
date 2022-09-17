const pungList = {
    pungLists: [],

    pungListsElement: null,

    // INITIALIZE ===================================================================================================================
    init: function () {
        this.initElement();
    },

    initElement: function () {
        const pungContent = document.querySelector(".pungContent");
        const pungAdds = document.querySelectorAll(".pungAdd > button");

        pungAdds.forEach(pungAdd => {
            pungAdd.addEventListener("click", this.handleClickTimer.bind(this, pungContent));
        });

        this.pungListsElement = document.querySelector(".pungList");
    },


    // DATA ===================================================================================================================
    add: function (content) {
        const newList = { id: `pung-list-${crypto.randomUUID()}`, content, toggle: false };
        
        this.pungLists = this.pungLists.concat(newList);
        this.addView(newList);
    },

    remove: function (id) {
        const removeListIdx = this.pungLists.findIndex(pungList => pungList.id === id);

        this.pungLists.splice(removeListIdx, 1);
        this.removeView(id);
    },

    update: function (id) { },

    toggle: function (id) {
        const toggleList = this.pungLists.filter(pungList => pungList.id === id);
        
        toggleList[0].toggle = !toggleList[0].toggle;
        this.toggleView(id, toggleList[0].toggle);
    },


    // VIEW ===================================================================================================================
    addView: function (viewData) {
        const { id, content, toggle } = viewData;
        const template = `
            <li id=${id}>
                <div class="pungListContent">${content}</div>
                <div class="pungListTimer">4초</div>
                <div class="pungListEtc">
                    <button type="button" class="pungListTimerPlus">+5초</button>
                    <button type="button" class="pungListToggle">${toggle ? '시작' : '중지'}</button>
                    <button type="button" class="pungListRemove">삭제</button>
                </div>
            </li>
        `;

        this.pungListsElement.insertAdjacentHTML("beforeend", template);

        this.bindEventNewList(id);
    },

    removeView: function (id) {
        const removeElement = document.querySelector(`#${id}`);

        this.pungListsElement.removeChild(removeElement);
    },

    updateView: function () { },

    toggleView: function (id, isToggle) {
        const toggleElement = document.querySelector(`#${id} .pungListEtc .pungListToggle`);
        toggleElement.textContent = isToggle ? "시작" : "중지";
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

        this.add(value);
        contentTarget.value = "";
        contentTarget.focus();
    },

    handleClickTimerPlus: function (id, oEvent) {
        console.log("추가", id);
    },

    handleClickTimerToggle: function (id, oEvent) {
        this.toggle(id);
    },
    
    handleClickTimerRemove: function (id, oEvent) {
        this.remove(id);
    },


    // HANDLER ALL ===================================================================================================================
    // handleClickTimerPlusALl: function (timer) {},

    // handleClickTimerRemoveAll: function () {},

    // handleClickTimerToggleAll: function () {},
}

pungList.init();