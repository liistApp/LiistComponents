import { LitElement, html, css } from 'lit-element';

export class LiistDaadContentFiltering extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    }
  }

  // no need for constructor?
  constructor() {
    super();
    this.title = "placeholder";
  }

  render() {
    return html`
    `;
  }

  static get styles() {
    return css`
    `;
  }
}

customElements.define('liist-daad-content-filtering', LiistDaadContentFiltering);

