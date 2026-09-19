(function () {
  'use strict';

  const D = window.EURASIA_DATA;
  const ICON = 'assets/icons/';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => '$' + Math.round(n);
  const minus = (n) => (Math.round(n) ? '−' + money(n) : money(0));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* ---------------- Storage ---------------- */

  const store = {
    read(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
    },
    write(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
      document.dispatchEvent(new CustomEvent('store:change', { detail: key }));
    }
  };

  const Cart = {
    key: 'evrazia-cart',
    items() { return store.read(this.key, []).filter((i) => D.product(i.id)); },
    save(items) { store.write(this.key, items); },
    add(id, volume, qty = 1) {
      const items = this.items();
      const vol = volume || D.product(id).volumes[0];
      const found = items.find((i) => i.id === id && i.vol === vol);
      if (found) found.qty += qty;
      else items.push({ id, vol, qty, selected: true });
      this.save(items);
    },
    setQty(index, qty) {
      const items = this.items();
      if (!items[index]) return;
      items[index].qty = Math.max(1, qty);
      this.save(items);
    },
    remove(index) {
      const items = this.items();
      items.splice(index, 1);
      this.save(items);
    },
    toggle(index, value) {
      const items = this.items();
      if (!items[index]) return;
      items[index].selected = value;
      this.save(items);
    },
    selectAll(value) { this.save(this.items().map((i) => Object.assign(i, { selected: value }))); },
    count() { return this.items().reduce((s, i) => s + i.qty, 0); },
    totals() {
      let items = 0, full = 0, pcs = 0;
      this.items().filter((i) => i.selected).forEach((i) => {
        const p = D.product(i.id);
        pcs += i.qty;
        items += (p.old || p.price) * i.qty;
        full += p.price * i.qty;
      });
      return { pcs, items, discount: items - full, total: full };
    },
    clearSelected() { this.save(this.items().filter((i) => !i.selected)); }
  };

  const Fav = {
    key: 'evrazia-fav',
    ids() { return store.read(this.key, []).filter((id) => D.product(id)); },
    has(id) { return this.ids().includes(id); },
    toggle(id) {
      const ids = this.ids();
      const i = ids.indexOf(id);
      if (i >= 0) ids.splice(i, 1); else ids.push(id);
      store.write(this.key, ids);
      return i < 0;
    }
  };

  /* ---------------- Toast ---------------- */

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  let toastTimer;
  function notify(text, action) {
    toast.innerHTML = `<span>${esc(text)}</span>${action ? `<a class="btn btn--white" href="${action.href}">${esc(action.label)}</a>` : ''}`;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function addToCart(id, vol, qty) {
    Cart.add(id, vol, qty);
    const p = D.product(id);
    notify(`${cap(p.name)} added to cart`, page === 'cart' ? null : { href: 'cart.html', label: 'View cart' });
  }

  /* ---------------- Shared markup ---------------- */

  const brandLabel = (id) => D.brandName(id);

  const socials = (dark) => `
    <div class="socials">
      <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Telegram"><img src="${ICON}telegram${dark ? '-dark' : ''}.svg" alt=""></a>
      <a href="https://vk.com/" target="_blank" rel="noopener" aria-label="VK"><img src="${ICON}${dark ? 'vk-dark' : 'vk2'}.svg" alt=""></a>
      <a href="mailto:info@eurasia.ru" aria-label="Email"><img src="${ICON}${dark ? 'gmail-dark' : 'gmail2'}.svg" alt=""></a>
      <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><img src="${ICON}instagram-full${dark ? '-dark' : ''}.svg" alt=""><span class="star">*</span></a>
    </div>`;

  const searchForm = (light) => `
    <form class="search" action="catalog.html" role="search">
      <input type="search" name="q" placeholder="Search products" aria-label="Search products" value="${esc(params.get('q') || '')}">
      <button type="submit" aria-label="Search"><img src="${ICON}${light ? 'search-white' : 'search'}.svg" alt=""></button>
    </form>`;

  function renderHeader() {
    const el = $('#site-header');
    if (!el) return;
    el.className = 'site-header';
    const nav = [
      ['catalog.html', 'Catalog', 'catalog'],
      ['brands.html', 'Brands', 'brands'],
      ['index.html#offers', 'Offers', ''],
      ['index.html#about', 'About', '']
    ];
    el.innerHTML = `
      <div class="container header">
        <div class="header__left">
          <button class="header__burger" type="button" data-open="menu" aria-label="Open menu"><img src="${ICON}burger.svg" alt=""></button>
          <nav class="header__nav" aria-label="Main">
            ${nav.map(([href, text, key]) => `<a href="${href}" ${key && (page === key || (key === 'brands' && page === 'brand')) ? 'aria-current="page"' : ''}>${text}</a>`).join('')}
          </nav>
        </div>
        <a class="header__logo" href="index.html" aria-label="EURASIA — home"><img src="${ICON}logo-eurasia-wordmark.svg" alt="EURASIA"></a>
        <div class="header__right">
          ${searchForm(false)}
          <button class="icon-btn header__search-toggle" type="button" aria-label="Search" data-toggle-search><img src="${ICON}search.svg" alt="" style="width:20px;height:20px"></button>
          <button class="icon-btn" type="button" data-open="fav" aria-label="Favorites">
            <img src="${ICON}heart-green.svg" alt=""><span class="icon-btn__badge" data-count="fav" hidden></span>
          </button>
          <a class="icon-btn" href="cart.html" aria-label="Cart">
            <img src="${ICON}cart-green.svg" alt=""><span class="icon-btn__badge" data-count="cart" hidden></span>
          </a>
        </div>
      </div>
      <div class="container mobile-search">${searchForm(false)}</div>`;

    $('[data-toggle-search]', el).addEventListener('click', () => {
      const box = $('.mobile-search', el);
      box.classList.toggle('is-open');
      if (box.classList.contains('is-open')) $('input', box).focus();
    });
    const onScroll = () => el.classList.toggle('is-scrolled', scrollY > 4);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const el = $('#site-footer');
    if (!el) return;
    el.className = 'site-footer';
    el.innerHTML = `
      <div class="container">
        <div class="footer__top">
          <div class="footer__col footer__col--contacts">
            <p class="label">Contacts</p>
            <a class="footer__contact" href="tel:+73525205252"><img src="${ICON}phone.svg" alt="">+7 352 520 52 52</a>
            <p class="footer__contact"><img src="${ICON}location.svg" alt="">33 Kuznetsova St., Office 129<br>St Petersburg</p>
          </div>
          <nav class="footer__col" aria-label="Footer">
            <p class="label">Shop</p>
            <a href="catalog.html">Catalog</a>
            <a href="index.html#offers">Offers</a>
            <a href="index.html#about">About us</a>
            <a href="checkout.html">Delivery &amp; payment</a>
            <a href="mailto:info@eurasia.ru">Partnerships</a>
          </nav>
          <div class="footer__col">
            <p class="label">Brands</p>
            ${['skinclinic', 'tallassoria', 'derma', 'montibello'].map((id) => `<a href="brand.html?id=${id}">${D.brand(id).name}</a>`).join('')}
          </div>
          <div class="footer__col footer__side">
            <p class="label">Search the catalog</p>
            ${searchForm(true)}
            <p class="label" style="margin-top:18px">Follow us</p>
            ${socials(false)}
            <p class="footer__note">*Meta is prohibited in the Russian Federation</p>
          </div>
        </div>
        <img class="footer__logo" src="${ICON}logo-eurasia-light.svg" alt="EURASIA — магазин профессиональной косметики" loading="lazy">
        <div class="footer__bottom">
          <div class="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Consent to Data Processing</a>
            <a href="#">Public Offer Agreement</a>
          </div>
          <p>Концепт-дизайн <a class="dev-link" href="https://devenasdesign.com/" target="_blank" rel="noopener">DEVENAS design</a>, 2026. Не является действующим магазином.</p>
        </div>
      </div>`;
  }

  /* ---------------- Overlays ---------------- */

  const layers = {};

  function openLayer(name) {
    const l = layers[name];
    if (!l) return;
    if (l.render) l.render();
    l.overlay.classList.add('is-open');
    if (l.panel) l.panel.classList.add('is-open');
    l.lastFocus = document.activeElement;
    document.body.classList.add('is-locked');
    const focusable = $('button, a, input', l.panel || l.overlay);
    if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 60);
  }

  function closeLayer(name) {
    const l = layers[name];
    if (!l) return;
    l.overlay.classList.remove('is-open');
    if (l.panel) l.panel.classList.remove('is-open');
    if (!Object.values(layers).some((x) => x.overlay.classList.contains('is-open'))) {
      document.body.classList.remove('is-locked');
    }
    if (l.lastFocus && l.lastFocus.focus) l.lastFocus.focus({ preventScroll: true });
  }

  function mountLayer(name, panelClass, label) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const panel = document.createElement('aside');
    panel.className = `drawer ${panelClass}`;
    panel.setAttribute('aria-label', label);
    document.body.append(overlay, panel);
    overlay.addEventListener('click', () => closeLayer(name));
    layers[name] = { overlay, panel };
    return layers[name];
  }

  function mountMenu() {
    const { panel } = mountLayer('menu', 'menu', 'Menu');
    panel.innerHTML = `
      <div class="drawer__head">
        <a class="menu__logo" href="index.html"><img src="${ICON}logo-eurasia.svg" alt="EURASIA — магазин профессиональной косметики"></a>
        <button class="close-btn" type="button" data-close="menu" aria-label="Close menu"><img src="${ICON}close-plus.svg" alt=""></button>
      </div>
      <nav class="drawer__body">
        <div class="menu__item">
          <button class="menu__toggle" type="button" aria-expanded="false">Catalog <img src="${ICON}caret-menu.svg" alt=""></button>
          <div class="menu__sub">
            <a href="catalog.html">All products</a>
            ${D.categories.map((c) => `<a href="catalog.html?cat=${c.id}">${c.name}</a>`).join('')}
          </div>
        </div>
        <div class="menu__item">
          <button class="menu__toggle" type="button" aria-expanded="false">Brands <img src="${ICON}caret-menu.svg" alt=""></button>
          <div class="menu__sub">
            <a href="brands.html">All brands</a>
            ${D.brands.map((b) => `<a href="brand.html?id=${b.id}">${b.name}</a>`).join('')}
          </div>
        </div>
        <div class="menu__item"><a class="menu__link" href="index.html#offers">Offers</a></div>
        <div class="menu__item"><a class="menu__link" href="index.html#about">About us</a></div>
        <div class="menu__item"><a class="menu__link" href="mailto:info@eurasia.ru">For professionals</a></div>
        <div class="menu__item"><a class="menu__link" href="checkout.html">Delivery &amp; payment</a></div>
        <div class="menu__item"><a class="menu__link" href="#site-footer" data-close="menu">Contacts</a></div>
      </nav>
      <div class="drawer__foot">
        ${socials(true)}
        <p class="footer__note">*Meta is prohibited in the Russian Federation</p>
      </div>`;

    $$('.menu__toggle', panel).forEach((btn) => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.nextElementSibling.classList.toggle('is-open', open);
    }));
  }

  function mountFavorites() {
    const layer = mountLayer('fav', 'fav', 'Favorites');
    const { panel } = layer;

    layer.render = function () {
      const ids = Fav.ids();
      panel.innerHTML = `
        <div class="drawer__head">
          <h2 class="drawer__title">Favorites<span class="drawer__count">${ids.length}</span></h2>
          <button class="close-btn" type="button" data-close="fav" aria-label="Close favorites"><img src="${ICON}close-dark.svg" alt=""></button>
        </div>
        <div class="drawer__body">
          ${ids.length ? ids.map((id) => {
            const p = D.product(id);
            return `
            <article class="line">
              <a class="line__img" href="product.html?id=${p.id}"><img src="${p.img}" alt="${esc(p.name)}"></a>
              <div class="line__info">
                <p class="label">${brandLabel(p.brand)}</p>
                <h3 class="line__title"><a href="product.html?id=${p.id}">${esc(cap(p.name))}</a></h3>
                ${priceTag(p)}
              </div>
              <div class="line__side">
                <div class="line__actions">
                  <button type="button" data-fav-remove="${p.id}" aria-label="Remove from favorites"><img src="${ICON}trash-2.svg" alt=""></button>
                </div>
                <button class="card__add" type="button" data-add="${p.id}" aria-label="Add to cart"><img src="${ICON}cart-white.svg" alt=""></button>
              </div>
            </article>`;
          }).join('') : `
          <div class="empty">
            <p class="empty__title">No favorites yet</p>
            <p>Tap the heart on any product to save it here.</p>
            <a class="btn" href="catalog.html">Browse catalog</a>
          </div>`}
        </div>
        ${ids.length ? `<div class="drawer__foot"><button class="btn btn--block" type="button" data-fav-all-cart>Add all to cart</button></div>` : ''}`;
    };

    panel.addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.favRemove) Fav.toggle(t.dataset.favRemove);
      if ('favAllCart' in t.dataset) {
        const ids = Fav.ids();
        ids.forEach((id) => Cart.add(id));
        notify(`${plural(ids.length, 'item', 'items')} added to cart`, { href: 'cart.html', label: 'View cart' });
      }
    });
    document.addEventListener('store:change', () => { if (panel.classList.contains('is-open')) layer.render(); });
  }

  function mountThanks() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay modal-overlay';
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="thanks-title">
        <button class="close-btn modal__close" type="button" data-close="thanks" aria-label="Close"><img src="${ICON}close-dark2.svg" alt=""></button>
        <img class="modal__logo" src="${ICON}logo-eurasia.svg" alt="EURASIA — магазин профессиональной косметики">
        <span class="modal__mark" aria-hidden="true"></span>
        <h2 class="h2 modal__title" id="thanks-title">Thank you!</h2>
        <p class="modal__text">Your order has been placed. Our specialist will contact you within 15 minutes to arrange delivery.</p>
        <a class="btn" href="catalog.html">Browse catalog</a>
      </div>`;
    document.body.append(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLayer('thanks'); });
    layers.thanks = { overlay, panel: null };
  }

  /* ---------------- Concept notice ---------------- */

  // Add a real contact to show a "Discuss adaptation" button, e.g.
  // { label: 'Написать в Telegram', href: 'https://t.me/...' }
  const CONCEPT_CONTACT = null;
  const PORTFOLIO_URL = 'https://devenasdesign.com/';
  const devLink = `<a class="dev-link" href="${PORTFOLIO_URL}" target="_blank" rel="noopener">DEVENAS design</a>`;

  function mountConcept() {
    const bar = document.createElement('div');
    bar.className = 'concept-bar';
    bar.innerHTML = `
      <p><span class="concept-bar__tag">Концепт</span><span class="concept-bar__text">Дизайн-концепция ${devLink}. Сайт не является действующим магазином.</span></p>
      <button class="concept-bar__more" type="button" data-open="concept">Подробнее</button>`;
    document.body.prepend(bar);

    const overlay = document.createElement('div');
    overlay.className = 'overlay modal-overlay';
    overlay.innerHTML = `
      <div class="modal modal--concept" role="dialog" aria-modal="true" aria-labelledby="concept-title">
        <button class="close-btn modal__close" type="button" data-close="concept" aria-label="Закрыть"><img src="${ICON}close-dark2.svg" alt=""></button>
        <p class="label concept__tag">Концепт · ${devLink}</p>
        <h2 class="h2 modal__title" id="concept-title">Это концепция, а не рабочий магазин</h2>
        <p class="modal__text">Сайт EURASIA — дизайн-концепция, которую разработал <strong>${devLink}</strong> для своего портфолио. Он создан, чтобы наглядно показать, как выглядит и работает интернет-магазин.</p>
        <ul class="concept__list">
          <li>Товары, цены и акции — демонстрационные.</li>
          <li>Корзина и оформление заказа работают только для примера: заказы никуда не отправляются.</li>
          <li>Контакты, реквизиты и юридические документы вымышлены.</li>
        </ul>
        <p class="modal__text concept__cta">Понравился именно этот дизайн? Мы можем адаптировать его под вашу нишу и задачи.</p>
        <div class="concept__actions">
          <button class="btn" type="button" data-close="concept">Смотреть концепт</button>
          ${CONCEPT_CONTACT ? `<a class="btn btn--ghost" href="${CONCEPT_CONTACT.href}" target="_blank" rel="noopener">${esc(CONCEPT_CONTACT.label)}</a>` : ''}
        </div>
        <p class="concept__en">Design concept by ${devLink}, made for a portfolio. Not a working store: products are demo content and no orders are processed. Like this design? We can adapt it to your niche.</p>
      </div>`;
    document.body.append(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLayer('concept'); });
    layers.concept = { overlay, panel: null };

    let seen = false;
    try { seen = sessionStorage.getItem('eurasia-concept-seen') === '1'; } catch (e) { /* ignore */ }
    if (!seen) {
      setTimeout(() => openLayer('concept'), 350);
      try { sessionStorage.setItem('eurasia-concept-seen', '1'); } catch (e) { /* ignore */ }
    }
  }

  let closeFilters = () => {};

  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-open]');
    if (open) { e.preventDefault(); openLayer(open.dataset.open); return; }
    const close = e.target.closest('[data-close]');
    if (close) closeLayer(close.dataset.close);

    const fav = e.target.closest('[data-fav-toggle]');
    if (fav) {
      e.preventDefault();
      const added = Fav.toggle(fav.dataset.favToggle);
      notify(added ? 'Saved to favorites' : 'Removed from favorites');
    }

    const add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      addToCart(add.dataset.add);
      add.classList.add('is-done');
      setTimeout(() => add.classList.remove('is-done'), 900);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    Object.keys(layers).forEach((k) => { if (layers[k].overlay.classList.contains('is-open')) closeLayer(k); });
    closeFilters();
  });

  function updateCounters() {
    const c = Cart.count();
    const f = Fav.ids().length;
    $$('[data-count="cart"]').forEach((b) => { b.textContent = c; b.hidden = !c; });
    $$('[data-count="fav"]').forEach((b) => { b.textContent = f; b.hidden = !f; });
    $$('[data-fav-toggle]').forEach((b) => {
      const on = Fav.has(b.dataset.favToggle);
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }
  document.addEventListener('store:change', updateCounters);
  addEventListener('storage', updateCounters);

  /* ---------------- Product card ---------------- */

  const imgTag = (src, alt, crop) => crop
    ? `<img class="is-crop" src="${src}" alt="${esc(alt)}" loading="lazy" style="--w:${crop[0]}%;--l:${crop[1]}%;--t:${crop[2]}%">`
    : `<img src="${src}" alt="${esc(alt)}" loading="lazy">`;

  const priceTag = (p, qty = 1, cls = '') => `
    <p class="price ${cls}">
      <span class="price__now">${money(p.price * qty)}</span>
      ${p.old ? `<s class="price__old">${money(p.old * qty)}</s>` : ''}
    </p>`;

  const favButton = (p, cls) => `
    <button class="${cls} fav-toggle" type="button" data-fav-toggle="${p.id}" aria-label="Save ${esc(p.name)} to favorites" aria-pressed="false">
      <img class="off" src="${ICON}heart-outline.svg" alt=""><img class="on" src="${ICON}heart-filled.svg" alt="">
    </button>`;

  function card(p) {
    const href = `product.html?id=${p.id}`;
    const badge = p.badge === 'new' ? '<span class="badge badge--new">New</span>'
      : p.old ? `<span class="badge badge--sale">−${Math.round((1 - p.price / p.old) * 100)}%</span>` : '';
    return `
      <article class="card">
        <a class="card__media" href="${href}" tabindex="-1" aria-hidden="true">${imgTag(p.img, p.name, p.crop)}${badge}</a>
        ${favButton(p, 'card__fav')}
        <div class="card__body">
          <p class="label">${brandLabel(p.brand)} · ${esc(p.volumes[0])}</p>
          <h3 class="card__title"><a href="${href}">${esc(cap(p.name))}</a></h3>
          <p class="card__sub">${esc(cap(p.sub))}</p>
        </div>
        <div class="card__foot">
          ${priceTag(p)}
          <button class="card__add" type="button" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart"><img src="${ICON}cart-white.svg" alt=""></button>
        </div>
      </article>`;
  }

  const pick = (ids) => ids.map((id) => D.product(id)).filter(Boolean);

  /* ---------------- Line items (cart / checkout) ---------------- */

  function lineItem(item, index, dark) {
    const p = D.product(item.id);
    const href = `product.html?id=${p.id}`;
    return `
      <article class="line ${dark ? 'line--dark' : ''}">
        <a class="line__img" href="${href}"><img src="${p.img}" alt="${esc(p.name)}"></a>
        <div class="line__info">
          <p class="label">${brandLabel(p.brand)} · ${esc(item.vol)}</p>
          <h3 class="line__title"><a href="${href}">${esc(cap(p.name))}</a></h3>
          <div class="qty">
            <button type="button" data-qty="${index}" data-delta="-1" aria-label="Decrease quantity" ${item.qty <= 1 ? 'disabled' : ''}><img src="${ICON}minus.svg" alt=""></button>
            <output aria-live="polite">${item.qty}</output>
            <button type="button" data-qty="${index}" data-delta="1" aria-label="Increase quantity"><img src="${ICON}add.svg" alt=""></button>
          </div>
        </div>
        <div class="line__side">
          ${priceTag(p, item.qty)}
          <div class="line__actions">
            ${dark ? '' : favButton(p, '')}
            <button type="button" data-remove="${index}" aria-label="Remove from cart"><img src="${ICON}trash.svg" alt=""></button>
            ${dark ? '' : `<label class="check check--center"><input type="checkbox" data-select="${index}" ${item.selected ? 'checked' : ''} aria-label="Include in order"><span class="check__box"></span></label>`}
          </div>
        </div>
      </article>`;
  }

  function bindLineControls(root) {
    root.addEventListener('click', (e) => {
      const q = e.target.closest('[data-qty]');
      if (q) {
        const i = +q.dataset.qty;
        const item = Cart.items()[i];
        if (item) Cart.setQty(i, item.qty + +q.dataset.delta);
      }
      const r = e.target.closest('[data-remove]');
      if (r) Cart.remove(+r.dataset.remove);
    });
    root.addEventListener('change', (e) => {
      if (e.target.dataset.select !== undefined) Cart.toggle(+e.target.dataset.select, e.target.checked);
    });
  }

  /* ---------------- Pages ---------------- */

  const pages = {};

  pages.home = function () {
    $('#new-grid').innerHTML = pick(['hydro-cream', 'retiplus', 'ferulast', 'night-cream']).map(card).join('');
    $('#offers-grid').innerHTML = pick(['derma-eye', 'retinol-serum', 'derma-mousse', 'facial-soap']).map(card).join('');

    $('#brand-tiles').innerHTML = D.brands.map((b) => `
      <a class="brand-tile ${b.dark ? 'brand-tile--dark' : ''}" href="brand.html?id=${b.id}" style="background:${b.color}">
        ${b.tile.crop
          ? `<img class="brand-tile__img is-crop" src="${b.tile.src}" alt="" loading="lazy" style="--w:${b.tile.crop[0]}%;--l:${b.tile.crop[1]}%;--t:${b.tile.crop[2]}%">`
          : `<img class="brand-tile__img" src="${b.tile.src}" alt="" loading="lazy">`}
        <span class="brand-tile__foot">
          <span class="brand-tile__name">${b.name}</span>
          <span class="link">Explore the brand</span>
        </span>
      </a>`).join('');

    $('#collections').innerHTML = D.collections.map((c) => `
      <a class="collection" href="catalog.html?collection=${c.id}">
        <img src="${c.img}" alt="" loading="lazy">
        <span class="collection__body">
          <span class="label" style="color:rgba(255,255,255,.75)">${plural(D.products.filter((p) => p.collection === c.id).length, 'product', 'products')}</span>
          <span class="collection__name">${c.name}</span>
          <span class="link">View collection</span>
        </span>
      </a>`).join('');

  };

  pages.catalog = function () {
    const grid = $('#catalog-grid');
    const form = $('#filters');
    const panel = $('.filters-panel');
    const q = (params.get('q') || '').trim().toLowerCase();
    const collection = params.get('collection');

    $('#f-brands').innerHTML = D.brands.map((b) => `
      <label class="check"><input type="checkbox" name="brand" value="${b.id}"><span class="check__box"></span>${brandLabel(b.id)}</label>`).join('');
    $('#f-cats').innerHTML = D.categories.map((c) => `
      <label class="check"><input type="checkbox" name="cat" value="${c.id}"><span class="check__box"></span>${c.name}</label>`).join('');

    ['cat', 'brand'].forEach((key) => {
      const input = params.get(key) && $(`input[name="${key}"][value="${params.get(key)}"]`, form);
      if (input) input.checked = true;
    });

    const c = collection && D.collections.find((x) => x.id === collection);
    if (c) { $('#catalog-title').textContent = c.name; $('#catalog-crumb').textContent = c.name; }
    else if (q) { $('#catalog-title').textContent = `Results for “${params.get('q')}”`; $('#catalog-crumb').textContent = 'Search'; }

    $$('.filters__head', form).forEach((h) => h.addEventListener('click', () => {
      const open = h.getAttribute('aria-expanded') !== 'true';
      h.setAttribute('aria-expanded', String(open));
      $('#' + h.getAttribute('aria-controls')).hidden = !open;
    }));

    function apply() {
      const brands = $$('input[name="brand"]:checked', form).map((i) => i.value);
      const cats = $$('input[name="cat"]:checked', form).map((i) => i.value);
      const min = parseFloat($('#price-min').value);
      const max = parseFloat($('#price-max').value);
      const sort = $('#sort').value;
      let list = D.products.filter((p) =>
        (!brands.length || brands.includes(p.brand)) &&
        (!cats.length || p.cats.some((x) => cats.includes(x))) &&
        (isNaN(min) || p.price >= min) &&
        (isNaN(max) || p.price <= max) &&
        (!collection || p.collection === collection) &&
        (!q || (p.name + ' ' + p.sub + ' ' + D.brandName(p.brand)).toLowerCase().includes(q)));
      if (sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
      if (sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      grid.innerHTML = list.length
        ? list.map(card).join('')
        : `<div class="empty catalog__empty"><p class="empty__title">No products match these filters</p><p>Remove a filter or reset them all to see more products.</p><button class="btn btn--ghost" type="button" data-reset>Reset filters</button></div>`;
      const count = plural(list.length, 'product', 'products');
      $('#catalog-count').textContent = count;
      $('#filters-apply').textContent = `Show ${count}`;
      updateCounters();
    }

    const reset = () => { form.reset(); apply(); };
    form.addEventListener('change', apply);
    form.addEventListener('input', (e) => { if (e.target.type === 'number') apply(); });
    form.addEventListener('submit', (e) => { e.preventDefault(); apply(); closeFilters(); });
    $('#filters-clear').addEventListener('click', reset);
    grid.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) reset(); });
    $('#sort').addEventListener('change', apply);

    const backdrop = document.createElement('div');
    backdrop.className = 'overlay';
    document.body.append(backdrop);
    closeFilters = () => { panel.classList.remove('is-open'); backdrop.classList.remove('is-open'); document.body.classList.remove('is-locked'); };
    $('#filters-open').addEventListener('click', () => { panel.classList.add('is-open'); backdrop.classList.add('is-open'); document.body.classList.add('is-locked'); });
    $('#filters-x').addEventListener('click', closeFilters);
    backdrop.addEventListener('click', closeFilters);

    apply();
  };

  pages.product = function () {
    const p = D.product(params.get('id')) || D.product('sensitive-cleanser');
    document.title = `${cap(p.name)} — EURASIA`;
    const brand = D.brand(p.brand);
    const details = [];
    if (p.action) details.push(['Action', p.action]);
    if (p.ingredients) details.push(['Active ingredients', p.ingredients]);

    $('#product').innerHTML = `
      <div class="product__media">${imgTag(p.img, p.name, p.crop)}</div>
      <div class="product__info">
        ${brand ? `<a class="label product__brand" href="brand.html?id=${brand.id}">${brandLabel(p.brand)}</a>` : `<p class="label product__brand">${brandLabel(p.brand)}</p>`}
        <h1 class="h1 product__title">${esc(cap(p.name))}</h1>
        <p class="product__lead">${esc(cap(p.sub))}</p>
        ${priceTag(p, 1, 'price--lg')}
        <fieldset class="product__option" style="border:0;padding:0;margin-inline:0">
          <legend class="label">Volume</legend>
          <div class="chips">
            ${p.volumes.map((v, i) => `<label class="chip"><input type="radio" name="volume" value="${esc(v)}" ${i ? '' : 'checked'}><span>${esc(v)}</span></label>`).join('')}
          </div>
        </fieldset>
        <div class="product__buy">
          <div class="qty qty--lg">
            <button type="button" data-step="-1" aria-label="Decrease quantity" disabled><img src="${ICON}minus.svg" alt=""></button>
            <output id="buy-qty" aria-live="polite">1</output>
            <button type="button" data-step="1" aria-label="Increase quantity"><img src="${ICON}add.svg" alt=""></button>
          </div>
          <button class="btn" type="button" id="add-to-cart">Add to cart</button>
          ${favButton(p, 'product__fav')}
        </div>
        <ul class="product__facts">
          <li><span>SKU</span><span class="label" style="color:inherit">${p.sku}</span></li>
          <li><span>Courier delivery</span><span>Within 2 business days</span></li>
          <li><span>Payment</span><span>On delivery or online by card</span></li>
        </ul>
        ${details.length ? `
        <div class="product__details">
          ${details.map(([title, text], i) => `
            <details class="details" ${i === 0 ? 'open' : ''}>
              <summary>${title}<img src="${ICON}caret-menu.svg" alt=""></summary>
              <p>${esc(text)}</p>
            </details>`).join('')}
        </div>` : ''}
      </div>`;

    let qty = 1;
    const out = $('#buy-qty');
    const minusBtn = $('[data-step="-1"]');
    $$('[data-step]').forEach((b) => b.addEventListener('click', () => {
      qty = Math.max(1, qty + +b.dataset.step);
      out.textContent = qty;
      minusBtn.disabled = qty <= 1;
    }));
    $('#add-to-cart').addEventListener('click', () => {
      addToCart(p.id, $('input[name="volume"]:checked').value, qty);
    });

    $('[data-back]').addEventListener('click', (e) => {
      if (document.referrer && new URL(document.referrer).origin === location.origin) { e.preventDefault(); history.back(); }
    });

    const related = D.products.filter((x) => x.id !== p.id && x.cats.some((c) => p.cats.includes(c)));
    const fallback = pick(['bust-gel', 'arnicor', 'hot-cold', 'body-lotion']).filter((x) => x.id !== p.id && !related.includes(x));
    $('#related-grid').innerHTML = related.concat(fallback).slice(0, 4).map(card).join('');
  };

  pages.brand = function () {
    const b = D.brand(params.get('id')) || D.brands[0];
    document.title = `${b.name} — EURASIA`;
    $('#brand-title').textContent = b.name;
    $('#brand-crumb').textContent = b.name;
    const g = b.gallery;
    $('#brand-gallery').innerHTML = [
      `<div style="background:${b.color}"><img src="${g[0]}" alt=""></div>`,
      g[1] ? `<div style="background:${b.color}"><img class="is-crop" src="${g[1]}" alt="" style="--w:317%;--l:-132%;--t:-89%"></div>` : '',
      g[2] ? `<div><img src="${g[2]}" alt=""></div>` : ''
    ].join('');
    $('#brand-text').innerHTML = b.text.map((t) => `<p>${esc(t)}</p>`).join('');
    const list = D.products.filter((p) => p.brand === b.id);
    $('#brand-count').textContent = list.length ? plural(list.length, 'product', 'products') : 'Recommended';
    $('#brand-grid').innerHTML = (list.length ? list.slice(0, 8) : pick(['bust-gel', 'arnicor', 'hot-cold', 'body-lotion'])).map(card).join('');
    $('#brand-all').href = `catalog.html?brand=${b.id}`;
  };

  pages.brands = function () {
    const root = $('#strips');
    root.innerHTML = D.brands.map((b, i) => `
      <div class="strip ${i === 0 ? 'is-open' : ''} ${b.dark ? 'strip--dark' : ''}" style="background:${b.color}">
        <div class="strip__bg"><img src="${b.strip.src}" alt="" style="--w:${b.strip.crop[0]}%;--l:${b.strip.crop[1]}%;--t:${b.strip.crop[2]}%;opacity:${b.strip.opacity}"></div>
        <button class="strip__head" type="button" aria-expanded="${i === 0}">
          <span class="strip__name">${b.name}</span>
          <span class="strip__icon"><img src="${ICON}${b.dark ? 'plus-dark' : 'plus-w2'}.svg" alt=""></span>
        </button>
        <div class="strip__foot"><a class="btn btn--white" href="brand.html?id=${b.id}">Explore ${b.name}</a></div>
      </div>`).join('');
    $$('.strip__head', root).forEach((h) => h.addEventListener('click', () => {
      const strip = h.parentElement;
      const wasOpen = strip.classList.contains('is-open');
      $$('.strip', root).forEach((s) => { s.classList.remove('is-open'); $('.strip__head', s).setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { strip.classList.add('is-open'); h.setAttribute('aria-expanded', 'true'); }
    }));
  };

  pages.cart = function () {
    const listEl = $('#cart-list');
    const layout = $('#cart-layout');
    const emptyEl = $('#cart-empty');
    let promo = 0;

    function render() {
      const items = Cart.items();
      layout.hidden = !items.length;
      emptyEl.hidden = !!items.length;
      $('#cart-count').textContent = plural(Cart.count(), 'item', 'items');
      if (!items.length) return;
      $('#select-all').checked = items.every((i) => i.selected);
      listEl.innerHTML = items.map((it, i) => lineItem(it, i)).join('');
      const t = Cart.totals();
      const rewards = Math.min(promo, t.total);
      $('#sum-pcs').textContent = `Items (${t.pcs})`;
      $('#sum-items').textContent = money(t.items);
      $('#sum-discount').textContent = minus(t.discount);
      $('#sum-rewards').textContent = minus(rewards);
      $('#sum-total').textContent = money(t.total - rewards);
      $('#to-checkout').toggleAttribute('disabled', !t.pcs);
      updateCounters();
    }

    bindLineControls(listEl);
    $('#select-all').addEventListener('change', (e) => Cart.selectAll(e.target.checked));
    $('#promo-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = $('#promo').value.trim().toUpperCase();
      const msg = $('#promo-msg');
      if (code === 'EURASIA') { promo = 10; msg.textContent = 'Promo code applied: $10 off.'; }
      else { promo = 0; msg.textContent = code ? 'This promo code doesn’t exist. Check the spelling and try again.' : ''; }
      try { sessionStorage.setItem('evrazia-promo', String(promo)); } catch (err) { /* ignore */ }
      render();
    });
    $('#to-checkout').addEventListener('click', () => { location.href = 'checkout.html'; });
    document.addEventListener('store:change', render);

    $('#recs-grid').innerHTML = pick(['intimate-soap', 'aloe-soap', 'silica-scrub', 'body-glycolic']).map(card).join('');
    render();
  };

  pages.checkout = function () {
    const listEl = $('#order-items');
    const form = $('#checkout-form');
    let promo = 0;
    try { promo = parseFloat(sessionStorage.getItem('evrazia-promo')) || 0; } catch (e) { /* ignore */ }

    const deliveryFee = () => (($('input[name="delivery"]:checked', form) || {}).value === 'courier' ? 6 : 0);

    function render() {
      const items = Cart.items().map((it, i) => ({ it, i })).filter((x) => x.it.selected);
      listEl.innerHTML = items.length
        ? items.map((x) => lineItem(x.it, x.i, true)).join('')
        : '<p class="order__empty">Your order is empty. <a class="text-link" href="catalog.html">Browse catalog</a></p>';
      const t = Cart.totals();
      const fee = t.pcs ? deliveryFee() : 0;
      const off = Math.min(promo, t.total);
      $('#o-pcs').textContent = `Items (${t.pcs})`;
      $('#o-items').textContent = money(t.items);
      $('#o-discount').textContent = minus(t.discount + off);
      $('#o-delivery').textContent = fee ? money(fee) : 'Free';
      $('#o-total').textContent = money(t.total - off + fee);
    }

    bindLineControls(listEl);
    document.addEventListener('store:change', render);

    form.addEventListener('change', (e) => {
      if (e.target.name === 'delivery') render();
      const field = e.target.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });
    form.addEventListener('input', (e) => {
      const field = e.target.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const err = $('#form-error');
      let ok = true;
      $$('.field', form).forEach((f) => {
        const input = $('input', f);
        const valid = input.checkValidity() && (!input.required || input.value.trim()) && (input.type !== 'tel' || input.value.replace(/\D/g, '').length >= 10);
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) { err.textContent = 'Fill in the highlighted fields to continue.'; $('.field.is-invalid input', form).focus(); return; }
      if (!$('input[name="delivery"]:checked', form)) { err.textContent = 'Choose a delivery method.'; return; }
      if (!$('input[name="payment"]:checked', form)) { err.textContent = 'Choose a payment method.'; return; }
      if (!$('#consent').checked) { err.textContent = 'Confirm consent to the processing of personal data.'; return; }
      if (!Cart.totals().pcs) { err.textContent = 'Your order is empty. Add products to place an order.'; return; }
      err.textContent = '';
      Cart.clearSelected();
      try { sessionStorage.removeItem('evrazia-promo'); } catch (er) { /* ignore */ }
      form.reset();
      render();
      openLayer('thanks');
    });

    render();
  };

  /* ---------------- Newsletter ---------------- */

  function bindSubscribe() {
    const holder = $('#subscribe');
    if (!holder) return;
    holder.className = 'container subscribe';
    holder.innerHTML = `
      <div class="subscribe__panel">
        <div>
          <h2 class="h2">New arrivals and offers, first</h2>
          <p class="subscribe__lead">Subscribe to our newsletter and we’ll keep you posted on new arrivals and special offers.</p>
        </div>
        <form id="subscribe-form" novalidate>
          <div class="subscribe__row">
            <input type="email" name="email" placeholder="Your email" aria-label="Email" required autocomplete="email">
            <button class="btn" type="submit">Subscribe</button>
          </div>
          <label class="check subscribe__consent">
            <input type="checkbox" name="consent"><span class="check__box"></span>
            I confirm that I have read and consent to the processing of my personal data in accordance with the Privacy Policy.
          </label>
          <p class="subscribe__msg" id="subscribe-msg" aria-live="polite"></p>
        </form>
      </div>`;
    const f = $('#subscribe-form');
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('input[type="email"]', f);
      const consent = $('input[type="checkbox"]', f);
      const msg = $('#subscribe-msg');
      msg.classList.add('is-error');
      if (!email.value || !email.checkValidity()) { msg.textContent = 'Enter a valid email address, like name@example.com.'; email.focus(); return; }
      if (!consent.checked) { msg.textContent = 'Confirm consent to the processing of personal data.'; return; }
      msg.classList.remove('is-error');
      msg.textContent = 'You’re subscribed. Watch your inbox for new arrivals.';
      f.reset();
    });
  }

  /* ---------------- Init ---------------- */

  renderHeader();
  renderFooter();
  mountMenu();
  mountFavorites();
  mountThanks();
  document.body.append(toast);
  mountConcept();
  if (pages[page]) pages[page]();
  bindSubscribe();
  updateCounters();

  if (params.get('open') && layers[params.get('open')]) openLayer(params.get('open'));
})();
