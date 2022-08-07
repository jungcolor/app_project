const todos = () => {
    let todoItems = [];
    const todoElements = document.querySelector(".todos");

    // TODO 초기화 관련 //////////////////////////////////////////////////////////////////////////////////////////////////////
    function init() {
        initElement();
        initDate();
        fetchTodos(); // TODO API로 변경해야함
        render();
    }

    function initElement() {
        const addInput = document.querySelector(".add-input");
        const addButton = document.querySelector(".add-button");

        addInput.addEventListener("keyup", handleInputAddKeyup);
        addButton.addEventListener("click", handleButtonAddClick);
    }

    function initDate() {
        // TODO - 접속 국가별로 나올 수 있도록 수정 ( day.js 날짜 포맷팅 방법 참고 )
        const todoYear = document.querySelector(".todo-year");
        const todoMonth = document.querySelector(".todo-month");
        const todoDay = document.querySelector(".todo-day");
        const getTodayDate = () => {
            const date = new Date();
            let yaer = date.getFullYear().toString();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            return {
                yaer: yaer,
                month: (month >= 10) ? month : "0" + month,
                day: (day >= 10) ? day : "0" + day
            };
        };
        const currentDate = getTodayDate();
        todoYear.innerText = currentDate.yaer + "년";
        todoMonth.innerText = currentDate.month + "월";
        todoDay.innerText = currentDate.day + "일";        
    }

    function fetchTodoItems() {
        const items = [];

        return items;
    }

    function fetchTodos() {
        todoItems = fetchTodoItems();
    }

    function render() {
        todoItems?.forEach(todo => {
            const element = createTodoElement(todo);
            todoElements.appendChild(element);
        });
    }

    // TODO DOM생성 관련 - element생성 공통화 할 수 있는 지 고민 ///////////////////////////////////////////////////////////////////
    function createTodoElement(todo) {
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

    function createTodoListElement(id) {
        const listElement = document.createElement("li");
        listElement.setAttribute("id", id);

        return listElement;
    }

    function createTodoCompleteElement() {
        const completeElement = document.createElement("input");
        completeElement.setAttribute("type", "checkbox");
        completeElement.addEventListener("click", handleCompleteClick);

        return completeElement;
    }

    function createTodoContentElement(content) {
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

    function createTodoRemoveElement() {
        const removeELement = document.createElement("span");
        removeELement.classList.add("todo-remove");
        removeELement.innerText = "X";
        removeELement.addEventListener("click", handleRemoveClick);

        return removeELement;
    }

    // TODO DATA 관련 //////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodo(value) {
        const todo = { id: uniqueID(), todo: value, complete: false };
        const completeItemIdx = todoItems.findIndex(item => item.complete);

        if (completeItemIdx > -1) {
            todoItems.splice(completeItemIdx, 0, todo); // 목록 중 완료된 목록이 존재하면 해당 목록 앞에 새로 추가한다
        }
        else {
            todoItems.push(todo);
        }

        return todo;
    }

    function removeTodo(id) {
        const removeTodoIndex = todoItems.findIndex(item => item.id === id);
        todoItems.splice(removeTodoIndex, 1);
    }

    function updateTodo(id, value) {
        // 해당 데이터를 찾아서 value를 업데이트 해준다
        for (let i = 0, len = todoItems.length; i < len; i++) {
            const item = todoItems[i];
            
            if (item.id === id) {
                item.todo = value;
                break;
            }
        }
    }

    function completeTodo(id, isComplete) {
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

    // TODO DOM조작 관련 //////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodoView(viewData) {
        const todoElement = createTodoElement(viewData);
        const completeElement = todoElements.querySelector(".disabled");

        if (completeElement) {
            todoElements.insertBefore(todoElement, completeElement);
        }
        else {
            todoElements.appendChild(todoElement);
        }
    }

    function completeTodoView(id, isComplete) {
        const completeTarget = getElement(id);

        if (isComplete) {
            completeTarget.classList.add("disabled");
            todoElements.appendChild(completeTarget);
        }
        else {
            completeTarget.classList.remove("disabled");
            todoElements.prepend(completeTarget);
        }
    }

    function modifyTodoView(id) {
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

    function updateTodoView(target, value) {
        const parentElement = target.parentElement;
        const textNode = document.createTextNode(value);

        target.style.display = "none";
        parentElement.appendChild(textNode);
    }

    function removeTodoView(id) {
        const removeTarget = getElement(id);
        todoElements.removeChild(removeTarget);
    }    

    // TODO HANDLER 관련 //////////////////////////////////////////////////////////////////////////////////////////////////////
    function handleInputAddKeyup(e) {
        if (e.key === "Enter") {
            const { target } = e;
            if (emptyValueCheck(target.value, "내용을 입력해 주세요")) return;
            const viewData = addTodo(target.value);

            addTodoView(viewData);
            target.value = "";
        }
    }

    function handleButtonAddClick(e) {
        const { target } = e;
        const input = target.previousElementSibling;
        if (emptyValueCheck(input.value, "내용을 입력해 주세요")) return;
        const viewData = addTodo(input.value);

        addTodoView(viewData);
        input.value = "";
    }

    function handleCompleteClick(e) {
        const { target } = e;
        const id = getId(e.target);
        const checked = target.checked;

        completeTodoView(id, checked);
        completeTodo(id, checked);
    }

    function handleContentDbclick(e) {
        const id = getId(e.target);
        modifyTodoView(id);
    }

    function handleUpdateContentKeyup(e) {
        if (e.key === "Enter") {
            const { target } = e;
            const id = getId(e.target);
            const value = target.value;

            if (emptyValueCheck(value, "내용을 입력해주세요.")) return;

            updateTodoView(target, value);
            updateTodo(id, value);
        }
    }

    function handleRemoveClick(e) {
        const id = getId(e.target);

        removeTodoView(id);
        removeTodo(id);
    }

    // TODO UTILL 관련 //////////////////////////////////////////////////////////////////////////////////////////////////////
    function getId(target, type) {
        const result = target.closest("li");

        if (result) {
            return result.getAttribute("id");
        }
        
        return null;
    }

    function getElement(id) {
        const result = document.querySelector("#" + id);

        if (result) {
            return result;
        }

        return null;
    }

    function emptyValueCheck(value, message) {
        let result = false;

        if (!value) {
            console.log(message);
            result = true;
        }

        return result;
    }

    function uniqueID() {
        return 'todo-yxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 실행
    init();
}

// DOMContentLoaded >> DOM element가 로드 됐을 때 
// load > DOM element뿐만 아니라 css, js, img등 리소스도 전부 로드 됐을 때
window.addEventListener("DOMContentLoaded", todos);