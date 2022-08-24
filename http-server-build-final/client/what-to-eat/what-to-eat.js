window.addEventListener('DOMContentLoaded', () => {
    const viewMenu = document.querySelector("#viewMenu")
    const button = document.querySelector("#showMenu");

    button.addEventListener('click', async e => {
        const response = await fetch('https://localhost:3040/api/menu/item', { method: "GET" });
        const data = await response.json();

        if (data?.menuName) {
            viewMenu.textContent = data.menuName;
        }
        else {
            viewMenu.textContent = "저장한 음식이 없습니다"
        }
    });
});