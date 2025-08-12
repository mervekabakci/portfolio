//Window load
window.onload = () => {
  document.querySelector(".preloader").remove();
};
//Window load end

//Mobile Menu
const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar");
// const navButton = document.querySelector(".navbarButton");
// function handleClickMenu() {
//   this.classList.toggle("active");
//   navMenu.classList.toggle("opened");
//   // body.classList.toggle("opened");
// }
// navButton.addEventListener("click", handleClickMenu);
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
  // console.log(headerH);
}
window.addEventListener("scroll", handleScroll);
//window scroll end

const anchorLinks = document.querySelectorAll(".anchorLink");

anchorLinks.forEach((anchorLink) => {
  anchorLink.addEventListener("click", (event) => {
    anchorLinks.forEach((link) => link.classList.remove("active"));
    anchorLink.classList.add("active");

    const href = anchorLink.getAttribute("href");
    const targetElem = document.querySelector(href);

    if (window.innerWidth < 992) {
      body.classList.remove("opened");
      navButton.classList.remove("active");
      navMenu.classList.remove("opened");
    }
    if (targetElem) {
      event.preventDefault();
      targetElem.scrollIntoView({ behavior: "smooth" });
    }
    console.log(href);
  });
});


//sayfayı scroll ettıgımızde gorunen sectıona aıt ılgılı menu actıve olur
//Observer gözlemci anlamına gelir ve tarayıcıda görünen elementler uzerınde rahatlıkla kontrol edıp ıslemler yapabılırız.
//modern javascriptte her scroll olayında elle hesap yapmak yerıne observer kullanmak daha performanslı calısır.
const sections = document.querySelectorAll("section");

const options = {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    const entryId = `#${entry.target.getAttribute("id")}`;
    console.log(entryId);
    anchorLinks.forEach((ancLink) => {
      console.log(ancLink.getAttribute("href"));
      const linkHref = ancLink.getAttribute("href");
      ancLink.classList.remove("active");
      if (entryId === linkHref) {
        ancLink.classList.add("active");
      } 
    });

    entry.target.classList.toggle("inverse");
    observer.unobserve(entry.target);
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});
