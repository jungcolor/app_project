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

    setElementEventBind: function (target, events) {
        events?.forEach((event) => {
            const { type, callback } = event;

            target.addEventListener(type, callback);
        });
    },

    getElement: function (selector) {
        return document.querySelector(selector);
    },
}

export default elementlib;