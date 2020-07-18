import { html, css, LitElement } from 'lit-element';
import { LiistColors } from './LiistColors.js';
import { LiistSVGIcons } from './icons/LiistSVGIcons.js';

export class LiistIcon extends LitElement {
  static get styles() {
    return css`
      #icon-container {
        display: inline-block;
        /* border: 1px solid rgba(0,0,0,0.1); */
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
    this.size = "35"
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
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

  getSVGPaths() {
    return this.shadowRoot.querySelectorAll("svg > path");
  }

  setColor(color) {
    const transformedColor = LiistColors.transformColorInput(color);
    this.getSVGPaths().forEach(pathElement => {
      pathElement.setAttribute("fill", transformedColor);
    });
  }

  setSize(size) {
    this.getIconContainer().style.width = `${size}px`;
    this.getIconContainer().style.height = `${size}px`;
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
