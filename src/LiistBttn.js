import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistBttn extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: "Helvetica", serif;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
      }
      #wrapper {
        display: inline-block;
      }
      .bttn {
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        max-width: 165px;
        border-radius: 8px
      }
      p#text {
        padding-right: 10px;
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      faSpec: { type: String },
      bgColor: { type: String },
      color: { type: String },
    };
  }

  constructor() {
    super();
    this.bgColor = "black";
    this.color = "white";
    this.text = "loading ...";
    this.faSpec = "far fa-question-circle"
  }

  render() {
    return html`
      <div id="wrapper">
        <div class="bttn" style="background-color: ${this.bgColor}; color: ${this.color}">
          <p id="text">${this.text}</p>
          <fa-icon class="${this.faSpec}" style="display: flex; justify-content: center; align-items: center;" size="14px"></fa-icon>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-bttn', LiistBttn);
