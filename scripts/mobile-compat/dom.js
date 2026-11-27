// API 24's Chromium predates several DOM conveniences used in the shared reader.
(function () {
  'use strict';
  var parents = [Element.prototype, Document.prototype, DocumentFragment.prototype];
  function fragment(items) {
    var result = document.createDocumentFragment();
    Array.prototype.forEach.call(items, function (item) {
      result.appendChild(item instanceof Node ? item : document.createTextNode(String(item)));
    });
    return result;
  }
  parents.forEach(function (proto) {
    if (!proto.append) proto.append = function () { this.appendChild(fragment(arguments)); };
    if (!proto.prepend) proto.prepend = function () { this.insertBefore(fragment(arguments), this.firstChild); };
    if (!proto.replaceChildren) proto.replaceChildren = function () {
      var children = fragment(arguments);
      while (this.firstChild) this.removeChild(this.firstChild);
      this.appendChild(children);
    };
  });
  [Element.prototype, CharacterData.prototype].forEach(function (proto) {
    if (!proto.before) proto.before = function () { if (this.parentNode) this.parentNode.insertBefore(fragment(arguments), this); };
    if (!proto.after) proto.after = function () { if (this.parentNode) this.parentNode.insertBefore(fragment(arguments), this.nextSibling); };
    if (!proto.replaceWith) proto.replaceWith = function () { if (this.parentNode) this.parentNode.replaceChild(fragment(arguments), this); };
    if (!proto.remove) proto.remove = function () { if (this.parentNode) this.parentNode.removeChild(this); };
  });
  if (!('isConnected' in Node.prototype)) Object.defineProperty(Node.prototype, 'isConnected', {
    get: function () { return this.ownerDocument ? this.ownerDocument.documentElement.contains(this) : this === document; }
  });
  if (!Element.prototype.toggleAttribute) Element.prototype.toggleAttribute = function (name, force) {
    var value = arguments.length < 2 ? !this.hasAttribute(name) : Boolean(force);
    if (value) this.setAttribute(name, ''); else this.removeAttribute(name);
    return value;
  };
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Early system WebViews accept coordinates only. Preserve the current offset
    // for omitted axes and let updated WebViews handle smooth scrolling natively.
    var scrollTo = window.scrollTo;
    var scrollBy = window.scrollBy;
    window.scrollTo = function (x, y) {
      if (x && typeof x === 'object') {
        scrollTo.call(window, x.left == null ? window.pageXOffset : x.left,
            x.top == null ? window.pageYOffset : x.top);
      } else { scrollTo.call(window, x, y); }
    };
    window.scrollBy = function (x, y) {
      if (x && typeof x === 'object') scrollBy.call(window, x.left || 0, x.top || 0);
      else scrollBy.call(window, x, y);
    };
  }
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = function (x, y) {
    if (x && typeof x === 'object') {
      if (typeof x.left === 'number') this.scrollLeft = x.left;
      if (typeof x.top === 'number') this.scrollTop = x.top;
    } else { this.scrollLeft = x; this.scrollTop = y; }
  };
  if (window.matchMedia) {
    var media = Object.getPrototypeOf(window.matchMedia('screen'));
    if (!media.addEventListener && media.addListener) {
      media.addEventListener = function (event, cb) { if (event === 'change') this.addListener(cb); };
      media.removeEventListener = function (event, cb) { if (event === 'change') this.removeListener(cb); };
    }
  }
  if (!('showModal' in document.createElement('dialog'))) {
    document.querySelectorAll('dialog').forEach(function (dialog) { window.dialogPolyfill.registerDialog(dialog); });
  }
})();
