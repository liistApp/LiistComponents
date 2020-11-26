import { html, css, LitElement } from 'lit-element';
import '../molecules/LiistTag.js';
import '../atoms/LiistBttn.js';
import { LiistColors } from '../atoms/LiistColors.js';

export class LiistFakeMapBttn extends LitElement {
  static get styles() {
    return css`
      .container {
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pointer {
        cursor: pointer;
      }
      liist-tag {
        position: absolute;
      }
      liist-bttn {
        width: 33%;
        height: 17%;
        z-index: 100;
      }
    `;
  }

  static get properties() {
    return {
      lng: { type: Number },
      lat: { type: Number },
      width: { type: Number },
      height: { type: Number },
      theme: { type: String },
      color: { type: String },
      bgColor: { type: String },
      icon: { type: String },
      listTitle: { type: String },
      url: { type: String },
      googleMapsApiKey: { type: String },
      disablePins: { type: Boolean }
    };
  }

  // not sure if needed? in current setup need to be empty for loader to show
  constructor() {
    super();
    this.lat = 40.730610; // default value: NewYork
    this.lng = -73.935242;  // default value: NewYork
    this.width = "400px";
    this.height = "200px";
    this.theme = undefined; // default color theme
    this.color = undefined; // default color theme
    this.bgColor = undefined; // default color theme
    this.icon = "pin";        // default icon
    this.listTitle = "";
    this.googleMapsApiKey = "";
    this.disablePins = false;
  }

  _buildMapImageUrl() {
    // google maps api key exists
    if (this.googleMapsApiKey) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}` +
      `&zoom=12&size=500x300` +
      `&key=${this.googleMapsApiKey}` +
      `&style=feature:poi|visibility:off&style=feature:administrative|visibility:off&style=feature:road|element:labels|visibility:off`;
    }
    // google maps api key does not exist => use a default image of a NewYork map from the internet
    return "https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png?v=20170626083314";
  }

  _buildStyles() {
    return `width:${this.width};` +
      `height: ${this.height};` +
      `object-fit: ${this.height};` +
      `background-image: url('${this._buildMapImageUrl()}');` +
      `background-color: var(--liist-viiolet20);` +
      `background-size: cover;`;
  }

  firstUpdated() {
    if (!this.disablePins) {
      const deterministicPoints = this._getDeterministicPoints(this.listTitle);
      this._drawPins(deterministicPoints);
    }
  }

  updated(changedProperties) {
    if (Array.from(changedProperties.keys()).includes("url") && !this.disablePins) {
      const deterministicPoints = this._getDeterministicPoints(this.listTitle);
      this._drawPins(deterministicPoints);
    }
  }

  _injectTag(x,y) {
    if (!this.theme && !this.color && !this.bgColor) {
      this.theme = "viiolet80";
    }
    let color, bgColor;
    color = this.color;
    bgColor = this.bgColor;
    if (this.theme) {
      const theme = LiistColors.getTheme(this.theme);
      color = LiistColors.get(theme.color);
      bgColor = LiistColors.get(theme.bgColor);
    }
    const tagHtml = `<liist-tag color="${color}" bgColor="${bgColor}" icon="${this.icon}" size="28px" style="top: ${x}%; left: ${y}%"></liist-tag>`;
    this._getContainer().insertAdjacentHTML("beforeend", tagHtml);
  }

  _getContainer() {
    return this.shadowRoot.querySelector(".container");
  }

  _drawPins(points) {
    points.forEach(point => this._injectTag(point.x, point.y));
  }

  _getDeterministicPoints(title) {
    const asciiSum = this._sumOfAsci(title);
    const fakePositions = this._fakePositions();
    const numberOfLocations = fakePositions.length;
    const targetIndex = asciiSum % numberOfLocations;
    const targetPoints = fakePositions[targetIndex];
    return targetPoints;
  }

  _sumOfAsci(title) {
    if (title === "") {
      title = "default title";
    }
    return title.split("").map(char => char.charCodeAt(0)).reduce((a, b) => a + b);
  }

  _fakePositions() {
    return [[{ x: 6, y: 58 }, { x: 21, y: 46 }, { x: 7, y: 11 }, { x: 8, y: 80 }, { x: 74, y: 28 }, { x: 87, y: 72 },], [{ x: 48, y: 15 }, { x: 28, y: 61 }, { x: 60, y: 27 }, { x: 16, y: 30 }, { x: 92, y: 45 }, { x: 78, y: 75 },], [{ x: 55, y: 69 }, { x: 59, y: 36 }, { x: 12, y: 46 }, { x: 19, y: 21 }, { x: 66, y: 46 }, { x: 41, y: 9 },], [{ x: 95, y: 80 }, { x: 27, y: 68 }, { x: 81, y: 68 }, { x: 70, y: 8 }, { x: 55, y: 34 }, { x: 50, y: 26 }, { x: 61, y: 86 },], [{ x: 61, y: 46 }, { x: 27, y: 75 }, { x: 91, y: 20 }, { x: 19, y: 14 }, { x: 73, y: 68 }, { x: 25, y: 7 }, { x: 77, y: 92 },], [{ x: 55, y: 94 }, { x: 87, y: 41 }, { x: 54, y: 26 }, { x: 18, y: 74 }, { x: 17, y: 11 }, { x: 49, y: 77 }, { x: 79, y: 83 },], [{ x: 79, y: 89 }, { x: 61, y: 31 }, { x: 68, y: 45 }, { x: 23, y: 12 }, { x: 75, y: 17 }, { x: 29, y: 87 }, { x: 83, y: 69 },], [{ x: 89, y: 31 }, { x: 94, y: 41 }, { x: 22, y: 21 }, { x: 53, y: 77 },], [{ x: 17, y: 58 }, { x: 22, y: 97 }, { x: 39, y: 53 }, { x: 71, y: 47 }, { x: 22, y: 75 }, { x: 95, y: 4 }, { x: 36, y: 24 }, { x: 88, y: 84 }, { x: 81, y: 65 }, { x: 79, y: 55 }, { x: 80, y: 16 }, { x: 69, y: 95 }, { x: 28, y: 21 }, { x: 5, y: 6 }, { x: 36, y: 3 },]];
  }

  render() {
    if (this.url) {
      return this.renderwithUrl();
    } else {
      return this.renderInnerContent();
    }
  }
  renderwithUrl() {
    return html`
      <a href="${this.url}" target="_blank">
        ${this.renderInnerContent()}
      </a>
    `;
  }
  renderInnerContent() {
    return html`
      <div class="container" style="${this._buildStyles()}">
        <liist-bttn width="100%" text="OPEN MAP"></liist-bttn>
      </div>
    `;
  }
}

window.customElements.define('liist-fake-map-bttn', LiistFakeMapBttn);
