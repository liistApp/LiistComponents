import { LitElement, html, css } from 'lit-element';

export class LiistDaadFilter extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    }
  }

  // no need for constructor?
  constructor() {
    super();
    this.title = "placeholder";
  }

  firstUpdated() {
    const consumptionOptions = this.shadowRoot.querySelectorAll(".consumption-option");
    for (let i = 0; i < consumptionOptions.length; i++) {
      consumptionOptions[i].addEventListener('click', function() {
        this.classList.toggle("consumption-option-selected");
      });
    }
    const foodCategories = this.shadowRoot.querySelectorAll(".food-category");
    for (let i = 0; i < foodCategories.length; i++) {
      foodCategories[i].addEventListener('click', function() {
        this.children[0].classList.toggle("checkbox-selected");
        this.children[0].children[0].classList.toggle("invisible");
        this.children[1].classList.toggle("category-selected");
      });
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <section class="filtering-section">
          <div class="consumption-options-wrapper">
            <div class="consumption-option">
              <p>delivery</p>
            </div>
            <div class="consumption-option">
              <p>take-out / curbside</p>
            </div>
            <div class="consumption-option" >
              <p>giftcard</p>
            </div>
          </div>
          <div class="food-categories-wrapper">
            <div class="food-category">
              <div class="checkbox-category">
                <i class="fas fa-check invisible"></i>
              </div>
              <p>Chinese</p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      .wrapper {
        min-width: 375px;
        max-width: 400px;
        height: 500px;
        border: 1px solid red;
      }
      .filtering-section {
        max-width: 375px;
        margin: 0 auto;
      }

      .filter-separator {
        margin: 20px 0;
      }
      .filter-tag {
        display: flex;
        align-items: center;
        margin: 0 18px;
        color: #4c4b5e;
      }
      .filter-tag i {
        font-size: 23px;
      }
      .filter-tag p {
        margin: 0;
        padding-left: 15px;
        font-variant: small-caps;
        font-weight: bold;
        font-size: 20px;
        font-family: "DM Sans", sans-serif;
      }

      .consumption-options-wrapper {
        padding: 0 30px;
        font-family: "DM Sans", sans-serif;
        color: #4c4b5e;
      }

      .consumption-option {
        border: 1px solid #ababab;
        border-radius: 3px;
        text-align: center;
        margin: 25px 0;
      }

      .consumption-option p {
        margin: 0;
        padding: 10px 0;
        font-variant: small-caps;
        font-weight: 700;
        font-size: 16px;
      }

      .consumption-option:hover {
        cursor: pointer;
      }

      .consumption-option-selected {
        color: white;
        background-color: #3C68BB;
      }

      .food-categories-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 35px;
        margin-bottom: 80px;
        padding: 0 30px;
        font-family: "DM Sans", sans-serif;
      }

      .checkbox-category {
        width: 23px;
        height: 23px;
        border: 1px solid #dadada;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .checkbox-category i {
        color: white;
        font-size: 11px;
      }

      .food-category {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .food-category p {
        margin: 0;
        padding-left: 10px;
        color: #909090;
        font-size: 16px;
      }
      .food-category:hover {
        cursor: pointer;
      }

      .checkbox-selected {
        background-color: #3C68BB;
        border: 1px solid #3C68BB;
      }

      .category-selected {
        color: #3C68BB !important;
      }

    `;
  }
}

customElements.define('liist-daad-filter', LiistDaadFilter);

