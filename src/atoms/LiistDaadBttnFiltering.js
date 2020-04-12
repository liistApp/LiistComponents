import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistDaadBttnFiltering extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      type: { type: String },
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
      <div>
      </div>
    `;
  }

  renderNaigation() {

  }
}

window.customElements.define('liist-daad-bttn-filtering', LiistDaadBttnFiltering);
