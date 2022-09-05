// TODO lib
import utilitylib from "./lib/utilitylib.js";

// TODO DATA 객체 - element(view) 관련된 로직 존재하지 못함
// immutable 적용 해보기
const todoData = {
    _itemList: [],

    init: function () {
        this.fetchData();
    },

    fetchData: function () {
        // API로 가져온 데이터 셋팅
        // this._itemList = this.fetchDataItems();
    },

    // 서버 구현 전 까지 더미 데이터로 대체
    // fetchDataItems: function () {
    //     const data = [];

    //     return data;
    // },

    getItem: function (id) {
        return this._itemList.filter(item => item.id === id);
    },

    getItemIndex: function (id) {
        return this._itemList.findIndex(item => item.id === id);
    },

    add: function (content) {
        const additem = { id: utilitylib.uuid(), complete: false, content };
        const completeTodoIdx = this._itemList.findIndex(item => item.complete);

        if (completeTodoIdx > -1) {
            this._itemList.splice(completeTodoIdx, 0, additem);
        }
        else {
            this._itemList.push(additem);
        }

        return additem;
    },

    remove: function (id) {
        const removeitemIdx = this.getItemIndex(id);
        this._itemList.splice(removeitemIdx, 1);
    },

    update: function (id, content) {
        this._itemList.forEach(item => {
            if (item.id === id) {
                item.content = content;
                return false; // forEach break
            }
        });
    },

    complete: function (id) {
        const updateItem = this.getItem(id);

        updateItem[0].complete = !updateItem[0].complete;
        return updateItem[0].complete;
    },
}

export default todoData;