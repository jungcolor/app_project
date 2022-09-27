import StickerList from "./stickerList.js";

export default class Sticker {
    constructor(options) {
        this.el = null;
        this.itemList = [];
        this.listCount = 0;
        this.isDraggable = false;
        this.titleColor = "#fff";
        this.position = {
            currentX: 0,
            currentY: 0,
            shiftX: 0,
            shiftY: 0
        };

        Object.assign(this, options);

        this.initElement();
        this.initBindEvent();
    }

    initElement() {
        const bgColor = this.makeBgColor();
        const sticker = document.createElement("div");
        sticker.classList.add("sticker");
        sticker.id = this.id;

        const header = this.createHeader();
        const contents = this.createContents();

        sticker.appendChild(header);
        sticker.appendChild(contents);

        this.setBgColor(bgColor);
        this.setStyle(sticker);

        // customEvent
        sticker.addEventListener("removeList", this.handleClickRemoveList.bind(this));

        this.el = sticker;
    }

    initBindEvent() {
        const header = this.el.querySelector(".sticker-header");

        // DRAG 이벤트 바인딩
        header.addEventListener("mousedown", this.dragStart.bind(this));
        header.addEventListener("mouseup", this.dragEnd.bind(this));
    }

    createHeader() {
        const header = document.createElement("div");
        header.classList.add("sticker-header", "cursor-move");

        const headingTitle = document.createElement("h3");
        headingTitle.textContent = `STICKER ${this.stickerCount}`;
        headingTitle.style.color = this.titleColor;

        const btnSettings = document.createElement("div");
        btnSettings.classList.add("sticker-setting");

        const addListBtn = document.createElement("button");
        addListBtn.classList.add("btn");
        addListBtn.id = "sticker-list-add";
        addListBtn.type = "button";
        addListBtn.textContent = "항목추가";
        addListBtn.addEventListener("click", this.handleClickAdddList.bind(this));

        const removeSticker = document.createElement("button");
        removeSticker.classList.add("btn");
        removeSticker.id = "sticker-remove";
        removeSticker.type = "button";
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


    // CRUD
    addList() {
        const listEl = this.el.querySelector(".sticker-list");
        const data = {
            id: `sticker_${crypto.randomUUID()}`,
            stickerCount: this.stickerCount,
            listCount: ++this.listCount,
            parentEl: listEl,
            _self: this
        }

        const list = new StickerList(data);
        list.render(listEl);

        this.itemList.push(list);
    }

    removeList(id) {
        this.itemList = this.itemList.filter(item => item.id !== id);
    }


    // DRAG
    dragStart(e) {
        if (e.target.tagName === "BUTTON" || e.target.tagName === "LI") return false;
        e.preventDefault();

        const pageX = e.pageX;
        const pageY = e.pageY;
        const clientX = e.clientX;
        const clientY = e.clientY;
        const currentElX = this.el.getBoundingClientRect().x;
        const currentElY = this.el.getBoundingClientRect().y;
        const parentX = this.parentClientRect.x;
        const parentY = this.parentClientRect.y;

        this.isDraggable = true;

        this.position.shiftX = clientX - (currentElX - parentX);
        this.position.shiftY = clientY - (currentElY - parentY);

        this.setPosition(pageX, pageY);

        document.addEventListener("mousemove", this.dragMove.bind(this));
    }

    dragMove(e) {
        if (this.isDraggable) {
            this.setPosition(e.pageX, e.pageY);
        }
    }

    dragEnd(e) {
        this.isDraggable = false;
        document.removeEventListener("mousemove", this.dragMove); // 되는건가?
    }


    // SET, GET
    setPosition(pageX, pageY) {
        const currentX = pageX - this.position.shiftX;
        const currentY = pageY - this.position.shiftY;

        this.el.style.left = `${currentX}px`;
        this.el.style.top = `${currentY}px`;

        this.position.currentX = currentX;
        this.position.currentY = currentY;
    }

    setStyle(target) {
        const { initX, initY } = this.initPosition;

        target.style.top = `${initY}px`;
        target.style.left = `${initX}px`;
        target.style.backgroundColor = `rgba(${this.bgColor}, 0.8)`;
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor;
    }

    getBgColor() {
        return this.bgColor;
    }

    makeBgColor() {
        const result = [];
        let sum = 0;

        for (let i = 0; i < 3; i++) {
            const num = Math.floor(Math.random() * 255);
            sum += num;
            result.push(num);
        }

        this.titleColor = (sum > 550) ? "#333" : "#fff";
        return result.join();
    }


    // HANDLER
    handleClickAdddList(e) {
        this.addList();
    }

    handleClickRemoveList(e) {
        const { id } = e.detail;

        this.removeList(id);
    }

    handleClickRemoveSticker(id) {
        const event = new CustomEvent("removeSticker", { bubbles: true, detail: { id } });

        this.parentEl.dispatchEvent(event);
        this.el.remove();
        this.el = null;
    }
}