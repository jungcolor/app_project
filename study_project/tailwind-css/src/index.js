import "../css/tailwind.css";
import sejong from "../image/sejong.png";

window.addEventListener("DOMContentLoaded", () => {
    const thumbnail = document.querySelector("#thumbnail");
    const thumbnailImg = new Image();
    thumbnailImg.src = sejong;
    thumbnailImg.classList.add("rounded-full", "w-28", "h-28");
    thumbnail.append(thumbnailImg);
});