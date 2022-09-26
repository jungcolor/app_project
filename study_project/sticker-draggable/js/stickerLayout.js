import Sticker from "./sticker.js";

export default class StickerLayout {
    constructor(options) {
        this.el = null;
        this.count = 1;
        this.stickerList = [];
        this.initialPositionX = 5;
        this.initialPositionY = 5;
        
        Object.assign(this, options);

        this.initElement();
        this.render();
    }

    initElement() {
        const element = document.createElement("div");
        element.classList.add("sticker-wrapper");
        element.addEventListener("removeSticker", this.handleClickRemoveSticker.bind(this));

        this.el = element;
    }

    render() {
        this.parentEl.appendChild(this.el);
    }

    addSticker() {
        const data = {
            id: `sticker_${crypto.randomUUID()}`,
            stickerCount: this.count++,
            initPosition: {
                initX: this.initialPositionX,
                initY: this.initialPositionY
            },
            parentEl: this.el,
            parentClientRect: this.el.getBoundingClientRect(),
            _self: this
        };
        const sticker = new Sticker(data);

        this.stickerList.push(sticker);

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

    handleClickRemoveSticker(e) {
        const { id } = e.detail;

        this.removeSticker(id);
    }
}