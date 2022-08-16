// TODO Element 생성 객체
const elementlib = {
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
        if (!target || !attrs) return false;
        const keys = Object.keys(attrs);

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

    getElementAttribute: function () {},

    setElementEventBind: function (target, events) {
        events?.forEach(event => {
            const { type, handler } = event;

            target.addEventListener(type, handler);
        });
    },

    setElementEventUnBind: function (target, events) {
        events?.forEach(event => {
            const { type, handler } = event;
            
            target.removeEventListener(type, handler);
        });
    },

    getElement: function (selector) {
        // if (target) {
        //     return target.querySelector(selector);
        // }

        return document.querySelector(selector);
    },

    // TODO 여기 아래부분을 여기서 해주는게 맞나????????
    getValue: function (target) {
        return target && target.value;
    },

    setValue: function (target, value) {
        target.value = value;
    },

    getText: function (target) {
        return target && target.textContent || target.innerText || target.innerHTML;
    },

    setText: function (target, text) {
        target.textContent = text;
    },

    createText: function (text) {
        return document.createTextNode(text);
    },

    addClass: function (target, className) {
        target.classList.add(className);
    },

    removeClass: function (target, className) {
        target.classList.remove(className);
    },

    hasClass: function (target, className) {
        if (target.classList.value === className) {
            return true;
        }

        return false;
    },
}

export default elementlib;