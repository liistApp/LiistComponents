import { LitElement, html, css } from 'lit-element';

const PLACE_NOT_FOUND_THUMBNAIL_URL = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/placeNotFound.png?alt=media&token=a3f6cf7d-876c-45eb-a69c-1d20723c0db4";
const LOADING_URL = "../img/loading.svg";

export class LiistPlaceCard extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      comment: { type: String },
      thumbnail: { type: String },
      tag: { type: String },
      itemId: { type: String }
    }
  }

  // no need for constructor?
  constructor() {
    super();
    this.name = "loading";
    this.comment = "loading...";
    // this.thumbnail = "https://thumbs.gfycat.com/BlankShyFritillarybutterfly-max-1mb.gif";
    // this.thumbnail = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/LiistComponentsAssets%2Floading.svg?alt=media&token=3bcf63df-ed78-4166-9881-2c726d8549ce";
    this.thumbnail = "../../images/loading.svg";
    this.tag = "📍";
  }

  replaceData(obj) {
    this.name = obj.name;
    this.comment = obj.comment;
    this.itemId = obj.itemId;
    if (obj.thumbnail !== null && obj.thumbnail !== undefined) {
      this.thumbnail = obj.thumbnail;
    } else {
      this.thumbnail = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/placeNotFound.png?alt=media&token=a3f6cf7d-876c-45eb-a69c-1d20723c0db4";
    }
  }

  render() {
    return html`
      <div class="place-item">
        <div class="place-card-wrapper">
          <div class="place-card-content">
            <img width="75" height="75" class="location-picture-small" loading="lazy" src="${this.thumbnail}" />
            <div class="place-name-details">
              <div class="place-name">
                <h2 class="ellipsis">${this.name}</h2>
              </div>
              <div class="place-details">
                <i class="fas fa-comment"></i>
                <p class="ellipsis">${this.comment}</p>
              </div>
            </div>
            <p class="place-tag">${this.tag}</p>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .ellipsis {
        text-overflow: ellipsis;
        width: 290px;
        white-space: nowrap;
        overflow: hidden;
      }
      h1, h2, p {
        margin: 0;
      }

      .place-item {
        border-radius: 10px;
        transition: all ease 1s;
        display: block;
        max-width: 479px;
        margin: 0;
      }

      .location-picture-small {
        width: 75px;
        height: 75px;
        object-fit: cover;
        border-radius: 10px;
      }

      .place-card-wrapper {
        margin-bottom: 13px;
        border-radius: 10px;
        box-shadow: 0 0 9px #80808026;
        padding: 9px;
      }
      .place-card-wrapper:hover {
        cursor: pointer;
      }

      .place-card-content {
        display: flex;
        justify-content: space-between;
      }

      .place-name-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        padding-left: 15px;
        padding-right: 10px;
      }

      .place-name h2 {
        font-family: "DM Sans", sans-serif;
        font-size: 19px;
        line-height: 27px;
        color: #4C4B5E;
      }

      .place-details p {
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.4px;
        color: #4C4B5E;
        margin-bottom: 0;
        margin-left: 7px;
      }
      .place-details i {
        color: #feca58;
        font-size: 12.5px;
        align-self: center;
      }
      .place-details {
        display: flex;
        align-items: baseline;
      }
    `;
  }
}

customElements.define('liist-place-card', LiistPlaceCard);

