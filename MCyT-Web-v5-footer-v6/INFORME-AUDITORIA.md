**Actualización v5 — 13/10/2026.** La revisión vigente está en `documentacion/correcciones-v5.md`. Para la copia v4 publicada usar `MCyT-Parche-Corregido-v5.zip`; para una instalación nueva, `MCyT-Web-Corregida-v5.zip`. El parche conserva PHP y SMTP. Los apartados anteriores se mantienen como antecedentes.

**Actualización vigente: v4, corregida a partir del video.**

Usar `MCyT-Parche-Corregido-v4.zip` para actualizar v2 o v3, o `MCyT-Web-Corregida-v4.zip` para una instalación nueva. Extraer dentro de `public_html/mcyt/`, sobrescribir y usar `Ctrl+F5`. El análisis vigente está en `documentacion/correcciones-video-v4.md`. Las notas sobre revisiones anteriores que siguen debajo se conservan como historial. La revisión visual de v4 en el hosting está pendiente.

# Auditoría y actualización institucional del MCyT Corrientes

Revisión vigente: v3, 13 de octubre de 2026. El detalle comparativo está en `documentacion/analisis-visual-v3.md`; los apartados de v2 describen el defecto de la entrega anterior.

## Base de trabajo

Repositorio: https://github.com/santinonavarrorios/web-ministerio  
Versión: 94308029c3cf2b68413022b8899596c4975cde12, subida el 9 de octubre de 2026.

El ZIP inicial tenía 20 archivos de código. GitHub permitió recuperar los otros 107 originales. El proyecto de origen tenía 65 HTML, 41 CSS, 20 JavaScript y un PHP. No fue necesario inventar las páginas que faltaban.

Se conserva la arquitectura estática con PHP de contacto. No se agrega panel administrativo, base de datos ni información institucional sin respaldo.

## Qué faltaba o estaba roto

La auditoría encontró 23 destinos locales inexistentes: 6 rutas HTML, 15 recursos gráficos, un CSS con una comilla incorrecta y un PDF. Además faltaba la dependencia PHP del formulario.

| Problema | Efecto | Corrección |
|---|---|---|
| Convocatorias del pie apuntaba a src/actividades/convocatorias/ | Enlace roto en 54 páginas | Ruta unificada a src/institucional/convocatorias/convocatorias.html |
| Rutas de Autoridades, Vectores, misión/visión, Proyectos e informe 2022 | Destinos HTML inexistentes | Se conectaron a las páginas reales |
| aos.css tenía una comilla dentro del nombre en PFI | CSS solicitado inexistente | Atributo corregido |
| Apple touch icon faltante | Icono roto en 37 páginas | Escudo oficial incorporado |
| Tres imágenes JPG de Portfolio Details faltantes | Página de ejemplo incompleta | Portfolio Details e Inner Page retiradas del sitio |
| Logos, mapas e iconos de imagenes-portales/ faltantes | Imágenes rotas en portales | Logos oficiales, SVG de iconos y enlaces de búsqueda cartográfica; no se inventaron mapas |
| Fondo PNG sin nombre | Referencia inválida | Declaración defectuosa retirada |
| Anuario 2023 ausente y visores PDF históricos | Descargas y zonas de informe incompletas | Visores y PDF fuera de esta entrega; páginas de consulta institucional conectadas |
| PHP Email Form ausente | Formulario terminaba con error | Implementación propia compatible y PHPMailer, configurable para el hosting |
| Cinco variantes de AOS/Bootstrap con errores JavaScript | Fuentes no ejecutables | Bootstrap oficial 5.3.2 recuperado; parámetros reservados de AOS corregidos |
| Doce páginas sin acceso desde Inicio | Contenido aislado | Equipo conectado, portales accesibles por mapa del sitio y ejemplos retirados |
| Diálogo popup11 inexistente | Botón de San Antonio sin contenido | Diálogo de consulta de cobertura; no se afirma un estado actual no verificado |
| Callback y clave heredada de Google Maps | Dependencia no preparada | API retirada; enlaces cartográficos y mapas embebidos sin esa clave |
| Miniatura remota de YouTube no disponible | Imagen externa rota | Miniatura retirada |

“Huérfano” se comprobó como página inaccesible desde Inicio y como referencia local a archivo o identificador inexistente. Las variantes y licencias conservadas de bibliotecas son soporte: no todas se cargan en cada página.

## Autoridades y fotografías

