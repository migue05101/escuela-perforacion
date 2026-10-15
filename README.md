# Escuela de Perforación

Prototipo de capacitación en 3D para personal nuevo de taladros de perforación en campos petroleros. Corre en el navegador (Three.js) en celular, tableta y computador, y está preparado para gafas Meta Quest (VR) y realidad aumentada.

Un instructor con voz (Ing. Ramiro Cárdenas) acompaña cada módulo, explica y muestra una demostración antes de cada práctica.

## Módulos

1. **Inducción HSE y EPP** — ponerse el EPP en primera persona, línea de fuego, trabajo en alturas, alarma de H2S y autoridad para detener.
2. **Conoce el taladro** — recorrido narrado por cada componente: contrapozo, subestructura, piso y mesa rotaria, malacate, cabina, mástil, corona, encuelladero, bloque y top drive, preventoras, sistema de lodo y burros de tubería.
3. **Armado del equipo** — demostración del armado con grúa y práctica: elegir el orden, bajar las piezas, pinear e izar el mástil.
4. **Encuelle** — subir al encuelladero y sacar paradas en primera persona: señales al perforador, cuerda, elevador, peines y pestillo.
5. **Control de pozo básico** — el pozo en corte con una patada, hoja de viaje y simulacro de cierre (alarma, FOSV, preventora anular, presiones).
6. **Casos simulados** — patada durante un viaje, compañero sin anticaídas y alarma de H2S.

## Cómo abrirlo

Con GitHub Pages activo (Settings → Pages → rama `main`, carpeta raíz):

- https://migue05101.github.io/escuela-perforacion/

En las Meta Quest: abrir ese enlace en el navegador de las gafas y tocar **VR** dentro de un módulo. Se señala con el control y se aprieta el gatillo.

## Código

El sitio es un solo `index.html`. Las partes editables están en `src/` (`data.js` contenidos, `engine.js` motor, `models.js` modelos 3D, `modules.js` guiones de los módulos, `app.js` perfiles y bucle). Después de editar, ejecutar `sh src/build.sh` para regenerar `index.html`.

Los procedimientos son esquemas generales de referencia: antes de uso formal deben validarse con el instructor HSE, el procedimiento escrito de cada equipo y la certificación correspondiente (IWCF / IADC WellSharp, curso de alturas vigente).
