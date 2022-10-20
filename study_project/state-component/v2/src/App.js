import { Component } from "./core/Component.js";
import { store } from "./Store.js";

const inputA = () => `<input type="text" id="stateA" value=${store.state.a} size="5" />`;
const inputB = () => `<input type="text" id="stateB" value=${store.state.b} size="5" />`;
const Calculator = () => `<p>a + b = ${store.state.a + store.state.b}</p>`;

export class App extends Component {
    initState() {
        return { a: 10, b: 20 };
    }

    template() {
        return `
            ${inputA()}
            ${inputB()}
            ${Calculator()}
        `;
    };

    setEvent() {
        this.$el.querySelector("#stateA").addEventListener("change", ({ target }) => {
            store.setState({ a: Number(target.value) });
        });

        this.$el.querySelector("#stateB").addEventListener("change", ({ target }) => {
            store.setState({ b: Number(target.value) });
        });
    }
}