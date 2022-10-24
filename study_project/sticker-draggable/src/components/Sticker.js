import Component from "../core/Component.js";

export default class Sticker extends Component {
    template() {
        const { getItems } = this.props;

        return `
            ${getItems()?.map(({ id, style, children }, idx) => {
                const { position } = style;

                return `
                    <div class="sticker" id="${id}" style="top: ${position.top}px; left: ${position.left}px">
                        <div class="sticker-header">
                            <h3>STICKER ${idx}</h3>
                            <div class="sticker-setting">
                                <button type="button" class="btn" id="sticker-item-add">항목추가</button>
                                <button type="button" class="btn" id="sticker-remove">스티커삭제</button>
                            </div>
                        </div>
                        <div class="sticker-contents">
                            <ul class="sticker-list"></ul>
                        </div>
                    </div>
                `
            }).join("")}
        `;
    }

    mounted() {
        console.log("asdsadsadsad");
    }

    setEvent() {
        const { removeItems, dragStart, dragMove, dragEnd } = this.props;

        this.addEvent("click", "#sticker-item-add", (event) => {
            console.log("리스트 아이템 추가");
        });

        this.addEvent("click", "#sticker-remove", ({ target }) => {
            removeItems(target.closest(".sticker").id);
        });

        this.addEvent("mousedown", ".sticker", (event) => {
            if (event.target.tagName === "BUTTON" || event.target.tagName === "LI") return false;
            event.preventDefault(); // 텍스트 range현상 방지

            const id = event.target.closest(".sticker").id;
            console.log(id);
            console.log("마우스 다운");
        });

        this.addEvent("mouseup", ".sticker", ({ target }) => {
            console.log("마우스 업");

            document.removeEventListener("mousemove", () => {
                console.log("마우스 무브 종료");
            });
        });
    }
}

// export default class Sticker {
//     constructor(options, props) {
//         this.el = null;
//         this.listEl = null;
//         this.itemList = [];
//         this.listCount = 0;
//         this.isDraggable = false;

//         Object.assign(this, options);

//         this.titleColor = options.titleColor || "";
//         this.bgColor = options.bgColor || this.makeBgColor();
//         this.position.shiftX = 0;
//         this.position.shiftY = 0;

//         this.props = props;

//         this.initElement();
//         this.initBindEvent();
//     }

//     initElement() {
//         const sticker = document.createElement("div");
//         sticker.classList.add("sticker");
//         sticker.id = this.id;

//         this.setStyle(sticker);

//         const header = this.createHeader();
//         const contents = this.createContents();

//         sticker.appendChild(header);
//         sticker.appendChild(contents);

//         this.el = sticker;
//     }

//     initBindEvent() {
//         const header = this.el.querySelector(".sticker-header");

//         // DRAG 이벤트 바인딩
//         header.addEventListener("mousedown", this.dragStart.bind(this));
//         header.addEventListener("mouseup", this.dragEnd.bind(this));

//         // customEvent
//         this.el.addEventListener("removeList", this.handleClickRemoveList.bind(this));
//         this.el.addEventListener("chageList", this.handleClickUpdate.bind(this));
//     }

//     createHeader() {
//         const header = document.createElement("div");
//         header.classList.add("sticker-header", "cursor-move");

//         const headingTitle = document.createElement("h3");
//         headingTitle.textContent = `STICKER ${this.stickerCount}`;
//         headingTitle.style.color = this.titleColor;

//         const btnSettings = document.createElement("div");
//         btnSettings.classList.add("sticker-setting");

//         const addListBtn = document.createElement("button");
//         addListBtn.classList.add("btn");
//         addListBtn.id = "sticker-list-add";
//         addListBtn.type = "button";
//         addListBtn.textContent = "항목추가";
//         addListBtn.addEventListener("click", this.handleClickAdddList.bind(this));

//         const removeSticker = document.createElement("button");
//         removeSticker.classList.add("btn");
//         removeSticker.id = "sticker-remove";
//         removeSticker.type = "button";
//         removeSticker.textContent = "스티커삭제";
//         removeSticker.addEventListener("click", this.handleClickRemoveSticker.bind(this, this.id));

