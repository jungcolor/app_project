import Component from "./component.js";
import StickerContainer from "./stickerContainer.js";
import Sticker from "./sticker.js";
import StickerList from "./stickerList.js";

export default class App extends Component {
    setup () { }

    template() {
        return `
            <button class="btn" id="addSticker">스티커 추가</button>
            <button class="btn" id="removeStickerAll">스티커 모두 삭제</button>
            <div class="sticker-wrapper"></div>
        `;
    }

    setEvent() {
        this.target.addEventListener("click", (event) => {
            const { target } = event;
            if (target.closest("#addSticker")) {
                // 스티커 추가 로직
                console.log("스티커 추가");
            }
            
            if (target.closest("#removeStickerAll")) {
                // 스티커 삭제 로직
                console.log("스티커 삭제");
            }
        });
    }
}