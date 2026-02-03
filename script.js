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

const categories = {
  STAGE_1: "I etap",
  STAGE_2: "II etap - instalacja przewodów w domu",
  LAN: "Sieć LAN",
  ALARM: "Alarmy",
};

const formItems = [
  {
    subtitle: "Prace Ziemne",
    category: categories.STAGE_1,
    stage: 0,
    column: 0,
    items: {
      item1: { label: "WLZ - kabel zasilający budynek", checked: false },
      item2: {
        label: "Kable zasilające inne budynki (garaż, wiata)",
        checked: false,
      },
      item3: { label: "Rozdzielnica budowlana", checked: false },
      item4: { label: "Uziom fundamentowy", checked: false },
      item5: { label: "Zasilanie do furtki i bramy wjazdowej", checked: false },
      item6: { label: "pusta rura do furtki i bramy", checked: false },
      item7: { label: "pusta rura na światłowód", checked: false },
      item8: { label: "Zasilanie do pompy wody", checked: false },
      item9: { label: "Zasilanie do oczyszczalni przydomowej", checked: false },
    },
  },
  {
    subtitle: "Ogólne",
    category: categories.STAGE_2,
    stage: 1,
    column: 1,
    items: {
      item1: { label: "przepust kablowy", checked: false },
      item2: {
        label: "rozdzielnica główna",
        checked: false,
      },
      item3: { label: "rozdzielnica piętro", checked: false },
      item4: { label: "główna szyna uziemiająca", checked: false },
      item5: {
        label: "miejscowa szyna uziemiająca w kotłowni",
        checked: false,
      },
    },
  },
  {
    subtitle: "Kuchnia",
    category: categories.STAGE_2,
    stage: 2,
    column: 1,
    items: {
      item1: { label: "kuchenka i piekarnik. Obwód 3 fazowy", checked: false },
      item2: {
        label: "obwód zmywarki",
        checked: false,
      },
      item3: { label: "obwód lodówki", checked: false },
      item4: {
        label:
          "gniazda nad blatem + okap ,młynek, filtr wody, otwieranie szafek",
        checked: false,
      },
      item5: {
        label: "oświetlenie",
        checked: false,
      },
      item6: {
        label: "mikrofalówka",
        checked: false,
      },
      item7: {
        label: "drugi obwód gniazd (np. wyspa, ekspres)",
        checked: false,
      },
      item8: {
        label: "ośw. LED + zasilacz",
        checked: false,
      },
      item9: {
        label: "ogrzewanie podłogowe",
        checked: false,
      },
    },
  },
  {
    subtitle: "Łazienka",
    category: categories.STAGE_2,
    stage: 3,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "obwód pralki", checked: false },
      item3: { label: "obwód suszarki", checked: false },
      item4: { label: "oświetlenie główne + kinkiety", checked: false },
      item5: { label: "ośw. LED + zasilacz", checked: false },
      item6: { label: "miejscowe połączenia wyrównawcze", checked: false },
      item7: { label: "podświetlenie lustra", checked: false },
      item8: { label: "ogrzewanie podłogowe", checked: false },
      item9: { label: "grzałka do grzejnika", checked: false },
    },
  },
  {
    subtitle: "Salon",
    category: categories.STAGE_2,
    stage: 4,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
      item3: {
        label: "oświetlenie dekoracyjne (kinkiety, lampy stojące)",
        checked: false,
      },
      item4: { label: "gniazdo wielokrotne do TV", checked: false },
      item5: { label: "przepust instalacyjny do TV", checked: false },
      item6: {
        label: "przepust instalacyjny do rzutnika (hdmi)",
        checked: false,
      },
      item7: { label: "gniazdo do rzutnika", checked: false },
      item8: { label: "elektryczna winda do rzutnika", checked: false },
      item9: { label: "przewody głośnikowe", checked: false },
      item10: { label: "rolety", checked: false },
      item11: { label: "firanki elektryczne", checked: false },
    },
  },
  {
    subtitle: "Jadalnia",
    category: categories.STAGE_2,
    stage: 5,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
      item3: {
        label: "oświetlenie dekoracyjne (kinkiety, lampy stojące)",
        checked: false,
      },
      item4: { label: "rolety", checked: false },
      item5: { label: "firanki elektryczne", checked: false },
    },
  },
  {
    subtitle: "Sypialnia Małżeńska",
    category: categories.STAGE_2,
    stage: 6,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
      item3: {
        label: "gniazdo, kinkiet, włącznik schodowy przy łóżku x2",
        checked: false,
      },
      item4: { label: "rolety", checked: false },
      item5: { label: "firanki elektryczne", checked: false },
      item6: {
        label: "gniazdo i oświetlenie toaletka/ biurko",
        checked: false,
      },
      item7: { label: "gniazdo wielokrotne za TV", checked: false },
      item8: { label: "przepust instalacyjny do TV", checked: false },
    },
  },
  {
    subtitle: "Sypialnia",
    category: categories.STAGE_2,
    stage: 7,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
      item3: { label: "gniazdo wielokrotne przy biurku", checked: false },
      item4: {
        label: "gniazdo, kinkiet, włącznik schodowy przy łóżku",
        checked: false,
      },
      item5: { label: "rolety", checked: false },
      item6: { label: "firanki elektryczne", checked: false },
    },
  },
  {
    subtitle: "Garderoba",
    category: categories.STAGE_2,
    stage: 8,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
    },
  },
  {
    subtitle: "Kotłownia",
    category: categories.STAGE_2,
    stage: 9,
    column: 1,
    items: {
      item1: { label: "gniazda", checked: false },
      item2: { label: "oświetlenie", checked: false },
      item3: { label: "zasilanie pieca", checked: false },
      item4: { label: "miejscowe połącznia wyrównawcze", checked: false },
      item5: {
        label: "rurka na czujnik do pieca (na zewnątrz budynku)",
        checked: false,
      },
      item6: { label: "zasilanie rozdzielaczy do podłogówki", checked: false },
      item7: { label: "czujniki temperatury do podłogówki", checked: false },
      item8: { label: "zasilanie pompy ciepła", checked: false },
    },
  },
  {
    subtitle: "Schody",
    category: categories.STAGE_2,
    stage: 10,
    column: 1,
    items: {
      item1: { label: "oświetlenie główne", checked: false },
      item2: { label: "oświetlenie stopni", checked: false },
      item3: { label: "oświetlenie korytarza", checked: false },
      item4: {
        label: "podświetlenie LED stopni schodów na czujnik",
        checked: false,
      },
    },
  },
  {
    subtitle: "Wiatrołap",
    category: categories.STAGE_2,
    stage: 11,
    column: 1,
    items: {
      item1: { label: "oświetlenie", checked: false },
      item2: { label: "oświetlenie przed wejściem", checked: false },
      item3: { label: "zasilanie wideo domofonu", checked: false },
      item4: { label: "dzwonek", checked: false },
    },
  },
  {
    subtitle: "Garaż",
    category: categories.STAGE_2,
    stage: 12,
    column: 1,
    items: {
      item1: { label: "oświetlenie", checked: false },
      item2: { label: "gniazda", checked: false },
      item3: { label: "gniazdo do ładowarki samochodu", checked: false },
      item4: { label: "zasilanie bramy garażowej", checked: false },
      item5: { label: "czujniki do bramy garażowej", checked: false },
    },
  },
  {
    subtitle: "Zewnętrzne",
    category: categories.STAGE_2,
    stage: 13,
    column: 1,
    items: {
      item1: { label: "gniazda taras", checked: false },
      item2: { label: "oświetlenie tarasu", checked: false },
      item3: {
        label: "gniazda wyłączane z domu (przycisk, stycznik)",
        checked: false,
      },
      item4: {
        label: "gniazda przy podbitce (oświetlenie świąteczne)",
        checked: false,
      },
      item5: { label: "oświetlenie podjazdu", checked: false },
      item6: { label: "oświetlenie elewacji", checked: false },
      item7: { label: "oświetlenie ogród", checked: false },
      item8: { label: "gniazda w ogrodzie", checked: false },
    },
  },
  {
    subtitle: "Inne",
    category: categories.STAGE_2,
    stage: 14,
    column: 1,
    items: {
      item1: { label: "gniazda korytarz", checked: false },
      item2: { label: "rekuperator", checked: false },
      item3: { label: "klimatyzacja", checked: false },
    },
  },
  {
    subtitle: "Ogólne",
    category: categories.LAN,
    stage: 15,
    column: 0,
    items: {
      item1: { label: "wideo domofon ip - monitor", checked: false },
      item2: { label: "wideo domofon ip - monitor 2", checked: false },
      item3: { label: "wideo domofon ip - panel wejściowy", checked: false },
      item4: { label: "pompa ciepła", checked: false },
      item5: { label: "fotowoltaika - inwerter", checked: false },
      item6: { label: "rozdzielnica multimedialna", checked: false },
      item7: { label: "szafa typu RACK", checked: false },
    },
  },
  {
    subtitle: "Internet",
    category: categories.LAN,
    stage: 16,
    column: 0,
    items: {
      item1: { label: "salon TV", checked: false },
      item2: { label: "sypialnia TV", checked: false },
      item3: { label: "pokoje", checked: false },
      item4: { label: "punkty dostępowe WiFi", checked: false },
      item5: { label: "centrala alarmowa", checked: false },
    },
  },
  {
    subtitle: "Monitoring",
    category: categories.LAN,
    stage: 17,
    column: 0,
    items: {
      item1: { label: "wejście", checked: false },
      item2: { label: "podjazd", checked: false },
      item3: { label: "brama garażowa", checked: false },
      item4: { label: "elewacja domu", checked: false },
      item5: { label: "ogród", checked: false },
      item6: { label: "podgląd obrazu z rejestratora", checked: false },
    },
  },
  {
    subtitle: "Inne",
    category: categories.LAN,
    stage: 18,
    column: 0,
    items: {
      item1: { label: "mikro rurka na światłowód", checked: false },
    },
  },
  {
    subtitle: "Ogólne",
    category: categories.ALARM,
    stage: 19,
    column: 0,
    items: {
      item1: { label: "centrala alarmowa", checked: false },
      item2: {
        label: "manipulator",
        checked: false,
      },
      item3: { label: "zawór wody", checked: false },
    },
  },
  {
    subtitle: "Czujki Ruchu",
    category: categories.ALARM,
    stage: 20,
    column: 0,
    items: {
      item1: { label: "wejście", checked: false },
      item2: { label: "salon", checked: false },
      item3: { label: "kuchnia", checked: false },
      item4: { label: "jadalnia", checked: false },
      item5: { label: "sypialnia", checked: false },
      item6: { label: "pokoje", checked: false },
      item7: { label: "łazienka", checked: false },
      item8: { label: "korytarz", checked: false },
      item9: { label: "poddasze", checked: false },
    },
  },
  {
    subtitle: "Kontaktrony okna",
    category: categories.ALARM,
    stage: 21,
    column: 0,
    items: {
      item1: { label: "wejście", checked: false },
      item2: { label: "salon", checked: false },
      item3: { label: "kuchnia", checked: false },
      item4: { label: "jadalnia", checked: false },
      item5: { label: "sypialnia", checked: false },
      item6: { label: "pokoje", checked: false },
      item7: { label: "łazienka", checked: false },
      item8: { label: "korytarz", checked: false },
      item9: { label: "poddasze", checked: false },
    },
  },
  {
    subtitle: "Czujki Wody",
    category: categories.ALARM,
    stage: 22,
    column: 0,
    items: {
      item1: { label: "kuchnia", checked: false },
      item2: { label: "łazienka", checked: false },
      item3: { label: "łazienka", checked: false },
      item4: { label: "kotłownia", checked: false },
    },
  },
];

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

