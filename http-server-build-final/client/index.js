window.addEventListener('DOMContentLoaded', async () => {
    const logout = document.querySelector("#logout"); // 시간나면..
    const email = document.querySelector('#email');
    const nickName = document.querySelector('#nickName');
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
    email.textContent = getCookie("email");
    nickName.textContent = getCookie("nickname");
});