# Acreditación IADC: qué cumple la app y qué debe hacer la empresa

La IADC **no certifica aplicaciones**: acredita a un **proveedor de formación**, que es la empresa que dicta el curso. La empresa necesita:

- instructores aprobados por la IADC;
- un sistema de calidad;
- una solicitud aprobada;
- el pago de las tarifas;
- pasar las auditorías.

La app ya cumple todo lo técnico y de contenido que la IADC revisa en un curso por eLearning. Esta guía dice qué falta y en qué orden hacerlo.

Fuentes consultadas (octubre de 2026):

- RigPass Handbook for Accreditation (SCO-01 rev. 7)
- RigPass eLearning Requirements (SCO-01E)
- Manual de acreditación DIT (DIT-01S, 2.ª ed. rev. 5)
- Requisitos de instrucción virtual DIT (DIT-01V)
- Informe de auditoría DIT (DIT-61 rev. 17)
- Páginas de los programas RigPass y DIT en iadc.org

Algunos documentos de la IADC solo se ven con usuario de proveedor (el temario oficial de RigPass, los boletines y los formatos actualizados). Hay que revisarlos cuando la IADC dé acceso.

## 1. Programas y cursos

| Programa | Curso en la app | Duración | Examen | Vigencia |
|---|---|---|---|---|
| **RigPass** (orientación HSE para personal nuevo, endoso de tierra) | Inducción HSE para personal de taladro en tierra: 31 módulos (27 básicos + 4 de tierra) | 8 h (6 h básicas + 2 h de tierra) | 40 preguntas de un banco de 95; 75 % | No vence |
| **DIT** | Operaciones del obrero de patio | 5 h | 30 de un banco de 42; 75 % | 36 meses |
| **DIT** | Operaciones del cuñero en la mesa rotaria | 5 h | 30 de 42; 75 % | 36 meses |
| **DIT** | Encuellador | 5 h | 30 de 42; 75 % | 36 meses |
| **DIT** | Operación de la consola del perforador en taladros de tierra | 5 h | 30 de 42; 75 % | 36 meses |
| **DIT** | Supervisor de taladro | 5 h | 30 de 42; 75 % | 36 meses |

**Importante sobre DIT:** la IADC no acredita como DIT un curso que ya esté cubierto por otro programa suyo. El control de pozos está cubierto por **WellSharp**. Por eso el curso del perforador trata el control de pozos solo a nivel de reconocer señales y avisar, sin llamarse «control de pozos». El simulacro de cierre que ya tiene la app sirve como práctica, pero **no reemplaza WellSharp**.

## 2. Qué ya hace la app

| Requisito IADC | Cómo lo cumple la app |
|---|---|
| Usuario y clave únicos por aprendiz | Cuenta personal con documento y clave |
| Verificar identidad al inscribirse, al iniciar y antes del examen | Clave + foto en vivo, o código de 6 dígitos del instructor (para gafas o equipos sin cámara) |
| Hora de inicio, hora de fin y tiempo total | Reloj de dedicación por módulo; se pausa por inactividad |
| Aviso inicial: curso autodirigido y horas estimadas | Pantalla obligatoria antes del módulo 1 |
| Módulos en orden, sin saltar ni adelantar | Módulos con candado; sin botones de saltar; tiempo mínimo por módulo |
| Chequeos de conocimiento con remediación | 3 preguntas por módulo; si falla, el instructor vuelve a explicar y repite |
| Examen final completo, nota mínima 75 % | Examen al azar por módulo, calificado en el servidor |
| Retroalimentación y reintento | Temas por repasar y explicación de cada pregunta fallada; hasta 3 intentos y luego el instructor habilita |
| Seguridad del examen | El banco de preguntas no está en la app ni en GitHub; solo lo ve el instructor en el servidor |
| Constancia inmediata | Constancia con QR y página de verificación pública |
| Registros 5 años y disponibles para auditoría | Servidor Supabase con permisos por fila, bitácora que no se puede borrar y exportes CSV/JSON |
| Soporte técnico en vivo, instructor disponible y preguntas frecuentes | Pantalla de Ayuda con horarios y contactos (llenar en `src/config.js`) |
| Declaración de calidad y política de comentarios (RigPass) | Se acepta al empezar y está siempre en Ayuda |
| Encuestas y quejas para la mejora continua | Encuesta al aprobar; quejas con respuesta desde el panel del instructor |
| Estándar de eLearning (SCORM) | La app reporta a una plataforma LMS si se carga como paquete SCORM 1.2 (`sh scorm/package.sh`) |
| Aviso DIT «Contenido del curso no examinado por la IADC…» | En cada curso DIT y en su constancia |

