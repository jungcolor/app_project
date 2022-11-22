import "./css/tailwind.css";

window.addEventListener("DOMContentLoaded", e => {
    const $posts = document.querySelector(".wrapper-post");

    const fetchData = async () => {
        const response = await fetch("http://localhost:4030/api/board/list");
        const data = await response.json();

        console.log(data);
    }

    fetchData();
});