import { LitElement, html, css } from 'lit-element';
import { LiistCheckItem } from '../molecules/LiistCheckItem.js';
import { LiistToggleBttn } from '../molecules/LiistToggleBttn.js';

export class LiistDaadFilter extends LitElement {
  static get properties() {
    return {
      serviceTypes: {
        type: Array
      },
      categories: {
        type: Array
      },
      device: {
        type: String
      }
    }
  }

  // no need for constructor?
  constructor() {
    super();
    this.device = "desktop";
    this.serviceTypes = [
      "delivery",
      "take-out / curbsite",
      "giftcard"
    ];
    this.categories = [
      "Alcohol",
      "American",
      "Bakery/Dessert",
      "BBQ",
      "Brazilian",
      "Breakfast",
      "Caribbean",
      "Chinese",
      "Coffee",
      "Deli",
      "Fast Food",
      "Filipino",
      "French",
      "Hawaiian",
      "Healthy",
      "Indian",
      "Italian",
      "Japanese",
      "Korean",
      "Lebanese",
      "Malaysian",
      "Mediterranean",
      "Mexican",
      "Persian",
      "Pizza",
      "Polish",
      "Pub",
      "Salvadoran",
      "Seafood",
      "Sushi",
      "Taiwanese",
      "Tapas",
      "Thai",
      "Vegan",
      "Vegetarian",
      "Vietnamese",
    ]
  }

  setCategories(array) {
    this.categories = array;
    this.requestUpdate();
    this.getDomElements();
  }

  setServiceTypes(array) {
    this.serviceTypes = array;
    this.requestUpdate();
    this.getDomElements();
  }

  getSelectedCategories() {
    const result = [];
    this.checkItemEls.forEach(checkItemEl => {
      if (checkItemEl.checked) {
        result.push(checkItemEl.text);
      }
    })
    return result;
  }

  getSelectedServiceTypes() {
    const result = [];
    this.toggleBttnEls.forEach(toggleBttnEl => {
      if (toggleBttnEl.checked) {
        result.push(toggleBttnEl.text);
      }
    })
    return result;
  }

  firstUpdated() {
    this.getDomElements();
  }

  dispatchCancelEvent() { // mobile
    if (this.device === "mobile") {
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('liist-daad-filter-action', {
        bubbles: true,
        detail: {
          action: "cancel",
          selected: {
            categories: this.getSelectedCategories(),
            serviceTypes: this.getSelectedServiceTypes(),
          }
        }
      }));
    }
  }

  dispatchApplyEvent() { // mobile
    if (this.device === "mobile") {
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('liist-daad-filter-action', {
        bubbles: true,
        detail: {
          action: "apply",
          selected: {
            categories: this.getSelectedCategories(),
            serviceTypes: this.getSelectedServiceTypes(),
          }
        }
      }));
    }
  }

  dispatchFilterChangedEvent() { // desktop only
    if (this.device === "desktop") {
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('liist-daad-filter-changed', {
        bubbles: true,
        detail: {
          selected: {
            categories: this.getSelectedCategories(),
            serviceTypes: this.getSelectedServiceTypes(),
          }
        }
      }));
    }
  }

  getDevice() {
    return this.device;
  }

  getDomElements() {
    this.toggleBttnEls = this.shadowRoot.querySelectorAll("liist-toggle-bttn");
    this.checkItemEls = this.shadowRoot.querySelectorAll("liist-check-item");
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header ${this.device === "desktop" ? "desktop" : "mobile"}">
          ${this.device === "desktop" ?
            html`
              <div style="display: flex; justify-content: center; align-items: center;">
                <liist-daad-bttn
                  type="filter"
                  size="small"
                ></liist-daad-bttn>
              </div>
              <div id="horizontal-line"></div>
            ` :
            html`
              <p class="mobile-bttn cancel-bttn" @click="${this.dispatchCancelEvent}">Cancel</p>
              <liist-daad-bttn
                type="filter"
                size="small"
              ></liist-daad-bttn>
              <p class="mobile-bttn apply-bttn" @click="${this.dispatchApplyEvent}">Apply</p>
            `}
        </div>
        <div class="toggle-bttns-container">
          <div>
            ${this.serviceTypes.map(serviceType => {
              return html`
                <br>
                <liist-toggle-bttn @click="${this.dispatchFilterChangedEvent}"
                  text="${serviceType}"
                ></liist-toggle-bttn>
              `;
            })}
          </div>
        </div>
        <div class="check-items-container">
          ${this.categories.map(category => {
            return html`
              <liist-check-item @click="${this.dispatchFilterChangedEvent}"
                text="${category}"
              ></liist-check-item>
            `;
          })}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .mobile-bttn {
        font-family: "DM Sans", sans-serif;
        cursor: pointer;
      }
      .mobile-bttn.apply-bttn {
        color: #3367C1;
      }
      #horizontal-line {
        border: 0.5px solid rgba(0,0,0,0.1);
        position: absolute;
        width: 100%;
        top: 22px;
        z-index: -1;
      }
      .header.desktop {
        position: relative;
      }
      .header.mobile {
        display: flex;
        position: sticky;
        top: 0;
        background-color: white;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding-bottom: 7px;
        margin-bottom: 7px;
      }
      .wrapper {
        min-width: 350px;
        max-width: 450px;
        min-height: 500px;
        width: 100%;
      }
      .toggle-bttns-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
      }
      .check-items-container {
        padding-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      liist-toggle-bttn {
        margin: 0 auto;
        display: inline;
        text-align: center;
      }
    `;
  }
}

customElements.define('liist-daad-filter', LiistDaadFilter);

