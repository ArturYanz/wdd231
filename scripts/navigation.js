const burgerBtn = document.querySelector("#burger-btn");
const nav = document.querySelector(".navigation");

burgerBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    burgerBtn.classList.toggle("open");
});