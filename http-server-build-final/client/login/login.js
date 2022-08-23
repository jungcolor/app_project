window.addEventListener('DOMContentLoaded', e => {
    const email = document.querySelector(`[type=email]`);
    const nickName = document.querySelector(`[type=nickName]`);
    const submit = document.querySelector(`[type=submit]`);

    submit.addEventListener('click', async (e) => {
        const param = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: JSON.stringify({
                email: email.value,
                nickName: nickName.value,
            })
        };

        const response = await fetch("/api/login", param);
        const data = await response.json();

        console.log(data);

        if (data) {
            email.value = "";
            nickName.value = "";
            window.location.href = "../index.html";
        }
    });
});