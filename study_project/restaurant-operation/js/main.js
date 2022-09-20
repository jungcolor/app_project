import Order from './order.js';
import Food from './food.js';
import Manager from './manager.js';
import Chef from './chef.js';

const app = {
    init: function () {
        this.order = new Order();
        this.food = new Food();
        this.chef = new Chef();
        // this.manager = new Manager(this.order, this.chef);
        this.initElement();
    },

    initElement: function () {
        const orderSoup = document.querySelector(".orderSoup");
        const orderDrink = document.querySelector(".orderDrink");

        orderSoup.addEventListener("click", this.handleClickOrder.bind(this, this.food.soup));
        orderDrink.addEventListener("click", this.handleClickOrder.bind(this, this.food.drink));
    },

    handleClickOrder: function (menu) {
        this.order.setOrderMenu(menu);
    }
}

app.init();