//Window load
window.onload = () => {
  document.querySelector(".preloader").remove();
};
//Window load end

//Mobile Menu
const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar");
const navButton = document.querySelector(".navbarButton");
function handleClickMenu() {
  this.classList.toggle("active");
  navMenu.classList.toggle("opened");
  body.classList.toggle("opened");
}
navButton.addEventListener("click", handleClickMenu);
//Mobile Menu End

//window scroll
let lastScrollY = window.scrollY;
function handleScroll() {
  //window scroll header fixed
  const header = document.querySelector("header");
  const headerH = header.offsetHeight;

  window.scrollY > headerH
    ? header.classList.add("fixed")
    : header.classList.remove("fixed");
  //window scroll header fixed end

  console.log(headerH);
}
window.addEventListener("scroll", handleScroll);
//window scroll end

const anchorLinks = document.querySelectorAll(".anchorLink");

anchorLinks.forEach((anchorLink) => {
  anchorLink.addEventListener("click", (event) => {
    anchorLinks.forEach(link => link.classList.remove("active"));
    anchorLink.classList.add("active");

    const href = anchorLink.getAttribute("href");
    const targetElem = document.querySelector(href);

    if (targetElem) {
      event.preventDefault();
      targetElem.scrollIntoView({behavior: "smooth"});
    }
    console.log(href);
  });
});
