<?php
/**
 * Boreal · envío del formulario de contacto
 * Recibe el formulario por AJAX (POST) y manda un correo con su contenido.
 * Usa la función mail() del servidor: basta con subir este archivo junto al sitio.
 */

// ---- Configuración ----
const DESTINO = 'hola@borealmarketing.mx';
const ASUNTO  = 'Nueva solicitud desde el sitio de Boreal';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder(int $codigo, bool $ok, string $mensaje): void {
    http_response_code($codigo);
    echo json_encode(['ok' => $ok, 'message' => $mensaje], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, false, 'Método no permitido.');
}

// Anti-spam: campo trampa oculto (los humanos lo dejan vacío) y tiempo mínimo de llenado
if (!empty($_POST['sitio_web'])) {
    responder(200, true, 'Gracias.');
}
$inicio = isset($_POST['t']) ? (int) $_POST['t'] : 0;
if ($inicio > 0 && (time() - $inicio) < 3) {
    responder(400, false, 'Por favor intenta de nuevo.');
}

// Limpieza: quita saltos de línea (evita inyección de cabeceras) y recorta longitud
function limpio(string $campo, int $max = 200): string {
    $v = trim((string) ($_POST[$campo] ?? ''));
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
    return mb_substr(strip_tags($v), 0, $max, 'UTF-8');
}

$nombre   = limpio('nombre', 120);
$empresa  = limpio('empresa', 160);
$servicio = limpio('servicio', 120);
$correo   = limpio('correo', 160);
$celular  = limpio('celular', 40);
$acepto   = ($_POST['acepto'] ?? '') === 'si';

// Validación en servidor (además de la del navegador)
$errores = [];
if (mb_strlen($nombre, 'UTF-8') < 3)                 $errores[] = 'nombre';
if (!filter_var($correo, FILTER_VALIDATE_EMAIL))    $errores[] = 'correo';
if (strlen(preg_replace('/\D/', '', $celular)) < 10) $errores[] = 'celular';
if (!$acepto)                                        $errores[] = 'aviso de privacidad';
if ($errores) {
    responder(422, false, 'Revisa estos campos: ' . implode(', ', $errores) . '.');
}

// Remitente con el dominio del propio sitio (mejora la entrega; Outlook suele rechazar remitentes ajenos)
$host = preg_replace('/^www\./i', '', $_SERVER['HTTP_HOST'] ?? 'borealmarketing.mx');
$host = preg_replace('/:\d+$/', '', $host);
$remitente = 'no-reply@' . $host;

$fecha = date('d/m/Y H:i');
$e = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');

$filas = [
    'Nombre'              => $nombre,
    'Empresa'             => $empresa !== '' ? $empresa : '—',
    'Servicio de interés' => $servicio,
    'Correo'              => $correo,
    'Celular'             => $celular,
    'Aviso de privacidad' => 'Aceptado',
    'Fecha'               => $fecha,
];

// Versión HTML
$html = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#1d1733">'
      . '<div style="background:#221a3d;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">'
      . '<div style="font-size:22px;font-weight:bold">boreal</div>'
      . '<div style="font-size:13px;color:#cfc8e6;margin-top:4px">Nueva solicitud desde el formulario de contacto</div></div>'
      . '<table style="width:100%;border-collapse:collapse;background:#f7f6fb;border-radius:0 0 12px 12px">';
foreach ($filas as $k => $v) {
    $html .= '<tr><td style="padding:12px 24px;font-size:12px;color:#6b5f8a;text-transform:uppercase;letter-spacing:1px;width:40%;border-bottom:1px solid #e7e3f1">'
           . $e($k) . '</td><td style="padding:12px 24px;font-size:15px;border-bottom:1px solid #e7e3f1">' . $e($v) . '</td></tr>';
}
$html .= '</table><p style="font-size:12px;color:#6b5f8a;margin-top:16px">Responde a este correo para contestarle directamente a ' . $e($nombre) . '.</p></div>';

// Versión texto plano
$texto = "Nueva solicitud desde el formulario de contacto\n\n";
foreach ($filas as $k => $v) { $texto .= "$k: $v\n"; }

// Mensaje multiparte (texto + HTML) en UTF-8
$limite = 'b_' . md5(uniqid('', true));
$cabeceras = [
    'MIME-Version: 1.0',
    'From: =?UTF-8?B?' . base64_encode('Boreal · Sitio web') . "?= <{$remitente}>",
    'Reply-To: =?UTF-8?B?' . base64_encode($nombre) . "?= <{$correo}>",
    'X-Mailer: PHP/' . phpversion(),
    "Content-Type: multipart/alternative; boundary=\"{$limite}\"",
];
$cuerpo = "--{$limite}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($texto))
        . "--{$limite}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--{$limite}--";

$asunto = '=?UTF-8?B?' . base64_encode(ASUNTO . ' · ' . $servicio) . '?=';

$enviado = @mail(DESTINO, $asunto, $cuerpo, implode("\r\n", $cabeceras), '-f' . $remitente);

if ($enviado) {
    responder(200, true, '¡Gracias! Recibimos tu solicitud.');
}
responder(500, false, 'No pudimos enviar tu solicitud en este momento. Escríbenos a hola@borealmarketing.mx.');
