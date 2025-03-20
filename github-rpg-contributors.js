/**
 * Copyright 2025 Alyssa F
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';


/**
 * `github-rpg-contributors`
 * 
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.title = "";
    this.seed = "";
    this.limit = "";
    this.items = [];
    this.org = "haxtheweb";
    this.repo = "webcomponents";

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      seed: { type: String },
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }

      .wrapper
      {
        text-align: center;
        width: 100%;
      }

      .info
      {
        font-size: var(--ddd-font-size-4xs);
        
      }
      .rpg-character
      {
        overflow: hidden;
      }

      .rpg-character:hover
      {
      transition: all .5s ease;
      transform: rotateY(180deg);
      }

      .rpg-block
      {
        display:inline-block; 
        width: 7em;
        margin: 5px;
        padding: 5px;
        text-align: center;
      }
      
    `];
  }


  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper"> 
          <!-- item.whatever ONLY workd within the map because item is defined here -->
          ${this.items.slice(0, this.limit).map((item, index) => html`
           
            <div class="rpg-block">
              <div class="rpg-character">
                <rpg-character
                seed="${item.login}"
                onclick="location.href='${item.url}';">
                </rpg-character>
              </div>
          
              <div class="info">
                <p>${item.login}</p>
                <p>Contributions: ${item.contributions}</p>
              </div>
           </div>
          `)} 

          <div class="footer">
            <p>Showing the top ${this.limit} contributors. Click here to see them all!</p>
          </div>
  </div>
   
    `;
    
  }

  updated(changedProperties) {
    //want this to run if more contributors are added. how to do.
    if (changedProperties.has('repo') || changedProperties.has('org')) {
      this.getResults();
    }

    // else if (changedProperties.has('') && !this.value) {
    //   this.items = [];
    // }

    // // @debugging purposes only
    // if (changedProperties.has('items') && this.items.length > 0) {
    //   console.log(this.items);
    // }
  }


  getResults() {
    // .then is turning it into JSON???? i think??
    fetch(`https://api.github.com/repos/${this.org}/${this.repo}/contributors`).then(d => d.ok ? d.json() : {}).then(data => {
      if (data) {
        this.items = [];
        this.items = data;
        this.loading = false;
      }
    });

  }



  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);