import Component from "./core/Component.js";
// import StickerContainer from "./components/StickerContainer.js";
import Sticker from "./components/Sticker.js";

export default class App extends Component {
    setup() {
        this.state = { items: [] };
    }

    template() {
        return `
            <button type="button" class="btn" id="sticker-add">스티커 추가</button>
            <button type="button" class="btn" id="sticker-remove-all">스티커 모두 삭제</button>
            <div class="sticker-wrapper"></div>
        `;
    }

    // 하위 컴포넌트 생성
    mounted() {
        const { $target, getItems, removeItems, dragStart, dragMove, dragEnd } = this;
        const $stickerWrapper = $target.querySelector(".sticker-wrapper");
        const stickerProps = {
            getItems: getItems.bind(this),
            removeItems: removeItems.bind(this),
            dragStart: dragStart.bind(this),
            dragMove: dragMove.bind(this),
            dragEnd: dragEnd.bind(this)
        };

        new Sticker($stickerWrapper, stickerProps);
    }

    setEvent() {
        this.addEvent("click", "#sticker-add", ({ target }) => {
            this.addItems();
        });

        this.addEvent("click", "#sticker-remove-all", ({ target }) => {
            this.removeItemsAll();
        });
    }

    getItems(id) {
        if (id) {
            return this.state.items.filter(item => item.id === id);
        }

        return this.state.items;
    }

    addItems() {
        const items = {
            id: crypto.randomUUID(),
            el: null,
            draggable: false,
            style: {
                position: { top: 10, left: 10 },
                bgColor: "#fff",
            },
            children: [],
        };

        this.setState({
            items: [...this.state.items, items]
        });
    }

    removeItems(id) {
        const items = [...this.state.items];
        items.splice(items.filter(sticker => sticker.id === id), 1);
        this.setState({ items });
    }

    removeItemsAll() {
        this.setState({ items: [] });
    }

    dragStart() {
        console.log("드래그 시작!!");

        document.addEventListener("mousedown", () => { console.log("시작") });
    }

    dragMove() {
        console.log("드래그 중!!");
    }

    dragEnd() {
        console.log("드래그 끝!!");
    }
}


// window.addEventListener("DOMContentLoaded", (e) => {
//     const stickerAdd = document.querySelector("#sticker-add");
//     const stickerRemoveAll = document.querySelector("#sticker-remove-all");
//     const stickerContainer = new StickerContainer();
//     stickerContainer.render(document.body);

//     // 스티커 추가
//     stickerAdd.addEventListener("click", e => {
//         stickerContainer.createSticker();
//     });

//     // 스티커 전부 삭제
//     stickerRemoveAll.addEventListener("click", e => {
//         stickerContainer.removeStickerAll();
//     });
// });