- Dr. Luciano Cabrera reemplaza al ministro anterior.
- Mgter. Micaela Stefani Van Der Woerd queda como subsecretaria de Coordinación Institucional.
- Sofía Vallejos, Diego Goral y las subsecretarías inactivas se retiraron del directorio de autoridades y navegación, siguiendo la indicación recibida.
- Se retiraron los perfiles sociales del ministro anterior.
- Fuentes de verificación:
  - https://www.argentina.gob.ar/ciencia/cofecyt/consejo/representantes
  - https://munired.mcypcorrientes.gob.ar/gobierno-de-la-provincia-de-corrientes
- Seis fotos públicas con fuentes registradas. La galería conserva fotografías originales. Las fichas v3 usan retratos adaptados de fotos reales, con originales accesibles y procedencia documentada en `retratos-adaptados-v3.json`.
- La portada ahora muestra lanzamiento NEA TECH 2026, Verano Tecnológico y jura, con fechas reales.
- Se retiraron 25 referencias fotográficas de fichas históricas de capacitación y articulación; textos y períodos se conservaron.
- Se retiraron 57 imágenes sin referencias activas, incluyendo retratos anteriores y logos que ya no se usan.
- En la entrega inicial no se editaron fotografías. V3 incorpora dos retratos adaptados con IA; los originales siguen disponibles. La galería conserva fotografías reales de los actos.
- Se mantuvo la ficha del equipo de apoyo existente y se corrigió Gabriel Moltieni a Gabriel Molteni. La nómina y los roles del resto del equipo requieren validación interna antes de actualizar personal.

## Manual de marca

Se revisaron los cinco PDF: manual general V1.1 de marzo de 2026, guía general V2, guía del Ministerio, convivencia marcaria y base de presentación de mayo de 2026.

Es una primera aplicación de identidad, no un rediseño integral certificado.

- AP1 ministerial como bloque indivisible: horizontal en escritorio y vertical en móvil.
- Firma Gobierno en el pie, con variantes según ancho.
- SVG utilizados coinciden por SHA256 con los originales del ZIP.
- Barlow Regular 400 para cuerpo; Barlow SemiBold 600 para navegación y subtítulos; Barlow Semi Condensed ExtraBold 800 para titulares.
- Fuentes locales con sus licencias.
- Blanco #FFFFFF, gris #EDEDED y texto #2E2D2C; bordó #6F0603 y verde oscuro #356F23 para acciones.
- Sin filtros ni recomposiciones del logo. CSS con espacio exterior proporcional a 4x y variantes oficiales.
- Iconos remotos sustituidos por SVG provistos.
- Hay diferencias entre distancias de los ejemplos verticales de las guías; se conservaron los SVG oficiales sin recomponerlos.
- La presentación aporta referencia visual, pero no define componentes ni breakpoints web.

## Resultado comprobado

| Comprobación | Resultado |
|---|---|
| Páginas HTML | 64 |
| CSS | 47 |
| JavaScript | 22 |
| PHP | 7 |
| Referencias locales faltantes | 0 |
| Identificadores enlazados inexistentes | 0 |
| Identificadores duplicados | 0 |
| Páginas HTML aisladas de Inicio | 0 |
| Sintaxis JavaScript externo | 22 archivos sin errores |
| Scripts inline | 0; código de portales unificado en archivos externos |
| Sintaxis PHP en intérprete real | 7 archivos sin errores, PHP 8.3.6 |
| Integridad de imágenes raster | 67 comprobadas |
| Pruebas de interacciones en DOM simulado | 16 aprobadas |
| PHP por HTTP y SMTP local | 36 aprobadas |
| Estructura HTML5 | 64 páginas sin errores |
| Parser CSS de nivel superior | 47 archivos sin errores de parsing; no certifica selectores ni presentación |
| Selectores del CSS ministerial completo | 515 analizados sin errores |
| Comprobaciones específicas de CSS v3 | 45 aprobadas, sin renderizado en navegador |
| Ciclo del cargador y configuración AOS | 11 pruebas en DOM y reloj simulado |
| Rutas en raíz y /mcyt/ | Ambas variantes comprobadas |

Las 16 pruebas de interacción incluyen menú, submenús, Escape, cambio a escritorio, combinación de filtros, confirmación y error de Contacto, instalación en subcarpeta, diálogos y clima. Son pruebas de DOM simulado, sin inspección visual.

Las comprobaciones de CSS v2 verifican las declaraciones que reciben el menú de escritorio, el menú móvil cerrado/abierto y sus submenús; también las alturas de las noticias, el tamaño de indicadores y los límites de logos. No miden el diseño renderizado ni reemplazan la inspección del hosting.