## 3. Qué debe hacer la empresa (en orden)

1. **Constituir o designar al proveedor de formación.** Puede ser Oñate Salamanca Arquitectos S.A.S. si su objeto social lo permite, o una empresa aliada del sector. Necesita una sede física (no apartado postal) con internet.
2. **Conseguir instructores** con al menos 2 años de experiencia en HSE, en el sector petrolero o en docencia o formación. Lo preferido es experiencia en el sector más experiencia como formador. Deben ser **aprobados por la IADC**: se envía una solicitud por instructor. Cada instructor puede estar afiliado a máximo 4 proveedores.
3. **Montar el servidor de registros** siguiendo `server/LEEME.md`: Supabase en plan pago, con copias de seguridad.
4. **Completar los datos** en `src/config.js`:
   - razón social, dirección y página de verificación;
   - instructores;
   - soporte en vivo, al menos 12 horas al día si el curso se toma desde casa;
   - números de programa IADC, cuando los asignen.
5. **Validación técnica del contenido** por el instructor o un ingeniero HSE del sector. Ya está escrito y revisado en estructura, pero conviene confirmar estas cifras:
   - 1,50 m como altura de referencia para trabajo en alturas;
   - 8,33 lb/gal del agua en la balanza de lodo;
   - unos 26 s del agua en el embudo Marsh;
   - 60 cm entre la tierra excavada y el borde de la zanja;
   - la regla 30/30 de tormentas eléctricas;
   - la fauna nombrada por región.
6. **Redactar el sistema de calidad** a partir de `docs/iadc/02_quality_management_system.md`. Hay que llenar los campos `{{…}}` y nombrar al responsable de calidad.
7. **Preguntar a la IADC** (rigpass@iadc.org y DIT@iadc.org) antes de enviar la solicitud:
   - si aceptan la plataforma propia como LMS o exigen SCORM;
   - el formato del cargue de aprendices;
   - el temario oficial RigPass vigente;
   - las tarifas;
   - si las 8 horas en eLearning se cuentan por tiempo activo mínimo, como hace la app.
8. **Enviar las solicitudes en inglés:**
   - **RigPass:** solicitud de programa + solicitud de instructores + acuerdo de eLearning SCO-01E firmado + temario y material.
   - **DIT:** formulario DIT-03 por curso (o DIT-03A para cursos adicionales) + DIT-01E firmado + DIT-04 + DIT-37 por instructor.
   - Se adjuntan los documentos de esta carpeta:
     - `03_course_syllabi.md` (temario y objetivos)
     - `02_quality_management_system.md`
     - `04_elearning_compliance_matrix.md`
     - `05_instructor_guide.md`
     - `06_facilities_equipment.md`
9. **Pagar las tarifas.** La de solicitud vence a los 30 días de presentada, y luego hay una tarifa anual. Los valores vigentes están en el DIT-06 y en la tabla de tarifas de RigPass.
10. **Conceder acceso a la IADC:** una cuenta de instructor para el auditor y una de aprendiz de prueba.
11. **Auditoría:** RigPass la hace a los 6–12 meses de la acreditación condicional; ambos programas tienen al menos una dentro del ciclo de 3 años. Las renovaciones se presentan 45 días antes del vencimiento, y los cambios se reportan dentro de 30 días.

## 4. Lo que la app no puede resolver sola

- La aprobación de los instructores, la solicitud, las tarifas y la auditoría.
- La carga de los aprendices a la base de datos de la IADC. La app exporta el CSV, pero la carga la hace el administrador del proveedor. El certificado o la tarjeta oficial la emite la IADC desde su base de datos.
- El texto oficial de la «Quality Statement & Comment Policy» de la IADC. La app trae una versión del proveedor que se puede reemplazar por la oficial.
- Si la IADC exige que el examen o alguna parte se presente con un instructor viendo en vivo, se puede hacer por videollamada con el código de verificación del instructor.
