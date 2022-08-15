import elementlib from "./lib/elementlib";

// TODO view 객체
const todoView = {
    viewWrapper,
    viewHeader,
    viewContents,
    viewItemElements,

    // TODO 초기 셋팅
    init: function () {
        this.initViewCreate();
    },

    initViewCreate: function () {
        this.viewWrapper = this.initViewWrapperCreate();
        this.viewHeader = this.initViewHeaderCreate();
        this.viewContents = this.initViewContentsCreate();
    },

    initViewWrapperCreate: function () {
        const wrapperViewData = {
            tagName: "div",
            arrts: { className: "wrapper-todo" }
        };

        return elementlib.elementCreate(wrapperViewData);
    },

    initViewHeaderCreate: function () {
        const headerViewData = {
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

        return elementlib.elementCreate(headerViewData);
    },

    initViewContentsCreate: function () {
        const contentViewData = {
            tagName: "div",
            attrs: { className: "todo-contents" },
            children: [
                {
                    tagName: "div",
                    attrs: { className: "todo-add-contents" },
                    children: [
                        {
                            tagName: "input",
                            attrs: { className: "add-input", type: "text" }
                        },
                        {
                            tagName: "button",
                            attrs: { className: "add-button", type: "button", textContent: "+" }
                        }
                    ]
                },
                {
                    tagName: "ul",
                    attrs: { className: "todo-list" }
                }
            ]
        };

        return elementlib.elementCreate(contentViewData);
    },

    // TODO render부터
    render: function () {
        this.renderView();
        this.renderViewSetting();
    },

    renderView: function () {
        this.viewWrapper.appendChild(this.viewHeader);
        this.viewWrapper.appendChild(this.viewContents);

        document.body.appendChild(this.viewWrapper);
    },

    renderViewSetting: function () {
        
    },
}

export default todoView;