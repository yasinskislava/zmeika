const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay-2");
const gameOverBtn = document.querySelector('[data-btn="Lose"]');
const gameFinishedBtn = document.querySelector('[data-btn="Won"]');

gameOverBtn.addEventListener("click", addClassOverlay);
function addClassOverlay() {
    overlay.classList.add("hide");
}

gameFinishedBtn.addEventListener("click", addClassOverlay2);
function addClassOverlay2() {
    overlay2.classList.add("hide");
}