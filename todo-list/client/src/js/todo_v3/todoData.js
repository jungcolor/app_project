// TODO lib
import utilitylib from "./lib/utilitylib.js";

// TODO DATA 객체 - element(view) 관련된 로직 존재하지 못함
// immutable 적용 해보기
const todoData = {
    _itemList: [],

    init: function () {
        this.fetchData();
    },

    fetchData: async function () {
        const datas = await this.callApi("/api/todo");
        
        if (datas.success) {
            this._itemList = datas.datas;
            this.loaditem();
        }

        console.log(datas);
    },

    getItem: function (id) {
        return this._itemList.filter(item => item.id === id);
    },

    getItemIndex: function (id) {
        return this._itemList.findIndex(item => item.id === id);
    },

    loaditem: function () {
        this._itemList.forEach(item => {
            // view에다가 데이터 전달 어떻게 할건지 고민
        });
    },

    addItem: async function (content) {
        const item = { id: utilitylib.uuid(), complete: false, content };
        const datas = await this.callApi("/api/todo/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        if (datas.success) {
            this._itemList.push(item);
            return item;
        }

        return null;
    },

    removeItem: function (id) {
        const removeitemIdx = this.getItemIndex(id);
        this._itemList.splice(removeitemIdx, 1);
    },

    updateItem: function (id, content) {
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

    callApi: async function (url, options) {
        const response = await fetch(`http://localhost:5000${url}`, options);
        const items = await response.json();

        return items;
    },
}

export default todoData;