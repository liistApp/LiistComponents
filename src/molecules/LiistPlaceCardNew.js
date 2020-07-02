import { html, css, LitElement } from 'lit-element';

export class LiistPlaceCardNew extends LitElement {
  static get styles() {
    return css`
      .card-main {
        min-height: 105px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px solid #EDEEF9;
        max-width: 359px;
      }

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
        flex-grow: 2;
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
        line-height: 18px;
        font-size: 13px;
        color: #3D3E6C;
      }

      .place-title {
        font-size: 19px;
        line-height: 24px;
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

      .icon-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
      }

      .chivron {
        width: 18px;
        height: 18px;
      }

      .show {
        display: inherit;
      }

      .hide {
        display: none;
      }

      .loader-placeholder {
        float: left;
        width: 60px;
        height: 60px;
        background-color: #ccc;
        border-radius: 6px;
        /* margin: 8px; */
        background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8) 40px, #F4F4F4 80px);
        background-size: 600px;
        animation: shine-placeholder 2.1s infinite ease-out;
        margin-right: 16px;
      }

      .text-placeholder {
        float: left;
        width: 100%;
        height: 24px;
        border-radius: 6px;
        background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8) 40px, #F4F4F4 80px);
        animation: shine-text-placeholder 2.1s infinite ease-out;
      }

      .text-placeholder-slim {
        float: left;
        width: 100%;
        height: 13.5px;
        border-radius: 6px;
        background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8) 40px, #F4F4F4 80px);
        animation: shine-text-placeholder 2.1s infinite ease-out;
      }

      @keyframes shine-placeholder {
        0% { background-position: -150px  }
        40%, 100% { background-position: 170px  }
      }

      @keyframes shine-text-placeholder {
        0% { background-position: -150px  }
        40%, 100% { background-position: 170px  }
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

  // not sure if needed? in current setup need to be empty for loader to show
  constructor() {
    super();
  }

  replaceData(obj) {
    this.name = obj.name;
    this.address = obj.address;
    this.itemId = obj.itemId;
    this.status = obj.status;
    if (obj.image !== null && obj.image !== undefined) {
      this.image = obj.image;
    } else {
      this.image = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/placeNotFound.png?alt=media&token=a3f6cf7d-876c-45eb-a69c-1d20723c0db4";
    }
  }

  render() {
    return html`
      <div class="card-main">
        <div class="card-wrapper">
          <img class="place-thumbnail ${this.image === undefined || null ? "hide" : "show"}" src="${this.image}" alt="place image thumbnail">
          <div class="loader-placeholder ${this.image === undefined || null ? "show" : "hide"}"></div>
          <div class="card-content">
            <p class="place-title ${this.name === undefined || null ? "hide" : "show"}">${this.name}</p>
            <div class="text-placeholder ${this.name === undefined || null ? "show" : "hide"}"></div>
            <div class="card-content-details">
              <p class="place-address ${this.address === undefined || null ? "hide" : "show"}">${this.address},</p>
              <p class="place-status ${this.status === "OPEN" ? "open" : "closed"} ${this.status === undefined || null ? "hide" : "show"}"> ${this.status}</p>
              <div class="text-placeholder-slim ${this.address === undefined || null ? "show" : "hide"}"></div>
            </div>
          </div>
          <div class="icon-wrapper">
            <img class="chivron" src="https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/listIcons%2Fchev%20right.png?alt=media&token=05d4e0a4-1d5f-4fa2-ab1d-cdd4b7bd4459" alt="chivron right">
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('liist-place-card-new', LiistPlaceCardNew);