import { html, css, LitElement } from 'lit-element';
import { LiistColors } from '../atoms/LiistColors.js';

export class LiistTag extends LitElement {
  static get styles() {
    return css`
      #tag-container {
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      liist-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      icon: { type: String },
      theme: { type: String },
      size: { type: String },
    };
  }

  constructor() {
    super();
    this.icon = "pin";
    this.theme = "viiolet80";
    this.size = "42px";
  }

  render() {
    let color = LiistColors.transformColorInput(LiistColors.getTheme(this.theme).color);
    let bgColor = LiistColors.transformColorInput(LiistColors.getTheme(this.theme).bgColor);
    return html`
      <div id="tag-container" style="background-color: ${bgColor}; width:${this.size}; height:${this.size}">
        <liist-icon icon="${this.icon}" color="${color}" size="77.8%"></liist-icon>
      </div>
    `;
  }
}

window.customElements.define('liist-tag', LiistTag);
