/* =========================================================
   BOREAL · Proyectos: listado + despliegue de cada proyecto
   Contenido tomado de los PDFs de Proyectos_Desplegado. Cada caso
   se muestra con la composición del PDF recortada en una imagen
   optimizada (la ficha de cliente ya va dentro de la imagen en
   escritorio; en celular se muestra en HTML debajo).
   ========================================================= */
(() => {
  const P = 'assets/proyectos/';
  const mqMobile = matchMedia('(max-width: 820px)');
  // tint: color del resplandor dentro de la tarjeta · at: posición del resplandor · w: ancho del logo (px a 1440)
  // hero/gallery: [archivo, alto] (1600 px de ancho) · card.box: posición de la ficha del cliente en % del hero (izq, arriba, ancho, alto) · bg: fondo del caso
  const PROJECTS = [
    { slug: 'coboxin', name: 'Coboxin', tall: true, w: 420, tint: '#1aa7a1', at: '100% 100%', col: 1,
      services: ['Estrategia de marca', 'Branding', 'Diseño de packaging', 'Comercialización', 'Fotografía y video', 'Marketing Digital', 'Publicidad exterior', 'Diseño web', 'Campañas publicitarias en Meta Ads'],
      industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química',
      hero: ['coboxin-hero.webp', 555], mcrop: [6.06, 58.88, 0, 100], card: { box: [58.819, 14.83, 34.097, 72.144], client: 'Coboxin', industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química', services: 'Estrategia de marca · Branding<br>Diseño de packaging · Comercialización<br>Fotografía y video · Marketing Digital<br>Publicidad exterior · Diseño web<br>Campañas publicitarias en Meta Ads' }, gallery: ['coboxin-gallery.webp?v=202610201104', 624], wide: ['coboxin-wide.webp', 600],
      challenge: '<b>COBOXIN</b> necesitaba algo más que una nueva imagen: <em>requería una estrategia</em> que le permitiera ingresar al mercado con una propuesta sólida y diferenciada.',
      challengeText: 'Desde la investigación del sector y el análisis de competidores hasta el desarrollo del empaque, la comunicación y los materiales comerciales, construimos una marca preparada para conectar con distribuidores y clientes desde su lanzamiento.',
      processLabel: 'El proceso',
      process: [
        ['Investigación<br>y estrategia', 'Analizamos el mercado, la competencia y el comportamiento del cliente para definir el posicionamiento, la propuesta de valor y la estrategia de lanzamiento.'],
        ['Desarrollo<br>de marca', 'Diseñamos la identidad visual, el packaging, las etiquetas, los mensajes, materiales comerciales y cada punto de contacto de la marca.'],
        ['Implementación<br>y validación', 'Llevamos la estrategia a medios digitales y comerciales mediante campañas, pruebas con clientes potenciales, materiales para punto de venta y herramientas para su comercialización.']],
      result: 'Una marca creada para competir, conectar con su mercado y crecer con una estrategia sólida desde su lanzamiento.' },
    { slug: 'metalyzinc', name: 'Metalyzinc', w: 290, tint: '#c98b2a', at: '100% 0%', col: 2,
      services: ['Consultoría estratégica', 'Diagnóstico de marca', 'Identificación de oportunidades de crecimiento', 'Estrategia de negocio', 'Consultoría comercial', 'Marketing estratégico', 'Marketing Digital', 'Papelería corporativa'],
      industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química',
      hero: ['metalyzinc-hero.webp', 555], mcrop: [6.25, 59.1, 0, 100], card: { box: [59.097, 14.629, 34.097, 72.144], client: 'Metalyzinc', industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química', services: 'Consultoría estratégica · Diagnóstico de<br>marca · Identificación de oportunidades de<br>crecimiento · Estrategia de negocio<br>Consultoría comercial · Marketing estratégico<br>· Marketing Digital · Papelería corporativa' }, gallery: ['metalyzinc-gallery.webp', 445], wide: ['metalyzinc-wide.webp', 530],
      challengeLead: 'A pesar de contar con una amplia trayectoria y liderazgo técnico en el sector anticorrosivo,',
      challenge: 'Metalyzinc buscaba fortalecer su posicionamiento comercial e identificar nuevas oportunidades de crecimiento.',
      processLabel: 'El desafío consistió en:',
      process: [['Analizar<br>el mercado'], ['Comprender el comportamiento<br>de sus clientes'], ['Definir una estrategia que alineara sus capacidades con sus objetivos de negocio']],
      result: 'Una estrategia con visión de largo plazo que permitió establecer prioridades, fortalecer el posicionamiento de la empresa y orientar sus siguientes etapas de crecimiento.' },
    { slug: 'yeimetz', name: 'Yeimetz', w: 220, tint: '#2c6f9a', at: '0% 100%', col: 1,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM'],
      industry: 'Ingeniería · Construcción<br>Infraestructura industrial', hero: ['yeimetz-hero.webp', 879], mcrop: [6.13, 58.5, 2.96, 98.52], gallery: ['yeimetz-galeria.webp', 779], card: { box: [58.611, 20.48, 34.444, 45.512], client: 'Yeimetz', industry: 'Ingeniería · Construcción<br>Infraestructura industrial', services: 'Estrategia digital · Diseño y desarrollo web<br>Contenido web · SEO y SEM' } },
    { slug: 'sperta', name: 'Sperta', fullName: 'SPERTA Dental Care Center®', tall: true, w: 200, tint: '#a3316a', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Fotografía y video', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de campañas en Meta Ads'],
      industry: 'Salud · Clínica Dental<br>Servicios odontológicos', hero: ['sperta-hero.webp', 594], mcrop: [6.56, 59.19, 4.55, 97.81], gallery: ['sperta-galeria.webp', 2144], card: { box: [59.306, 17.978, 34.028, 67.416], client: 'SPERTA Dental Care Center®', industry: 'Salud · Clínica Dental<br>Servicios odontológicos', services: 'Estrategia digital · Diseño y desarrollo web<br>· Contenido web · SEO y SEM · Fotografía y<br>video · Dirección estratégica de redes<br>sociales (Facebook e Instagram)<br>Estrategia de campañas en Meta Ads' } },
    { slug: 'afp-courts', name: 'AFP Courts', fullName: 'AFP Courts México', tall: true, w: 180, tint: '#b08a2e', at: '0% 0%', col: 1,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Estrategia publicitaria en Google Ads'],
      industry: 'Infraestructura deportiva · Construcción de canchas de Pádel · Ingeniería deportiva', hero: ['afp-courts-hero.webp', 714], mcrop: [6.18, 58.4, 8.68, 93.28], gallery: ['afp-courts-galeria.webp', 1467], card: { box: [55.139, 22.586, 37.917, 56.075], client: 'AFP Courts México', industry: 'Infraestructura deportiva · Construcción<br>de canchas de Pádel · Ingeniería deportiva', services: 'Estrategia digital · Maquetación web · Diseño<br>y desarrollo web · Contenido web · SEO y<br>SEM · Estrategia publicitaria en Google Ads' } },
    { slug: 'dagsa', name: 'Dagsa Logistics', w: 215, tint: '#2a86a8', at: '0% 0%', col: 2, bg: '#ededed', flush: true,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO', 'Papelería corporativa'],
      industry: 'Logística · Cadena de suministro<br>Comercio exterior', hero: ['dagsa-hero.webp', 637], mcrop: [6.4, 60.9, 4.0, 95.4], mround: true, gallery: ['dagsa-galeria.webp', 793], card: { box: [61.111, 19.546, 32.083, 62.827], client: 'Dagsa Logistics', industry: 'Logística · Cadena de suministro<br>Comercio exterior', services: 'Estrategia digital · Maquetación web<br>Diseño y desarrollo web · Contenido web<br>SEO · Papelería corporativa' } },
    { slug: 'aeternum', name: 'Aeternum', fullBleed: true, w: 270, tint: '#a3316a', at: '100% 100%', col: 1,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de campañas en Meta Ads'],
      industry: 'Tecnología Financiera · Blockchain · Criptomonedas', hero: ['aeternum-hero.webp', 943], mcrop: [0.25, 70.25, 2.86, 98.62], mcard: 'sep', gallery: ['aeternum-galeria.webp', 1224], card: { box: [50.139, 18.986, 42.917, 42.453], client: 'Aeternum', industry: 'Tecnología Financiera · Blockchain · Criptomonedas', services: 'Estrategia digital · Maquetación web · Diseño y<br>desarrollo web · Contenido web · SEO y SEM<br>Dirección estratégica de redes sociales (Facebook<br>e Instagram) · Estrategia de campañas en Meta Ads' } },
    { slug: 'soli-deo-gloria', fullHero: true, fullBleed: true, name: 'Soli Deo Gloria', tall: true, w: 360, tint: '#6c4bb3', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM', 'Estrategia publicitaria en Google Ads', 'Diseño de artes publicitarios'],
      industry: 'Construcción · Ventanas y Puertas de PVC', hero: ['soli-deo-gloria-hero.webp', 1954], mcard: 'sep', card: { box: [51.389, 9.613, 41.597, 20.364], client: 'SOLI·DEO GLORIA', industry: 'Construcción · Ventanas y Puertas de PVC', services: 'Estrategia digital · Diseño y desarrollo<br>web · Contenido web · Fotografía y video<br>SEO y SEM · Estrategia publicitaria en<br>Google Ads · Diseño de artes publicitarios' } },
    { slug: 'private-chef-playa', name: 'Private Chef Playa', tall: true, w: 180, tint: '#1aa7a1', at: '0% 100%', col: 1,
      services: ['Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de contenido', 'Diseño de contenido', 'Community management', 'Campañas en Meta Ads'],
      industry: 'Gastronomía · Turismo', hero: ['private-chef-playa-hero.webp', 2586], mcard: 'sep', card: { box: [58.194, 9.411, 34.861, 15.471], client: 'Private Chef Playa', industry: 'Gastronomía · Turismo', services: 'Dirección estratégica de redes sociales<br>(Facebook e Instagram) · Estrategia de<br>contenido · Diseño de contenido · Community<br>management · Campañas en Meta Ads' } },
    { slug: 'vitanova', fullBleed: true, name: 'Vitanova', fullName: 'Vitanova Center Tires', w: 210, tint: '#b08a2e', at: '100% 0%', col: 2, flush: true,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios', 'Dirección estratégica de redes sociales (Facebook, Instagram)'],
      industry: 'Automotriz', hero: ['vitanova-hero.webp', 1537], mcard: 'sep', gallery: ['vitanova-galeria.webp', 1158], card: { box: [41.528, 8.098, 51.389, 22.56], client: 'Vitanova Center Tires', industry: 'Automotriz', services: 'Estrategia publicitaria en Meta Ads (Facebook e Instagram)<br>Campañas en Google Ads · Diseño de artes publicitarios<br>Dirección estratégica de redes sociales (Facebook, Instagram)' } },
    { slug: 'toxre', name: 'Tox&Re', w: 300, tint: '#6c4bb3', at: '100% 100%', col: 1, flush: true,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Producción fotográfica y audiovisual'],
      industry: 'Medicina Estética', hero: ['toxre-hero.webp', 789], mcrop: [6.9, 49.5, 3.9, 95.0], mround: true, gallery: ['toxre-galeria.webp', 1070], card: { box: [50.417, 18.592, 42.5, 50.704], client: 'Tox&amp;Re', industry: 'Medicina Estética', services: 'Estrategia publicitaria en Meta Ads (Facebook e<br>Instagram) · Campañas en Google Ads · Diseño<br>de artes publicitarios · Dirección estratégica de<br>redes sociales (Facebook e Instagram) ·<br>Producción fotográfica y audiovisual' } },
    { slug: 'steakos', fullHero: true, fullBleed: true, name: 'Steakos', tall: true, w: 170, tint: '#a3316a', at: '100% 100%', col: 2, flush: true,
      services: ['Dirección estratégica de redes sociales (Facebook, Instagram y TikTok)', 'Producción fotográfica y audiovisual', 'Diseño de contenido', 'Gestión de campañas Meta Ads y Amazon Ads', 'Community management'],
      industry: 'Alimentos · Snacks Premium', hero: ['steakos-hero.webp', 1589], mcard: 'sep', mfirst: true, card: { box: [53.611, 11.119, 38.889, 25.175], client: 'Steakos', industry: 'Alimentos · Snacks Premium', services: 'Dirección estratégica de redes sociales<br>(Facebook, Instagram y TikTok) · Producción<br>fotográfica y audiovisual · Diseño de contenido<br>Gestión de campañas Meta Ads y Amazon Ads<br>Community management' } },
    { slug: 'etp', fullHero: true, fullBleed: true, name: 'ETP', w: 200, tint: '#1aa7a1', at: '100% 100%', col: 1, bg: '#f8f8f8', flush: true,
      services: ['Estrategia digital', 'Maquetación, diseño y desarrollo web', 'Contenido web', 'SEO'],
      industry: 'Transporte y logística', hero: ['etp-hero.webp', 721], mcrop: [0, 56.19, 4.16, 97.78], mbleed: true, mcard: 'sep', gallery: ['etp-galeria.webp', 1814], card: { box: [45.139, 19.877, 47.778, 55.778], client: 'ETP', industry: 'Transporte y logística', services: 'Estrategia digital • Maquetación, diseño y<br>desarrollo web • Contenido web • SEO' } },
  ];

  const grid = document.getElementById('pj-grid'), detail = document.getElementById('pj-detail');
  const arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const arrowL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  const logo = p => `<img class="pj-logo" src="${P}logo-${p.slug}.webp" alt="${p.name}" style="--lw:${p.w}px">`;

  const card = (p, i) => `
    <a class="pj-card${p.tall ? ' pj-card--tall' : ''}" href="#${p.slug}" data-slug="${p.slug}" style="--tint:${p.tint};--at:${p.at};--i:${i}">
      <span class="pj-card__arrow" aria-hidden="true">${arrowR}</span>
      <div class="pj-card__logo">${logo(p)}</div>
      <p class="pj-card__svc">${p.services.join(' · ')}</p>
    </a>`;

  const renderGrid = (exclude) => {
    const list = PROJECTS.filter(p => p.slug !== exclude);
    // dos columnas tipo mosaico, como en el PDF
    const cols = [[], []];
    list.forEach((p, i) => cols[exclude ? i % 2 : p.col - 1].push(card(p, i)));
    grid.innerHTML = `<div class="pj-col">${cols[0].join('')}</div><div class="pj-col">${cols[1].join('')}</div>`;
  };

  // composición del PDF a todo lo ancho (1440 px máx.)
  const shot = (p, [file, h], cls = '') => `
    <figure class="pj-shot ${cls}"><img src="${P}${file}" width="1600" height="${h}" alt="${p.fullName || p.name}: proyecto de Boreal" decoding="async"></figure>`;
  // imagen principal con la ficha del cliente en HTML, en el mismo lugar que en el PDF (detrás de la imagen,
  // que tiene ese hueco transparente, para que objetos como el autobús o el celular queden por delante)
  // celular: recorte de la foto principal [izq, der, arriba, abajo] en % de la imagen, para que llene el contenedor
  const crop = p => {
    const [l, r, t, b] = p.mcrop, k = 100 / (r - l), ar = p.hero[1] / 1600;
    return `--iw:${(k * 100).toFixed(3)}%;--ml:${(-l * k).toFixed(3)}%;--mt:${(-t / 100 * k * ar * 100).toFixed(3)}%;--ar:${(1 / ((b - t) / 100 * k * ar)).toFixed(4)}`;
  };
  const heroFig = p => {
    // la caja se extiende un poco hacia la izquierda, por detrás de la imagen (que es opaca ahí),
    // para que no quede una línea clara en la unión entre la foto y la caja
    const [l0, t, w0, h] = p.card.box, l = l0 - 2, w = w0 + 2;
    return `
    <figure class="pj-hero2${p.mcrop ? ' pj-hero2--crop' : ''}${p.mround ? ' pj-hero2--round' : ''}${p.mbleed ? ' pj-hero2--bleed' : ''}${p.fullHero ? ' pj-hero2--full' : ''}"${p.mcrop ? ` style="${crop(p)}"` : ''}>
      <div class="pj-card2" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%">
        <div class="pj-card2__txt">
          <small>Cliente</small><p>${p.card.client}</p>
          <small>Industria</small><p>${p.card.industry}</p>
          <small>Servicios</small><p>${p.card.services}</p>
        </div>
      </div>
      <img src="${P}${p.hero[0]}" width="1600" height="${p.hero[1]}" alt="${p.fullName || p.name}: proyecto de Boreal" decoding="async">
    </figure>`;
  };
  // en celular la ficha se lee aparte, debajo de la imagen
  // un salto antes de minúscula o paréntesis continúa la frase; si no, separa conceptos
  const flat = t => t.replace(/\s*[·•]?\s*<br>\s*[·•]?\s*(?=(.))/g, (m, c) => /[a-záéíóúñ(]/.test(c) ? ' ' : ' · ');
  const info = p => `
    <aside class="pj-info pj-info--m">
      <small>Cliente</small><p>${p.card.client}</p>
      <small>Industria</small><p>${flat(p.card.industry)}</p>
      <small>Servicios</small><p>${p.services.join(' · ')}</p>
    </aside>`;
  const upIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  // fila final del caso: proyecto anterior · volver al inicio · proyecto siguiente (las flechas solo si existen)
  const toTop = p => {
    // en celular el orden es el de la lista vertical (primera columna y luego la segunda)
    const order = mqMobile.matches ? [...PROJECTS.filter(x => x.col === 1), ...PROJECTS.filter(x => x.col === 2)] : PROJECTS;
    const i = order.indexOf(p), prev = order[i - 1], next = order[i + 1];
    const nav = (q, dir) => q
      ? `<a class="pj-nav pj-nav--${dir}" href="#${q.slug}" data-slug="${q.slug}" aria-label="${dir === 'prev' ? 'Proyecto anterior' : 'Siguiente proyecto'}: ${q.name}">${dir === 'prev' ? arrowL : arrowR}</a>`
      : '<span class="pj-nav pj-nav--empty" aria-hidden="true"></span>';
    return `<div class="container pj-totop-row">${nav(prev, 'prev')}<button type="button" class="pj-totop-link" data-totop>${upIcon}<span>Volver al inicio del proyecto</span></button>${nav(next, 'next')}</div>`;
  };

  const renderDetail = p => {
    const banner = `
      <div class="container">
        <a class="pj-banner" href="#" data-back style="--tint:${p.tint};--at:${p.at}">
          ${logo(p)}
          <span class="pj-card__arrow pj-banner__back" aria-label="Volver a todos los proyectos">${arrowL}</span>
        </a>
      </div>`;
    let body;
    if (!p.process) {
      body = `
      <section class="pj-case pj-case--shot${p.flush ? ' pj-case--flush' : ''}${p.mfirst ? ' pj-case--mfirst' : ''}" style="--case-bg:${p.bg || '#fff'}">
        <div class="pj-anim">${heroFig(p)}</div>
        <div class="container${p.mcard === 'sep' ? ' pj-info-sep' : ''}">${info(p)}</div>
        ${p.gallery ? `<div class="pj-anim">${shot(p, p.gallery, p.fullBleed ? 'pj-shot--full' : '')}</div>` : ''}
        ${toTop(p)}
      </section>`;
    } else {
      body = `
      <section class="pj-case pj-case--shot">
        <div class="pj-anim">${heroFig(p)}</div>
        <div class="container">${info(p)}
          <div class="pj-reto pj-anim">
            <p class="pj-label">El reto</p>
            <div class="fig fx pj-reto__p1" style="--fd:9s"><div><img class="float" style="--r:-10deg" src="assets/fig/8.webp" alt=""></div></div>
            <div class="fig fx pj-reto__p2" style="--fd:8s;--fdl:-4s"><div><img class="float" style="--r:10deg;--dur:9s" src="assets/fig/5.webp" alt=""></div></div>
            <div class="pj-reto__txt">${p.challengeLead ? `<p class="pj-reto__lead">${p.challengeLead}</p>` : ''}<h2>${p.challenge}</h2>${p.challengeText ? `<p>${p.challengeText}</p>` : ''}</div>
          </div>
        </div>
        <div class="pj-anim">${shot(p, p.gallery)}</div>
        <div class="pj-process pj-anim">
          <div class="container">
            <p class="pj-label pj-label--light">${p.processLabel}</p>
            <div class="pj-steps">
              ${p.process.map(([t, x], k) => `<div class="pj-step pj-step--${k + 1}"><div><b>0${k + 1}</b><h3>${t}</h3>${x ? `<p>${x}</p>` : ''}</div><img class="spin-slow" src="assets/fig/${['aro-dorado.webp', '4.webp', '1.webp'][k]}" alt=""></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="pj-anim pj-wide">${shot(p, p.wide)}</div>
        <div class="container"><div class="pj-result pj-anim"><p class="pj-label">El resultado</p><h2>${p.result}</h2></div></div>
        ${toTop(p)}
      </section>`;
    }
    // en celular la tarjeta de la lista hace de encabezado (no se repite el banner)
    detail.innerHTML = (mqMobile.matches ? '' : banner) + body;
  };

  // botón flotante para volver al inicio del proyecto abierto
  document.body.insertAdjacentHTML('beforeend', `<button type="button" class="pj-totop" data-totop aria-label="Volver al inicio del proyecto">${upIcon}</button>`);
  const fab = document.querySelector('.pj-totop');
  const updateFab = () => {
    const open = document.body.classList.contains('pj-open');
    const r = open && detail.getBoundingClientRect();
    // se oculta cuando la fila de navegación del final ya está en pantalla, para no taparle las flechas
    const row = open && detail.querySelector('.pj-totop-row');
    const rowVisible = row && row.getBoundingClientRect().top < innerHeight;
    fab.classList.toggle('on', !!open && r.top < -150 && r.bottom > 80 && !rowVisible);
  };
  addEventListener('scroll', updateFab, { passive: true });
  addEventListener('resize', updateFab);
  const toProjectTop = () => window.scrollTo({ top: detail.getBoundingClientRect().top + scrollY - 110, behavior: 'smooth' });

  // En celular el proyecto se abre en su mismo lugar de la lista (sin reordenar) y al cerrarlo
  // se vuelve a esa misma tarjeta; en escritorio se abre arriba de la lista, como antes
  const detailHome = document.createComment('pj-detail');
  detail.before(detailHome);
  let lastSlug = null, lastTop = 90;
  const show = (slug, scroll) => {
    const p = PROJECTS.find(x => x.slug === slug);
    const mobile = mqMobile.matches;
    // posición en pantalla de la tarjeta que se abre, para regresar ahí al cerrar
    if (p && mobile) { const c0 = grid.querySelector(`[data-slug="${p.slug}"]`); if (c0) lastTop = Math.max(90, c0.getBoundingClientRect().top); }
    document.body.classList.toggle('pj-open', !!p);
    detailHome.after(detail);
    if (p) {
      renderDetail(p); renderGrid(mobile ? null : p.slug);
      if (mobile) {
        const c = grid.querySelector(`[data-slug="${p.slug}"]`);
        // la misma tarjeta se convierte en el encabezado del proyecto abierto; tocarla lo cierra
        if (c) { c.after(detail); c.classList.add('is-open'); c.removeAttribute('data-slug'); c.setAttribute('data-back', ''); c.setAttribute('aria-label', `Cerrar ${p.name}`); }
      }
      document.title = `${p.name} · Proyectos · Boreal`;
    } else { detail.innerHTML = ''; renderGrid(null); document.title = 'Proyectos · Boreal Marketing Digital'; }
    updateFab();
    if (scroll) {
      let top = 0;
      if (p) top = (mobile ? (detail.previousElementSibling || detail) : detail).getBoundingClientRect().top + scrollY - (mobile ? 90 : 110);
      else if (mobile && lastSlug) { const c = grid.querySelector(`[data-slug="${lastSlug}"]`); if (c) top = c.getBoundingClientRect().top + scrollY - lastTop; }
      window.scrollTo({ top, behavior: mobile && !p ? 'auto' : 'smooth' });
    }
    lastSlug = p ? p.slug : null;
  };


  document.addEventListener('click', e => {
    const c = e.target.closest('[data-slug]');
    if (c) { e.preventDefault(); history.pushState(null, '', '#' + c.dataset.slug); show(c.dataset.slug, true); return; }
    if (e.target.closest('[data-totop]')) { toProjectTop(); return; }
    if (e.target.closest('[data-back]')) { e.preventDefault(); history.pushState(null, '', location.pathname); show(null, true); }
  });
  addEventListener('popstate', () => show(location.hash.slice(1), true));
  // brillo que sigue al cursor dentro de cada tarjeta
  document.addEventListener('mousemove', e => {
    const c = e.target.closest('.pj-card'); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  show(location.hash.slice(1), false);
})();
