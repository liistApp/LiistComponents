import { html, css, LitElement } from 'lit-element';

export class LiistBttn extends LitElement {
  static get styles() {
    return css`
      .bttn {

      }
    `;
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }

  constructor() {
    super();
  }



  render() {
    return html`
      <div class="bttn">
        <p id="give-suggestion">${this.text}</p>
        <i class="far fa-envelope"></i>
      </div>
    `;
  }
}

window.customElements.define('liist-test', LiistBttn);
