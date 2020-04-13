import { html, css, LitElement } from 'lit-element';

export class LiistToggleBttn extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: "Helvetica", serif;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
      }
      .wrapper {
        height: 47px;
        width: 100%;
        // min-width: 330px;
        // max-width: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        border: 1px solid #D2D2D2;
      }
      .wrapper.checked {
        background-color: #3367C1;
        border: 1px solid #3367C1;
      }
      #text {
        font-style: normal;
        font-weight: bold;
        line-height: 12px;
        text-align: center;
        letter-spacing: 1.52px;
        text-transform: uppercase;
        color: #979797;
      }
      #text.checked {
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      checked: { type: Boolean },
      width: { type: Number },
    };
  }

  toggleState() {
    this.checked = !this.checked;
  }

  firstUpdated() {
    this.shadowRoot.querySelector(".wrapper").addEventListener("click", () => {
      this.toggleState();
    });
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
    this.setWidth(this.width);
  }

  setWidth(width) {
    this.shadowRoot.querySelector(".wrapper").style.width = `${width}px`;
  }

  render() {
    return html`
      <div class="wrapper ${this.checked ? "checked" : ""}">
        <p id="text" class="${this.checked ? "checked" : ""}">${this.text}</p>
      </div>
    `;
  }
}

window.customElements.define('liist-toggle-bttn', LiistToggleBttn);
