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

    _input() {
      // Custom styling can be passed to options when creating an Element.
      const style = {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: "#32325d",
        },
      };

      // Create an instance of the card Element.
      const card = elements.create('card', {style});

      const stripeTokenHandler = (token) => {
        // Insert the token ID into the form so it gets submitted to the server
        const form = document.getElementById('payment-form');
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        // Submit the form
        form.submit();
      };

      // Create a token or display an error when the form is submitted.
      const form = document.getElementById('payment-form');

      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element');

      card.addEventListener('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
          displayError.textContent = error.message;
        } else {
          displayError.textContent = '';
        }
      });

      form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the customer that there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server.
            stripeTokenHandler(result.token);
          }
        });
      });
    }

  });
})();