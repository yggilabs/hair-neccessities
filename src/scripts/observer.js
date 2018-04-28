(() => {
  'use strict';

  module.exports = class Observer {
    static get __callback() {
      return (entries, observer) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const element = entry.target;
          if(ratio > 0.9) {
            const event = new Event('enter');
            element.dispatchEvent(event);
          } else {
            const event = new Event('exit');
            element.dispatchEvent(event);
          }
        });
      };
    }

    constructor(callback = Observer.__callback) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
      };

      this._intersectionObserver = new IntersectionObserver(callback, options);
    }

    observe(element) {
      this._intersectionObserver.observe(element);
    }

    /*
      var elements = document.querySelectorAll(".observable")
      var observer = new Observer()

      elements.forEach((element) => {
        element.addEventListener("enter", () => {
          element.classList.add("active")
        })

        element.addEventListener("exit", () => {
          element.classList.remove("active")
        })

        observer.observe(element)
      })
    */
  };
})();