function setupForm() {
  const formBodyLeft = document.getElementsByClassName("form-body-left")[0];
  const formBodyRight = document.getElementsByClassName("form-body-right")[0];
  formBodyLeft.replaceChildren();
  formBodyRight.replaceChildren();

  const usedCategories = new Set();

  formItems.forEach((formItem) => {
    const formSubtitle = document.createElement("div");
    const formDetails = document.createElement("div");
    const formWrapper = document.createElement("div");
    formSubtitle.classList.add("form-subtitle");
    formDetails.classList.add("form-details");

    formDetails.id = `form-details-${formItem.stage}`;

    if (formItem.subtitle) {
      const arrow = document.createElement("div");
      arrow.classList.add("material-symbols-rounded");
      arrow.classList.add("arrow");

      if (formItem.stage === 0) {
        arrow.classList.add("arrow-rotated");
      }
      arrow.append("keyboard_arrow_right");
      const text = document.createElement("div");
      text.append(formItem.subtitle);
      formSubtitle.append(arrow);
      formSubtitle.append(text);
    }
    formSubtitle.onclick = (event) => {
      const details = document.getElementsByClassName("form-details");
      const arrows = document.getElementsByClassName("arrow");

      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        if (!detail?.classList?.contains("visibility-hidden")) {
          detail.classList.add("visibility-hidden");
        }
      }
      for (let i = 0; i < arrows.length; i++) {
        const arrow = arrows[i];
        arrow.classList.remove("arrow-rotated");
      }
      const currentDetails = event.currentTarget.nextElementSibling;
      currentDetails.classList.remove("visibility-hidden");
      const currentArrow =
        event.currentTarget.getElementsByClassName("arrow")[0];
      currentArrow.classList.add("arrow-rotated");
    };

    if (formItem.stage === 0) {
      formDetails.classList.remove("visibility-hidden");
    } else {
      formDetails.classList.add("visibility-hidden");
    }

    Object.keys(formItem.items).forEach((key) => {
      const item = formItem.items[key];
      let div = document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");
      label.htmlFor = key;
      label.append(item.label);
      input.type = "checkbox";
      input.checked = item.checked;
      input.id = key;
      div.append(input);
      div.append(label);
      div.classList.add("form-checkbox");
      div.onclick = (ev) => {
        ev.preventDefault();
        const clickedInput = ev.currentTarget.firstChild;
        const clickedFormItem = formItem.items[clickedInput.id];
        clickedInput.checked = !clickedFormItem.checked;
        clickedFormItem.checked = !clickedFormItem.checked;
      };
      formDetails.append(div);
    });

    if (!usedCategories.has(formItem.category)) {
      usedCategories.add(formItem.category);
      const formCategory = document.createElement("div");
      formCategory.classList.add("form-category");
      formCategory.append(formItem.category);

      if (formItem.column === 0) {
        formBodyLeft.append(formCategory);
      } else {
        formBodyRight.append(formCategory);
      }
    }

    formWrapper.append(formSubtitle);
    formWrapper.append(formDetails);
    if (formItem.column === 0) {
      formBodyLeft.append(formWrapper);
    } else {
      formBodyRight.append(formWrapper);
    }
  });
}

