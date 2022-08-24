window.addEventListener('DOMContentLoaded', e => {
    const email = document.querySelector(`[type=email]`);
    const nickName = document.querySelector(`[type=nickName]`);
    const submit = document.querySelector(`[type=submit]`);

    submit.addEventListener('click', async (e) => {
        if (!email.value && !nickName.value) {
            console.log('내용을 입력해주세요');
            return false;
        }

        const reqData = JSON.stringify({ email: email.value, nickName: nickName.value });

        const param = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: reqData
        };

        const response = await fetch("/api/login", param);
        const data = await response.json();

        if (data.length > 0) {
            alert("사용자가 존재합니다");
            email.value = "";
            nickName.value = "";
            return false;
        }

        email.value = "";
        nickName.value = "";
        location.href = "/index.html";
    });
});