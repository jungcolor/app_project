import StickerLayout from "./stickerLayout.js";

window.addEventListener("DOMContentLoaded", (e) => {
    const stickerAdd = document.querySelector("#sticker-add");
    const stickerLayout = new StickerLayout({ parentEl: document.body });

    stickerAdd.addEventListener("click", (e) => {
        stickerLayout.addSticker();
    });
});