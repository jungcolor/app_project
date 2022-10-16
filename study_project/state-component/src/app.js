// state가 변경 되면 render를 실행한다
// state는 setState로만 변경해야 한다
// 위 규칙을 지켜가면서 코드를 작성하게 되면 브라우저에 출력되는 내용은 무조건 state에 종속되는 것이다.
// DOM을 직접적으로 다룰 필요가 없어진다
import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

// 기존 - Entry Point역할의 파일
// 변경 - Items의 상태와 기능을 관리
export default class App extends Component {
    setup() {
        this.$state = {
            isFilter: 0,
            items: [
                {
                    seq: 1,
                    contents: "item1",
                    active: false,
                },
                {
                    seq: 2,
                    contents: "item2",
                    active: true,
                }
            ]
        };
    }

    template () {
        return `
            <header data-component="item-appender"></header>
            <main data-component="items"></main>
            <footer data-component="item-filter"></footer>
        `;
    }

    // 여기서 자식 컴포넌트를 마운트한다
    mounted() {
        const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
        const $itemAppender = this.$target.querySelector(`[data-component="item-appender"]`);
        const $items = this.$target.querySelector(`[data-component="items"]`);
        const $itemFilter = this.$target.querySelector(`[data-component="item-filter"]`);

        new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
        new Items($items, { filteredItems, deleteItem: deleteItem.bind(this), toggleItem: toggleItem.bind(this) });
        new ItemFilter($itemFilter, { filterItem: filterItem.bind(this) });
    }

    get filteredItems() {
        const { isFilter, items } = this.$state;
        return items.filter(({ active }) => (isFilter === 1 && active) || (isFilter === 2 && !active) || isFilter === 0);
    }

    addItem(contents) {
        const { items } = this.$state;
        const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
        const active = false;

        this.setState({
            items: [...items, { seq, contents, active }]
        });
    }

    deleteItem(seq) {
        const items = [...this.$state.items];
        items.splice(items.findIndex(v => v.seq === seq), 1);
        this.setState({ items });
    }

    toggleItem(seq) {
        const items = [...this.$state.items];
        const index = items.findIndex(v => v.seq === seq);
        items[index].active = !items[index].active;
        this.setState({ items });
    }

    filterItem(isFilter) {
        this.setState({ isFilter });
    }
}