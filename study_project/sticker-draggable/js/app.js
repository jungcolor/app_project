import StickerLayout from "./stickerLayout.js";

window.addEventListener("DOMContentLoaded", (e) => {
    const stickerAdd = document.querySelector("#sticker-add");
    const stickerRemoveAll = document.querySelector("#sticker-remove-all");
    const stickerLayout = new StickerLayout();
    stickerLayout.render(document.body);

    // 스티커 추가
    stickerAdd.addEventListener("click", e => {
        stickerLayout.createSticker();
    });

    // 스티커 전부 삭제
    stickerRemoveAll.addEventListener("click", e => {
        stickerLayout.removeStickerAll();
    });
});