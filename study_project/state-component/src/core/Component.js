/**
 * 클래스를 사용하게 되면....
 * 클래스에 정의되어 있는 프로퍼티, 메서드를 통해 구조를 파악할 수 있고
 * 코드의 사용 방법을 강제할 수 있기 때문에 코드를 유지보수할 때 편하다
 */
export default class Component {
    $target;
    $state;

    // this 초기화
    constructor($target) {
        this.$target = $target;
        this.setup();
        this.setEvent();
        this.render();
    }

    // state 초기화
    setup() { }

    template() { return ''; }

    render() {
        this.$target.innerHTML = this.template();
    }

    // event 바인딩
    setEvent() { }

    // event 추가 - 이벤트 버블링 추상화
    addEvent(eventType, selector, callback) {
        const children = [this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);

        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false;

            callback(event);
        });
    }

    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
}