export default class Component {
    $target;
    props;
    state;

    constructor($target, props) {
        this.$target = $target;
        this.props = props;

        this.setup();
        this.render();
    }

    // state 초기화
    setup() {}

    template() {
        return ``;
    }

    // 화면 랜더
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }

    mounted() {}

    setState() {}

    // 이벤트 셋팅
    setEvent() {}
}