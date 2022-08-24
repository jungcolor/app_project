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
    };
    const addItem = (item) => {
        const li = document.createElement('li');
        li.textContent = item.menuName;
        menuList.appendChild(li);
    }
    const fetchData = async () => {
        const response = await fetch("https://localhost:3040/api/menu/list", {
            method: "POST",
            body: JSON.stringify(getCookie("email"))
        });
        const datas = await response.json();

        console.log(datas);

        if (datas?.success) {
            datas.payload?.forEach((data) => {
                addItem(data);
            });
        }
        else {
            addItem({ menuName: "등록된 음식이 없습니다" });
        }

    }

    // 목록 불러오기 api
    fetchData();

    // 저장 api
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

        const response = await fetch("https://localhost:3040/api/menu/save", param);
        const data = await response.json();
        console.log(data);

        if (data) {
            addItem(data);
        }

        menu.value = "";
    });
});