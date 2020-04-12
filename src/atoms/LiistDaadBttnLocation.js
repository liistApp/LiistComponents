import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistDaadBttnLocation extends LitElement {
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
      ${this.type === "filtering" ?
        html`<p>Render some HTML if myBool is true</p>` : this.type === "navigation" ?
        html`<p>Render some other HTML if myBool is false</p>` :
        html``
      }`;
  }

  renderNaigation() {

  }
}

window.customElements.define('liist-daad-bttn-location', LiistDaadBttnLocation);
