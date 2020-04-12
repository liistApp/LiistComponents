import { html, css, LitElement } from 'lit-element';

export class LiistAuthor extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: "Helvetica", serif;
      }
      .list-author-wrapper {
        display: flex;
        align-items: center;
      }
      img#author-avatar {
        border-radius: 50%;
        object-fit: cover;
        align-self: center;
        width: 35px;
        height: 35px;
      }
      p#author-name-initial {
        margin-left: 15px;
        margin-top: 3.5px;
        margin-bottom: 0;
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
        <p id="author-name-initial">${this.displayName}</p>
      </div>
    `;
  }
}

window.customElements.define('liist-author', LiistAuthor);
