import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistBttnV2 extends LitElement {
  static get styles() {
    return css`

    p {
      font-size: 17px;
    }

    .container {
    }

    .button {
      height: 50px;
      width: 100%;
      border-radius: 6px;
      background-color: #4F51C2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button:hover{
      cursor: pointer;
    }

    `;
  }

  static get properties() {
    return {
      text: { type: String },
      color: { type: String },
      bgColor: { type: String },
      width: { type: String },
    };
  }

  constructor() {
    super();
    this.color = "grey";
    this.bgColor = "#ccc";
    this.width = "25";

  }

  render() {
    return html`
      <div class="container">
        <div class="button" style="width:${this.width}%; background-color: ${this.bgColor};">
          <p style="color:${this.color}"><slot name="text">loading ...</slot></p>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-bttn-v2', LiistBttnV2);

