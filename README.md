# Escuela de Perforación

Prototipo de capacitación en 3D para personal nuevo de taladros de perforación en campos petroleros. Corre en el navegador (Three.js) en celular, tableta y computador, y está preparado para gafas Meta Quest (VR) y realidad aumentada.

Un instructor con voz (Ing. Ramiro Cárdenas) acompaña cada módulo, explica y muestra una demostración antes de cada práctica.

## Cursos certificables (IADC RigPass y DIT)

- **RigPass:** *Inducción HSE para personal de taladro en tierra*, de 8 horas. Tiene 27 módulos básicos y 4 del endoso de tierra.
- **DIT:** cinco cursos por cargo de 5 horas cada uno: obrero de patio, cuñero, encuellador, consola del perforador y supervisor.

Cada aprendiz tiene una cuenta personal y la app controla lo que la IADC exige para un curso por eLearning:

- **Identidad.** Se verifica al inscribirse, al iniciar y antes del examen, con clave y foto o con un código del instructor.
- **Aviso inicial y declaración de calidad.** El aprendiz los acepta antes de empezar.
- **Módulos.** Van en orden y no se pueden saltar. Cada uno tiene un tiempo mínimo de dedicación y el reloj se pausa por inactividad.
- **Preguntas de repaso.** Si el aprendiz falla, el instructor vuelve a explicar y la pregunta se repite.
- **Examen final.** Las preguntas salen al azar, se califica en el servidor y se aprueba con 75 %. El aprendiz recibe retroalimentación y puede reintentar.
- **Al aprobar.** El aprendiz llena una encuesta y recibe una constancia con código QR que se verifica en línea.
- **Ayuda.** La pantalla de ayuda tiene soporte, preguntas frecuentes, quejas y comentarios.
- **Panel del instructor.** Muestra los registros, la bitácora con las fotos de verificación y los códigos de identidad. Desde ahí se habilita de nuevo el examen y se exportan los registros en CSV y JSON.

Archivos relacionados:

- **Servidor de registros:** `server/supabase.sql` y la guía `server/LEEME.md`. Sin servidor, la app funciona en modo local de demostración, que no es apto para certificar.
- **Documentos para la solicitud a la IADC:** carpeta `docs/iadc/`. Empiece por `00_LEEME_acreditacion.md`.
- **Paquete SCORM 1.2 para una plataforma LMS:** se genera con `sh scorm/package.sh`.
- **Bancos del examen final:** no están en el repositorio. Se guardan en `privado/`, que no se sube a GitHub, y se cargan al servidor desde el panel del instructor.
- **Datos del proveedor, instructores y soporte:** `src/config.js`.

## Primera persona y recorrido libre

- **Mano y brazo en primera persona**: guante de impacto y manga del overol con cinta reflectiva. En el computador siguen al ratón, en celular y tableta al dedo, y en las Meta Quest los guantes siguen a los controles.
- **Mandos que se agarran**: joystick del malacate, palanca de rotaria, perillas de bombas y botones se arrastran con la mano (o con el control en VR).
- **00 · Recorrido libre**: caminar por toda la locación como en un videojuego (W A S D y Shift en el computador, joystick en pantalla en celular, palancas en las Quest). Se puede subir al piso por la escalera o la planchada, entrar a la cabina y sentarse en la consola, subir al encuelladero por la escalera y bajar por el pozo en corte hasta la broca.
- **Subir al mástil**: al pie de la escalera hay que conectar el arnés al bloque retráctil; luego se trepa con W/S (joystick o palanca en VR) hasta el encuelladero (26,6 m) y la plataforma de la corona (43 m). Arriba hay que conectarse a la línea de vida o al punto de anclaje antes de moverse. Desde el encuelladero se puede hacer el simulacro de la línea de escape.
- **Trabajar en el lugar**: en el recorrido hay puntos para hacer cada práctica donde ocurre (conexiones en la mesa, encuelle en el encuelladero, tubería en los burros, pruebas de lodo, consola, supervisión, EPP) y volver al recorrido al terminar.
- **Pozo en corte bajo el taladro**: el terreno se abre frente al equipo y muestra, como una ilustración, el contrapozo, las preventoras, los revestimientos cementados, las formaciones con su profundidad real, la sarta completa hasta la broca y la circulación del lodo.
- **Cabina del perforador**: sillón con mandos en los apoyabrazos, tres pantallas (parámetros, lodo y bombas, tendencias y alarmas), indicador de peso analógico, manómetros y panel de control de pozo (MAESTRO + función). La simulación calcula peso sobre la broca, ROP, torque, presión de bomba, flujo de retorno y volumen de tanques.

