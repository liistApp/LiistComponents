import { html, css, LitElement } from 'lit-element';

export class LiistPlaceCardNew extends LitElement {
  static get styles() {
    return css`
      .card-wrapper {
        width: 100%;
        max-width: 359px;
        display: flex;
        justify-content: flex-start;
      }

      .card-wrapper:hover {
        cursor: pointer;
      }

      .card-content {
        display: flex;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
      }

      .card-content > p {
        margin: 0;
      }

      .place-thumbnail {
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        max-width: 60px;
        max-height: 60px;
        min-width: 60px;
        min-height: 60px;
        width: auto;
        height: auto;
        border-radius: 6px;
        margin-right: 16px;
      }

      .card-content-details {
        display: flex;
        line-height: 23px;
        font-size: 13px;
        color: #3D3E6C;
      }

      .place-title {
        font-size: 19px;
        color: #3D3E6C;
        line-height: 23px;
      }

      .place-address {
        margin: 0;
        margin-right: 4px;
      }

      .place-status {
        margin: 0
      }

      .open {
        color: #168A3B;
        font-weight: bold;
      }

      .closed {
        color: #3D3E6C;
        font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      address: { type: String },
      image: { type: String },
      status: { type: String },
      itemId: { type: String },
      openingHours: { type: Array }
    };
  }

  setOpeningHours(array) {
    this.openingHours = array
  };

  // isOpen() {
  //   return this.status === "OPEN"
  // };

  // isClosed() {
  //   return this.status === "CLOSED"
  // };

  setStatus() {
    this.openingHours

    // get current date variables
    let date = new Date();
    let yearNow = date.getFullYear();
    let monthNow = date.getMonth() + 1;
    let monthWithZeroInFront = ('0' + monthNow).slice(-2);
    let dayNow = parseInt(date.getDate());
    let dayWithZeroInFront = ('0' + dayNow).slice(-2);
    let minutesNow = date.getMinutes();

    // get the opening time of this day in correct time format
    let open;
    if (this.openingHours[date.getDay()-1].split(" ")[2] === "AM") {
      open = parseInt(this.openingHours[date.getDay()-1].split(" ")[1]);
    } else if (this.openingHours[date.getDay()-1].split(" ")[2] === "PM") {
      open = parseInt(this.openingHours[date.getDay()-1].split(" ")[1].split(":")[0]) + 12;
    };
    let openMinutes = this.openingHours[date.getDay() - 1].split(" ")[1].split(":")[1]
    let openTime = yearNow + "-" + monthWithZeroInFront + "-" + dayWithZeroInFront + "T" + open + ":" + openMinutes;

    // get the close time of this day in correct time format
    let close;
    if (this.openingHours[date.getDay()-1].split(" ")[5] === "AM") {
      close = parseInt(this.openingHours[date.getDay()-1].split(" ")[1]);
    } else if (this.openingHours[date.getDay()-1].split(" ")[5] === "PM") {
      close = parseInt(this.openingHours[date.getDay()-1].split(" ")[1].split(":")[0]) + 12;
    };
    let closeMinutes = this.openingHours[date.getDay() - 1].split(" ")[4].split(":")[1]
    let closeTime = yearNow + "-" + monthWithZeroInFront + "-" + dayWithZeroInFront + "T" + close + ":" + closeMinutes;

    // get all the times in correct parsed format
    let timeToCheck = Date.parse(date);
    let openTimeParsed = Date.parse(openTime);
    let closeTimeParsed = Date.parse(closeTime);

    // check if time is within range
    if (timeToCheck > openTimeParsed && timeToCheck < closeTimeParsed) {
      this.status = "OPEN";
    } else {
      this.status = "CLOSED";
    };
  };

  constructor() {
    super();
    this.name = "Place Title";
    this.address = "30 E 14th Street, NYC, NY";
    this.status = "OPEN"
    this.image = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Floading.svg?alt=media&token=3bcf63df-ed78-4166-9881-2c726d8549ce";
  }

  render() {
    return html`
      <div class="card-wrapper">
        <img class="place-thumbnail" src="https://www.fodors.com/wp-content/uploads/2016/02/1-Ultimate-New-York-Hero.jpg" alt="place image thumbnail">
        <div class="card-content">
          <p class="place-title">${this.name}</p>
          <div class="card-content-details">
            <p class="place-address">${this.address},</p>
            <p class="place-status ${this.status === "OPEN" ? "open" : "closed"}">${this.status}</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-place-card-new', LiistPlaceCardNew);
