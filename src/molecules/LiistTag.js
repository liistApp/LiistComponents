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
      size: { type: String },
      theme: { type: String },
      bgColor: { type: String },
      color: { type: String },
    };
  }

  constructor() {
    super();
    this.icon = "pin";
    this.size = "42px";
    this.theme = undefined;
    this.bgColor = undefined;
    this.color = undefined;
  }

  render() {
    let color, bgColor;
    if (!this.theme && !this.color && !this.bgColor) {
      this.theme = "viiolet80";
    }
    if (this.bgColor) {
      bgColor = this.bgColor;
    }
    if (this.color) {
      color = this.color;
    }
    // theme overrides
    if (this.theme) {
      color = LiistColors.transformColorInput(LiistColors.getTheme(this.theme).color);
      bgColor = LiistColors.transformColorInput(LiistColors.getTheme(this.theme).bgColor);
    }
    return html`
      <div id="tag-container" style="background-color: ${bgColor}; width:${this.size}; height:${this.size}">
        <liist-icon icon="${this.icon}" color="${color}" size="77.8%"></liist-icon>
      </div>
    `;
  }
}

window.customElements.define('liist-tag', LiistTag);
