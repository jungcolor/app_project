import Component from "./component.js";

export default class StickerContainer extends Component {
    setup() {
        this.state = [];
    }

    template() {
        return `<div class="sticker-wrapper"></div>`;
    }

    mounted() {}

    setEvent() {}

    makeSticker() {
        // 데이터 추가해서
        // setState하면 render가 실행된다
        const datas = { id: `sticker-${crypto.randomUUID()}`, title: "STICKER 1" };
        this.setState(datas);
    }
}