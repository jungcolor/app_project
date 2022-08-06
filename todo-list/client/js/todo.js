window.addEventListener("load", function () {
    // TODOLIST 관련
    const inputBox = document.querySelector(".add-input");
    const addBtn = document.querySelector(".add-button");
    const todoList = document.querySelector(".todos");

    // EVENT
    const eventHandler = {
        // UPDATE
        handleUpdate: (e) => {
            console.log("수정");
            const { target } = e;
            const parent = target.closest("li");

            if (target.tagName !== "INPUT" && parent.classList.value !== "disabled") {
                const value = target.textContent;
                const input = target.querySelector("input");
                target.textContent = "";

                input.value = value;
                input.style.display = "block";
                target.appendChild(input);
                input.focus();
            }
        },

        // UPDATE COMPLETE
        handleUpdateComplete: (e) => {
            console.log("수정완료");

            const { target } = e;
            const parent = target.parentElement;
            let value = target.value;

            if (!value) {
                if (target.style.display === "none") {
                    target.style.display = "block";
                    target.focus();
                }
                console.log("내용을 입력해주세요.");
                return false;
            }

            const textNode = document.createTextNode(value);
    
            target.style.display = "none";
            parent.appendChild(textNode);
        },

        // COMPLETE
        handleComplete: (e) => {
            console.log("완료");
            const { target } = e;
            const completeTarget = target.closest("li");

            if (completeTarget.classList.value === "disabled") {
                completeTarget.classList.remove("disabled");
                todoList.prepend(completeTarget)
                target.checked = false;
            }
            else {
                completeTarget.classList.add("disabled");
                todoList.appendChild(completeTarget);
            }
        },

        // REMOVE
        handleRemove: (e) => {
            console.log("삭제");
            const removeTarget = e.target.closest("li");
            todoList.removeChild(removeTarget);
        }
    }

    // ADD ITEM
    const addItem = () => {
        if (inputBox.value === "") {
            console.log("내용을 입력해주세요.");
            return false;
        }

        console.log("추가");

        const liElement = document.createElement("li");

        const radioElement = document.createElement("input");
        radioElement.setAttribute("type", "radio");
        radioElement.addEventListener("click", eventHandler.handleComplete); // 완료

        const divElement = document.createElement("div");
        divElement.innerText = inputBox.value;
        divElement.addEventListener("click", eventHandler.handleUpdate); // 수정

        const updateInput = document.createElement("input");
        updateInput.setAttribute("type", "text");
        updateInput.style.display = "none";
        updateInput.innerText = "";
        updateInput.addEventListener("focusout", eventHandler.handleUpdateComplete); // 수정완료
        updateInput.addEventListener("keypress", (e) => {
            if (e.keyCode === 13) {
                // 강제로 포커스를 제거하여 focusout event를 발생시킨다
                const { target } = e;
                target.blur(); // focusout 이벤트 실행을 위해 포커스를 제거하고..
                target.focus(); // 포커스를 다시 준다
            }
        });

        const spanElement = document.createElement("span");
        spanElement.classList.add("todo-remove");
        spanElement.innerText = "X";
        spanElement.addEventListener("click", eventHandler.handleRemove); // 삭제

        divElement.appendChild(updateInput);

        liElement.appendChild(radioElement);
        liElement.appendChild(divElement);
        liElement.appendChild(spanElement);

        // TODO - disabled로 변경..
        const completeList = todoList.querySelector(".disabled");

        if (completeList) {
            todoList.insertBefore(liElement, completeList);
        }
        else {
            todoList.appendChild(liElement);
        }

        inputBox.value = "";
    }

    inputBox.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
            addItem();
        }
    });

    addBtn.addEventListener("click", (e) => {
        addItem();
    });

    // TODODATE 관련
    const todoYear = document.querySelector(".todo-year");
    const todoMonth = document.querySelector(".todo-month");
    const todoDay = document.querySelector(".todo-day");
    const getTodayDate = () => {
        const date = new Date();
        let yaer = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        let day = date.getDay();

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
});