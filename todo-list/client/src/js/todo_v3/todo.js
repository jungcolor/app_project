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
            handleInputAddKeyup: this.handleInputAddKeyup,
            handleButtonAddClick: this.handleButtonAddClick,
            handleCompleteClick: this.handleCompleteClick,
            handleContentDbclick: this.handleContentDbclick,
            // handleUpdateContentKeyup: this.handleUpdateContentKeyup,
            handleUpdateContentFocusout: this.handleUpdateContentFocusout,
            handleRemoveClick: this.handleRemoveClick
        };
    },

    // TODO HANDLER
    handleInputAddKeyup: function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            if (utilitylib.emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = todoData.addItem(target.value);

            todoView.viewAdd(viewData);
            target.value = "";
        }
    },

    handleButtonAddClick: async function (e) {
        const { target } = e;
        const input = target.previousElementSibling;
        if (utilitylib.emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = await todoData.add(input.value);

        if (viewData === null) return;

        todoView.viewAdd(viewData);
        input.value = "";
    },

    handleCompleteClick: function (item, e) {
        const { id } = item;

        const isComplete = todoData.complete(id);
        todoView.viewComplete(id, isComplete);
    },

    handleContentDbclick: function (item, e) {
        const { id } = item;
        todoView.viewModify(id);
    },

    // handleUpdateContentKeyup: function (item, e) {
    //     if (e.key === "Enter") {
    //         const { target } = e;
    //         const { id } = item;
    //         const value = target.value;

    //         if (utilitylib.emptyValueCheck(value, "내용을 입력해주세요.")) return;

    //         todoData.updateItem(id, value);
    //         todoView.viewUpdate(target, value);
    //     }
    // },

    handleUpdateContentFocusout: function (item, e) {
        const { target } = e;
        const { id } = item;
        const value = target.value;

        if (utilitylib.emptyValueCheck(value, "내용을 입력해주세요.")) return;

        todoData.updateItem(id, value);
        todoView.viewUpdate(target, value);
    },

    handleRemoveClick: function (item, e) {
        const { id } = item;

        todoData.removeItem(id);
        todoView.viewRemove(id);
    }
}

todos.init();