// TODO lib
import elementlib from "./lib/elementlib.js";
import utilitylib from "./lib/utilitylib.js";

// TODO Data
import todoData from "./todoData.js";

// TODO View
import todoView from "./todoView.js";

const todos = {
    events: {},

    // TODO 초기화
    init: function () {
        this.initEvents();
        todoData.init();
        todoView.init(this.events);
    },

    initEvents: function () {
        this.events = {
            handleInputAddKeyup: this.handleInputAddKeyup.bind(this)
        }
    },

    // TODO HANDLER
    handleInputAddKeyup: function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            if (utilitylib.emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = addTodo(target.value);

            addTodoView(viewData);
            target.value = "";
        }
    },

    handleButtonAddClick: function (e) {
        const { target } = e;
        const input = target.previousElementSibling;
        if (utilitylib.emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = addTodo(input.value);

        addTodoView(viewData);
        input.value = "";
    },

    handleCompleteClick: function (e) {
        const { target } = e;
        const id = utilitylib.getId(e.target);
        const checked = target.checked;

        completeTodoView(id, checked);
        completeTodo(id, checked);
    },

    handleContentDbclick: function (e) {
        const id = utilitylib.getId(e.target);
        modifyTodoView(id);
    },

    handleUpdateContentKeyup: function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            const id = utilitylib.getId(e.target);
            const value = target.value;

            if (utilitylib.emptyValueCheck(value, "내용을 입력해주세요.")) return;

            updateTodoView(target, value);
            updateTodo(id, value);
        }
    },

    handleRemoveClick: function (e) {
        const id = utilitylib.getId(e.target);

        removeTodoView(id);
        removeTodo(id);
    }
}

todos.init();

export default todos;