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

  isOpen() {
    return this.status === "OPEN"
  };

  isClosed() {
    return this.status === "CLOSED"
  };

  setStatus() {
    this.openingHours

    // get current date
    let date = new Date();

    // let weekday = new Array(7);
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";
    // let dayToday = weekday[date.getDay()];
    // let yearNow = date.getFullYear();
    // let monthNow = date.getMonth + 1;
    // let hourNow = date.getHours();
    // let dayNow = date.getDate();
    // let minutesNow = date.getMinutes();
    // let toAmPm = (hourNow > 12) ? (hourNow - 12 + ':' + minutesNow + ' PM') : (hourNow + ':' + minutesNow + ' AM');
    // let toNormalTime = (hourNow > 12) ? (hourNow + 12 + ':' + minutesNow) : (hourNow + ':' + minutesNow);
    // let timeNow = dayToday + ": " + toAmPm;
    // var timeFormat = yearNow + "-" + monthNow + "-" dayNow + "T" + hourNow + minutesNow;

    // get the opening time of this day in correct time format
    if (this.openingHours[date.getDay()].split(" ")[2] === "AM") {
      let openTime = parseInt(this.openingHours[date.getDay()].split(" ")[1]);
    } else if (this.openingHours[date.getDay()].split(" ")[2] === "PM") {
      let openTime = parseInt(this.openingHours[date.getDay()].split(" ")[1].split(":")[0]) + 12;
    }

    // get the close time of this day in correct time format
    if (this.openingHours[date.getDay()-1].split(" ")[5] === "AM") {
      let closeTime = parseInt(this.openingHours[date.getDay()-1].split(" ")[1]);
    } else if (this.openingHours[date.getDay()-1].split(" ")[5] === "PM") {
      let closeTime = parseInt(this.openingHours[date.getDay()-1].split(" ")[1].split(":")[0]) + 12;
    }

    // get the time now in correct format
    let timeToCheck = Date.parse(date);

    // check if time is within range
    if (timeToCheck > openTime && timeToCheck < closeTime) {
      console.log("is open")
    } else {
      console.log("is closed")
    }

  }

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
            <p class="place-status ${this.isOpen ? "open" : "closed"}">${this.status}</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-place-card-new', LiistPlaceCardNew);
