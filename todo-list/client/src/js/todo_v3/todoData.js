// TODO lib
import utilitylib from "./lib/utilitylib.js";

// TODO DATA 객체 - element(view) 관련된 로직 존재하지 못함
const todoData = {
    _itemList: [],

    init: function () {
        this.fetchData();
    },

    fetchData: async function () {
        console.log("[Micro Task Queue] >>>>> Start");
        const datas = await this.callApi(`/api/todo`);

        if (datas.success) {
            this.setItemList(datas.datas);
        }

        // console.log(datas);
        console.log("[Micro Task Queue] >>>>> End");
    },

    setItemList: function (items) {
        this._itemList = items;
    },

    getItemList: function () {
        return this._itemList;
    },

    getItem: function (id) {
        return this._itemList.filter(item => item.id === id);
    },

    getItemIndex: function (id) {
        return this._itemList.findIndex(item => item.id === id);
    },

    addItem: async function (content) {
        const item = { id: utilitylib.uuid(), complete: false, content };
        const datas = await this.callApi(`/api/todo/add`, {
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

    updateItem: async function (id, content) {
        const updateItem = this.getItem(id);
        const datas = await this.callApi(`/api/todo/update/content/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, content })
        });

        if (datas.success) {
            updateItem[0].content = content;
            return updateItem[0].content;
        }
    },

    complete: async function (id) {
        const completeItem = this.getItem(id);
        const datas = await this.callApi(`/api/todo/update/complete/${id}`, { method: "put" });

        if (datas.success) {
            completeItem[0].complete = !completeItem[0].complete;
            return completeItem[0].complete;
        }
    },

    removeItem: async function (id) {
        const removeitemIdx = this.getItemIndex(id);
        const datas = await this.callApi(`/api/todo/delete/${id}`, { method: "delete" });

        if (datas.success) {
            this._itemList.splice(removeitemIdx, 1);
        }
    },

    callApi: async function (url, options) {
        const response = await fetch(`http://localhost:5000${url}`, options);
        const items = await response.json();

        return items;
    },
}

export default todoData;