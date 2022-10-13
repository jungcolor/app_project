// state가 변경 되면 render를 실행한다
// state는 setState로만 변경해야 한다
// 위 규칙을 지켜가면서 코드를 작성하게 되면 브라우저에 출력되는 내용은 무조건 state에 종속되는 것이다.
// DOM을 직접적으로 다룰 필요가 없어진다
const $app = document.querySelector("#app");

let state = {
    items: ["item1", "item2", "item3", "item4"]
}

const setState = (newState) => {
    state = {...state, ...newState};
    render();
}

const render = () => {
    const { items } = state;

    $app.innerHTML = `
        <ul>
            ${items.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <button id="append">추가</button>
    `;

    $app.querySelector("#append").addEventListener("click", (e) => {
        setState({ items: [...items, `item${items.length + 1}`] });
    });
}

render();