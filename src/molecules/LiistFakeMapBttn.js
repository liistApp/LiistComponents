import { html, css, LitElement } from 'lit-element';
import '../molecules/LiistTag.js';
import '../atoms/LiistBttn.js';

export class LiistFakeMapBttn extends LitElement {
  static get styles() {
    return css`
      .container {
        overflow-y: hidden;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        justify-content: center;
        align-items: center;
        display: flex;
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
      listTitle: { type: String },
      googleMapsApiKey: { type: String }
    };
  }

  // not sure if needed? in current setup need to be empty for loader to show
  constructor() {
    super();
    this.lat = -73.935242;
    this.lng = 40.730610;
    this.width = "400px";
    this.height = "200px";
    this.theme = "hotii";
    this.icon = "ufo";
    this.listTitle = "default";
    this.googleMapsApiKey = "";
  }

  _buildMapImageUrl() {
    // google maps api key exists
    if (this.googleMapsApiKey) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${this.lng},${this.lat}` +
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
      `background-size: cover;`;
  }

  firstUpdated() {
    this.containerEl = this.shadowRoot.querySelector(".container");
    const deterministicPoints = this._getDeterministicPoints(this.listTitle);
    this.drawPins(deterministicPoints);
  }

  _injectTag(x,y) {
    const liistHtmlTag = `<liist-tag theme="${this.theme}" icon="${this.icon}" size="28px" style="top: ${x}%; left: ${y}%"></liist-tag>`;
    this.containerEl.insertAdjacentHTML("beforeend", liistHtmlTag);
  }

  // generates 5 random points
  drawPins(points) {
    points.forEach(point => this._injectTag(point.x, point.y));
  }

  render() {
    return html`
      <div class="container" style="${this._buildStyles()}">
        <liist-bttn width="100%" text="OPEN MAP"></liist-bttn>
      </div>
    `;
  }

  _getDeterministicPoints(title) {
    const asciiSum = this._sumOfAsci(title);
    const fakePositions = this._fakePositions()
    const numberOfLocations = fakePositions.length;
    const targetIndex = asciiSum % numberOfLocations;
    const targetPoints = fakePositions[targetIndex];
    return targetPoints;
  }

  _sumOfAsci(title) {
    return title.split("").map(char => char.charCodeAt(0)).reduce((a, b) => a + b);
  }

  _asciiDict() {
    return {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18,
      's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  };

  _fakePositions() {
    return [[{x:6,y:58},{x:21,y:46},{x:7,y:11},{x:8,y:80},{x:74,y:28},{x:87,y:72},],[{x:48,y:15},{x:28,y:61},{x:60,y:27},{x:16,y:30},{x:92,y:45},{x:78,y:75},],[{x:55,y:69},{x:59,y:36},{x:12,y:46},{x:19,y:21},{x:66,y:46},{x:41,y:9},],[{x:95,y:80},{x:27,y:68},{x:81,y:68},{x:70,y:8},{x:55,y:34},{x:50,y:26},{x:61,y:86},],[{x:61,y:46},{x:27,y:75},{x:91,y:20},{x:19,y:14},{x:73,y:68},{x:25,y:7},{x:77,y:92},],[{x:55,y:94},{x:87,y:41},{x:54,y:26},{x:18,y:74},{x:17,y:11},{x:49,y:77},{x:79,y:83},],[{x:79,y:89},{x:61,y:31},{x:68,y:45},{x:23,y:12},{x:75,y:17},{x:29,y:87},{x:83,y:69},],[{x:89,y:31},{x:94,y:41},{x:22,y:21},{x:53,y:77},],[{x:17,y:58},{x:22,y:97},{x:39,y:53},{x:71,y:47},{x:22,y:75},{x:95,y:4},{x:36,y:24},{x:88,y:84},{x:81,y:65},{x:79,y:55},{x:80,y:16},{x:69,y:95},{x:28,y:21},{x:5,y:6},{x:36,y:3},]];
  }
}

window.customElements.define('liist-fake-map-bttn', LiistFakeMapBttn);
