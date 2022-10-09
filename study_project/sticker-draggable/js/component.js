export default class Component {
    $target;
    $state;
    $props;

    constructor() {}

    template() { return `` }

    render() {
        this.$target.innerHTML = this.template();
    }
}