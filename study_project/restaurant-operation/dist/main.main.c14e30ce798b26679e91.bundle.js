/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/chef.js":
/*!********************!*\
  !*** ./js/chef.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getChef\": () => (/* binding */ getChef),\n/* harmony export */   \"initChef\": () => (/* binding */ initChef),\n/* harmony export */   \"setChef\": () => (/* binding */ setChef)\n/* harmony export */ });\n/* harmony import */ var _food_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food.js */ \"./js/food.js\");\n\r\n\r\nlet chefList = [];\r\n\r\nfunction wait(second) {\r\n    return new Promise(resolve => {\r\n        setTimeout(resolve, second);\r\n    });\r\n}\r\n\r\nclass Chef {\r\n    constructor(name, timer) {\r\n        this.name = name;\r\n        this.timer = timer;\r\n        this.status = \"대기중\";\r\n        this.orderCount = \"\";\r\n        this.menu = \"\";\r\n        this.parent = document.querySelector(\"#chefContainer\");\r\n        this.createElement();\r\n    }\r\n\r\n    createElement() {\r\n        const div = document.createElement(\"div\");\r\n        const template = `\r\n            <div>${this.name}</div>\r\n            <div class=\"chefStatus\">${this.status}</div>\r\n            <div class=\"chefOrderCount\">${this.orderCount}</div>\r\n        `;\r\n\r\n        div.insertAdjacentHTML(\"beforeend\", template);\r\n\r\n        this.el = div;\r\n        this.parent.append(div);\r\n\r\n        chefList.push(this);\r\n    }\r\n\r\n    async setMenu(orderCount, menu) {\r\n        const foodIns = (0,_food_js__WEBPACK_IMPORTED_MODULE_0__.initFood)(menu, (menu === \"스프\") ? 10000 : 3000);\r\n\r\n        if (this.status === \"대기중\") {\r\n            this.setStatus(\"요리중\");\r\n            this.updateOrderCount(orderCount);\r\n\r\n            await wait(this.timer); // 요리사의 시간만큼 기다린다\r\n\r\n            foodIns.setFood();\r\n            this.setStatus(\"대기중\");\r\n            this.updateOrderCount(\"\");\r\n            return true;\r\n        }\r\n\r\n        return false;\r\n    }\r\n\r\n    restoreChef() {\r\n        chefList.push(this);\r\n    }\r\n\r\n    setStatus(status) {\r\n        const el = this.el.querySelector(\".chefStatus\");\r\n\r\n        this.status = status;\r\n        el.textContent = this.status;\r\n    }\r\n\r\n    getStatus() {\r\n        return this.status;\r\n    }\r\n\r\n    updateOrderCount(orderCount) {\r\n        const el = this.el.querySelector(\".chefOrderCount\");\r\n\r\n        this.orderCount = orderCount;\r\n        el.textContent = this.orderCount;\r\n    }\r\n}\r\n\r\nfunction initChef() {\r\n    new Chef(\"요리사1\", 1000);\r\n    new Chef(\"요리사2\", 1500);\r\n}\r\n\r\nfunction setChef(chef) {\r\n    chefList.push(chef);\r\n}\r\n\r\nfunction getChef() {\r\n    return chefList.shift();\r\n}\n\n//# sourceURL=webpack://restaurant-operation/./js/chef.js?");

/***/ }),

