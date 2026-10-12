/* Каталог EURASIA: бренды, категории, коллекции и товары.
   crop — позиционирование исходного изображения внутри карточки, как в макете:
   [ширина %, смещение слева %, смещение сверху %]. */
window.EURASIA_DATA = (function () {
  const I = window.I18N;
  const brands = [
    {
      id: 'skinclinic',
      name: 'SkinClinic',
      color: '#b6c4b6',
      dark: true,
      tile: { src: 'assets/img/brand-skinclinic.webp', crop: [196.58, -32.79, -148.68] },
      strip: { src: 'assets/img/brand-skinclinic.webp', crop: [136.61, -4.87, -179.51], opacity: 1 },
      text: [
        'The Spanish cosmetics brand SKIN CLINIC was founded more than 20 years ago by chemist and pharmacist Cayetano Solano Gutiérrez.',
        'Working closely with leading biochemists, pharmacists, dermatologists, and other medical specialists, SKIN CLINIC developed highly effective formulas and protocols for dermatological and aesthetic concerns, helping preserve the youth, health, and beauty of facial and body skin.',
        'A new laboratory opened in New Carmado, Spain, in July 2009. SKIN CLINIC was created specifically for dermatology clinics and medical centers, with therapeutic concentrations of active ingredients designed to address dermatological and aesthetic skin concerns.',
        'Advanced technology and state-of-the-art equipment enable SkinClinic to produce innovative, safe, and effective formulas that meet modern standards.'
      ],
      gallery: ['assets/img/about.jpg', 'assets/img/brand-skinclinic.webp', 'assets/img/brand-skinclinic-3.jpg']
    },
    {
      id: 'montibello',
      name: 'Montibello',
      color: '#424532',
      tile: { src: 'assets/img/brand-montibello.webp' },
      strip: { src: 'assets/img/brands-montibello.webp', crop: [79.68, 15.49, -86.49], opacity: 0.2 },
      text: ['Montibello professional products are available at EURASIA — the exclusive distributor of the brand in Russia.'],
      gallery: ['assets/img/brands-montibello.webp']
    },
    {
      id: 'tallassoria',
      name: 'Tallassoria',
      color: '#eef0e5',
      dark: true,
      tile: { src: 'assets/img/brand-tallassoria.webp' },
      strip: { src: 'assets/img/brands-tallassoria.webp', crop: [79.06, 19.48, -38.84], opacity: 0.3 },
      text: ['Tallassoria professional products are available at EURASIA — the exclusive distributor of the brand in Russia.'],
      gallery: ['assets/img/brands-tallassoria.webp']
    },
    {
      id: 'derma',
      name: 'Derma 2.0',
      color: '#919390',
      tile: { src: 'assets/img/brand-derma.webp' },
      strip: { src: 'assets/img/brands-derma.webp', crop: [80.56, 14.95, 0.03], opacity: 1 },
      text: ['Derma 2.0 professional products are available at EURASIA — the exclusive distributor of the brand in Russia.'],
      gallery: ['assets/img/brands-derma.webp']
    }
  ];

  const categories = [
    { id: 'cleansing', name: 'Cleansing & toning' },
    { id: 'daily', name: 'Daily care' },
    { id: 'repair', name: 'Skin repair, regeneration & protection' },
    { id: 'retinization', name: 'Retinization' },
    { id: 'brightening', name: 'Brightening treatments' },
    { id: 'active', name: 'Active complexes' },
    { id: 'eyes', name: 'Creams for eyes, lips, neck & décolleté' },
    { id: 'masks', name: 'Masks' },
    { id: 'sun', name: 'Sun protection' },
    { id: 'body', name: 'Body care' },
    { id: 'hair', name: 'Hair care' }
  ];

  const collections = [
    { id: 'restorative', name: 'Restorative care', img: 'assets/img/col-restorative.jpg' },
    { id: 'antiaging', name: 'Anti-aging care', img: 'assets/img/col-antiaging.jpg' },
    { id: 'cleansing', name: 'Cleansing care', img: 'assets/img/col-cleansing.jpg' }
  ];

  const p = (o) => Object.assign({ brand: 'skinclinic', volumes: ['250 ml'], cats: [], old: null, badge: null, crop: null }, o);

  const products = [
    // Каталог
    p({ id: 'intimate-soap', name: 'Intimate soap', sub: 'liquid chamomile soap (intimate care)', price: 22, img: 'assets/img/c-intimate-soap.jpg', crop: [158.93, -29.15, -27.54], cats: ['cleansing', 'body'], collection: 'cleansing' }),
    p({ id: 'aloe-soap', name: 'Creamy aloe vera-oat soap', sub: 'moisturizing cream soap for sensitive skin', price: 65, img: 'assets/img/c-aloe-soap.jpg', cats: ['cleansing', 'daily'], collection: 'cleansing' }),
    p({ id: 'silica-scrub', name: 'Silica gel scrub', sub: 'cleansing gel scrub', price: 60, img: 'assets/img/c-silica-scrub.jpg', crop: [139.21, -19.46, -14.21], volumes: ['200 ml'], cats: ['cleansing'], collection: 'cleansing' }),
    p({ id: 'body-lotion', name: 'Body lotion', sub: 'moisturizing body lotion', price: 49, img: 'assets/img/c-body-lotion.jpg', crop: [121.92, -10.96, -9.79], cats: ['body', 'daily'] }),
    p({ id: 'firming-cream', name: 'Firming cream', sub: 'firming body cream', price: 32, img: 'assets/img/c-firming-cream.jpg', crop: [146.39, -23.15, -14.33], volumes: ['200 ml'], cats: ['body'] }),
    p({ id: 'body-glycolic', name: 'Body glycolic cream', sub: 'glycolic body cream', price: 32, img: 'assets/img/c-firming-cream.jpg', crop: [146.39, -23.15, -14.33], volumes: ['200 ml'], cats: ['body', 'brightening'] }),
    p({ id: 'bust-gel', name: 'Bust firming gel', sub: 'firming gel for the bust area', price: 45, img: 'assets/img/c-bust-gel.jpg', crop: [120, -10, -5.31], volumes: ['200 ml'], cats: ['body'] }),
    p({ id: 'arnicor', name: 'Arnicor', sub: 'arnicor body massage cream', price: 30, img: 'assets/img/c-arnicor.jpg', crop: [142.36, -21.18, -15.55], volumes: ['200 ml'], cats: ['body'] }),
    p({ id: 'hot-cold', name: 'Hot & cold massage cream', sub: 'warming/cooling massage cream', price: 28, img: 'assets/img/c-hot-cold.jpg', volumes: ['500 ml'], cats: ['body'] }),
    p({ id: 'tired-legs', name: 'Tired legs gel', sub: 'gel for tired legs', price: 20, img: 'assets/img/c-tired-legs.jpg', crop: [145.73, -22.76, -17.16], volumes: ['200 ml'], cats: ['body'] }),
    p({ id: 'activ-plus', name: 'Activ-plus stretch marks', sub: 'active plus stretch mark cream', price: 55, img: 'assets/img/c-tired-legs.jpg', crop: [145.73, -22.76, -17.16], volumes: ['200 ml'], cats: ['body', 'repair'], collection: 'restorative' }),

    // Новинки
    p({ id: 'hydro-cream', name: 'Hydro-nourishing facial cream SPF 30', sub: 'hydrating nourishing face cream spf 30', price: 35, img: 'assets/img/p-hydro-cream.jpg', volumes: ['50 ml'], cats: ['daily', 'sun'], badge: 'new', collection: 'restorative' }),
    p({ id: 'retiplus', name: 'Retiplus 1%', sub: 'night anti-aging cream', price: 69, img: 'assets/img/p-retiplus.jpg', volumes: ['50 ml'], cats: ['retinization'], badge: 'new', collection: 'antiaging' }),
    p({ id: 'ferulast', name: 'Ferulast serum photoaging', sub: 'restorative serum', price: 79, img: 'assets/img/p-ferulast.jpg', volumes: ['30 ml'], cats: ['active', 'repair'], badge: 'new', collection: 'restorative' }),
    p({ id: 'night-cream', name: 'Night cream', sub: 'intensive night treatment with 0.3% pure retinol to reduce wrinkles, refine texture, and even skin tone', price: 100, img: 'assets/img/p-cleansing-soap.jpg', volumes: ['50 ml'], cats: ['retinization'], badge: 'new', collection: 'antiaging' }),

    // Акции
    p({ id: 'derma-eye', brand: 'derma', name: 'Derma-eye serum & eye contour cream', sub: 'complete daily care for the eye area', price: 80, old: 100, img: 'assets/img/p-derma-eye.jpg', volumes: ['15 ml'], cats: ['eyes'], badge: 'sale', collection: 'antiaging' }),
    p({ id: 'retinol-serum', brand: 'labelist', name: 'Serum with 0.15% stabilized retinol', sub: 'extended-release serum to prevent and correct signs of aging', price: 52, old: 65, img: 'assets/img/p-retinol-serum.jpg', volumes: ['30 ml'], cats: ['retinization', 'active'], badge: 'sale', collection: 'antiaging' }),
    p({ id: 'derma-mousse', brand: 'derma', name: 'Derma-hydrating mousse', sub: 'daily cleansing foam for dry and dehydrated skin.', price: 48, old: 60, img: 'assets/img/p-derma-mousse.jpg', volumes: ['150 ml'], cats: ['cleansing'], badge: 'sale', collection: 'cleansing' }),
    p({ id: 'facial-soap', name: 'Facial cleansing soap', sub: 'cleansing soap for oily and combination skin', price: 24, old: 30, img: 'assets/img/p-cleansing-soap.jpg', cats: ['cleansing'], badge: 'sale', collection: 'cleansing' }),

    // Прочие
    p({ id: 'refresh-toner', name: 'Refresh toner', sub: 'refreshing facial toner', price: 85, img: 'assets/img/p-cleansing-soap.jpg', volumes: ['230 ml'], cats: ['cleansing'] }),
    p({
      id: 'sensitive-cleanser', name: 'Sensitive cleanser', sub: 'exceptionally gentle cleansing', price: 38,
      img: 'assets/img/pd-sensitive-cleanser.jpg', crop: [137, -18.5, -21.49], volumes: ['250 ml', '500 ml'], cats: ['cleansing', 'daily'], collection: 'cleansing',
      action: 'An ultra-gentle formula with a neutral pH. Cleanses without tightness, maintains optimal hydration, and soothes and softens sensitive skin. Leaves skin feeling clean and comfortable. Suitable for the eye area.',
      ingredients: 'Water, almond oil, glycerin, oat extract, chamomile flower extract, and Aloe barbadensis.'
    })
  ];

  products.forEach((item, i) => { item.sku = String(253380 + i * 7); });

  /* ---------------- Русская версия: тексты и цены в рублях ----------------
     Цены демонстрационные: ориентир ≈ 95 ₽ за $1, округлено до «розничных»
     значений (…90 ₽). Скидки в акциях — ровно 20 %. */
  const RU = {
    products: {
      'intimate-soap': { name: 'Интимное мыло', sub: 'Жидкое мыло с ромашкой для интимной гигиены', price: 2090 },
      'aloe-soap': { name: 'Кремовое мыло с алоэ вера и овсом', sub: 'Увлажняющее кремовое мыло для чувствительной кожи', price: 6190 },
      'silica-scrub': { name: 'Гель-скраб с силикой', sub: 'Очищающий гель-скраб', price: 5690 },
      'body-lotion': { name: 'Лосьон для тела', sub: 'Увлажняющий лосьон для тела', price: 4690 },
      'firming-cream': { name: 'Укрепляющий крем', sub: 'Укрепляющий крем для тела', price: 2990 },
      'body-glycolic': { name: 'Гликолевый крем для тела', sub: 'Крем для тела с гликолевой кислотой', price: 2990 },
      'bust-gel': { name: 'Гель для бюста', sub: 'Укрепляющий гель для области бюста', price: 4290 },
      'arnicor': { name: 'Arnicor', sub: 'Массажный крем для тела с арникой', price: 2890 },
      'hot-cold': { name: 'Массажный крем «Горячо и холодно»', sub: 'Массажный крем с разогревающим и охлаждающим эффектом', price: 2690 },
      'tired-legs': { name: 'Гель для усталых ног', sub: 'Гель для снятия усталости и тяжести в ногах', price: 1890 },
      'activ-plus': { name: 'Activ-plus от растяжек', sub: 'Активный крем против растяжек', price: 5190 },
      'hydro-cream': { name: 'Гидропитательный крем для лица SPF 30', sub: 'Увлажняющий питательный крем для лица с SPF 30', price: 3290 },
      'retiplus': { name: 'Retiplus 1%', sub: 'Ночной антивозрастной крем', price: 6590 },
      'ferulast': { name: 'Ferulast Serum Photoaging', sub: 'Восстанавливающая сыворотка', price: 7490 },
      'night-cream': { name: 'Ночной крем', sub: 'Интенсивный ночной уход с 0,3% чистого ретинола: уменьшает морщины, улучшает текстуру и выравнивает тон кожи', price: 9490 },
      'derma-eye': { name: 'Derma-eye: сыворотка и крем для контура глаз', sub: 'Комплексный ежедневный уход за кожей вокруг глаз', price: 7590, old: 9490 },
      'retinol-serum': { name: 'Сыворотка со стабилизированным ретинолом 0,15%', sub: 'Сыворотка пролонгированного действия для профилактики и коррекции признаков старения', price: 4950, old: 6190 },
      'derma-mousse': { name: 'Увлажняющий мусс Derma', sub: 'Ежедневная очищающая пенка для сухой и обезвоженной кожи', price: 4550, old: 5690 },
      'facial-soap': { name: 'Мыло для лица', sub: 'Очищающее мыло для жирной и комбинированной кожи', price: 2310, old: 2890 },
      'refresh-toner': { name: 'Освежающий тоник', sub: 'Освежающий тоник для лица', price: 8090 },
      'sensitive-cleanser': {
        name: 'Очищающее средство для чувствительной кожи',
        sub: 'Исключительно мягкое очищение',
        price: 3590,
        action: 'Ультрамягкая формула с нейтральным pH. Очищает без ощущения стянутости, поддерживает оптимальный уровень увлажнения, успокаивает и смягчает чувствительную кожу. Оставляет ощущение чистоты и комфорта. Подходит для области вокруг глаз.',
        ingredients: 'Вода, миндальное масло, глицерин, экстракт овса, экстракт цветков ромашки и Aloe barbadensis.'
      }
    },
    categories: {
      cleansing: 'Очищение и тонизирование',
      daily: 'Ежедневный уход',
      repair: 'Восстановление, регенерация и защита кожи',
      retinization: 'Ретинизация',
      brightening: 'Осветляющий уход',
      active: 'Активные комплексы',
      eyes: 'Кремы для глаз, губ, шеи и декольте',
      masks: 'Маски',
      sun: 'Защита от солнца',
      body: 'Уход за телом',
      hair: 'Уход за волосами'
    },
    collections: {
      restorative: 'Восстанавливающий уход',
      antiaging: 'Антивозрастной уход',
      cleansing: 'Очищающий уход'
    },
    brandText: {
      skinclinic: [
        'Испанская косметическая марка SKIN CLINIC основана более 20 лет назад химиком и фармацевтом Каэтано Солано Гутьерресом.',
        'Тесно сотрудничая с ведущими биохимиками, фармацевтами, дерматологами и другими медицинскими специалистами, SKIN CLINIC разработал высокоэффективные формулы и протоколы для решения дерматологических и эстетических задач. Они помогают сохранить молодость, здоровье и красоту кожи лица и тела.',
        'В июле 2009 года в Нью-Кармадо (Испания) открылась новая лаборатория. SKIN CLINIC создан специально для дерматологических клиник и медицинских центров: терапевтические концентрации активных ингредиентов направлены на решение дерматологических и эстетических проблем кожи.',
        'Передовые технологии и современное оборудование позволяют SkinClinic выпускать инновационные, безопасные и эффективные формулы, отвечающие современным стандартам.'
      ],
      montibello: ['Профессиональная продукция Montibello доступна в EURASIA — эксклюзивном дистрибьюторе бренда в России.'],
      tallassoria: ['Профессиональная продукция Tallassoria доступна в EURASIA — эксклюзивном дистрибьюторе бренда в России.'],
      derma: ['Профессиональная продукция Derma 2.0 доступна в EURASIA — эксклюзивном дистрибьюторе бренда в России.']
    }
  };

  if (I && I.isRu) {
    products.forEach((item) => {
      const r = RU.products[item.id];
      if (!r) return;
      item.name = r.name;
      item.sub = r.sub;
      item.price = r.price;
      item.old = r.old || null;
      if (r.action) item.action = r.action;
      if (r.ingredients) item.ingredients = r.ingredients;
    });
    categories.forEach((c) => { c.name = RU.categories[c.id] || c.name; });
    collections.forEach((c) => { c.name = RU.collections[c.id] || c.name; });
    brands.forEach((b) => { b.text = RU.brandText[b.id] || b.text; });
  }

  const brandNames = { labelist: 'LABELIST' };
  brands.forEach((b) => { brandNames[b.id] = b.name; });

  return {
    brands,
    categories,
    collections,
    products,
    settings: I ? I.settings : { deliveryFee: 6, promo: 10 },
    brandName: (id) => brandNames[id] || id,
    product: (id) => products.find((x) => x.id === id),
    brand: (id) => brands.find((x) => x.id === id)
  };
})();
