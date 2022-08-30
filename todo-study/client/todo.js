const todos = {
    itemList: [],
    completeItemList: [],
    itemListEl: null,
    completeItemListEl: null,

    init: function () {
        this.initElement();
        this.initEvent();        
        this.render();
    },

    initElement: function () {
        this.itemListEl = document.querySelector(".todo ul");
        this.completeItemListEl = document.querySelector(".todoComplete ul");
    },

    initEvent: function () {
        const addContent = document.querySelector(".add-content");
        const addBtn = document.querySelector(".add-btn");

        addContent.addEventListener("keyup", this.handleAddContent.bind(this));
        addBtn.addEventListener("click", this.handleAddBtn.bind(this));
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

    addItem : function () {},
    addItemView: function () {},

    makeItem: function (value) {
        const newItem = { id: this.uuid(), content: value, complete: false };
        this.itemList.push(newItem);

        return newItem;
    },

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

    itemEventBind: function (id) {
        const complete = document.querySelector(`#${id} [type="checkbox"]`);
        const remove = document.querySelector(`#${id} [type="button"]`);

        complete.addEventListener("change", this.handleCompleteChange.bind(this));
        remove.addEventListener("click", this.handleRemove.bind(this));
    },

    removeItem: function (id) {
        const removeIdx = this.itemList.findIndex(item => item.id === id);
        this.itemList.splice(removeIdx, 1);
    },

    removeItemView: function (id) {
        const item = document.querySelector(`#${id}`);
        this.itemListEl.removeChild(item);
    },

    handleAddContent: function (e) {
        const { target, key } = e;

        if (key === "Enter") {
            const value = target.value;
            const viewitem = this.makeItem(value);

            this.makeItemView(viewitem);
            target.value = "";
        }
    },

    handleAddBtn: function (e) {},

    handleCompleteChange: function (e) {
        
    },

    handleRemove: function (e) {
        const id = this.getId();
        
        this.removeItem(id);
        this.removeItemView(id);
    },

    // Util
    getId: function (target) {
        const parent = target.closest("li");
        const id = parent.getAttribute("id");

        return id;
    },

    uuid: function () {
        return 'todo-yxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

todos.init();