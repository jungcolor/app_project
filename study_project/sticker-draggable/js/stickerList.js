export default class StickerList {
    constructor(options) {
        this.el = null;

        Object.assign(this, options);

        this.initElement();
        this.render();
    }

    initElement() {
        const li = document.createElement("li");
        li.id = this.id;
        const div = document.createElement("div");
        div.textContent = `목록${this.stickerCount}-${this.listCount}`;

        const button = document.createElement("button");
        button.textContent = "삭제";
        button.addEventListener("click", this.handleClickRemove.bind(this, this.id));
        
        li.appendChild(div);
        li.appendChild(button);

        this.el = li;
    }

    render() {
        this.parentEl.appendChild(this.el);
    }

    handleClickRemove(id) {
        const event = new CustomEvent("removeList", { bubbles: true, detail: { id: id } });

        this.parentEl.dispatchEvent(event);
        this.el.remove();
    }
}