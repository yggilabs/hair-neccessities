(() => {
  "use strict";

  window.customElements.define('app-slide', class extends HTMLElement {

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
    }

    connectedCallback() {
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
