function getMenu (menuList) {
    if (menuList?.length > 0) {
        const randomNum = Math.floor(Math.random() * menuList.length);
        return menuList[randomNum];
    }

    return null;
}

module.exports.getMenu = getMenu;