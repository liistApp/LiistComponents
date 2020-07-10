import { html, css, LitElement } from 'lit-element';
import 'fa-icons';

export class LiistSection extends LitElement {
  static get styles() {
    return css`

      p {
        margin: 0;
      }

      #title {
        font-size: 16px;
        line-height: 140%;
        color: #8687A7;
        /* FOR SOME REASON THE FONT FAMILY DOES NOT APPLY */
        font-family: 'Times New Roman', Times, serif !important
      }

      .line {
        width: 100%;
        height: 1.5px;
        background-color: #DBDCEB;
        margin-bottom: 15px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "loading ...";
  }

  render() {
    return html`
    <!-- slot with div that can be indiviaully filled; probably makes the most sense? -->
    <div class="container">
      <!-- <slot name="title"><p id="title"></p></slot> -->
      <p><slot name="title" id="title">loading ... </slot></p>
      <div class="line"></div>
      <div class="content">
        <slot name="fill-content">loading slot content </slot>
      </div>
    </div>

    `;
  }
}

window.customElements.define('liist-section', LiistSection);
