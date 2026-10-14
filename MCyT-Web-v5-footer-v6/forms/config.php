<?php
declare(strict_types=1);
if (!defined('MCYT_CONTACT_BOOTSTRAPPED')) {
    http_response_code(404);
    exit;
}
/* En cPanel se puede copiar config.local.example.php a config.local.php.
 * Las variables del servidor, si existen, tienen prioridad. */
$config = [
    'recipient' => '',
    'sender' => '',
    'transport' => 'smtp',
    'smtp_host' => '',
    'smtp_port' => 587,
    'smtp_user' => '',
    'smtp_password' => '',
    'smtp_security' => 'tls',
];
$localFile = __DIR__ . '/config.local.php';
if (is_file($localFile)) {
    $local = require $localFile;
    if (!is_array($local)) {
        throw new RuntimeException('La configuración de correo debe devolver un arreglo.');
    }
    $config = array_replace($config, array_intersect_key($local, $config));
}
foreach ([
    'recipient' => 'MCYT_CONTACT_TO',
    'sender' => 'MCYT_CONTACT_FROM',
    'transport' => 'MCYT_MAIL_TRANSPORT',
    'smtp_host' => 'MCYT_SMTP_HOST',
    'smtp_port' => 'MCYT_SMTP_PORT',
    'smtp_user' => 'MCYT_SMTP_USER',
    'smtp_password' => 'MCYT_SMTP_PASSWORD',
    'smtp_security' => 'MCYT_SMTP_SECURITY',
] as $key => $variable) {
    $value = getenv($variable);
    if ($value !== false) {
        $config[$key] = $value;
    }
}
$config['smtp_port'] = (int) $config['smtp_port'];
return $config;
