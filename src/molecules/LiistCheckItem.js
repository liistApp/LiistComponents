import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistCheckItem extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: "Helvetica", serif;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
      }
      .wrapper {
        display: flex;
        align-items: center;
      }
      .circle {
        width: 29px;
        height: 29px;
        background-color: #3367C1;
        border: 1px solid #3367C1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 50%;
      }
      .circle.not-checked {
        background-color: white;
        border: 1px solid #D2D2D2;
      }
      #text {
        text-transform: uppercase;
        font-family: Montserrat, sans-serif;
        font-style: normal;
        font-weight: bold;
        line-height: 12px;
        letter-spacing: 1.52px;
        text-transform: uppercase;
        color: #3367C1;
      }
      #text.not-checked {
        color: #979797;
      }
      fa-icon {
        margin-top: 4px !important;
        color: white;
      }
      fa-icon.not-checked {
        margin-top: 4px !important;
        color: #D2D2D2;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      checked: { type: Boolean },
    };
  }

  toggleState() {
    this.checked = !this.checked;
  }

  constructor() {
    super();
    this.checked = false;
    this.text = "default";
  }

  firstUpdated() {
    this.shadowRoot.querySelector(".wrapper").addEventListener("click", () => {
      this.toggleState();
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="circle ${this.checked ? "" : "not-checked"}">
          <fa-icon class="fas fa-check ${this.checked ? "" : "not-checked"}" size="18px"></fa-icon>
        </div>
        <p class="${this.checked ? "" : "not-checked"}" id="text">${this.text}</p>
      </div>
    `;
  }
}

window.customElements.define('liist-check-item', LiistCheckItem);
