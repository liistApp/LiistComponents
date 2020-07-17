import { html, css, LitElement } from 'lit-element';
import { LiistColors } from '../atoms/LiistColors.js'

export class LiistSection extends LitElement {
  static get styles() {
    return css`

      p {
        margin: 0;
      }

      #title {
        font-size: 16px;
        line-height: 140%;
        color: var(--liist-violet60);
        color: var(--liist-hotii);
        /* FOR SOME REASON THE FONT FAMILY DOES NOT APPLY */
        font-family: 'Times New Roman', Times, serif !important;
      }

      slot {
        font-family: 'Times New Roman', serif !important;
      }

      .line {
        width: 100%;
        height: 1.5px;
        /* background-color: var(--liist-violet40); */
        color: red;
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
    LiistColors.initCssVariables();
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