## Rutas por cargo

Cada aprendiz elige su cargo. El panel muestra el **tronco común** para todo el personal, las prácticas propias de **su cargo**, un repaso del **cargo anterior** y los demás cargos para quien quiera prepararse para ascender. Los casos simulados cambian según el cargo: la misma patada se vive distinto desde el patio, la mesa, el encuelladero, la consola o la supervisión.

### Tronco común

1. **Inducción HSE y EPP** — ponerse el EPP en primera persona, línea de fuego, trabajo en alturas, alarma de H2S y autoridad para detener.
2. **Conoce el taladro** — recorrido narrado por cada componente del equipo.
5. **Control de pozo básico** — el pozo en corte con una patada, hoja de viaje y simulacro de cierre.
6. **Casos simulados** — patada durante un viaje, compañero sin anticaídas y alarma de H2S, vistos desde el cargo del aprendiz.

### Prácticas por cargo

| Cargo | Prácticas |
|---|---|
| Obrero de patio | 07 Tubería en los burros y grúa (protectores, limpieza e inspección de roscas, medición y hoja de tubería, señales a la grúa) · 03 Armado del equipo |
| Cuñero | 08 Conexión en la mesa (grasa, emboque, llave de giro, llaves de fuerza, torque, cuñas) |
| Encuellador | 04 Encuelle · 09 Pruebas de lodo y ronda (balanza de lodo, embudo Marsh, zarandas, tanques y bombas) |
| Perforador | 10 Consola del perforador (perforar con los parámetros del programa, detectar la patada y cerrar el pozo) |
| Supervisor | 11 Permiso, inspección y simulacro · 03 Armado del equipo |

## Cómo abrirlo

Con GitHub Pages activo (Settings → Pages → rama `main`, carpeta raíz):

- https://migue05101.github.io/escuela-perforacion/

En las Meta Quest: abrir ese enlace en el navegador de las gafas y tocar **Entrar en realidad virtual** en el panel principal (o **VR** dentro de un módulo). Dentro de las gafas aparece un menú flotante de módulos; se señala con el control y se aprieta el gatillo. Palanca izquierda para caminar, derecha para girar por pasos; el botón **← Módulos** del tablero del instructor vuelve al menú. En VR se apagan las sombras dinámicas y la escena une sus piezas fijas para dibujar menos veces por cuadro.

**Entrada a pie**: cada curso (excepto el recorrido libre) empieza con el aprendiz frente al taladro, a unos 4 m del instructor. Hay que caminar hasta él y seguirlo en un recorrido corto por la locación (taladro, tanques y bombas, burros de tubería). El botón **Saltar la introducción** pasa directo al curso.

## Código

El sitio es un solo `index.html`. Las partes editables están en `src/` (`data.js` contenidos, `engine.js` motor, `models.js` modelos 3D, `modules.js` guiones de los módulos comunes, `roles.js` prácticas por cargo, `cabin.js` cabina y simulador de perforación, `hands.js` mano en primera persona, mandos y sonido, `explore.js` recorrido libre, `well.js` bajada por el pozo, `cut.js` corte del subsuelo bajo el taladro, `details.js` señalización y equipos de seguridad, `config.js` datos del proveedor y del servidor, `store.js` cuentas y registros, `cert.js` cursos certificables, `cert_rigpass.js` y `cert_dit.js` contenido de los cursos, `scorm.js` reporte a plataformas LMS, `perf.js` unión de piezas estáticas para dibujar más rápido, `app.js` perfiles, panel y bucle). Después de editar, ejecutar `sh src/build.sh` para regenerar `index.html`.

Los procedimientos son esquemas generales de referencia: antes de uso formal deben validarse con el instructor HSE, el procedimiento escrito de cada equipo y la certificación correspondiente (IWCF / IADC WellSharp, curso de alturas vigente).
