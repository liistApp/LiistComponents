import { html, css, LitElement } from 'lit-element';

export class LiistPlaceCard extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: var(--liist-main-font);
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
        height: 70px;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        flex-grow: 2;
      }

      .card-content > p {
        margin: 0;
        font-size: 21px;
        font-weight: 600;
      }

      .place-thumbnail {
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        max-width: 70px;
        max-height: 70px;
        min-width: 70px;
        min-height: 70px;
        width: auto;
        height: auto;
        border-radius: 7px;
        margin-right: 16px;
        object-fit: cover;
      }

      .card-content-details {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        color: var(--liist-viiolet80);
        margin-bottom: 6px;
      }

      .place-title {
        font-size: 19px;
        line-height: 24px;
        color: var(--liist-viiolet80);
        line-height: 23px;
        margin-top: 6px !important;
      }

      .place-address {
        margin: 0;
        margin-right: 4px;
      }

      .place-status {
        margin: 0;
      }

      .open {
        color: var(--liist-grasii);
        font-weight: bold;
      }

      .closed {
        color: var(--liist-viiolet80);
        font-weight: bold;
      }

      .icon-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
      }

      .chevron {
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
        width: 70px;
        height: 70px;
        background-color: #ccc;
        border-radius: 7px;
        background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8) 40px, #F4F4F4 80px);
        background-size: 600px;
        animation: shine-placeholder 2.1s infinite ease-out;
        margin-right: 16px;
      }

      .text-placeholder {
        float: left;
        width: 100%;
        height: 27px;
        border-radius: 7px;
        background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229,229,229,0.8) 40px, #F4F4F4 80px);
        animation: shine-text-placeholder 2.1s infinite ease-out;
        margin-top: 6px;
        margin-bottom: 3px;
      }

      .text-placeholder-slim {
        float: left;
        width: 100%;
        height: 16px;
        border-radius: 7px;
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
      openingHours: { type: Array },
      chevron: { type: Boolean }
    };
  }

  setOpeningHours(array) {
    this.openingHours = array
    this._setStatus();
  };

  _setStatus() {
    // get current date variables
    let date = new Date();
    let yearNow = date.getFullYear();
    let monthNow = date.getMonth() + 1;
    let monthWithZeroInFront = ('0' + monthNow).slice(-2);
    let dayNow = parseInt(date.getDate());
    let dayWithZeroInFront = ('0' + dayNow).slice(-2);

    // get the opening time of this day in correct time format
    let open;
    if (this.openingHours[date.getDay() - 1].split(" ")[2] === "AM") {
      open = parseInt(this.openingHours[date.getDay() - 1].split(" ")[1]);
    } else if (this.openingHours[date.getDay() - 1].split(" ")[2] === "PM") {
      open = parseInt(this.openingHours[date.getDay() - 1].split(" ")[1].split(":")[0]) + 12;
    };
    let openMinutes = this.openingHours[date.getDay() - 1].split(" ")[1].split(":")[1]
    let openTime = yearNow + "-" + monthWithZeroInFront + "-" + dayWithZeroInFront + "T" + open + ":" + openMinutes;

    // get the close time of this day in correct time format
    let close;
    if (this.openingHours[date.getDay() - 1].split(" ")[5] === "AM") {
      close = parseInt(this.openingHours[date.getDay() - 1].split(" ")[1]);
    } else if (this.openingHours[date.getDay() - 1].split(" ")[5] === "PM") {
      close = parseInt(this.openingHours[date.getDay() - 1].split(" ")[1].split(":")[0]) + 12;
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
    this.chevron = false;
  }

  // after the component is first rendered in its initial state (displayed to user)
  // this function gets executed
  firstUpdated() {
    this._setImage();
  }

  _setImage() {
    const placeThumbnail = this.shadowRoot.querySelector("img.place-thumbnail");
    const loadingPlaceholder = this.shadowRoot.querySelector(".loader-placeholder");
    placeThumbnail.onload = function () {
      placeThumbnail.classList.remove("hide");
      placeThumbnail.classList.add("show");
      loadingPlaceholder.classList.remove("show");
      loadingPlaceholder.classList.add("hide");
    }
    placeThumbnail.src = this.image;
  }

  isOpen() {
    return this.status === "OPEN";
  }

  isClosed() {
    return this.status === "CLOSED";
  }

  setData(obj) {
    this.name = obj.name || this.name;
    this.address = obj.address || this.address;
    this.itemId = obj.itemId || this.itemId;
    this.status = obj.status || this.status;
    if (obj.image) {
      this.shadowRoot.querySelector("img.place-thumbnail").src = obj.image;
    }
  }

  render() {
    return html`
      <div class="card-wrapper">
        <img class="place-thumbnail hide" src="" alt="place image thumbnail">
        <div class="loader-placeholder show"></div>
        <div class="card-content">
          <p class="place-title ${this.name ? "show" : "hide"}">${this.name}</p>
          <div class="text-placeholder ${this.name ? "hide" : "show"}"></div>
          <div class="card-content-details">
            <p class="place-address ${this.address ? "show" : "hide"}">${this.address},</p>
            <p class="place-status ${this.isOpen() ? "open show" : this.isClosed() ? "closed show" : "hide"}"> ${this.status}</p>
            <div class="text-placeholder-slim ${this.address ? "hide" : "show"}"></div>
          </div>
        </div>
        ${this.chevron && this.name && this.address ? this.renderChevron() : ""}
      </div>
    `;
  }
  renderChevron() {
    return html`
      <div class="icon-wrapper">
        <img class="chevron" src="https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/listIcons%2Fchev%20right.png?alt=media&token=05d4e0a4-1d5f-4fa2-ab1d-cdd4b7bd4459" alt="chevron right">
      </div>
    `;
  }
}

window.customElements.define('liist-place-card', LiistPlaceCard);
