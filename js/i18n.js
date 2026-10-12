/* ==========================================================================
   i18n — Русский / English

   Английский текст лежит прямо в HTML и JS (он же — ключ). Здесь только
   русские переводы: RU['English source'] = 'Русский перевод'.
   Если ключа нет, показывается исходная строка.

   Язык выбирается так: ?lang=ru|en в адресе → сохранённый выбор → язык браузера.
   Переключатель RU/EN (плашка вверху, подвал, меню) сохраняет выбор и
   перезагружает страницу на том же месте.
   ========================================================================== */
(function () {
  'use strict';

  const KEY = 'eurasia-lang';
  const params = new URLSearchParams(location.search);

  function detect() {
    const fromUrl = params.get('lang');
    if (fromUrl === 'ru' || fromUrl === 'en') {
      try { localStorage.setItem(KEY, fromUrl); } catch (e) { /* storage unavailable */ }
      return fromUrl;
    }
    try {
      const saved = localStorage.getItem(KEY) || localStorage.getItem('eurasia-concept-lang');
      if (saved === 'ru' || saved === 'en') return saved;
    } catch (e) { /* storage unavailable */ }
    return (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
  }

  const lang = detect();
  document.documentElement.lang = lang;

  /* ---------------- Русский словарь ---------------- */

  const RU = {
    /* --- мета и заголовки страниц --- */
    'EURASIA — Professional cosmetics store': 'EURASIA — магазин профессиональной косметики',
    'EURASIA — exclusive distributor of professional European cosmetics brands in Russia since 2002.': 'EURASIA — эксклюзивный дистрибьютор европейских брендов профессиональной косметики в России с 2002 года.',
    'Catalog — EURASIA': 'Каталог — EURASIA',
    'Professional cosmetics catalog: SkinClinic, Montibello, Tallassoria, Derma 2.0.': 'Каталог профессиональной косметики: SkinClinic, Montibello, Tallassoria, Derma 2.0.',
    'Product — EURASIA': 'Товар — EURASIA',
    'Professional cosmetics by EURASIA.': 'Профессиональная косметика EURASIA.',
    'Brand — EURASIA': 'Бренд — EURASIA',
    'Professional cosmetics brands at EURASIA.': 'Бренды профессиональной косметики в EURASIA.',
    'Professional cosmetics brands — EURASIA': 'Бренды профессиональной косметики — EURASIA',
    'SkinClinic, Montibello, Tallassoria, Derma 2.0 — exclusive distribution in Russia.': 'SkinClinic, Montibello, Tallassoria, Derma 2.0 — эксклюзивная дистрибуция в России.',
    'Cart — EURASIA': 'Корзина — EURASIA',
    'Your cart at EURASIA.': 'Ваша корзина в EURASIA.',
    'Checkout — EURASIA': 'Оформление заказа — EURASIA',
    'Checkout at EURASIA.': 'Оформление заказа в EURASIA.',

    /* --- общее --- */
    'Home': 'Главная',
    'Breadcrumbs': 'Навигационная цепочка',
    'Catalog': 'Каталог',
    'Brands': 'Бренды',
    'Brand': 'Бренд',
    'Offers': 'Акции',
    'About': 'О нас',
    'About us': 'О нас',
    'Contacts': 'Контакты',
    'Cart': 'Корзина',
    'Favorites': 'Избранное',
    'Search': 'Поиск',
    'Search products': 'Поиск товаров',
    'Search the catalog': 'Поиск по каталогу',
    'Main': 'Главное меню',
    'Menu': 'Меню',
    'Open menu': 'Открыть меню',
    'Close': 'Закрыть',
    'Close menu': 'Закрыть меню',
    'Footer': 'Подвал сайта',
    'EURASIA — home': 'EURASIA — на главную',
    'View catalog': 'Весь каталог',
    'Browse catalog': 'Перейти в каталог',
    'View cart': 'Открыть корзину',
    'Add to cart': 'В корзину',
    'Price': 'Цена',
    'Items': 'Товары',
    'Items ({n})': 'Товары ({n})',
    'Discount': 'Скидка',
    'Total': 'Итого',
    'Delivery': 'Доставка',
    'Free': 'Бесплатно',
    'Optional': 'Необязательно',
    'Volume': 'Объём',
    'New': 'Новинка',
    'Newsletter': 'Рассылка',
    'Language': 'Язык',

    /* --- главная --- */
    'Woman applying a serum with a dropper': 'Девушка наносит сыворотку пипеткой',
    'Professional cosmetics store · Since 2002': 'Магазин профессиональной косметики · С 2002 года',
    'Clinical-grade skincare from SkinClinic, Montibello, Tallassoria and Derma 2.0 — the formulas dermatologists use, delivered to your door.': 'Профессиональный уход от SkinClinic, Montibello, Tallassoria и Derma 2.0: формулы, которые используют дерматологи, с доставкой до двери.',
    'Shop the catalog': 'В каталог',
    'Our brands': 'Наши бренды',
    'Ferulast serum photoaging': 'Ferulast Serum Photoaging',
    'Bestseller · SkinClinic': 'Бестселлер · SkinClinic',
    'Add Ferulast serum to cart': 'Добавить сыворотку Ferulast в корзину',
    'Just in': 'Новое в каталоге',
    'New arrivals': 'Новинки',
    'Exclusive in Russia': 'Эксклюзивно в России',
    'All brands': 'Все бренды',
    'Since 2002, EURASIA has been the exclusive distributor of professional European and American cosmetics brands in Russia, including SkinClinic, Tallassoria, and Montibello—with more to come.': 'С 2002 года EURASIA — эксклюзивный дистрибьютор в России профессиональных европейских и американских косметических брендов, среди которых SkinClinic, Tallassoria и Montibello. И это не предел.',
    'Learn more': 'Подробнее',
    'Working with professionals since': 'Работаем с профессионалами с',
    '4 brands': '4 бренда',
    'In our catalog today': 'Сейчас в каталоге',
    'Exclusive': 'Эксклюзив',
    'Distributor in Russia': 'Дистрибьютор в России',
    'Woman applying SkinClinic cream': 'Девушка наносит крем SkinClinic',
    'Limited time': 'Только сейчас',
    'Care by concern': 'Уход под задачу кожи',
    'Collections': 'Коллекции',
    'Explore the brand': 'Перейти к бренду',
    'View collection': 'Смотреть коллекцию',

    /* --- шапка, подвал, меню --- */
    '33 Kuznetsova St., Office 129': 'ул. Кузнецова, 33, офис 129',
    'St Petersburg': 'Санкт-Петербург',
    'Shop': 'Магазин',
    'Delivery & payment': 'Доставка и оплата',
    'Partnerships': 'Сотрудничество',
    'Follow us': 'Мы в соцсетях',
    '*Meta is prohibited in the Russian Federation': '*Meta запрещена на территории Российской Федерации',
    'Privacy Policy': 'Политика конфиденциальности',
    'Consent to Data Processing': 'Согласие на обработку данных',
    'Public Offer Agreement': 'Публичная оферта',
    'All products': 'Все товары',
    'For professionals': 'Для профессионалов',

    /* --- избранное, корзина, уведомления --- */
    'Close favorites': 'Закрыть избранное',
    'Remove from favorites': 'Убрать из избранного',
    'No favorites yet': 'В избранном пока пусто',
    'Tap the heart on any product to save it here.': 'Нажмите на сердечко у любого товара, чтобы сохранить его здесь.',
    'Add all to cart': 'Добавить всё в корзину',
    'Saved to favorites': 'Добавлено в избранное',
    'Removed from favorites': 'Убрано из избранного',
    '{name} added to cart': 'Добавлено в корзину: {name}',
    '{items} added to cart': 'Добавлено в корзину: {items}',
    'Save {name} to favorites': 'Добавить в избранное: {name}',
    'Add {name} to cart': 'Добавить в корзину: {name}',
    'Decrease quantity': 'Уменьшить количество',
    'Increase quantity': 'Увеличить количество',
    'Remove from cart': 'Удалить из корзины',
    'Include in order': 'Включить в заказ',
    'Thank you!': 'Спасибо!',
    'Your order has been placed. Our specialist will contact you within 15 minutes to arrange delivery.': 'Ваш заказ оформлен. Наш специалист свяжется с вами в течение 15 минут, чтобы согласовать доставку.',

    /* --- каталог --- */
    'Filters': 'Фильтры',
    'Close filters': 'Закрыть фильтры',
    'Sort by': 'Сортировка',
    'Featured': 'Рекомендуемые',
    'Price: low to high': 'Сначала дешевле',
    'Price: high to low': 'Сначала дороже',
    'Name: A–Z': 'По названию: А–Я',
    'Category': 'Категория',
    'From $': 'От, ₽',
    'To $': 'До, ₽',
    'Price from': 'Цена от',
    'Price to': 'Цена до',
    'Reset filters': 'Сбросить фильтры',
    'Show products': 'Показать товары',
    'Show {count}': 'Показать: {count}',
    'Results for “{q}”': 'Результаты по запросу «{q}»',
    'No products match these filters': 'Нет товаров по этим фильтрам',
    'Remove a filter or reset them all to see more products.': 'Уберите один из фильтров или сбросьте все, чтобы увидеть больше товаров.',

    /* --- товар, бренд --- */
    'Back to catalog': 'Назад в каталог',
    'You may also like': 'Вам может понравиться',
    'SKU': 'Артикул',
    'Courier delivery': 'Курьерская доставка',
    'Within 2 business days': 'В течение 2 рабочих дней',
    'Payment': 'Оплата',
    'On delivery or online by card': 'При получении или картой онлайн',
    'Action': 'Действие',
    'Active ingredients': 'Активные компоненты',
    'Brand products': 'Товары бренда',
    'View all in catalog': 'Все товары в каталоге',
    'Recommended': 'Рекомендуем',

    /* --- страница брендов --- */
    'Professional cosmetics brands': 'Бренды профессиональной косметики',
    'Since 2002, EURASIA has been the exclusive distributor in Russia of professional cosmetics brands from Europe, Korea, and Russia, including SkinClinic, Montibello, Dejuvent, Derma 2.0, LABELIST, and Beraderm—with more to come.': 'С 2002 года EURASIA — эксклюзивный дистрибьютор в России брендов профессиональной косметики из Европы, Кореи и России, среди которых SkinClinic, Montibello, Dejuvent, Derma 2.0, LABELIST и Beraderm. И это не предел.',
    'We continue to grow and seek out new exclusive products for you.': 'Мы продолжаем расти и ищем для вас новые эксклюзивные продукты.',
    'Explore {name}': 'Перейти к {name}',

    /* --- корзина --- */
    'Your cart is empty': 'Корзина пуста',
    'Add products from the catalog and they’ll appear here.': 'Добавляйте товары из каталога — они появятся здесь.',
    'Select all': 'Выбрать все',
    'Order summary': 'Сумма заказа',
    'Promo code': 'Промокод',
    'Enter code': 'Введите код',
    'Apply promo code': 'Применить промокод',
    'Go to checkout': 'Перейти к оформлению',
    'Promo code applied: {amount} off.': 'Промокод применён: скидка {amount}.',
    'This promo code doesn’t exist. Check the spelling and try again.': 'Такого промокода нет. Проверьте написание и попробуйте ещё раз.',

    /* --- оформление заказа --- */
    'Checkout': 'Оформление заказа',
    'Personal information': 'Личные данные',
    'First name *': 'Имя *',
    'Last name *': 'Фамилия *',
    'Middle name': 'Отчество',
    'Phone *': 'Телефон *',
    'Email *': 'Электронная почта *',
    'Anna': 'Анна',
    'Ivanova': 'Иванова',
    'Delivery address': 'Адрес доставки',
    'City or town *': 'Город *',
    'Street *': 'Улица *',
    'Building *': 'Дом *',
    'Apartment': 'Квартира',
    'Kuznetsova St.': 'ул. Кузнецова',
    'Delivery method': 'Способ доставки',
    'Delivery fee — $6. Within 2 business days, up to 100 items per order.': 'Стоимость доставки — 490 ₽. Доставка в течение 2 рабочих дней, до 100 товаров в заказе.',
    'Pickup': 'Самовывоз',
    '33 Kuznetsova St., Office 129, St Petersburg': 'ул. Кузнецова, 33, офис 129, Санкт-Петербург',
    'Russian Post delivery': 'Почта России',
    'CDEK delivery': 'СДЭК',
    'Payment method': 'Способ оплаты',
    'Online card payment': 'Оплата картой онлайн',
    'Faster Payments System': 'Система быстрых платежей',
    'Payment on delivery': 'Оплата при получении',
    'I confirm that I have read and consent to the processing of my personal data in accordance with the Privacy Policy.': 'Я ознакомлен(а) с Политикой конфиденциальности и даю согласие на обработку персональных данных.',
    'Place order': 'Оформить заказ',
    'Your order': 'Ваш заказ',
    'Your order is empty.': 'Ваш заказ пуст.',
    'Fill in the highlighted fields to continue.': 'Заполните выделенные поля, чтобы продолжить.',
    'Choose a delivery method.': 'Выберите способ доставки.',
    'Choose a payment method.': 'Выберите способ оплаты.',
    'Confirm consent to the processing of personal data.': 'Подтвердите согласие на обработку персональных данных.',
    'Your order is empty. Add products to place an order.': 'Ваш заказ пуст. Добавьте товары, чтобы оформить заказ.',

    /* --- подписка --- */
    'New arrivals and offers, first': 'Новинки и акции — первыми',
    'Subscribe to our newsletter and we’ll keep you posted on new arrivals and special offers.': 'Подпишитесь на рассылку — мы сообщим о новинках и специальных предложениях.',
    'Your email': 'Ваш e-mail',
    'Email': 'Электронная почта',
    'Subscribe': 'Подписаться',
    'Enter a valid email address, like name@example.com.': 'Введите корректный адрес почты, например name@example.com.',
    'You’re subscribed. Watch your inbox for new arrivals.': 'Вы подписались. Ждите письма о новинках.'
  };

  /* Формы множественного числа: [1 товар, 2 товара, 5 товаров] */
  const PLURALS = {
    item: ['товар', 'товара', 'товаров'],
    product: ['товар', 'товара', 'товаров']
  };

  /* ---------------- Помощники ---------------- */

  const isRu = lang === 'ru';

  function t(key, vars) {
    let s = isRu && RU[key] !== undefined ? RU[key] : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }

  function ruForm(n, forms) {
    const a = Math.abs(n) % 100;
    const b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
  }

  function tn(n, one, many) {
    if (isRu && PLURALS[one]) return `${n} ${ruForm(n, PLURALS[one])}`;
    return `${n} ${n === 1 ? one : many}`;
  }

  /* 3290 → «3 290 ₽» (неразрывные пробелы), $79 для английской версии */
  function money(n) {
    const v = Math.round(n);
    if (!isRu) return '$' + v;
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  /* '150 ml' → '150 мл' (в корзине хранится исходное значение) */
  const unit = (v) => (isRu ? String(v).replace(/\bml\b/i, 'мл') : String(v));

  /* Суммы, которые зависят от валюты */
  const settings = isRu ? { deliveryFee: 490, promo: 500 } : { deliveryFee: 6, promo: 10 };

  /* ---------------- Перевод статической разметки ---------------- */

  function translateStatic(root) {
    if (!isRu) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const raw = n.nodeValue;
      const tr = RU[raw.replace(/\s+/g, ' ').trim()];
      if (tr !== undefined) n.nodeValue = raw.match(/^\s*/)[0] + tr + raw.match(/\s*$/)[0];
    });
    root.querySelectorAll('[placeholder],[alt],[aria-label],[title]').forEach((el) => {
      ['placeholder', 'alt', 'aria-label', 'title'].forEach((a) => {
        const v = el.getAttribute(a);
        if (v && RU[v] !== undefined) el.setAttribute(a, RU[v]);
      });
    });
  }

  if (isRu) {
    if (RU[document.title]) document.title = RU[document.title];
    const desc = document.querySelector('meta[name="description"]');
    if (desc && RU[desc.content]) desc.content = RU[desc.content];
    translateStatic(document.body);
  }

  /* ---------------- Переключение языка ---------------- */

  function setLang(code) {
    if (code !== 'ru' && code !== 'en') return;
    if (code === lang) return;
    try {
      localStorage.setItem(KEY, code);
      sessionStorage.setItem('eurasia-scroll', String(Math.round(window.scrollY)));
    } catch (e) { /* storage unavailable */ }
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) url.searchParams.set('lang', code);
    if (url.href === location.href) location.reload();
    else location.replace(url.href);
  }

  window.I18N = { lang, isRu, t, tn, money, unit, settings, setLang, translateStatic };
})();
