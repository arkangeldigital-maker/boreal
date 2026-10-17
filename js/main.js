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
    ['./', 'Home', 'home'],
    ['servicios', 'Servicios', 'servicios'],
    ['borealizate', 'Borealízate', 'borealizate'],
    ['proyectos', 'Proyectos', 'proyectos'],
    ['contacto', 'Contacto', 'contacto'],
  ];
  const navHTML = links.map(([h, t, k]) => `<a href="${h}"${k === page ? ' class="active" aria-current="page"' : ''}>${t}</a>`).join('');
  const ctaText = page === 'sesion' ? 'Agenda una Sesión Norte' : 'Sesión Norte';
  // Logotipo Boreal: trazos del SVG oficial (boreal-text.svg), en currentColor para respetar el color de cada página.
  // ringO = sustituye la "o" por el aro 3D girando (loader). El segundo parámetro ya no se usa (era el grosor del trazo).
  const LOGO = {
    b: 'M101.942,136.31c14.155,0,27.417,2.643,39.773,7.916c12.358,5.279,23.169,12.55,32.437,21.816 c9.267,9.269,16.537,20.081,21.817,32.437c5.273,12.356,7.915,25.618,7.915,39.773c0,14.161-2.642,27.416-7.915,39.773 c-5.28,12.356-12.55,23.169-21.817,32.436c-9.268,9.269-20.079,16.544-32.437,21.817c-12.356,5.279-25.618,7.917-39.773,7.917 c-14.161,0-27.416-2.638-39.772-7.917c-12.357-5.273-23.169-12.549-32.437-21.817c-9.267-9.267-16.544-20.079-21.817-32.436 C2.636,265.668,0,252.413,0,238.252v-0.386V0h39.773l-0.387,157.548c8.75-6.691,18.403-11.904,28.962-15.639 C78.9,138.18,90.099,136.31,101.942,136.31 M102.135,300.421c8.465,0,16.485-1.604,24.057-4.826 c7.572-3.217,14.178-7.656,19.826-13.322c5.647-5.66,10.069-12.291,13.279-19.887c3.21-7.591,4.815-15.638,4.815-24.134 c0-8.495-1.605-16.538-4.815-24.135c-3.21-7.589-7.632-14.22-13.279-19.887c-5.648-5.658-12.254-10.099-19.826-13.32 c-7.572-3.217-15.592-4.828-24.057-4.828c-8.47,0-16.496,1.611-24.062,4.828c-7.572,3.222-14.178,7.662-19.825,13.32 c-5.648,5.667-10.137,12.23-13.473,19.694c-3.337,7.47-5.002,15.445-5.002,23.941v0.386c0,8.496,1.665,16.543,5.002,24.134 c3.336,7.596,7.825,14.227,13.473,19.887c5.647,5.666,12.253,10.105,19.825,13.322C85.639,298.817,93.665,300.421,102.135,300.421',
    o: 'M366.836,135.923c14.154,0,27.416,2.644,39.772,7.917c12.358,5.278,23.169,12.549,32.437,21.817 c9.267,9.267,16.537,20.079,21.817,32.435c5.273,12.358,7.916,25.62,7.916,39.774c0,14.16-2.643,27.415-7.916,39.772 c-5.28,12.356-12.55,23.168-21.817,32.438c-9.268,9.267-20.079,16.544-32.437,21.816c-12.356,5.28-25.618,7.916-39.772,7.916 c-14.162,0-27.417-2.636-39.773-7.916c-12.356-5.272-23.169-12.55-32.437-21.816c-9.267-9.27-16.544-20.081-21.817-32.438 c-5.28-12.357-7.915-25.612-7.915-39.772c0-14.154,2.635-27.416,7.915-39.774c5.273-12.355,12.55-23.168,21.817-32.435 c9.268-9.269,20.081-16.539,32.437-21.817C339.419,138.566,352.674,135.923,366.836,135.923 M367.028,300.035 c8.465,0,16.485-1.604,24.057-4.827c7.572-3.215,14.178-7.656,19.826-13.322c5.647-5.658,10.07-12.289,13.279-19.887 c3.21-7.589,4.815-15.638,4.815-24.133c0-8.496-1.605-16.539-4.815-24.135c-3.209-7.59-7.632-14.221-13.279-19.886 c-5.648-5.66-12.254-10.101-19.826-13.322c-7.572-3.216-15.592-4.828-24.057-4.828c-8.47,0-16.496,1.612-24.062,4.828 c-7.572,3.222-14.178,7.662-19.825,13.322c-5.648,5.665-10.137,12.296-13.473,19.886c-3.337,7.596-5.002,15.639-5.002,24.135 c0,8.495,1.665,16.544,5.002,24.133c3.336,7.598,7.825,14.229,13.473,19.887c5.647,5.666,12.253,10.107,19.825,13.322 C350.532,298.431,358.558,300.035,367.028,300.035',
    r: 'M666.866,151.128c8.748,5.719,16.218,12.87,22.396,21.442l-22.396,17.799l-8.495,6.951 c-4.38-6.433-10.107-11.584-17.183-15.445c-7.083-3.861-14.741-5.793-22.976-5.793c-6.698,0-13.003,1.291-18.922,3.862 c-5.924,2.576-11.071,6.051-15.445,10.425c-4.381,4.381-7.855,9.528-10.426,15.446c-2.577,5.925-3.862,12.229-3.862,18.921v73.368 v41.317h-39.772V224.52v-88.21h39.772v14.818c6.952-4.676,14.54-8.314,22.782-10.915c8.237-2.6,16.859-3.903,25.873-3.903 c9.007,0,17.629,1.304,25.871,3.903C652.32,142.813,659.915,146.452,666.866,151.128',
    e: 'M846.805,251.382h-77.614c1.544,6.95,4.182,13.454,7.916,19.499c3.729,6.052,8.302,11.265,13.707,15.64 c5.407,4.381,11.451,7.788,18.15,10.233c6.691,2.449,13.768,3.667,21.237,3.667c9.009,0,17.437-1.797,25.293-5.405 c7.849-3.603,14.733-8.622,20.659-15.061h7.336h39.387c-1.544,3.861-3.415,7.53-5.599,11.007c-2.19,3.474-4.573,6.89-7.144,10.232 c-9.267,11.844-20.853,21.305-34.753,28.381c-13.901,7.083-28.962,10.62-45.18,10.62c-14.161,0-27.416-2.638-39.772-7.917 c-12.356-5.273-23.169-12.549-32.437-21.817c-9.267-9.267-16.544-20.079-21.817-32.437c-5.279-12.356-7.916-25.611-7.916-39.772 c0-14.155,2.637-27.417,7.916-39.774c5.273-12.354,12.551-23.167,21.817-32.436c9.268-9.267,20.08-16.537,32.437-21.816 c12.356-5.273,25.611-7.916,39.772-7.916c16.218,0,31.278,3.542,45.18,10.618c13.9,7.085,25.486,16.671,34.753,28.768 c8.494,10.3,14.674,22.396,18.535,36.299c2.317,8.241,3.475,16.991,3.475,26.258c0,4.633-0.386,9.015-1.157,13.13h-40.16H846.805z M830.202,176.082c-12.615,0-23.881,3.253-33.788,9.744c-9.913,6.492-17.443,15.09-22.589,25.782h89.973h22.781 c-1.29-2.033-2.51-4.067-3.669-6.105c-1.157-2.04-2.382-3.953-3.667-5.739c-5.926-7.385-13.13-13.177-21.624-17.377 C849.124,178.188,839.983,176.082,830.202,176.082',
    a: 'M1090.268,136.31c14.132,0,27.422,2.703,39.888,8.109c12.465,5.405,23.387,12.742,32.762,22.01 c9.375,9.267,16.768,20.213,22.162,32.822c5.393,12.617,8.096,26.005,8.096,40.159v100.012h-39.773v-18.716 c-8.754,6.631-18.407,11.856-28.961,15.682c-10.559,3.824-21.883,5.738-33.979,5.738c-14.161,0-27.483-2.704-39.967-8.109 c-12.488-5.407-23.361-12.743-32.63-22.01c-9.267-9.269-16.604-20.142-22.01-32.63c-5.406-12.483-8.109-25.806-8.109-39.967 c0-14.154,2.697-27.542,8.091-40.159c5.395-12.609,12.72-23.556,21.968-32.822c9.25-9.268,20.104-16.604,32.57-22.01 C1062.839,139.013,1076.137,136.31,1090.268,136.31 M1090.461,302.352c8.748,0,16.924-1.683,24.52-5.05 c7.591-3.366,14.222-7.898,19.887-13.598c5.659-5.697,10.167-12.369,13.515-20.009c3.343-7.639,5.02-15.735,5.02-24.285 c0-8.802-1.677-17.026-5.02-24.665c-3.348-7.638-7.855-14.311-13.515-20.013c-5.665-5.694-12.296-10.232-19.887-13.601 c-7.596-3.365-15.771-5.05-24.52-5.05c-8.755,0-16.931,1.685-24.521,5.05c-7.596,3.368-14.227,7.906-19.887,13.601 c-5.664,5.702-10.172,12.375-13.515,20.013c-3.349,7.639-5.021,15.863-5.021,24.665c0,8.55,1.672,16.646,5.021,24.285 c3.343,7.64,7.851,14.312,13.515,20.009c5.66,5.699,12.291,10.231,19.887,13.598 C1073.531,300.669,1081.707,302.352,1090.461,302.352',
  };
  const logoSVG = (mr = 'MR', _w, ringO = false) => {
    const ringSize = 2 * 101.9 / 0.95; // aro-centrado.webp: el aro ocupa ~95% y su centro es el de la imagen
    const o = ringO
      ? `<image class="logo-ring" href="${fig('aro-centrado')}" x="${366.8 - ringSize / 2}" y="${237.9 - ringSize / 2}" width="${ringSize}" height="${ringSize}"/>`
      : `<path d="${LOGO.o}"/>`;
    return `<svg class="logo-svg" viewBox="-4 -7 1464 352" role="img" aria-label="Boreal" fill="currentColor" overflow="visible">
      ${ringO ? '<defs><filter id="logo-thin"><feMorphology operator="erode" radius="7"/></filter></defs>' : ''}
      <g${ringO ? ' filter="url(#logo-thin)"' : ''}><path d="${LOGO.b}"/>${ringO ? '' : o}<path d="${LOGO.r}"/><path d="${LOGO.e}"/><path class="logo-a" d="${LOGO.a}"/>
      <rect x="1260.745" y="0.772" width="39.773" height="337.104"/></g>${ringO ? o : ''}
      ${mr ? `<text x="1364" y="37" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="50">${mr}</text>` : ''}
    </svg>`;
  };
  const logo = () => `<a href="./" class="logo" aria-label="Boreal, inicio">${logoSVG()}</a>`;

  body.insertAdjacentHTML('afterbegin', `
    <div class="curtain" aria-hidden="true">
      <div class="curtain__panel"></div><div class="curtain__panel"></div><div class="curtain__panel"></div>
      <div class="curtain__logo">${logoSVG('', 0, true)}</div>
    </div>
    <div class="progress" aria-hidden="true"></div>
    <header class="header">
      <div class="container header__in">
        ${logo()}
        <nav class="nav" aria-label="Principal">${navHTML}</nav>
        <a href="sesion-norte" class="btn btn--gold btn--sm">${ctaText} <span class="arr">→</span></a>
        <button class="burger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </header>
    <nav class="mnav" aria-label="Menú móvil">
      ${links.map(([h, t, k], i) => `<a href="${h}" style="transition-delay:${.15 + i * .06}s"${k === page ? ' class="active"' : ''}>${t}</a>`).join('')}
      <a href="sesion-norte" class="btn btn--gold">Sesión Norte <span class="arr">→</span></a>
      <img class="mnav__ring" src="${fig('fullcolor')}" alt="">
    </nav>`);

  const ico = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg>',
  };
  const socials = `<div class="socials"><a href="https://www.instagram.com/borealmd/" target="_blank" rel="noopener" aria-label="Instagram">${ico.ig}</a><a href="https://www.linkedin.com/company/boreal-marketing-digital/" target="_blank" rel="noopener" aria-label="LinkedIn">${ico.in}</a><a href="https://www.facebook.com/borealmarketingdigital" target="_blank" rel="noopener" aria-label="Facebook">${ico.fb}</a></div>`;
  // Logotipo Brandtonic redibujado en SVG (trazos finos, A sin travesaño con remate curvo)
  // Logo de Brandtonic (tomado de brandtonic.mx), en blanco
  const brandtonic = `<img class="brandtonic" src="${fig('brandtonic')}" alt="Brandtonic Estudio" width="257" height="73">`;
  const sinergia = `<p class="sinergia">EN SINERGIA CON <a class="brandtonic-link" href="https://www.instagram.com/brandtonicestudio/" target="_blank" rel="noopener" aria-label="Brandtonic en Instagram">${brandtonic}</a></p>`;
  const isContact = page === 'contacto';

  body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer__cols">
          <div class="reveal" style="--d:.05s"><p>Atención presencial en<br><b>Veracruz</b> y <b>Xalapa</b></p><p>Atención remota en <b>todo México</b></p></div>
          <div class="footer__contact reveal" style="--d:.12s">
            ${isContact ? sinergia.replace('EN SINERGIA CON', '<i>En sinergia con</i>') : ''}
            <a href="mailto:hola@borealmarketing.mx"><span class="ic">${ico.mail}</span>hola@borealmarketing.mx</a>
            <a href="https://wa.me/522291445559" target="_blank" rel="noopener"><span class="ic">${ico.wa}</span>(229) 144 55 59</a>
            ${socials}
          </div>
          <div class="footer__brand reveal" style="--d:.2s">${logo()}${isContact ? '' : sinergia}</div>
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
    // Mientras acompaña al scroll va en position:fixed (lo mueve el navegador, sin brincos);
    // un hueco del mismo tamaño guarda su lugar en la fila para que el texto no se recorra
    const ph = document.createElement('div');
    ph.className = 'svc-intro__ph'; ph.hidden = true;
    ring.after(ph);
    let s0 = 0, max = 0, left = 0, w = 0, h = 0, dx = 0, mode = '';
    const set = m => {
      if (m === mode) return;
      const prev = mode;
      mode = m;
      const fixed = m === 'fixed';
      ph.hidden = !fixed;
      ring.classList.toggle('is-fixed', fixed && prev === 'before');
      Object.assign(ring.style, fixed
        ? { position: 'fixed', top: `${(innerHeight - h) / 2}px`, left: `${left}px`, width: `${w}px`, margin: '0', translate: '' }
        : { position: '', top: '', left: '', width: '', margin: '', translate: m === 'after' ? `${dx.toFixed(1)}px ${max.toFixed(1)}px` : '' });
      // celular: entra centrado y, ya fijo, se desliza a la derecha para enmarcar los dots;
      // si viene de abajo ya está a la derecha; al volver arriba regresa al centro deslizándose
      if (fixed && dx) {
        if (prev === 'after') ring.style.left = `${left + dx}px`;
        else requestAnimationFrame(() => { if (mode === 'fixed') ring.style.left = `${left + dx}px`; });
      }
      if (m === 'before' && prev === 'fixed' && dx) {
        ring.style.transition = 'none'; ring.style.translate = `${dx}px 0`;
        requestAnimationFrame(() => requestAnimationFrame(() => { if (mode !== 'before') return; ring.style.transition = 'translate .9s cubic-bezier(.45,0,.25,1)'; ring.style.translate = ''; }));
      } else if (m !== 'before') ring.style.transition = '';
    };
    const measure = () => {
      mode = ''; set('before');
      // medidas sin la escala de la animación de entrada (reveal--scale)
      const r = ring.getBoundingClientRect();
      w = ring.offsetWidth; h = ring.offsetHeight;
      left = r.left + (r.width - w) / 2 - (parseFloat(getComputedStyle(ring).translate.split(' ')[0]) || 0);
      ph.style.cssText = `width:${w}px;height:${h}px`;
      const center = r.top + scrollY + r.height / 2;                 // centro del aro en el documento
      const wrapTop = wrap.getBoundingClientRect().top + scrollY;
      const run = wrap.offsetHeight - innerHeight;                   // tramo en que los servicios están fijos
      s0 = center - innerHeight / 2;                                 // el aro llega a media pantalla
      max = Math.max(0, wrapTop + run - s0);                         // se suelta cuando termina el bloque fijo
      // en celular sigue bajando hasta toparse con "De la estrategia a la acción"
      const caps = document.querySelector('.caps'), mobile = matchMedia('(max-width: 820px)').matches;
      if (caps && mobile) max = Math.max(0, caps.getBoundingClientRect().top + scrollY - (innerHeight + h) / 2 - 16 - s0);
      const dots = document.querySelector('.svc-dots');
      dx = 0;
      // celular: el aro ya arranca en su lugar (a la derecha) y los dots se acomodan dentro de él, así no se mueve de lado
      // ancho del título para alinearlo a la izquierda en celular
      const h2 = document.querySelector('.svc-intro h2'); if (h2) { const rg = document.createRange(); rg.selectNodeContents(h2); h2.style.setProperty('--h2w', `${rg.getBoundingClientRect().width}px`); }
    };
    const update = () => {
      const t = scrollY - s0;
      set(t <= 0 ? 'before' : t >= max ? 'after' : 'fixed');
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
      // escritorio: la frase dentro del aro se oculta mientras se ven los servicios
      document.querySelector('.svc-intro__ring')?.classList.toggle('txt-off', step >= 0);
      // celular: al entrar a los servicios se oculta la frase verde y "Servicios" se acomoda a la izquierda
      document.querySelector('.svc-intro')?.classList.toggle('is-on', step >= 0);
      wrap.classList.toggle('is-on', step >= 0);
      dots.forEach((d, k) => d.classList.toggle('active', k === Math.max(0, step)));
    };
    dots.forEach((d, k) => d.addEventListener('click', () => {
      const run = wrap.offsetHeight - innerHeight;
      const top = wrap.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + run * ((k + .5) / n), behavior: reduce ? 'auto' : 'smooth' });
    }));
    // El prisma se acomoda justo debajo de "Lanzamiento integral" para no taparlo en ninguna resolución
    const item2 = items[1];
    const placePrism = () => {
      if (!prism || !item2) return;
      if (matchMedia('(max-width: 820px)').matches) { prism.style.top = ''; return; }
      const img = $('img', prism);
      const h = img.offsetHeight || prism.offsetWidth;            // la imagen es cuadrada
      // la parte visible del prisma empieza al ~27% del alto de la imagen; 50px de aire cubren su flotación
      prism.style.top = `${item2.offsetTop + item2.offsetHeight + 50 - h * .27}px`;
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', () => { update(); placePrism(); });
    addEventListener('load', placePrism);
    document.fonts?.ready.then(placePrism);
    placePrism();
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
      n: ['Sesión Norte', 'Necesitas claridad antes de invertir. En 90 minutos ordenamos prioridades y trazamos tu ruta de 30 días.', 'sesion-norte', 'Pagar y agendar Sesión Norte', '2'],
      b: ['Blueprint Boreal', 'Tu marca necesita una base estratégica sólida. Empezamos con la Sesión Norte y construimos tu blueprint en 2 a 3 semanas.', 'servicios#blueprint', 'Conocer Blueprint Boreal', '1'],
      l: ['Lanzamiento Integral', 'Estás listo para salir al mercado con todo. El primer paso obligatorio es la Sesión Norte.', 'servicios#lanzamiento', 'Ver Lanzamiento Integral', '3'],
      m: ['Mentorías personalizadas', 'Tu equipo puede ejecutar; necesitas dirección senior y control de calidad.', 'servicios#mentorias', 'Ver Mentorías', '4'],
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

    // marco oculto donde FormSubmit recibe el envío (se crea desde el inicio para no confundir su carga vacía con la respuesta)
    if (form.dataset.fallback && !document.getElementById('fs-frame')) {
      document.body.append(Object.assign(document.createElement('iframe'), { id: 'fs-frame', name: 'fs-frame', title: 'envío del formulario', hidden: true }));
    }
    // Envío: 1) contacto.php si el hosting tiene PHP; 2) si no (GitHub Pages u otro hosting estático), FormSubmit.co
    const enviar = async fd => {
      const esEstatico = /github\.io$/i.test(location.hostname);
      if (!esEstatico) {
        try {
          const res = await fetch(form.getAttribute('action'), { method: 'POST', body: fd, headers: { 'X-Requested-With': 'fetch' } });
          const data = await res.json().catch(() => null);
          if (data) { if (!res.ok || !data.ok) throw Object.assign(new Error(data.message || 'No pudimos enviar tu solicitud.'), { final: true }); return; }
          // sin JSON = el servidor no ejecutó PHP → se intenta con el respaldo
        } catch (err) { if (err.final) throw err; }
      }
      const destino = form.dataset.fallback;
      if (!destino) throw new Error('No pudimos enviar tu solicitud.');
      // Envío clásico a FormSubmit dentro de un marco oculto (no depende de CORS ni recarga la página)
      const datos = Object.fromEntries(fd);
      await new Promise(resolve => {
        const frame = document.getElementById('fs-frame');
        const f = Object.assign(document.createElement('form'), { method: 'POST', action: destino, target: 'fs-frame', hidden: true });
        const campos = {
          _subject: 'Nueva solicitud desde el sitio de Boreal - ' + (datos.servicio || ''),
          _template: 'table', _captcha: 'false', _honey: datos.sitio_web || '',
          Nombre: datos.nombre, Empresa: datos.empresa || '-', Servicio: datos.servicio,
          email: datos.correo, Celular: datos.celular, Aviso_de_privacidad: 'Aceptado',
        };
        Object.entries(campos).forEach(([k, v]) => f.append(Object.assign(document.createElement('input'), { type: 'hidden', name: k, value: v ?? '' })));
        document.body.append(f);
        const listo = () => { f.remove(); resolve(); };
        frame.addEventListener('load', listo, { once: true });
        setTimeout(listo, 12000);
        f.submit();
      });
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      errBox.hidden = true;
      const okFields = $$('input[name]', form).filter(i => i.type !== 'hidden' && i.name !== 'sitio_web').map(check).every(Boolean);
      priv.closest('.chk').classList.toggle('err', !priv.checked);
      if (!okFields || !priv.checked) return;
      const label = submit.innerHTML;
      submit.disabled = true; form.classList.add('sending'); submit.innerHTML = 'Enviando…';
      try {
        await enviar(new FormData(form));
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
