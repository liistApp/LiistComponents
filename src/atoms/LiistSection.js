import { html, css, LitElement } from 'lit-element';

export class LiistSection extends LitElement {
  static get styles() {
    return css`

      p {
        margin: 0;
      }

      #title {
        font-size: 16px;
        line-height: 140%;
        color: #8687A7;
        /* FOR SOME REASON THE FONT FAMILY DOES NOT APPLY */
        font-family: 'Times New Roman', Times, serif !important;
      }

      slot {
        font-family: 'Times New Roman', serif !important;
      }

      .line {
        width: 100%;
        height: 1.5px;
        background-color: #DBDCEB;
        margin-bottom: 15px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "loading ...";
  }

  render() {
    return html`
      <div class="container">
        <p id="title">${this.title}</p>
        <div class="line"></div>
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('liist-section', LiistSection);
