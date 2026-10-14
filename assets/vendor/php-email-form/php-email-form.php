<?php
/** Implementación propia compatible. No es la librería comercial de la plantilla. */
use PHPMailer\PHPMailer\PHPMailer;
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
final class PHP_Email_Form
{
    public $to = '';
    public $from_name = '';
    public $from_email = '';
    public $subject = '';
    public $ajax = true;
    public $config = [];
    private $messages = [];
    public function add_message($value, $label, $minimum = 0)
    {
        if (strlen(trim($value)) < $minimum) {
            throw new InvalidArgumentException('El mensaje es demasiado corto.');
        }
        $this->messages[] = $label . ': ' . $value;
    }
    public function send()
    {
        $sender = $this->config['sender'] ?? '';
        if (!filter_var($this->to, FILTER_VALIDATE_EMAIL) || !filter_var($sender, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('El servicio de correo todavía no está disponible.');
        }
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->setFrom($sender, 'Ministerio de Ciencia y Tecnología');
        $mail->addAddress($this->to);
        $mail->addReplyTo($this->from_email, $this->from_name);
        $mail->Subject = $this->subject;
        $mail->Body = implode("\n\n", $this->messages);
        $mail->isHTML(false);
        if (($this->config['transport'] ?? 'smtp') === 'smtp') {
            if (empty($this->config['smtp_host'])) {
                throw new RuntimeException('El servicio de correo todavía no está disponible.');
            }
            $mail->isSMTP();
            $mail->Host = $this->config['smtp_host'];
            $mail->Port = (int) ($this->config['smtp_port'] ?? 587);
            if ($mail->Port < 1 || $mail->Port > 65535) {
                throw new RuntimeException('Configuración de correo no válida.');
            }
            $mail->SMTPAuth = !empty($this->config['smtp_user']);
            $mail->Username = $this->config['smtp_user'] ?? '';
            $mail->Password = $this->config['smtp_password'] ?? '';
            $security = $this->config['smtp_security'] ?? 'tls';
            if (!in_array($security, ['ssl', 'tls'], true)) {
                throw new RuntimeException('Configuración de correo no válida.');
            }
            $mail->SMTPSecure = $security === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Timeout = 15;
            $mail->Timelimit = 15;
            $mail->SMTPDebug = 0;
        } elseif (($this->config['transport'] ?? '') === 'mail') {
            $mail->isMail();
        } else {
            throw new RuntimeException('Configuración de correo no válida.');
        }
        $mail->send();
        return 'OK';
    }
}
