(() => {
  'use strict';

  const Observer = require("./observer.js");

  const elements = document.querySelectorAll(".observable");
  const observer = new Observer();

  elements.forEach((element) => {
    element.addEventListener("enter", () => {
      element.classList.add("active");
    });

    element.addEventListener("exit", () => {
      element.classList.remove("active");
    });

    observer.observe(element);
  });
})();
