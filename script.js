const maxMenuScrollWithoutBackground = 100;
const detailsTimeout = 3000;

let lastScrollY = 0;
let firstVisibleDetailLeft = 2;
let firstVisibleDetailRight = 1;
let detailsLength = 0;
let detailsTimeoutId;
let details;
let detailsPanel;
let maxItemsLength;

function setupLogger() {
  const loggers = document.getElementsByClassName("logger");

  if (loggers?.length === 2) {
    loggers[0].innerHTML = window.innerWidth;
    loggers[1].innerHTML = window.innerWidth;
  }
  setTimeout(() => setupLogger(), detailsTimeout);
}

function setupDetails() {
  details = document.getElementsByClassName("detail");
  detailsPanel = document.getElementsByClassName("details")[0];

  moveDetails("LEFT");
}

function moveDetails(direction) {
  clearTimeout(detailsTimeoutId);
  maxItemsLength = Math.max(Math.floor((window.innerWidth - 440) / 300), 0);
  detailsLength = details.length;
  if (direction === "RIGHT") {
    moveDetailsRight();
  } else {
    moveDetailsLeft();
  }
  detailsTimeoutId = setTimeout(() => moveDetails("LEFT"), detailsTimeout);
}

function moveDetailsLeft() {
  if (detailsLength) {
    for (let i = 0; i < details.length; i++) {
      const detail = details.item(i);
      if (
        i < firstVisibleDetailLeft ||
        i > firstVisibleDetailLeft + maxItemsLength
      ) {
        detail.classList.remove("visible-detail");
      } else {
        detail.classList.add("visible-detail");
      }
    }
    detailsPanel.append(details.item(0));
  }
}

function moveDetailsRight() {
  if (detailsLength) {
    detailsPanel.prepend(details.item(detailsLength - 1));
    for (let i = 0; i < details.length; i++) {
      const detail = details.item(i);
      if (
        i < firstVisibleDetailRight ||
        i > firstVisibleDetailRight + maxItemsLength
      ) {
        detail.classList.remove("visible-detail");
      } else {
        detail.classList.add("visible-detail");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupLogger();
  setupDetails();

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

  var faqItems = document.getElementsByClassName("faq-item");
  for (let i = 0; i < faqItems.length; i++) {
    const faqItem = faqItems.item(i);
    faqItem.addEventListener("click", function (event) {
      console.log(event.currentTarget);

      const descriptions =
        event.currentTarget.getElementsByClassName("faq-description");
      const titles = event.currentTarget.getElementsByClassName("faq-title");

      const allDescriptions =
        document.getElementsByClassName("faq-description");
      const allItems = document.getElementsByClassName("faq-item");
      const allTitles = document.getElementsByClassName("faq-title");

      if (allItems.length) {
        for (let i = 0; i < allItems.length; i++) {
          const item = allItems.item(i);
          item.classList.remove("faq-item-clicked");
        }
      }
      if (allTitles.length) {
        for (let i = 0; i < allTitles.length; i++) {
          const title = allTitles.item(i);
          title.classList.remove("faq-title-clicked");
        }
      }
      if (allDescriptions.length) {
        for (let i = 0; i < allDescriptions.length; i++) {
          const description = allDescriptions.item(i);
          description.classList.remove("visible");
          description.classList.remove("faq-description-clicked");
          description.classList.remove("faq-description-clicked-2");
        }
      }
      if (descriptions.length) {
        descriptions[0].classList.add("visible");
        descriptions[0].classList.add("faq-description-clicked-2");

        setTimeout(
          () => descriptions[0].classList.add("faq-description-clicked"),
          0
        );
      }
      if (titles.length) {
        titles[0].classList.add("faq-title-clicked");
      }
      event.currentTarget.classList.add("faq-item-clicked");
    });
  }
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

function openFaqDescription(event) {
  console.log(event.target);
}
