(() => {
  "use strict";

  window.customElements.define('app-carousel', class extends HTMLElement {

    static get observedAttributes() {
      return ['active'];
    }

    get shadow() {
      return this._shadowRoot;
    }

    constructor() {
      super(); // always call super() first in the ctor.
      this._shadowRoot = this.attachShadow({
        mode: 'open'
      });
      this._shadowRoot.appendChild(this._template().content.cloneNode(true));
      this._init = this._init.bind(this);
    }

    connectedCallback() {
      this._init();
    }

    disconnectedCallback() {
      this.classList.remove('is-connected');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {}

    _template() {
      const template = document.currentScript.ownerDocument.querySelector("#template");
      if (template) {
        return template;
      }
      console.warn("no template node defined in " + document.currentScript.ownerDocument.documentURI);
    }

    _init() {
      const carousel = this.shadow.host;

      const mod = (n, m) => { return ((n % m) + m) % m; };

      carousel._calc = (forward) => {
        const infinite = false;
        if(infinite) {
            return mod(index + 1, count);
        }
        return;
      };

      carousel._next = (forward = true, infinite = false) => {
        const count = carousel.querySelectorAll("app-slide").length;
        const index = parseInt(getComputedStyle(carousel).getPropertyValue("--index"));
        const next = Math.min(index + 1, count - 1);
        carousel.style.setProperty("--index", next);
      };

      carousel._prev = () => {
        const count = carousel.querySelectorAll("app-slide").length;
        const index = parseInt(getComputedStyle(carousel).getPropertyValue("--index"));
        const next = Math.max(index - 1, 0);
        carousel.style.setProperty("--index", next);
      };

      const date = new Date();
      const swipe = {
        max_time: 1000,
        min_move: 50,
        listen_start: e => {
          const touch = e.changedTouches[0];
          swipe.t = date.getTime();
          swipe.x = touch.pageX;
          swipe.y = touch.pageY;
        },
        listen_end: e => {
          const touch = e.changedTouches[0];

          const dt = date.getTime() - swipe.t;
          const dx = touch.pageX - swipe.x;
          const dy = touch.pageY - swipe.y;

          if(dt < swipe.max_time && dx > swipe.min_move) carousel._prev();
          if(dt < swipe.max_time && dx < -swipe.min_move) carousel._next();

          swipe.t = 0;
          swipe.x = 0;
          swipe.y = 0;
        }
      };

      carousel.addEventListener("touchstart", swipe.listen_start, {passive: true});
      carousel.addEventListener("touchend", swipe.listen_end, {passive: true});
    }
  });
})();
