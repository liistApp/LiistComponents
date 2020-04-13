import { html, css, LitElement } from 'lit-element';

export class LiistDaadBttn extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: "DM Sans", sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        letter-spacing: 1.52px;
        cursor: pointer;
      }
      .bttn {
        border-radius: 3px;
        display: flex;
        width: 284px;
        height: 47px;
      }
      .bttn.location {
        background-color: #3367C1;
        color: white;
      }
      .bttn.location.small {
        width: 47px;
        height: 47px;
        justify-content: center;
        align-items: center;
      }
      .bttn.location.small > div#icon {
        margin: 0;
      }
      .bttn.filtering.small > div#icon {
        margin-left: 6px;
        margin-right: 6px;
      }
      .bttn.filtering {
        background-color: #FFFFFF;
      }
      .bttn.filtering.small {
        width: 131px;
        height: 47px;
      }
      div#icon {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        margin-right: 10px;
      }
      div#text-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p.text {
        display: inline-block;
        margin-left: 0;
        margin-right: 0;
      }
      .boxshadow {
        box-shadow: 0 0 14px rgba(0,0,0,0.1);
      }

      .counter-wrapper {
        width: 47px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        margin-right: 8px;
      }

      .circle {
        color: white;
        background-color: #3367C1;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      type: { type: String },
      size: { type: String },
      boxshadow: { type: Boolean },
      nSelectedFilters: { type: Number },
    };
  }

  constructor() {
    super();
    this.size = "big";
    this.nSelectedFilters = 0;
    this.boxshadow = false;
  }

  firstUpdated(changedProperties) {
    this.initIcon();
    this.initText();
  }

  isLocation() {
    return this.type === "location";
  }

  isFiltering() {
    return this.type === "filtering";
  }

  isSmall() {
    return this.size === "small";
  }

  initIcon() {
    this.icon = this.isLocation() ? "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Ficons%2Ficon-location-white.svg?alt=media&token=1f6107b9-0fc1-4428-bc4c-2ca60c1d6de2" : "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Ficons%2Ficon-filtering-dark.svg?alt=media&token=f39dc6e7-5694-4590-b8e6-4c20d8617814"
  }

  initText() {
    if (this.isLocation()) {
      if (this.size === "small") {
        this.text = "";
      } else {
        this.text = "GO TO NEIGHBORHOOD";
      }
    } else {
      if (this.size === "small") {
        this.text = "FILTER";
      } else {
        this.text = "FILTER BY CATEGORY";
      }
    }
  }

  render() {
    return html`
      <div class="bttn
        ${this.isLocation() ? "location" : "filtering"}
        ${this.isSmall() ? "small" : ""}
        ${this.boxshadow ? "boxshadow" : ""}">
        ${this.isFiltering() && this.isSmall() && this.nSelectedFilters > 0 ?
          html`
            <div class="counter-wrapper">
              <div class="circle">${this.nSelectedFilters}</div>
            </div>` :
          html`
            <div id="icon">
              <img src="${this.icon}" alt="" />
            </div>`}
        <div id="text-wrapper">
          <p class="text">${this.text}</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-daad-bttn', LiistDaadBttn);
