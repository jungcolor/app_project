import Component from "./core/Component.js";
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
        const { $target, getItems, removeItems, dragStart, dragMove, dragEnd, setPosition } = this;
        const $stickerWrapper = $target.querySelector(".sticker-wrapper");
        const stickerProps = {
            getItems: getItems.bind(this),
            removeItems: removeItems.bind(this),
            dragStart: dragStart.bind(this),
            dragMove: dragMove.bind(this),
            dragEnd: dragEnd.bind(this),
            setPosition: setPosition.bind(this)
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
            isDraggable: false,
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

    dragStart() { }

    dragMove() { }

    dragEnd() { }

    setPosition(el, currentX, currentY) {
        el.style.left = `${currentX}px`;
        el.style.top = `${currentY}px`;
    }
}