//         btnSettings.appendChild(addListBtn);
//         btnSettings.appendChild(removeSticker);

//         header.appendChild(headingTitle);
//         header.appendChild(btnSettings);

//         return header;
//     }

//     createContents() {
//         const contents = document.createElement("div");
//         contents.classList.add("sticker-contents");

//         const list = document.createElement("ul");
//         list.classList.add("sticker-list");

//         contents.appendChild(list);

//         this.listEl = list;

//         return contents;
//     }

//     render(parent) {
//         this.renderList();
//         parent.append(this.el);
//     }

//     renderList() {
//         this.itemList = this.itemList?.map(data => {
//             const list = new StickerList(data);

//             list.render(this.listEl);
//             return list;
//         });
//     }


//     // CRUD
//     createList() {
//         const data = {
//             id: `list_${crypto.randomUUID()}`,
//             stickerCount: this.stickerCount,
//             listCount: ++this.listCount,
//             parentEl: this.listEl,
//         }

//         const list = new StickerList(data);
//         list.render(this.listEl);

//         this.itemList.push(list);
//     }

//     removeList(id) {
//         const removeListIdx = this.itemList.findIndex(item => item.id === id);
//         const removeList = this.itemList.splice(removeListIdx, 1);

//         this.props.updateStorage();
//         return removeList;
//     }

//     updateList(list) {
//         this.itemList.push(list);
//     }

//     // DRAG
//     dragStart(e) {
//         if (e.target.tagName === "BUTTON" || e.target.tagName === "LI") return false;
//         e.preventDefault();

//         const pageX = e.pageX;
//         const pageY = e.pageY;
//         const clientX = e.clientX;
//         const clientY = e.clientY;
//         const currentElX = this.el.getBoundingClientRect().x;
//         const currentElY = this.el.getBoundingClientRect().y;
//         const parentX = this.parentClientRect.x;
//         const parentY = this.parentClientRect.y;

//         // 현재 선택 된 스티커가 가장 상단에 올 수 있도록 zindex값을 변경한다
//         this.props.updateZindex(this.id);
//         this.el.style.zIndex = this.zIdx;

//         this.isDraggable = true;

//         this.position.shiftX = clientX - (currentElX - parentX);
//         this.position.shiftY = clientY - (currentElY - parentY);

//         this.setPosition(pageX, pageY);

//         document.addEventListener("mousemove", this.dragMove.bind(this));
//     }

//     dragMove(e) {
//         if (this.isDraggable) {
//             this.setPosition(e.pageX, e.pageY);
//         }
//     }

//     dragEnd(e) {
//         this.isDraggable = false;
//         this.props.updateStorage();
//         document.removeEventListener("mousemove", this.dragMove);
//     }


//     // SET, GET
//     setPosition(pageX, pageY) {
//         const currentX = pageX - this.position.shiftX;
//         const currentY = pageY - this.position.shiftY;

//         this.el.style.left = `${currentX}px`;
//         this.el.style.top = `${currentY}px`;

//         this.position.currentX = currentX;
//         this.position.currentY = currentY;
//     }

//     setStyle(target) {
//         const { currentX, currentY } = this.position;

//         target.style.top = `${currentY}px`;
//         target.style.left = `${currentX}px`;
//         target.style.zIndex = this.zIdx;
//         target.style.backgroundColor = `rgba(${this.bgColor}, 0.8)`;
//     }

//     makeBgColor() {
//         const result = [];
//         let sum = 0;

//         for (let i = 0; i < 3; i++) {
//             const num = Math.floor(Math.random() * 255);
//             sum += num;
//             result.push(num);
//         }

//         this.titleColor = (sum > 500) ? "#333" : "#fff";
//         return result.join();
//     }

//     // HANDLER
//     handleClickAdddList(e) {
//         this.createList();
//     }

//     handleClickRemoveList(e) {
//         const { id } = e.detail;

//         this.removeList(id);
//     }

//     handleClickRemoveSticker(id) {
//         this.props.removeSticker(id);
//         this.el.remove();
//         this.el = null;
//     }

//     handleClickUpdate(e) {
//         const event = new CustomEvent("changeSticker", { bubbles: true, detail: e.detail });

//         this.el.dispatchEvent(event);
//     }
// }