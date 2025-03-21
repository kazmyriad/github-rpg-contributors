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
        width: 90vw;
      }

      .info
      {
        font-size: var(--ddd-font-size-4xs);
      }

      .footer{
        text-align:center;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        padding: var(--ddd-spacing-5);
        margin-top: 5px;
      }

      p
      {
        margin-bottom: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-creekTeal);
      }

      h4
      {
        margin: var(--ddd-spacing-0);
      }

      .rpg-character
      {
        overflow: hidden;
      }

      .info
      {
        font-weight: var(--ddd-font-weight-bold);
      }

      .rpg-block
      {
        display:inline-block; 
        width: 9em;
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-1);
        text-align: center;
        border-radius: var(--ddd-radius-xl);
        border: var( --ddd-border-lg);
        background-color: var(--ddd-theme-default-navy65);
        border-color: var(--ddd-theme-default-potential75);
        transition: 1s;
      }

      .rpg-block:hover
      {
        transition: all .8s ease-in-out;
        color: var(--ddd-theme-default-discoveryCoral);
        background-color: var(--ddd-theme-default-slateGray);
        transform: rotateY(360deg);
      }

      
    `];
  }


  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper"> 
          <!-- item.whatever ONLY workd within the map because item is defined here -->
          <h2>Meet the Contributors for 
            <a href="https://github.com/${this.org}/${this.repo}">${this.org}</a>
          </h2>
          ${this.items.slice(0, this.limit).map((item, index) => html`
           
            <div class="rpg-block">
              <div class="rpg-character">
                <a class="character" href="${item.html_url}" target="_blank">
                  <rpg-character seed="${item.login}"></rpg-character>
                </a>
              </div>
            
              <div class="info">
                <h4>${item.login.length > 14 ? item.login.substring(0, 13) + "..." : item.login}</h4>
                <p>${item.contributions} Contributions</p>
              </div>
          </div>
          `)} 

          <p class="footer"> Showing the top ${this.limit == 1 ? " contributor" : this.limit + " contributors"}. See the full list <a href="https://api.github.com/repos/${this.org}/${this.repo}/contributors">Here</a></p>
  </div>
   
    `;
    
  }


  updated(changedProperties) {
    if (changedProperties.has('repo') || changedProperties.has('org')) {
      this.getResults();
    }
  }


  getResults() {
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
