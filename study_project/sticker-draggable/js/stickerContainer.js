import Sticker from "./sticker.js";

export default class StickerContainer {
    constructor() {
        this.el = null;
        this.count = 0;
        this.zIdx = 0;
        this.stickerList = [];
        this.initialPositionX = 5;
        this.initialPositionY = 5;

        this.fetchDatas();
        this.initElement();
    }

    initElement() {
        const element = document.createElement("div");

        element.classList.add("sticker-wrapper");

        // 다 없어져야 할 로직
        element.addEventListener("removeSticker", this.handleClickRemoveSticker.bind(this));
        element.addEventListener("changeZindex", this.handleMousedownChangeZindex.bind(this));
        element.addEventListener("changeSticker", this.handleClickUpdate.bind(this));
        element.addEventListener("updateSticker", this.setStorage.bind(this));

        this.el = element;
    }

    fetchDatas() {
        const storage = localStorage;
        const datas = JSON.parse(storage.getItem("stickers"));

        if (datas) {
            this.stickerList = datas;
        }
    }

    setStorage() {
        const storage = localStorage;
        storage.setItem("stickers", JSON.stringify(this.stickerList));
    }

    render(parent) {
        this.renderSticker();
        parent.appendChild(this.el);
    }

    renderSticker() {
        this.stickerList = this.stickerList?.map(data => {
            const sticker = new Sticker(data);

            sticker.render(this.el);
            return sticker;
        });
    }

    createSticker() {
        const data = {
            id: `sticker_${crypto.randomUUID()}`,
            stickerCount: ++this.count,
            zIdx: ++this.zIdx,
            position: {
                currentX: this.initialPositionX,
                currentY: this.initialPositionY
            },
            parentClientRect: this.el.getBoundingClientRect(),
        };
        const sticker = new Sticker(data);

        // 필요한 데이터만 저장한다
        this.stickerList.push(sticker);
        sticker.render(this.el);

        this.setStorage();

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

        this.setStorage();
    }

    updateZindex(id) {
        const updateSticker = this.getSticker(id);

        if (updateSticker[0].zIdx !== this.zIdx) {
            updateSticker[0].zIdx = ++this.zIdx;
        }
    }

    getSticker(id) {
        return this.stickerList.filter(sticker => sticker.id === id);
    }

    handleClickRemoveSticker(e) {
        const { id } = e.detail;

        this.removeSticker(id);
        this.setStorage();
    }

    handleMousedownChangeZindex(e) {
        const { id } = e.detail;

        this.updateZindex(id);
        this.setStorage();
    }

    handleClickUpdate(e) {
        const { id, startParentID, endParentID } = e.detail;
        const startSticker = this.getSticker(startParentID)[0];
        const endSticker = this.getSticker(endParentID)[0];

        const removeList = startSticker.removeList(id);
        endSticker.updateList(removeList[0]);
        this.setStorage(); 
    }
}