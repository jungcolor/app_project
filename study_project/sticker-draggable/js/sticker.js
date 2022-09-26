import StickerList from "./stickerList.js";

export default class Sticker {
    constructor(options) {
        this.el = null;
        this.itemList = [];
        this.listCount = 1;

        Object.assign(this, options);

        this.initElement();
        this.render(options.parentEl);
    }

    initElement() {
        const sticker = document.createElement("div");
        sticker.classList.add("sticker");
        sticker.id = this.id;

        const header = this.createHeader();
        const contents = this.createContents();

        sticker.appendChild(header);
        sticker.appendChild(contents);

        this.setStyle(sticker);

        // DRAG 이벤트 바인딩
        // sticker.addEventListener("mousedown", this.dragStart.bind(this));
        // sticker.addEventListener("mouseup", this.dragEnd.bind(this));

        sticker.addEventListener("removeList", this.handleClickRemoveList.bind(this));

        this.el = sticker;
    }

    createHeader() {
        const header = document.createElement("div");
        header.classList.add("sticker-header");

        const headingTitle = document.createElement("h3");
        headingTitle.textContent = `STICKER ${this.stickerCount}`;

        const btnSettings = document.createElement("div");
        btnSettings.classList.add("sticker-setting");

        const addListBtn = document.createElement("button");
        addListBtn.classList.add("btn");
        addListBtn.id = "sticker-list-add";
        addListBtn.textContent = "항목추가";
        addListBtn.addEventListener("click", this.handleClickAdddList.bind(this));

        const removeSticker = document.createElement("button");
        removeSticker.classList.add("btn");
        removeSticker.id = "sticker-remove";
        removeSticker.textContent = "스티커삭제";
        removeSticker.addEventListener("click", this.handleClickRemoveSticker.bind(this, this.id));

        btnSettings.appendChild(addListBtn);
        btnSettings.appendChild(removeSticker);

        header.appendChild(headingTitle);
        header.appendChild(btnSettings);

        return header;
    }

    createContents() {
        const contents = document.createElement("div");
        contents.classList.add("sticker-contents");

        const list = document.createElement("ul");
        list.classList.add("sticker-list");

        contents.appendChild(list);

        return contents;
    }

    render(parent) {
        parent.append(this.el);
    }

    setStyle(target) {
        const bgColor = this.getBgColor();
        const { initX, initY } = this.initPosition;

        target.style.top = `${initY}px`;
        target.style.left = `${initX}px`;
        target.style.backgroundColor = `rgba(${bgColor}, 0.8)`;
    }

    getBgColor() {
        const result = [];

        for (let i = 0; i < 3; i++) {
            result.push(Math.floor(Math.random() * 255));
        }

        return result.join();
    }

    addList() {
        const data = {
            id: `sticker_${crypto.randomUUID()}`,
            stickerCount: this.stickerCount,
            listCount: this.listCount++,
            parentEl: this.el.querySelector(".sticker-list"),
            _self: this
        }

        const list = new StickerList(data);

        this.itemList.push(list);
    }

    removeList(id) {
        this.itemList = this.itemList.filter(item => item.id !== id);
    }

    // DRAG
    dragStart(e) {
        const { target } = e;
        if (target.tagName === "BUTTON") return false;
        e.preventDefault(); // select range 막기

        console.log("start");

        this.isDrag = true;


        document.addEventListener("mousemove", this.dragMove.bind(this, e));
    }

    dragMove(e) {
        // 현재 마우스 포인터 위치
        // X : 현재 위치 x - (엘리먼트의 x - 부모엘리먼트의 x)
        // Y : 현재 위치 y - (엘리먼트의 y - 부모엘리먼트의 y)
        const pointX = e.pageX - (this.el.getBoundingClientRect().x - this.parentClientRect.x);
        const pointY = e.pageY - (this.el.getBoundingClientRect().y - this.parentClientRect.y);


        // console.log(`X 위치 >>>>>>>>>>>> ${pointX}`);
        // console.log(`Y 위치 >>>>>>>>>>>> ${pointY}`);

        // this.el.style.left = `${pointX}px`;
        // this.el.style.top = `${pointY}px`;
        console.log("move");
    }

    dragEnd(e) {
        console.log("end");
        document.removeEventListener("mousemove", this.dragMove);
    }

    // HANDLER
    handleClickAdddList(e) {
        this.addList();
    }

    handleClickRemoveSticker(id) {
        const event = new CustomEvent("removeSticker", { bubbles: true, detail: { id } });

        this.parentEl.dispatchEvent(event);
        this.el.remove();
    }

    handleClickRemoveList(e) {
        const { id } = e.detail;

        this.removeList(id);
    }
}