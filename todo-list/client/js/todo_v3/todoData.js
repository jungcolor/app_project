import utilitylib from "./lib/utilitylib";

// TODO DATA 객체 - 내부에 element(view)와 관련 된 로직이 존재하면 안됨
// immutable 적용 해보기
const todoData = {
    itemList, // static

    init: function () {
        this.fetchData();
    },

    fetchData: function () {
        // API로 가져온 데이터 셋팅
        // this.itemList = this.fetchDataItems();
        this.itemList = [];
    },

    // 서버 구현 전 까지 더미 데이터로 대체
    // fetchDataItems: function () {
    //     const data = [];

    //     return data;
    // },

    getItem: function (id) {
        return this.itemList.filter(item => item.id === id);
    },

    add: function (content) {
        const additem = { id: utilitylib.getId(), complete: false, content };
        const completeTodoIdx = this.itemList.findIndex(item => item.complete);

        if (completeTodoIdx > -1) {
            // 목록 중 완료된 목록이 존재하면 해당 목록 앞에 새로 추가한다
            this.itemList.splice(completeTodoIdx, 0, additem);
        }
        else {
            this.itemList.push(additem);
        }

        return additem;
    },

    remove: function (id) {
        const removeitem = this.getItem(id);
        this.itemList.splice(removeitem, 1);
    },

    update: function (id, content) {
        this.itemList.forEach(item => {
            if (item.id === id) {
                item.content = content;
                return false; // forEach break
            }
        });
    },

    complete: function (id, isComplete) {
        const updateItemIdex = this.itemList.findIndex(item => item.id === id);
        const updateItem = this.itemList.splice(updateItemIdex, 1);
        const itemListLen = this.itemList.length;

        updateItem[0].complete = isComplete;

        if (isComplete) {
            this.itemList.splice(itemListLen, 0, updateItem[0]);
        }
        else {
            this.itemList.splice(0, 0, updateItem[0]);
        }
    },
}

export default todoData;