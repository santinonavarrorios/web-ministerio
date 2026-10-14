# MCyT Corrientes: comparación visual y corrección v3

Revisión del 13 de octubre de 2026. Esta revisión conserva los componentes y el movimiento del sitio original, actualiza la identidad institucional y corrige cambios de presentación que la primera etapa no requería. Es una propuesta preparada para la copia de prueba; todavía no está instalada en skyportaltech.com.

Se revisaron el código original del repositorio `santinonavarrorios/web-ministerio` en el commit `94308029c3cf2b68413022b8899596c4975cde12`, la portada y Autoridades publicadas en skyportaltech.com, las dos capturas nuevas y el manual que proporcionaste. Las URL de la web oficial devolvieron 502 desde este entorno. Por eso los valores originales de CSS/JavaScript se apoyan en el repositorio, y la comparación de las fichas también en tu captura; no se presenta como una medición actual de la web oficial.

El manual **no exige que toda la página sea blanca**. La página 47 del Manual de marca V1.1 y la lámina ministerial incluyen esta paleta principal:

| Color | HEX | Color | HEX |
|---|---|---|---|
| Blanco | `#FFFFFF` | Gris claro | `#EDEDED` |
| Amarillo claro | `#FACD05` | Amarillo oscuro | `#FAAE05` |
| Rojo claro | `#F4492E` | Rojo oscuro | `#EA2F09` |
| Bordó | `#6F0603` | Negro | `#2E2D2C` |
| Celeste claro | `#90B4E1` | Celeste oscuro | `#769FD3` |
| Verde claro | `#719C29` | Verde oscuro | `#356F23` |

El manual fija los tonos y las variantes de la firma gráfica. La guía ministerial muestra firmas sobre blanco, gris, negro, fotografías y celeste. No especifica el color de un menú web, una cantidad de fotografías, el formato de las fichas ni los tiempos de animación. Por lo tanto, el predominio del blanco y la conversión de la galería en noticias fueron decisiones de la entrega, no obligaciones del manual.

En v3 el bloque del logo oficial conserva fondo blanco; la navegación utiliza bordó con texto blanco, la portada tiene fondo gris y las acciones y los retratos utilizan los verdes de la paleta. El bordó del menú es una aplicación de diseño propuesta para esta web, no una instrucción textual de Gabriel. Los SVG de marca se conservan intactos. En pantalla estrecha se usa la variante vertical oficial. Barlow continúa como adaptación de la tipografía institucional a la interfaz.

La comparación de los componentes encontró lo siguiente:

| Componente | Original recuperado | Copia v2 | Corrección v3 |
|---|---|---|---|
| Cargador | Pantalla blanca y círculo de 60 px; espera al evento `load` | El JavaScript lo retiraba inmediatamente | Recuperado al entrar y navegar entre páginas; entrada mínima de 220 ms y espera máxima de 2,5 s |
| Entradas al hacer scroll | AOS: 1.000 ms, `ease-in-out`, una vez por elemento | AOS: 600 ms; faltaban atributos en las fichas nuevas | 1.000 ms y curva original; entradas en galería y autoridades |
| Tarjetas iniciales | Ampliación a `scale(1.08)`, transición de 0,3 s | El efecto seguía presente; se comprobó en el navegador | Se conserva; la descripción vuelve a 15 px/28 px como en el componente original |
| Fondo y espacio de portada | Imagen de fondo bajo una capa blanca; contenedor con 80 px superiores | Fondo blanco, pero se conservaban esos 80 px internos además del nuevo espacio exterior | Fondo gris de la paleta; se quita la acumulación de espacio superior |
| Galería | Fotografías en `.gallery-item`; el checkout tiene ocho entradas | Tres tarjetas con títulos, fechas y párrafos | Seis fotografías diferentes, según tu solicitud; título Galería y sin tarjetas de noticias |
| Hover de fotografías | Ampliación a `scale(1.1)` en 0,4 s | Al reemplazar `.gallery-item` por `.news-card`, ese selector dejó de aplicarse | Se recuperan clase, ampliación y transición |
| Altura de las imágenes | Altura CSS de 300 px | En v1 se imponían alturas HTML distintas; v2 las unificó en 240 px | Altura uniforme de 300 px; 280 px en pantalla muy estrecha |
| Ampliación de galería | Lightbox con navegación entre imágenes | Seguía funcionando con la galería cambiada | Seis imágenes agrupadas, originales completos y créditos al abrirlas |
| Encabezado al desplazarse | Encabezado fijo y clase `header-scrolled` | Encabezado relativo; el script ya no actualizaba esa clase | Encabezado sticky y recuperación de la clase, sombra y desplazamiento con compensación de altura |
| Menú móvil | Apertura de menú y submenús | Funcionaba y tenía mejoras de teclado | Se mantienen apertura, Escape, estado accesible y cierre al pasar a escritorio; colores legibles sobre cada fondo |
| Autoridades | Fichas `col-lg-3 col-md-6`, retratos circulares y nombres centrados | Dos fichas `col-lg-6`, fotos de estilos distintos e información añadida | Dos fichas a la escala original, retratos circulares consistentes y nombres/cargos centrados |
| Iconos de contacto en fichas | Franja que aparece al pasar el mouse | Enlaces de texto permanentes bajo el cargo | Franja de iconos al pasar el mouse o dar foco con teclado; contactos institucionales |
| Logos de organismos | Aumento de escala en 0,4 s | La ampliación seguía en el CSS base | Se conserva la ampliación con límites de tamaño |
| Indicadores | Contadores con duración de dos segundos | Se conservaron; rotulados como históricos | Se mantienen los valores y animación; no se inventan cifras de gestión actual |
| Sliders | Configuración con autoplay de cinco segundos y breakpoints | El script había simplificado esa configuración | Se recupera para los componentes que la utilicen; el HTML actual no contiene sliders activos de esos tipos |
| Diálogos de portales | Opacidad de 500 ms; transición interna genérica de cinco segundos | El contenedor interno tenía `transition:none` | Se conserva la entrada por opacidad y una transición interna de 0,35 s; continúan Escape y cierre |

