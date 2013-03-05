/*
 * Copyright 2013 The Toolkitchen Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

if (window.WrapperElement) {
  var queryPropDefs = {
    querySelector: {
      value: function(inSlctr) {
        return localQuery(this, inSlctr);
      }
    },
    querySelectorAll: {
      value: function(inSlctr) {
        return localQueryAll(this, inSlctr);
      }
    }
  };

  // install custom querySelector(All) on WrapperElement
  Object.defineProperties(WrapperElement.prototype, queryPropDefs);
  // install custom querySelector(All) on WrapperDocumentFragment
  Object.defineProperties(WrapperDocumentFragment.prototype, queryPropDefs);

  Object.defineProperties(WrapperDocumentFragment.prototype, {
    cloneNode: {
      value: function(inDeep) {
        return wrap(this.node.cloneNode(inDeep));
      }
    }
  });

  Object.defineProperties(WrapperElement.prototype, {
    // provide support for template.content at WrapperElement
    // TODO(sjmiles): should probably be part of HTMLTemplateWrapper; must
    // be compatible with MDV polyfill
    content: {
      get: function() {
        if (!this.node.content && !this._content) {
          var frag = document.createDocumentFragment();
          while (this.firstChild) {
            frag.appendChild(this.firstChild);
          }
          this._content = frag;
        }
        return this._content || this.node.content;
      }
    },
    //TODO(sjmiles): review accessor alias with Arv
    webkitShadowRoot: {
      get: function() {
        return this.shadowRoot;
      }
    }
  });

  //TODO(sjmiles): review method alias with Arv
  WrapperElement.prototype.webkitCreateShadowRoot =
      WrapperElement.prototype.createShadowRoot;
}