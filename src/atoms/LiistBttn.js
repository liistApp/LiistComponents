import { html, css, LitElement } from 'lit-element';
import { LiistColors } from './LiistColors';
import './LiistIcon';

export class LiistBttn extends LitElement {
  static get styles() {
    return css`
      p {
        font-size: 15px;
        line-height: 15px;
        margin: 0;
        font-weight: bold;
        padding-left: 10px;
        padding-right: 10px;
      }

      a {
        text-decoration: none;
        cursor: default;
      }

      .button {
        font-family: var(--liist-main-font);
        height: 50px;
        width: 100%;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .button > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        margin-right: 5px;
      }
      .thin * {
        font-weight: normal !important;
      }

      .loading {
        cursor: wait;
        text-decoration: none;
      }
      .pointer {
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      thin: { type: Boolean },
      color: { type: String },
      bgColor: { type: String },
      theme: { type: String },
      width: { type: String },
      url: { type: String },
      openInNewTab: { type: Boolean },
      icon: { type: String },
      iconPos: { type: String },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.width = "100%";
    this.theme = "viiolet80";
    this.thin = false;
    this.icon = undefined;
    this.iconPos = "left";
    this.loading = false;
    this.openInNewTab = false;
  }

  render() {
    // INIT VARIABLES TO CONSTRUCT
    let bgColor, color;
    let text = this.text;

    // PREPROCESS: color + bgColor
    bgColor = LiistColors.transformColorInput(this.bgColor);
    color = LiistColors.transformColorInput(this.color);;
    // PREPROCESS THEME: if a theme is selected, override the color + bgColor
    if (LiistColors.isValidTheme(this.theme) && this.theme !== "custom") {
      const targetTheme = LiistColors.getTheme(this.theme);
      bgColor = LiistColors.transformColorInput(targetTheme.bgColor);
      color = LiistColors.transformColorInput(targetTheme.color);
    }

    // PREPROCESS: loading state
    if (this.loading) {
      text = "loading...";
      bgColor = "grey";
      color = "#ccc";
    }

    // CONDITIONAL RENDERING
    return this.url ? this.renderBttnWithUrl(text, bgColor, color) : this.renderBttn(text, bgColor, color);
  }

  renderBttn(text, bgColor, color) {
    return html`
      <div
        class="flex button ${this.thin ? "thin" : ""} ${this.loading ? "loading" : ""} ${this.url ? "pointer" : ""}"
        style="width:${this.width}; background-color: ${bgColor};">
        ${this.icon && this.iconPos === "left" ?
          this.renderIconLeft(color, text) : this.icon && this.iconPos === "right" ?
          this.renderIconRight(color, text) : this.renderIconText(color, text) }
      </div>
    `;
  }

  renderIconLeft(color, text) {
    return html`
      <div class="icon-flex"><liist-icon icon="${this.icon || "pin"}" color="${color}" size="21px" height="21px"></liist-icon></div>
      ${this.renderIconText(color, text)}
    `;
  }
  renderIconRight(color, text) {
    return html`
      ${this.renderIconText(color, text)}
      <div class="icon-flex"><liist-icon color="${color}" size="21px" height="21px"></liist-icon></div>
    `;
  }

  renderIconText(color, text) {
    return html`
      <div class="name-flex ${this.thin || ""}"><p style="color:${color}">${text}</p></div>
    `;
  }

  renderBttnWithUrl(text, bgColor, color) {
    return html`
      ${this.openInNewTab ?
        html`<a href="${this.url}" target="_blank">${this.renderBttn(text, bgColor, color)}</a>` :
        html`<a href="${this.url}"                >${this.renderBttn(text, bgColor, color)}</a>`}
      </a>
    `;
  }
}

window.customElements.define('liist-bttn', LiistBttn);
