export default class StickerList {
    constructor(options) {
        this.el = null;
        this.helper = null;
        this.isDraggable = false;
        this.position = {};

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

        this.setHelper();

        const pageX = e.pageX;
        const pageY = e.pageY;
        const clientX = e.clientX;
        const clientY = e.clientY;
        const currentElX = this.el.getBoundingClientRect().x;
        const currentElY = this.el.getBoundingClientRect().y;

        this.isDraggable = true;

        this.position.shiftX = clientX - currentElX;
        this.position.shiftY = clientY - currentElY;

        this.setPosition(pageX, pageY);

        this.el.classList.add("transper");

        document.addEventListener("mousemove", this.dragMove.bind(this));
    }

    dragMove(e) {
        if (this.isDraggable) {
            this.helper.style.display = "none"; // 마우스에 있는 녀석 잠깐 숨겼다가
            const targetElement = document.elementFromPoint(e.clientX, e.clientY).closest("li"); // 마우스 아래 있는 요녀석만 찾아내고
            this.helper.style.display = "flex"; // 마우스에 있는 녀석 다시 보여준다

            if (targetElement) {
                const y = targetElement.getBoundingClientRect().y + (targetElement.getBoundingClientRect().height / 2);
                const parentElement = targetElement.closest("ul");
    
                if (e.pageY < y) {
                    parentElement.insertBefore(this.el, targetElement);
                }
                else {
                    parentElement.insertBefore(this.el, targetElement.nextSibling);
                }
            }

            this.setPosition(e.pageX, e.pageY);
        }
    }

    dragEnd(e) {
        this.isDraggable = false;
        this.helper.remove();
        this.el.classList.remove("transper");
        document.removeEventListener("mousemove", this.dragMove);
    }

    // SET, GET
    setPosition(pageX, pageY) {
        const currentX = pageX - this.position.shiftX;
        const currentY = pageY - this.position.shiftY;

        this.helper.style.left = `${currentX}px`;
        this.helper.style.top = `${currentY}px`;
    }

    setHelper() {
        this.helper = this.el.cloneNode(true);
        this.helper.classList.add("helper");
        this.helper.style.position = "absolute";
        this.helper.style.zIndex = "1000";

        this.helper.addEventListener("mouseup", this.dragEnd.bind(this));

        document.body.append(this.helper);
    }


    // HANDLER
    handleClickRemove(id) {
        const event = new CustomEvent("removeList", { bubbles: true, detail: { id: id } });

        this.parentEl.dispatchEvent(event);
        this.el.remove();
        this.el = null;
    }
}