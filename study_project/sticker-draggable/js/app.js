import Component from "./component.js";
import StickerContainer from "./stickerContainer.js";

export default class App extends Component {
    template() {
        return `
            <button class="btn" id="addSticker">스티커 추가</button>
            <button class="btn" id="removeStickerAll">스티커 모두 삭제</button>
            <div class="sticker-wrapper"></div>
        `;
    }

    mounted() {
        const stickerContainer = this.target.querySelector(".sticker-wrapper");

        this.stickerContainer = new StickerContainer(stickerContainer);
    }

    setEvent() {
        this.addEvent("click", "#addSticker", (event) => {
            this.stickerContainer.makeSticker();
        });

        this.addEvent("click", "#removeStickerAll", (event) => {
            // 스티커 삭제 로직
            console.log("스티커 삭제");
        });
    }
}