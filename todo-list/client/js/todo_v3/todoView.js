// TODO lib
import elementlib from "./lib/elementlib.js";
import utilitylib from "./lib/utilitylib.js";

// TODOS - 순환참조 오류........
// import todos from "./todo.js";

// TODO view 객체
const todoView = {
    _viewWrapper: null,
    _viewHeader: null,
    _viewContents: null,
    _viewElementList: null,
    events: null,

    // TODO 초기화
    init: function (events) {
        this.events = events;
        this.initViewCreate();
        this.render();
    },

    initViewCreate: function () {
        this._viewWrapper = this.initViewWrapperCreate();
        this._viewHeader = this.initViewHeaderCreate();
        this._viewContents = this.initViewContentsCreate();
    },

    initViewWrapperCreate: function () {
        const viewWrapperData = {
            tagName: "div",
            arrts: { className: "wrapper-todo" }
        };

        return elementlib.elementCreate(viewWrapperData);
    },

    initViewHeaderCreate: function () {
        const viewHeaderData = {
            tagName: "div",
            attrs: { className: "todo-header" },
            children: [
                {
                    tagName: "div",
                    attrs: { className: "todo-title" },
                    children: [{ tagName: "h2", attrs: { textContent: "TODO TITLE" } }]
                },
                {
                    tagName: "div",
                    attrs: { className: "todo-date-contents" },
                    children: [
                        { tagName: "span", attrs: { className: "todo-year", textContent: "====" } },
                        { tagName: "span", attrs: { className: "todo-month", textContent: "==" } },
                        { tagName: "span", attrs: { className: "todo-date", textContent: "==" } },
                        { tagName: "span", attrs: { className: "todo-day" } }
                    ]
                }
            ]
        };

        return elementlib.elementCreate(viewHeaderData);
    },

    initViewContentsCreate: function () {
        const viewContentsData = {
            tagName: "div",
            attrs: { className: "todo-contents" },
            children: [
                {
                    tagName: "div",
                    attrs: { className: "todo-add-contents" },
                    children: [
                        {
                            tagName: "input",
                            attrs: { className: "add-input", type: "text" },
                            events: [{ type: "keyup", handler: this.events.handleInputAddKeyup }]
                        },
                        {
                            tagName: "button",
                            attrs: { className: "add-button", type: "button", textContent: "+" },
                            // events: [{ type: "click", handler: todos.handleButtonAddClick }]
                        }
                    ]
                },
                {
                    tagName: "ul",
                    attrs: { className: "todo-list" }
                }
            ]
        };

        return elementlib.elementCreate(viewContentsData);
    },

    // TODO render
    render: function (elementList) {
        this.renderView();
        this.renderViewSetting();
        this.renderViewElementList(elementList);
    },

    renderView: function () {
        this._viewWrapper.appendChild(this._viewHeader);
        this._viewWrapper.appendChild(this._viewContents);

        document.body.appendChild(this._viewWrapper);
    },

    renderViewSetting: function () {
        this.renderViewElementListSetting();
        this.renderViewDateElementSetting();
    },

    renderViewElementListSetting: function () {
        this._viewElementList = elementlib.getElement(".todos");
    },

    renderViewDateElementSetting: function () {
        const currentDate = utilitylib.getDate();
        const year = elementlib.getElement(".todo-year");
        const month = elementlib.getElement(".todo-month");
        const date = elementlib.getElement(".todo-date");

        elementlib.setElementAttribute(year, currentDate.year);
        elementlib.setElementAttribute(month, currentDate.month);
        elementlib.setElementAttribute(date, currentDate.date);
    },

    renderViewElementList: function (elementList) {
        elementList?.forEach(element => {
            const viewElement = this.viewElementCreate(element);
            this._viewElementList.appendChild(viewElement);
        });
    },

    // TODO DOM조작
    viewElementCreate: function ({ id, todo, complete }) {
        const viewElementData = {
            tagName: "li",
            attrs: { id, className: (complete) ? "disabled" : "" },
            children: [
                {
                    tagName: "input",
                    // events: [{ type: "click", handler: todos.handleCompleteClick }],
                    attrs: { className: "todo-checkbox", type: "checkbox", checked: complete }
                },
                {
                    tagName: "div",
                    // events: [{ type: "dblclick", handler: todos.handleContentDbclick }],
                    attrs: { className: "todo-content", textContent: todo },
                    children: [
                        {
                            tagName: "input",
                            // events: [{ type: "keyup", handler: todos.handleUpdateContentKeyup }],
                            attrs: { type: "text", className: "hide" }
                        }
                    ]
                },
                {
                    tagName: "span",
                    // events: [{ type: "click", handler: todos.handleRemoveClick }],
                    attrs: { className: "todo-remove", textContent: "X" }
                }
            ]
        }

        return elementlib.elementCreate(viewElementData);
    },


    viewElementAdd: function (viewElementData) {
        const viewElement = this.viewElementCreate(viewElementData);
        const viewCompleteElement = elementlib.getElement('.complete');

        if (viewCompleteElement) {
            this._viewElementList.insertBefore(viewElement, viewCompleteElement);
        }
        else {
            this._viewElementList.appendChild(viewElement);
        }
    },

    viewElementComplete: function (id, isComplete) {
        const viewCompleteElement = elementlib.getElement("#" + id);

        if (isComplete) {
            elementlib.addClass(viewCompleteElement, "disabled");
            this._viewElementList.appendChild(viewCompleteElement);
        }
        else {
            elementlib.removeClass(viewCompleteElement, "disabled");
            this._viewElementList.prepend(viewCompleteElement);
        }
    },

    viewElementModify: function (id) {
        const viewElementParent = elementlib.getElement("#" + id);
        const viewModeElement = Array.prototype.slice.apply(viewElementParent.childNodes).filter(node => node.classList.value === "todo-content")[0];

        if (viewModeElement.tagName !== "INPUT" && elementlib.hasClass(viewElementParent, "disabled")) {
            const viewElementValue = elementlib.getText(viewModeElement);
            const modifyModeElement = viewModeElement.querySelector("input"); // TODO 변경
            elementlib.setText(viewModeElement, "");

            elementlib.setValue(modifyModeElement, viewElementValue);
            elementlib.addClass(modifyModeElement, "show");
            elementlib.removeClass(modifyModeElement, "hide");

            viewModeElement.appendChild(modifyModeElement);
            modifyModeElement.focus();
        }
    },

    viewElementUpdate: function (target, value) {
        const viewElementParent = target.parentElement; // elementlib로 빼야하나?
        const updateTextNode = elementlib.createText(value);

        elementlib.addClass(target, "hide");
        elementlib.removeClass(target, "show");
        viewElementParent.appendChild(updateTextNode);
    },

    viewElementRemove: function (id) {
        const viewRemoveElement = elementlib.getElement("#", id);
        this._viewElementList.removeChild(viewRemoveElement);
    },
}

export default todoView;