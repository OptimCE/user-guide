/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = globalThis, Ye = we.ShadowRoot && (we.ShadyCSS === void 0 || we.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qe = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let jt = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ye && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = lt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && lt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (s) => new jt(typeof s == "string" ? s : s + "", void 0, Qe), Jt = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new jt(t, s, Qe);
}, Kt = (s, e) => {
  if (Ye) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = we.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, dt = Ye ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Gt(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xt, defineProperty: Yt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: es, getOwnPropertySymbols: ts, getPrototypeOf: ss } = Object, ze = globalThis, ut = ze.trustedTypes, rs = ut ? ut.emptyScript : "", is = ze.reactiveElementPolyfillSupport, he = (s, e) => s, Ae = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? rs : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, et = (s, e) => !Xt(s, e), ht = { attribute: !0, type: String, converter: Ae, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ??= Symbol("metadata"), ze.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ht) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Yt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = Qt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      n?.call(this, a), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(he("elementProperties"))) return;
    const e = ss(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(he("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(he("properties"))) {
      const t = this.properties, r = [...es(t), ...ts(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(dt(i));
    } else e !== void 0 && t.push(dt(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Kt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : Ae).toAttribute(t, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ae;
      this._$Em = i;
      const o = a.fromAttribute(t, n.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? et)(n, t) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, n] of r) {
        const { wrapped: a } = n, o = this[i];
        a !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, n, o);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[he("elementProperties")] = /* @__PURE__ */ new Map(), se[he("finalized")] = /* @__PURE__ */ new Map(), is?.({ ReactiveElement: se }), (ze.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, pt = (s) => s, Se = tt.trustedTypes, ft = Se ? Se.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Lt = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, zt = "?" + V, ns = `<${zt}>`, G = document, ge = () => G.createComment(""), ye = (s) => s === null || typeof s != "object" && typeof s != "function", st = Array.isArray, as = (s) => st(s) || typeof s?.[Symbol.iterator] == "function", De = `[ 	
\f\r]`, le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, gt = />/g, H = RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, _t = /"/g, Zt = /^(?:script|style|textarea|title)$/i, os = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), S = os(1), ie = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), vt = /* @__PURE__ */ new WeakMap(), W = G.createTreeWalker(G, 129);
function Ut(s, e) {
  if (!st(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(e) : e;
}
const cs = (s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = le;
  for (let o = 0; o < t; o++) {
    const c = s[o];
    let d, f, m = -1, A = 0;
    for (; A < c.length && (a.lastIndex = A, f = a.exec(c), f !== null); ) A = a.lastIndex, a === le ? f[1] === "!--" ? a = mt : f[1] !== void 0 ? a = gt : f[2] !== void 0 ? (Zt.test(f[2]) && (i = RegExp("</" + f[2], "g")), a = H) : f[3] !== void 0 && (a = H) : a === H ? f[0] === ">" ? (a = i ?? le, m = -1) : f[1] === void 0 ? m = -2 : (m = a.lastIndex - f[2].length, d = f[1], a = f[3] === void 0 ? H : f[3] === '"' ? _t : yt) : a === _t || a === yt ? a = H : a === mt || a === gt ? a = le : (a = H, i = void 0);
    const E = a === H && s[o + 1].startsWith("/>") ? " " : "";
    n += a === le ? c + ns : m >= 0 ? (r.push(d), c.slice(0, m) + Lt + c.slice(m) + V + E) : c + V + (m === -2 ? o : E);
  }
  return [Ut(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class _e {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const o = e.length - 1, c = this.parts, [d, f] = cs(e, t);
    if (this.el = _e.createElement(d, r), W.currentNode = this.el.content, t === 2 || t === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (i = W.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const m of i.getAttributeNames()) if (m.endsWith(Lt)) {
          const A = f[a++], E = i.getAttribute(m).split(V), P = /([.?@])?(.*)/.exec(A);
          c.push({ type: 1, index: n, name: P[2], strings: E, ctor: P[1] === "." ? ds : P[1] === "?" ? us : P[1] === "@" ? hs : Ze }), i.removeAttribute(m);
        } else m.startsWith(V) && (c.push({ type: 6, index: n }), i.removeAttribute(m));
        if (Zt.test(i.tagName)) {
          const m = i.textContent.split(V), A = m.length - 1;
          if (A > 0) {
            i.textContent = Se ? Se.emptyScript : "";
            for (let E = 0; E < A; E++) i.append(m[E], ge()), W.nextNode(), c.push({ type: 2, index: ++n });
            i.append(m[A], ge());
          }
        }
      } else if (i.nodeType === 8) if (i.data === zt) c.push({ type: 2, index: n });
      else {
        let m = -1;
        for (; (m = i.data.indexOf(V, m + 1)) !== -1; ) c.push({ type: 7, index: n }), m += V.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = G.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ne(s, e, t = s, r) {
  if (e === ie) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const n = ye(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = ne(s, i._$AS(s, e.values), i, r)), e;
}
class ls {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? G).importNode(t, !0);
    W.currentNode = i;
    let n = W.nextNode(), a = 0, o = 0, c = r[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let d;
        c.type === 2 ? d = new be(n, n.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (d = new ps(n, this, e)), this._$AV.push(d), c = r[++o];
      }
      a !== c?.index && (n = W.nextNode(), a++);
    }
    return W.currentNode = G, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class be {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ne(this, e, t), ye(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : as(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(G.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = _e.createElement(Ut(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new ls(i, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = vt.get(e.strings);
    return t === void 0 && vt.set(e.strings, t = new _e(e)), t;
  }
  k(e) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new be(this.O(ge()), this.O(ge()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = pt(e).nextSibling;
      pt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ze {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = b;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = ne(this, e, t, 0), a = !ye(e) || e !== this._$AH && e !== ie, a && (this._$AH = e);
    else {
      const o = e;
      let c, d;
      for (e = n[0], c = 0; c < n.length - 1; c++) d = ne(this, o[r + c], t, c), d === ie && (d = this._$AH[c]), a ||= !ye(d) || d !== this._$AH[c], d === b ? e = b : e !== b && (e += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ds extends Ze {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class us extends Ze {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class hs extends Ze {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ne(this, e, t, 0) ?? b) === ie) return;
    const r = this._$AH, i = e === b && r !== b || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== b && (r === b || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ps {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ne(this, e);
  }
}
const fs = tt.litHtmlPolyfillSupport;
fs?.(_e, be), (tt.litHtmlVersions ??= []).push("3.3.3");
const ms = (s, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    r._$litPart$ = i = new be(e.insertBefore(ge(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis;
let pe = class extends se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ms(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ie;
  }
};
pe._$litElement$ = !0, pe.finalized = !0, rt.litElementHydrateSupport?.({ LitElement: pe });
const gs = rt.litElementPolyfillSupport;
gs?.({ LitElement: pe });
(rt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ys = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _s = { attribute: !0, type: String, converter: Ae, reflect: !1, hasChanged: et }, vs = (s = _s, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, c, s, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, s, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(o) {
      const c = this[a];
      e.call(this, o), this.requestUpdate(a, c, s, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Q(s) {
  return (e, t) => typeof t == "object" ? vs(s, e, t) : ((r, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(s) {
  return Q({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xs = (s) => s.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bs = { CHILD: 2 }, $s = (s) => (...e) => ({ _$litDirective$: s, values: e });
class ks {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = (s, e) => {
  const t = s._$AN;
  if (t === void 0) return !1;
  for (const r of t) r._$AO?.(e, !1), fe(r, e);
  return !0;
}, Te = (s) => {
  let e, t;
  do {
    if ((e = s._$AM) === void 0) break;
    t = e._$AN, t.delete(s), s = e;
  } while (t?.size === 0);
}, Dt = (s) => {
  for (let e; e = s._$AM; s = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(s)) break;
    t.add(s), Ss(e);
  }
};
function ws(s) {
  this._$AN !== void 0 ? (Te(this), this._$AM = s, Dt(this)) : this._$AM = s;
}
function As(s, e = !1, t = 0) {
  const r = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (e) if (Array.isArray(r)) for (let n = t; n < r.length; n++) fe(r[n], !1), Te(r[n]);
  else r != null && (fe(r, !1), Te(r));
  else fe(this, s);
}
const Ss = (s) => {
  s.type == bs.CHILD && (s._$AP ??= As, s._$AQ ??= ws);
};
class Ts extends ks {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, r) {
    super._$AT(e, t, r), Dt(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (fe(this, e), Te(this));
  }
  setValue(e) {
    if (xs(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = () => new Cs();
class Cs {
}
const Ve = /* @__PURE__ */ new WeakMap(), te = $s(class extends Ts {
  render(s) {
    return b;
  }
  update(s, [e]) {
    const t = e !== this.G;
    return t && this.rt(void 0), (t || this.lt !== this.ct) && (this.G = e, this.ht = s.options?.host, this.rt(this.ct = s.element)), b;
  }
  rt(s) {
    if (this.G !== void 0) if (this.isConnected || (s = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let t = Ve.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), Ve.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, s), s !== void 0 && this.G.call(this.ht, s);
    } else this.G.value = s;
  }
  get lt() {
    return typeof this.G == "function" ? Ve.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Es = {
  pre_action_ms: 200,
  action_ms: 300,
  post_action_ms: 150,
  travel_speed_px_per_ms: 1.5
}, B = (s) => new Promise((e) => setTimeout(e, Math.max(0, s)));
function Rs(s) {
  return s * s * (3 - 2 * s);
}
function it(s, e) {
  if (!e || !e.width || !e.height) return null;
  const t = s.getBoundingClientRect();
  return !t.width || !t.height ? null : { sx: t.width / e.width, sy: t.height / e.height };
}
function nt(s, e) {
  return {
    x: s.x * e.sx,
    y: s.y * e.sy,
    width: s.width * e.sx,
    height: s.height * e.sy
  };
}
function Os(s) {
  return { x: s.x + s.width / 2, y: s.y + s.height / 2 };
}
function xt(s, e, t) {
  if (!s) return null;
  const r = it(e, t);
  return r ? Os(nt(s, r)) : null;
}
function Is(s, e, t) {
  const r = e.x - s.x, i = e.y - s.y, n = Math.hypot(r, i);
  return Math.max(150, n / (t || 1.5));
}
function Ns(s, e) {
  const t = e.x - s.x, r = e.y - s.y, i = Math.hypot(t, r);
  if (!i) return { x: s.x, y: s.y };
  const n = (s.x + e.x) / 2, a = (s.y + e.y) / 2, o = -r / i, c = t / i;
  return { x: n + o * i * 0.15, y: a + c * i * 0.15 };
}
class q {
  constructor(e) {
    this.cursorEl = null, this.rippleEl = null, this.kbdEl = null, this.imgEl = null, this.currentPos = { x: 8, y: 8 }, this.aborted = !1, this.stage = e.stage, this.timings = { ...Es, ...e.timings ?? {} }, this.onPhaseChange = e.onPhaseChange, this.refreshDom();
  }
  setTimings(e) {
    this.timings = { ...this.timings, ...e };
  }
  abort() {
    this.aborted = !0;
  }
  hide() {
    this.cursorEl && this.cursorEl.classList.remove("visible"), this.kbdEl && this.kbdEl.classList.remove("visible"), this.onPhaseChange?.("idle");
  }
  /** Re-read stage children. Call after the stage's DOM has been re-rendered. */
  refreshDom() {
    this.cursorEl = this.stage.querySelector(".steppy-cursor"), this.rippleEl = this.stage.querySelector(".steppy-ripple"), this.kbdEl = this.stage.querySelector(".steppy-kbd"), this.imgEl = this.stage.querySelector("img");
  }
  /**
   * Normalize a frame's cursor behavior into an ordered list of targets.
   * ``type-multi`` expands into N targets of kind ``type``; single-target
   * variants produce a single entry. Returns ``[]`` when there's nothing to
   * animate (cursor is null or no targets).
   */
  static normalizeTargets(e) {
    if (!e) return [];
    if (e.kind === "type-multi")
      return e.targets.map(
        (i) => ({
          bbox: i.bbox,
          value: i.value,
          selector: i.selector,
          kind: "type"
        })
      );
    const t = e.target, r = e.kind === "type" ? e.value : void 0;
    return [
      {
        bbox: t.bbox,
        value: r,
        selector: t.selector,
        kind: e.kind === "click" ? "click" : e.kind === "hover" ? "hover" : "type"
      }
    ];
  }
  /** Wait for the screenshot ``<img>`` to be ready (load or error). */
  async waitImageReady() {
    const e = this.imgEl;
    e && (e.complete && e.naturalWidth || await new Promise((t) => {
      const r = () => t();
      e.addEventListener("load", r, { once: !0 }), e.addEventListener("error", r, { once: !0 });
    }));
  }
  /**
   * Full sequence over every target in ``frame.cursor`` — historical
   * stepbystep behavior. No user interaction.
   */
  async animateFrame(e) {
    if (this.aborted = !1, this.refreshDom(), !this.cursorEl) return;
    if (!e.cursor) {
      this.hide();
      return;
    }
    await this.waitImageReady();
    const t = q.normalizeTargets(e.cursor);
    this.currentPos = { x: 8, y: 8 }, this.cursorEl.classList.add("visible");
    for (let r = 0; r < t.length; r++) {
      if (this.aborted || (await this.travelToTargetIndex(e, t, r), this.aborted) || (await this.playTargetActionIndex(e, t, r), this.aborted)) return;
      await B(this.timings.post_action_ms);
    }
  }
  /**
   * Interactive mode: move the cursor to ``targetIndex`` and pulse it. Caller
   * waits for user input before invoking ``playTargetAction``.
   */
  async travelToTarget(e, t) {
    if (this.aborted = !1, this.refreshDom(), !this.cursorEl) return;
    if (!e.cursor) {
      this.hide();
      return;
    }
    await this.waitImageReady();
    const r = q.normalizeTargets(e.cursor);
    this.cursorEl.classList.add("visible"), await this.travelToTargetIndex(e, r, t);
  }
  /**
   * Interactive mode: run the action animation for ``targetIndex`` and the
   * post-action settling beat.
   */
  async playTargetAction(e, t) {
    if (this.aborted = !1, this.refreshDom(), !e.cursor) return;
    const r = q.normalizeTargets(e.cursor);
    await this.playTargetActionIndex(e, r, t), !this.aborted && await B(this.timings.post_action_ms);
  }
  /**
   * Pure helper: project a capture-space bbox into the displayed coordinate
   * space. Returns ``null`` when the image hasn't laid out yet. Exposed so
   * the Lit player can place hotspots without duplicating the math.
   */
  computeDisplayRect(e, t) {
    const r = this.imgEl;
    if (!r || !e) return null;
    const i = it(r, t);
    return i ? nt(e, i) : null;
  }
  // ── Internal building blocks ───────────────────────────────────────────
  async travelToTargetIndex(e, t, r) {
    const i = t[r], n = this.cursorEl;
    if (!i || !n) return;
    const a = xt(i.bbox, this.imgEl, e.viewport);
    a && (this.onPhaseChange?.("travel", i), await this.travelTo(n, this.currentPos, a), this.currentPos = a, this.onPhaseChange?.("pre-action", i), n.classList.remove("pulse"), n.offsetWidth, n.classList.add("pulse"), await B(this.timings.pre_action_ms), n.classList.remove("pulse"));
  }
  async playTargetActionIndex(e, t, r) {
    const i = t[r];
    if (!i) return;
    const n = xt(i.bbox, this.imgEl, e.viewport) || this.currentPos;
    this.onPhaseChange?.("action", i), i.kind === "click" ? (this.rippleEl && this.fireClick(this.rippleEl, n), await B(this.timings.action_ms)) : i.kind === "type" ? this.kbdEl && await this.typeValue(this.kbdEl, n, i.value) : await B(this.timings.action_ms), this.onPhaseChange?.("post-action", i);
  }
  async travelTo(e, t, r) {
    const i = Is(t, r, this.timings.travel_speed_px_per_ms), n = Ns(t, r);
    return new Promise((a) => {
      const o = performance.now(), c = (d) => {
        if (this.aborted) {
          a();
          return;
        }
        const f = Math.min(1, (d - o) / i), m = Rs(f), A = (1 - m) * (1 - m) * t.x + 2 * (1 - m) * m * n.x + m * m * r.x, E = (1 - m) * (1 - m) * t.y + 2 * (1 - m) * m * n.y + m * m * r.y;
        e.style.left = `${A}px`, e.style.top = `${E}px`, f < 1 ? requestAnimationFrame(c) : a();
      };
      requestAnimationFrame(c);
    });
  }
  fireClick(e, t) {
    e.style.left = `${t.x}px`, e.style.top = `${t.y}px`, e.classList.remove("fire"), e.offsetWidth, e.classList.add("fire");
  }
  async typeValue(e, t, r) {
    e.style.left = `${t.x + 16}px`, e.style.top = `${t.y + 16}px`, e.textContent = "", e.classList.add("visible");
    const i = (r ?? "").split(""), n = i.length ? this.timings.action_ms / i.length : this.timings.action_ms;
    for (const a of i) {
      if (this.aborted) break;
      e.textContent = (e.textContent ?? "") + a, await B(n);
    }
    await B(80), e.classList.remove("visible");
  }
}
const bt = {
  en: {
    restart: "Restart",
    next: "Next",
    previous: "Previous",
    hotspotLabel: "Click here to continue: {step}",
    progress: "Step {current} of {total}",
    miss: "Try clicking the highlighted area.",
    loading: "Loading guide…",
    errorTitle: "Could not load this guide",
    errorRetry: "Retry",
    localeSwitcher: "Language",
    variantSwitcher: "View",
    done: "Done!"
  },
  fr: {
    restart: "Recommencer",
    next: "Suivant",
    previous: "Précédent",
    hotspotLabel: "Cliquez ici pour continuer : {step}",
    progress: "Étape {current} sur {total}",
    miss: "Essayez de cliquer sur la zone surlignée.",
    loading: "Chargement du guide…",
    errorTitle: "Impossible de charger ce guide",
    errorRetry: "Réessayer",
    localeSwitcher: "Langue",
    variantSwitcher: "Affichage",
    done: "Terminé !"
  },
  nl: {
    restart: "Opnieuw",
    next: "Volgende",
    previous: "Vorige",
    hotspotLabel: "Klik hier om door te gaan: {step}",
    progress: "Stap {current} van {total}",
    miss: "Probeer op de gemarkeerde zone te klikken.",
    loading: "Gids laden…",
    errorTitle: "Deze gids kon niet worden geladen",
    errorRetry: "Opnieuw proberen",
    localeSwitcher: "Taal",
    variantSwitcher: "Weergave",
    done: "Klaar!"
  },
  de: {
    restart: "Neu starten",
    next: "Weiter",
    previous: "Zurück",
    hotspotLabel: "Hier klicken, um fortzufahren: {step}",
    progress: "Schritt {current} von {total}",
    miss: "Versuchen Sie, auf den hervorgehobenen Bereich zu klicken.",
    loading: "Anleitung wird geladen…",
    errorTitle: "Diese Anleitung konnte nicht geladen werden",
    errorRetry: "Erneut versuchen",
    localeSwitcher: "Sprache",
    variantSwitcher: "Ansicht",
    done: "Fertig!"
  }
};
function Ps(s, e) {
  const t = bt[s] ?? bt.en, r = e?.[s];
  return r ? { ...t, ...r } : t;
}
function $t(s, e) {
  return s.replace(
    /\{(\w+)\}/g,
    (t, r) => r in e ? String(e[r]) : `{${r}}`
  );
}
function Ms(s, e, t) {
  if (!t) return null;
  const r = it(s, e);
  return r ? nt(t, r) : null;
}
function js(s, e, t, r = 8) {
  const i = s.y, n = t.height - (s.y + s.height), a = s.x, o = t.width - (s.x + s.width), c = e.height + r, d = e.width + r, f = n >= i ? { side: "bottom", room: n } : { side: "top", room: i };
  let m;
  if (f.room >= c)
    m = f.side;
  else {
    const ct = o >= a ? { side: "right", room: o } : { side: "left", room: a };
    m = ct.room >= d ? ct.side : f.side;
  }
  const A = s.x + s.width / 2, E = s.y + s.height / 2;
  let P = 0, ce = 0;
  return m === "bottom" ? (P = ke(A - e.width / 2, 0, t.width - e.width), ce = Math.min(s.y + s.height + r, t.height - e.height)) : m === "top" ? (P = ke(A - e.width / 2, 0, t.width - e.width), ce = Math.max(0, s.y - e.height - r)) : m === "right" ? (P = Math.min(s.x + s.width + r, t.width - e.width), ce = ke(E - e.height / 2, 0, t.height - e.height)) : (P = Math.max(0, s.x - e.width - r), ce = ke(E - e.height / 2, 0, t.height - e.height)), { side: m, x: P, y: ce };
}
function ke(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
var x;
(function(s) {
  s.assertEqual = (i) => {
  };
  function e(i) {
  }
  s.assertIs = e;
  function t(i) {
    throw new Error();
  }
  s.assertNever = t, s.arrayToEnum = (i) => {
    const n = {};
    for (const a of i)
      n[a] = a;
    return n;
  }, s.getValidEnumValues = (i) => {
    const n = s.objectKeys(i).filter((o) => typeof i[i[o]] != "number"), a = {};
    for (const o of n)
      a[o] = i[o];
    return s.objectValues(a);
  }, s.objectValues = (i) => s.objectKeys(i).map(function(n) {
    return i[n];
  }), s.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const n = [];
    for (const a in i)
      Object.prototype.hasOwnProperty.call(i, a) && n.push(a);
    return n;
  }, s.find = (i, n) => {
    for (const a of i)
      if (n(a))
        return a;
  }, s.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && Number.isFinite(i) && Math.floor(i) === i;
  function r(i, n = " | ") {
    return i.map((a) => typeof a == "string" ? `'${a}'` : a).join(n);
  }
  s.joinValues = r, s.jsonStringifyReplacer = (i, n) => typeof n == "bigint" ? n.toString() : n;
})(x || (x = {}));
var kt;
(function(s) {
  s.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(kt || (kt = {}));
const h = x.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), D = (s) => {
  switch (typeof s) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return Number.isNaN(s) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(s) ? h.array : s === null ? h.null : s.then && typeof s.then == "function" && s.catch && typeof s.catch == "function" ? h.promise : typeof Map < "u" && s instanceof Map ? h.map : typeof Set < "u" && s instanceof Set ? h.set : typeof Date < "u" && s instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, l = x.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class U extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(n) {
      return n.message;
    }, r = { _errors: [] }, i = (n) => {
      for (const a of n.issues)
        if (a.code === "invalid_union")
          a.unionErrors.map(i);
        else if (a.code === "invalid_return_type")
          i(a.returnTypeError);
        else if (a.code === "invalid_arguments")
          i(a.argumentsError);
        else if (a.path.length === 0)
          r._errors.push(t(a));
        else {
          let o = r, c = 0;
          for (; c < a.path.length; ) {
            const d = a.path[c];
            c === a.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(t(a))) : o[d] = o[d] || { _errors: [] }, o = o[d], c++;
          }
        }
    };
    return i(this), r;
  }
  static assert(e) {
    if (!(e instanceof U))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const i of this.issues)
      if (i.path.length > 0) {
        const n = i.path[0];
        t[n] = t[n] || [], t[n].push(e(i));
      } else
        r.push(e(i));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
U.create = (s) => new U(s);
const Be = (s, e) => {
  let t;
  switch (s.code) {
    case l.invalid_type:
      s.received === h.undefined ? t = "Required" : t = `Expected ${s.expected}, received ${s.received}`;
      break;
    case l.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(s.expected, x.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${x.joinValues(s.keys, ", ")}`;
      break;
    case l.invalid_union:
      t = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${x.joinValues(s.options)}`;
      break;
    case l.invalid_enum_value:
      t = `Invalid enum value. Expected ${x.joinValues(s.options)}, received '${s.received}'`;
      break;
    case l.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      t = "Invalid function return type";
      break;
    case l.invalid_date:
      t = "Invalid date";
      break;
    case l.invalid_string:
      typeof s.validation == "object" ? "includes" in s.validation ? (t = `Invalid input: must include "${s.validation.includes}"`, typeof s.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${s.validation.position}`)) : "startsWith" in s.validation ? t = `Invalid input: must start with "${s.validation.startsWith}"` : "endsWith" in s.validation ? t = `Invalid input: must end with "${s.validation.endsWith}"` : x.assertNever(s.validation) : s.validation !== "regex" ? t = `Invalid ${s.validation}` : t = "Invalid";
      break;
    case l.too_small:
      s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "more than"} ${s.minimum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "over"} ${s.minimum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}` : s.type === "bigint" ? t = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(s.minimum))}` : t = "Invalid input";
      break;
    case l.too_big:
      s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "less than"} ${s.maximum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "under"} ${s.maximum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "bigint" ? t = `BigInt must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly" : s.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(s.maximum))}` : t = "Invalid input";
      break;
    case l.custom:
      t = "Invalid input";
      break;
    case l.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      t = `Number must be a multiple of ${s.multipleOf}`;
      break;
    case l.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, x.assertNever(s);
  }
  return { message: t };
};
let Ls = Be;
function zs() {
  return Ls;
}
const Zs = (s) => {
  const { data: e, path: t, errorMaps: r, issueData: i } = s, n = [...t, ...i.path || []], a = {
    ...i,
    path: n
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: n,
      message: i.message
    };
  let o = "";
  const c = r.filter((d) => !!d).slice().reverse();
  for (const d of c)
    o = d(a, { data: e, defaultError: o }).message;
  return {
    ...i,
    path: n,
    message: o
  };
};
function u(s, e) {
  const t = zs(), r = Zs({
    issueData: e,
    data: s.data,
    path: s.path,
    errorMaps: [
      s.common.contextualErrorMap,
      // contextual error map is first priority
      s.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === Be ? void 0 : Be
      // then global default map
    ].filter((i) => !!i)
  });
  s.common.issues.push(r);
}
class C {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const i of t) {
      if (i.status === "aborted")
        return g;
      i.status === "dirty" && e.dirty(), r.push(i.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const i of t) {
      const n = await i.key, a = await i.value;
      r.push({
        key: n,
        value: a
      });
    }
    return C.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const i of t) {
      const { key: n, value: a } = i;
      if (n.status === "aborted" || a.status === "aborted")
        return g;
      n.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), n.value !== "__proto__" && (typeof a.value < "u" || i.alwaysSet) && (r[n.value] = a.value);
    }
    return { status: e.value, value: r };
  }
}
const g = Object.freeze({
  status: "aborted"
}), de = (s) => ({ status: "dirty", value: s }), I = (s) => ({ status: "valid", value: s }), wt = (s) => s.status === "aborted", At = (s) => s.status === "dirty", ae = (s) => s.status === "valid", Ce = (s) => typeof Promise < "u" && s instanceof Promise;
var p;
(function(s) {
  s.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, s.toString = (e) => typeof e == "string" ? e : e?.message;
})(p || (p = {}));
class j {
  constructor(e, t, r, i) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const St = (s, e) => {
  if (ae(e))
    return { success: !0, data: e.value };
  if (!s.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new U(s.common.issues);
      return this._error = t, this._error;
    }
  };
};
function _(s) {
  if (!s)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: i } = s;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: i } : { errorMap: (a, o) => {
    const { message: c } = s;
    return a.code === "invalid_enum_value" ? { message: c ?? o.defaultError } : typeof o.data > "u" ? { message: c ?? r ?? o.defaultError } : a.code !== "invalid_type" ? { message: o.defaultError } : { message: c ?? t ?? o.defaultError };
  }, description: i };
}
class v {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return D(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: D(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new C(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: D(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (Ce(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    const r = {
      common: {
        issues: [],
        async: t?.async ?? !1,
        contextualErrorMap: t?.errorMap
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: D(e)
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return St(r, i);
  }
  "~validate"(e) {
    const t = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: D(e)
    };
    if (!this["~standard"].async)
      try {
        const r = this._parseSync({ data: e, path: [], parent: t });
        return ae(r) ? {
          value: r.value
        } : {
          issues: t.common.issues
        };
      } catch (r) {
        r?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((r) => ae(r) ? {
      value: r.value
    } : {
      issues: t.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t?.errorMap,
        async: !0
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: D(e)
    }, i = this._parse({ data: e, path: r.path, parent: r }), n = await (Ce(i) ? i : Promise.resolve(i));
    return St(r, n);
  }
  refine(e, t) {
    const r = (i) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(i) : t;
    return this._refinement((i, n) => {
      const a = e(i), o = () => n.addIssue({
        code: l.custom,
        ...r(i)
      });
      return typeof Promise < "u" && a instanceof Promise ? a.then((c) => c ? !0 : (o(), !1)) : a ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, i) => e(r) ? !0 : (i.addIssue(typeof t == "function" ? t(r, i) : t), !1));
  }
  _refinement(e) {
    return new X({
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return Z.create(this, this._def);
  }
  nullable() {
    return Y.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return M.create(this);
  }
  promise() {
    return Pe.create(this, this._def);
  }
  or(e) {
    return Re.create([this, e], this._def);
  }
  and(e) {
    return Oe.create(this, e, this._def);
  }
  transform(e) {
    return new X({
      ..._(this._def),
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Me({
      ..._(this._def),
      innerType: this,
      defaultValue: t,
      typeName: y.ZodDefault
    });
  }
  brand() {
    return new Bt({
      typeName: y.ZodBranded,
      type: this,
      ..._(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new je({
      ..._(this._def),
      innerType: this,
      catchValue: t,
      typeName: y.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ot.create(this, e);
  }
  readonly() {
    return Le.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Us = /^c[^\s-]{8,}$/i, Ds = /^[0-9a-z]+$/, Vs = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Fs = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Hs = /^[a-z0-9_-]{21}$/i, Bs = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Ws = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, qs = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Gs = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Fe;
const Js = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ks = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Xs = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ys = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qs = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, er = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Vt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", tr = new RegExp(`^${Vt}$`);
function Ft(s) {
  let e = "[0-5]\\d";
  s.precision ? e = `${e}\\.\\d{${s.precision}}` : s.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = s.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function sr(s) {
  return new RegExp(`^${Ft(s)}$`);
}
function rr(s) {
  let e = `${Vt}T${Ft(s)}`;
  const t = [];
  return t.push(s.local ? "Z?" : "Z"), s.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function ir(s, e) {
  return !!((e === "v4" || !e) && Js.test(s) || (e === "v6" || !e) && Xs.test(s));
}
function nr(s, e) {
  if (!Bs.test(s))
    return !1;
  try {
    const [t] = s.split(".");
    if (!t)
      return !1;
    const r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), i = JSON.parse(atob(r));
    return !(typeof i != "object" || i === null || "typ" in i && i?.typ !== "JWT" || !i.alg || e && i.alg !== e);
  } catch {
    return !1;
  }
}
function ar(s, e) {
  return !!((e === "v4" || !e) && Ks.test(s) || (e === "v6" || !e) && Ys.test(s));
}
class z extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: l.invalid_type,
        expected: h.string,
        received: n.parsedType
      }), g;
    }
    const r = new C();
    let i;
    for (const n of this._def.checks)
      if (n.kind === "min")
        e.data.length < n.value && (i = this._getOrReturnCtx(e, i), u(i, {
          code: l.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "max")
        e.data.length > n.value && (i = this._getOrReturnCtx(e, i), u(i, {
          code: l.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "length") {
        const a = e.data.length > n.value, o = e.data.length < n.value;
        (a || o) && (i = this._getOrReturnCtx(e, i), a ? u(i, {
          code: l.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : o && u(i, {
          code: l.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), r.dirty());
      } else if (n.kind === "email")
        qs.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "email",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "emoji")
        Fe || (Fe = new RegExp(Gs, "u")), Fe.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "emoji",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "uuid")
        Fs.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "uuid",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "nanoid")
        Hs.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "nanoid",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid")
        Us.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "cuid",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid2")
        Ds.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "cuid2",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "ulid")
        Vs.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "ulid",
          code: l.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), u(i, {
            validation: "url",
            code: l.invalid_string,
            message: n.message
          }), r.dirty();
        }
      else n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "regex",
        code: l.invalid_string,
        message: n.message
      }), r.dirty())) : n.kind === "trim" ? e.data = e.data.trim() : n.kind === "includes" ? e.data.includes(n.value, n.position) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: { includes: n.value, position: n.position },
        message: n.message
      }), r.dirty()) : n.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : n.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : n.kind === "startsWith" ? e.data.startsWith(n.value) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: { startsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "endsWith" ? e.data.endsWith(n.value) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: { endsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "datetime" ? rr(n).test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: "datetime",
        message: n.message
      }), r.dirty()) : n.kind === "date" ? tr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: "date",
        message: n.message
      }), r.dirty()) : n.kind === "time" ? sr(n).test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.invalid_string,
        validation: "time",
        message: n.message
      }), r.dirty()) : n.kind === "duration" ? Ws.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "duration",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "ip" ? ir(e.data, n.version) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "ip",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "jwt" ? nr(e.data, n.alg) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "jwt",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "cidr" ? ar(e.data, n.version) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "cidr",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64" ? Qs.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "base64",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64url" ? er.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "base64url",
        code: l.invalid_string,
        message: n.message
      }), r.dirty()) : x.assertNever(n);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((i) => e.test(i), {
      validation: t,
      code: l.invalid_string,
      ...p.errToObj(r)
    });
  }
  _addCheck(e) {
    return new z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...p.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...p.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: e?.offset ?? !1,
      local: e?.local ?? !1,
      ...p.errToObj(e?.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      ...p.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...p.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...p.errToObj(t?.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...p.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...p.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...p.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
z.create = (s) => new z({
  checks: [],
  typeName: y.ZodString,
  coerce: s?.coerce ?? !1,
  ..._(s)
});
function or(s, e) {
  const t = (s.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, i = t > r ? t : r, n = Number.parseInt(s.toFixed(i).replace(".", "")), a = Number.parseInt(e.toFixed(i).replace(".", ""));
  return n % a / 10 ** i;
}
class oe extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: l.invalid_type,
        expected: h.number,
        received: n.parsedType
      }), g;
    }
    let r;
    const i = new C();
    for (const n of this._def.checks)
      n.kind === "int" ? x.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), i.dirty()) : n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? or(e.data, n.value) !== 0 && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : n.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.not_finite,
        message: n.message
      }), i.dirty()) : x.assertNever(n);
    return { status: i.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, r, i) {
    return new oe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: p.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new oe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: p.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: p.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && x.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
oe.create = (s) => new oe({
  checks: [],
  typeName: y.ZodNumber,
  coerce: s?.coerce || !1,
  ..._(s)
});
class ve extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== h.bigint)
      return this._getInvalidInput(e);
    let r;
    const i = new C();
    for (const n of this._def.checks)
      n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.too_small,
        type: "bigint",
        minimum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.too_big,
        type: "bigint",
        maximum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? e.data % n.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: l.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : x.assertNever(n);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return u(t, {
      code: l.invalid_type,
      expected: h.bigint,
      received: t.parsedType
    }), g;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, r, i) {
    return new ve({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: p.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ve({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
ve.create = (s) => new ve({
  checks: [],
  typeName: y.ZodBigInt,
  coerce: s?.coerce ?? !1,
  ..._(s)
});
class We extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.boolean,
        received: r.parsedType
      }), g;
    }
    return I(e.data);
  }
}
We.create = (s) => new We({
  typeName: y.ZodBoolean,
  coerce: s?.coerce || !1,
  ..._(s)
});
class Ee extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: l.invalid_type,
        expected: h.date,
        received: n.parsedType
      }), g;
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: l.invalid_date
      }), g;
    }
    const r = new C();
    let i;
    for (const n of this._def.checks)
      n.kind === "min" ? e.data.getTime() < n.value && (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), r.dirty()) : n.kind === "max" ? e.data.getTime() > n.value && (i = this._getOrReturnCtx(e, i), u(i, {
        code: l.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), r.dirty()) : x.assertNever(n);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Ee.create = (s) => new Ee({
  checks: [],
  coerce: s?.coerce || !1,
  typeName: y.ZodDate,
  ..._(s)
});
class Tt extends v {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.symbol,
        received: r.parsedType
      }), g;
    }
    return I(e.data);
  }
}
Tt.create = (s) => new Tt({
  typeName: y.ZodSymbol,
  ..._(s)
});
class qe extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.undefined,
        received: r.parsedType
      }), g;
    }
    return I(e.data);
  }
}
qe.create = (s) => new qe({
  typeName: y.ZodUndefined,
  ..._(s)
});
class Ge extends v {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.null,
        received: r.parsedType
      }), g;
    }
    return I(e.data);
  }
}
Ge.create = (s) => new Ge({
  typeName: y.ZodNull,
  ..._(s)
});
class Ct extends v {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return I(e.data);
  }
}
Ct.create = (s) => new Ct({
  typeName: y.ZodAny,
  ..._(s)
});
class Et extends v {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return I(e.data);
  }
}
Et.create = (s) => new Et({
  typeName: y.ZodUnknown,
  ..._(s)
});
class F extends v {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return u(t, {
      code: l.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), g;
  }
}
F.create = (s) => new F({
  typeName: y.ZodNever,
  ..._(s)
});
class Rt extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.void,
        received: r.parsedType
      }), g;
    }
    return I(e.data);
  }
}
Rt.create = (s) => new Rt({
  typeName: y.ZodVoid,
  ..._(s)
});
class M extends v {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), i = this._def;
    if (t.parsedType !== h.array)
      return u(t, {
        code: l.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), g;
    if (i.exactLength !== null) {
      const a = t.data.length > i.exactLength.value, o = t.data.length < i.exactLength.value;
      (a || o) && (u(t, {
        code: a ? l.too_big : l.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: a ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), r.dirty());
    }
    if (i.minLength !== null && t.data.length < i.minLength.value && (u(t, {
      code: l.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), r.dirty()), i.maxLength !== null && t.data.length > i.maxLength.value && (u(t, {
      code: l.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((a, o) => i.type._parseAsync(new j(t, a, t.path, o)))).then((a) => C.mergeArray(r, a));
    const n = [...t.data].map((a, o) => i.type._parseSync(new j(t, a, t.path, o)));
    return C.mergeArray(r, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new M({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new M({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new M({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
M.create = (s, e) => new M({
  type: s,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: y.ZodArray,
  ..._(e)
});
function re(s) {
  if (s instanceof k) {
    const e = {};
    for (const t in s.shape) {
      const r = s.shape[t];
      e[t] = Z.create(re(r));
    }
    return new k({
      ...s._def,
      shape: () => e
    });
  } else return s instanceof M ? new M({
    ...s._def,
    type: re(s.element)
  }) : s instanceof Z ? Z.create(re(s.unwrap())) : s instanceof Y ? Y.create(re(s.unwrap())) : s instanceof J ? J.create(s.items.map((e) => re(e))) : s;
}
class k extends v {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = x.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return u(d, {
        code: l.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), g;
    }
    const { status: r, ctx: i } = this._processInputParams(e), { shape: n, keys: a } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof F && this._def.unknownKeys === "strip"))
      for (const d in i.data)
        a.includes(d) || o.push(d);
    const c = [];
    for (const d of a) {
      const f = n[d], m = i.data[d];
      c.push({
        key: { status: "valid", value: d },
        value: f._parse(new j(i, m, i.path, d)),
        alwaysSet: d in i.data
      });
    }
    if (this._def.catchall instanceof F) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const f of o)
          c.push({
            key: { status: "valid", value: f },
            value: { status: "valid", value: i.data[f] }
          });
      else if (d === "strict")
        o.length > 0 && (u(i, {
          code: l.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const f of o) {
        const m = i.data[f];
        c.push({
          key: { status: "valid", value: f },
          value: d._parse(
            new j(i, m, i.path, f)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: f in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const f of c) {
        const m = await f.key, A = await f.value;
        d.push({
          key: m,
          value: A,
          alwaysSet: f.alwaysSet
        });
      }
      return d;
    }).then((d) => C.mergeObjectSync(r, d)) : C.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new k({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          const i = this._def.errorMap?.(t, r).message ?? r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: p.errToObj(e).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new k({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new k({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new k({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new k({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: y.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new k({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const r of x.objectKeys(e))
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    return new k({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape))
      e[r] || (t[r] = this.shape[r]);
    return new k({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return re(this);
  }
  partial(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape)) {
      const i = this.shape[r];
      e && !e[r] ? t[r] = i : t[r] = i.optional();
    }
    return new k({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape))
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let n = this.shape[r];
        for (; n instanceof Z; )
          n = n._def.innerType;
        t[r] = n;
      }
    return new k({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return Ht(x.objectKeys(this.shape));
  }
}
k.create = (s, e) => new k({
  shape: () => s,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
k.strictCreate = (s, e) => new k({
  shape: () => s,
  unknownKeys: "strict",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
k.lazycreate = (s, e) => new k({
  shape: s,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: y.ZodObject,
  ..._(e)
});
class Re extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function i(n) {
      for (const o of n)
        if (o.result.status === "valid")
          return o.result;
      for (const o of n)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const a = n.map((o) => new U(o.ctx.common.issues));
      return u(t, {
        code: l.invalid_union,
        unionErrors: a
      }), g;
    }
    if (t.common.async)
      return Promise.all(r.map(async (n) => {
        const a = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: t.data,
            path: t.path,
            parent: a
          }),
          ctx: a
        };
      })).then(i);
    {
      let n;
      const a = [];
      for (const c of r) {
        const d = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, f = c._parseSync({
          data: t.data,
          path: t.path,
          parent: d
        });
        if (f.status === "valid")
          return f;
        f.status === "dirty" && !n && (n = { result: f, ctx: d }), d.common.issues.length && a.push(d.common.issues);
      }
      if (n)
        return t.common.issues.push(...n.ctx.common.issues), n.result;
      const o = a.map((c) => new U(c));
      return u(t, {
        code: l.invalid_union,
        unionErrors: o
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
}
Re.create = (s, e) => new Re({
  options: s,
  typeName: y.ZodUnion,
  ..._(e)
});
const L = (s) => s instanceof Ke ? L(s.schema) : s instanceof X ? L(s.innerType()) : s instanceof Ne ? [s.value] : s instanceof K ? s.options : s instanceof Xe ? x.objectValues(s.enum) : s instanceof Me ? L(s._def.innerType) : s instanceof qe ? [void 0] : s instanceof Ge ? [null] : s instanceof Z ? [void 0, ...L(s.unwrap())] : s instanceof Y ? [null, ...L(s.unwrap())] : s instanceof Bt || s instanceof Le ? L(s.unwrap()) : s instanceof je ? L(s._def.innerType) : [];
class at extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.object)
      return u(t, {
        code: l.invalid_type,
        expected: h.object,
        received: t.parsedType
      }), g;
    const r = this.discriminator, i = t.data[r], n = this.optionsMap.get(i);
    return n ? t.common.async ? n._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : n._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (u(t, {
      code: l.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), g);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, r) {
    const i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const a = L(n.shape[e]);
      if (!a.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of a) {
        if (i.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        i.set(o, n);
      }
    }
    return new at({
      typeName: y.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: i,
      ..._(r)
    });
  }
}
function Je(s, e) {
  const t = D(s), r = D(e);
  if (s === e)
    return { valid: !0, data: s };
  if (t === h.object && r === h.object) {
    const i = x.objectKeys(e), n = x.objectKeys(s).filter((o) => i.indexOf(o) !== -1), a = { ...s, ...e };
    for (const o of n) {
      const c = Je(s[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      a[o] = c.data;
    }
    return { valid: !0, data: a };
  } else if (t === h.array && r === h.array) {
    if (s.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let n = 0; n < s.length; n++) {
      const a = s[n], o = e[n], c = Je(a, o);
      if (!c.valid)
        return { valid: !1 };
      i.push(c.data);
    }
    return { valid: !0, data: i };
  } else return t === h.date && r === h.date && +s == +e ? { valid: !0, data: s } : { valid: !1 };
}
class Oe extends v {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), i = (n, a) => {
      if (wt(n) || wt(a))
        return g;
      const o = Je(n.value, a.value);
      return o.valid ? ((At(n) || At(a)) && t.dirty(), { status: t.value, value: o.data }) : (u(r, {
        code: l.invalid_intersection_types
      }), g);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([n, a]) => i(n, a)) : i(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Oe.create = (s, e, t) => new Oe({
  left: s,
  right: e,
  typeName: y.ZodIntersection,
  ..._(t)
});
class J extends v {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.array)
      return u(r, {
        code: l.invalid_type,
        expected: h.array,
        received: r.parsedType
      }), g;
    if (r.data.length < this._def.items.length)
      return u(r, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), g;
    !this._def.rest && r.data.length > this._def.items.length && (u(r, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const n = [...r.data].map((a, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new j(r, a, r.path, o)) : null;
    }).filter((a) => !!a);
    return r.common.async ? Promise.all(n).then((a) => C.mergeArray(t, a)) : C.mergeArray(t, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new J({
      ...this._def,
      rest: e
    });
  }
}
J.create = (s, e) => {
  if (!Array.isArray(s))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new J({
    items: s,
    typeName: y.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class Ie extends v {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.object)
      return u(r, {
        code: l.invalid_type,
        expected: h.object,
        received: r.parsedType
      }), g;
    const i = [], n = this._def.keyType, a = this._def.valueType;
    for (const o in r.data)
      i.push({
        key: n._parse(new j(r, o, r.path, o)),
        value: a._parse(new j(r, r.data[o], r.path, o)),
        alwaysSet: o in r.data
      });
    return r.common.async ? C.mergeObjectAsync(t, i) : C.mergeObjectSync(t, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, r) {
    return t instanceof v ? new Ie({
      keyType: e,
      valueType: t,
      typeName: y.ZodRecord,
      ..._(r)
    }) : new Ie({
      keyType: z.create(),
      valueType: e,
      typeName: y.ZodRecord,
      ..._(t)
    });
  }
}
class Ot extends v {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.map)
      return u(r, {
        code: l.invalid_type,
        expected: h.map,
        received: r.parsedType
      }), g;
    const i = this._def.keyType, n = this._def.valueType, a = [...r.data.entries()].map(([o, c], d) => ({
      key: i._parse(new j(r, o, r.path, [d, "key"])),
      value: n._parse(new j(r, c, r.path, [d, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of a) {
          const d = await c.key, f = await c.value;
          if (d.status === "aborted" || f.status === "aborted")
            return g;
          (d.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(d.value, f.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of a) {
        const d = c.key, f = c.value;
        if (d.status === "aborted" || f.status === "aborted")
          return g;
        (d.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(d.value, f.value);
      }
      return { status: t.value, value: o };
    }
  }
}
Ot.create = (s, e, t) => new Ot({
  valueType: e,
  keyType: s,
  typeName: y.ZodMap,
  ..._(t)
});
class xe extends v {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.set)
      return u(r, {
        code: l.invalid_type,
        expected: h.set,
        received: r.parsedType
      }), g;
    const i = this._def;
    i.minSize !== null && r.data.size < i.minSize.value && (u(r, {
      code: l.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), t.dirty()), i.maxSize !== null && r.data.size > i.maxSize.value && (u(r, {
      code: l.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), t.dirty());
    const n = this._def.valueType;
    function a(c) {
      const d = /* @__PURE__ */ new Set();
      for (const f of c) {
        if (f.status === "aborted")
          return g;
        f.status === "dirty" && t.dirty(), d.add(f.value);
      }
      return { status: t.value, value: d };
    }
    const o = [...r.data.values()].map((c, d) => n._parse(new j(r, c, r.path, d)));
    return r.common.async ? Promise.all(o).then((c) => a(c)) : a(o);
  }
  min(e, t) {
    return new xe({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new xe({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
xe.create = (s, e) => new xe({
  valueType: s,
  minSize: null,
  maxSize: null,
  typeName: y.ZodSet,
  ..._(e)
});
class Ke extends v {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
Ke.create = (s, e) => new Ke({
  getter: s,
  typeName: y.ZodLazy,
  ..._(e)
});
class Ne extends v {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        received: t.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Ne.create = (s, e) => new Ne({
  value: s,
  typeName: y.ZodLiteral,
  ..._(e)
});
function Ht(s, e) {
  return new K({
    values: s,
    typeName: y.ZodEnum,
    ..._(e)
  });
}
class K extends v {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return u(t, {
        expected: x.joinValues(r),
        received: t.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return u(t, {
        received: t.data,
        code: l.invalid_enum_value,
        options: r
      }), g;
    }
    return I(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return K.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return K.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
K.create = Ht;
class Xe extends v {
  _parse(e) {
    const t = x.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== h.string && r.parsedType !== h.number) {
      const i = x.objectValues(t);
      return u(r, {
        expected: x.joinValues(i),
        received: r.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(x.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = x.objectValues(t);
      return u(r, {
        received: r.data,
        code: l.invalid_enum_value,
        options: i
      }), g;
    }
    return I(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Xe.create = (s, e) => new Xe({
  values: s,
  typeName: y.ZodNativeEnum,
  ..._(e)
});
class Pe extends v {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return u(t, {
        code: l.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), g;
    const r = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return I(r.then((i) => this._def.type.parseAsync(i, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
Pe.create = (s, e) => new Pe({
  type: s,
  typeName: y.ZodPromise,
  ..._(e)
});
class X extends v {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), i = this._def.effect || null, n = {
      addIssue: (a) => {
        u(r, a), a.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), i.type === "preprocess") {
      const a = i.transform(r.data, n);
      if (r.common.async)
        return Promise.resolve(a).then(async (o) => {
          if (t.value === "aborted")
            return g;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? g : c.status === "dirty" || t.value === "dirty" ? de(c.value) : c;
        });
      {
        if (t.value === "aborted")
          return g;
        const o = this._def.schema._parseSync({
          data: a,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? g : o.status === "dirty" || t.value === "dirty" ? de(o.value) : o;
      }
    }
    if (i.type === "refinement") {
      const a = (o) => {
        const c = i.refinement(o, n);
        if (r.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), a(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), a(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ae(a))
          return g;
        const o = i.transform(a.value, n);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => ae(a) ? Promise.resolve(i.transform(a.value, n)).then((o) => ({
          status: t.value,
          value: o
        })) : g);
    x.assertNever(i);
  }
}
X.create = (s, e, t) => new X({
  schema: s,
  typeName: y.ZodEffects,
  effect: e,
  ..._(t)
});
X.createWithPreprocess = (s, e, t) => new X({
  schema: e,
  effect: { type: "preprocess", transform: s },
  typeName: y.ZodEffects,
  ..._(t)
});
class Z extends v {
  _parse(e) {
    return this._getType(e) === h.undefined ? I(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Z.create = (s, e) => new Z({
  innerType: s,
  typeName: y.ZodOptional,
  ..._(e)
});
class Y extends v {
  _parse(e) {
    return this._getType(e) === h.null ? I(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Y.create = (s, e) => new Y({
  innerType: s,
  typeName: y.ZodNullable,
  ..._(e)
});
class Me extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === h.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Me.create = (s, e) => new Me({
  innerType: s,
  typeName: y.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class je extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Ce(i) ? i.then((n) => ({
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new U(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new U(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
je.create = (s, e) => new je({
  innerType: s,
  typeName: y.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class It extends v {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: l.invalid_type,
        expected: h.nan,
        received: r.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
}
It.create = (s) => new It({
  typeName: y.ZodNaN,
  ..._(s)
});
class Bt extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ot extends v {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return n.status === "aborted" ? g : n.status === "dirty" ? (t.dirty(), de(n.value)) : this._def.out._parseAsync({
          data: n.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return i.status === "aborted" ? g : i.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new ot({
      in: e,
      out: t,
      typeName: y.ZodPipeline
    });
  }
}
class Le extends v {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (i) => (ae(i) && (i.value = Object.freeze(i.value)), i);
    return Ce(t) ? t.then((i) => r(i)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Le.create = (s, e) => new Le({
  innerType: s,
  typeName: y.ZodReadonly,
  ..._(e)
});
var y;
(function(s) {
  s.ZodString = "ZodString", s.ZodNumber = "ZodNumber", s.ZodNaN = "ZodNaN", s.ZodBigInt = "ZodBigInt", s.ZodBoolean = "ZodBoolean", s.ZodDate = "ZodDate", s.ZodSymbol = "ZodSymbol", s.ZodUndefined = "ZodUndefined", s.ZodNull = "ZodNull", s.ZodAny = "ZodAny", s.ZodUnknown = "ZodUnknown", s.ZodNever = "ZodNever", s.ZodVoid = "ZodVoid", s.ZodArray = "ZodArray", s.ZodObject = "ZodObject", s.ZodUnion = "ZodUnion", s.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", s.ZodIntersection = "ZodIntersection", s.ZodTuple = "ZodTuple", s.ZodRecord = "ZodRecord", s.ZodMap = "ZodMap", s.ZodSet = "ZodSet", s.ZodFunction = "ZodFunction", s.ZodLazy = "ZodLazy", s.ZodLiteral = "ZodLiteral", s.ZodEnum = "ZodEnum", s.ZodEffects = "ZodEffects", s.ZodNativeEnum = "ZodNativeEnum", s.ZodOptional = "ZodOptional", s.ZodNullable = "ZodNullable", s.ZodDefault = "ZodDefault", s.ZodCatch = "ZodCatch", s.ZodPromise = "ZodPromise", s.ZodBranded = "ZodBranded", s.ZodPipeline = "ZodPipeline", s.ZodReadonly = "ZodReadonly";
})(y || (y = {}));
const $e = z.create, O = oe.create, cr = We.create;
F.create;
const me = M.create, R = k.create;
Re.create;
const lr = at.create;
Oe.create;
J.create;
const Ue = Ie.create, ue = Ne.create, Wt = K.create;
Pe.create;
Z.create;
Y.create;
const Nt = 1, dr = /^\d+\.\d+$/, T = $e().min(1), qt = R({
  x: O(),
  y: O(),
  width: O().positive(),
  height: O().positive()
}).strict(), ur = R({
  width: O().positive(),
  height: O().positive()
}).strict(), He = R({
  selector: T.optional(),
  bbox: qt
}).strict(), hr = R({
  selector: T.optional(),
  bbox: qt,
  value: $e().optional()
}).strict(), pr = lr("kind", [
  R({ kind: ue("click"), target: He }).strict(),
  R({ kind: ue("hover"), target: He }).strict(),
  R({
    kind: ue("type"),
    target: He,
    value: $e().optional()
  }).strict(),
  R({
    kind: ue("type-multi"),
    targets: me(hr).min(1)
  }).strict()
]), fr = R({
  screenshot: T,
  captureSize: ur,
  cursor: pr.nullable()
}).strict(), mr = R({
  frames: me(fr).min(1)
}).strict(), gr = Ue(T, mr), yr = Ue(T, gr), Pt = Ue(T, $e().nullable()), _r = Ue(T, T), vr = Wt([
  "navigate",
  "click",
  "fill",
  "fill-form",
  "select",
  "wait",
  "wait-for",
  "wait-for-text",
  "scroll",
  "hover",
  "keyboard",
  "assert",
  "custom",
  "auth0-login",
  "capture"
]), xr = R({
  id: T,
  index: O().int().positive(),
  action: vr,
  interactive: cr(),
  screenshotWhen: Wt(["before", "after"]),
  waitAfter: O().int().nonnegative(),
  text: Pt,
  subtitle: Pt.optional(),
  captures: yr
}).strict(), br = R({
  pre_action_ms: O().int().positive(),
  action_ms: O().int().positive(),
  post_action_ms: O().int().nonnegative(),
  travel_speed_px_per_ms: O().positive()
}).strict(), $r = R({
  version: $e().regex(dr, 'version must match "<major>.<minor>"'),
  slug: T,
  mode: ue("interactive"),
  role: T,
  title: _r,
  locales: me(T).min(1),
  defaultLocale: T,
  layouts: me(T),
  defaultLayout: T.nullable(),
  cursor: br,
  steps: me(xr).min(1)
}).strict().superRefine((s, e) => {
  s.locales.includes(s.defaultLocale) || e.addIssue({
    code: l.custom,
    path: ["defaultLocale"],
    message: `defaultLocale '${s.defaultLocale}' must appear in locales`
  }), s.layouts.length === 0 ? s.defaultLayout !== null && e.addIssue({
    code: l.custom,
    path: ["defaultLayout"],
    message: "defaultLayout must be null when layouts is empty"
  }) : s.defaultLayout === null ? e.addIssue({
    code: l.custom,
    path: ["defaultLayout"],
    message: "defaultLayout must be set when layouts is non-empty"
  }) : s.layouts.includes(s.defaultLayout) || e.addIssue({
    code: l.custom,
    path: ["defaultLayout"],
    message: `defaultLayout '${s.defaultLayout}' must appear in layouts`
  });
  for (const n of s.locales)
    n in s.title || e.addIssue({
      code: l.custom,
      path: ["title", n],
      message: `title missing for locale '${n}'`
    });
  const t = s.layouts.length > 0 ? s.layouts : ["_"], r = new Set(s.locales), i = new Set(t);
  s.steps.forEach((n, a) => {
    for (const o of s.locales) {
      const c = n.captures[o];
      if (!c) {
        e.addIssue({
          code: l.custom,
          path: ["steps", a, "captures", o],
          message: `step ${n.index}: missing captures for locale '${o}'`
        });
        continue;
      }
      for (const d of t)
        d in c || e.addIssue({
          code: l.custom,
          path: ["steps", a, "captures", o, d],
          message: `step ${n.index}: missing captures for locale '${o}' / layout '${d}'`
        });
      o in n.text || e.addIssue({
        code: l.custom,
        path: ["steps", a, "text", o],
        message: `step ${n.index}: missing text for locale '${o}'`
      });
    }
    for (const o of Object.keys(n.captures)) {
      if (!r.has(o)) {
        e.addIssue({
          code: l.custom,
          path: ["steps", a, "captures", o],
          message: `step ${n.index}: unexpected locale '${o}' in captures (not in manifest.locales)`
        });
        continue;
      }
      for (const c of Object.keys(n.captures[o]))
        i.has(c) || e.addIssue({
          code: l.custom,
          path: ["steps", a, "captures", o, c],
          message: `step ${n.index}: unexpected layout '${c}' (not in manifest.layouts)`
        });
    }
    for (const o of Object.keys(n.text))
      r.has(o) || e.addIssue({
        code: l.custom,
        path: ["steps", a, "text", o],
        message: `step ${n.index}: unexpected locale '${o}' in text`
      });
    if (n.subtitle)
      for (const o of Object.keys(n.subtitle))
        r.has(o) || e.addIssue({
          code: l.custom,
          path: ["steps", a, "subtitle", o],
          message: `step ${n.index}: unexpected locale '${o}' in subtitle`
        });
  });
  for (const n of Object.keys(s.title))
    r.has(n) || e.addIssue({
      code: l.custom,
      path: ["title", n],
      message: `unexpected locale '${n}' in title (not in manifest.locales)`
    });
});
function kr(s) {
  let e = s;
  if (typeof s == "string")
    try {
      e = JSON.parse(s);
    } catch (a) {
      return {
        ok: !1,
        error: {
          code: "invalid_json",
          message: a instanceof Error ? a.message : "invalid JSON"
        }
      };
    }
  const t = wr(e);
  if (t === null)
    return {
      ok: !1,
      error: {
        code: "version_missing",
        message: 'manifest is missing a top-level "version" string'
      }
    };
  const [r] = t.split("."), i = Number.parseInt(r ?? "", 10);
  if (!Number.isFinite(i))
    return {
      ok: !1,
      error: {
        code: "version_missing",
        message: `manifest version "${t}" is not a valid <major>.<minor> string`
      }
    };
  if (i !== Nt)
    return {
      ok: !1,
      error: {
        code: "version_unsupported",
        message: `manifest version ${t} is not supported (player handles major ${Nt}.x)`
      }
    };
  const n = $r.safeParse(e);
  return n.success ? { ok: !0, manifest: n.data } : {
    ok: !1,
    error: Ar(n.error)
  };
}
function wr(s) {
  if (s === null || typeof s != "object") return null;
  const e = s.version;
  return typeof e == "string" ? e : null;
}
function Ar(s) {
  return {
    code: "schema_invalid",
    message: "manifest failed schema validation",
    issues: s.issues.map((e) => ({
      path: e.path.map(String).join("."),
      message: e.message
    }))
  };
}
var Sr = Object.defineProperty, Tr = Object.getOwnPropertyDescriptor, w = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Tr(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (r ? a(e, t, i) : a(i)) || i);
  return r && i && Sr(e, t, i), i;
};
function Mt(s) {
  return { cursor: s.cursor, viewport: s.captureSize };
}
let $ = class extends pe {
  constructor() {
    super(...arguments), this.src = "", this.locale = null, this.variant = null, this.autoplay = !1, this.startIndex = 1, this.manifest = null, this.loadError = null, this.currentStepIndex = 0, this.currentFrameIndex = 0, this.currentTargetIndex = 0, this.waitingForInput = !1, this.completed = !1, this.missCount = 0, this.hotspotRect = null, this.tooltipPlacement = null, this.stageSize = { width: 0, height: 0 }, this.maxReachedStepIndex = 0, this.animator = null, this.stageRef = ee(), this.imgRef = ee(), this.cursorRef = ee(), this.rippleRef = ee(), this.kbdRef = ee(), this.tooltipRef = ee(), this.resizeObserver = null, this.autoAdvanceTimer = null, this.playToken = 0, this.waitForClick = null, this.resolveClick = null, this._handleKeyDown = (s) => {
      this.manifest && (s.key === "ArrowRight" ? this.currentStepIndex < this.maxReachedStepIndex && this._goToStep(this.currentStepIndex + 1, { reason: "key" }) : s.key === "ArrowLeft" && this.prev());
    }, this._onLocaleChange = (s) => {
      const e = s.target.value;
      this.manifest && this.manifest.locales.includes(e) && (this.locale = e, this._playCurrentPosition());
    }, this._onVariantChange = (s) => {
      const e = s.target.value;
      this.variant = this._resolveVariant(e), this._playCurrentPosition();
    }, this._onImgLoad = () => {
      this._recomputeHotspot();
    };
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this._handleKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeyDown), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.autoAdvanceTimer !== null && (clearTimeout(this.autoAdvanceTimer), this.autoAdvanceTimer = null), this.animator?.abort();
  }
  willUpdate(s) {
    s.has("src") && this._loadManifest(), s.has("locale") && this.manifest && this.locale && this._emit("steppy:locale", {
      from: s.get("locale"),
      to: this.locale
    }), s.has("variant") && this.manifest && this.variant && this._emit("steppy:variant", {
      from: s.get("variant"),
      to: this.variant
    }), (s.has("waitingForInput") || s.has("currentStepIndex") || s.has("currentFrameIndex") || s.has("currentTargetIndex") || s.has("locale") || s.has("variant") || s.has("stageSize")) && this._recomputeHotspot();
  }
  updated(s) {
    !this.animator && this.stageRef.value ? this.animator = this.constructor.createAnimator({
      stage: this.stageRef.value,
      timings: this.manifest?.cursor
    }) : this.animator && this.stageRef.value && (this.animator.refreshDom(), this.manifest && this.animator.setTimings(this.manifest.cursor)), s.has("manifest") && this.manifest && (this._setupResizeObserver(), this._restartFromStart());
  }
  // ── Public methods ───────────────────────────────────────────────────
  next() {
    this.manifest && (this.waitingForInput || this._advance());
  }
  prev() {
    this.manifest && (this.currentStepIndex <= 0 || this._goToStep(this.currentStepIndex - 1, { reason: "prev" }));
  }
  restart() {
    this.manifest && (this.completed = !1, this.maxReachedStepIndex = 0, this._goToStep(0, { reason: "restart" }));
  }
  goTo(s) {
    if (!this.manifest) return;
    const e = s - 1;
    if (e < 0 || e > this.maxReachedStepIndex) {
      this._emit("steppy:error", {
        code: "bad_attribute",
        message: `goTo(${s}) is out of range or beyond the furthest reached step`
      });
      return;
    }
    this._goToStep(e, { reason: "goTo" });
  }
  // ── Internals ────────────────────────────────────────────────────────
  async _loadManifest() {
    if (!this.src) {
      this.manifest = null, this.loadError = null;
      return;
    }
    this.manifest = null, this.loadError = null;
    try {
      const s = await fetch(this.src);
      if (!s.ok) {
        this.loadError = {
          code: "fetch_failed",
          message: `${s.status} ${s.statusText} fetching ${this.src}`
        }, this._emit("steppy:error", this.loadError);
        return;
      }
      const e = await s.text(), t = kr(e);
      if (!t.ok) {
        this.loadError = t.error, this._emit("steppy:error", t.error);
        return;
      }
      this.manifest = t.manifest, (!this.locale || !this.manifest.locales.includes(this.locale)) && (this.locale = this.manifest.defaultLocale);
      const r = this.variant ?? this.manifest.defaultLayout ?? this._fallbackLayoutKey();
      this.variant = this._resolveVariant(r);
    } catch (s) {
      this.loadError = {
        code: "fetch_failed",
        message: s instanceof Error ? s.message : "fetch failed"
      }, this._emit("steppy:error", this.loadError);
    }
  }
  _fallbackLayoutKey() {
    return this.manifest && this.manifest.layouts.length === 0 ? "_" : "desktop";
  }
  _resolveVariant(s) {
    if (!this.manifest) return "_";
    const e = this.manifest.layouts.length > 0 ? this.manifest.layouts : ["_"];
    return s && e.includes(s) ? s : this.manifest.defaultLayout ?? e[0];
  }
  async _restartFromStart() {
    if (!this.manifest) return;
    const s = Math.max(
      0,
      Math.min(this.manifest.steps.length - 1, (this.startIndex || 1) - 1)
    );
    this.maxReachedStepIndex = s, this._emit("steppy:ready", {
      slug: this.manifest.slug,
      total: this.manifest.steps.length,
      locale: this.locale,
      variant: this.variant
    }), this._goToStep(s, { reason: "init" });
  }
  _setupResizeObserver() {
    this.resizeObserver?.disconnect(), !(!this.stageRef.value || typeof ResizeObserver > "u") && (this.resizeObserver = new ResizeObserver((s) => {
      const e = s[0];
      e && (this.stageSize = {
        width: e.contentRect.width,
        height: e.contentRect.height
      }, this._recomputeHotspot());
    }), this.resizeObserver.observe(this.stageRef.value));
  }
  _currentStep() {
    return this.manifest?.steps[this.currentStepIndex] ?? null;
  }
  _currentFrame() {
    const s = this._currentStep();
    if (!s || !this.locale || !this.variant) return null;
    const e = s.captures[this.locale];
    if (!e) return null;
    const t = this.variant in e ? this.variant : Object.keys(e)[0], r = e[t];
    return r ? r.frames[this.currentFrameIndex] ?? null : null;
  }
  _currentTargetBbox() {
    const s = this._currentFrame();
    return !s || !s.cursor ? null : q.normalizeTargets(s.cursor)[this.currentTargetIndex]?.bbox ?? null;
  }
  _recomputeHotspot() {
    const s = this.imgRef.value, e = this._currentFrame();
    if (!s || !e || !this.waitingForInput) {
      this.hotspotRect = null, this.tooltipPlacement = null;
      return;
    }
    const t = this._currentTargetBbox();
    this.hotspotRect = Ms(s, e.captureSize, t), this._placeTooltip();
  }
  _placeTooltip() {
    if (!this.hotspotRect || !this.stageRef.value) {
      this.tooltipPlacement = null;
      return;
    }
    const s = this.stageRef.value.getBoundingClientRect(), e = this.tooltipRef.value, t = e ? { width: e.offsetWidth || 240, height: e.offsetHeight || 60 } : { width: 240, height: 60 };
    this.tooltipPlacement = js(
      this.hotspotRect,
      t,
      { width: s.width, height: s.height }
    );
  }
  _goToStep(s, e) {
    if (!this.manifest || s < 0 || s >= this.manifest.steps.length) return;
    this.currentStepIndex = s, this.currentFrameIndex = 0, this.currentTargetIndex = 0, this.completed = !1, this.missCount = 0, this.waitingForInput = !1, s > this.maxReachedStepIndex && (this.maxReachedStepIndex = s);
    const t = this._currentStep();
    this._emit("steppy:step", {
      index: t.index,
      id: t.id,
      total: this.manifest.steps.length,
      action: t.action,
      interactive: t.interactive,
      reason: e.reason
    }), this._playCurrentPosition();
  }
  async _playCurrentPosition() {
    const s = ++this.playToken;
    this.autoAdvanceTimer !== null && (clearTimeout(this.autoAdvanceTimer), this.autoAdvanceTimer = null);
    const e = this._currentFrame();
    if (!e) return;
    const t = this._currentStep();
    if (await this.updateComplete, this.playToken === s) {
      if (this.animator?.refreshDom(), e.cursor === null) {
        this.animator?.hide();
        const r = Math.max(0, t.waitAfter ?? 0) || 600;
        if (await new Promise((i) => {
          this.autoAdvanceTimer = setTimeout(() => {
            this.autoAdvanceTimer = null, i();
          }, r);
        }), this.playToken !== s) return;
        this._advance();
        return;
      }
      try {
        await this.animator?.travelToTarget(Mt(e), this.currentTargetIndex);
      } catch {
      }
      if (this.playToken === s && (this.waitingForInput = !0, this._recomputeHotspot(), this.waitForClick = new Promise((r) => {
        this.resolveClick = r;
      }), await this.waitForClick, this.playToken === s)) {
        this.waitingForInput = !1, this.hotspotRect = null, this.tooltipPlacement = null;
        try {
          await this.animator?.playTargetAction(Mt(e), this.currentTargetIndex);
        } catch {
        }
        this.playToken === s && this._advance();
      }
    }
  }
  _advance() {
    if (!this.manifest) return;
    const s = this._currentStep();
    if (!s) return;
    const e = this._currentFrame();
    if (!e) return;
    if (e.cursor) {
      const i = q.normalizeTargets(e.cursor);
      if (this.currentTargetIndex + 1 < i.length) {
        this.currentTargetIndex += 1, this._playCurrentPosition();
        return;
      }
    }
    const r = (s.captures[this.locale]?.[this.variant] ?? Object.values(s.captures[this.locale] ?? {})[0])?.frames.length ?? 1;
    if (this.currentFrameIndex + 1 < r) {
      this.currentFrameIndex += 1, this.currentTargetIndex = 0, this._playCurrentPosition();
      return;
    }
    if (this.currentStepIndex + 1 < this.manifest.steps.length) {
      this._goToStep(this.currentStepIndex + 1, { reason: "next" });
      return;
    }
    this.completed = !0, this.animator?.hide(), this._emit("steppy:complete", {
      slug: this.manifest.slug,
      locale: this.locale,
      variant: this.variant
    });
  }
  /** Idempotent: emits ``steppy:hotspot`` with target=correct and resolves the
   *  current wait. A second call is a no-op (the wait already advanced). */
  _confirmHotspotClick() {
    if (!this.resolveClick) return;
    const s = this._currentStep();
    s && this._emit("steppy:hotspot", {
      index: s.index,
      id: s.id,
      target: "correct"
    });
    const e = this.resolveClick;
    this.resolveClick = null, e();
  }
  _onStageClick(s) {
    if (!this.waitingForInput) return;
    const e = this._currentStep();
    e && (this.missCount += 1, this._emit("steppy:hotspot", {
      index: e.index,
      id: e.id,
      target: "miss"
    }));
  }
  _onHotspotClick(s) {
    s.stopPropagation(), this._confirmHotspotClick();
  }
  _emit(s, e) {
    this.dispatchEvent(
      new CustomEvent(s, { detail: e, bubbles: !0, composed: !0 })
    );
  }
  // ── Rendering ────────────────────────────────────────────────────────
  render() {
    const s = Ps(this.locale ?? "en", this.uiStrings);
    if (this.loadError) return this._renderError(this.loadError, s);
    if (!this.manifest) return this._renderLoading(s);
    const e = this._currentStep();
    if (!e) return this._renderLoading(s);
    const r = this._currentFrame()?.screenshot ?? "", i = e.text[this.locale] ?? "", n = this.manifest.steps.length;
    return S`
      <div class="steppy-wrapper">
        <div
          class="steppy-stage"
          ${te(this.stageRef)}
          @click=${this._onStageClick}
        >
          <img
            ${te(this.imgRef)}
            src=${r}
            alt=${i || e.id}
            @load=${this._onImgLoad}
          />
          <div class="steppy-cursor" ${te(this.cursorRef)} aria-hidden="true"></div>
          <div class="steppy-ripple" ${te(this.rippleRef)} aria-hidden="true"></div>
          <div class="steppy-kbd" ${te(this.kbdRef)} aria-hidden="true"></div>
          ${this._renderHotspot(s, e, i)}
          ${this._renderTooltip(i)}
          ${this.missCount > 0 ? this._renderMissToast(s) : b}
        </div>
        ${this._renderChrome(s, e, n)}
        ${this.completed ? S`<div class="steppy-state">${s.done}</div>` : b}
      </div>
    `;
  }
  _renderHotspot(s, e, t) {
    if (!this.waitingForInput || !this.hotspotRect) return b;
    const r = this.hotspotRect, i = $t(s.hotspotLabel, { step: t || e.id }), n = this.missCount;
    return S`
      <button
        class="steppy-hotspot ${this.missCount > 0 ? "miss" : ""}"
        style="left:${r.x}px;top:${r.y}px;width:${r.width}px;height:${r.height}px"
        aria-label=${i}
        data-miss-key=${n}
        @click=${this._onHotspotClick}
      ></button>
    `;
  }
  _renderTooltip(s) {
    if (!this.waitingForInput || !this.hotspotRect || !this.tooltipPlacement)
      return b;
    const e = this.tooltipPlacement;
    return S`
      <div
        class="steppy-tooltip"
        ${te(this.tooltipRef)}
        style="left:${e.x}px;top:${e.y}px"
        data-side=${e.side}
      >
        ${s}
      </div>
    `;
  }
  _renderMissToast(s) {
    return S`<div class="steppy-miss-toast" data-key=${this.missCount}>${s.miss}</div>`;
  }
  _renderChrome(s, e, t) {
    const r = this.manifest.locales, i = this.manifest.layouts.length > 0 ? this.manifest.layouts : [];
    return S`
      <div class="steppy-chrome">
        <span class="steppy-progress" aria-live="polite">
          ${$t(s.progress, { current: e.index, total: t })}
        </span>
        <button
          @click=${() => this.prev()}
          ?disabled=${this.currentStepIndex <= 0}
        >
          ${s.previous}
        </button>
        <button
          @click=${() => this.next()}
          ?disabled=${this.waitingForInput || this.completed}
          title=${this.waitingForInput ? s.hotspotLabel : ""}
        >
          ${s.next}
        </button>
        <button @click=${() => this.restart()}>${s.restart}</button>
        ${r.length > 1 ? S`
              <label>
                ${s.localeSwitcher}
                <select @change=${this._onLocaleChange} .value=${this.locale ?? ""}>
                  ${r.map(
      (n) => S`<option value=${n} ?selected=${n === this.locale}>
                        ${n}
                      </option>`
    )}
                </select>
              </label>
            ` : b}
        ${i.length > 1 ? S`
              <label>
                ${s.variantSwitcher}
                <select @change=${this._onVariantChange} .value=${this.variant ?? ""}>
                  ${i.map(
      (n) => S`<option value=${n} ?selected=${n === this.variant}>
                        ${n}
                      </option>`
    )}
                </select>
              </label>
            ` : b}
      </div>
    `;
  }
  _renderLoading(s) {
    return S`<div class="steppy-state" role="status">${s.loading}</div>`;
  }
  _renderError(s, e) {
    const t = s.issues && s.issues.length > 0 ? S`<div class="steppy-state-detail">
            ${s.issues.map((r) => S`<div>${r.path}: ${r.message}</div>`)}
          </div>` : S`<div class="steppy-state-detail">${s.message}</div>`;
    return S`
      <div class="steppy-state error" role="alert">
        <strong>${e.errorTitle}</strong>
        ${t}
        <button
          style="margin-top: 12px"
          @click=${() => void this._loadManifest()}
        >
          ${e.errorRetry}
        </button>
      </div>
    `;
  }
};
$.createAnimator = (s) => new q(s);
$.styles = Jt`
    :host {
      display: block;
      position: relative;
      font-family: var(--steppy-font-family, system-ui, -apple-system, sans-serif);
      color: var(--steppy-fg, #0f172a);
      --steppy-cursor-size: 24px;
      --steppy-cursor-color: #0f172a;
      --steppy-ripple-color: rgba(15, 23, 42, 0.25);
      --steppy-hotspot-color: rgba(59, 130, 246, 0.95);
      --steppy-hotspot-glow: rgba(59, 130, 246, 0.4);
      --steppy-tooltip-bg: #0f172a;
      --steppy-tooltip-fg: #fff;
      --steppy-chrome-bg: #f8fafc;
    }
    .steppy-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .steppy-stage {
      position: relative;
      width: 100%;
      background: #f1f5f9;
      overflow: hidden;
      border-radius: 8px;
      user-select: none;
    }
    .steppy-stage img {
      display: block;
      width: 100%;
      height: auto;
      pointer-events: none;
    }
    .steppy-cursor {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--steppy-cursor-size);
      height: var(--steppy-cursor-size);
      pointer-events: none;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      background: var(--steppy-cursor-color);
      clip-path: polygon(0 0, 0 75%, 25% 55%, 45% 95%, 60% 85%, 40% 50%, 75% 40%);
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
      transform-origin: 0 0;
      z-index: 4;
    }
    .steppy-cursor.visible {
      opacity: 1;
    }
    .steppy-cursor.pulse {
      animation: steppy-pulse 200ms ease-in-out;
    }
    @keyframes steppy-pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.25);
      }
    }
    .steppy-ripple {
      position: absolute;
      top: 0;
      left: 0;
      width: 12px;
      height: 12px;
      margin: -6px;
      border-radius: 50%;
      background: transparent;
      border: 2px solid var(--steppy-ripple-color);
      pointer-events: none;
      opacity: 0;
      z-index: 3;
    }
    .steppy-ripple.fire {
      animation: steppy-ripple 400ms ease-out forwards;
    }
    @keyframes steppy-ripple {
      0% {
        transform: scale(0.6);
        opacity: 1;
      }
      100% {
        transform: scale(3);
        opacity: 0;
      }
    }
    .steppy-kbd {
      position: absolute;
      top: 0;
      left: 0;
      background: #0f172a;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      opacity: 0;
      transition: opacity 120ms;
      pointer-events: none;
      z-index: 5;
    }
    .steppy-kbd.visible {
      opacity: 1;
    }
    .steppy-hotspot {
      position: absolute;
      box-sizing: border-box;
      background: transparent;
      border: 2px solid var(--steppy-hotspot-color);
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
      z-index: 2;
      transition: outline-offset 120ms;
      animation: steppy-hotspot-pulse 1500ms ease-in-out infinite;
      box-shadow: 0 0 0 4px var(--steppy-hotspot-glow);
    }
    .steppy-hotspot:focus-visible {
      outline: 3px solid var(--steppy-hotspot-color);
      outline-offset: 4px;
    }
    .steppy-hotspot.miss {
      animation: steppy-hotspot-shake 400ms;
    }
    @keyframes steppy-hotspot-pulse {
      0%,
      100% {
        box-shadow: 0 0 0 4px var(--steppy-hotspot-glow);
      }
      50% {
        box-shadow: 0 0 0 10px transparent;
      }
    }
    @keyframes steppy-hotspot-shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-6px);
      }
      75% {
        transform: translateX(6px);
      }
    }
    .steppy-tooltip {
      position: absolute;
      background: var(--steppy-tooltip-bg);
      color: var(--steppy-tooltip-fg);
      padding: 8px 12px;
      border-radius: 6px;
      max-width: 280px;
      font-size: 14px;
      line-height: 1.4;
      z-index: 6;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .steppy-miss-toast {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 16px;
      background: rgba(15, 23, 42, 0.9);
      color: #fff;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      z-index: 7;
      pointer-events: none;
      animation: steppy-toast 1400ms ease-out forwards;
    }
    @keyframes steppy-toast {
      0%,
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    .steppy-stage-click-catcher {
      position: absolute;
      inset: 0;
      z-index: 1;
      cursor: default;
    }
    .steppy-chrome {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      background: var(--steppy-chrome-bg);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
    }
    .steppy-chrome > * {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .steppy-chrome button,
    .steppy-chrome select {
      font: inherit;
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
    }
    .steppy-chrome button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .steppy-progress {
      margin-right: auto;
      font-variant-numeric: tabular-nums;
    }
    .steppy-state {
      padding: 24px;
      text-align: center;
      color: #475569;
    }
    .steppy-state.error {
      color: #b91c1c;
      background: #fef2f2;
      border-radius: 6px;
    }
    .steppy-state .steppy-state-detail {
      font-size: 12px;
      margin-top: 8px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      white-space: pre-wrap;
      text-align: left;
      max-height: 200px;
      overflow: auto;
    }
  `;
w([
  Q({ type: String, reflect: !0 })
], $.prototype, "src", 2);
w([
  Q({ type: String, reflect: !0 })
], $.prototype, "locale", 2);
w([
  Q({ type: String, reflect: !0 })
], $.prototype, "variant", 2);
w([
  Q({ type: Boolean, reflect: !0 })
], $.prototype, "autoplay", 2);
w([
  Q({ type: Number, reflect: !0, attribute: "start-index" })
], $.prototype, "startIndex", 2);
w([
  Q({ attribute: !1 })
], $.prototype, "uiStrings", 2);
w([
  N()
], $.prototype, "manifest", 2);
w([
  N()
], $.prototype, "loadError", 2);
w([
  N()
], $.prototype, "currentStepIndex", 2);
w([
  N()
], $.prototype, "currentFrameIndex", 2);
w([
  N()
], $.prototype, "currentTargetIndex", 2);
w([
  N()
], $.prototype, "waitingForInput", 2);
w([
  N()
], $.prototype, "completed", 2);
w([
  N()
], $.prototype, "missCount", 2);
w([
  N()
], $.prototype, "hotspotRect", 2);
w([
  N()
], $.prototype, "tooltipPlacement", 2);
w([
  N()
], $.prototype, "stageSize", 2);
$ = w([
  ys("steppy-guide")
], $);
export {
  q as CursorAnimator,
  bt as DEFAULT_UI_STRINGS,
  $r as GuideManifestSchema,
  Nt as SUPPORTED_MAJOR_VERSION,
  $ as SteppyGuide,
  Ns as bezierControlPoint,
  Rs as easeInOut,
  it as getDisplayScale,
  kr as parseManifest,
  Os as rectCenter,
  xt as scaleBbox,
  nt as scaleRect,
  Is as travelDuration
};
//# sourceMappingURL=steppy-player.js.map
