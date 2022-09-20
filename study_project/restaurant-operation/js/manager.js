export default class Manager {
    #status = false;

    constructor(order, chef) {
        this.order = order;
        this.chef = chef;
        this.orderWatchStart();
    }

    async orderWatchStart() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("주문기다리는중!!!!!!!!!!!");
            console.log(this.order);
            console.log(this.chef);
        }
    }
}