/***/ "./js/food.js":
/*!********************!*\
  !*** ./js/food.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"foods\": () => (/* binding */ foods),\n/* harmony export */   \"getFood\": () => (/* binding */ getFood),\n/* harmony export */   \"initFood\": () => (/* binding */ initFood)\n/* harmony export */ });\nlet foodList = [];\r\n\r\nconst foods = {\r\n    soup: \"스프\",\r\n    drink: \"음료수\"\r\n}\r\n\r\nclass Food {\r\n    constructor(menu, timer) {\r\n        this.name = menu;\r\n        this.timer = timer;\r\n        this.timerID = null;\r\n        this.count = this.timer / 1000;\r\n        this.parent = document.querySelector(`#foodContainer`);\r\n\r\n        foodList.push(this);\r\n    }\r\n\r\n    setFood() {\r\n        const div = document.createElement(\"div\");\r\n        const template = `\r\n            <div>${this.name}</div>\r\n            <div class=\"timer\">${this.count}</div>\r\n        `;\r\n\r\n        div.insertAdjacentHTML(\"beforeend\", template);\r\n\r\n        this.el = div;\r\n        this.parent.append(div);\r\n\r\n        this.setTimer();\r\n    }\r\n\r\n    removeFood() {\r\n        this.el.remove();\r\n        foodList.filter(food => food !== this);\r\n    }\r\n\r\n    setTimer() {\r\n        this.timerID = setInterval(() => {\r\n            const el = this.el.querySelector(\".timer\");\r\n\r\n            if (this.count < 1) {\r\n                this.clearTimer();\r\n                this.removeFood();\r\n                return;\r\n            }\r\n\r\n            el.textContent = this.count;\r\n            this.count--;\r\n        }, 1000);\r\n    }\r\n\r\n    clearTimer() {\r\n        clearInterval(this.timerID);\r\n        this.timerID = null;\r\n    }\r\n}\r\n\r\nfunction initFood(menu, timer) {\r\n    return new Food(menu, timer);\r\n}\r\n\r\nfunction getFood(name) {\r\n    return foodList.filter(food => food.name === name)[0];\r\n}\n\n//# sourceURL=webpack://restaurant-operation/./js/food.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.js */ \"./js/order.js\");\n/* harmony import */ var _food_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food.js */ \"./js/food.js\");\n/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manager.js */ \"./js/manager.js\");\n\r\n\r\n\r\n\r\nconst app = {\r\n    init: function () {\r\n        (0,_manager_js__WEBPACK_IMPORTED_MODULE_2__.initManager)();\r\n        this.initElement();\r\n    },\r\n\r\n    initElement: function () {\r\n        const orderSoup = document.querySelector(\".orderSoup\");\r\n        const orderDrink = document.querySelector(\".orderDrink\");\r\n\r\n        orderSoup.addEventListener(\"click\", this.handleClickOrder.bind(this, _food_js__WEBPACK_IMPORTED_MODULE_1__.foods.soup));\r\n        orderDrink.addEventListener(\"click\", this.handleClickOrder.bind(this, _food_js__WEBPACK_IMPORTED_MODULE_1__.foods.drink));\r\n    },\r\n\r\n    handleClickOrder: function (name) {\r\n        (0,_order_js__WEBPACK_IMPORTED_MODULE_0__.createOrder)(name);\r\n    }\r\n}\r\n\r\napp.init();\n\n//# sourceURL=webpack://restaurant-operation/./js/main.js?");

/***/ }),

