//Window load
window.onload = () => {
  document.querySelector(".preloader").remove();
  if (document.querySelector(".homeSection")) {
    document.querySelector(".homeSection h1").classList.remove("wait");
  }
};
//Window load end

//Mobile Menu
const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar");
//Mobile Menu End

//theme button action start
const themeButton = document.querySelector(".themeButton");
const blackContains = document.querySelectorAll(".bg-black");
const darkFixBtns = document.querySelectorAll(".button-black");
themeButton.addEventListener("click", function () {
  const isDark = body.classList.toggle("dark-theme");

  if (isDark) {
    this.classList.add("dark");
    blackContains.forEach((blackContain) => {
      blackContain.classList.remove("bg-black");
      blackContain.classList.add("bg-white");
    });
    darkFixBtns.forEach((darkFixBtn) => {
      darkFixBtn.classList.remove("button-black");
      darkFixBtn.classList.add("button-light");
    });
    localStorage.isDarkMode = true;
  } else {
    this.classList.remove("dark");
    localStorage.isDarkMode = false;
  }
});
if (localStorage.isDarkMode === "true") {
  body.classList.add("dark-theme");
  themeButton.classList.add("dark");
  blackContains.forEach((blackContain) => {
    blackContain.classList.remove("bg-black");
    blackContain.classList.add("bg-white");
  });
  darkFixBtns.forEach((darkFixBtn) => {
    darkFixBtn.classList.remove("button-black");
    darkFixBtn.classList.add("button-light");
  });
}
//theme button action end

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
    // console.log(href);
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
    // console.log(entryId);
    anchorLinks.forEach((ancLink) => {
      // console.log(ancLink.getAttribute("href"));
      const linkHref = ancLink.getAttribute("href");
      ancLink.classList.remove("active");
      if (entryId === linkHref) {
        ancLink.classList.add("active");
      }
    });

    entry.target.classList.toggle("inverse");
    // observer.unobserve(entry.target); bu kod eklendıgınde scroll takıp tek sefer calıstıgı ıcın menude etkili dogru calısmıyor. o yuzden burayı gızlıyoruz.
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

AOS.init({
  once: true,
});

if (typeof jQuery !== "undefined") {
  $(document).ready(function () {
    //custom niceselect initialiaze start
    $(".customSelect").niceSelect();
    // const categorySelect = $(".categorySelect");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  //projelerı filtreleme baslangıc
  const projectItems = document.querySelectorAll(".projectCards .card");

  document
    .querySelectorAll(".nice-select.categorySelect .option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        const selectedValue = this.getAttribute("data-value");
        console.log("secilen:", selectedValue);

        projectItems.forEach((projectItem) => {
          const projectCategory = projectItem.getAttribute("data-category");

          if (selectedValue === "" || projectCategory === selectedValue) {
            projectItem.style.display = "";
          } else {
            projectItem.style.display = "none";
          }
        });
      });
    });
  //projelerı filtreleme bitiş

  //daha fazla göster
  const moreProjectButton = document.querySelector(".moreProjectButton");
  const projectLength = projectItems.length;
  let limit = 6;
  const skip = 6;
  projectItems.forEach((projectItem, index) => {
    if (index < limit) {
      projectItem.style.display = "";
    } else {
      projectItem.style.display = "none";
    }
  });
  moreProjectButton.addEventListener("click", function () {
    limit += skip;

    projectItems.forEach((projectItem, index) => {
      if (index < limit) {
        projectItem.style.display = "";
      }
      if (limit >= projectLength) {
        moreProjectButton.style.display = "none";
      }
    });
  });
});
