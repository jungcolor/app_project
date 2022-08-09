// TODO Element 생성 객체
const element = {
    elementCreate: function (makeData) {
        const { tagName, attrs, events, children } = makeData;
        // element 생성
        const el = document.createElement(tagName);

        // element 속성 설정
        this.setElementAttribute(el, attrs);

        // element 이벤트 바인딩
        this.setElementEventBind(el, events);

        // 자식 엘리먼트 설정
        if (children) {
            children.forEach((child) => {
                const childEl = this.elementCreate(child);
                el.appendChild(childEl);
            });
        }

        return el;
    },

    setElementAttribute: function (target, attrs) {
        target = target || null;

        keys = Object.keys(attrs);

        keys?.forEach(key => {
            const value = attrs[key];

            if (!value) return;

            switch (key) {
                case "className":
                    target.classList.add(value);
                    break;
                case "id":
                case "type":
                    target.setAttribute(key, value);
                    break;
                default:
                    target[key] = value;
                    break;
            }
        });

        return target;
    },

    setElementEventBind: function (target, events) {
        events?.forEach((event) => {
            const { type, callback } = event;

            target.addEventListener(type, callback);
        });
    }
}

// TODO Utility 객체 - 프로젝트 종속되어 있는 부분 제거할 수 있는 방법 고민
const utility = {
    getId: function (target, type) { 
        const element = target.closest("li");
        const id = element.getAttribute("id");

        if (id) {
            return id;
        }

        return null;
    },

    getElement: function (id) { 
        const element = document.querySelector("#" + id);

        if (element) {
            return element;
        }

        return null;
    },

    emptyValueCheck: function (value, message) { 
        let result = false;

        if (!value) {
            console.log(message);
            result = true;
        }

        return result;
    },

    uuid: function () { 
        return 'todo-yxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

const todos = () => {
    // TODO 전역 변수
    let topWrapper = document.body;
    let todoListElements = null;
    let todoItems = [];

    // TODO Element 생성 Data - 동적으로 값을 변경하기 위해서는 레이아웃별로 나눠야 할듯..
    const initTodoElementData = {
        tagName: "div",
        attrs: { className: "wrapper-todo" },
        children: [
            {
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
            },
            {
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
            }
        ]
    };

    // TODO 초기화
    const init = () => {
        initElement();
        fetchTodos(); // TODO API로 변경해야함
        render();
    }

    // TODO 초기 ELEMENT 생성 및 설정
    const initElement = () => {
        initElementCreate(); // 생성
        initElementSetting(); // 설정
    }

    // TODO 초기 ELEMENT 생성
    const initElementCreate = () => {
        const initTodoElement = element.elementCreate(initTodoElementData);

        topWrapper.appendChild(initTodoElement);
    }

    // TODO 초기 ELEMENT 설정
    const initElementSetting = () => {
        todoListElements = document.querySelector(".todo-list");
        initAddElementSetting();
        initDateElementSetting();
    }

    const initAddElementSetting = () => {
        const addInput = document.querySelector(".add-input");
        const addButton = document.querySelector(".add-button");

        addInput.addEventListener("keyup", handleInputAddKeyup);
        addButton.addEventListener("click", handleButtonAddClick);
    }

    const initDateElementSetting = () => {
        // TODO - 접속 국가별로 나올 수 있도록 수정 ( day.js 날짜 포맷팅 방법 참고 )
        const todoYear = document.querySelector(".todo-year");
        const todoMonth = document.querySelector(".todo-month");
        const todoDate = document.querySelector(".todo-date");
        const getTodayDate = () => {
            const dateInstance = new Date();
            let yaer = dateInstance.getFullYear().toString();
            let month = dateInstance.getMonth() + 1;
            let date = dateInstance.getDate();

            return {
                yaer: yaer,
                month: (month >= 10) ? month : "0" + month,
                date: (date >= 10) ? date : "0" + date,
                // day: day(dateInstance)
            };
        };

        const currentDate = getTodayDate();
        // DOM 조작하는 로직 제거
        todoYear.innerText = currentDate.yaer + "년";
        todoMonth.innerText = currentDate.month + "월";
        todoDate.innerText = currentDate.date + "일";
        // todoDay.innerText = currentDate.day
    }

    // TODO DATA 초기화
    const fetchTodoItems = () => {
        const items = [];

        return items;
    }

    const fetchTodos = () => {
        todoItems = fetchTodoItems();
    }

    // TODO RENADER
    const render = () => {
        todoItems?.forEach(todo => {
            const element = createTodoElement(todo);
            todoListElements.appendChild(element);
        });
    }

    // TODO ITEM ELEMENT 생성
    const createTodoElement = ({ id, todo, complete }) => {
        const createTodoElementData = {
            tagName: "li",
            attrs: { id: id, className: (complete) ? "disabled" : "" },
            children: [
                {
                    tagName: "input",
                    events: [{ type: "click", callback: handleCompleteClick }],
                    attrs: { className: "todo-checkbox", type: "checkbox", checked: complete }
                },
                {
                    tagName: "div",
                    events: [
                        { type: "dblclick", callback: handleContentDbclick },
                    ],
                    attrs: { className: "todo-content", textContent: todo },
                    children: [
                        {
                            tagName: "input",
                            events: [{ type: "keyup", callback: handleUpdateContentKeyup }],
                            attrs: { type: "text", className: "hide" }
                        }
                    ]
                },
                {
                    tagName: "span",
                    events: [
                        { type: "click", callback: handleRemoveClick }
                    ],
                    attrs: { className: "todo-remove", textContent: "X" }
                }
            ]
        }
        // const todoListElement = createTodoListElement(id);
        // const completeElement = createTodoCompleteElement();
        // const todoContentElement = createTodoContentElement(todo);
        // const removeElement = createTodoRemoveElement();

        // if (complete) {
        //     todoListElement.classList.add("disabled");
        //     completeElement.setAttribute("checked", "checked");
        // }

        // todoListElement.appendChild(completeElement);
        // todoListElement.appendChild(todoContentElement);
        // todoListElement.appendChild(removeElement);

        const todoListElement = element.elementCreate(createTodoElementData); // 생성하고

        return todoListElement;
    }

    // const createTodoListElement = (id) => {
    //     const listElement = document.createElement("li");
    //     listElement.setAttribute("id", id);

    //     return listElement;
    // }

    // const createTodoCompleteElement = () => {
    //     const completeElement = document.createElement("input");
    //     completeElement.setAttribute("type", "checkbox");
    //     completeElement.addEventListener("click", handleCompleteClick);

    //     return completeElement;
    // }

    // const createTodoContentElement = (content) => {
    //     const contentElement = document.createElement("div");
    //     contentElement.classList.add("todo-content");
    //     contentElement.innerText = content;
    //     contentElement.addEventListener("dblclick", handleContentDbclick);

    //     const updateInputElement = document.createElement("input");
    //     updateInputElement.setAttribute("type", "text");
    //     updateInputElement.classList.add("hide");
    //     updateInputElement.innerText = "";
    //     updateInputElement.addEventListener("keyup", handleUpdateContentKeyup);

    //     contentElement.appendChild(updateInputElement);

    //     return contentElement;
    // }

    // const createTodoRemoveElement = () => {
    //     const removeELement = document.createElement("span");
    //     removeELement.classList.add("todo-remove");
    //     removeELement.innerText = "X";
    //     removeELement.addEventListener("click", handleRemoveClick);

    //     return removeELement;
    // }

    // TODO DATA
    const addTodo = (value) => {
        const todo = { id: utility.uuid(), todo: value, complete: false };
        const completeItemIdx = todoItems.findIndex(item => item.complete);

        if (completeItemIdx > -1) {
            // 목록 중 완료된 목록이 존재하면 해당 목록 앞에 새로 추가한다
            todoItems.splice(completeItemIdx, 0, todo);
        }
        else {
            todoItems.push(todo);
        }

        return todo;
    }

    const removeTodo = (id) => {
        const removeTodoIndex = todoItems.findIndex(item => item.id === id);
        todoItems.splice(removeTodoIndex, 1);
    }

    const updateTodo = (id, value) => {
        // 해당 데이터를 찾아서 value를 업데이트 해준다
        for (let i = 0, len = todoItems.length; i < len; i++) {
            const item = todoItems[i];
            
            if (item.id === id) {
                item.todo = value;
                break;
            }
        }
    }

    const completeTodo = (id, isComplete) => {
        const updateTodoIndex = todoItems.findIndex(item => item.id === id);
        const updateTodo = todoItems.splice(updateTodoIndex, 1);
        const todoItemLenth = todoItems.length;

        updateTodo[0].complete = isComplete;

        if (isComplete) {
            todoItems.splice(todoItemLenth, 0, updateTodo[0]);
        }
        else {
            todoItems.splice(0, 0, updateTodo[0]);
        }
    }

    // TODO DOM조작
    const addTodoView = (viewData) => {
        const todoElement = createTodoElement(viewData);
        const completeElement = todoListElements.querySelector(".disabled");

        if (completeElement) {
            todoListElements.insertBefore(todoElement, completeElement);
        }
        else {
            todoListElements.appendChild(todoElement);
        }
    }

    const completeTodoView = (id, isComplete) => {
        const completeTarget = utility.getElement(id);

        if (isComplete) {
            completeTarget.classList.add("disabled");
            todoListElements.appendChild(completeTarget);
        }
        else {
            completeTarget.classList.remove("disabled");
            todoListElements.prepend(completeTarget);
        }
    }

    const modifyTodoView = (id) => {
        const parentTarget = utility.getElement(id);
        const modifyTarget = Array.prototype.slice.apply(parentTarget.childNodes).filter(node => node.classList.value === "todo-content")[0];

        if (modifyTarget.tagName !== "INPUT" && parentTarget.classList.value !== "disabled") {
            const value = modifyTarget.textContent;
            const input = modifyTarget.querySelector("input");
            modifyTarget.textContent = "";

            input.value = value;
            input.classList.add("show");
            input.classList.remove("hide");
            modifyTarget.appendChild(input);
            input.focus();
        }
    }

    const updateTodoView = (target, value) => {
        const parentElement = target.parentElement;
        const textNode = document.createTextNode(value);

        target.classList.add("hide");
        target.classList.remove("show");
        parentElement.appendChild(textNode);
    }

    const removeTodoView = (id) => {
        const removeTarget = utility.getElement(id);
        todoListElements.removeChild(removeTarget);
    }    

    // TODO HANDLER
    const handleInputAddKeyup = (e) => {
        if (e.key === "Enter") {
            const { target } = e;
            if (utility.emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = addTodo(target.value);

            addTodoView(viewData);
            target.value = "";
        }
    }

    const handleButtonAddClick = (e) => {
        const { target } = e;
        const input = target.previousElementSibling;
        if (utility.emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = addTodo(input.value);

        addTodoView(viewData);
        input.value = "";
    }

    const handleCompleteClick = (e) => {
        const { target } = e;
        const id = utility.getId(e.target);
        const checked = target.checked;

        completeTodoView(id, checked);
        completeTodo(id, checked);
    }

    const handleContentDbclick = (e) => {
        const id = utility.getId(e.target);
        modifyTodoView(id);
    }

    const handleUpdateContentKeyup = (e) => {
        if (e.key === "Enter") {
            const { target } = e;
            const id = utility.getId(e.target);
            const value = target.value;

            if (utility.emptyValueCheck(value, "내용을 입력해주세요.")) return;

            updateTodoView(target, value);
            updateTodo(id, value);
        }
    }

    const handleRemoveClick = (e) => {
        const id = utility.getId(e.target);

        removeTodoView(id);
        removeTodo(id);
    }   

    // 실행
    init();
}

todos();

// DOMContentLoaded >> DOM element가 로드 됐을 때 
// load > DOM element뿐만 아니라 css, js, img등 리소스도 전부 로드 됐을 때
// window.addEventListener("DOMContentLoaded", todos);