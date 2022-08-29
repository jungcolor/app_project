// TODO lib
import utilitylib from "./lib/utilitylib.js";

// TODO Data
import todoData from "./todoData.js";

// TODO View
import todoView from "./todoView.js";

const todos = {
    handler: {},

    // TODO 초기화
    init: function () {
        this.initHandler();
        todoData.init();
        todoView.init(this.handler);
    },

    initHandler: function () {
        this.handler = {
            handleInputAddKeyup: this.handleInputAddKeyup.bind(this),
            handleButtonAddClick: this.handleButtonAddClick.bind(this),
            handleCompleteClick: this.handleCompleteClick.bind(this),
            handleContentDbclick: this.handleContentDbclick.bind(this),
            handleUpdateContentKeyup: this.handleUpdateContentKeyup.bind(this),
            handleUpdateContentFocusout: this.handleUpdateContentFocusout.bind(this),
            handleRemoveClick: this.handleRemoveClick.bind(this)
        }
    },

    // TODO HANDLER
    handleInputAddKeyup: function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            if (utilitylib.emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = todoData.add(target.value);

            todoView.viewAdd(viewData);
            target.value = "";
        }
    },

    handleButtonAddClick: function (e) {
        const { target } = e;
        const input = target.previousElementSibling;
        if (utilitylib.emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = todoData.add(input.value);

        todoView.viewAdd(viewData);
        input.value = "";
    },

    handleCompleteClick: function (e) {
        const { target } = e;
        const id = utilitylib.getId(e.target);
        const checked = target.checked;

        todoData.complete(id, checked);
        todoView.viewComplete(id, checked);
    },

    handleContentDbclick: function (e) {
        const id = utilitylib.getId(e.target);
        todoView.viewModify(id);
    },

    handleUpdateContentKeyup: function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            const id = utilitylib.getId(e.target);
            const value = target.value;

            if (utilitylib.emptyValueCheck(value, "내용을 입력해주세요.")) return;

            todoData.update(id, value);
            todoView.viewUpdate(target, value);
        }
    },

    handleUpdateContentFocusout: function (e) {
        const { target } = e;
        const id = utilitylib.getId(e.target);
        const value = target.value;

        if (utilitylib.emptyValueCheck(value, "내용을 입력해주세요.")) return;

        todoData.update(id, value);
        todoView.viewUpdate(target, value);
    },

    handleRemoveClick: function (e) {
        const id = utilitylib.getId(e.target);

        todoData.remove(id);
        todoView.viewRemove(id);
    }
}

todos.init();