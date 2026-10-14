**Actualización v5 — 13/10/2026.** La revisión vigente está en `documentacion/correcciones-v5.md`. Para la copia v4 publicada usar `MCyT-Parche-Corregido-v5.zip`; para una instalación nueva, `MCyT-Web-Corregida-v5.zip`. El parche conserva PHP y SMTP. Los apartados anteriores se mantienen como antecedentes.

**Actualización vigente: v4, corregida a partir del video.**

Usar `MCyT-Parche-Corregido-v4.zip` para actualizar v2 o v3, o `MCyT-Web-Corregida-v4.zip` para una instalación nueva. Extraer dentro de `public_html/mcyt/`, sobrescribir y usar `Ctrl+F5`. El análisis vigente está en `documentacion/correcciones-video-v4.md`. Las notas sobre revisiones anteriores que siguen debajo se conservan como historial. La revisión visual de v4 en el hosting está pendiente.

# Instalar la copia de prueba del MCyT en skyportaltech.com

## Si ya instalaste la entrega anterior

1. Descargar `MCyT-Ajuste-Visual-v3.zip`.
2. Entrar en `public_html/mcyt/` con el Administrador de archivos.
3. Subir y extraer el parche en esa misma carpeta, aceptando sobrescribir los archivos existentes.
4. Confirmar que `assets/css/ministerio-2026-v3.css` quedó en esa ruta, sin una carpeta `mcyt` adicional dentro de `mcyt`.
5. Abrir `https://skyportaltech.com/mcyt/` y recargar con Ctrl+F5.

No borrar la instalación. El parche incluye HTML, CSS, JavaScript, cuatro imágenes nuevas e instrucciones; no contiene `forms/` ni credenciales de correo. Los archivos con nombres nuevos evitan reutilizar el CSS defectuoso desde caché.

## Opción directa: una carpeta

1. Entrar al Administrador de archivos de cPanel.
2. Abrir el directorio público de skyportaltech.com, normalmente `public_html`.
3. Crear una carpeta nueva llamada `mcyt` y entrar en ella.
4. Subir el ZIP actualizado y usar **Extract / Extraer** en esa carpeta.
5. Comprobar que `index.html`, `contacto.html`, `assets`, `src` y `forms` quedaron directamente dentro de `mcyt`. No debe quedar otra carpeta `mcyc` o `mcyt` entre ellos.
6. El ZIP subido se puede eliminar después de extraerlo.
7. Abrir `https://skyportaltech.com/mcyt/`.

La carpeta se prepara nueva para mantener separada la prueba de las otras aplicaciones del hosting. No subir estos archivos sobre la raíz de la página principal.

Si el dominio tiene reglas propias que impiden acceder a esa carpeta, usar un subdominio con raíz independiente. Esa condición depende de la configuración actual del hosting, que no se accedió desde aquí.

## Opción con subdominio

En **Domains / Dominios**, crear `mcyt.skyportaltech.com` con su propia **Document Root / Raíz del documento**. No compartir la raíz del dominio principal. Extraer el ZIP dentro de la raíz indicada por cPanel. Configurar DNS y SSL si el proveedor no los prepara automáticamente. La URL de prueba será `https://mcyt.skyportaltech.com/` una vez resueltos esos ajustes.

Referencia: https://docs.cpanel.net/cpanel/domains/domains/

## PHP

En **MultiPHP Manager / Administrador MultiPHP**, seleccionar el dominio correspondiente, elegir **PHP 8.3** y aplicar. Si se usa una carpeta bajo el dominio principal, comprobar primero que la versión elegida sea compatible con las otras aplicaciones de ese dominio. Un subdominio con raíz propia permite mantener una configuración separada cuando el hosting lo admite.

La web fue probada con PHP 8.3.6. OpenSSL debe estar habilitado para SMTP seguro; las sesiones de PHP deben poder guardar sus archivos. No se crea una base de datos y no hay instalación de Composer o npm.

Referencias:
- https://docs.cpanel.net/cpanel/software/multiphp-manager-for-cpanel/
- https://www.php.net/supported-versions.php

## Configurar el envío

En el hosting, copiar `forms/config.local.example.php` a `forms/config.local.php` y editar la copia. Mantener la extensión `.php`, no `.txt`.

| Campo | Valor a completar |
|---|---|
| `recipient` | Tu correo durante la prueba; el destinatario definitivo se decide después. |
| `sender` | Una cuenta que el servidor SMTP autorice a enviar. |
| `transport` | `smtp`. |
| `smtp_host` | Servidor saliente exacto mostrado por cPanel o tu proveedor de correo. |
| `smtp_port` | El puerto seguro de ese servidor; el ejemplo usa 465. |
| `smtp_security` | `ssl` para TLS implícito; `tls` para STARTTLS si el proveedor lo indica. |
| `smtp_user` | Usuario completo de la cuenta SMTP. |
| `smtp_password` | Contraseña o clave de aplicación de esa cuenta. |

Obtener estos valores en **Email Accounts / Cuentas de correo > Connect Devices / Conectar dispositivos**, sección de configuración segura. No asumir que el servidor es `mail.skyportaltech.com`: usar el nombre exacto que indique el panel para que coincida con el certificado.

El correo del visitante se usa como **Reply-To / Responder a**. El remitente real sigue siendo la cuenta autorizada por el hosting. Esto permite responder a la consulta sin suplantar el remitente.

No subir `config.local.php` con credenciales a GitHub. No desactivar la verificación de certificados para resolver un error SMTP: comprobar servidor, puerto, modo y usuario.

Referencia: https://docs.cpanel.net/cpanel/email/set-up-mail-client/

## Prueba final en tu hosting

| Prueba | Resultado esperado |
|---|---|
| Inicio y Autoridades | Logos actuales, Luciano Cabrera y Micaela; fotos y tipografías cargan. |
| Navegación en móvil | Menú y submenús abren; Escape o el botón cierran. |
| Proyectos | Año y programa se combinan al filtrar. |
| Mapa del sitio | Accesos a las páginas y portales. |
| Laguna Iberá y San Antonio | Diálogos abren y cierran; se puede volver a recorrer la página. |
| Clima | Temperatura y pronóstico o aviso claro de indisponibilidad. |
| Contacto sin configurar | Mensaje de servicio no disponible y campos conservados. |
| Contacto con SMTP | Confirmación y correo recibido en tu casilla; revisar también spam. |
| Reenvío inmediato | Solicita esperar unos segundos. |
| Configuración por URL | Acceso denegado o 404; nunca muestra los datos. |

El aviso de envío confirma aceptación por el SMTP; la recepción final en una casilla externa solo se comprueba mirando esa casilla.

Comprobar escritorio y móvil real. Se inspeccionó el fallo de la versión anterior; la comprobación visual de esta corrección queda pendiente de instalarla. Validar con Gabriel la nómina de apoyo y los datos de contacto existentes antes de publicar en el dominio institucional.

Si se vuelve a subir una corrección sobre esta misma copia, actualizar archivos y recargar el navegador sin caché con Ctrl+F5. En la primera instalación usar una carpeta vacía evita conservar archivos retirados de la entrega anterior.
