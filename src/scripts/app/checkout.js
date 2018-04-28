(() => {
  "use strict";

  window.customElements.define('app-checkout', class extends HTMLElement {

    static get observedAttributes() {
      return ['active'];
    }

    get shadow() {
      return this._shadowRoot;
    }

    constructor() {
      super(); // always call super() first in the ctor.
      this.appendChild(this._template().content.cloneNode(true));
      this._init = this._init.bind(this);
    }

    connectedCallback() {
      this._init();
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

    _init() {
      var handler = StripeCheckout.configure({
        key: 'pk_test_QNhqGRgedUlFdZuPIbgqwyfd',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: function(token) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
        }
      });

      this.shadow.querySelector('#customButton').addEventListener('click', function(e) {
        // Open Checkout with further options:
        handler.open({
          name: 'Demo Site',
          description: '2 widgets',
          amount: 2000
        });
        e.preventDefault();
      });

      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });
    }

  });
})();
