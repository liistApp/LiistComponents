import { html, css, LitElement } from 'lit-element';

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
      img.checkmark {
        width: 17px;
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

  checkmarkUrl(color) {
    if (color === "grey") {
      return "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Ficons%2Ficon-check-grey.svg?alt=media&token=3c9ede3b-86bc-455c-87c3-8db7395a857d";
    } else if (color === "white") {
      return "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Ficons%2Ficon-check-white.svg?alt=media&token=73f47906-ec5b-4d24-9324-6f0220cd6505";
    }
    return null;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="circle ${this.checked ? "" : "not-checked"}">
          <img class="checkmark" src="${this.checked ? this.checkmarkUrl("white") : this.checkmarkUrl("grey")}">
        </div>
        <p class="${this.checked ? "" : "not-checked"}" id="text">${this.text}</p>
      </div>
    `;
  }
}

window.customElements.define('liist-check-item', LiistCheckItem);
