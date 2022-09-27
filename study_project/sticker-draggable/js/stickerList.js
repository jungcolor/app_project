export default class StickerList {
    constructor(options) {
        this.el = null;
        this.helper = null;
        this.isDraggable = false;

        Object.assign(this, options);

        this.initElement();
        this.initBindEvent();
    }

    initElement() {
        const li = document.createElement("li");
        li.classList.add("cursor-move");
        li.id = this.id;

        const div = document.createElement("div");
        div.textContent = `목록${this.stickerCount}-${this.listCount}`;

        const remove = document.createElement("button");
        remove.classList.add("btn");
        remove.type = "button";
        remove.textContent = "삭제";
        remove.addEventListener("click", this.handleClickRemove.bind(this, this.id));

        li.appendChild(div);
        li.appendChild(remove);

        this.el = li;
    }

    initBindEvent() {
        this.el.addEventListener("mousedown", this.dragStart.bind(this));
    }

    render(parent) {
        parent.appendChild(this.el);
    }

    // DRAG
    dragStart(e) {
        if (e.target.tagName === "BUTTON") return false;
        e.preventDefault();

        this.isDraggable = true;
        this.helper = this.el.cloneNode(true);
        this.helper.classList.add("helper");
        this.helper.style.position = "absolute";
        this.helper.style.top = "100px";
        this.helper.style.left = "50px";
        document.body.append(this.helper);



        console.log("start");
    }

    dragMove(e) { }

    dragEnd(e) { }


    // HANDLER
    handleClickRemove(id) {
        const event = new CustomEvent("removeList", { bubbles: true, detail: { id: id } });

        this.parentEl.dispatchEvent(event);
        this.el.remove();
        this.el = null;
    }
}