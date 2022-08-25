window.addEventListener('DOMContentLoaded', () => {
    const viewMenu = document.querySelector("#viewMenu")
    const button = document.querySelector("#showMenu");
    const getCookie = (cName) => {
        cName = cName + '=';
        const cookieData = document.cookie;
        let start = cookieData.indexOf(cName);
        let cValue = '';

        if (start > -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return decodeURI(cValue);
    };

    button.addEventListener('click', async e => {
        const response = await fetch('https://localhost:3040/api/menu/item', {
            method: "POST",
            body: JSON.stringify(getCookie("email"))
        });
        const data = await response.json();

        if (data?.menuName) {
            viewMenu.textContent = data.menuName;
        }
        else {
            viewMenu.textContent = "저장한 음식이 없습니다"
        }
    });
});