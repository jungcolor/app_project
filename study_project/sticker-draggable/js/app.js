import StickerContainer from "./stickerContainer.js";

window.addEventListener("DOMContentLoaded", (e) => {
    const stickerAdd = document.querySelector("#sticker-add");
    const stickerRemoveAll = document.querySelector("#sticker-remove-all");
    const stickerContainer = new StickerContainer();
    stickerContainer.render(document.body);

    // 스티커 추가
    stickerAdd.addEventListener("click", e => {
        stickerContainer.createSticker();
    });

    // 스티커 전부 삭제
    stickerRemoveAll.addEventListener("click", e => {
        stickerContainer.removeStickerAll();
    });
});