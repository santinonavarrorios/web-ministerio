# Ajustes finales v5 — 13/10/2026

Se aplicaron los pedidos sobre el ZIP completo suministrado.

- Inicio: retirado el enlace visible “Créditos fotográficos” de la galería.
- Pie: retirado “Mapa del sitio” de los 55 pies institucionales.
- Autoridades: Luciano Cabrera muestra solamente Instagram, LinkedIn y Facebook.
- Equipo: deshabilitados los 56 accesos de navegación y del mapa; no tienen `href` y no producen navegación ni carga al pulsarlos.
- Informes: el botón para solicitar documentación fue reemplazado por un espacio para el Anuario de Gestión SUBCOIN 2023, con el mensaje “Anuario próximamente disponible”.
- Encabezado: los desplegables de escritorio quedan alineados dentro de la pantalla y el segundo nivel abre a la izquierda. El menú compacto se usa por debajo de 1200 px y en pantallas táctiles, incluso en orientación horizontal.
- Portales: los cuadros de información útil, teléfonos e información adicional ahora se distribuyen en columna y crecen con el texto. Se eliminaron las alturas fijas que interferían con ese ajuste.
- Caché: las 64 páginas referencian los CSS actualizados y el script con `20261013-final1`.
- Animaciones: se preservó el movimiento forzado que venía aplicado, incluidas la pantalla de carga y las transiciones de la galería. Sus fuentes de CSS también fueron ajustadas para que el generador conserve ese comportamiento.

## Verificación

64 páginas a 320, 390, 1024 y 1440 px: 256 combinaciones, con revisión del ancho al inicio y al final de la página. Resultado: cero desbordamientos horizontales, cero errores JavaScript y cero recursos locales faltantes.

Se probaron los menús a 320, 390, 768, 1024, 1199, 1200, 1366, 1440, 1920 y 2560 px, y mediante emulación táctil a 390 y 1366 px. Se verificaron el tamaño de los desplegables, la navegación a Proyectos, Equipo deshabilitado, apertura y cierre del menú, teclado y Escape.

Se verificaron la apertura y cierre de fotografías, el hover de la galería con la preferencia de movimiento reducido activa, las tres redes del ministro, el espacio del anuario y el encabezado fijo al desplazarse en móvil. También se revisaron visualmente capturas de escritorio y móvil.

La referencia estructurada está en `verificacion-ajustes-finales-v5.json`. Las pruebas corresponden al paquete local; para ver los cambios en `skyportaltech.com/mcyt/` es necesario subirlo.

## Aplicación en la web existente

Copiar los HTML de raíz, los HTML de `src/` y la carpeta `assets/` dentro de `public_html/mcyt/`, aceptando sobrescribir. Recargar con `Ctrl+F5` después de completar la subida.
