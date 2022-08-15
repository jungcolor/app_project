function getmenu() {
    const menuList = ["짜장면", "김치찌개", "볶음밥", "된장찌개", "삼겹살", "돼지갈비", "차돌박이", "해장국"];
    const randomNum = Math.floor(Math.random() * menuList.length);
    const result = menuList[randomNum];
    
    return result;
}

exports.getmenu = getmenu;