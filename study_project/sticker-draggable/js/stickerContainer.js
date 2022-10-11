import Component from "./component.js";
import Sticker from "./sticker.js";

export default class StickerContainer extends Component {
    setup() {
        this.state = [];
    }

    mounted() {}

    setEvent() {}

    makeSticker() {
        // 데이터 추가해서
        // setState하면 render가 실행된다
        const datas = { id: `sticker-${crypto.randomUUID()}`, title: "STICKER 1" };
        new Sticker(this.target);
        this.setState(datas);
    }
}