# Escuela de Perforación

Prototipo de capacitación en 3D para personal nuevo de taladros de perforación en campos petroleros. Corre en el navegador (Three.js) en celular, tableta y computador, y está preparado para gafas Meta Quest (VR) y realidad aumentada.

Un instructor con voz (Ing. Ramiro Cárdenas) acompaña cada módulo, explica y muestra una demostración antes de cada práctica.

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

El sitio es un solo `index.html`. Las partes editables están en `src/` (`data.js` contenidos, `engine.js` motor, `models.js` modelos 3D, `modules.js` guiones de los módulos comunes, `roles.js` prácticas por cargo, `app.js` perfiles, panel y bucle). Después de editar, ejecutar `sh src/build.sh` para regenerar `index.html`.

Los procedimientos son esquemas generales de referencia: antes de uso formal deben validarse con el instructor HSE, el procedimiento escrito de cada equipo y la certificación correspondiente (IWCF / IADC WellSharp, curso de alturas vigente).