Las 36 pruebas del formulario ejecutaron PHP real por HTTP y PHPMailer contra un SMTP local aislado: SSL/TLS, STARTTLS, certificados verificados, sesiones y cookies, token CSRF, validación Unicode, rechazo de cabeceras inyectadas, límite de solicitudes, reenvío, configuración incompleta y fallos de autenticación y del servidor. Se comprobó asunto, cuerpo, remitente y Reply-To. No se enviaron correos a Internet.

Se copiaron localmente 16 fotos de portales que dependían de servidores externos. Se incluyen CSS, JavaScript, fuentes e imágenes. Quedan cuatro marcos externos de mapas y Power BI, además de la consulta meteorológica a Open-Meteo; requieren Internet y no se replicó su infraestructura o base de datos.

## Correcciones adicionales para la instalación en cPanel

- Rutas HTML, fuentes e imágenes CSS relativas: admite raíz, subdominio o carpeta como `/mcyt/`.
- ZIP con `index.html` y carpetas de la web directamente en su raíz para extraerlo en el directorio público seleccionado.
- Configuración de correo mediante `forms/config.local.php`, con ejemplo vacío, acceso directo bloqueado y exclusión de Git. Las variables del servidor tienen prioridad.
- Sesión con nombre propio y cookie limitada a la ruta del formulario, sin interferir con las sesiones de otras aplicaciones del dominio.
- Validación de límites por caracteres Unicode para aceptar correctamente nombres y mensajes con acentos.
- Los diálogos de los portales ya no se cancelan al interceptar enlaces de fragmentos. Cierre, Escape, retorno de foco y scroll con movimiento reducido.
- Clima anterior retirado: consultaba nodos inexistentes, dependía de una clave incrustada, tenía conversiones de unidades incorrectas y multiplicaba mal algunas fechas. Se utiliza Open-Meteo con atribución y localidades identificadas; San Antonio muestra una referencia de San Miguel, localidad cercana, evitando homónimos.
- El contenido y las animaciones se inicializan con el DOM; no esperan a que terminen los marcos de mapas o estadísticas.
- Un solo doctype por página; HTML5 corregido en Carambola y títulos en marcos para accesibilidad.
- Ajustes de ancho, scroll y títulos en diálogos y pantallas estrechas. La apariencia final necesita verificación visual.

## Pendientes y límites

1. Correo real: establecer destinatario, remitente y SMTP del hosting. No figura esa información en los archivos y no se puede inventar. Sin configurar, el código responde con un error claro.
2. Hosting real: PHP por HTTP y SMTP aislado sí se probaron. Falta comprobar la configuración de skyportaltech.com, su SMTP y la recepción final en una casilla real.
3. Revisión visual: se inspeccionó la instalación defectuosa publicada en skyportaltech.com y se confirmó el fallo descrito abajo. Falta inspeccionar esta versión corregida una vez instalada, en escritorio y móvil.
4. Validación editorial: confirmar equipo de apoyo, domicilio/correo heredados y series históricas que se conservarán. No se inventaron indicadores ni montos nuevos.
5. Segunda etapa: rediseño completo de portada, jerarquías, componentes y fichas, conforme al mensaje de Gabriel.

No se publicó ni modificó la web oficial. El ZIP es una copia actualizada para revisar e instalar en un entorno de prueba.

## Defecto de la entrega anterior y corrección v2

La extracción en `public_html/mcyt/` fue correcta. El defecto estaba en el CSS entregado: al retirar una importación de Google Fonts se conservó parte de su URL, que contiene puntos y coma. Ese fragmento precedía a las importaciones de las secciones y alteraba su interpretación. El parser anterior solo verificaba errores de nivel superior y no advirtió que el navegador no cargaba esas importaciones.

La inspección del sitio publicado midió `display: block` y `list-style: disc` en el menú principal, un encabezado de aproximadamente 677 píxeles y fotos de noticias con alturas de 450, 1066 y 1200 píxeles. Las fotos tenían dimensiones HTML distintas y el CSS anterior no sobrescribía su altura.

Se retiró el fragmento, se incorporaron las diez secciones y la identidad institucional a `ministerio-2026-v2.css`, sin importaciones, y se actualizaron los enlaces de las 64 páginas. Las noticias ahora usan marcos de 240 píxeles, con la imagen ajustada al marco; el enlace conserva la fotografía completa. Los indicadores y logos de organismos tienen límites definidos. Los CSS con nombre v2 evitan utilizar los archivos anteriores desde caché.

Se volvió a comprobar HTML5, rutas locales, fragmentos y conectividad desde Inicio, tanto en raíz como en `/mcyt/`. El parche no modifica el procesamiento PHP ni la configuración de correo. La corrección aún requiere inspección visual después de instalarla.
