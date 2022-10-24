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
        const { $target, stickers, removeSticker } = this;
        const $stickerWrapper = $target.querySelector(".sticker-wrapper");

        new Sticker($stickerWrapper, { stickers, removeSticker: removeSticker.bind(this) });
    }

    setEvent() {
        this.addEvent("click", "#sticker-add", ({ target }) => {
            this.addSticker();
        });

        this.addEvent("click", "#sticker-remove-all", ({ target }) => {
            console.log("스티커 삭제");
        });
    }

    get stickers() {
        return this.state.items;
    }

    addSticker() {
        const result = [{
            id: crypto.randomUUID(),
            style: {
                position: { top: 10, left: 10 },
                bgColor: "#fff",
            },
            children: []
        }];
        this.setState(result);
    }

    removeSticker(id) {
        const stickers = [...this.state];
        stickers.splice(stickers.filter(sticker => sticker.id === id), 1);
        this.setState(stickers);
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