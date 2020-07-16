import { html, css, LitElement } from 'lit-element';
import { LiistColors } from './LiistColors';
import './LiistFonts.js';

export class LiistBttn extends LitElement {
  static get styles() {
    return css`

    p {
      font-size: 15px;
    }

    a {
      text-decoration: none;
      cursor: default;
    }

    .button {
      font-family: var(--display-font);
      /* font-weight: bold; */
      height: 50px;
      width: 100%;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      color: { type: String },
      bgColor: { type: String },
      theme: { type: String },
      width: { type: String },
      url: { type: String },
      openInNewTab: { type: Boolean },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.width = "250px";
    this.theme = "viiolet80";
    this.loading = false;
    this.openInNewTab = false;
    console.log("CONSTRUCTOR -> this.loading");
    console.log(this.loading);
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
    console.log("redering bttn without url");
    console.log("this.loadting");
    console.log(this.loading);
    return html`
      <div class="button ${this.loading ? "loading" : ""} ${this.url ? "pointer" : ""}" style="width:${this.width}; background-color: ${bgColor};">
        <p style="color:${color}">${text}</p>
      </div>
    `;
  }

  renderBttnWithUrl(text, bgColor, color) {
    console.log("redering bttn with url");
    return html`
      ${this.openInNewTab ?
        html`<a href="${this.url}" target="_blank">${this.renderBttn(text, bgColor, color)}</a>` :
        html`<a href="${this.url}"                >${this.renderBttn(text, bgColor, color)}</a>`}
      </a>
    `;
  }
}

window.customElements.define('liist-bttn', LiistBttn);
