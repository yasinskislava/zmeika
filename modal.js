const overlay = document.querySelector(".overlay");
const gameOverBtn = document.querySelector("[data-btn]");

gameOverBtn.addEventListener("click", addClass);
function addClass() {
    overlay.classList.add("hide");
}