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
        console.log("[Call Stack] >>>>> start");
        this.initHandler();
        todoData.init();
        todoView.init(this.handler);

        this.render();
        console.log("[Call Stack] >>>>> end");
    },

    render: function () {
        todoView.render();

        setTimeout(() => {
            this.loadComplate();
        }, 100);
    },
        
    loadComplate: function () {
        console.log("[Macro Task Queue] >>>>> Start");
        todoView.viewLoadItem(todoData.getItemList());
        console.log("[Macro Task Queue] >>>>> End");
    },

    initHandler: function () {
        this.handler = {
            handleInputAddKeyup: this.handleInputAddKeyup,
            handleButtonAddClick: this.handleButtonAddClick,
            handleCompleteClick: this.handleCompleteClick,
            handleContentDbclick: this.handleContentDbclick,
            // handleUpdateContentKeyup: this.handleUpdateContentKeyup,
            handleUpdateContentFocusout: this.handleUpdateContentFocusout,
            handleRemoveClick: this.handleRemoveClick,
            // drag event
            handleDragStartMousedown: this.handleDragStartMousedown,
            handleDraggingMousemove: this.handleDraggingMousemove,
            handleDragEndMouseup: this.handleDragEndMouseup
        };
    },

    // TODO HANDLER
    handleInputAddKeyup: async function (e) {
        if (e.key === "Enter") {
            const { target } = e;
            if (utilitylib.emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = await todoData.addItem(target.value);

            if (viewData === null) return;

            todoView.viewAddItem(viewData);
            target.value = "";
        }
    },

    handleButtonAddClick: async function (e) {
        const { target } = e;
        const input = target.previousElementSibling;
        if (utilitylib.emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = await todoData.addItem(input.value);

        if (viewData === null) return;

        todoView.viewAddItem(viewData);
        input.value = "";
    },

    handleCompleteClick: async function (item, e) {
        const { id } = item;

        const isComplete = await new Promise(resolve => resolve(todoData.complete(id)));
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

    handleUpdateContentFocusout: async function (item, e) {
        const { target } = e;
        const { id } = item;

        if (utilitylib.emptyValueCheck(target.value, "내용을 입력해주세요.")) return;

        const updateContent = await new Promise(resolve => resolve(todoData.updateItem(id, target.value)));
        todoView.viewUpdateItem(target, updateContent);
    },

    handleRemoveClick: function (item, e) {
        const { id } = item;

        todoData.removeItem(id);
        todoView.viewRemoveItem(id);
    },

    // TODO DRAG HANDLER
    handleDragStartMousedown: function (e) {
        console.log(`Drag 이벤트 시작!!!`);
    },

    handleDraggingMousemove: function (e) {
        // console.log(`Drag 이벤트 중!!!`);
    },

    handleDragEndMouseup: function (e) {
        console.log(`Drag 이벤트 끝!!!`);
        console.log(e.target);
    },    
}

todos.init();