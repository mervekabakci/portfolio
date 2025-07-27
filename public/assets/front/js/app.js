window.onload = (event) => {
  document.querySelector(".preloader").remove();
};

const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar");
const navButton = document.querySelector(".navbarButton");
function handleClickMenu(){
  this.classList.toggle("active");
  navMenu.classList.toggle("opened");
  body.classList.toggle("opened");
}
navButton.addEventListener("click", handleClickMenu);