(() => {
  "use strict";

  window.customElements.define('app-button', class extends HTMLElement {

    static get observedAttributes() {
      return ['active'];
    }

    get shadow() {
      return this._shadowRoot;
    }

    set callback(f) {
      this._callback = f;
    }

    get callback() {
      return this._callback;
    }

    constructor() {
      super(); // always call super() first in the ctor.
      this._shadowRoot = this.attachShadow({
        mode: 'open'
      });

      this.callback = () => {
        console.log("click");
      };

      this._shadowRoot.appendChild(this._template().content.cloneNode(true));
    }

    connectedCallback() {
      this._shadowRoot.host.addEventListener("click", this.callback);
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {}

    _template() {
      const template = document.currentScript.ownerDocument.querySelector("#template");
      if (template) {
        return template;
      }
      console.warn("no template node defined in " + document.currentScript.ownerDocument.documentURI);
    }
  });
})();
