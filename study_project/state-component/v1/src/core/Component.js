/**
 * 클래스를 사용하게 되면....
 * 클래스에 정의되어 있는 프로퍼티, 메서드를 통해 구조를 파악할 수 있고
 * 코드의 사용 방법을 강제할 수 있기 때문에 코드를 유지보수할 때 편하다
 */
export default class Component {
    $target;
    $state;
    $props; // 부모 컴포넌트에서 자식 컴포넌트에게 상태 또는 메소드를 전달하기 위해 추가

    // this 초기화
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
    }

    // state 초기화
    setup() { }

    // event 바인딩
    setEvent() { }

    render() {
        this.$target.innerHTML = this.template();
        this.mounted(); // render이후 mounted 실행
    }

    template() { return ''; }

    mounted() { } // render이후 추가적인 기능을 수행하기 위해

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