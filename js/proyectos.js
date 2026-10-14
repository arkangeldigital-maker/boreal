/* =========================================================
   BOREAL · Proyectos: listado + despliegue de cada proyecto
   Contenido tomado de los PDFs de Proyectos_Desplegado. Cada caso
   se muestra con la composición del PDF recortada en una imagen
   optimizada (la ficha de cliente ya va dentro de la imagen en
   escritorio; en celular se muestra en HTML debajo).
   ========================================================= */
(() => {
  const P = 'assets/proyectos/';
  // tint: color del resplandor dentro de la tarjeta · at: posición del resplandor · w: ancho del logo (px a 1440)
  // shot: [archivo, alto] de la composición del caso (1600 px de ancho) · bg: fondo del caso en el PDF
  const PROJECTS = [
    { slug: 'coboxin', name: 'Coboxin', tall: true, w: 420, tint: '#1aa7a1', at: '100% 100%', col: 1,
      services: ['Estrategia de marca', 'Branding', 'Diseño de packaging', 'Comercialización', 'Fotografía y video', 'Marketing Digital', 'Publicidad exterior', 'Diseño web', 'Campañas publicitarias en Meta Ads'],
      industry: 'Metalúrgica · Productos anticorrosivos<br>Industria química',
      hero: ['coboxin-hero.webp', 555], gallery: ['coboxin-gallery.webp', 624], wide: ['coboxin-wide.webp', 600],
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
      hero: ['metalyzinc-hero.webp', 555], gallery: ['metalyzinc-gallery.webp', 445], wide: ['metalyzinc-wide.webp', 530],
      challengeLead: 'A pesar de contar con una amplia trayectoria y liderazgo técnico en el sector anticorrosivo,',
      challenge: 'Metalyzinc buscaba fortalecer su posicionamiento comercial e identificar nuevas oportunidades de crecimiento.',
      processLabel: 'El desafío consistió en:',
      process: [['Analizar<br>el mercado'], ['Comprender el comportamiento<br>de sus clientes'], ['Definir una estrategia que alineara sus capacidades con sus objetivos de negocio']],
      result: 'Una estrategia con visión de largo plazo que permitió establecer prioridades, fortalecer el posicionamiento de la empresa y orientar sus siguientes etapas de crecimiento.' },
    { slug: 'yeimetz', name: 'Yeimetz', w: 220, tint: '#2c6f9a', at: '0% 100%', col: 1,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM'],
      industry: 'Ingeniería · Construcción<br>Infraestructura industrial', shot: ['yeimetz-caso.webp', 1658] },
    { slug: 'sperta', name: 'Sperta', fullName: 'SPERTA Dental Care Center®', tall: true, w: 200, tint: '#a3316a', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Fotografía y video', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de campañas en Meta Ads'],
      industry: 'Salud · Clínica Dental<br>Servicios odontológicos', shot: ['sperta-caso.webp', 2737] },
    { slug: 'afp-courts', name: 'AFP Courts', fullName: 'AFP Courts México', tall: true, w: 180, tint: '#b08a2e', at: '0% 0%', col: 1,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Estrategia publicitaria en Google Ads'],
      industry: 'Infraestructura deportiva · Construcción de canchas de Pádel · Ingeniería deportiva', shot: ['afp-courts-caso.webp', 2180] },
    { slug: 'dagsa', name: 'Dagsa Logistics', w: 215, tint: '#2a86a8', at: '0% 0%', col: 2, bg: '#ededed', flush: true,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO', 'Papelería corporativa'],
      industry: 'Logística · Cadena de suministro<br>Comercio exterior', shot: ['dagsa-caso.webp', 1429] },
    { slug: 'aeternum', name: 'Aeternum', w: 270, tint: '#a3316a', at: '100% 100%', col: 1,
      services: ['Estrategia digital', 'Maquetación web', 'Diseño y desarrollo web', 'Contenido web', 'SEO y SEM', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de campañas en Meta Ads'],
      industry: 'Tecnología Financiera · Blockchain · Criptomonedas', shot: ['aeternum-caso.webp', 2166] },
    { slug: 'soli-deo-gloria', name: 'Soli Deo Gloria', tall: true, w: 360, tint: '#6c4bb3', at: '100% 100%', col: 2,
      services: ['Estrategia digital', 'Diseño y desarrollo web', 'Contenido web', 'Fotografía y video', 'SEO y SEM', 'Estrategia publicitaria en Google Ads', 'Diseño de artes publicitarios'],
      industry: 'Construcción · Ventanas y Puertas de PVC', shot: ['soli-deo-gloria-caso.webp', 1954] },
    { slug: 'private-chef-playa', name: 'Private Chef Playa', tall: true, w: 180, tint: '#1aa7a1', at: '0% 100%', col: 1,
      services: ['Dirección estratégica de redes sociales (Facebook e Instagram)', 'Estrategia de contenido', 'Diseño de contenido', 'Community management', 'Campañas en Meta Ads'],
      industry: 'Gastronomía · Turismo', shot: ['private-chef-playa-caso.webp', 2586] },
    { slug: 'vitanova', name: 'Vitanova', fullName: 'Vitanova Center Tires', w: 210, tint: '#b08a2e', at: '100% 0%', col: 2, flush: true,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios', 'Dirección estratégica de redes sociales (Facebook, Instagram)'],
      industry: 'Automotriz', shot: ['vitanova-caso.webp', 2695] },
    { slug: 'toxre', name: 'Tox&Re', w: 300, tint: '#6c4bb3', at: '100% 100%', col: 1, flush: true,
      services: ['Estrategia publicitaria en Meta Ads (Facebook e Instagram)', 'Campañas en Google Ads', 'Diseño de artes publicitarios', 'Dirección estratégica de redes sociales (Facebook e Instagram)', 'Producción fotográfica y audiovisual'],
      industry: 'Medicina Estética', shot: ['toxre-caso.webp', 1859] },
    { slug: 'steakos', name: 'Steakos', tall: true, w: 170, tint: '#a3316a', at: '100% 100%', col: 2, flush: true,
      services: ['Dirección estratégica de redes sociales (Facebook, Instagram y TikTok)', 'Producción fotográfica y audiovisual', 'Diseño de contenido', 'Gestión de campañas Meta Ads y Amazon Ads', 'Community management'],
      industry: 'Alimentos · Snacks Premium', shot: ['steakos-caso.webp', 1589] },
    { slug: 'etp', name: 'ETP', w: 200, tint: '#1aa7a1', at: '100% 100%', col: 1, bg: '#f8f8f8', flush: true,
      services: ['Estrategia digital', 'Maquetación, diseño y desarrollo web', 'Contenido web', 'SEO'],
      industry: 'Transporte y logística', shot: ['etp-caso.webp', 2535] },
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
  // ficha del cliente: en escritorio ya está dentro de la imagen, así que esta solo se ve en celular
  const info = p => `
    <aside class="pj-info pj-info--m">
      <small>Cliente</small><p>${p.fullName || p.name}</p>
      <small>Industria</small><p>${p.industry}</p>
      <small>Servicios</small><p>${p.services.join(' · ')}</p>
    </aside>`;
  const upIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  const toTop = `<div class="container pj-totop-row"><button type="button" class="pj-totop-link" data-totop>${upIcon}<span>Volver al inicio del proyecto</span></button></div>`;

  const renderDetail = p => {
    const banner = `
      <div class="container">
        <a class="pj-banner" href="#" data-back style="--tint:${p.tint};--at:${p.at}">
          ${logo(p)}
          <span class="pj-card__arrow pj-banner__back" aria-label="Volver a todos los proyectos">${arrowL}</span>
        </a>
      </div>`;
    let body;
    if (p.shot) {
      body = `
      <section class="pj-case pj-case--shot${p.flush ? ' pj-case--flush' : ''}" style="--case-bg:${p.bg || '#fff'}">
        <div class="pj-anim">${shot(p, p.shot)}</div>
        <div class="container">${info(p)}</div>
        ${p.flush ? '' : toTop}
      </section>`;
    } else {
      body = `
      <section class="pj-case pj-case--shot">
        <div class="pj-anim">${shot(p, p.hero)}</div>
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
        ${toTop}
      </section>`;
    }
    detail.innerHTML = banner + body;
  };

  // botón flotante para volver al inicio del proyecto abierto
  document.body.insertAdjacentHTML('beforeend', `<button type="button" class="pj-totop" data-totop aria-label="Volver al inicio del proyecto">${upIcon}</button>`);
  const fab = document.querySelector('.pj-totop');
  const updateFab = () => {
    const open = document.body.classList.contains('pj-open');
    const r = open && detail.getBoundingClientRect();
    fab.classList.toggle('on', !!open && r.top < -150 && r.bottom > 80);
  };
  addEventListener('scroll', updateFab, { passive: true });
  addEventListener('resize', updateFab);
  const toProjectTop = () => window.scrollTo({ top: detail.getBoundingClientRect().top + scrollY - 110, behavior: 'smooth' });

  const show = (slug, scroll) => {
    const p = PROJECTS.find(x => x.slug === slug);
    document.body.classList.toggle('pj-open', !!p);
    if (p) { renderDetail(p); renderGrid(p.slug); document.title = `${p.name} · Proyectos · Boreal`; }
    else { detail.innerHTML = ''; renderGrid(null); document.title = 'Proyectos · Boreal Marketing Digital'; }
    updateFab();
    if (scroll) {
      const target = p ? detail : document.querySelector('.pj-hero-sec');
      window.scrollTo({ top: p ? target.getBoundingClientRect().top + scrollY - 110 : 0, behavior: 'smooth' });
    }
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
