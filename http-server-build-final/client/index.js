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
        return decodeURIComponent(cValue);
    };

    email.textContent = getCookie("email");
    nickName.textContent = getCookie("nickname");

    logout.addEventListener("click", async e => {
        const email = await cookieStore.delete("email");
        const ninckname = await cookieStore.delete("nickname");

        location.href = "./login/login.html";
    });
});