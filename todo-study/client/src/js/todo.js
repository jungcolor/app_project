const todos = {
    todoList: [],
    todoListEl: null,
    completeListEl: null,

    init: function () {
        this.initElement();
        this.render();
    },

    initElement: function () {
        const addContent = document.querySelector(".add-content");
        const addBtn = document.querySelector(".add-btn");

        addContent.addEventListener("keyup", this.handleAddContent.bind(this));
        addBtn.addEventListener("click", this.handleAddBtn.bind(this));

        this.todoListEl = document.querySelector(".todo ul");
        this.completeListEl = document.querySelector(".todoComplete ul");
    },

    render: function () {
        this.fetchData();
    },

    fetchData: async function () {
        const todos = await axios.get("http://localhost:5000/api/todo").then(response => response.data);

        if (todos.success) {
            this.setTodoList(todos.datas);
        }

        this.renderItem();
    },

    itemEventBind: function (id) {
        const complete = document.querySelector(`#${id} [type="checkbox"]`);
        const remove = document.querySelector(`#${id} [type="button"]`);

        complete.addEventListener("change", this.handleCompleteChange.bind(this));
        remove.addEventListener("click", this.handleRemove.bind(this));
    },

    setTodoList: function (todos) {
        this.todoList = todos;
    },

    getTodoList: function () {
        return this.todoList;
    },

    // DATA =============================================================================
    renderItem: function () {
        this.todoList?.forEach(todo => {
            this.makeItemView(todo);
        });
    },

    makeItem: async function (value) {
        const newItem = { id: this.uuid(), content: value, complete: false };
        this.todoList.push(newItem);
        this.makeItemView(newItem);

        const datas = await axios.post("http://localhost:5000/api/todo/add", newItem).then(response => response.data);
        console.log(datas);
    },

    removeItem: function (id) {
        const itemIdx = this.todoList.findIndex(item => item.id === id);
        return this.todoList.splice(itemIdx, 1);
    },

    updateItem: function (id) {
        const item = this.todoList.filter(todo => todo.id === id);

        item[0].complete = !item[0].complete;

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

        this.todoListEl.insertAdjacentHTML("beforeend", template); // innerHTML 대체
        this.itemEventBind(id);
    },

    removeItemView: function (id, listType) {
        listType = listType || "todoListEl";

        const item = document.querySelector(`#${id}`);
        this[listType].removeChild(item);
    },

    updateItemView: function (item) {
        const itemEl = document.querySelector(`#${item.id}`);
        const appendListType = item.complete ? "completeListEl" : "todoListEl";
        const removeListType = item.complete ? "todoListEl" : "completeListEl";

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

        this.makeItem(value);
        target.value = "";
    },

    handleCompleteChange: function (e) {
        const id = this.getId(e.target);
        this.updateItem(id);
    },

    handleRemove: function (e) {
        const id = this.getId(e.target);
        const removeArea = this.getTargetArea(id);
        const removeItem = this.removeItem(id, removeArea === "todo" ? "todoList" : "completeList");
        this.removeItemView(id, removeItem[0].complete ? "completeListEl" : "todoListEl");
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