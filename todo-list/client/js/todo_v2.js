// TODO Element 관련 로직 아래 객체에 정리
const element = {
    // TODO...
}

const todos = () => {
    // TODO 전역 변수
    let topWrapper = document.body;
    let todoListElements = null;
    let todoItems = [];

    // TODO 초기화
    const init = () => {
        initElement();
        fetchTodos(); // TODO API로 변경해야함
        render();
    }

    // TODO 초기 ELEMENT 생성 및 설정
    const initElement = () => {
        initElementCreate();
        initElementSettings();
        initDateSettings();
    }

    // TODO 초기 ELEMENT 생성
    const initElementCreate = () => {
        const wrapperTodo = initWrapperTodoCreate();
        const todoHeader = initTodoHeaderCreate();
        const todoContents = initTodoContentsCreate();

        wrapperTodo.appendChild(todoHeader);
        wrapperTodo.appendChild(todoContents);

        topWrapper.appendChild(wrapperTodo);
    }

    const initWrapperTodoCreate = () => {
        const wrapperTodo = document.createElement("div");
        wrapperTodo.classList.add("wrapper-todo");

        return wrapperTodo;
    }

    const initTodoHeaderCreate = () => {
        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-header");

        const todoTitle = initTodoHeaderTitleCreate();
        const todoDate = initTodoHeaderDateCreate();

        todoHeader.appendChild(todoTitle);
        todoHeader.appendChild(todoDate);

        return todoHeader;
    }

    const initTodoHeaderTitleCreate = () => {
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todo-title");
        const title = document.createElement("h2");
        title.innerText = "TODO TITLE";

        todoTitle.appendChild(title);
        return todoTitle;
    }

    const initTodoHeaderDateCreate = () => {
        const todoDateContents = document.createElement("div");
        todoDateContents.classList.add("todo-date-contents");
        const todoYear = document.createElement("span");
        todoYear.classList.add("todo-year");
        const todoMonth = document.createElement("span");
        todoMonth.classList.add("todo-month");
        const todoDate = document.createElement("span");
        todoDate.classList.add("todo-date");
        const todoDay = document.createElement("span");
        todoDay.classList.add("todo-day");

        todoDateContents.appendChild(todoYear);
        todoDateContents.appendChild(todoMonth);
        todoDateContents.appendChild(todoDate);
        todoDateContents.appendChild(todoDay);

        return todoDateContents;
    }

    const initTodoContentsCreate = () => {
        const todoContents = document.createElement("div");
        todoContents.classList.add("todo-contents");
        
        const todoAddContents = initTodoAddContentsCreate();
        const todoList = initTodoListCreate();
        
        todoContents.appendChild(todoAddContents);
        todoContents.appendChild(todoList);

        return todoContents;
    }

    const initTodoAddContentsCreate = () => {
        const todoAddContents = document.createElement("div");
        todoAddContents.classList.add("todo-add-contents");
        const addInput = document.createElement("input");
        addInput.classList.add("add-input");
        addInput.setAttribute("type", "text");
        const addButton = document.createElement("button");
        addButton.classList.add("add-button");
        addButton.setAttribute("type", "button");
        addButton.innerText = "+";

        todoAddContents.appendChild(addInput);
        todoAddContents.appendChild(addButton);

        return todoAddContents;
    }

    const initTodoListCreate = () => {
        const todoList = document.createElement("ul");
        todoList.classList.add("todo-list");

        return todoList;
    }
    
    // TODO 초기 ELEMENT 설정
    const initElementSettings = () => {
        todoListElements = document.querySelector(".todo-list");
        const addInput = document.querySelector(".add-input");
        const addButton = document.querySelector(".add-button");
    
        addInput.addEventListener("keyup", handleInputAddKeyup);
        addButton.addEventListener("click", handleButtonAddClick);
    }

    const initDateSettings = () => {
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
    const createTodoElement = (todo) => {
        const id = todo.id;
        const content = todo.todo;
        const todoListElement = createTodoListElement(id);
        const completeElement = createTodoCompleteElement();
        const todoContentElement = createTodoContentElement(content);
        const removeElement = createTodoRemoveElement();

        if (todo.complete) {
            todoListElement.classList.add("disabled");
            complete.setAttribute("checked", "checked");
        }

        todoListElement.appendChild(completeElement);
        todoListElement.appendChild(todoContentElement);
        todoListElement.appendChild(removeElement);

        return todoListElement;
    }

    const createTodoListElement = (id) => {
        const listElement = document.createElement("li");
        listElement.setAttribute("id", id);

        return listElement;
    }

    const createTodoCompleteElement = () => {
        const completeElement = document.createElement("input");
        completeElement.setAttribute("type", "checkbox");
        completeElement.addEventListener("click", handleCompleteClick);

        return completeElement;
    }

    const createTodoContentElement = (content) => {
        const contentElement = document.createElement("div");
        contentElement.classList.add("todo-content");
        contentElement.innerText = content;
        contentElement.addEventListener("dblclick", handleContentDbclick);

        const updateInputElement = document.createElement("input");
        updateInputElement.setAttribute("type", "text");
        updateInputElement.style.display = "none";
        updateInputElement.innerText = "";
        updateInputElement.addEventListener("keyup", handleUpdateContentKeyup);

        contentElement.appendChild(updateInputElement);

        return contentElement;
    }

    const createTodoRemoveElement = () => {
        const removeELement = document.createElement("span");
        removeELement.classList.add("todo-remove");
        removeELement.innerText = "X";
        removeELement.addEventListener("click", handleRemoveClick);

        return removeELement;
    }

    // TODO DATA
    const addTodo = (value) => {
        const todo = { id: uniqueID(), todo: value, complete: false };
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
        const completeTarget = getElement(id);

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
        const parentTarget = getElement(id);
        const modifyTarget = Array.prototype.slice.apply(parentTarget.childNodes).filter(node => node.classList.value === "todo-content")[0];

        if (modifyTarget.tagName !== "INPUT" && parentTarget.classList.value !== "disabled") {
            const value = modifyTarget.textContent;
            const input = modifyTarget.querySelector("input");
            modifyTarget.textContent = "";

            input.value = value;
            input.style.display = "block";
            modifyTarget.appendChild(input);
            input.focus();
        }
    }

    const updateTodoView = (target, value) => {
        const parentElement = target.parentElement;
        const textNode = document.createTextNode(value);

        target.style.display = "none";
        parentElement.appendChild(textNode);
    }

    const removeTodoView = (id) => {
        const removeTarget = getElement(id);
        todoListElements.removeChild(removeTarget);
    }    

    // TODO HANDLER
    const handleInputAddKeyup = (e) => {
        if (e.key === "Enter") {
            const { target } = e;
            if (emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = addTodo(target.value);

            addTodoView(viewData);
            target.value = "";
        }
    }

    const handleButtonAddClick = (e) => {
        const { target } = e;
        const input = target.previousElementSibling;
        if (emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = addTodo(input.value);

        addTodoView(viewData);
        input.value = "";
    }

    const handleCompleteClick = (e) => {
        const { target } = e;
        const id = getId(e.target);
        const checked = target.checked;

        completeTodoView(id, checked);
        completeTodo(id, checked);
    }

    const handleContentDbclick = (e) => {
        const id = getId(e.target);
        modifyTodoView(id);
    }

    const handleUpdateContentKeyup = (e) => {
        if (e.key === "Enter") {
            const { target } = e;
            const id = getId(e.target);
            const value = target.value;

            if (emptyValueCheck(value, "내용을 입력해주세요.")) return;

            updateTodoView(target, value);
            updateTodo(id, value);
        }
    }

    const handleRemoveClick = (e) => {
        const id = getId(e.target);

        removeTodoView(id);
        removeTodo(id);
    }

    // TODO UTILL - 프로젝트 종속되어 있는 부분 제거할 수 있는 방법 고민
    const getId = (target, type) => {
        const element = target.closest("li");
        const id = element.getAttribute("id");

        if (id) {
            return id;
        }
        
        return null;
    }

    const getElement = (id) => {
        const element = document.querySelector("#" + id);

        if (element) {
            return element;
        }

        return null;
    }

    const emptyValueCheck = (value, message) => {
        let result = false;

        if (!value) {
            console.log(message);
            result = true;
        }

        return result;
    }

    const uniqueID = () => {
        return 'todo-yxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 실행
    init();
}

todos();

// DOMContentLoaded >> DOM element가 로드 됐을 때 
// load > DOM element뿐만 아니라 css, js, img등 리소스도 전부 로드 됐을 때
// window.addEventListener("DOMContentLoaded", todos);