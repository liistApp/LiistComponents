import { html, css, LitElement } from 'lit-element';
import { LiistColors } from './LiistColors.js';
import { LiistSVGIcons } from './icons/LiistSVGIcons.js';

export class LiistIcon extends LitElement {
  static get styles() {
    return css`
      #icon-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      icon: { type: String },
      color: { type: String },
      size: { type: String }
    };
  }

  constructor() {
    super();
    this.icon = "pin";
    this.color = "smokii";
    this.size = "35px";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated() {
    this.getIconContainer().innerHTML = LiistSVGIcons[this.icon];
    this.setColor(this.color);
    this.setSize(this.size);
  }

  getIconContainer() {
    return this.shadowRoot.getElementById("icon-container");
  }

  getSVG() {
    return this.shadowRoot.querySelector("svg");
  }

  getFillPaths() {
    return this.shadowRoot.querySelectorAll("svg path, svg .fill-me-up");
  }
  getFillStrokePaths() {
    return this.shadowRoot.querySelectorAll("svg .fill-my-stroke");
  }

  setColor(color) {
    const transformedColor = LiistColors.transformColorInput(color);
    this.getFillPaths().forEach(elementToFill => {
      elementToFill.setAttribute("fill", transformedColor);
    });
    this.getFillStrokePaths().forEach(elementToFillStroke => {
      elementToFillStroke.setAttribute("stroke", transformedColor);
    });
  }

  setSize(size) {
    this.getIconContainer().style.width = size;
    this.getIconContainer().style.height = size;
    this.getSVG().setAttribute("width", size);
    this.getSVG().setAttribute("height", size);
  }

  render() {
    return html`
      <div id="icon-container"></div>
    `;
  }
}

window.customElements.define('liist-icon', LiistIcon);