/***/ "./js/manager.js":
/*!***********************!*\
  !*** ./js/manager.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initManager\": () => (/* binding */ initManager)\n/* harmony export */ });\n/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.js */ \"./js/order.js\");\n/* harmony import */ var _chef_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chef.js */ \"./js/chef.js\");\n\r\n\r\n\r\nconst checkOrderList = [];\r\n\r\nfunction wait(second) {\r\n    return new Promise(resolve => {\r\n        setTimeout(resolve, second);\r\n    });\r\n}\r\n\r\nclass Manager {\r\n    constructor(name) {\r\n        this.name = name;\r\n        this.status = \"대기중\";\r\n        this.parent = document.querySelector(\"#managerContainer\");\r\n        this.createElement();\r\n        // this.orderWatchStart();\r\n        this.checkOrder();\r\n    }\r\n\r\n    createElement() {\r\n        const div = document.createElement(\"div\");\r\n        const template = `\r\n            <div>${this.name}</div>\r\n            <div class=\"managerStatus\">대기중</div>\r\n        `;\r\n\r\n        div.insertAdjacentHTML(\"beforeend\", template);\r\n\r\n        this.el = div;\r\n        this.parent.append(div);\r\n    }\r\n\r\n    async checkOrder() {\r\n        while(true) {\r\n            this.setStatus(\"대기중\");\r\n            await wait(3000);\r\n            console.log(\"주문 확인중!!!!!\");\r\n            this.orderWatchStart();\r\n        }\r\n    }\r\n\r\n    async orderWatchStart() {\r\n        const orderIns = await (0,_order_js__WEBPACK_IMPORTED_MODULE_0__.getOrder)();\r\n        wait(200);\r\n        const chefIns = await (0,_chef_js__WEBPACK_IMPORTED_MODULE_1__.getChef)();\r\n        wait(200);\r\n\r\n        if (orderIns) {\r\n            if (chefIns) {\r\n                orderIns.setStatus(\"요리중..\");\r\n                const result = await chefIns.setMenu(orderIns.orderCount, orderIns.menu);\r\n                await wait(0.9);\r\n\r\n                if (result) {\r\n                    orderIns.removeOrder();\r\n                }\r\n                chefIns.restoreChef();\r\n            }\r\n            else {\r\n                orderIns.setStatus(\"대기중\");\r\n                this.setStatus(\"요리사 확인중..\");\r\n            }\r\n        }\r\n\r\n        chefIns.restoreChef();\r\n    }\r\n\r\n    setStatus(status) {\r\n        const el = this.el.querySelector(\".managerStatus\");\r\n\r\n        this.status = status;\r\n        el.textContent = status;\r\n    }\r\n\r\n}\r\n\r\nfunction initManager() {\r\n    new Manager(\"매니저\");\r\n    new Manager(\"부매니저\");\r\n\r\n    (0,_chef_js__WEBPACK_IMPORTED_MODULE_1__.initChef)();\r\n}\n\n//# sourceURL=webpack://restaurant-operation/./js/manager.js?");

/***/ }),

/***/ "./js/order.js":
/*!*********************!*\
  !*** ./js/order.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createOrder\": () => (/* binding */ createOrder),\n/* harmony export */   \"getOrder\": () => (/* binding */ getOrder)\n/* harmony export */ });\nconst orderList = [];\r\n\r\nlet orderNumber = 0;\r\n\r\nfunction wait(second) {\r\n    return new Promise(resolve => {\r\n        setTimeout(resolve, second);\r\n    });\r\n}\r\nclass Order {\r\n    constructor(menu) {\r\n        this.menu = menu;\r\n        this.status = \"대기중\";\r\n        this.orderCount = `주문${++orderNumber}`;\r\n        this.parent = document.querySelector(\"#orderContainer\");\r\n        this.createElement();\r\n    }\r\n\r\n    createElement() {\r\n        const div = document.createElement(\"div\");\r\n        const template = `\r\n            <div>${this.orderCount}</div>\r\n            <div>${this.menu}</div>\r\n            <div class=\"orderStatus\">${this.status}</div>\r\n        `;\r\n\r\n        div.insertAdjacentHTML(\"beforeend\", template);\r\n\r\n        this.el = div;\r\n        this.parent.append(div);\r\n\r\n        orderList.push(this);\r\n    }\r\n\r\n    setStatus(status) {\r\n        const el = this.el.querySelector(\".orderStatus\");\r\n\r\n        this.status = status;\r\n        el.textContent = this.status;\r\n    }\r\n\r\n    removeOrder() {\r\n        this.el.remove();\r\n    }\r\n}\r\n\r\n\r\nfunction createOrder(menu) {\r\n    new Order(menu);\r\n}\r\n\r\nasync function getOrder() {\r\n    await wait(100);\r\n    return orderList.shift();\r\n}\n\n//# sourceURL=webpack://restaurant-operation/./js/order.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;