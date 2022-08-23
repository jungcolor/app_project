window.addEventListener('DOMContentLoaded', e => {
    const menu = document.querySelector('#menu');
    const save = document.querySelector('#save');
    const menuList = document.querySelector('#menuList');
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
    }

    save.addEventListener('click', async e => {
        const body = {
            email: getCookie("email"),
            menuName: menu.value
        };
        const param = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: JSON.stringify(body)
        };

        const response = await fetch("https://localhost:3040/api/menuList", param);
        const data = await response.json();
        console.log(data);

        menu.value = "";
    });
});