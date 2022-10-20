import Component from "../core/Component.js";

export default class ItemAppender extends Component {
    template() {
        return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
    }

    setEvent() {
        const { addItem } = this.$props; // 부모 컴포넌트에서 넘겨준 메소드를 사용한다

        this.addEvent("keyup", ".appender", ({ key, target }) => {
            if (key !== "Enter") return;
            addItem(target.value);
        });
    }
}