# Ministerio de Ciencia y Tecnología de Corrientes — v5, ajustes finales

Revisión final del 13 de octubre de 2026.

- Galería de inicio sin el enlace visible de créditos fotográficos.
- Pie de página sin “Mapa del sitio” en todas las páginas institucionales.
- Luciano Cabrera: Instagram, LinkedIn y Facebook.
- Menú de Subsecretarías dentro del ancho de pantalla, con segundo nivel hacia la izquierda en escritorio.
- Menú compacto en pantallas menores de 1200 px y en dispositivos táctiles.
- Accesos a Equipo deshabilitados temporalmente, sin dirección de navegación.
- Informes anuales con el espacio reservado para el Anuario de Gestión SUBCOIN 2023.
- Cuadros de información útil y teléfonos de los portales ajustados al ancho disponible.
- Revisión de recursos y navegación responsive. Detalle en `documentacion/cambios-finales-v5.md`.

## Instalación

El ZIP tiene `index.html`, `assets/` y `src/` en su raíz. En el hosting actual, copiar los HTML de raíz, los HTML de `src/` y la carpeta `assets/` dentro de `public_html/mcyt/`, aceptando sobrescribir. Después recargar con `Ctrl+F5`. Para usar GitHub, reemplazar estos mismos archivos en el repositorio.

Los estilos y el script llevan el identificador de caché `20261013-final1`.

## Edición de estilos

Editar `assets/css/ajustes-visual-v5.css` y ejecutar `python3 documentacion/generar-css-v5.py`. El generador crea los dos CSS que recibe el hosting. Las animaciones y la pantalla de carga siguen habilitadas también cuando el sistema operativo informa movimiento reducido.

La documentación de revisiones anteriores se conserva como historial. La referencia para esta entrega es `documentacion/cambios-finales-v5.md`.
