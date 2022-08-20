window.addEventListener('DOMContentLoaded', e => {
    const email = document.querySelector(`[type=email]`);
    const nickName = document.querySelector(`[type=nickName]`);
    const submit = document.querySelector(`[type=submit]`);

    submit.addEventListener('click', async (e) => {
        // console.log(email.value, nickName.value);
        const body = {
            email: email.value,
            nickName: nickName.value,
        };
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        const response = await fetch("/api/login", options);
        const data = await response.json();

        if (data) {
            console.log(data);
            email.value = "";
            nickName.value = "";
        }
    });
});