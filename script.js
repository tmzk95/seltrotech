const maxMenuScrollWithoutBackground = 400;
let lastScrollY = 0;

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (
      window.scrollY > maxMenuScrollWithoutBackground &&
      lastScrollY <= maxMenuScrollWithoutBackground
    ) {
      document.getElementById("main-menu").classList.add("menu-scrolled");
      // add padding top to show content behind navbar
      // navbar_height = document.querySelector(".navbar").offsetHeight;
      // document.body.style.paddingTop = navbar_height + "px";
    }
    if (
      window.scrollY <= maxMenuScrollWithoutBackground &&
      lastScrollY > maxMenuScrollWithoutBackground
    ) {
      document.getElementById("main-menu").classList.remove("menu-scrolled");
      // remove padding top from body
      // document.body.style.paddingTop = "0";
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
