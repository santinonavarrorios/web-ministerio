<?php
if (!defined('MCYT_CONTACT_BOOTSTRAPPED')) {
    http_response_code(404);
    exit;
}
/* Copiar a config.local.php y completar desde el editor de cPanel.
 * Para la prueba, recipient debe ser TU correo.
 * Consultar los valores SMTP exactos en Cuentas de correo > Connect Devices.
 * No subir el archivo config.local.php con datos reales a GitHub. */
return [
    'recipient' => '',
    'sender' => '',
    'transport' => 'smtp',
    'smtp_host' => '',
    'smtp_port' => 465,
    'smtp_security' => 'ssl',
    'smtp_user' => '',
    'smtp_password' => '',
];
