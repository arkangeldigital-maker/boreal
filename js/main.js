/* =========================================================
   BOREAL · interacciones y animaciones
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const page = body.dataset.page;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fig = n => `assets/fig/${n}.webp`;

  /* ---------- Parciales: header, menú, footer, cortina ---------- */
  const links = [
    ['index.html', 'Home', 'home'],
    ['servicios.html', 'Servicios', 'servicios'],
    ['borealizate.html', 'Borealízate', 'borealizate'],
    ['proyectos.html', 'Proyectos', 'proyectos'],
    ['contacto.html', 'Contacto', 'contacto'],
  ];
  const navHTML = links.map(([h, t, k]) => `<a href="${h}"${k === page ? ' class="active" aria-current="page"' : ''}>${t}</a>`).join('');
  const ctaText = page === 'sesion' ? 'Agenda una Sesión Norte' : 'Sesión Norte';
  // Logotipo Boreal en SVG, reconstruido del diseño (anillos con eje r=72.5).
  // w = grosor del trazo (35 en el logo oficial); ringO = sustituye la "o" por el aro 3D girando (loader)
  const logoSVG = (mr = 'MR', w = 35, ringO = false) => {
    const h = w / 2, id = ++logoId, bottom = 362 + 72.5 + h;
    const ringSize = (145 + w) / 0.95; // aro-centrado.webp: el aro ocupa ~95% y su centro es el de la imagen
    const o = ringO
      ? `<image class="logo-ring" href="${fig('aro-centrado')}" x="${373 - ringSize / 2}" y="${362 - ringSize / 2}" width="${ringSize}" height="${ringSize}"/>`
      : `<circle cx="373" cy="362" r="72.5"/>`;
    return `<svg class="logo-svg" viewBox="80 145 1150 312" role="img" aria-label="Boreal" fill="currentColor" overflow="visible">
      <defs><mask id="e-cut-${id}"><rect x="600" y="240" width="260" height="240" fill="#fff"/><rect x="731" y="${355.5 + h}" width="120" height="${398 - 355.5 - h}" fill="#000"/></mask></defs>
      <g fill="none" stroke="currentColor" stroke-width="${w}">
        <circle cx="174" cy="362" r="72.5"/>${ringO ? '' : o}
        <path d="M510.5 362A72.5 72.5 0 0 1 631.5 308.1"/>
        <circle cx="730" cy="362" r="72.5" mask="url(#e-cut-${id})"/>
        <circle class="logo-a" cx="933" cy="362" r="72.5"/>
      </g>
      <rect x="${101.5 - h}" y="151" width="${w}" height="211"/><rect x="${510.5 - h}" y="${362 - 72.5 - h}" width="${w}" height="${145 + w}"/>
      <rect x="${657.5 + h}" y="${355.5 - h}" width="${145}" height="${w}"/><rect x="${1005.5 - h}" y="362" width="${w}" height="${bottom - 362}"/>
      <rect x="${1072 - h}" y="153" width="${w}" height="${bottom - 153}"/>
      ${ringO ? o : ''}
      ${mr ? `<text x="1146" y="185" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="44">${mr}</text>` : ''}
    </svg>`;
  };
  let logoId = 0;
  const logo = () => `<a href="index.html" class="logo" aria-label="Boreal, inicio">${logoSVG()}</a>`;

  body.insertAdjacentHTML('afterbegin', `
    <div class="curtain" aria-hidden="true">
      <div class="curtain__panel"></div><div class="curtain__panel"></div><div class="curtain__panel"></div>
      <div class="curtain__logo">${logoSVG('', 22, true)}</div>
    </div>
    <div class="progress" aria-hidden="true"></div>
    <header class="header">
      <div class="container header__in">
        ${logo()}
        <nav class="nav" aria-label="Principal">${navHTML}</nav>
        <a href="sesion-norte.html" class="btn btn--gold btn--sm">${ctaText} <span class="arr">→</span></a>
        <button class="burger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </header>
    <nav class="mnav" aria-label="Menú móvil">
      ${links.map(([h, t, k], i) => `<a href="${h}" style="transition-delay:${.15 + i * .06}s"${k === page ? ' class="active"' : ''}>${t}</a>`).join('')}
      <a href="sesion-norte.html" class="btn btn--gold">Sesión Norte <span class="arr">→</span></a>
      <img class="mnav__ring" src="${fig('fullcolor')}" alt="">
    </nav>`);

  const ico = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg>',
  };
  const socials = `<div class="socials"><a href="#" aria-label="Instagram">${ico.ig}</a><a href="#" aria-label="LinkedIn">${ico.in}</a><a href="#" aria-label="Facebook">${ico.fb}</a></div>`;
  // Logotipo Brandtonic redibujado en SVG (trazos finos, A sin travesaño con remate curvo)
  const brandtonic = `<svg class="brandtonic" viewBox="-4 -4 680 108" role="img" aria-label="Brandtonic" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter">
      <path d="M6 2V98M6 2H30C54 2 54 48 30 48H6M6 48H34C64 48 64 98 34 98H6"/>
      <path d="M72 2V98M72 2H94C118 2 118 50 94 50H72M92 50L126 98"/>
      <path d="M152 2L128 88M152 2L186 98M114 78C132 104 164 106 180 86"/>
      <path d="M196 98V2L248 98V2"/>
      <path d="M262 2V98H282C334 98 334 2 282 2H262"/>
      <path d="M322 2H392M357 2V98"/>
      <ellipse cx="433" cy="50" rx="41" ry="48"/>
      <path d="M490 98V2L544 98V2"/>
      <path d="M568 2V98"/>
      <path d="M668 20C654 -2 598 -4 598 50C598 104 654 102 668 80"/>
    </svg>`;
  const sinergia = `<p class="sinergia">EN SINERGIA CON ${brandtonic}</p>`;
  const isContact = page === 'contacto';

  body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer__brand reveal">${logo()}<p class="footer__tag">Estrategia. Dirección. Crecimiento.</p></div>
        <div class="footer__cols">
          <div class="reveal" style="--d:.05s"><p>Atención presencial en<br><b>Veracruz</b> y <b>Xalapa</b></p><p>Atención remota en <b>todo México</b></p></div>
          <div class="footer__contact reveal" style="--d:.12s">
            ${isContact ? sinergia.replace('EN SINERGIA CON', '<i>En sinergia con</i>') : ''}
            <a href="mailto:hola@borealmarketing.mx"><span class="ic">${ico.mail}</span>hola@borealmarketing.mx</a>
            <a href="https://wa.me/522291445559" target="_blank" rel="noopener"><span class="ic">${ico.wa}</span>(229) 144 5559</a>
            ${socials}
          </div>
          <div class="reveal" style="--d:.2s"><p><b>Boreal Marketing Digital</b></p>${isContact ? '' : sinergia}<p><i style="font-size:13px">Todos los derechos reservados</i></p></div>
        </div>
        <nav class="footer__nav" aria-label="Pie">${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
        <p class="footer__legal"><a href="assets/legal/aviso-de-privacidad.pdf" target="_blank" rel="noopener">Aviso de privacidad</a> <a href="assets/legal/politica-de-cookies.pdf" target="_blank" rel="noopener">Política de cookies</a> · © ${new Date().getFullYear()}</p>
      </div>
    </footer>`);

  $$('[data-logo]').forEach(el => { el.innerHTML = logoSVG(); });

  /* ---------- Cortina / transición entre páginas ---------- */
  const firstVisit = !sessionStorageSafe('get', 'boreal-visited');
  if (!firstVisit && !sessionStorageSafe('get', 'boreal-leaving')) body.classList.add('no-curtain');
  sessionStorageSafe('set', 'boreal-visited', '1');
  sessionStorageSafe('del', 'boreal-leaving');
  const reveal = () => { body.classList.add('loaded'); void body.offsetWidth; setTimeout(() => body.classList.remove('no-curtain'), 30); };
  // abre la cortina en cuanto las tipografías están listas (sin esperar todas las imágenes)
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 1200))]).then(() => setTimeout(reveal, firstVisit ? 450 : 50));
  addEventListener('pageshow', e => { if (e.persisted) { body.classList.remove('leaving'); body.classList.add('loaded'); } });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname && url.hash) { closeMenu(); return; }
    e.preventDefault();
    closeMenu();
    if (reduce) { location.href = url.href; return; }
    sessionStorageSafe('set', 'boreal-leaving', '1');
    body.classList.remove('loaded');
    body.classList.add('leaving');
    setTimeout(() => { location.href = url.href; }, 900);
  });

  function sessionStorageSafe(op, k, v) {
    try {
      if (op === 'get') return sessionStorage.getItem(k);
      if (op === 'set') sessionStorage.setItem(k, v);
      if (op === 'del') sessionStorage.removeItem(k);
    } catch (_) { return null; }
  }

  /* ---------- Menú móvil ---------- */
  const burger = $('.burger');
  function closeMenu() { body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

  /* ---------- Header + barra de progreso + parallax ---------- */
  const header = $('.header'), bar = $('.progress');
  const par = $$('[data-speed]');
  let lastY = scrollY, ticking = false;
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 30);
    header.classList.toggle('hidden', y > 400 && y > lastY && !body.classList.contains('menu-open'));
    lastY = y;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (!reduce) par.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const c = (r.top + r.height / 2 - innerHeight / 2);
      el.style.translate = `0 ${(-c * parseFloat(el.dataset.speed)).toFixed(1)}px`;
    });
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- Movimiento con el ratón (figuras) ---------- */
  const mouseEls = $$('[data-mouse]');
  if (!reduce && matchMedia('(pointer:fine)').matches && mouseEls.length) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
    (function loop() {
      cx += (mx - cx) * .06; cy += (my - cy) * .06;
      mouseEls.forEach(el => { const k = parseFloat(el.dataset.mouse); el.style.transform = `translate3d(${cx * k}px,${cy * k}px,0)`; });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Titulares divididos en palabras ---------- */
  $$('.split').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  });

  /* ---------- Reveal al hacer scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; el.classList.add('in'); io.unobserve(el);
      // al terminar, se liberan las clases para que las transiciones propias (hover) funcionen
      if (el.classList.contains('reveal')) setTimeout(() => el.classList.remove('reveal', 'reveal--left', 'reveal--right', 'reveal--scale', 'reveal--clip'), 1600 + (parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0) * 1000);
    });
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  const watch = () => $$('.reveal,.split,.ticks').forEach(el => io.observe(el));
  // espera a que la cortina se abra para que las animaciones del hero se vean
  setTimeout(watch, body.classList.contains('no-curtain') ? 50 : 450);
  $$('.ticks li').forEach((li, i) => li.style.setProperty('--i', i));

  /* ---------- Contadores ---------- */
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, fmt = n => n.toLocaleString('es-MX');
    const o = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return; o.disconnect();
      if (reduce) { el.textContent = fmt(end); return; }
      const t0 = performance.now(), d = 1600;
      (function tick(t) {
        const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(end * e));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: .6 });
    o.observe(el);
  });

  /* ---------- Acordeones ---------- */
  $$('.acc').forEach(acc => {
    acc.addEventListener('click', e => {
      const q = e.target.closest('.acc__q'); if (!q) return;
      const item = q.parentElement, open = !item.classList.contains('open');
      if (acc.dataset.single !== undefined) $$('.acc__item', acc).forEach(i => { i.classList.remove('open'); $('.acc__q', i).setAttribute('aria-expanded', 'false'); });
      item.classList.toggle('open', open); q.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- Slider de pilares ---------- */
  $$('[data-slider]').forEach(sl => {
    const slides = $$('.pillar', sl), dots = $('.dots', sl);
    let i = 0, timer;
    slides.forEach((_, k) => dots.insertAdjacentHTML('beforeend', `<button aria-label="Ver ${k + 1}"></button>`));
    const btns = $$('button', dots);
    const go = k => {
      const len = slides.length; i = (k + len) % len;
      slides.forEach((s, n) => {
        const d = (n - i + len) % len; // 0 activo, 1 siguiente (derecha), len-1 anterior (izquierda)
        const set = () => { s.classList.toggle('active', d === 0); s.classList.toggle('next', d === 1); s.classList.toggle('prev', d === len - 1); };
        // el que brinca de un lado al otro no cruza por el centro: se desvanece y reaparece
        const wraps = (s.classList.contains('prev') && d === 1) || (s.classList.contains('next') && d === len - 1);
        if (!wraps) return set();
        s.classList.add('fading');
        setTimeout(() => { s.style.transition = 'none'; set(); void s.offsetWidth; s.style.transition = ''; s.classList.remove('fading'); }, 380);
      });
      btns.forEach((b, n) => b.classList.toggle('active', n === i));
    };
    slides.forEach((s, n) => s.addEventListener('click', () => { if (n !== i) { go(n); play(); } }));
    const play = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 4200); };
    btns.forEach((b, k) => b.addEventListener('click', () => { go(k); play(); }));
    let sx = null;
    sl.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    sl.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); play(); } sx = null; });
    go(+sl.dataset.start || 0); play();
  });

  /* ---------- Slider de testimonios (sin bucle: flechas según la posición) ---------- */
  document.querySelectorAll('[data-tslider]').forEach(sl => {
    const track = sl.querySelector('.quote__track'), slides = [...sl.querySelectorAll('.quote__slide')];
    const prev = sl.querySelector('.quote__arrow--prev'), next = sl.querySelector('.quote__arrow--next'), dots = sl.querySelector('.quote__dots');
    let i = 0;
    slides.forEach((_, k) => dots.insertAdjacentHTML('beforeend', `<button aria-label="Testimonio ${k + 1}"></button>`));
    const btns = [...dots.querySelectorAll('button')];
    const go = k => {
      i = Math.max(0, Math.min(slides.length - 1, k));
      track.style.transform = `translateX(${-i * 100}%)`;
      prev.hidden = i === 0;                   // primero: sin flecha izquierda
      next.hidden = i === slides.length - 1;   // último: sin flecha derecha
      btns.forEach((b, n) => b.classList.toggle('active', n === i));
      slides.forEach((s, n) => s.setAttribute('aria-hidden', n !== i));
    };
    prev.addEventListener('click', () => go(i - 1));
    next.addEventListener('click', () => go(i + 1));
    btns.forEach((b, k) => b.addEventListener('click', () => go(k)));
    let sx = null;
    track.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); sx = null; });
    go(0);
  });

  /* ---------- Aro de "Servicios" (Home): al llegar a media pantalla baja con el scroll,
     se queda enmarcando los dots durante los 3 servicios y se va con la sección; al subir vuelve a su lugar ---------- */
  (() => {
    const ring = document.querySelector('.svc-intro__ring'), wrap = document.querySelector('.svc-scroll');
    if (!ring || !wrap || reduce) return;
    const mq = matchMedia('(max-width: 820px)');
    let s0 = 0, max = 0;
    const measure = () => {
      ring.style.translate = '';
      if (mq.matches) return;
      const r = ring.getBoundingClientRect();
      const center = r.top + scrollY + r.height / 2;                 // centro del aro en el documento
      const wrapTop = wrap.getBoundingClientRect().top + scrollY;
      const run = wrap.offsetHeight - innerHeight;                   // tramo en que los servicios están fijos
      s0 = center - innerHeight / 2;                                 // el aro llega a media pantalla
      max = Math.max(0, wrapTop + run - s0);                         // se suelta cuando termina el bloque fijo
    };
    const update = () => {
      if (mq.matches) return;
      const t = Math.min(max, Math.max(0, scrollY - s0));
      ring.style.translate = t ? `0 ${t.toFixed(1)}px` : '';
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', () => { measure(); update(); });
    addEventListener('load', () => { measure(); update(); });
    measure(); update();
  })();

  /* ---------- Servicios guiados por scroll ---------- */
  $$('.svc-scroll').forEach(wrap => {
    const items = $$('.svc-item', wrap), prism = $('.svc-prism', wrap), dotsNav = $('.svc-dots', wrap);
    const n = items.length;
    items.forEach((it, k) => dotsNav.insertAdjacentHTML('beforeend', `<button aria-label="Ver servicio ${k + 1}"></button>`));
    const dots = $$('button', dotsNav);
    let current = -1;
    const progress = () => {
      const r = wrap.getBoundingClientRect(), run = r.height - innerHeight;
      return run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 1;
    };
    const update = () => {
      const r = wrap.getBoundingClientRect();
      // antes de fijarse, el primer servicio aparece al entrar en pantalla
      const entered = r.top < innerHeight * .55;
      const step = entered ? Math.min(n - 1, Math.floor(progress() * n)) : -1;
      if (step === current) return;
      current = step;
      items.forEach((it, k) => { it.classList.toggle('shown', k <= step); it.classList.toggle('active', k === step); });
      prism?.classList.toggle('shown', step === n - 1);
      dots.forEach((d, k) => d.classList.toggle('active', k === Math.max(0, step)));
    };
    dots.forEach((d, k) => d.addEventListener('click', () => {
      const run = wrap.offsetHeight - innerHeight;
      const top = wrap.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + run * ((k + .5) / n), behavior: reduce ? 'auto' : 'smooth' });
    }));
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  });

  /* ---------- Tarjeta con inclinación 3D ---------- */
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
    $$('.icard').forEach(el => el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  }

  /* ---------- Quiz Sesión Norte ---------- */
  const modal = $('#quiz');
  function closeModal() { if (modal) { modal.classList.remove('open'); body.style.overflow = ''; } }
  if (modal) {
    const Q = [
      { q: '¿En qué etapa está tu marca?', o: [['Tengo una idea o producto por lanzar', 'l'], ['Mi negocio funciona, pero el marketing está disperso', 'n'], ['Tengo equipo y quiero dirección senior', 'm']] },
      { q: '¿Qué te falta hoy?', o: [['Claridad: no sé cuál es el siguiente paso', 'n'], ['Una base estratégica sólida (oferta, mensaje, buyer)', 'b'], ['Ejecución coordinada de un lanzamiento', 'l']] },
      { q: '¿Cómo prefieres avanzar?', o: [['Una sesión enfocada de 90 minutos', 'n'], ['Acompañamiento con sesiones periódicas', 'm'], ['Que Boreal lidere el proyecto integral', 'l']] },
    ];
    const R = {
      n: ['Sesión Norte', 'Necesitas claridad antes de invertir. En 90 minutos ordenamos prioridades y trazamos tu ruta de 30 días.', 'sesion-norte.html', 'Pagar y agendar Sesión Norte', '2'],
      b: ['Blueprint Boreal', 'Tu marca necesita una base estratégica sólida. Empezamos con la Sesión Norte y construimos tu blueprint en 2 a 3 semanas.', 'servicios.html#blueprint', 'Conocer Blueprint Boreal', '1'],
      l: ['Lanzamiento Integral', 'Estás listo para salir al mercado con todo. El primer paso obligatorio es la Sesión Norte.', 'servicios.html#lanzamiento', 'Ver Lanzamiento Integral', '3'],
      m: ['Mentorías personalizadas', 'Tu equipo puede ejecutar; necesitas dirección senior y control de calidad.', 'servicios.html#mentorias', 'Ver Mentorías', '4'],
    };
    const box = $('.quiz', modal);
    let step = 0, votes = [];
    const render = () => {
      if (step < Q.length) {
        const s = Q[step];
        box.innerHTML = `<span class="eyebrow">Pregunta ${step + 1} de ${Q.length}</span><div class="quiz__bar"><i style="width:${(step / Q.length) * 100}%"></i></div>
          <div class="quiz__step"><h3 id="quiz-t">${s.q}</h3><div class="quiz__opts">${s.o.map(([t, v]) => `<button data-v="${v}">${t}</button>`).join('')}</div></div>`;
        requestAnimationFrame(() => { const i = $('.quiz__bar i', box); if (i) i.style.width = `${((step + .35) / Q.length) * 100}%`; });
      } else {
        const tally = votes.reduce((a, v) => (a[v] = (a[v] || 0) + 1, a), {});
        const best = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
        const [t, d, h, c, f] = R[best];
        box.innerHTML = `<div class="quiz__res quiz__step"><img src="${fig(f)}" alt=""><span class="eyebrow">Te recomendamos</span><h3 id="quiz-t">${t}</h3><p>${d}</p>
          <a class="btn btn--gold" href="${h}">${c} <span class="arr">→</span></a><p style="margin-top:14px"><button class="link" data-restart>Volver a empezar</button></p></div>`;
      }
    };
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-v]');
      if (b) { votes.push(b.dataset.v); step++; render(); }
      if (e.target.closest('[data-restart]')) { step = 0; votes = []; render(); }
      if (e.target.closest('a')) closeModal();
    });
    $$('[data-quiz]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); step = 0; votes = []; render(); modal.classList.add('open'); body.style.overflow = 'hidden'; setTimeout(() => $('.quiz button', modal)?.focus(), 300); }));
    $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
  }

  /* ---------- Formulario de contacto ---------- */
  const form = $('#contact-form');
  if (form) {
    const sel = $('.select', form), sbtn = $('.select__btn', sel), hidden = $('input[name=servicio]', form);
    sbtn.addEventListener('click', () => { const o = sel.classList.toggle('open'); sbtn.setAttribute('aria-expanded', o); });
    $$('li', sel).forEach(li => li.addEventListener('click', () => {
      $$('li', sel).forEach(x => x.setAttribute('aria-selected', 'false'));
      li.setAttribute('aria-selected', 'true'); $('span', sbtn).textContent = li.textContent; hidden.value = li.textContent;
      sel.classList.remove('open'); sbtn.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => { if (!sel.contains(e.target)) sel.classList.remove('open'); });
    const params = new URLSearchParams(location.search).get('servicio');
    if (params) { const li = $$('li', sel).find(l => l.dataset.k === params); li?.click(); }

    const rules = {
      nombre: v => v.trim().length > 2 || 'Escribe tu nombre completo',
      correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Escribe un correo válido',
      celular: v => v.replace(/\D/g, '').length >= 10 || 'Escribe un número de 10 dígitos',
    };
    const check = inp => {
      const r = rules[inp.name]; if (!r) return true;
      const ok = r(inp.value), f = inp.closest('.field');
      f.classList.toggle('err', ok !== true); $('.msg', f).textContent = ok === true ? '' : ok;
      return ok === true;
    };
    $$('input', form).forEach(i => i.addEventListener('blur', () => i.value && check(i)));
    // el botón de enviar solo se activa si aceptaron el aviso de privacidad
    const priv = $('#priv'), submit = $('button[type=submit]', form), errBox = $('.form__error', form);
    const sync = () => { submit.disabled = !priv.checked; if (priv.checked) priv.closest('.chk').classList.remove('err'); };
    priv.addEventListener('change', sync); sync();
    $('input[name=t]', form).value = Math.floor(Date.now() / 1000);

    form.addEventListener('submit', async e => {
      e.preventDefault();
      errBox.hidden = true;
      const okFields = $$('input[name]', form).filter(i => i.type !== 'hidden' && i.name !== 'sitio_web').map(check).every(Boolean);
      priv.closest('.chk').classList.toggle('err', !priv.checked);
      if (!okFields || !priv.checked) return;
      const label = submit.innerHTML;
      submit.disabled = true; form.classList.add('sending'); submit.innerHTML = 'Enviando…';
      try {
        const res = await fetch(form.getAttribute('action'), { method: 'POST', body: new FormData(form), headers: { 'X-Requested-With': 'fetch' } });
        const data = await res.json().catch(() => ({ ok: false, message: 'Respuesta inesperada del servidor.' }));
        if (!res.ok || !data.ok) throw new Error(data.message || 'No pudimos enviar tu solicitud.');
        form.classList.add('sent');
      } catch (err) {
        errBox.textContent = (err && err.message && !/fetch|network/i.test(err.message)) ? err.message : 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a hola@borealmarketing.mx.';
        errBox.hidden = false;
      } finally {
        form.classList.remove('sending'); submit.innerHTML = label; sync();
      }
    });
    $('[data-reset]', form)?.addEventListener('click', () => { form.reset(); form.classList.remove('sent'); sync(); $('input[name=t]', form).value = Math.floor(Date.now() / 1000); });
  }
})();
