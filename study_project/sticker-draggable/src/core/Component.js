export default class Component {
    $target;
    props;
    state;

    constructor($target, props) {
        this.$target = $target;
        this.props = props
        this.setup();
        this.setEvent();
        this.render();
    }

    setup() { }

    setEvent() { }

    template() { return ""; }

    mounted() { }

    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }

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
        this.state = [...this.state, ...newState];
        this.render();
    }
}