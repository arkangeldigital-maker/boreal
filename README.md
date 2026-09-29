# Boreal · Marketing Digital

Sitio web estático de Boreal (Home, Servicios, Borealízate, Proyectos, Sesión Norte y Contacto).

- `index.html`, `servicios.html`, `borealizate.html`, `sesion-norte.html`, `contacto.html`
- `css/styles.css` — estilos
- `js/main.js` — menú, footer, animaciones, sliders, quiz y formulario
- `assets/` — fuentes, figuras 3D e imágenes optimizadas

Para verlo en local:

```bash
npx http-server . -p 5178
```

Pendiente antes de publicar: completar o quitar los 4 testimonios marcados como `[Testimonio del cliente]` en `index.html` y `sesion-norte.html`.

## Formulario de contacto

`contacto.php` recibe el formulario (AJAX desde `js/main.js`) y envía un correo a **angelcobos@outlook.com** usando `mail()` de PHP.
Solo hay que subirlo al hosting junto con el sitio (el hosting debe tener PHP, como la mayoría de los compartidos).

- El destinatario se cambia en la constante `DESTINO` al inicio de `contacto.php`.
- El botón "Enviar solicitud" solo se activa al marcar "He leído y aceptado la política de privacidad".
- Incluye validación en servidor y protección básica contra spam (campo trampa y tiempo mínimo de llenado).
- Si los correos llegan a "No deseado" en Outlook, configura en el hosting un buzón `no-reply@tudominio` (o SPF/DKIM del dominio).
