import { createOrder } from './order.js';
import { foods } from './food.js';
import { initManager } from './manager.js';

const app = {
    init: function () {
        initManager();
        this.initElement();
    },

    initElement: function () {
        const orderSoup = document.querySelector(".orderSoup");
        const orderDrink = document.querySelector(".orderDrink");

        orderSoup.addEventListener("click", this.handleClickOrder.bind(this, foods.soup));
        orderDrink.addEventListener("click", this.handleClickOrder.bind(this, foods.drink));
    },

    handleClickOrder: function (name) {
        createOrder(name);
    }
}

app.init();