const todos = {
    itemList: [],
    completeItemList: [],
    itemListEl: null,
    completeItemListEl: null,

    init: function () {
        this.initElement();
        this.render();
    },

    initElement: function () {
        const addContent = document.querySelector(".add-content");
        const addBtn = document.querySelector(".add-btn");

        addContent.addEventListener("keyup", this.handleAddContent.bind(this));
        addBtn.addEventListener("click", this.handleAddBtn.bind(this));

        this.itemListEl = document.querySelector(".todo ul");
        this.completeItemListEl = document.querySelector(".todoComplete ul");
    },

    render: function () {
        this.fetchData();
    },

    fetchData: function () {
        this.itemList = this.fetchDataItems();
    },

    fetchDataItems: function () {
        const items = [];

        return items;
    },

    itemEventBind: function (id) {
        const complete = document.querySelector(`#${id} [type="checkbox"]`);
        const remove = document.querySelector(`#${id} [type="button"]`);

        complete.addEventListener("change", this.handleCompleteChange.bind(this));
        remove.addEventListener("click", this.handleRemove.bind(this));
    },

    // DATA =============================================================================
    makeItem: function (value) {
        const newItem = { id: this.uuid(), content: value, complete: false };
        this.itemList.push(newItem);

        return newItem;
    },

    removeItem: function (id, listType) {
        listType = listType || "itemList";

        const itemIdx = this[listType].findIndex(item => item.id === id);
        return this[listType].splice(itemIdx, 1);
    },

    updateItem: function (id) {
        const targetAreaClassName = this.getTargetArea(id);
        let item = [];

        if (targetAreaClassName === "todo") {
            item = this.removeItem(id, "itemList");
            item[0].complete = true;
            this.completeItemList.push(item[0]);
        }
        else {
            item = this.removeItem(id, "completeItemList");
            item[0].complete = false;
            this.itemList.push(item[0]);
        }

        this.updateItemView(item[0]);
    },

    // VIEW =============================================================================
    makeItemView: function (viewData) {
        const { id, content, complete } = viewData;
        const template = `
            <li id=${id}>
                <input type="checkbox" ${complete ? "checked" : ""} />
                <span>${content}</span>
                <button type="button">X</button>
            </li>
        `;

        this.itemListEl.insertAdjacentHTML("beforeend", template); // innerHTML 대체
        this.itemEventBind(id);
    },

    removeItemView: function (id, listType) {
        listType = listType || "itemListEl";

        const item = document.querySelector(`#${id}`);
        this[listType].removeChild(item);
    },

    updateItemView: function (item) {
        const itemEl = document.querySelector(`#${item.id}`);
        const appendListType = item.complete ? "completeItemListEl" : "itemListEl";
        const removeListType = item.complete ? "itemListEl" : "completeItemListEl";

        this[removeListType].removeChild(itemEl);
        this[appendListType].appendChild(itemEl);
    },

    // EVENT =============================================================================
    handleAddContent: function (e) {
        const { target, key } = e;

        if (key === "Enter") {
            const value = target.value;

            if (!value) {
                console.log("내용을 입력해주세요");
                return;
            }

            const viewitem = this.makeItem(value);

            this.makeItemView(viewitem);
            target.value = "";
        }
    },

    handleAddBtn: function (e) {
        const target = Array.prototype.slice.apply(e.target.closest("div").children).filter(node => node.tagName === "INPUT")[0];
        const value = target.value;

        if (!value) {
            console.log("내용을 입력해주세요");
            return;
        }

        const viewitem = this.makeItem(value);

        this.makeItemView(viewitem);
        target.value = "";
    },

    handleCompleteChange: function (e) {
        const id = this.getId(e.target);
        this.updateItem(id);
    },

    handleRemove: function (e) {
        const id = this.getId(e.target);
        const removeArea = this.getTargetArea(id);
        const removeItem = this.removeItem(id, removeArea === "todo" ? "itemList" : "completeItemList");
        this.removeItemView(id, removeItem[0].complete ? "completeItemListEl" : "itemListEl");
    },

    // UTIL =============================================================================
    getId: function (target) {
        const parent = target.closest("li");
        const id = parent.getAttribute("id");

        return id;
    },

    getTargetArea: function (id) {
        const parent = document.querySelector(`#${id}`);
        const itemArea = parent.closest("div");
        const result = itemArea.classList.value;

        return result;
    },

    uuid: function () {
        return 'todo-yxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

todos.init();