La cantidad de seis fotografías se aplica porque la pediste. El checkout recuperado contiene ocho, mientras que no fue posible verificar la portada oficial actual por el 502. Esta diferencia entre versiones no cambia la corrección solicitada.

La retirada de dos autoridades tuvo una base distinta a los cambios de diseño. Gabriel escribió: **«quitar subsecretarías que no funcionan (solo funciona la de Micaela)»**. No escribió los nombres de Sofía y Diego. Se identificaron esas fichas por los cargos que figuraban en la página original:

| Ficha original | Cargo que mostraba | Decisión y fundamento |
|---|---|---|
| Jorge Gómez | Ministro de Ciencia y Tecnología | Reemplazado por Luciano Cabrera; pedido explícito de actualizar al ministro y retirar referencias a la gestión anterior |
| Micaela Stefani Van Der Woerd | Subsecretaria de Coordinación Institucional | Conservada; es la subsecretaría que Gabriel indicó como activa |
| Sofía Vallejos | Subsecretaria de Innovación y Desarrollo Tecnológico | Retirada al aplicar la instrucción a las subsecretarías inactivas; asociación deducida de su cargo |
| Diego Eduardo Goral | Subsecretario de Vinculación con el Sistema Científico | Retirado por el mismo criterio; asociación deducida de su cargo |

El directorio de representantes de COFECYT corrobora los cargos de Luciano y Micaela. Ese directorio no es un organigrama provincial exhaustivo y no se usa como prueba independiente de que las otras dos personas hayan dejado toda función pública. La base para retirar esas dos subsecretarías de esta página es la instrucción interna que compartiste. Por eso v3 mantiene dos autoridades activas y no vuelve a publicar los cargos retirados.

Las fotografías de la galería son originales públicos de NEA TECH, Verano Tecnológico, la jura y entrevistas, con procedencia registrada. Se conservan completas al abrirlas. Los retratos de las fichas son adaptaciones realizadas con edición de imágenes por IA: Luciano parte de una fotografía frontal de una entrevista de Cadena de Radios, y Micaela del retrato que ya tenía la web. Se retiró el fondo y se adaptó el encuadre para presentarlos sobre círculos del mismo estilo. Los originales se pueden abrir desde las miniaturas y los créditos indican la adaptación. Se guardaron los prompts y las fuentes en `retratos-adaptados-v3.json`.

Esto permite igualar la presentación, pero no convierte las adaptaciones en una sesión fotográfica oficial. La página 64 del manual pide autenticidad y desaconseja imágenes evidentemente artificiales: la revisión editorial de estos retratos corresponde al equipo antes de publicar la versión institucional definitiva. La galería mantiene las fotos originales de los actos.

Las comprobaciones de esta revisión abarcan las 64 páginas y sus rutas, tanto en raíz como en `/mcyt/`; HTML5; sintaxis JavaScript; reglas CSS del menú, galería y colores; integridad y transparencia de las imágenes; interacciones existentes del menú, filtros, contacto, portales y clima; y el ciclo del cargador con un reloj simulado. Se comprobó además que el parche aplicado sobre el ZIP v2 produce los mismos archivos que el paquete completo v3. Las pruebas de DOM y CSS no son una inspección visual del nuevo resultado en navegador.

La copia v2 publicada sí se inspeccionó en navegador. V3 todavía necesita la comprobación visual final después de instalarla en el hosting, especialmente en móvil. No se modificó el dominio oficial, no se accedió a cPanel y no se envió correo externo. El parche no contiene `forms/` ni credenciales; el backend de contacto permanece igual.

Para instalar, extraer `MCyT-Ajuste-Visual-v3.zip` directamente en `public_html/mcyt/`, sobrescribir los archivos y recargar con Ctrl+F5. No borrar la carpeta ni extraer dentro de otra carpeta `mcyt`. El paquete completo conserva su nombre anterior, pero su contenido actualizado es v3.

Fuentes consultadas: manual general V1.1 (páginas 28–35, 47, 51–52 y 64), guía ministerial (lámina 1), mensajes de Gabriel, capturas adjuntas, repositorio original, copia publicada y fuentes fotográficas. Directorio: https://www.argentina.gob.ar/ciencia/cofecyt/consejo/representantes. Las fuentes específicas de cada imagen están en `fuentes-fotograficas.json` y `restauracion-visual-v3.json`.
