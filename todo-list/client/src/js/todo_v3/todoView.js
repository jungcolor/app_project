// TODO lib
import elementlib from "./lib/elementlib.js";
import utilitylib from "./lib/utilitylib.js";

// TODO view 객체
const todoView = {
    _viewWrapper: null,
    _viewHeader: null,
    _viewContents: null,
    _viewElementList: null,
    handler: null,

    // TODO 초기화
    init: function (handler) {
        this.handler = handler;
        this.initViewCreate();
    },

    initViewCreate: function () {
        this._viewWrapper = this.initViewWrapperCreate();
        this._viewHeader = this.initViewHeaderCreate();
        this._viewContents = this.initViewContentsCreate();
    },

    initViewWrapperCreate: function () {
        const viewWrapperData = {
            tagName: "div",
            attrs: { className: "wrapper-todo" }
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
                            events: [{ type: "keyup", handler: this.handler.handleInputAddKeyup }]
                        },
                        {
                            tagName: "button",
                            attrs: { className: "add-button", type: "button", textContent: "+" },
                            events: [{ type: "click", handler: this.handler.handleButtonAddClick }]
                        }
                    ]
                },
                {
                    tagName: "ul",
                    attrs: { className: "todo-list" }
                },
                {
                    tagName: "div",
                    attrs: { className: "todo-update-guide",  }
                }
            ]
        };

        return elementlib.elementCreate(viewContentsData);
    },

    // TODO render
    render: function () {
        this.renderView();
        this.renderViewSetting();
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
        this._viewElementList = elementlib.getElement(".todo-list");
    },

    renderViewDateElementSetting: function () {
        const currentDate = utilitylib.getDate();
        const year = elementlib.getElement(".todo-year");
        const month = elementlib.getElement(".todo-month");
        const date = elementlib.getElement(".todo-date");

        elementlib.setElementAttribute(year, { textContent: currentDate.year + "년" });
        elementlib.setElementAttribute(month, { textContent: currentDate.month + "월" });
        elementlib.setElementAttribute(date, { textContent: currentDate.date + "일" });
    },

    // TODO DOM조작
    viewCreateItem: function (viewData) {
        const { id, content, complete} = viewData;
        const viewElementData = {
            tagName: "li",
            attrs: { id, className: (complete) ? "disabled" : "" },
            children: [
                {
                    tagName: "input",
                    events: [{ type: "click", handler: this.handler.handleCompleteClick.bind(this, viewData) }],
                    attrs: { className: "todo-checkbox", type: "checkbox", checked: complete }
                },
                {
                    tagName: "div",
                    events: [{ type: "dblclick", handler: this.handler.handleContentDbclick.bind(this, viewData) }],
                    attrs: { className: "todo-content", textContent: content },
                    children: [
                        {
                            tagName: "input",
                            events: [
                                // { type: "keyup", handler: this.handler.handleUpdateContentKeyup.bind(this, viewData) },
                                { type: "focusout", handler: this.handler.handleUpdateContentFocusout.bind(this, viewData) }
                            ],
                            attrs: { type: "text", className: "hide" }
                        }
                    ]
                },
                {
                    tagName: "span",
                    events: [{ type: "click", handler: this.handler.handleRemoveClick.bind(this, viewData) }],
                    attrs: { className: "todo-remove", textContent: "X" }
                }
            ]
        }

        return elementlib.elementCreate(viewElementData);
    },

    viewLoadItem: function (items) {
        items.forEach(item => {
            this.viewAddItem(item);
        });
    },

    viewAddItem: function (viewItem) {
        const viewElement = this.viewCreateItem(viewItem);
        const viewCompleteElement = elementlib.getElement('.disabled');

        if (viewCompleteElement) {
            this._viewElementList.insertBefore(viewElement, viewCompleteElement);
        }
        else {
            this._viewElementList.appendChild(viewElement);
        }
    },

    viewComplete: function (id, isComplete) {
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

    viewModify: function (id) {
        const viewElementParent = elementlib.getElement("#" + id);
        const viewModeElement = Array.prototype.slice.apply(viewElementParent.childNodes).filter(node => node.classList.value === "todo-content")[0];

        if (viewModeElement.tagName !== "INPUT" && elementlib.hasClass(viewElementParent, "disabled") === false) {
            const modifyModeElement = viewModeElement.querySelector("input"); // TODO 변경
            if (elementlib.hasClass(modifyModeElement, "show")) return;

            const viewElementValue = elementlib.getText(viewModeElement);
            elementlib.setText(viewModeElement, "");

            elementlib.setValue(modifyModeElement, viewElementValue);
            elementlib.addClass(modifyModeElement, "show");
            elementlib.removeClass(modifyModeElement, "hide");

            viewModeElement.appendChild(modifyModeElement);
            modifyModeElement.focus();
        }
    },

    viewUpdateItem: function (target, value) {
        const viewElementParent = target.parentElement; // elementlib로 빼야하나?
        const updateTextNode = elementlib.createText(value);

        elementlib.addClass(target, "hide");
        elementlib.removeClass(target, "show");
        viewElementParent.appendChild(updateTextNode);
    },

    viewRemoveItem: function (id) {
        const viewRemoveElement = elementlib.getElement("#" + id);
        this._viewElementList.removeChild(viewRemoveElement);
    },
}

export default todoView;