const maxMenuScrollWithoutBackground = 100;
let lastScrollY = 0;

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (
      window.scrollY > maxMenuScrollWithoutBackground &&
      lastScrollY <= maxMenuScrollWithoutBackground
    ) {
      document.getElementById("main-menu").classList.add("menu-scrolled");
    }
    if (
      window.scrollY <= maxMenuScrollWithoutBackground &&
      lastScrollY > maxMenuScrollWithoutBackground
    ) {
      document.getElementById("main-menu").classList.remove("menu-scrolled");
    }
    lastScrollY = window.scrollY;
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function toggleMenu() {
  const optionsElement = document.getElementById("main-menu-hamburger-options");
  if (optionsElement?.classList?.contains("visible")) {
    optionsElement.classList.remove("visible");
  } else {
    optionsElement.classList.add("visible");
  }
}

function hideMenu() {
  const optionsElement = document.getElementById("main-menu-hamburger-options");
  if (optionsElement?.classList?.contains("visible")) {
    optionsElement.classList.remove("visible");
  }
}
