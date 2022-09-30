import Sticker from "./sticker.js";

export default class StickerLayout {
    constructor() {
        this.el = null;
        this.count = 0;
        this.zIdx = 0;
        this.stickerList = [];
        this.initialPositionX = 5;
        this.initialPositionY = 5;

        this.initElement();
    }

    initElement() {
        const element = document.createElement("div");

        element.classList.add("sticker-wrapper");
        element.addEventListener("removeSticker", this.handleClickRemoveSticker.bind(this));
        element.addEventListener("changeZindex", this.handleMousedownChangeZindex.bind(this));

        this.el = element;
    }

    render(parent) {
        parent.appendChild(this.el);
    }

    addSticker() {
        const data = {
            id: `sticker_${crypto.randomUUID()}`,
            stickerCount: ++this.count,
            zIdx: ++this.zIdx,
            initPosition: {
                initX: this.initialPositionX,
                initY: this.initialPositionY
            },
            parentEl: this.el,
            parentClientRect: this.el.getBoundingClientRect(),
        };
        const sticker = new Sticker(data);

        this.stickerList.push(sticker);
        sticker.render(this.el);

        // 아이템 추가 후 초기값에 10을 더해준다
        this.initialPositionX = this.initialPositionX + 10;
        this.initialPositionY = this.initialPositionY + 10;
    }

    removeSticker(id) {
        this.stickerList = this.stickerList.filter(sticker => sticker.id !== id);

        this.count--;
        this.initialPositionX = this.initialPositionX - 10;
        this.initialPositionY = this.initialPositionY - 10;
    }

    removeStickerAll() {
        this.stickerList.forEach(sticker => {
            this.removeSticker(sticker.id);
            sticker.el.remove();
        });
    }

    updateStatus(id, type) {
        const updateSticker = this.stickerList.filter(sticker => sticker.id === id);

        updateSticker[0][type] = ++this.zIdx;
    }

    // dispatch Event
    handleClickRemoveSticker(e) {
        const { id } = e.detail;

        this.removeSticker(id);
    }

    handleMousedownChangeZindex(e) {
        const { id } = e.detail;

        this.updateStatus(id, "zindex");
    }
}