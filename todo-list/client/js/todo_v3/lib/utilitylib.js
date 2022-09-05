// TODO Utility 객체
const utilitylib = {
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
        if (!value) {
            console.log(message);
            return true;
        }

        return false;
    },

    uuid: function () {
        return 'todo-yxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default utilitylib;