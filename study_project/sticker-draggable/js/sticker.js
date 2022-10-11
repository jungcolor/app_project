import Component from "./component.js";

export default class Sticker extends Component {
    setup() {
        this.state = [];
    }

    template() {
        return `
            <div class="sticker" style="top: 30px; left: 30px;">
                <div class="sticker-header">
                    <h3>STICKER 1</h3>
                    <div class="sticker-setting">
                        <button type="button" class="btn" id="sticker-list-add">항목추가</button>
                        <button type="button" class="btn" id="sticker-remove">스티커삭제</button>
                    </div>
                </div>
                <div class="sticker-contents">
                    <ul class="sticker-list">
                        <li>
                            <div>목록1</div>
                            <button type="button" class="btn" id="sticker-list-remove">삭제</button>
                        </li>
                        <li>
                            <div>목록2</div>
                            <button type="button" class="btn" id="sticker-list-remove">삭제</button>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    setEvent() {}
}