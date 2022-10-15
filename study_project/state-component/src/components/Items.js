import Component from "../core/Component.js";

export default class Items extends Component {
    setup() {
        this.$state = { items: ["item1", "item2"] };
    }

    template() {
        const { items } = this.$state;

        return `
            <ul>
                ${items.map((item, index) => `
                    <li>
                        ${item}
                        <button class="remove" data-index=${index}>삭제</button>
                    </li>
                `).join('')}
            </ul>
            <button class="append">추가</button>
        `;
    }

    setEvent() {
        // 추상화 된 이벤트 바인딩형태
        this.addEvent("click", ".append", ({ target }) => {
            const { items } = this.$state;

            this.setState({ items: [...items, `item${items.length + 1}`] });
        });

        this.addEvent("click", ".remove", ({ target }) => {
            const items = [...this.$state.items];
            items.splice(target.dataset.index, 1);

            this.setState(items);
        });

        // element 각각에 이벤트를 등록하는 방법이 아닌,
        // 컴포넌트가 생성될 때 가장 밖, 부모 element에 이벤트를 등록해 준다
        // this.$target.addEventListener("click", ({ target }) => {
        //     const items = [...this.$state.items];

        //     if (target.classList.contains("append")) {
        //         this.setState({ items: [...items, `item${items.length + 1}`] });
        //     }

        //     if (target.classList.contains("remove")) {
        //         items.splice(target.dataset.index, 1);
        //         this.setState({ items });
        //     }
        // });
    }
}