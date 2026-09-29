/* =========================================================
   BOREAL · Proyectos: listado + despliegue de cada proyecto
   Coboxin tiene la información real del PDF; el resto usa
   información dummy (marcada con dummy:true) para reemplazar.
   ========================================================= */
(() => {
  const P = 'assets/proyectos/';
  // tint: color del resplandor dentro de la tarjeta · at: posición del resplandor · w: ancho del logo (px a 1440)
  const PROJECTS = [
    { slug: 'coboxin', name: 'Coboxin', tall: true, w: 420, tint: '#1aa7a1', at: '100% 100%', col: 1,
      services: ['Estrategia de marca', 'Branding', 'Diseño de packaging', 'Comercialización', 'Fotografía y video', 'Marketing Digital', 'Publicidad exterior', 'Campañas publicitarias en Meta Ads', 'Diseño web'],
      industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química',
      challenge: '<b>COBOXIN</b> necesitaba algo más que una nueva imagen: <em>requería una estrategia</em> que le permitiera ingresar al mercado con una propuesta sólida y diferenciada.',
      challengeText: 'Desde la investigación del sector y el análisis de competidores hasta el desarrollo del empaque, la comunicación y los materiales comerciales, construimos una marca preparada para conectar con distribuidores y clientes desde su lanzamiento.',
      process: [
        ['Investigación<br>y estrategia', 'Analizamos el mercado, la competencia y el comportamiento del cliente para definir el posicionamiento, la propuesta de valor y la estrategia de lanzamiento.'],
        ['Desarrollo<br>de marca', 'Diseñamos la identidad visual, el packaging, las etiquetas, los mensajes, materiales comerciales y cada punto de contacto de la marca.'],
        ['Implementación<br>y validación', 'Llevamos la estrategia a medios digitales y comerciales mediante campañas, pruebas con clientes potenciales, materiales para punto de venta y herramientas para su comercialización.']],
      result: 'Una marca creada para competir, conectar con su mercado y crecer con una estrategia sólida desde su lanzamiento.',
      images: { hero: 'coboxin-hero.webp', big: ['Branding', 'coboxin-branding.webp'], side1: ['Papelería', 'coboxin-papeleria.webp'], side2: ['Aplicación', null], wide: ['Packaging', 'coboxin-packaging.webp'] } },
    { slug: 'metalyzinc', name: 'Metalyzinc', w: 290, tint: '#c98b2a', at: '100% 0%', col: 2,
      services: ['Consultoría estratégica', 'Diagnóstico de marca', 'Identificación de oportunidades de crecimiento', 'Estrategia de negocio', 'Consultoría comercial', 'Marketing estratégico', 'Marketing Digital'], dummy: true },
    { slug: 'yeimetz', name: 'Yeimetz', w: 220, tint: '#2c6f9a', at: '0% 100%', col: 1,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM'], dummy: true },
    { slug: 'sperta', name: 'Sperta', tall: true, w: 200, tint: '#a3316a', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM'], dummy: true },
    { slug: 'afp-courts', name: 'AFP Courts', tall: true, w: 180, tint: '#b08a2e', at: '0% 0%', col: 1,
      services: ['Estrategia publicitaria en Google Ads', 'Diseño de artes publicitarios', 'Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM'], dummy: true },
    { slug: 'dagsa', name: 'Dagsa Logistics', w: 215, tint: '#2a86a8', at: '0% 0%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM'], dummy: true },
    { slug: 'aeternum', name: 'Aeternum', w: 270, tint: '#a3316a', at: '100% 100%', col: 1,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM'], dummy: true },
    { slug: 'soli-deo-gloria', name: 'Soli Deo Gloria', tall: true, w: 360, tint: '#6c4bb3', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM', 'Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios'], dummy: true },
    { slug: 'private-chef-playa', name: 'Private Chef Playa', tall: true, w: 180, tint: '#1aa7a1', at: '0% 100%', col: 1,
      services: ['Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de contenido', 'Diseño de contenido', 'Community management', 'Campañas en Meta Ads'], dummy: true },
    { slug: 'vitanova', name: 'Vitanova', w: 210, tint: '#b08a2e', at: '100% 0%', col: 2,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios'], dummy: true },
    { slug: 'toxre', name: 'Tox&Re', w: 300, tint: '#6c4bb3', at: '100% 100%', col: 1,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios'], dummy: true },
    { slug: 'steakos', name: 'Steakos', tall: true, w: 170, tint: '#a3316a', at: '100% 100%', col: 2,
      services: ['Dirección estratégica de redes sociales (Facebook, Instagram y TikTok)', 'Producción fotográfica y audiovisual', 'Diseño de contenido', 'Gestión de campañas Meta Ads y Amazon Ads', 'Community management'], dummy: true },
    { slug: 'macaria', name: 'Macaria', w: 240, tint: '#c98b2a', at: '100% 0%', col: 1,
      services: ['Dirección estratégica de redes sociales (Facebook, Instagram)', 'Producción fotográfica y audiovisual', 'Diseño de contenido', 'Community management'], dummy: true },
    { slug: 'crossfit-tarpon', name: 'CrossFit Tarpón', w: 190, tint: '#1aa7a1', at: '100% 100%', col: 2,
      services: ['Dirección estratégica de redes sociales (Facebook, Instagram)', 'Producción fotográfica y audiovisual', 'Diseño de contenido', 'Community management', 'Campañas en Meta Ads'], dummy: true },
  ];

  // Información dummy para los proyectos que aún no tienen caso escrito
  const dummy = p => ({
    industry: 'Industria por confirmar',
    challenge: `<b>${p.name.toUpperCase()}</b> buscaba <em>una dirección clara</em> para comunicar su propuesta y crecer con una estrategia a la medida de su mercado.`,
    challengeText: `[Texto dummy] Aquí va el contexto del proyecto: qué necesitaba ${p.name}, cómo era su punto de partida y qué objetivos definimos juntos antes de ejecutar.`,
    process: [
      ['Diagnóstico<br>y estrategia', '[Texto dummy] Análisis del punto de partida, del mercado y de la audiencia para definir prioridades y la ruta de trabajo.'],
      ['Desarrollo<br>y producción', `[Texto dummy] Ejecución de ${p.services.slice(0, 2).join(' y ').toLowerCase()} con dirección creativa en cada pieza.`],
      ['Implementación<br>y medición', '[Texto dummy] Lanzamiento, seguimiento de resultados y ajustes continuos para crecer con dirección.']],
    result: '[Texto dummy] Una marca con una estrategia clara y resultados medibles.',
    images: { hero: null, big: ['Proyecto', null], side1: ['Contenido', null], side2: ['Aplicación', null], wide: ['Resultados', null] },
  });

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

  // placeholder visual para imágenes que aún no tenemos (proyectos dummy)
  const ph = (p, label) => `<div class="pj-ph" style="--tint:${p.tint}">${logo(p)}<small>${label} · imagen pendiente</small></div>`;
  const tile = (p, [label, img], cls = '') => `
    <figure class="pj-tile ${cls}">${img ? `<img src="${P}${img}" alt="${p.name} · ${label}" loading="lazy">` : ph(p, label)}<figcaption>${label}</figcaption></figure>`;

  const renderDetail = p => {
    const d = { ...(p.dummy ? dummy(p) : {}), ...p };
    const im = d.images;
    const aplicacion = p.slug === 'coboxin'
      ? `<figure class="pj-tile pj-tile--app"><div class="pj-app"><img src="${P}coboxin-cubeta-convertidor.webp" alt=""><img src="${P}coboxin-cubeta-bloqueador.webp" alt=""></div><figcaption>Aplicación</figcaption></figure>`
      : tile(p, im.side2);
    detail.innerHTML = `
      <div class="container">
        <a class="pj-banner" href="#" data-back style="--tint:${p.tint};--at:${p.at}">
          ${logo(p)}
          <span class="pj-card__arrow pj-banner__back" aria-label="Volver a todos los proyectos">${arrowL}</span>
        </a>
      </div>
      <section class="pj-case">
        <div class="container">
          <div class="pj-intro pj-anim">
            <figure class="pj-hero">${im.hero ? `<img src="${P}${im.hero}" alt="${p.name}">` : ph(p, 'Imagen principal')}</figure>
            <aside class="pj-info">
              <small>Cliente</small><p>${p.name}</p>
              <small>Industria</small><p>${d.industry}</p>
              <small>Servicios</small><p>${p.services.join(' · ')}</p>
            </aside>
          </div>
          <div class="pj-reto pj-anim">
            <p class="pj-label">El reto</p>
            <div class="fig fx pj-reto__p1" style="--fd:9s"><div><img class="float" style="--r:-10deg" src="assets/fig/8.webp" alt=""></div></div>
            <div class="fig fx pj-reto__p2" style="--fd:8s;--fdl:-4s"><div><img class="float" style="--r:10deg;--dur:9s" src="assets/fig/5.webp" alt=""></div></div>
            <div class="pj-reto__txt"><h2>${d.challenge}</h2><p>${d.challengeText}</p></div>
          </div>
          <div class="pj-gallery pj-anim">
            ${tile(p, im.big, 'pj-tile--big')}
            <div class="pj-gallery__side">${tile(p, im.side1)}${aplicacion}</div>
          </div>
        </div>
        <div class="pj-process pj-anim">
          <div class="container">
            <p class="pj-label pj-label--light">El proceso</p>
            <div class="pj-steps">
              ${d.process.map(([t, x], k) => `<div class="pj-step pj-step--${k + 1}"><div><b>0${k + 1}</b><h3>${t}</h3><p>${x}</p></div><img class="spin-slow" src="assets/fig/${['aro-dorado.webp', '4.webp', '1.webp'][k]}" alt=""></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="container">
          ${tile(p, im.wide, 'pj-tile--wide pj-anim')}
          <div class="pj-result pj-anim"><p class="pj-label">El resultado</p><h2>${d.result}</h2></div>
        </div>
      </section>`;
  };

  const show = (slug, scroll) => {
    const p = PROJECTS.find(x => x.slug === slug);
    document.body.classList.toggle('pj-open', !!p);
    if (p) { renderDetail(p); renderGrid(p.slug); document.title = `${p.name} · Proyectos · Boreal`; }
    else { detail.innerHTML = ''; renderGrid(null); document.title = 'Proyectos · Boreal Marketing Digital'; }
    if (scroll) {
      const target = p ? detail : document.querySelector('.pj-hero-sec');
      window.scrollTo({ top: p ? target.getBoundingClientRect().top + scrollY - 110 : 0, behavior: 'smooth' });
    }
  };

  document.addEventListener('click', e => {
    const c = e.target.closest('[data-slug]');
    if (c) { e.preventDefault(); history.pushState(null, '', '#' + c.dataset.slug); show(c.dataset.slug, true); return; }
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