function setupPrint() {
  const formBodyLeft = document.getElementsByClassName("print-body-left")[0];
  const formBodyRight = document.getElementsByClassName("print-body-right")[0];
  formBodyLeft.replaceChildren();
  formBodyRight.replaceChildren();

  const usedCategories = new Set();

  formItems.forEach((formItem) => {
    const formSubtitle = document.createElement("div");
    const formDetails = document.createElement("div");
    const formWrapper = document.createElement("div");
    formSubtitle.classList.add("print-subtitle");
    formDetails.classList.add("print-details");
    formWrapper.classList.add("print-wrapper");

    formDetails.id = `print-details-${formItem.stage}`;

    if (formItem.subtitle) {
      const text = document.createElement("div");
      text.append(formItem.subtitle);
      formSubtitle.append(text);
    }

    Object.keys(formItem.items).forEach((key) => {
      const item = formItem.items[key];
      let div = document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");
      label.htmlFor = key;
      label.append(item.label);
      input.type = "checkbox";
      input.checked = item.checked;
      input.id = key;
      div.append(input);
      div.append(label);
      div.classList.add("print-checkbox");
      div.onclick = (ev) => {
        ev.preventDefault();
        const clickedInput = ev.currentTarget.firstChild;
        const clickedFormItem = formItem.items[clickedInput.id];
        clickedInput.checked = !clickedFormItem.checked;
        clickedFormItem.checked = !clickedFormItem.checked;
      };
      formDetails.append(div);
    });

    if (!usedCategories.has(formItem.category)) {
      usedCategories.add(formItem.category);
      const formCategory = document.createElement("div");
      formCategory.classList.add("print-category");
      formCategory.append(formItem.category);

      if (formItem.column === 0) {
        formBodyLeft.append(formCategory);
      } else {
        formBodyRight.append(formCategory);
      }
    }

    formWrapper.append(formSubtitle);
    formWrapper.append(formDetails);
    if (formItem.column === 0) {
      formBodyLeft.append(formWrapper);
    } else {
      formBodyRight.append(formWrapper);
    }
  });
}

function printForm() {
  setupPrint();
  window.print();
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
  setupForm();

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
          0,
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

function openModalInstallations() {
  const modal = document.getElementById("modal-installations");
  if (modal?.classList?.contains("hide")) {
    modal.classList.remove("hide");
  }
}

function openModalSmartHome() {
  const modal = document.getElementById("modal-smart-home");
  if (modal?.classList?.contains("hide")) {
    modal.classList.remove("hide");
  }
}

function openModalMonitoring() {
  const modal = document.getElementById("modal-monitoring");
  if (modal?.classList?.contains("hide")) {
    modal.classList.remove("hide");
  }
}

function openModalLan() {
  const modal = document.getElementById("modal-lan");
  if (modal?.classList?.contains("hide")) {
    modal.classList.remove("hide");
  }
}

function hideModals() {
  const modals = document.getElementsByClassName("modal");

  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i];
    if (!modal?.classList?.contains("hide")) {
      modal.classList.add("hide");
    }
  }
}
