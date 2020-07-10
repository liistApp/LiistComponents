import { html, css, LitElement } from 'lit-element';

export class LiistAuthor extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: 'DM Sans', sans-serif;
      }

      .list-author-wrapper {
        display: flex;
        align-items: center;
      }

      img#author-avatar {
        border-radius: 50%;
        object-fit: cover;
        align-self: center;
        width: 40px;
        height: 40px;
      }

      p#author-name-initial {
        margin: 0;
        margin-left: 4.6px;
        font-size: 14px;
        color: #3D3E6C;
        line-height: 140%;
      }

      #author-name-initial > span {
        font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      displayName: { type: String },
      userImageUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.displayName = "default user";
    this.userImageUrl = "https://firebasestorage.googleapis.com/v0/b/liist-prod.appspot.com/o/profilepic.png?alt=media&token=fae54920-44f4-4101-9509-7e5fdff08af1";
  }

  render() {
    return html`
      <div class="list-author-wrapper">
        <img id="author-avatar" class="overlay-images" src="${this.userImageUrl}">
        <p id="author-name-initial">By <span>${this.displayName}</span></p>
      </div>
    `;
  }
}

window.customElements.define('liist-author', LiistAuthor);
