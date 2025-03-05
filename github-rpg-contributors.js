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
    this.source = "";
    this.seed = "";
    this.list = [];

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
      source: { type: String},
      seed: { type: String },
      list: { type: Array }
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
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
    <div class="widget">
      getResults();
      ${this.list.map((item, index) => html`
      <rpg-character
      seed="${item.data[0].login}"
      source="${item.links[0].url}">
      </rpg-character>
      `)}

    </div>
    `;
  }


  getResults(value) {
    fetch(`https://api.github.com/repos/haxtheweb/webcomponents/contributors`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
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