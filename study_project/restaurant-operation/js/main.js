// import Order from './order.js';
import { initFood } from './food.js';
import { initManager } from './manager.js';
// import Chef from './chef.js';

const app = {
    init: function () {
        initManager();
        this.initElement();
    },

    initElement: function () {
        const orderSoup = document.querySelector(".orderSoup");
        const orderDrink = document.querySelector(".orderDrink");

        orderSoup.addEventListener("click", this.handleClickOrder.bind(this, initFood("스프")));
        orderDrink.addEventListener("click", this.handleClickOrder.bind(this, initFood("음료수")));
    },

    handleClickOrder: function (menuInstance) {
        
    }
}

app.init();