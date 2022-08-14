function getmenu() {
    const menuList = ["음식1", "음식2", "음식3", "음식4", "음식5", "음식6", "음식7", "음식8"];
    const randomNum = Math.floor(Math.random() * menuList.length);
    
    return menuList[randomNum];
}

exports.getmenu = getmenu;