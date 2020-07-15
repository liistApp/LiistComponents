import { html, css, LitElement } from 'lit-element';
// import 'fa-icons';
import { LiistColors } from '../LiistColors';

export class LiistBttn extends LitElement {
  static get styles() {
    return css`

    p {
      font-size: 17px;
      font-weight: bold;
    }

    a {
      text-decoration: none;
    }

    .button {
      height: 50px;
      width: 100%;
      border-radius: 6px;
      background-color: #4F51C2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    `;
  }

  static get properties() {
    return {
      title: { type: String },
      color: { type: String },
      bgColor: { type: String },
      theme: { type: String },
      width: { type: String },
      url: { type: String },
    };
  }

  constructor() {
    super();
    this.color = "grey";
    this.bgColor = "#ccc";
    this.title = "loading...";
    this.width = "25";
    this.theme = "none";
  }

  // set bgColor(newVal) {
  //   let oldVal = this._bgColor;
  //   this._bgColor = LiistColors.transformColorInput(newVal);
  //   this.requestUpdate('bgColor', oldVal);
  // }
  // get bgColor() { return this._bgColor; }

  // set color(newVal) {
  //   let oldVal = this._color;
  //   this._color = LiistColors.transformColorInput(newVal);
  //   this.requestUpdate('color', oldVal);
  // }
  // get color() { return this._color; }


  // set bgColor(colorInput) {
  //   // Implement setter logic here...
  //   console.log("hi");
  //   console.log(colorInput);
  //   // const newBgColor = LiistColors.transformColorInput(colorInput);
  //   // this.requestUpdate('bgColor', newBgColor);
  //   // retrieve the old property value and store the new one
  // }


  render() {
    // preprocessing the properties!
    let bgColor = LiistColors.transformColorInput(this.bgColor);
    let color = LiistColors.transformColorInput(this.color);;
    // if a theme is selected, override the other properties!
    if (LiistColors.isValidTheme(this.theme)) {
      const targetTheme = LiistColors.getTheme(this.theme);
      bgColor = LiistColors.transformColorInput(targetTheme.bgColor);
      color = LiistColors.transformColorInput(targetTheme.color);
    }
    return html`
      <div>
        <a href="${this.url || "#" }">
          <div class="button" style="width:${this.width}%; background-color: ${bgColor};">
            <p style="color:${color}">${this.title}</p>
          </div>
        </a>
      </div>
    `;
  }
}

window.customElements.define('liist-bttn', LiistBttn);
