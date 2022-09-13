window.addEventListener('DOMContentLoaded', e => {
    const email = document.querySelector(`[type=email]`);
    const nickname = document.querySelector(`[type=nickname]`);
    const submit = document.querySelector(`[type=submit]`);

    submit.addEventListener('click', async (e) => {
        if (!email.value && !nickname.value) {
            alert('내용을 입력해주세요');
            return false;
        }

        const reqData = JSON.stringify({ email: email.value, nickname: nickname.value });

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

        if (data) {
            email.value = "";
            nickname.value = "";
            location.href = "/index.html";
        }
    });
});