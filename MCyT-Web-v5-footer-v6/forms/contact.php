<?php
declare(strict_types=1);
ini_set('display_errors', '0');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Content-Type: text/plain; charset=UTF-8');
function respond(int $status, string $message): void
{
    http_response_code($status);
    echo $message;
    exit;
}
session_name('mcyt_contact');
$cookiePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/forms/contact.php')), '/') . '/';
if (!session_start([
    'cookie_path' => $cookiePath,
    'cookie_httponly' => true,
    'cookie_secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
    'use_only_cookies' => true,
])) {
    respond(503, 'No se pudo iniciar el envío. Intentá más tarde o usá el correo de contacto.');
}
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET' && isset($_GET['token'])) {
    if (empty($_SESSION['contact_token'])) {
        $_SESSION['contact_token'] = bin2hex(random_bytes(32));
    }
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['token' => $_SESSION['contact_token']]);
    exit;
}
if ($method !== 'POST') {
    header('Allow: GET, POST');
    respond(405, 'Usá el formulario de contacto para enviar tu consulta.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    respond(413, 'El mensaje es demasiado extenso.');
}
$token = $_POST['csrf_token'] ?? '';
if (!is_string($token) || empty($_SESSION['contact_token']) || !hash_equals($_SESSION['contact_token'], $token)) {
    respond(403, 'Recargá la página y volvé a intentar el envío.');
}
if (!empty($_POST['website'])) {
    respond(422, 'No se pudo validar el formulario.');
}
$fields = [];
foreach (['name' => 120, 'email' => 254, 'subject' => 180, 'message' => 10000] as $key => $maximum) {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || !preg_match('//u', $value)) {
        respond(422, 'Revisá los datos del formulario.');
    }
    $fields[$key] = trim($value);
    if (preg_match_all('/./us', $fields[$key]) > $maximum) {
        respond(422, 'Revisá los datos del formulario.');
    }
}
if (preg_match_all('/./us', $fields['name']) < 2 || preg_match_all('/./us', $fields['subject']) < 3 || preg_match_all('/./us', $fields['message']) < 10) {
    respond(422, 'Completá nombre, asunto y un mensaje de al menos 10 caracteres.');
}
if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $fields['email'] . $fields['name'] . $fields['subject'])) {
    respond(422, 'Ingresá una dirección de correo válida y revisá nombre y asunto.');
}
$last = (int) ($_SESSION['contact_last_attempt'] ?? 0);
if ($last && time() - $last < 30) {
    respond(429, 'Esperá unos segundos antes de volver a enviar tu consulta.');
}
try {
    define('MCYT_CONTACT_BOOTSTRAPPED', true);
    $config = require __DIR__ . '/config.php';
    if (empty($config['recipient']) || empty($config['sender'])) {
        respond(503, 'El servicio de correo todavía no está disponible. Podés usar el correo de contacto.');
    }
    require_once __DIR__ . '/../assets/vendor/php-email-form/php-email-form.php';
    $_SESSION['contact_last_attempt'] = time();
    session_write_close();
    $form = new PHP_Email_Form();
    $form->config = $config;
    $form->to = $config['recipient'];
    $form->from_name = $fields['name'];
    $form->from_email = $fields['email'];
    $form->subject = $fields['subject'];
    $form->add_message($fields['name'], 'Nombre');
    $form->add_message($fields['email'], 'Correo');
    $form->add_message($fields['message'], 'Mensaje', 10);
    echo $form->send();
} catch (Throwable $error) {
    error_log('MCyT contact: ' . $error->getMessage());
    respond(503, 'No pudimos enviar tu consulta. Intentá más tarde o usá el correo de contacto.');
}
