function getMenu (menuList) {
    menuList = menuList || [];
    const randomNum = Math.floor(Math.random() * menuList.length);
    const result = menuList[randomNum];

    return result;
}

module.exports.getMenu = getMenu;