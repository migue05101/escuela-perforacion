# Escuela de Perforación

Prototipo de capacitación en 3D para personal nuevo de taladros de perforación en campos petroleros. Corre en el navegador (Three.js) en celular, tableta y computador, y está preparado para gafas Meta Quest (VR) y realidad aumentada.

Un instructor con voz (Ing. Ramiro Cárdenas) acompaña cada módulo, explica y muestra una demostración antes de cada práctica.

## Primera persona y recorrido libre

- **Mano y brazo en primera persona**: guante de impacto y manga del overol con cinta reflectiva. En el computador siguen al ratón, en celular y tableta al dedo, y en las Meta Quest los guantes siguen a los controles.
- **Mandos que se agarran**: joystick del malacate, palanca de rotaria, perillas de bombas y botones se arrastran con la mano (o con el control en VR).
- **00 · Recorrido libre**: caminar por toda la locación como en un videojuego (W A S D y Shift en el computador, joystick en pantalla en celular, palancas en las Quest). Se puede subir al piso por la escalera o la planchada, entrar a la cabina y sentarse en la consola, subir al encuelladero por la escalera y bajar por el pozo en corte hasta la broca.
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

En las Meta Quest: abrir ese enlace en el navegador de las gafas y tocar **VR** dentro de un módulo. Se señala con el control y se aprieta el gatillo.

## Código

El sitio es un solo `index.html`. Las partes editables están en `src/` (`data.js` contenidos, `engine.js` motor, `models.js` modelos 3D, `modules.js` guiones de los módulos comunes, `roles.js` prácticas por cargo, `cabin.js` cabina y simulador de perforación, `hands.js` mano en primera persona, mandos y sonido, `explore.js` recorrido libre, `well.js` pozo en corte, `app.js` perfiles, panel y bucle). Después de editar, ejecutar `sh src/build.sh` para regenerar `index.html`.

Los procedimientos son esquemas generales de referencia: antes de uso formal deben validarse con el instructor HSE, el procedimiento escrito de cada equipo y la certificación correspondiente (IWCF / IADC WellSharp, curso de alturas vigente).
