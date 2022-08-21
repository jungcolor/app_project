window.addEventListener('DOMContentLoaded', e => {
    const email = document.querySelector(`[type=email]`);
    const nickName = document.querySelector(`[type=nickName]`);
    const submit = document.querySelector(`[type=submit]`);

    submit.addEventListener('click', async (e) => {
        let body = {
            email: email.value,
            nickName: nickName.value,
        };

        body = JSON.stringify(body);

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: body
        };

        const response = await fetch("/api/login", options);
        const data = await response.json();

        if (data) {
            email.value = "";
            nickName.value = "";
            window.location.href = "../index.html";
        }
    });
});