import { createOrder } from './order';
import { foods } from './food';
import { initManager } from './manager';

const app = {
    init: function () {
        initManager();
        this.initElement();
    },

    initElement: function () {
        const orderSoup = document.querySelector(".orderSoup")!;
        const orderDrink = document.querySelector(".orderDrink")!;

        orderSoup.addEventListener("click", this.handleClickOrder.bind(this, foods.soup));
        orderDrink.addEventListener("click", this.handleClickOrder.bind(this, foods.drink));
    },

    handleClickOrder: function (name: string) {
        createOrder(name);
    }
}

app.init();