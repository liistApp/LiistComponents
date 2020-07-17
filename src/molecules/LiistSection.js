import { html, css, LitElement } from 'lit-element';
import { LiistColors } from '../atoms/LiistColors.js'

export class LiistSection extends LitElement {
  static get styles() {
    return css`

      p {
        margin: 0;
        margin-bottom: 3px;
      }

      #title {
        font-family: var(--liist-main-font);
        font-weight: 500;
        font-size: 15px;
        line-height: 140%;
        color: var(--liist-viiolet60);
      }

      .line {
        width: 100%;
        height: 1px;
        background-color: var(--liist-viiolet40);
        margin-bottom: 15px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      width: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "loading ...";
    this.width = "100%";
  }

  render() {
    return html`
      <div class="container" style="width: ${this.width}">
        <p id="title">${this.title}</p>
        <div class="line"></div>
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('liist-section', LiistSection);
