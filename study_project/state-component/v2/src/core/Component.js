import { observable, observe } from "./Observer.js";

export class Component {
    state;
    props;
    $el;

    constructor($el, props) {
        this.$el = $el;
        this.props = props;
        this.setup();
    }

    setup() {
        this.state = observable(this.initState()); // 초기 state값을 설정한다

        observe(() => {
            this.render();
            this.setEvent();
            this.mounted();
        });
    }

    initState() { }

    template() { return "" }

    render() {
        this.$el.innerHTML = this.template();
    }

    setEvent() { }

    mounted() { }
}