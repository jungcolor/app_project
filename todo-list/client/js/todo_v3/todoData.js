// TODO lib
import utilitylib from "./lib/utilitylib.js";

// TODO DATA 객체 - 내부에 element(view)와 관련 된 로직이 존재하면 안됨
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

    getItemList: function () {
        return this._itemList;
    },

    add: function (content) {
        const additem = { id: utilitylib.getId(), complete: false, content };
        const completeTodoIdx = this._itemList.findIndex(item => item.complete);

        if (completeTodoIdx > -1) {
            // 목록 중 완료된 목록이 존재하면 해당 목록 앞에 새로 추가한다
            this._itemList.splice(completeTodoIdx, 0, additem);
        }
        else {
            this._itemList.push(additem);
        }

        return additem;
    },

    remove: function (id) {
        const removeitem = this.getItem(id);
        this._itemList.splice(removeitem, 1);
    },

    update: function (id, content) {
        this._itemList.forEach(item => {
            if (item.id === id) {
                item.content = content;
                return false; // forEach break
            }
        });
    },

    complete: function (id, isComplete) {
        const updateItemIndex = this._itemList.findIndex(item => item.id === id);
        const updateItem = this._itemList.splice(updateItemIndex, 1);
        const itemListLength = this._itemList.length;

        updateItem[0].complete = isComplete;

        if (isComplete) {
            this._itemList.splice(itemListLength, 0, updateItem[0]);
        }
        else {
            this._itemList.splice(0, 0, updateItem[0]);
        }
    },
}

export default todoData;