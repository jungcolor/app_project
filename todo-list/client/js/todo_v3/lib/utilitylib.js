// TODO Utility 객체 - 프로젝트 종속되어 있는 부분 제거할 수 있는 방법 고민
const utilitylib = {
    // getId: function (target, type) {
    //     const element = target.closest("li");
    //     const id = element.getAttribute("id");

    //     if (id) {
    //         return id;
    //     }

    //     return null;
    // },

    // getElement: function (id) {
    //     const element = document.querySelector("#" + id);

    //     if (element) {
    //         return element;
    //     }

    //     return null;
    // },

    getDate: function () {
        const dateInstance = new Date();
        let year = dateInstance.getFullYear().toString();
        let month = dateInstance.getMonth() + 1;
        let date = dateInstance.getDate();

        return {
            year: year,
            month: (month >= 10) ? month : "0" + month,
            date: (date >= 10) ? date : "0" + date,
        }
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

export default utilitylib;