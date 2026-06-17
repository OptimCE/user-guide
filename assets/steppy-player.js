/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, it = Ae.ShadowRoot && (Ae.ShadyCSS === void 0 || Ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0, r !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (it && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = xt.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && xt.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ds = (t) => new Gt(typeof t == "string" ? t : t + "", void 0, nt), Ue = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, n) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[n + 1], t[0]);
  return new Gt(s, t, nt);
}, us = (t, e) => {
  if (it) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = Ae.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, bt = it ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return ds(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ps, defineProperty: hs, getOwnPropertyDescriptor: fs, getOwnPropertyNames: ms, getOwnPropertySymbols: ys, getPrototypeOf: gs } = Object, Ve = globalThis, $t = Ve.trustedTypes, vs = $t ? $t.emptyScript : "", _s = Ve.reactiveElementPolyfillSupport, he = (t, e) => t, Ce = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? vs : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, at = (t, e) => !ps(t, e), wt = { attribute: !0, type: String, converter: Ce, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ??= Symbol("metadata"), Ve.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let re = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = wt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && hs(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: n } = fs(this.prototype, e) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      n?.call(this, a), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(he("elementProperties"))) return;
    const e = gs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(he("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(he("properties"))) {
      const s = this.properties, r = [...ms(s), ...ys(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) s.unshift(bt(i));
    } else e !== void 0 && s.push(bt(e));
    return s;
  }
  static _$Eu(e, s) {
    const r = s.attribute;
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
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return us(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, s, r) {
    this._$AK(e, r);
  }
  _$ET(e, s) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : Ce).toAttribute(s, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, s) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ce;
      this._$Em = i;
      const o = a.fromAttribute(s, n.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? at)(n, s) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: r, reflect: i, wrapped: n }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? s ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[he("elementProperties")] = /* @__PURE__ */ new Map(), re[he("finalized")] = /* @__PURE__ */ new Map(), _s?.({ ReactiveElement: re }), (Ve.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, kt = (t) => t, Ee = ot.trustedTypes, St = Ee ? Ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Kt = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Jt = "?" + F, xs = `<${Jt}>`, J = document, ve = () => J.createComment(""), _e = (t) => t === null || typeof t != "object" && typeof t != "function", lt = Array.isArray, bs = (t) => lt(t) || typeof t?.[Symbol.iterator] == "function", We = `[ 	
\f\r]`, de = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, At = />/g, B = RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ct = /'/g, Et = /"/g, Yt = /^(?:script|style|textarea|title)$/i, $s = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), _ = $s(1), ne = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), q = J.createTreeWalker(J, 129);
function Xt(t, e) {
  if (!lt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return St !== void 0 ? St.createHTML(e) : e;
}
const ws = (t, e) => {
  const s = t.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = de;
  for (let o = 0; o < s; o++) {
    const l = t[o];
    let d, f, m = -1, T = 0;
    for (; T < l.length && (a.lastIndex = T, f = a.exec(l), f !== null); ) T = a.lastIndex, a === de ? f[1] === "!--" ? a = Tt : f[1] !== void 0 ? a = At : f[2] !== void 0 ? (Yt.test(f[2]) && (i = RegExp("</" + f[2], "g")), a = B) : f[3] !== void 0 && (a = B) : a === B ? f[0] === ">" ? (a = i ?? de, m = -1) : f[1] === void 0 ? m = -2 : (m = a.lastIndex - f[2].length, d = f[1], a = f[3] === void 0 ? B : f[3] === '"' ? Et : Ct) : a === Et || a === Ct ? a = B : a === Tt || a === At ? a = de : (a = B, i = void 0);
    const E = a === B && t[o + 1].startsWith("/>") ? " " : "";
    n += a === de ? l + xs : m >= 0 ? (r.push(d), l.slice(0, m) + Kt + l.slice(m) + F + E) : l + F + (m === -2 ? o : E);
  }
  return [Xt(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class xe {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, f] = ws(e, s);
    if (this.el = xe.createElement(d, r), q.currentNode = this.el.content, s === 2 || s === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (i = q.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const m of i.getAttributeNames()) if (m.endsWith(Kt)) {
          const T = f[a++], E = i.getAttribute(m).split(F), P = /([.?@])?(.*)/.exec(T);
          l.push({ type: 1, index: n, name: P[2], strings: E, ctor: P[1] === "." ? Ss : P[1] === "?" ? Ts : P[1] === "@" ? As : Fe }), i.removeAttribute(m);
        } else m.startsWith(F) && (l.push({ type: 6, index: n }), i.removeAttribute(m));
        if (Yt.test(i.tagName)) {
          const m = i.textContent.split(F), T = m.length - 1;
          if (T > 0) {
            i.textContent = Ee ? Ee.emptyScript : "";
            for (let E = 0; E < T; E++) i.append(m[E], ve()), q.nextNode(), l.push({ type: 2, index: ++n });
            i.append(m[T], ve());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Jt) l.push({ type: 2, index: n });
      else {
        let m = -1;
        for (; (m = i.data.indexOf(F, m + 1)) !== -1; ) l.push({ type: 7, index: n }), m += F.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const r = J.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ae(t, e, s = t, r) {
  if (e === ne) return e;
  let i = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const n = _e(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = i : s._$Cl = i), i !== void 0 && (e = ae(t, i._$AS(t, e.values), i, r)), e;
}
class ks {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: r } = this._$AD, i = (e?.creationScope ?? J).importNode(s, !0);
    q.currentNode = i;
    let n = q.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new we(n, n.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (d = new Cs(n, this, e)), this._$AV.push(d), l = r[++o];
      }
      a !== l?.index && (n = q.nextNode(), a++);
    }
    return q.currentNode = J, i;
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s), s += r.strings.length - 2) : r._$AI(e[s])), s++;
  }
}
class we {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, s, r, i) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && e?.nodeType === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = ae(this, e, s), _e(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ne && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : bs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && _e(this._$AH) ? this._$AA.nextSibling.data = e : this.T(J.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = xe.createElement(Xt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const n = new ks(i, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let s = Rt.get(e.strings);
    return s === void 0 && Rt.set(e.strings, s = new xe(e)), s;
  }
  k(e) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const n of e) i === s.length ? s.push(r = new we(this.O(ve()), this.O(ve()), this, this.options)) : r = s[i], r._$AI(n), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); e !== this._$AB; ) {
      const r = kt(e).nextSibling;
      kt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Fe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, r, i, n) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = b;
  }
  _$AI(e, s = this, r, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = ae(this, e, s, 0), a = !_e(e) || e !== this._$AH && e !== ne, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = ae(this, o[r + l], s, l), d === ne && (d = this._$AH[l]), a ||= !_e(d) || d !== this._$AH[l], d === b ? e = b : e !== b && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ss extends Fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Ts extends Fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class As extends Fe {
  constructor(e, s, r, i, n) {
    super(e, s, r, i, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = ae(this, e, s, 0) ?? b) === ne) return;
    const r = this._$AH, i = e === b && r !== b || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== b && (r === b || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Cs {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
}
const Es = ot.litHtmlPolyfillSupport;
Es?.(xe, we), (ot.litHtmlVersions ??= []).push("3.3.3");
const Rs = (t, e, s) => {
  const r = s?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = s?.renderBefore ?? null;
    r._$litPart$ = i = new we(e.insertBefore(ve(), n), n, void 0, s ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis;
let fe = class extends re {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Rs(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ne;
  }
};
fe._$litElement$ = !0, fe.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: fe });
const Os = ct.litElementPolyfillSupport;
Os?.({ LitElement: fe });
(ct.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ns = { attribute: !0, type: String, converter: Ce, reflect: !1, hasChanged: at }, Ps = (t = Ns, e, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), r === "accessor") {
    const { name: a } = s;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = s;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function j(t) {
  return (e, s) => typeof s == "object" ? Ps(t, e, s) : ((r, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(t) {
  return j({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ms = { CHILD: 2 }, js = (t) => (...e) => ({ _$litDirective$: t, values: e });
class zs {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, r) {
    this._$Ct = e, this._$AM = s, this._$Ci = r;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = (t, e) => {
  const s = t._$AN;
  if (s === void 0) return !1;
  for (const r of s) r._$AO?.(e, !1), me(r, e);
  return !0;
}, Re = (t) => {
  let e, s;
  do {
    if ((e = t._$AM) === void 0) break;
    s = e._$AN, s.delete(t), t = e;
  } while (s?.size === 0);
}, Qt = (t) => {
  for (let e; e = t._$AM; t = e) {
    let s = e._$AN;
    if (s === void 0) e._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(t)) break;
    s.add(t), Us(e);
  }
};
function Zs(t) {
  this._$AN !== void 0 ? (Re(this), this._$AM = t, Qt(this)) : this._$AM = t;
}
function Ds(t, e = !1, s = 0) {
  const r = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (e) if (Array.isArray(r)) for (let n = s; n < r.length; n++) me(r[n], !1), Re(r[n]);
  else r != null && (me(r, !1), Re(r));
  else me(this, t);
}
const Us = (t) => {
  t.type == Ms.CHILD && (t._$AP ??= Ds, t._$AQ ??= Zs);
};
class Vs extends zs {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, s, r) {
    super._$AT(e, s, r), Qt(this), this.isConnected = e._$AU;
  }
  _$AO(e, s = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), s && (me(this, e), Re(this));
  }
  setValue(e) {
    if (Ls(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = e, this._$Ct._$AI(s, this, 0);
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
const te = () => new Fs();
class Fs {
}
const qe = /* @__PURE__ */ new WeakMap(), se = js(class extends Vs {
  render(t) {
    return b;
  }
  update(t, [e]) {
    const s = e !== this.G;
    return s && this.rt(void 0), (s || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), b;
  }
  rt(t) {
    if (this.G !== void 0) if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let s = qe.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), qe.set(e, s)), s.get(this.G) !== void 0 && this.G.call(this.ht, void 0), s.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? qe.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Hs = {
  pre_action_ms: 200,
  action_ms: 300,
  post_action_ms: 150,
  travel_speed_px_per_ms: 1.5
}, W = (t) => new Promise((e) => setTimeout(e, Math.max(0, t)));
function Bs(t) {
  return t * t * (3 - 2 * t);
}
function dt(t, e) {
  if (!e || !e.width || !e.height) return null;
  const s = t.getBoundingClientRect();
  return !s.width || !s.height ? null : { sx: s.width / e.width, sy: s.height / e.height };
}
function ut(t, e) {
  return {
    x: t.x * e.sx,
    y: t.y * e.sy,
    width: t.width * e.sx,
    height: t.height * e.sy
  };
}
function Ws(t) {
  return { x: t.x + t.width / 2, y: t.y + t.height / 2 };
}
function Ot(t, e, s) {
  if (!t) return null;
  const r = dt(e, s);
  return r ? Ws(ut(t, r)) : null;
}
function qs(t, e, s) {
  const r = e.x - t.x, i = e.y - t.y, n = Math.hypot(r, i);
  return Math.max(150, n / (s || 1.5));
}
function Gs(t, e) {
  const s = e.x - t.x, r = e.y - t.y, i = Math.hypot(s, r);
  if (!i) return { x: t.x, y: t.y };
  const n = (t.x + e.x) / 2, a = (t.y + e.y) / 2, o = -r / i, l = s / i;
  return { x: n + o * i * 0.15, y: a + l * i * 0.15 };
}
class G {
  constructor(e) {
    this.cursorEl = null, this.rippleEl = null, this.kbdEl = null, this.imgEl = null, this.currentPos = { x: 8, y: 8 }, this.aborted = !1, this.stage = e.stage, this.timings = { ...Hs, ...e.timings ?? {} }, this.onPhaseChange = e.onPhaseChange, this.refreshDom();
  }
  setTimings(e) {
    this.timings = { ...this.timings, ...e };
  }
  /** Re-point the animator at a (possibly relocated) stage element and re-read
   *  its children. Needed when a host re-mounts the stage subtree — e.g. the
   *  Lit player switching presentation templates moves ``.steppy-stage`` to a
   *  new DOM position, and the cached ``stage`` ref would otherwise go stale. */
  setStage(e) {
    this.stage = e, this.refreshDom();
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
    const s = e.target, r = e.kind === "type" ? e.value : void 0;
    return [
      {
        bbox: s.bbox,
        value: r,
        selector: s.selector,
        kind: e.kind === "click" ? "click" : e.kind === "hover" ? "hover" : "type"
      }
    ];
  }
  /** Wait for the screenshot ``<img>`` to be ready (load or error). */
  async waitImageReady() {
    const e = this.imgEl;
    e && (e.complete && e.naturalWidth || await new Promise((s) => {
      const r = () => s();
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
    const s = G.normalizeTargets(e.cursor);
    this.currentPos = { x: 8, y: 8 }, this.cursorEl.classList.add("visible");
    for (let r = 0; r < s.length; r++) {
      if (this.aborted || (await this.travelToTargetIndex(e, s, r), this.aborted) || (await this.playTargetActionIndex(e, s, r), this.aborted)) return;
      await W(this.timings.post_action_ms);
    }
  }
  /**
   * Interactive mode: move the cursor to ``targetIndex`` and pulse it. Caller
   * waits for user input before invoking ``playTargetAction``.
   */
  async travelToTarget(e, s) {
    if (this.aborted = !1, this.refreshDom(), !this.cursorEl) return;
    if (!e.cursor) {
      this.hide();
      return;
    }
    await this.waitImageReady();
    const r = G.normalizeTargets(e.cursor);
    this.cursorEl.classList.add("visible"), await this.travelToTargetIndex(e, r, s);
  }
  /**
   * Interactive mode: run the action animation for ``targetIndex`` and the
   * post-action settling beat.
   */
  async playTargetAction(e, s) {
    if (this.aborted = !1, this.refreshDom(), !e.cursor) return;
    const r = G.normalizeTargets(e.cursor);
    await this.playTargetActionIndex(e, r, s), !this.aborted && await W(this.timings.post_action_ms);
  }
  /**
   * Pure helper: project a capture-space bbox into the displayed coordinate
   * space. Returns ``null`` when the image hasn't laid out yet. Exposed so
   * the Lit player can place hotspots without duplicating the math.
   */
  computeDisplayRect(e, s) {
    const r = this.imgEl;
    if (!r || !e) return null;
    const i = dt(r, s);
    return i ? ut(e, i) : null;
  }
  // ── Internal building blocks ───────────────────────────────────────────
  async travelToTargetIndex(e, s, r) {
    const i = s[r], n = this.cursorEl;
    if (!i || !n) return;
    const a = Ot(i.bbox, this.imgEl, e.viewport);
    a && (this.onPhaseChange?.("travel", i), await this.travelTo(n, this.currentPos, a), this.currentPos = a, this.onPhaseChange?.("pre-action", i), n.classList.remove("pulse"), n.offsetWidth, n.classList.add("pulse"), await W(this.timings.pre_action_ms), n.classList.remove("pulse"));
  }
  async playTargetActionIndex(e, s, r) {
    const i = s[r];
    if (!i) return;
    const n = Ot(i.bbox, this.imgEl, e.viewport) || this.currentPos;
    this.onPhaseChange?.("action", i), i.kind === "click" ? (this.rippleEl && this.fireClick(this.rippleEl, n), await W(this.timings.action_ms)) : i.kind === "type" ? this.kbdEl && await this.typeValue(this.kbdEl, n, i.value) : await W(this.timings.action_ms), this.onPhaseChange?.("post-action", i);
  }
  async travelTo(e, s, r) {
    const i = qs(s, r, this.timings.travel_speed_px_per_ms), n = Gs(s, r);
    return new Promise((a) => {
      const o = performance.now(), l = (d) => {
        if (this.aborted) {
          a();
          return;
        }
        const f = Math.min(1, (d - o) / i), m = Bs(f), T = (1 - m) * (1 - m) * s.x + 2 * (1 - m) * m * n.x + m * m * r.x, E = (1 - m) * (1 - m) * s.y + 2 * (1 - m) * m * n.y + m * m * r.y;
        e.style.left = `${T}px`, e.style.top = `${E}px`, f < 1 ? requestAnimationFrame(l) : a();
      };
      requestAnimationFrame(l);
    });
  }
  fireClick(e, s) {
    e.style.left = `${s.x}px`, e.style.top = `${s.y}px`, e.classList.remove("fire"), e.offsetWidth, e.classList.add("fire");
  }
  async typeValue(e, s, r) {
    e.style.left = `${s.x + 16}px`, e.style.top = `${s.y + 16}px`, e.textContent = "", e.classList.add("visible");
    const i = (r ?? "").split(""), n = i.length ? this.timings.action_ms / i.length : this.timings.action_ms;
    for (const a of i) {
      if (this.aborted) break;
      e.textContent = (e.textContent ?? "") + a, await W(n);
    }
    await W(80), e.classList.remove("visible");
  }
}
const It = {
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
    done: "Done!",
    templateSwitcher: "Presentation",
    templateOverlay: "Overlay",
    templateSidebar: "Sidebar",
    templateInline: "Inline",
    stepsMeta: "{count} steps · {duration}",
    durationApprox: "~{minutes} min",
    durationSeconds: "~{seconds} s",
    stepPassed: "Done"
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
    done: "Terminé !",
    templateSwitcher: "Présentation",
    templateOverlay: "Superposé",
    templateSidebar: "Latéral",
    templateInline: "En ligne",
    stepsMeta: "{count} étapes · {duration}",
    durationApprox: "~{minutes} min",
    durationSeconds: "~{seconds} s",
    stepPassed: "Terminé"
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
    done: "Klaar!",
    templateSwitcher: "Presentatie",
    templateOverlay: "Overlay",
    templateSidebar: "Zijbalk",
    templateInline: "Inline",
    stepsMeta: "{count} stappen · {duration}",
    durationApprox: "~{minutes} min",
    durationSeconds: "~{seconds} s",
    stepPassed: "Klaar"
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
    done: "Fertig!",
    templateSwitcher: "Darstellung",
    templateOverlay: "Overlay",
    templateSidebar: "Seitlich",
    templateInline: "Inline",
    stepsMeta: "{count} Schritte · {duration}",
    durationApprox: "~{minutes} min",
    durationSeconds: "~{seconds} s",
    stepPassed: "Fertig"
  }
};
function Nt(t, e) {
  const s = It[t] ?? It.en, r = e?.[t];
  return r ? { ...s, ...r } : s;
}
function ye(t, e) {
  return t.replace(
    /\{(\w+)\}/g,
    (s, r) => r in e ? String(e[r]) : `{${r}}`
  );
}
function Ks(t, e, s) {
  if (!s) return null;
  const r = dt(t, e);
  return r ? ut(s, r) : null;
}
function Js(t, e, s, r = 8) {
  const i = t.y, n = s.height - (t.y + t.height), a = t.x, o = s.width - (t.x + t.width), l = e.height + r, d = e.width + r, f = n >= i ? { side: "bottom", room: n } : { side: "top", room: i };
  let m;
  if (f.room >= l)
    m = f.side;
  else {
    const _t = o >= a ? { side: "right", room: o } : { side: "left", room: a };
    m = _t.room >= d ? _t.side : f.side;
  }
  const T = t.x + t.width / 2, E = t.y + t.height / 2;
  let P = 0, ce = 0;
  return m === "bottom" ? (P = Se(T - e.width / 2, 0, s.width - e.width), ce = Math.min(t.y + t.height + r, s.height - e.height)) : m === "top" ? (P = Se(T - e.width / 2, 0, s.width - e.width), ce = Math.max(0, t.y - e.height - r)) : m === "right" ? (P = Math.min(t.x + t.width + r, s.width - e.width), ce = Se(E - e.height / 2, 0, s.height - e.height)) : (P = Math.max(0, t.x - e.width - r), ce = Se(E - e.height / 2, 0, s.height - e.height)), { side: m, x: P, y: ce };
}
function Se(t, e, s) {
  return Math.max(e, Math.min(s, t));
}
const Ys = "`([^`]+)`|\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+|mailto:[^\\s)]+|\\/[^\\s)]*|#[^\\s)]*)\\)|(\\*\\*|__)(\\S(?:.*?\\S)?)\\4|(\\*|_)([^*_\\s](?:[^*_]*?[^*_\\s])?)\\6|(https?:\\/\\/[^\\s<>()]+|www\\.[^\\s<>()]+)|([\\w.+-]+@[\\w-]+\\.[\\w.-]+\\w)";
function K(t) {
  const e = [], s = (a) => a.split(`
`).forEach((o, l) => {
    l > 0 && e.push(_`<br />`), o && e.push(o);
  }), r = new RegExp(Ys, "g");
  let i = 0, n;
  for (; n = r.exec(t); ) {
    if (n.index > i && s(t.slice(i, n.index)), n[1] != null)
      e.push(_`<code>${n[1]}</code>`);
    else if (n[2] != null)
      e.push(
        _`<a href=${n[3]} target="_blank" rel="noopener noreferrer"
          >${K(n[2])}</a
        >`
      );
    else if (n[4] != null)
      e.push(_`<strong>${K(n[5])}</strong>`);
    else if (n[6] != null)
      e.push(_`<em>${K(n[7])}</em>`);
    else if (n[8] != null) {
      const a = n[8], o = (a.match(/[.,;:!?]+$/) ?? [""])[0], l = o ? a.slice(0, -o.length) : a, d = l.startsWith("www.") ? `https://${l}` : l;
      e.push(_`<a href=${d} target="_blank" rel="noopener noreferrer">${l}</a>`), o && s(o);
    } else n[9] != null && e.push(_`<a href=${`mailto:${n[9]}`}>${n[9]}</a>`);
    i = n.index + n[0].length;
  }
  return i < t.length && s(t.slice(i)), e;
}
var $;
(function(t) {
  t.assertEqual = (i) => {
  };
  function e(i) {
  }
  t.assertIs = e;
  function s(i) {
    throw new Error();
  }
  t.assertNever = s, t.arrayToEnum = (i) => {
    const n = {};
    for (const a of i)
      n[a] = a;
    return n;
  }, t.getValidEnumValues = (i) => {
    const n = t.objectKeys(i).filter((o) => typeof i[i[o]] != "number"), a = {};
    for (const o of n)
      a[o] = i[o];
    return t.objectValues(a);
  }, t.objectValues = (i) => t.objectKeys(i).map(function(n) {
    return i[n];
  }), t.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const n = [];
    for (const a in i)
      Object.prototype.hasOwnProperty.call(i, a) && n.push(a);
    return n;
  }, t.find = (i, n) => {
    for (const a of i)
      if (n(a))
        return a;
  }, t.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && Number.isFinite(i) && Math.floor(i) === i;
  function r(i, n = " | ") {
    return i.map((a) => typeof a == "string" ? `'${a}'` : a).join(n);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (i, n) => typeof n == "bigint" ? n.toString() : n;
})($ || ($ = {}));
var Pt;
(function(t) {
  t.mergeShapes = (e, s) => ({
    ...e,
    ...s
    // second overwrites first
  });
})(Pt || (Pt = {}));
const p = $.arrayToEnum([
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
]), V = (t) => {
  switch (typeof t) {
    case "undefined":
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return Number.isNaN(t) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(t) ? p.array : t === null ? p.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? p.promise : typeof Map < "u" && t instanceof Map ? p.map : typeof Set < "u" && t instanceof Set ? p.set : typeof Date < "u" && t instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, c = $.arrayToEnum([
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
    const s = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, s) : this.__proto__ = s, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const s = e || function(n) {
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
          r._errors.push(s(a));
        else {
          let o = r, l = 0;
          for (; l < a.path.length; ) {
            const d = a.path[l];
            l === a.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(s(a))) : o[d] = o[d] || { _errors: [] }, o = o[d], l++;
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
    return JSON.stringify(this.issues, $.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (s) => s.message) {
    const s = {}, r = [];
    for (const i of this.issues)
      if (i.path.length > 0) {
        const n = i.path[0];
        s[n] = s[n] || [], s[n].push(e(i));
      } else
        r.push(e(i));
    return { formErrors: r, fieldErrors: s };
  }
  get formErrors() {
    return this.flatten();
  }
}
U.create = (t) => new U(t);
const Ye = (t, e) => {
  let s;
  switch (t.code) {
    case c.invalid_type:
      t.received === p.undefined ? s = "Required" : s = `Expected ${t.expected}, received ${t.received}`;
      break;
    case c.invalid_literal:
      s = `Invalid literal value, expected ${JSON.stringify(t.expected, $.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      s = `Unrecognized key(s) in object: ${$.joinValues(t.keys, ", ")}`;
      break;
    case c.invalid_union:
      s = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      s = `Invalid discriminator value. Expected ${$.joinValues(t.options)}`;
      break;
    case c.invalid_enum_value:
      s = `Invalid enum value. Expected ${$.joinValues(t.options)}, received '${t.received}'`;
      break;
    case c.invalid_arguments:
      s = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      s = "Invalid function return type";
      break;
    case c.invalid_date:
      s = "Invalid date";
      break;
    case c.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (s = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (s = `${s} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? s = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? s = `Invalid input: must end with "${t.validation.endsWith}"` : $.assertNever(t.validation) : t.validation !== "regex" ? s = `Invalid ${t.validation}` : s = "Invalid";
      break;
    case c.too_small:
      t.type === "array" ? s = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? s = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? s = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? s = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? s = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : s = "Invalid input";
      break;
    case c.too_big:
      t.type === "array" ? s = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? s = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? s = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? s = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? s = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : s = "Invalid input";
      break;
    case c.custom:
      s = "Invalid input";
      break;
    case c.invalid_intersection_types:
      s = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      s = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case c.not_finite:
      s = "Number must be finite";
      break;
    default:
      s = e.defaultError, $.assertNever(t);
  }
  return { message: s };
};
let Xs = Ye;
function Qs() {
  return Xs;
}
const er = (t) => {
  const { data: e, path: s, errorMaps: r, issueData: i } = t, n = [...s, ...i.path || []], a = {
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
  const l = r.filter((d) => !!d).slice().reverse();
  for (const d of l)
    o = d(a, { data: e, defaultError: o }).message;
  return {
    ...i,
    path: n,
    message: o
  };
};
function u(t, e) {
  const s = Qs(), r = er({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      s,
      // then global override map
      s === Ye ? void 0 : Ye
      // then global default map
    ].filter((i) => !!i)
  });
  t.common.issues.push(r);
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
  static mergeArray(e, s) {
    const r = [];
    for (const i of s) {
      if (i.status === "aborted")
        return y;
      i.status === "dirty" && e.dirty(), r.push(i.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, s) {
    const r = [];
    for (const i of s) {
      const n = await i.key, a = await i.value;
      r.push({
        key: n,
        value: a
      });
    }
    return C.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, s) {
    const r = {};
    for (const i of s) {
      const { key: n, value: a } = i;
      if (n.status === "aborted" || a.status === "aborted")
        return y;
      n.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), n.value !== "__proto__" && (typeof a.value < "u" || i.alwaysSet) && (r[n.value] = a.value);
    }
    return { status: e.value, value: r };
  }
}
const y = Object.freeze({
  status: "aborted"
}), ue = (t) => ({ status: "dirty", value: t }), N = (t) => ({ status: "valid", value: t }), Lt = (t) => t.status === "aborted", Mt = (t) => t.status === "dirty", oe = (t) => t.status === "valid", Oe = (t) => typeof Promise < "u" && t instanceof Promise;
var h;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
})(h || (h = {}));
class M {
  constructor(e, s, r, i) {
    this._cachedPath = [], this.parent = e, this.data = s, this._path = r, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const jt = (t, e) => {
  if (oe(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const s = new U(t.common.issues);
      return this._error = s, this._error;
    }
  };
};
function v(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: s, required_error: r, description: i } = t;
  if (e && (s || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: i } : { errorMap: (a, o) => {
    const { message: l } = t;
    return a.code === "invalid_enum_value" ? { message: l ?? o.defaultError } : typeof o.data > "u" ? { message: l ?? r ?? o.defaultError } : a.code !== "invalid_type" ? { message: o.defaultError } : { message: l ?? s ?? o.defaultError };
  }, description: i };
}
class x {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return V(e.data);
  }
  _getOrReturnCtx(e, s) {
    return s || {
      common: e.parent.common,
      data: e.data,
      parsedType: V(e.data),
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
        parsedType: V(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const s = this._parse(e);
    if (Oe(s))
      throw new Error("Synchronous parse encountered promise.");
    return s;
  }
  _parseAsync(e) {
    const s = this._parse(e);
    return Promise.resolve(s);
  }
  parse(e, s) {
    const r = this.safeParse(e, s);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, s) {
    const r = {
      common: {
        issues: [],
        async: s?.async ?? !1,
        contextualErrorMap: s?.errorMap
      },
      path: s?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: V(e)
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return jt(r, i);
  }
  "~validate"(e) {
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: V(e)
    };
    if (!this["~standard"].async)
      try {
        const r = this._parseSync({ data: e, path: [], parent: s });
        return oe(r) ? {
          value: r.value
        } : {
          issues: s.common.issues
        };
      } catch (r) {
        r?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((r) => oe(r) ? {
      value: r.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, s) {
    const r = await this.safeParseAsync(e, s);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, s) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: s?.errorMap,
        async: !0
      },
      path: s?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: V(e)
    }, i = this._parse({ data: e, path: r.path, parent: r }), n = await (Oe(i) ? i : Promise.resolve(i));
    return jt(r, n);
  }
  refine(e, s) {
    const r = (i) => typeof s == "string" || typeof s > "u" ? { message: s } : typeof s == "function" ? s(i) : s;
    return this._refinement((i, n) => {
      const a = e(i), o = () => n.addIssue({
        code: c.custom,
        ...r(i)
      });
      return typeof Promise < "u" && a instanceof Promise ? a.then((l) => l ? !0 : (o(), !1)) : a ? !0 : (o(), !1);
    });
  }
  refinement(e, s) {
    return this._refinement((r, i) => e(r) ? !0 : (i.addIssue(typeof s == "function" ? s(r, i) : s), !1));
  }
  _refinement(e) {
    return new Q({
      schema: this,
      typeName: g.ZodEffects,
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
      validate: (s) => this["~validate"](s)
    };
  }
  optional() {
    return D.create(this, this._def);
  }
  nullable() {
    return ee.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return L.create(this);
  }
  promise() {
    return je.create(this, this._def);
  }
  or(e) {
    return Ne.create([this, e], this._def);
  }
  and(e) {
    return Pe.create(this, e, this._def);
  }
  transform(e) {
    return new Q({
      ...v(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const s = typeof e == "function" ? e : () => e;
    return new ze({
      ...v(this._def),
      innerType: this,
      defaultValue: s,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new rs({
      typeName: g.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const s = typeof e == "function" ? e : () => e;
    return new Ze({
      ...v(this._def),
      innerType: this,
      catchValue: s,
      typeName: g.ZodCatch
    });
  }
  describe(e) {
    const s = this.constructor;
    return new s({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ht.create(this, e);
  }
  readonly() {
    return De.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const tr = /^c[^\s-]{8,}$/i, sr = /^[0-9a-z]+$/, rr = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ir = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, nr = /^[a-z0-9_-]{21}$/i, ar = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, or = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, lr = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, cr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Ge;
const dr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ur = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, pr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, hr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, fr = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, mr = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, es = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", yr = new RegExp(`^${es}$`);
function ts(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const s = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${s}`;
}
function gr(t) {
  return new RegExp(`^${ts(t)}$`);
}
function vr(t) {
  let e = `${es}T${ts(t)}`;
  const s = [];
  return s.push(t.local ? "Z?" : "Z"), t.offset && s.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${s.join("|")})`, new RegExp(`^${e}$`);
}
function _r(t, e) {
  return !!((e === "v4" || !e) && dr.test(t) || (e === "v6" || !e) && pr.test(t));
}
function xr(t, e) {
  if (!ar.test(t))
    return !1;
  try {
    const [s] = t.split(".");
    if (!s)
      return !1;
    const r = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(s.length + (4 - s.length % 4) % 4, "="), i = JSON.parse(atob(r));
    return !(typeof i != "object" || i === null || "typ" in i && i?.typ !== "JWT" || !i.alg || e && i.alg !== e);
  } catch {
    return !1;
  }
}
function br(t, e) {
  return !!((e === "v4" || !e) && ur.test(t) || (e === "v6" || !e) && hr.test(t));
}
class Z extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: c.invalid_type,
        expected: p.string,
        received: n.parsedType
      }), y;
    }
    const r = new C();
    let i;
    for (const n of this._def.checks)
      if (n.kind === "min")
        e.data.length < n.value && (i = this._getOrReturnCtx(e, i), u(i, {
          code: c.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "max")
        e.data.length > n.value && (i = this._getOrReturnCtx(e, i), u(i, {
          code: c.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "length") {
        const a = e.data.length > n.value, o = e.data.length < n.value;
        (a || o) && (i = this._getOrReturnCtx(e, i), a ? u(i, {
          code: c.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : o && u(i, {
          code: c.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), r.dirty());
      } else if (n.kind === "email")
        lr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "email",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "emoji")
        Ge || (Ge = new RegExp(cr, "u")), Ge.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "emoji",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "uuid")
        ir.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "uuid",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "nanoid")
        nr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "nanoid",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid")
        tr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "cuid",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid2")
        sr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "cuid2",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "ulid")
        rr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
          validation: "ulid",
          code: c.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), u(i, {
            validation: "url",
            code: c.invalid_string,
            message: n.message
          }), r.dirty();
        }
      else n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "regex",
        code: c.invalid_string,
        message: n.message
      }), r.dirty())) : n.kind === "trim" ? e.data = e.data.trim() : n.kind === "includes" ? e.data.includes(n.value, n.position) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: { includes: n.value, position: n.position },
        message: n.message
      }), r.dirty()) : n.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : n.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : n.kind === "startsWith" ? e.data.startsWith(n.value) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: { startsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "endsWith" ? e.data.endsWith(n.value) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: { endsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "datetime" ? vr(n).test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: "datetime",
        message: n.message
      }), r.dirty()) : n.kind === "date" ? yr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: "date",
        message: n.message
      }), r.dirty()) : n.kind === "time" ? gr(n).test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.invalid_string,
        validation: "time",
        message: n.message
      }), r.dirty()) : n.kind === "duration" ? or.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "duration",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "ip" ? _r(e.data, n.version) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "ip",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "jwt" ? xr(e.data, n.alg) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "jwt",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "cidr" ? br(e.data, n.version) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "cidr",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64" ? fr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "base64",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64url" ? mr.test(e.data) || (i = this._getOrReturnCtx(e, i), u(i, {
        validation: "base64url",
        code: c.invalid_string,
        message: n.message
      }), r.dirty()) : $.assertNever(n);
    return { status: r.value, value: e.data };
  }
  _regex(e, s, r) {
    return this.refinement((i) => e.test(i), {
      validation: s,
      code: c.invalid_string,
      ...h.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...h.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...h.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...h.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...h.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...h.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...h.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...h.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...h.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...h.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...h.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...h.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...h.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...h.errToObj(e) });
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
      ...h.errToObj(e?.message)
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
      ...h.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...h.errToObj(e) });
  }
  regex(e, s) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...h.errToObj(s)
    });
  }
  includes(e, s) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: s?.position,
      ...h.errToObj(s?.message)
    });
  }
  startsWith(e, s) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...h.errToObj(s)
    });
  }
  endsWith(e, s) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...h.errToObj(s)
    });
  }
  min(e, s) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...h.errToObj(s)
    });
  }
  max(e, s) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...h.errToObj(s)
    });
  }
  length(e, s) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...h.errToObj(s)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, h.errToObj(e));
  }
  trim() {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Z({
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
    for (const s of this._def.checks)
      s.kind === "min" && (e === null || s.value > e) && (e = s.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    return e;
  }
}
Z.create = (t) => new Z({
  checks: [],
  typeName: g.ZodString,
  coerce: t?.coerce ?? !1,
  ...v(t)
});
function $r(t, e) {
  const s = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, i = s > r ? s : r, n = Number.parseInt(t.toFixed(i).replace(".", "")), a = Number.parseInt(e.toFixed(i).replace(".", ""));
  return n % a / 10 ** i;
}
class le extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: c.invalid_type,
        expected: p.number,
        received: n.parsedType
      }), y;
    }
    let r;
    const i = new C();
    for (const n of this._def.checks)
      n.kind === "int" ? $.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), i.dirty()) : n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? $r(e.data, n.value) !== 0 && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : n.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.not_finite,
        message: n.message
      }), i.dirty()) : $.assertNever(n);
    return { status: i.value, value: e.data };
  }
  gte(e, s) {
    return this.setLimit("min", e, !0, h.toString(s));
  }
  gt(e, s) {
    return this.setLimit("min", e, !1, h.toString(s));
  }
  lte(e, s) {
    return this.setLimit("max", e, !0, h.toString(s));
  }
  lt(e, s) {
    return this.setLimit("max", e, !1, h.toString(s));
  }
  setLimit(e, s, r, i) {
    return new le({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: s,
          inclusive: r,
          message: h.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new le({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: h.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: h.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: h.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: h.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: h.toString(e)
    });
  }
  multipleOf(e, s) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(s)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: h.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: h.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: h.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "min" && (e === null || s.value > e) && (e = s.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && $.isInteger(e.value));
  }
  get isFinite() {
    let e = null, s = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (s === null || r.value > s) && (s = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(s) && Number.isFinite(e);
  }
}
le.create = (t) => new le({
  checks: [],
  typeName: g.ZodNumber,
  coerce: t?.coerce || !1,
  ...v(t)
});
class be extends x {
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
    if (this._getType(e) !== p.bigint)
      return this._getInvalidInput(e);
    let r;
    const i = new C();
    for (const n of this._def.checks)
      n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.too_small,
        type: "bigint",
        minimum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.too_big,
        type: "bigint",
        maximum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? e.data % n.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), u(r, {
        code: c.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : $.assertNever(n);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const s = this._getOrReturnCtx(e);
    return u(s, {
      code: c.invalid_type,
      expected: p.bigint,
      received: s.parsedType
    }), y;
  }
  gte(e, s) {
    return this.setLimit("min", e, !0, h.toString(s));
  }
  gt(e, s) {
    return this.setLimit("min", e, !1, h.toString(s));
  }
  lte(e, s) {
    return this.setLimit("max", e, !0, h.toString(s));
  }
  lt(e, s) {
    return this.setLimit("max", e, !1, h.toString(s));
  }
  setLimit(e, s, r, i) {
    return new be({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: s,
          inclusive: r,
          message: h.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new be({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e)
    });
  }
  multipleOf(e, s) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(s)
    });
  }
  get minValue() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "min" && (e === null || s.value > e) && (e = s.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    return e;
  }
}
be.create = (t) => new be({
  checks: [],
  typeName: g.ZodBigInt,
  coerce: t?.coerce ?? !1,
  ...v(t)
});
class Xe extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.boolean,
        received: r.parsedType
      }), y;
    }
    return N(e.data);
  }
}
Xe.create = (t) => new Xe({
  typeName: g.ZodBoolean,
  coerce: t?.coerce || !1,
  ...v(t)
});
class Ie extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: c.invalid_type,
        expected: p.date,
        received: n.parsedType
      }), y;
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return u(n, {
        code: c.invalid_date
      }), y;
    }
    const r = new C();
    let i;
    for (const n of this._def.checks)
      n.kind === "min" ? e.data.getTime() < n.value && (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), r.dirty()) : n.kind === "max" ? e.data.getTime() > n.value && (i = this._getOrReturnCtx(e, i), u(i, {
        code: c.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), r.dirty()) : $.assertNever(n);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ie({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, s) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: h.toString(s)
    });
  }
  max(e, s) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: h.toString(s)
    });
  }
  get minDate() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "min" && (e === null || s.value > e) && (e = s.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const s of this._def.checks)
      s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    return e != null ? new Date(e) : null;
  }
}
Ie.create = (t) => new Ie({
  checks: [],
  coerce: t?.coerce || !1,
  typeName: g.ZodDate,
  ...v(t)
});
class zt extends x {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.symbol,
        received: r.parsedType
      }), y;
    }
    return N(e.data);
  }
}
zt.create = (t) => new zt({
  typeName: g.ZodSymbol,
  ...v(t)
});
class Qe extends x {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.undefined,
        received: r.parsedType
      }), y;
    }
    return N(e.data);
  }
}
Qe.create = (t) => new Qe({
  typeName: g.ZodUndefined,
  ...v(t)
});
class et extends x {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.null,
        received: r.parsedType
      }), y;
    }
    return N(e.data);
  }
}
et.create = (t) => new et({
  typeName: g.ZodNull,
  ...v(t)
});
class Zt extends x {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return N(e.data);
  }
}
Zt.create = (t) => new Zt({
  typeName: g.ZodAny,
  ...v(t)
});
class Dt extends x {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return N(e.data);
  }
}
Dt.create = (t) => new Dt({
  typeName: g.ZodUnknown,
  ...v(t)
});
class H extends x {
  _parse(e) {
    const s = this._getOrReturnCtx(e);
    return u(s, {
      code: c.invalid_type,
      expected: p.never,
      received: s.parsedType
    }), y;
  }
}
H.create = (t) => new H({
  typeName: g.ZodNever,
  ...v(t)
});
class Ut extends x {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.void,
        received: r.parsedType
      }), y;
    }
    return N(e.data);
  }
}
Ut.create = (t) => new Ut({
  typeName: g.ZodVoid,
  ...v(t)
});
class L extends x {
  _parse(e) {
    const { ctx: s, status: r } = this._processInputParams(e), i = this._def;
    if (s.parsedType !== p.array)
      return u(s, {
        code: c.invalid_type,
        expected: p.array,
        received: s.parsedType
      }), y;
    if (i.exactLength !== null) {
      const a = s.data.length > i.exactLength.value, o = s.data.length < i.exactLength.value;
      (a || o) && (u(s, {
        code: a ? c.too_big : c.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: a ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), r.dirty());
    }
    if (i.minLength !== null && s.data.length < i.minLength.value && (u(s, {
      code: c.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), r.dirty()), i.maxLength !== null && s.data.length > i.maxLength.value && (u(s, {
      code: c.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), r.dirty()), s.common.async)
      return Promise.all([...s.data].map((a, o) => i.type._parseAsync(new M(s, a, s.path, o)))).then((a) => C.mergeArray(r, a));
    const n = [...s.data].map((a, o) => i.type._parseSync(new M(s, a, s.path, o)));
    return C.mergeArray(r, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, s) {
    return new L({
      ...this._def,
      minLength: { value: e, message: h.toString(s) }
    });
  }
  max(e, s) {
    return new L({
      ...this._def,
      maxLength: { value: e, message: h.toString(s) }
    });
  }
  length(e, s) {
    return new L({
      ...this._def,
      exactLength: { value: e, message: h.toString(s) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
L.create = (t, e) => new L({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...v(e)
});
function ie(t) {
  if (t instanceof S) {
    const e = {};
    for (const s in t.shape) {
      const r = t.shape[s];
      e[s] = D.create(ie(r));
    }
    return new S({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof L ? new L({
    ...t._def,
    type: ie(t.element)
  }) : t instanceof D ? D.create(ie(t.unwrap())) : t instanceof ee ? ee.create(ie(t.unwrap())) : t instanceof Y ? Y.create(t.items.map((e) => ie(e))) : t;
}
class S extends x {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), s = $.objectKeys(e);
    return this._cached = { shape: e, keys: s }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== p.object) {
      const d = this._getOrReturnCtx(e);
      return u(d, {
        code: c.invalid_type,
        expected: p.object,
        received: d.parsedType
      }), y;
    }
    const { status: r, ctx: i } = this._processInputParams(e), { shape: n, keys: a } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof H && this._def.unknownKeys === "strip"))
      for (const d in i.data)
        a.includes(d) || o.push(d);
    const l = [];
    for (const d of a) {
      const f = n[d], m = i.data[d];
      l.push({
        key: { status: "valid", value: d },
        value: f._parse(new M(i, m, i.path, d)),
        alwaysSet: d in i.data
      });
    }
    if (this._def.catchall instanceof H) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const f of o)
          l.push({
            key: { status: "valid", value: f },
            value: { status: "valid", value: i.data[f] }
          });
      else if (d === "strict")
        o.length > 0 && (u(i, {
          code: c.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const f of o) {
        const m = i.data[f];
        l.push({
          key: { status: "valid", value: f },
          value: d._parse(
            new M(i, m, i.path, f)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: f in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const f of l) {
        const m = await f.key, T = await f.value;
        d.push({
          key: m,
          value: T,
          alwaysSet: f.alwaysSet
        });
      }
      return d;
    }).then((d) => C.mergeObjectSync(r, d)) : C.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return h.errToObj, new S({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (s, r) => {
          const i = this._def.errorMap?.(s, r).message ?? r.defaultError;
          return s.code === "unrecognized_keys" ? {
            message: h.errToObj(e).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new S({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new S({
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
    return new S({
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
    return new S({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
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
  setKey(e, s) {
    return this.augment({ [e]: s });
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
    return new S({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const s = {};
    for (const r of $.objectKeys(e))
      e[r] && this.shape[r] && (s[r] = this.shape[r]);
    return new S({
      ...this._def,
      shape: () => s
    });
  }
  omit(e) {
    const s = {};
    for (const r of $.objectKeys(this.shape))
      e[r] || (s[r] = this.shape[r]);
    return new S({
      ...this._def,
      shape: () => s
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ie(this);
  }
  partial(e) {
    const s = {};
    for (const r of $.objectKeys(this.shape)) {
      const i = this.shape[r];
      e && !e[r] ? s[r] = i : s[r] = i.optional();
    }
    return new S({
      ...this._def,
      shape: () => s
    });
  }
  required(e) {
    const s = {};
    for (const r of $.objectKeys(this.shape))
      if (e && !e[r])
        s[r] = this.shape[r];
      else {
        let n = this.shape[r];
        for (; n instanceof D; )
          n = n._def.innerType;
        s[r] = n;
      }
    return new S({
      ...this._def,
      shape: () => s
    });
  }
  keyof() {
    return ss($.objectKeys(this.shape));
  }
}
S.create = (t, e) => new S({
  shape: () => t,
  unknownKeys: "strip",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
S.strictCreate = (t, e) => new S({
  shape: () => t,
  unknownKeys: "strict",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
S.lazycreate = (t, e) => new S({
  shape: t,
  unknownKeys: "strip",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
class Ne extends x {
  _parse(e) {
    const { ctx: s } = this._processInputParams(e), r = this._def.options;
    function i(n) {
      for (const o of n)
        if (o.result.status === "valid")
          return o.result;
      for (const o of n)
        if (o.result.status === "dirty")
          return s.common.issues.push(...o.ctx.common.issues), o.result;
      const a = n.map((o) => new U(o.ctx.common.issues));
      return u(s, {
        code: c.invalid_union,
        unionErrors: a
      }), y;
    }
    if (s.common.async)
      return Promise.all(r.map(async (n) => {
        const a = {
          ...s,
          common: {
            ...s.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: s.data,
            path: s.path,
            parent: a
          }),
          ctx: a
        };
      })).then(i);
    {
      let n;
      const a = [];
      for (const l of r) {
        const d = {
          ...s,
          common: {
            ...s.common,
            issues: []
          },
          parent: null
        }, f = l._parseSync({
          data: s.data,
          path: s.path,
          parent: d
        });
        if (f.status === "valid")
          return f;
        f.status === "dirty" && !n && (n = { result: f, ctx: d }), d.common.issues.length && a.push(d.common.issues);
      }
      if (n)
        return s.common.issues.push(...n.ctx.common.issues), n.result;
      const o = a.map((l) => new U(l));
      return u(s, {
        code: c.invalid_union,
        unionErrors: o
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ne.create = (t, e) => new Ne({
  options: t,
  typeName: g.ZodUnion,
  ...v(e)
});
const z = (t) => t instanceof st ? z(t.schema) : t instanceof Q ? z(t.innerType()) : t instanceof Me ? [t.value] : t instanceof X ? t.options : t instanceof rt ? $.objectValues(t.enum) : t instanceof ze ? z(t._def.innerType) : t instanceof Qe ? [void 0] : t instanceof et ? [null] : t instanceof D ? [void 0, ...z(t.unwrap())] : t instanceof ee ? [null, ...z(t.unwrap())] : t instanceof rs || t instanceof De ? z(t.unwrap()) : t instanceof Ze ? z(t._def.innerType) : [];
class pt extends x {
  _parse(e) {
    const { ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.object)
      return u(s, {
        code: c.invalid_type,
        expected: p.object,
        received: s.parsedType
      }), y;
    const r = this.discriminator, i = s.data[r], n = this.optionsMap.get(i);
    return n ? s.common.async ? n._parseAsync({
      data: s.data,
      path: s.path,
      parent: s
    }) : n._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }) : (u(s, {
      code: c.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), y);
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
  static create(e, s, r) {
    const i = /* @__PURE__ */ new Map();
    for (const n of s) {
      const a = z(n.shape[e]);
      if (!a.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of a) {
        if (i.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        i.set(o, n);
      }
    }
    return new pt({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: s,
      optionsMap: i,
      ...v(r)
    });
  }
}
function tt(t, e) {
  const s = V(t), r = V(e);
  if (t === e)
    return { valid: !0, data: t };
  if (s === p.object && r === p.object) {
    const i = $.objectKeys(e), n = $.objectKeys(t).filter((o) => i.indexOf(o) !== -1), a = { ...t, ...e };
    for (const o of n) {
      const l = tt(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      a[o] = l.data;
    }
    return { valid: !0, data: a };
  } else if (s === p.array && r === p.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let n = 0; n < t.length; n++) {
      const a = t[n], o = e[n], l = tt(a, o);
      if (!l.valid)
        return { valid: !1 };
      i.push(l.data);
    }
    return { valid: !0, data: i };
  } else return s === p.date && r === p.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Pe extends x {
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e), i = (n, a) => {
      if (Lt(n) || Lt(a))
        return y;
      const o = tt(n.value, a.value);
      return o.valid ? ((Mt(n) || Mt(a)) && s.dirty(), { status: s.value, value: o.data }) : (u(r, {
        code: c.invalid_intersection_types
      }), y);
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
Pe.create = (t, e, s) => new Pe({
  left: t,
  right: e,
  typeName: g.ZodIntersection,
  ...v(s)
});
class Y extends x {
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.array)
      return u(r, {
        code: c.invalid_type,
        expected: p.array,
        received: r.parsedType
      }), y;
    if (r.data.length < this._def.items.length)
      return u(r, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && r.data.length > this._def.items.length && (u(r, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), s.dirty());
    const n = [...r.data].map((a, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new M(r, a, r.path, o)) : null;
    }).filter((a) => !!a);
    return r.common.async ? Promise.all(n).then((a) => C.mergeArray(s, a)) : C.mergeArray(s, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Y({
      ...this._def,
      rest: e
    });
  }
}
Y.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Y({
    items: t,
    typeName: g.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class Le extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.object)
      return u(r, {
        code: c.invalid_type,
        expected: p.object,
        received: r.parsedType
      }), y;
    const i = [], n = this._def.keyType, a = this._def.valueType;
    for (const o in r.data)
      i.push({
        key: n._parse(new M(r, o, r.path, o)),
        value: a._parse(new M(r, r.data[o], r.path, o)),
        alwaysSet: o in r.data
      });
    return r.common.async ? C.mergeObjectAsync(s, i) : C.mergeObjectSync(s, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, s, r) {
    return s instanceof x ? new Le({
      keyType: e,
      valueType: s,
      typeName: g.ZodRecord,
      ...v(r)
    }) : new Le({
      keyType: Z.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ...v(s)
    });
  }
}
class Vt extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.map)
      return u(r, {
        code: c.invalid_type,
        expected: p.map,
        received: r.parsedType
      }), y;
    const i = this._def.keyType, n = this._def.valueType, a = [...r.data.entries()].map(([o, l], d) => ({
      key: i._parse(new M(r, o, r.path, [d, "key"])),
      value: n._parse(new M(r, l, r.path, [d, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of a) {
          const d = await l.key, f = await l.value;
          if (d.status === "aborted" || f.status === "aborted")
            return y;
          (d.status === "dirty" || f.status === "dirty") && s.dirty(), o.set(d.value, f.value);
        }
        return { status: s.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of a) {
        const d = l.key, f = l.value;
        if (d.status === "aborted" || f.status === "aborted")
          return y;
        (d.status === "dirty" || f.status === "dirty") && s.dirty(), o.set(d.value, f.value);
      }
      return { status: s.value, value: o };
    }
  }
}
Vt.create = (t, e, s) => new Vt({
  valueType: e,
  keyType: t,
  typeName: g.ZodMap,
  ...v(s)
});
class $e extends x {
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.set)
      return u(r, {
        code: c.invalid_type,
        expected: p.set,
        received: r.parsedType
      }), y;
    const i = this._def;
    i.minSize !== null && r.data.size < i.minSize.value && (u(r, {
      code: c.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), s.dirty()), i.maxSize !== null && r.data.size > i.maxSize.value && (u(r, {
      code: c.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), s.dirty());
    const n = this._def.valueType;
    function a(l) {
      const d = /* @__PURE__ */ new Set();
      for (const f of l) {
        if (f.status === "aborted")
          return y;
        f.status === "dirty" && s.dirty(), d.add(f.value);
      }
      return { status: s.value, value: d };
    }
    const o = [...r.data.values()].map((l, d) => n._parse(new M(r, l, r.path, d)));
    return r.common.async ? Promise.all(o).then((l) => a(l)) : a(o);
  }
  min(e, s) {
    return new $e({
      ...this._def,
      minSize: { value: e, message: h.toString(s) }
    });
  }
  max(e, s) {
    return new $e({
      ...this._def,
      maxSize: { value: e, message: h.toString(s) }
    });
  }
  size(e, s) {
    return this.min(e, s).max(e, s);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
$e.create = (t, e) => new $e({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...v(e)
});
class st extends x {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: s } = this._processInputParams(e);
    return this._def.getter()._parse({ data: s.data, path: s.path, parent: s });
  }
}
st.create = (t, e) => new st({
  getter: t,
  typeName: g.ZodLazy,
  ...v(e)
});
class Me extends x {
  _parse(e) {
    if (e.data !== this._def.value) {
      const s = this._getOrReturnCtx(e);
      return u(s, {
        received: s.data,
        code: c.invalid_literal,
        expected: this._def.value
      }), y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Me.create = (t, e) => new Me({
  value: t,
  typeName: g.ZodLiteral,
  ...v(e)
});
function ss(t, e) {
  return new X({
    values: t,
    typeName: g.ZodEnum,
    ...v(e)
  });
}
class X extends x {
  _parse(e) {
    if (typeof e.data != "string") {
      const s = this._getOrReturnCtx(e), r = this._def.values;
      return u(s, {
        expected: $.joinValues(r),
        received: s.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const s = this._getOrReturnCtx(e), r = this._def.values;
      return u(s, {
        received: s.data,
        code: c.invalid_enum_value,
        options: r
      }), y;
    }
    return N(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const s of this._def.values)
      e[s] = s;
    return e;
  }
  get Values() {
    const e = {};
    for (const s of this._def.values)
      e[s] = s;
    return e;
  }
  get Enum() {
    const e = {};
    for (const s of this._def.values)
      e[s] = s;
    return e;
  }
  extract(e, s = this._def) {
    return X.create(e, {
      ...this._def,
      ...s
    });
  }
  exclude(e, s = this._def) {
    return X.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...s
    });
  }
}
X.create = ss;
class rt extends x {
  _parse(e) {
    const s = $.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== p.string && r.parsedType !== p.number) {
      const i = $.objectValues(s);
      return u(r, {
        expected: $.joinValues(i),
        received: r.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set($.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = $.objectValues(s);
      return u(r, {
        received: r.data,
        code: c.invalid_enum_value,
        options: i
      }), y;
    }
    return N(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
rt.create = (t, e) => new rt({
  values: t,
  typeName: g.ZodNativeEnum,
  ...v(e)
});
class je extends x {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.promise && s.common.async === !1)
      return u(s, {
        code: c.invalid_type,
        expected: p.promise,
        received: s.parsedType
      }), y;
    const r = s.parsedType === p.promise ? s.data : Promise.resolve(s.data);
    return N(r.then((i) => this._def.type.parseAsync(i, {
      path: s.path,
      errorMap: s.common.contextualErrorMap
    })));
  }
}
je.create = (t, e) => new je({
  type: t,
  typeName: g.ZodPromise,
  ...v(e)
});
class Q extends x {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e), i = this._def.effect || null, n = {
      addIssue: (a) => {
        u(r, a), a.fatal ? s.abort() : s.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), i.type === "preprocess") {
      const a = i.transform(r.data, n);
      if (r.common.async)
        return Promise.resolve(a).then(async (o) => {
          if (s.value === "aborted")
            return y;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return l.status === "aborted" ? y : l.status === "dirty" || s.value === "dirty" ? ue(l.value) : l;
        });
      {
        if (s.value === "aborted")
          return y;
        const o = this._def.schema._parseSync({
          data: a,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? y : o.status === "dirty" || s.value === "dirty" ? ue(o.value) : o;
      }
    }
    if (i.type === "refinement") {
      const a = (o) => {
        const l = i.refinement(o, n);
        if (r.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? y : (o.status === "dirty" && s.dirty(), a(o.value), { status: s.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? y : (o.status === "dirty" && s.dirty(), a(o.value).then(() => ({ status: s.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!oe(a))
          return y;
        const o = i.transform(a.value, n);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: s.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => oe(a) ? Promise.resolve(i.transform(a.value, n)).then((o) => ({
          status: s.value,
          value: o
        })) : y);
    $.assertNever(i);
  }
}
Q.create = (t, e, s) => new Q({
  schema: t,
  typeName: g.ZodEffects,
  effect: e,
  ...v(s)
});
Q.createWithPreprocess = (t, e, s) => new Q({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: g.ZodEffects,
  ...v(s)
});
class D extends x {
  _parse(e) {
    return this._getType(e) === p.undefined ? N(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
D.create = (t, e) => new D({
  innerType: t,
  typeName: g.ZodOptional,
  ...v(e)
});
class ee extends x {
  _parse(e) {
    return this._getType(e) === p.null ? N(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ee.create = (t, e) => new ee({
  innerType: t,
  typeName: g.ZodNullable,
  ...v(e)
});
class ze extends x {
  _parse(e) {
    const { ctx: s } = this._processInputParams(e);
    let r = s.data;
    return s.parsedType === p.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: s.path,
      parent: s
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ze.create = (t, e) => new ze({
  innerType: t,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class Ze extends x {
  _parse(e) {
    const { ctx: s } = this._processInputParams(e), r = {
      ...s,
      common: {
        ...s.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Oe(i) ? i.then((n) => ({
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
Ze.create = (t, e) => new Ze({
  innerType: t,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Ft extends x {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const r = this._getOrReturnCtx(e);
      return u(r, {
        code: c.invalid_type,
        expected: p.nan,
        received: r.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
Ft.create = (t) => new Ft({
  typeName: g.ZodNaN,
  ...v(t)
});
class rs extends x {
  _parse(e) {
    const { ctx: s } = this._processInputParams(e), r = s.data;
    return this._def.type._parse({
      data: r,
      path: s.path,
      parent: s
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ht extends x {
  _parse(e) {
    const { status: s, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return n.status === "aborted" ? y : n.status === "dirty" ? (s.dirty(), ue(n.value)) : this._def.out._parseAsync({
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
      return i.status === "aborted" ? y : i.status === "dirty" ? (s.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, s) {
    return new ht({
      in: e,
      out: s,
      typeName: g.ZodPipeline
    });
  }
}
class De extends x {
  _parse(e) {
    const s = this._def.innerType._parse(e), r = (i) => (oe(i) && (i.value = Object.freeze(i.value)), i);
    return Oe(s) ? s.then((i) => r(i)) : r(s);
  }
  unwrap() {
    return this._def.innerType;
  }
}
De.create = (t, e) => new De({
  innerType: t,
  typeName: g.ZodReadonly,
  ...v(e)
});
var g;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const ke = Z.create, O = le.create, wr = Xe.create;
H.create;
const ge = L.create, R = S.create;
Ne.create;
const kr = pt.create;
Pe.create;
Y.create;
const He = Le.create, pe = Me.create, Be = X.create;
je.create;
D.create;
ee.create;
const Ht = 1, Sr = /^\d+\.\d+$/, A = ke().min(1), is = R({
  x: O(),
  y: O(),
  width: O().positive(),
  height: O().positive()
}).strict(), Tr = R({
  width: O().positive(),
  height: O().positive()
}).strict(), Ke = R({
  selector: A.optional(),
  bbox: is
}).strict(), Ar = R({
  selector: A.optional(),
  bbox: is,
  value: ke().optional()
}).strict(), Cr = kr("kind", [
  R({ kind: pe("click"), target: Ke }).strict(),
  R({ kind: pe("hover"), target: Ke }).strict(),
  R({
    kind: pe("type"),
    target: Ke,
    value: ke().optional()
  }).strict(),
  R({
    kind: pe("type-multi"),
    targets: ge(Ar).min(1)
  }).strict()
]), Er = R({
  screenshot: A,
  captureSize: Tr,
  cursor: Cr.nullable()
}).strict(), Rr = R({
  frames: ge(Er).min(1)
}).strict(), Or = He(A, Rr), Ir = He(A, Or), Je = He(A, ke().nullable()), Nr = He(A, A), Pr = Be([
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
  "capture",
  "upload",
  "select-option",
  "confirm",
  "fill-date",
  "toggle",
  "pick-date",
  "pick-time",
  "expand"
]), Lr = R({
  id: A,
  index: O().int().positive(),
  action: Pr,
  interactive: wr(),
  screenshotWhen: Be(["before", "after"]),
  waitAfter: O().int().nonnegative(),
  // Short per-step heading (e.g. for the sidebar timeline). Optional + nullable
  // for back-compat with already-built manifests and locales lacking guide-text;
  // the player falls back to ``text`` when absent.
  title: Je.optional(),
  text: Je,
  subtitle: Je.optional(),
  captures: Ir
}).strict(), Mr = ["arrow", "hotspot", "off"], jr = Be(Mr), zr = ["sidebar", "overlay", "inline"], Zr = Be(zr), Dr = R({
  pre_action_ms: O().int().positive(),
  action_ms: O().int().positive(),
  post_action_ms: O().int().nonnegative(),
  travel_speed_px_per_ms: O().positive(),
  // Optional. Absent ⇒ host attribute or 'arrow' default. See <steppy-guide>'s
  // cursor property for the precedence rules.
  mode: jr.optional()
}).strict(), Ur = R({
  version: ke().regex(Sr, 'version must match "<major>.<minor>"'),
  slug: A,
  mode: pe("interactive"),
  role: A,
  title: Nr,
  locales: ge(A).min(1),
  defaultLocale: A,
  layouts: ge(A),
  defaultLayout: A.nullable(),
  cursor: Dr,
  // Per-guide default presentation template. Optional for back-compat; the
  // player resolves attr → persisted → this → 'overlay'.
  defaultTemplate: Zr.optional(),
  steps: ge(Lr).min(1)
}).strict().superRefine((t, e) => {
  t.locales.includes(t.defaultLocale) || e.addIssue({
    code: c.custom,
    path: ["defaultLocale"],
    message: `defaultLocale '${t.defaultLocale}' must appear in locales`
  }), t.layouts.length === 0 ? t.defaultLayout !== null && e.addIssue({
    code: c.custom,
    path: ["defaultLayout"],
    message: "defaultLayout must be null when layouts is empty"
  }) : t.defaultLayout === null ? e.addIssue({
    code: c.custom,
    path: ["defaultLayout"],
    message: "defaultLayout must be set when layouts is non-empty"
  }) : t.layouts.includes(t.defaultLayout) || e.addIssue({
    code: c.custom,
    path: ["defaultLayout"],
    message: `defaultLayout '${t.defaultLayout}' must appear in layouts`
  });
  for (const n of t.locales)
    n in t.title || e.addIssue({
      code: c.custom,
      path: ["title", n],
      message: `title missing for locale '${n}'`
    });
  const s = t.layouts.length > 0 ? t.layouts : ["_"], r = new Set(t.locales), i = new Set(s);
  t.steps.forEach((n, a) => {
    for (const o of t.locales) {
      const l = n.captures[o];
      if (!l) {
        e.addIssue({
          code: c.custom,
          path: ["steps", a, "captures", o],
          message: `step ${n.index}: missing captures for locale '${o}'`
        });
        continue;
      }
      for (const d of s)
        d in l || e.addIssue({
          code: c.custom,
          path: ["steps", a, "captures", o, d],
          message: `step ${n.index}: missing captures for locale '${o}' / layout '${d}'`
        });
      o in n.text || e.addIssue({
        code: c.custom,
        path: ["steps", a, "text", o],
        message: `step ${n.index}: missing text for locale '${o}'`
      });
    }
    for (const o of Object.keys(n.captures)) {
      if (!r.has(o)) {
        e.addIssue({
          code: c.custom,
          path: ["steps", a, "captures", o],
          message: `step ${n.index}: unexpected locale '${o}' in captures (not in manifest.locales)`
        });
        continue;
      }
      for (const l of Object.keys(n.captures[o]))
        i.has(l) || e.addIssue({
          code: c.custom,
          path: ["steps", a, "captures", o, l],
          message: `step ${n.index}: unexpected layout '${l}' (not in manifest.layouts)`
        });
    }
    for (const o of Object.keys(n.text))
      r.has(o) || e.addIssue({
        code: c.custom,
        path: ["steps", a, "text", o],
        message: `step ${n.index}: unexpected locale '${o}' in text`
      });
    if (n.title)
      for (const o of Object.keys(n.title))
        r.has(o) || e.addIssue({
          code: c.custom,
          path: ["steps", a, "title", o],
          message: `step ${n.index}: unexpected locale '${o}' in title`
        });
    if (n.subtitle)
      for (const o of Object.keys(n.subtitle))
        r.has(o) || e.addIssue({
          code: c.custom,
          path: ["steps", a, "subtitle", o],
          message: `step ${n.index}: unexpected locale '${o}' in subtitle`
        });
  });
  for (const n of Object.keys(t.title))
    r.has(n) || e.addIssue({
      code: c.custom,
      path: ["title", n],
      message: `unexpected locale '${n}' in title (not in manifest.locales)`
    });
});
function Vr(t) {
  let e = t;
  if (typeof t == "string")
    try {
      e = JSON.parse(t);
    } catch (a) {
      return {
        ok: !1,
        error: {
          code: "invalid_json",
          message: a instanceof Error ? a.message : "invalid JSON"
        }
      };
    }
  const s = Fr(e);
  if (s === null)
    return {
      ok: !1,
      error: {
        code: "version_missing",
        message: 'manifest is missing a top-level "version" string'
      }
    };
  const [r] = s.split("."), i = Number.parseInt(r ?? "", 10);
  if (!Number.isFinite(i))
    return {
      ok: !1,
      error: {
        code: "version_missing",
        message: `manifest version "${s}" is not a valid <major>.<minor> string`
      }
    };
  if (i !== Ht)
    return {
      ok: !1,
      error: {
        code: "version_unsupported",
        message: `manifest version ${s} is not supported (player handles major ${Ht}.x)`
      }
    };
  const n = Ur.safeParse(e);
  return n.success ? { ok: !0, manifest: n.data } : {
    ok: !1,
    error: Hr(n.error)
  };
}
function Fr(t) {
  if (t === null || typeof t != "object") return null;
  const e = t.version;
  return typeof e == "string" ? e : null;
}
function Hr(t) {
  return {
    code: "schema_invalid",
    message: "manifest failed schema validation",
    issues: t.issues.map((e) => ({
      path: e.path.map(String).join("."),
      message: e.message
    }))
  };
}
const Br = Ue`
  :host {
    display: block;
    position: relative;
    /* palette */
    --steppy-bg: #f4f1ea;
    --steppy-surface: #fbf9f4;
    --steppy-chrome-bg: #efece3;
    --steppy-fg: #1f1d1a;
    --steppy-muted: #8a857c;
    --steppy-border: #e1ddd1;
    --steppy-accent: #d24f2c;
    --steppy-accent-weak: rgba(210, 79, 44, 0.35);
    --steppy-success: #3a7d44;
    /* typography */
    --steppy-font-serif: ui-serif, Georgia, 'Times New Roman', serif;
    --steppy-font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    --steppy-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    --steppy-font-family: var(--steppy-font-sans);
    /* engine vars (names preserved, re-pointed at the palette) */
    --steppy-cursor-size: 24px;
    --steppy-cursor-color: var(--steppy-fg);
    --steppy-ripple-color: rgba(31, 29, 26, 0.25);
    --steppy-hotspot-color: var(--steppy-accent);
    --steppy-hotspot-glow: var(--steppy-accent-weak);
    --steppy-tooltip-bg: var(--steppy-fg);
    --steppy-tooltip-fg: var(--steppy-surface);

    font-family: var(--steppy-font-family);
    color: var(--steppy-fg);
  }

  .steppy-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ── Stage ─────────────────────────────────────────────────────────── */
  .steppy-stage {
    position: relative;
    width: 100%;
    background: var(--steppy-chrome-bg);
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
    background: var(--steppy-fg);
    color: var(--steppy-surface);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-family: var(--steppy-font-mono);
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
    background: var(--steppy-fg);
    color: var(--steppy-surface);
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

  /* ── Status / error ────────────────────────────────────────────────── */
  .steppy-state {
    padding: 24px;
    text-align: center;
    color: var(--steppy-muted);
  }
  .steppy-state.error {
    color: #b3402a;
    background: #fbeae6;
    border-radius: 6px;
  }
  .steppy-state .steppy-state-detail {
    font-size: 12px;
    margin-top: 8px;
    font-family: var(--steppy-font-mono);
    white-space: pre-wrap;
    text-align: left;
    max-height: 200px;
    overflow: auto;
  }

  /* ── Shared chrome controls ────────────────────────────────────────── */
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
  .steppy-progress {
    margin-right: auto;
    font-family: var(--steppy-font-mono);
    font-variant-numeric: tabular-nums;
    color: var(--steppy-muted);
  }
  .steppy-btn {
    font: inherit;
    background: var(--steppy-surface);
    border: 1px solid var(--steppy-border);
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    color: var(--steppy-fg);
  }
  .steppy-btn:hover:not(:disabled) {
    border-color: var(--steppy-muted);
  }
  .steppy-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .steppy-field {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--steppy-muted);
  }
  .steppy-field select {
    font: inherit;
    background: var(--steppy-surface);
    border: 1px solid var(--steppy-border);
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    color: var(--steppy-fg);
  }
  /* Segmented control (pill container; active = dark fill + light text). */
  .steppy-seg {
    display: inline-flex;
    background: var(--steppy-bg);
    border: 1px solid var(--steppy-border);
    border-radius: 999px;
    padding: 2px;
    gap: 2px;
  }
  .steppy-seg-btn {
    font: inherit;
    font-size: 13px;
    border: 0;
    background: transparent;
    color: var(--steppy-muted);
    padding: 3px 12px;
    border-radius: 999px;
    cursor: pointer;
  }
  .steppy-seg-btn[aria-current='true'] {
    background: var(--steppy-fg);
    color: var(--steppy-surface);
  }
  .steppy-seg-btn:focus-visible {
    outline: 2px solid var(--steppy-accent);
    outline-offset: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    .steppy-cursor,
    .steppy-cursor.pulse,
    .steppy-ripple.fire,
    .steppy-hotspot,
    .steppy-hotspot.miss,
    .steppy-miss-toast {
      animation: none !important;
      transition: none !important;
    }
  }
`, Wr = {
  sidebar: "templateSidebar",
  overlay: "templateOverlay",
  inline: "templateInline"
};
function qr(t) {
  return _`<span class="steppy-progress" aria-live="polite"
    >${ye(t.ui.progress, { current: t.currentIndex, total: t.total })}</span
  >`;
}
function ns(t) {
  return _`<span class="steppy-counter" aria-live="polite"
    >${t.currentIndex}/${t.total}</span
  >`;
}
function ft(t) {
  return _`<button
    class="steppy-btn steppy-prev"
    @click=${t.onPrev}
    ?disabled=${t.prevDisabled}
  >
    ${t.ui.previous}
  </button>`;
}
function mt(t) {
  return _`<button
    class="steppy-btn steppy-next"
    @click=${t.onNext}
    ?disabled=${t.nextDisabled}
  >
    ${t.ui.next}
  </button>`;
}
function Gr(t) {
  return _`<button class="steppy-btn steppy-restart" @click=${t.onRestart}>
    ${t.ui.restart}
  </button>`;
}
function yt(t) {
  return t.locales.length <= 1 ? b : _`<label class="steppy-field">
    ${t.ui.localeSwitcher}
    <select @change=${t.onLocaleChange} .value=${t.activeLocale}>
      ${t.locales.map(
    (e) => _`<option value=${e} ?selected=${e === t.activeLocale}>${e}</option>`
  )}
    </select>
  </label>`;
}
function gt(t) {
  return t.layouts.length <= 1 || t.hideLayoutSwitcher ? b : _`<label class="steppy-field">
    ${t.ui.variantSwitcher}
    <select @change=${t.onLayoutChange} .value=${t.activeLayout ?? ""}>
      ${t.layouts.map(
    (e) => _`<option value=${e} ?selected=${e === t.activeLayout}>${e}</option>`
  )}
    </select>
  </label>`;
}
function vt(t) {
  return _`<div class="steppy-seg" role="group" aria-label=${t.ui.templateSwitcher}>
    ${t.templates.map((e) => {
    const s = e === t.activeTemplate;
    return _`<button
        type="button"
        class="steppy-seg-btn"
        aria-current=${s ? "true" : "false"}
        @click=${() => t.onTemplateChange(e)}
      >
        ${t.ui[Wr[e]]}
      </button>`;
  })}
  </div>`;
}
function Kr(t) {
  const e = t.steps.find((s) => s.status === "current") ?? t.steps[t.currentIndex - 1];
  return _`
    <div class="steppy-tpl-inline">
      ${t.renderStage()}
      <div class="steppy-inline-bar">
        ${ns(t)}
        <span class="steppy-inline-desc">${K(e?.description ?? "")}</span>
        ${e?.subLabel ? _`<span class="steppy-inline-sub">${e.subLabel}</span>` : b}
        <span class="steppy-inline-controls">
          ${vt(t)} ${yt(t)} ${gt(t)}
          ${ft(t)} ${mt(t)}
        </span>
      </div>
      ${t.completed ? _`<div class="steppy-state">${t.ui.done}</div>` : b}
    </div>
  `;
}
const as = Ue`
  .steppy-tpl-inline {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .steppy-inline-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    background: var(--steppy-chrome-bg);
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 14px;
  }
  .steppy-inline-bar .steppy-counter {
    font-family: var(--steppy-font-mono);
    font-weight: 600;
    color: var(--steppy-accent);
  }
  .steppy-inline-desc {
    flex: 1 1 240px;
    min-width: 0;
    color: var(--steppy-fg);
  }
  .steppy-inline-sub {
    font-family: var(--steppy-font-mono);
    font-size: 12px;
    color: var(--steppy-muted);
  }
  .steppy-inline-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-wrap: wrap;
  }
`, Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  render: Kr,
  styles: as
}, Symbol.toStringTag, { value: "Module" }));
function Yr(t) {
  return _`
    <div class="steppy-wrapper steppy-tpl-overlay">
      ${t.renderStage()}
      <div class="steppy-chrome">
        ${qr(t)} ${ft(t)} ${mt(t)} ${Gr(t)}
        ${yt(t)} ${gt(t)} ${vt(t)}
      </div>
      ${t.completed ? _`<div class="steppy-state">${t.ui.done}</div>` : b}
    </div>
  `;
}
const os = Ue`
  .steppy-tpl-overlay .steppy-seg {
    margin-left: auto;
  }
`, Xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  render: Yr,
  styles: os
}, Symbol.toStringTag, { value: "Module" }));
function Qr(t, e) {
  const s = e.status === "completed" ? _`${t.ui.stepPassed} <span aria-hidden="true">✓</span>` : e.subLabel || b;
  return _`
    <li
      class="steppy-step steppy-step--${e.status}"
      aria-current=${e.status === "current" ? "step" : b}
    >
      <button
        class="steppy-step-row"
        ?disabled=${!e.reachable}
        @click=${() => t.onGoTo(e.index)}
      >
        <span class="steppy-node" aria-hidden="true"></span>
        <span class="steppy-step-main">
          <span class="steppy-step-title">${K(e.title)}</span>
          <span class="steppy-step-sub">${s}</span>
        </span>
      </button>
      ${e.status === "current" && e.description ? _`<p class="steppy-step-desc">${K(e.description)}</p>` : b}
    </li>
  `;
}
function ei(t) {
  return _`
    <div class="steppy-tpl-sidebar">
      <div class="steppy-sidebar-layout">
        <aside class="steppy-rail">
          <div class="steppy-rail-head">
            <h2 class="steppy-guide-title">${t.guideTitle}</h2>
            <p class="steppy-meta">
              ${ye(t.ui.stepsMeta, {
    count: t.total,
    duration: t.durationLabel
  })}
            </p>
            <div class="steppy-rail-switchers">
              ${vt(t)} ${yt(t)}
              ${gt(t)}
            </div>
          </div>
          <ol class="steppy-timeline">
            ${t.steps.map((e) => Qr(t, e))}
          </ol>
          <div class="steppy-rail-foot">
            ${ft(t)} ${mt(t)} ${ns(t)}
          </div>
        </aside>
        <div class="steppy-preview">${t.renderStage()}</div>
      </div>
      ${t.completed ? _`<div class="steppy-state">${t.ui.done}</div>` : b}
    </div>
  `;
}
const ls = Ue`
  .steppy-tpl-sidebar {
    container-type: inline-size;
  }
  .steppy-sidebar-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 20px;
    align-items: start;
  }
  .steppy-rail {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--steppy-surface);
    border: 1px solid var(--steppy-border);
    border-radius: 10px;
    padding: 18px;
  }
  .steppy-rail-head {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .steppy-guide-title {
    margin: 0;
    font-family: var(--steppy-font-serif);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--steppy-fg);
  }
  .steppy-meta {
    margin: 0;
    font-family: var(--steppy-font-mono);
    font-size: 12px;
    color: var(--steppy-muted);
  }
  .steppy-rail-switchers {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  /* ── Timeline ──────────────────────────────────────────────────────── */
  .steppy-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .steppy-step {
    position: relative;
    padding-left: 4px;
  }
  /* Connecting line between nodes. */
  .steppy-step:not(:last-child) .steppy-node::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 14px;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% - 6px);
    background: var(--steppy-border);
  }
  .steppy-step-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    background: transparent;
    border: 0;
    padding: 8px 6px;
    text-align: left;
    cursor: pointer;
    color: var(--steppy-fg);
    border-radius: 6px;
    font: inherit;
  }
  .steppy-step-row:disabled {
    cursor: default;
  }
  .steppy-step-row:hover:not(:disabled) {
    background: var(--steppy-bg);
  }
  .steppy-node {
    position: relative;
    flex: 0 0 auto;
    width: 14px;
    height: 14px;
    margin-top: 3px;
    border-radius: 50%;
    border: 2px solid var(--steppy-border);
    background: var(--steppy-surface);
    box-sizing: border-box;
    z-index: 1;
  }
  .steppy-step--completed .steppy-node {
    background: var(--steppy-success);
    border-color: var(--steppy-success);
  }
  .steppy-step--current .steppy-node {
    background: var(--steppy-accent);
    border-color: var(--steppy-accent);
    box-shadow: 0 0 0 4px var(--steppy-accent-weak);
  }
  .steppy-step-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .steppy-step-title {
    font-size: 14px;
    color: var(--steppy-fg);
  }
  .steppy-step--current .steppy-step-title {
    font-weight: 700;
  }
  .steppy-step--upcoming .steppy-step-title {
    color: var(--steppy-muted);
  }
  .steppy-step-sub {
    font-family: var(--steppy-font-mono);
    font-size: 11px;
    color: var(--steppy-muted);
  }
  .steppy-step-desc {
    margin: 4px 0 8px 26px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--steppy-fg);
  }

  .steppy-rail-foot {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .steppy-rail-foot .steppy-counter {
    margin-left: auto;
    font-family: var(--steppy-font-mono);
    font-size: 13px;
    color: var(--steppy-muted);
  }
  .steppy-preview {
    min-width: 0;
  }

  /* Collapse to a single column on narrow containers (rail on top). */
  @container (max-width: 640px) {
    .steppy-sidebar-layout {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 640px) {
    .steppy-sidebar-layout {
      grid-template-columns: 1fr;
    }
  }
`, ti = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  render: ei,
  styles: ls
}, Symbol.toStringTag, { value: "Module" })), Bt = {
  overlay: Xr,
  sidebar: ti,
  inline: Jr
}, cs = ["sidebar", "overlay", "inline"], si = new Set(cs);
function Te(t) {
  return typeof t == "string" && si.has(t);
}
const ri = [Br, os, ls, as];
var ii = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, k = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ni(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (r ? a(e, s, i) : a(i)) || i);
  return r && i && ii(e, s, i), i;
};
function Wt(t) {
  return { cursor: t.cursor, viewport: t.captureSize };
}
const ai = ["arrow", "hotspot", "off"];
function qt(t) {
  return typeof t == "string" && ai.includes(t);
}
let w = class extends fe {
  constructor() {
    super(...arguments), this.src = "", this.locale = null, this.variant = null, this.autoplay = !1, this.startIndex = 1, this.cursor = null, this.template = null, this.hideLayoutSwitcher = !1, this.manifest = null, this.loadError = null, this.currentStepIndex = 0, this.currentFrameIndex = 0, this.currentTargetIndex = 0, this.waitingForInput = !1, this.completed = !1, this.missCount = 0, this.hotspotRect = null, this.tooltipPlacement = null, this.stageSize = { width: 0, height: 0 }, this._activeTemplate = "overlay", this._observedStage = null, this.maxReachedStepIndex = 0, this.animator = null, this.stageRef = te(), this.imgRef = te(), this.cursorRef = te(), this.rippleRef = te(), this.kbdRef = te(), this.tooltipRef = te(), this.resizeObserver = null, this.autoAdvanceTimer = null, this.playToken = 0, this.waitForClick = null, this.resolveClick = null, this._handleKeyDown = (t) => {
      this.manifest && (t.key === "ArrowRight" ? this.next() : t.key === "ArrowLeft" && this.prev());
    }, this._onLocaleChange = (t) => {
      const e = t.target.value;
      this.manifest && this.manifest.locales.includes(e) && (this.locale = e, this._playCurrentPosition());
    }, this._onVariantChange = (t) => {
      this.variant = this._resolveVariant(t.target.value);
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
  willUpdate(t) {
    if (t.has("src") && this._loadManifest(), t.has("locale") && this.manifest && this.locale && this._emit("steppy:locale", {
      from: t.get("locale"),
      to: this.locale
    }), t.has("variant") && this.manifest && this.variant && this._emit("steppy:variant", {
      from: t.get("variant"),
      to: this.variant
    }), t.has("variant") && this.manifest && !t.has("manifest")) {
      this.currentFrameIndex = 0, this.currentTargetIndex = 0, this.waitingForInput = !1, this.hotspotRect = null, this.tooltipPlacement = null;
      const e = this.resolveClick;
      this.resolveClick = null, e?.(), this._playCurrentPosition();
    }
    if (t.has("cursor") && this.manifest) {
      this.waitingForInput = !1, this.hotspotRect = null, this.tooltipPlacement = null;
      const e = this.resolveClick;
      this.resolveClick = null, e?.(), this._playCurrentPosition();
    }
    t.has("template") && (this._activeTemplate = this._resolveTemplate(), Te(this.template) && this._persistTemplate(this._activeTemplate)), (t.has("waitingForInput") || t.has("currentStepIndex") || t.has("currentFrameIndex") || t.has("currentTargetIndex") || t.has("locale") || t.has("variant") || t.has("stageSize") || t.has("template")) && this._recomputeHotspot();
  }
  updated(t) {
    const e = this.stageRef.value ?? null;
    !this.animator && e ? (this.animator = this.constructor.createAnimator({
      stage: e,
      timings: this.manifest?.cursor
    }), this._observedStage = e) : e && e !== this._observedStage ? this._reattachStage(e) : this.animator && e && (this.animator.refreshDom(), this.manifest && this.animator.setTimings(this.manifest.cursor)), t.has("manifest") && this.manifest && (this._setupResizeObserver(), this._observedStage = this.stageRef.value ?? null, this._restartFromStart());
  }
  /** Re-bind the ResizeObserver + animator to a relocated stage element (e.g.
   *  after a template switch) and reposition the hotspot/tooltip. Does not
   *  touch step state, so the in-flight play loop continues uninterrupted. */
  _reattachStage(t) {
    this._observedStage = t, this._setupResizeObserver(), this.animator?.setStage(t), this.manifest && this.animator?.setTimings(this.manifest.cursor), this.stageSize = {
      width: t.clientWidth || this.stageSize.width,
      height: t.clientHeight || this.stageSize.height
    }, this._recomputeHotspot();
  }
  // ── Public methods ───────────────────────────────────────────────────
  next() {
    if (this.manifest) {
      if (this.waitingForInput) {
        this._confirmHotspotClick();
        return;
      }
      this._advance();
    }
  }
  prev() {
    this.manifest && (this.currentStepIndex <= 0 || this._goToStep(this.currentStepIndex - 1, { reason: "prev" }));
  }
  restart() {
    this.manifest && (this.completed = !1, this.maxReachedStepIndex = 0, this._goToStep(0, { reason: "restart" }));
  }
  goTo(t) {
    if (!this.manifest) return;
    const e = t - 1;
    if (e < 0 || e > this.maxReachedStepIndex) {
      this._emit("steppy:error", {
        code: "bad_attribute",
        message: `goTo(${t}) is out of range or beyond the furthest reached step`
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
      const t = await fetch(this.src);
      if (!t.ok) {
        this.loadError = {
          code: "fetch_failed",
          message: `${t.status} ${t.statusText} fetching ${this.src}`
        }, this._emit("steppy:error", this.loadError);
        return;
      }
      const e = await t.text(), s = Vr(e);
      if (!s.ok) {
        this.loadError = s.error, this._emit("steppy:error", s.error);
        return;
      }
      this.manifest = s.manifest, (!this.locale || !this.manifest.locales.includes(this.locale)) && (this.locale = this.manifest.defaultLocale);
      const r = this.variant ?? this.manifest.defaultLayout ?? this._fallbackLayoutKey();
      this.variant = this._resolveVariant(r), this._activeTemplate = this._resolveTemplate();
    } catch (t) {
      this.loadError = {
        code: "fetch_failed",
        message: t instanceof Error ? t.message : "fetch failed"
      }, this._emit("steppy:error", this.loadError);
    }
  }
  _fallbackLayoutKey() {
    return this.manifest && this.manifest.layouts.length === 0 ? "_" : "desktop";
  }
  _resolveVariant(t) {
    if (!this.manifest) return "_";
    const e = this.manifest.layouts.length > 0 ? this.manifest.layouts : ["_"];
    return t && e.includes(t) ? t : this.manifest.defaultLayout ?? e[0];
  }
  async _restartFromStart() {
    if (!this.manifest) return;
    const t = Math.max(
      0,
      Math.min(this.manifest.steps.length - 1, (this.startIndex || 1) - 1)
    );
    this.maxReachedStepIndex = t, this._emit("steppy:ready", {
      slug: this.manifest.slug,
      total: this.manifest.steps.length,
      locale: this.locale,
      variant: this.variant
    }), this._goToStep(t, { reason: "init" });
  }
  _setupResizeObserver() {
    this.resizeObserver?.disconnect(), !(!this.stageRef.value || typeof ResizeObserver > "u") && (this.resizeObserver = new ResizeObserver((t) => {
      const e = t[0];
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
    const t = this._currentStep();
    if (!t || !this.locale || !this.variant) return null;
    const e = t.captures[this.locale];
    if (!e) return null;
    const s = this.variant in e ? this.variant : Object.keys(e)[0], r = e[s];
    return r ? r.frames[this.currentFrameIndex] ?? null : null;
  }
  _currentTargetBbox() {
    const t = this._currentFrame();
    return !t || !t.cursor ? null : G.normalizeTargets(t.cursor)[this.currentTargetIndex]?.bbox ?? null;
  }
  _recomputeHotspot() {
    const t = this.imgRef.value, e = this._currentFrame();
    if (!t || !e || !this.waitingForInput) {
      this.hotspotRect = null, this.tooltipPlacement = null;
      return;
    }
    const s = this._currentTargetBbox();
    this.hotspotRect = Ks(t, e.captureSize, s), this._placeTooltip();
  }
  _placeTooltip() {
    if (!this.hotspotRect || !this.stageRef.value) {
      this.tooltipPlacement = null;
      return;
    }
    const t = this.stageRef.value.getBoundingClientRect(), e = this.tooltipRef.value, s = e ? { width: e.offsetWidth || 240, height: e.offsetHeight || 60 } : { width: 240, height: 60 };
    this.tooltipPlacement = Js(
      this.hotspotRect,
      s,
      { width: t.width, height: t.height }
    );
  }
  _goToStep(t, e) {
    if (!this.manifest || t < 0 || t >= this.manifest.steps.length) return;
    this.currentStepIndex = t, this.currentFrameIndex = 0, this.currentTargetIndex = 0, this.completed = !1, this.missCount = 0, this.waitingForInput = !1, t > this.maxReachedStepIndex && (this.maxReachedStepIndex = t);
    const s = this._currentStep();
    this._emit("steppy:step", {
      index: s.index,
      id: s.id,
      total: this.manifest.steps.length,
      action: s.action,
      interactive: s.interactive,
      reason: e.reason
    }), this._playCurrentPosition();
  }
  /** Resolve the effective cursor mode. Host attribute wins; manifest is the
   *  fallback; 'arrow' is the final default. Unknown attribute strings fall
   *  through to the manifest so a typo can't strand the player. */
  _effectiveCursorMode() {
    if (qt(this.cursor)) return this.cursor;
    const t = this.manifest?.cursor.mode;
    return qt(t) ? t : "arrow";
  }
  async _playCurrentPosition() {
    const t = ++this.playToken;
    this.autoAdvanceTimer !== null && (clearTimeout(this.autoAdvanceTimer), this.autoAdvanceTimer = null);
    const e = this._currentFrame();
    if (!e) return;
    const s = this._currentStep(), r = this._effectiveCursorMode();
    if (await this.updateComplete, this.playToken === t) {
      if (this.animator?.refreshDom(), e.cursor === null || r === "off") {
        this.animator?.hide();
        const i = Math.max(0, s.waitAfter ?? 0) || 600;
        if (await new Promise((n) => {
          this.autoAdvanceTimer = setTimeout(() => {
            this.autoAdvanceTimer = null, n();
          }, i);
        }), this.playToken !== t) return;
        this._advance();
        return;
      }
      if (r === "arrow") {
        try {
          await this.animator?.travelToTarget(Wt(e), this.currentTargetIndex);
        } catch {
        }
        if (this.playToken !== t) return;
      } else
        this.animator?.hide();
      if (this.waitingForInput = !0, this._recomputeHotspot(), this.waitForClick = new Promise((i) => {
        this.resolveClick = i;
      }), await this.waitForClick, this.playToken === t) {
        if (this.waitingForInput = !1, this.hotspotRect = null, this.tooltipPlacement = null, r === "arrow") {
          try {
            await this.animator?.playTargetAction(Wt(e), this.currentTargetIndex);
          } catch {
          }
          if (this.playToken !== t) return;
        }
        this._advance();
      }
    }
  }
  _advance() {
    if (!this.manifest) return;
    const t = this._currentStep();
    if (!t) return;
    const e = this._currentFrame();
    if (!e) return;
    if (e.cursor) {
      const i = G.normalizeTargets(e.cursor);
      if (this.currentTargetIndex + 1 < i.length) {
        this.currentTargetIndex += 1, this._playCurrentPosition();
        return;
      }
    }
    const r = (t.captures[this.locale]?.[this.variant] ?? Object.values(t.captures[this.locale] ?? {})[0])?.frames.length ?? 1;
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
    const t = this._currentStep();
    t && this._emit("steppy:hotspot", {
      index: t.index,
      id: t.id,
      target: "correct"
    });
    const e = this.resolveClick;
    this.resolveClick = null, e();
  }
  _onStageClick(t) {
    if (!this.waitingForInput) return;
    const e = this._currentStep();
    e && (this.missCount += 1, this._emit("steppy:hotspot", {
      index: e.index,
      id: e.id,
      target: "miss"
    }));
  }
  _onHotspotClick(t) {
    t.stopPropagation(), this._confirmHotspotClick();
  }
  _emit(t, e) {
    this.dispatchEvent(
      new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 })
    );
  }
  // ── Rendering ────────────────────────────────────────────────────────
  render() {
    const t = Nt(this.locale ?? "en", this.uiStrings);
    if (this.loadError) return this._renderError(this.loadError, t);
    if (!this.manifest) return this._renderLoading(t);
    if (!this._currentStep()) return this._renderLoading(t);
    const s = this._buildTemplateContext(t);
    return (Bt[this._activeTemplate] ?? Bt.overlay).render(s);
  }
  /** The live stage subtree (screenshot + cursor/ripple/kbd + hotspot +
   *  miss-toast), shared verbatim by every template via the ``renderStage``
   *  thunk so the refs + handlers stay bound to the component.
   *
   *  A template *switch* swaps the whole top-level template, so Lit recreates
   *  the stage element. That is handled by ``updated`` → ``_reattachStage``
   *  (re-point the animator + ResizeObserver, recompute placement) WITHOUT
   *  resetting step state, so the in-flight animation survives the move. The
   *  floating tooltip is included only in overlay mode (sidebar and inline
   *  surface the description in their own chrome). */
  _renderStage() {
    const t = Nt(this.locale ?? "en", this.uiStrings), e = this._currentStep(), r = this._currentFrame()?.screenshot ?? "", i = e ? e.text[this.locale] ?? "" : "";
    return _`
      <div class="steppy-stage" ${se(this.stageRef)} @click=${this._onStageClick}>
        <img
          ${se(this.imgRef)}
          src=${r}
          alt=${i || e?.id || ""}
          @load=${this._onImgLoad}
        />
        <div class="steppy-cursor" ${se(this.cursorRef)} aria-hidden="true"></div>
        <div class="steppy-ripple" ${se(this.rippleRef)} aria-hidden="true"></div>
        <div class="steppy-kbd" ${se(this.kbdRef)} aria-hidden="true"></div>
        ${e ? this._renderHotspot(t, e, i) : b}
        ${this._activeTemplate === "overlay" ? this._renderTooltip(i) : b}
        ${this.missCount > 0 ? this._renderMissToast(t) : b}
      </div>
    `;
  }
  _renderHotspot(t, e, s) {
    if (!this.waitingForInput || !this.hotspotRect) return b;
    const r = this.hotspotRect, i = ye(t.hotspotLabel, { step: s || e.id }), n = this.missCount;
    return _`
      <button
        class="steppy-hotspot ${this.missCount > 0 ? "miss" : ""}"
        style="left:${r.x}px;top:${r.y}px;width:${r.width}px;height:${r.height}px"
        aria-label=${i}
        data-miss-key=${n}
        @click=${this._onHotspotClick}
      ></button>
    `;
  }
  _renderTooltip(t) {
    if (!this.waitingForInput || !this.hotspotRect || !this.tooltipPlacement)
      return b;
    const e = this.tooltipPlacement;
    return _`
      <div
        class="steppy-tooltip"
        ${se(this.tooltipRef)}
        style="left:${e.x}px;top:${e.y}px"
        data-side=${e.side}
      >
        ${K(t)}
      </div>
    `;
  }
  _renderMissToast(t) {
    return _`<div class="steppy-miss-toast" data-key=${this.missCount}>${t.miss}</div>`;
  }
  // ── Engine → template context ─────────────────────────────────────────
  /** Project the ordered manifest steps into presentation view models. Pure
   *  projection of engine state — no behavior, no duplicated gates. */
  _buildStepViews(t) {
    return this.manifest ? this.manifest.steps.map((e) => {
      const s = e.index - 1, r = s < this.currentStepIndex ? "completed" : s === this.currentStepIndex ? "current" : "upcoming";
      return {
        index: e.index,
        title: e.title?.[t] ?? e.text[t] ?? e.id,
        description: e.text[t] ?? "",
        subLabel: e.subtitle?.[t] ?? "",
        status: r,
        reachable: s <= this.maxReachedStepIndex
      };
    }) : [];
  }
  /** Display-only duration estimate (~8s/step). Never feeds the play loop. */
  _durationLabel(t) {
    const e = (this.manifest?.steps.length ?? 0) * 8;
    return e < 60 ? ye(t.durationSeconds, { seconds: e }) : ye(t.durationApprox, {
      minutes: Math.max(1, Math.round(e / 60))
    });
  }
  _buildTemplateContext(t) {
    const e = this.manifest, s = this.locale ?? e.defaultLocale, r = e.layouts.length > 0 ? e.layouts : [];
    return {
      steps: this._buildStepViews(s),
      currentIndex: this.currentStepIndex + 1,
      total: e.steps.length,
      durationLabel: this._durationLabel(t),
      guideTitle: e.title[s] ?? Object.values(e.title)[0] ?? "",
      locale: s,
      ui: t,
      waitingForInput: this.waitingForInput,
      completed: this.completed,
      onNext: () => this.next(),
      onPrev: () => this.prev(),
      onRestart: () => this.restart(),
      onGoTo: (i) => this.goTo(i),
      prevDisabled: this.currentStepIndex <= 0,
      nextDisabled: this.completed,
      locales: e.locales,
      layouts: r,
      templates: cs,
      activeTemplate: this._activeTemplate,
      activeLocale: this.locale ?? "",
      activeLayout: this.variant,
      hideLayoutSwitcher: this.hideLayoutSwitcher,
      onLocaleChange: this._onLocaleChange,
      onLayoutChange: this._onVariantChange,
      onTemplateChange: (i) => this._onTemplateChange(i),
      renderStage: () => this._renderStage()
    };
  }
  /** The built-in template switcher routes through the reflected property so
   *  ``willUpdate`` re-resolves + persists (and hosts observe the attribute). */
  _onTemplateChange(t) {
    this.template = t;
  }
  _readPersistedTemplate() {
    try {
      const t = localStorage.getItem(w.TEMPLATE_STORAGE_KEY);
      return Te(t) ? t : null;
    } catch {
      return null;
    }
  }
  _persistTemplate(t) {
    try {
      localStorage.setItem(w.TEMPLATE_STORAGE_KEY, t);
    } catch {
    }
  }
  /** Resolve the effective template: explicit ``template`` attribute →
   *  persisted localStorage → manifest ``defaultTemplate`` → 'overlay'.
   *  Unknown attribute strings fall through so a typo can't strand the player. */
  _resolveTemplate() {
    if (Te(this.template)) return this.template;
    const t = this._readPersistedTemplate();
    if (t) return t;
    const e = this.manifest?.defaultTemplate;
    return Te(e) ? e : "overlay";
  }
  _renderLoading(t) {
    return _`<div class="steppy-state" role="status">${t.loading}</div>`;
  }
  _renderError(t, e) {
    const s = t.issues && t.issues.length > 0 ? _`<div class="steppy-state-detail">
            ${t.issues.map((r) => _`<div>${r.path}: ${r.message}</div>`)}
          </div>` : _`<div class="steppy-state-detail">${t.message}</div>`;
    return _`
      <div class="steppy-state error" role="alert">
        <strong>${e.errorTitle}</strong>
        ${s}
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
w.createAnimator = (t) => new G(t);
w.styles = ri;
w.TEMPLATE_STORAGE_KEY = "steppy:active-template";
k([
  j({ type: String, reflect: !0 })
], w.prototype, "src", 2);
k([
  j({ type: String, reflect: !0 })
], w.prototype, "locale", 2);
k([
  j({ type: String, reflect: !0 })
], w.prototype, "variant", 2);
k([
  j({ type: Boolean, reflect: !0 })
], w.prototype, "autoplay", 2);
k([
  j({ type: Number, reflect: !0, attribute: "start-index" })
], w.prototype, "startIndex", 2);
k([
  j({ type: String, reflect: !0 })
], w.prototype, "cursor", 2);
k([
  j({ type: String, reflect: !0 })
], w.prototype, "template", 2);
k([
  j({ type: Boolean, reflect: !0, attribute: "hide-layout-switcher" })
], w.prototype, "hideLayoutSwitcher", 2);
k([
  j({ attribute: !1 })
], w.prototype, "uiStrings", 2);
k([
  I()
], w.prototype, "manifest", 2);
k([
  I()
], w.prototype, "loadError", 2);
k([
  I()
], w.prototype, "currentStepIndex", 2);
k([
  I()
], w.prototype, "currentFrameIndex", 2);
k([
  I()
], w.prototype, "currentTargetIndex", 2);
k([
  I()
], w.prototype, "waitingForInput", 2);
k([
  I()
], w.prototype, "completed", 2);
k([
  I()
], w.prototype, "missCount", 2);
k([
  I()
], w.prototype, "hotspotRect", 2);
k([
  I()
], w.prototype, "tooltipPlacement", 2);
k([
  I()
], w.prototype, "stageSize", 2);
k([
  I()
], w.prototype, "_activeTemplate", 2);
w = k([
  Is("steppy-guide")
], w);
export {
  G as CursorAnimator,
  It as DEFAULT_UI_STRINGS,
  Ur as GuideManifestSchema,
  Ht as SUPPORTED_MAJOR_VERSION,
  w as SteppyGuide,
  Gs as bezierControlPoint,
  Bs as easeInOut,
  dt as getDisplayScale,
  Vr as parseManifest,
  Ws as rectCenter,
  Ot as scaleBbox,
  ut as scaleRect,
  qs as travelDuration
};
//# sourceMappingURL=steppy-player.js.map
