// 구독자가 구독하는 갯수가 많아질 경우 구독관련 코드가 많아지기때문에 관리가 어려워진다
// class 발행기관 {
//     #state;
//     #observers = new Set();

//     constructor(state) {
//         this.#state = state;
//         Object.keys(state).forEach(key => Object.defineProperty(this, key, {
//             get: () => this.#state[key]
//         }));
//     }

//     내부에_변화가_생김(newState) {
//         this.#state = { ...this.#state, ...newState };
//         this.구독자에게_알림();
//     }

//     구독자_등록(subscriber) {
//         this.#observers.add(subscriber);
//     }

//     구독자에게_알림() {
//         this.#observers.forEach(fn => fn());
//     }
// }

// class 구독자 {
//     #fn;

//     constructor(발행기관에_병화가_생길_때_하는_일) {
//         this.#fn = 발행기관에_병화가_생길_때_하는_일;
//     }

//     구독(publisher) {
//         publisher.구독자_등록(this.#fn);
//     }
// }

// const 상태 = new 발행기관({ a: 10, b: 20 });

// const 덧셈계산기 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
// const 곱셈계산기 = new 구독자(() => console.log(`a * b = ${상태.a * 상태.b}`));

// 덧셈계산기.구독(상태);
// 곱셈계산기.구독(상태);

// 상태.구독자에게_알림();

// 상태.내부에_변화가_생김({ a: 100, b: 200 });

// 리팩토링
let currentObserver = null;

const state = { a: 10, b: 20 };
const stateKeys = Object.keys(state);

for (const key of stateKeys) {
    let _value = state[key];
    const observers = new Set();
    Object.defineProperty(state, key, {
        get () {
            if (currentObserver) observers.add(currentObserver);
            return _value;
        },

        set (value) {
            _value = value;
            observers.forEach(observer => observer());
        }
    });
}

const 덧셈_계산기 = () => {
    currentObserver = 덧셈_계산기;
    console.log(`a + b = ${state.a + state.b}`);
};

const 뺄셈_계산기 = () => {
    currentObserver = 뺄셈_계산기;
    console.log(`a - b = ${state.a - state.b}`);
}

덧셈_계산기();
state.a = 100;

뺄셈_계산기();
state.b = 200;

state.a = 1;
state.b = 2;