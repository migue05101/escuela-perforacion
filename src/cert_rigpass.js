/* Contenido del curso. El banco del examen final NO va aquí: está en privado/ y se sube al servidor desde el panel del instructor. */
const CERT_RIGPASS = {
 "id": "rigpass",
 "program": "RigPass",
 "code": "RP-LAND",
 "title": "Inducción HSE para personal de taladro en tierra",
 "en": {
  "title": "HSE Rig Orientation for Land Drilling Personnel",
  "description": "Awareness-level health, safety and environmental orientation for new personnel joining a land drilling rig. The course covers basic safety culture and stop-work authority, the drilling rig and crew roles, personal protective equipment, hazard recognition and communication, job safety analysis, permit to work, management of change, manual handling, working at heights, dropped objects, electrical safety and energy isolation, rigging and mobile equipment, hazardous materials, occupational health, hydrogen sulfide, fire, first aid, emergency response, environmental protection, incident reporting and security. A land endorsement covers excavations, pits and open tanks, wildlife hazards in Colombian oilfields and onshore location and rig-move hazards. Instruction is delivered in Spanish with narrated lessons, knowledge checks with remediation, 3D practice scenarios and a final written exam.",
  "audience": "New and short-service employees, contractors and visitors who will work on or regularly enter a land drilling location."
 },
 "description": "Inducción de nivel básico en salud, seguridad y ambiente para quien llega por primera vez a un taladro de perforación en tierra: cultura de seguridad y autoridad para detener el trabajo, el taladro y la cuadrilla, EPP, peligros y su comunicación, AST, permisos de trabajo, gestión del cambio, levantamiento de cargas, trabajo en alturas, objetos que caen, electricidad y aislamiento de energías, izaje y equipos móviles, sustancias químicas, salud ocupacional, H2S, incendios, primeros auxilios, emergencias, ambiente, reporte de incidentes y seguridad física. Incluye un módulo de tierra sobre excavaciones, piscinas y tanques abiertos, fauna de los campos colombianos y peligros de la locación y la movilización del taladro.",
 "audience": "Personal nuevo y de servicio corto (SSE), contratistas y visitantes frecuentes que van a trabajar o ingresar a una locación de perforación en tierra.",
 "level": "awareness",
 "hours": 8,
 "validityMonths": 0,
 "classMin": 1,
 "classMax": 25,
 "modules": [
  {
   "id": "rp01",
   "title": "El taladro y tu cuadrilla",
   "en": {
    "title": "The Drilling Rig and Your Crew",
    "objectives": [
     "Identify the main components of a land drilling rig and their function",
     "Recognize the roles of each crew member and the chain of command",
     "List the areas of the location where special restrictions apply"
    ]
   },
   "objectives": [
    "Identificar los componentes principales de un taladro de tierra y su función",
    "Reconocer el rol de cada miembro de la cuadrilla y la línea de mando",
    "Enumerar las áreas de la locación donde aplican restricciones especiales"
   ],
   "minutes": 18,
   "endorsement": false,
   "lessons": [
    {
     "t": "Qué hace un taladro de perforación",
     "say": "Un taladro de perforación existe para abrir un pozo de forma segura y controlada. Para lograrlo debe hacer tres cosas al tiempo: levantar y bajar tubería, hacer girar la broca y circular lodo por dentro del pozo. Cada equipo que vas a ver en la locación cumple una de esas tareas o sirve para controlar el pozo. Si entiendes qué hace cada equipo, entiendes dónde está el peligro.",
     "points": [
      "Sistema de izaje: levanta y baja la sarta",
      "Sistema de rotación: hace girar la broca",
      "Sistema de circulación: bombea lodo al pozo",
      "Sistema de control de pozo: evita que el pozo fluya sin control"
     ]
    },
    {
     "t": "El mástil y el sistema de izaje",
     "say": "El mástil es la torre que sostiene la corona en la parte alta. Desde la corona baja el cable de perforación hasta el bloque viajero, y el malacate enrolla o suelta ese cable para subir y bajar la tubería. A media altura está el encuelladero, donde trabaja el encuellador cuando se sacan o meten paradas. Nunca te quedes debajo de una carga ni de una zona donde se trabaja en altura.",
     "points": [
      "Corona arriba, bloque viajero colgando del cable",
      "El malacate controla el cable de perforación",
      "Encuelladero: plataforma de trabajo en altura del encuellador",
      "Zona debajo del mástil: peligro de objetos que caen"
     ]
    },
    {
     "t": "Piso de perforación y rotación",
     "say": "El piso o mesa de perforación es donde trabaja la cuadrilla con la tubería. Allí están la mesa rotaria, las cuñas que sostienen la sarta, las llaves de fuerza o tenazas y la llave de giro. Arriba, el top drive o la kelly hacen girar la sarta. Es el área con más puntos de atrapamiento del taladro, así que solo entras cuando te autorizan y con tu tarea clara.",
     "points": [
      "Mesa rotaria, cuñas, llaves de fuerza y llave de giro",
      "Top drive o kelly hacen girar la tubería",
      "La cabina del perforador controla todo desde el piso",
      "Entrada al piso solo con autorización"
     ]
    },
    {
     "t": "Sistema de lodo y control de pozo",
     "say": "Las bombas de lodo envían el fluido por dentro de la tubería; el lodo regresa por el anular, pasa por las zarandas y cae a los tanques. Debajo de la mesa, en el contrapozo, están las preventoras o BOP, que cierran el pozo si hay una patada. El acumulador o Koomey guarda la presión hidráulica para cerrarlas. Estas áreas tienen alta presión, químicos y posible presencia de gas.",
     "points": [
      "Bombas, líneas de alta presión, zarandas y tanques",
      "BOP en el contrapozo: cierran el pozo",
      "El acumulador (Koomey) guarda energía hidráulica",
      "Contrapozo y tanques: posible acumulación de gases"
     ]
    },
    {
     "t": "Tu cuadrilla y la línea de mando",
     "say": "El company man representa a la operadora; el jefe de equipo o toolpusher dirige el taladro. El perforador manda en el piso y coordina al encuellador, a los cuñeros y a los obreros de patio. También hay mecánico, electricista, motorista y personal de HSE. Tú recibes instrucciones de tu supervisor directo, y si algo no está claro preguntas antes de actuar.",
     "points": [
      "Company man: representante de la operadora",
      "Jefe de equipo: responsable del taladro",
      "Perforador: manda en el piso de perforación",
      "Encuellador, cuñeros, obreros de patio, mecánico, eléctrico, HSE"
     ]
    }
   ],
   "activity": {
    "mod": "taladro",
    "label": "Práctica 3D: recorrido narrado por los componentes del taladro"
   },
   "checks": [
    {
     "q": "¿Qué equipo enrolla y suelta el cable de perforación para subir y bajar la tubería?",
     "o": [
      "El malacate",
      "La bomba de lodo",
      "La zaranda",
      "El acumulador"
     ],
     "a": 0,
     "e": "El malacate es el corazón del sistema de izaje: controla el cable que pasa por la corona y el bloque viajero.",
     "ref": 1
    },
    {
     "q": "¿Dónde se ubican normalmente las preventoras (BOP) en un taladro de tierra?",
     "o": [
      "En el encuelladero",
      "Junto a los tanques de lodo",
      "En el contrapozo, debajo de la mesa",
      "En la cabina del perforador"
     ],
     "a": 2,
     "e": "Las BOP van sobre la cabeza del pozo, en el contrapozo debajo de la mesa, y cierran el pozo ante una patada.",
     "ref": 3
    },
    {
     "q": "¿Quién manda directamente sobre la cuadrilla en el piso de perforación?",
     "o": [
      "El motorista",
      "El visitante de mayor rango",
      "El obrero de patio con más experiencia",
      "El perforador"
     ],
     "a": 3,
     "e": "El perforador dirige el trabajo del piso y coordina al encuellador, los cuñeros y los obreros de patio.",
     "ref": 4
    }
   ]
  },
  {
   "id": "rp02",
   "title": "Seguridad básica, respeto y autoridad para detener el trabajo",
   "en": {
    "title": "Basic Safety, Respect for Co-Workers and Stop-Work Authority",
    "objectives": [
     "Define stop-work authority and recognize when to use it",
     "Identify the expected behaviors of respect and the prohibited conduct on location",
     "Recognize the rules that apply to short-service employees"
    ]
   },
   "objectives": [
    "Definir la autoridad para detener el trabajo y reconocer cuándo usarla",
    "Identificar los comportamientos de respeto esperados y las conductas prohibidas en la locación",
    "Reconocer las reglas que aplican al trabajador nuevo o de servicio corto (SSE)"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "La seguridad es parte del trabajo",
     "say": "En un taladro nadie trabaja solo: lo que tú haces afecta a tus compañeros y lo que ellos hacen te afecta a ti. Seguir los procedimientos no es un trámite, es la forma correcta de hacer el trabajo. Si una tarea no se puede hacer de forma segura, no se hace hasta corregir la condición. Tu objetivo cada turno es volver a casa sano, y que tu cuadrilla también vuelva.",
     "points": [
      "Cumple los procedimientos y las instrucciones de tu supervisor",
      "Si no sabes, pregunta antes de actuar",
      "Avisa de inmediato cualquier condición insegura",
      "Cuida de ti y de tus compañeros"
     ]
    },
    {
     "t": "Autoridad para detener el trabajo",
     "say": "Todos en la locación, incluido tú desde el primer día, tienen la autoridad y la obligación de detener una tarea si ven un peligro que no está controlado. Lo haces de forma clara y respetuosa: avisas, pones la tarea en un estado seguro si puedes, y llamas al supervisor. Nadie puede castigarte por detener un trabajo de buena fe. El trabajo se reanuda solo cuando el peligro se corrigió y todos están de acuerdo.",
     "points": [
      "Cualquiera puede detener el trabajo, sin represalias",
      "Avisa claro: “¡Pare!” y explica por qué",
      "Informa al supervisor y espera la corrección",
      "Se reanuda solo cuando el peligro está controlado"
     ]
    },
    {
     "t": "Respeto entre compañeros",
     "say": "El respeto también es seguridad. Una cuadrilla donde la gente se grita, se burla o se acosa no se comunica bien, y la mala comunicación causa accidentes. En la locación están prohibidos el acoso, la discriminación, las peleas y las bromas pesadas o juegos de manos. Si eres víctima o testigo de una conducta así, repórtala a tu supervisor o por el canal que defina tu empresa.",
     "points": [
      "Cero acoso, discriminación o intimidación",
      "Prohibidas las bromas pesadas y los juegos de manos",
      "Habla con calma, aun bajo presión",
      "Reporta las conductas irrespetuosas"
     ]
    },
    {
     "t": "El trabajador nuevo (SSE)",
     "say": "Mientras eres nuevo en el taladro o en tu cargo, eres un trabajador de servicio corto o SSE. Normalmente se te identifica con un casco o distintivo de color diferente, se te asigna un compañero mentor y no puedes trabajar solo ni hacer tareas para las que no te han entrenado. La duración de ese periodo y sus reglas las define tu empresa. Esto no es un castigo: es la forma de aprender sin ponerte en riesgo.",
     "points": [
      "Distintivo visible de trabajador nuevo",
      "Siempre acompañado por un mentor",
      "No hagas tareas sin entrenamiento ni autorización",
      "Pregunta todo lo que no entiendas"
     ]
    },
    {
     "t": "Reglas básicas de la locación",
     "say": "Cada locación tiene reglas que no se negocian. Fuma solo en las áreas señaladas, usa los caminos peatonales, respeta las barreras y los avisos y no toques equipos que no te asignaron. Los celulares y equipos electrónicos personales tienen restricciones en las áreas cercanas al pozo. Si no conoces una regla, pregúntala en la charla de inducción de la locación.",
     "points": [
      "Respeta avisos, barreras y caminos peatonales",
      "Fuma solo en el área designada",
      "No operes equipos que no te asignaron",
      "Restricción de celulares cerca del pozo"
     ]
    }
   ],
   "activity": {
    "mod": "casos",
    "label": "Práctica 3D: casos simulados, decide cuándo detener el trabajo"
   },
   "checks": [
    {
     "q": "Ves que un compañero va a trabajar en el encuelladero sin conectar su anticaídas. ¿Qué haces?",
     "o": [
      "Esperas a ver si alguien más dice algo",
      "Detienes la tarea, le avisas y llamas al supervisor",
      "Lo anotas para el informe del fin de semana",
      "Nada, porque eres nuevo y no tienes autoridad"
     ],
     "a": 1,
     "e": "Todos, también el trabajador nuevo, tienen la autoridad y la obligación de detener una tarea insegura y avisar al supervisor.",
     "ref": 1
    },
    {
     "q": "¿Qué caracteriza normalmente al trabajador de servicio corto (SSE)?",
     "o": [
      "Puede trabajar solo desde el primer día",
      "Está exento de asistir a las charlas",
      "Tiene un distintivo visible y un mentor asignado",
      "Solo trabaja en el turno de noche"
     ],
     "a": 2,
     "e": "El SSE se identifica con un distintivo, trabaja acompañado por un mentor y no hace tareas sin entrenamiento.",
     "ref": 3
    },
    {
     "q": "¿Cuál de estas conductas está prohibida en la locación?",
     "o": [
      "Las bromas pesadas y los juegos de manos",
      "Preguntar al supervisor",
      "Reportar una condición insegura",
      "Usar los caminos peatonales"
     ],
     "a": 0,
     "e": "Las bromas pesadas y los juegos de manos distraen y causan accidentes; están prohibidos junto con el acoso y las peleas.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp03",
   "title": "Política de alcohol y drogas",
   "en": {
    "title": "Drug and Alcohol Policies",
    "objectives": [
     "Recognize the purpose of drug and alcohol policies on a drilling location",
     "Identify the situations in which testing may be required",
     "List your obligations regarding prescription and over-the-counter medication"
    ]
   },
   "objectives": [
    "Reconocer el propósito de la política de alcohol y drogas en la locación",
    "Identificar las situaciones en que se pueden realizar pruebas",
    "Enumerar tus obligaciones con los medicamentos formulados o de venta libre"
   ],
   "minutes": 10,
   "endorsement": false,
   "lessons": [
    {
     "t": "Por qué existe la política",
     "say": "El alcohol y las drogas afectan los reflejos, el juicio y la coordinación, y en un taladro un error de un segundo puede costar una vida. Por eso las empresas exigen que llegues al turno en condiciones de trabajar, sin efectos de ninguna sustancia. Esto incluye los efectos del día anterior: el guayabo también reduce tu atención. La política protege tu vida y la de la cuadrilla.",
     "points": [
      "Las sustancias afectan juicio, reflejos y equilibrio",
      "Debes llegar apto para trabajar",
      "Los efectos del día anterior también cuentan",
      "Aplica a todo el personal, también contratistas"
     ]
    },
    {
     "t": "Lo que está prohibido",
     "say": "En la locación, en el campamento y en los vehículos de la empresa está prohibido tener, consumir, vender o estar bajo efectos de alcohol o drogas ilegales. También está prohibido el mal uso de medicamentos. El detalle de la política y sus consecuencias, que pueden llegar a la terminación del contrato, lo define tu empresa. Léela y firma solo cuando la entiendas.",
     "points": [
      "Prohibido tener, consumir o vender alcohol o drogas",
      "Aplica en locación, campamento y vehículos",
      "Prohibido el mal uso de medicamentos",
      "Las consecuencias las define la empresa"
     ]
    },
    {
     "t": "Pruebas de alcohol y drogas",
     "say": "Puedes ser llamado a pruebas antes del ingreso, al azar, cuando haya una sospecha razonable o después de un incidente. Negarte a la prueba normalmente se trata igual que un resultado positivo. Las pruebas se hacen con respeto y confidencialidad. Si te toca, colabora con calma.",
     "points": [
      "Antes del ingreso y de forma aleatoria",
      "Por sospecha razonable",
      "Después de un incidente",
      "Negarse suele tratarse como positivo"
     ]
    },
    {
     "t": "Medicamentos y aptitud para trabajar",
     "say": "Algunos medicamentos, incluso de venta libre como ciertos antigripales o antialérgicos, producen sueño o mareo. Si tomas un medicamento que pueda afectar tu trabajo, infórmalo al médico o paramédico de la locación o a tu supervisor según el procedimiento. No se trata de contar tu historia clínica, sino de que te asignen una tarea segura. Si te sientes mal o no estás en condiciones, dilo antes de empezar.",
     "points": [
      "Informa los medicamentos que causan sueño o mareo",
      "Usa solo medicamentos formulados para ti",
      "Si no estás apto, avisa antes del turno",
      "Reporta si ves a un compañero no apto"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Tomaste un antigripal que da sueño antes de tu turno. ¿Qué debes hacer?",
     "o": [
      "Nada, porque es de venta libre",
      "Tomar café y empezar a trabajar",
      "Trabajar solo en el encuelladero",
      "Informarlo al paramédico o supervisor según el procedimiento"
     ],
     "a": 3,
     "e": "Un medicamento que produce sueño puede afectar tu seguridad; se informa para que te asignen una tarea segura.",
     "ref": 3
    },
    {
     "q": "¿En cuál de estas situaciones se puede realizar una prueba de alcohol y drogas?",
     "o": [
      "Solo cuando el trabajador lo pide",
      "Después de un incidente",
      "Solo en el examen de retiro",
      "Nunca dentro de la locación"
     ],
     "a": 1,
     "e": "Las pruebas pueden ser de ingreso, aleatorias, por sospecha razonable o después de un incidente.",
     "ref": 2
    },
    {
     "q": "¿Dónde aplica la prohibición de alcohol y drogas?",
     "o": [
      "En la locación, el campamento y los vehículos de la empresa",
      "Solo en el piso de perforación",
      "Solo durante el turno de noche",
      "Solo en los vehículos"
     ],
     "a": 0,
     "e": "La política cubre la locación, el campamento y los vehículos de la empresa.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp04",
   "title": "Conducción segura",
   "en": {
    "title": "Driving Safety",
    "objectives": [
     "Identify the main hazards of driving to and within oilfield locations",
     "Recognize defensive driving practices and journey management rules",
     "List the rules for reversing and moving vehicles on location"
    ]
   },
   "objectives": [
    "Identificar los principales peligros de conducir hacia la locación y dentro de ella",
    "Reconocer las prácticas de manejo defensivo y las reglas del plan de viaje",
    "Enumerar las reglas para dar reversa y circular dentro de la locación"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "El viaje también es parte del trabajo",
     "say": "Los accidentes de tránsito son una de las principales causas de muertes en la industria petrolera. Las vías hacia los campos en Colombia tienen curvas, huecos, derrumbes, lluvias fuertes, motos, animales sueltos y tractomulas. Por eso el viaje se planea igual que cualquier tarea de riesgo. Si conduces, solo lo haces con la licencia vigente y la autorización de tu empresa.",
     "points": [
      "Conduce solo si estás autorizado y con licencia vigente",
      "Vías rurales: derrumbes, animales, motos y lluvia",
      "El cinturón lo usan todos los ocupantes",
      "Respeta los límites de velocidad de la empresa"
     ]
    },
    {
     "t": "Plan de viaje y fatiga",
     "say": "Antes de salir, el plan de viaje define la ruta, la hora de salida y llegada, las paradas y a quién reportas. Muchas empresas restringen el manejo nocturno en zonas rurales. Nunca conduzcas cansado: después de un turno de doce horas tu atención está baja. Si sientes sueño, detente en un lugar seguro y reporta.",
     "points": [
      "Reporta salida y llegada según el plan de viaje",
      "Respeta las restricciones de manejo nocturno",
      "No manejes después de un turno sin descanso",
      "Si te da sueño, detente y avisa"
     ]
    },
    {
     "t": "Manejo defensivo",
     "say": "Manejar a la defensiva significa anticipar los errores de los demás. Guarda una buena distancia con el vehículo de adelante, más aún con lluvia o en destapado. No uses el celular mientras conduces, ni siquiera con manos libres si tu empresa lo prohíbe. Inspecciona el vehículo antes de salir: llantas, luces, frenos y kit de carretera.",
     "points": [
      "Distancia de seguimiento amplia, más con lluvia",
      "Cero celular mientras conduces",
      "Inspección preoperacional del vehículo",
      "Anticipa motos, peatones y animales"
     ]
    },
    {
     "t": "Circular dentro de la locación",
     "say": "Dentro de la locación la velocidad es muy baja y los peatones tienen prioridad. Estaciona en el área asignada, en posición de salida rápida y lejos de la boca del pozo. Para dar reversa usa un señalero o, si no hay, baja y revisa el área antes de moverte. Como peatón, nunca camines por detrás de un vehículo que está retrocediendo y busca contacto visual con el conductor.",
     "points": [
      "Velocidad mínima y prioridad al peatón",
      "Parquea en posición de salida y lejos del pozo",
      "Reversa con señalero o revisando antes",
      "Peatón: contacto visual con el conductor"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Cómo debes estacionar un vehículo en la locación?",
     "o": [
      "Lo más cerca posible del piso de perforación",
      "Junto a los tanques de combustible",
      "En el área asignada y en posición de salida rápida",
      "Donde haya sombra"
     ],
     "a": 2,
     "e": "Se estaciona en el área asignada, lejos del pozo, en posición de salida para una evacuación rápida.",
     "ref": 3
    },
    {
     "q": "Terminaste un turno de doce horas y te piden conducir de regreso de noche. ¿Qué es lo correcto?",
     "o": [
      "Manejar rápido para llegar pronto",
      "Tomar bebida energizante y salir",
      "Manejar con las luces altas todo el tiempo",
      "Seguir el plan de viaje y no conducir si estás fatigado"
     ],
     "a": 3,
     "e": "La fatiga y el manejo nocturno son riesgos altos; se sigue el plan de viaje y no se conduce cansado.",
     "ref": 1
    },
    {
     "q": "¿Qué haces antes de dar reversa en la locación si no hay señalero?",
     "o": [
      "Pitas y retrocedes rápido",
      "Bajas y revisas el área antes de moverte",
      "Retrocedes mirando solo el espejo",
      "Prendes la radio para avisar"
     ],
     "a": 1,
     "e": "Sin señalero, se baja del vehículo y se verifica el área antes de retroceder.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp05",
   "title": "Elementos de protección personal (EPP)",
   "en": {
    "title": "Personal Protective Equipment",
    "objectives": [
     "Identify the basic PPE required on a land drilling location",
     "Recognize the additional PPE required for specific tasks",
     "List the steps to inspect, use and replace PPE"
    ]
   },
   "objectives": [
    "Identificar el EPP básico exigido en una locación de perforación en tierra",
    "Reconocer el EPP adicional que exigen tareas específicas",
    "Enumerar los pasos para inspeccionar, usar y reponer el EPP"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "El EPP es la última barrera",
     "say": "El EPP no elimina el peligro: solo reduce el daño si algo sale mal. Primero se elimina o se controla el peligro con ingeniería y procedimientos, y el EPP es la última barrera. Aun así, en el taladro es obligatorio, porque siempre quedan riesgos. Usarlo bien y completo es tu responsabilidad.",
     "points": [
      "Primero eliminar, sustituir y controlar el peligro",
      "El EPP es la última línea de defensa",
      "Es obligatorio en toda la locación",
      "Úsalo completo y bien ajustado"
     ]
    },
    {
     "t": "EPP básico de la locación",
     "say": "Para entrar a la locación necesitas como mínimo casco, gafas de seguridad, botas de seguridad con puntera, overol o ropa de trabajo de manga larga y guantes. En muchas locaciones la ropa debe ser ignífuga por el riesgo de fuego repentino. Es común también llevar monitor personal de gases y protección auditiva a la mano. Tu empresa te indica exactamente cuál es el EPP básico de esa locación.",
     "points": [
      "Casco, gafas, botas con puntera y guantes",
      "Overol de manga larga, ignífugo si se exige",
      "Protección auditiva a la mano",
      "Monitor de gases cuando lo exige la locación"
     ]
    },
    {
     "t": "EPP para tareas específicas",
     "say": "Algunas tareas piden protección extra. Para manejar químicos como la soda cáustica necesitas careta, guantes de nitrilo o neopreno y delantal; para trabajos en alturas, arnés de cuerpo completo; para soldar, careta y guantes de soldador; en áreas con H2S, equipo de respiración autónoma o de línea. La hoja de seguridad del químico y el AST de la tarea te dicen qué usar.",
     "points": [
      "Químicos: careta, guantes resistentes, delantal",
      "Alturas: arnés de cuerpo completo y conectores",
      "Ruido alto: tapones u orejeras",
      "H2S: equipo de respiración autónoma o de línea"
     ]
    },
    {
     "t": "Inspección y cuidado",
     "say": "Antes de cada uso revisa tu EPP. Un casco con grietas, unas gafas rayadas que no dejan ver o unos guantes rotos no te protegen. Si un elemento está dañado, repórtalo y cámbialo antes de empezar. Guarda tu EPP limpio y lejos del sol y de los químicos.",
     "points": [
      "Inspecciona antes de cada uso",
      "Cambia lo que esté roto, vencido o contaminado",
      "Nunca modifiques el EPP",
      "Guárdalo limpio y protegido"
     ]
    },
    {
     "t": "Ropa y accesorios",
     "say": "La ropa suelta, el pelo largo sin recoger, las cadenas, los anillos y los relojes pueden engancharse en equipos que giran y arrastrarte. En el taladro no se usan anillos ni joyas en el trabajo. Lleva el overol cerrado y las mangas abajo. Si tienes el pelo largo, recógelo y guárdalo bajo el casco.",
     "points": [
      "Nada de anillos, cadenas ni relojes colgantes",
      "Overol cerrado y mangas abajo",
      "Pelo largo recogido",
      "Ropa sin partes sueltas"
     ]
    }
   ],
   "activity": {
    "mod": "hse",
    "label": "Práctica 3D: elige y ponte el EPP correcto"
   },
   "checks": [
    {
     "q": "¿Por qué se dice que el EPP es la última barrera?",
     "o": [
      "Porque es lo más barato",
      "Porque se pone al final del turno",
      "Porque solo reduce el daño cuando los otros controles fallan",
      "Porque reemplaza los procedimientos"
     ],
     "a": 2,
     "e": "El EPP no elimina el peligro; los controles de ingeniería y los procedimientos van primero.",
     "ref": 0
    },
    {
     "q": "Vas a preparar una mezcla con soda cáustica. ¿Qué EPP adicional necesitas?",
     "o": [
      "Careta, guantes resistentes a químicos y delantal",
      "Solo el casco",
      "Arnés de cuerpo completo",
      "Tapones auditivos"
     ],
     "a": 0,
     "e": "La soda cáustica quema piel y ojos; se usa careta, guantes de nitrilo o neopreno y delantal, según la hoja de seguridad.",
     "ref": 2
    },
    {
     "q": "¿Por qué no se usan anillos en el piso de perforación?",
     "o": [
      "Porque se pueden perder",
      "Porque interfieren con la radio",
      "Porque están prohibidos solo de noche",
      "Porque pueden engancharse y causar amputaciones"
     ],
     "a": 3,
     "e": "Los anillos y joyas se enganchan en equipos y bordes y pueden causar lesiones graves en los dedos.",
     "ref": 4
    }
   ]
  },
  {
   "id": "rp06",
   "title": "Identificación y comunicación de peligros",
   "en": {
    "title": "Hazard Awareness and Hazard Communication",
    "objectives": [
     "Define hazard and risk and recognize common hazards on a land rig",
     "Identify the information found on chemical labels and safety data sheets",
     "Recognize the hazard pictograms used on chemical containers"
    ]
   },
   "objectives": [
    "Definir peligro y riesgo y reconocer los peligros comunes de un taladro de tierra",
    "Identificar la información de las etiquetas y de las hojas de datos de seguridad (FDS)",
    "Reconocer los pictogramas de peligro usados en los recipientes de químicos"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Peligro y riesgo",
     "say": "Un peligro es algo que puede hacer daño: una carga suspendida, un químico, una superficie con lodo. El riesgo es la probabilidad de que ese daño ocurra y qué tan grave sería. Tu trabajo es ver el peligro antes de que te alcance. Antes de cada tarea pregúntate qué puede salir mal y qué te protege.",
     "points": [
      "Peligro: lo que puede causar daño",
      "Riesgo: probabilidad por gravedad",
      "Pregúntate qué puede salir mal",
      "Identifica el peligro antes de actuar"
     ]
    },
    {
     "t": "Peligros típicos del taladro",
     "say": "En un taladro de tierra encuentras energía en todas sus formas: cargas suspendidas, tubería que gira, presión en las líneas de lodo, electricidad, químicos, ruido, calor y gases como el H2S. También hay peligros de caída, de atrapamiento y de vehículos en movimiento. Mira siempre la línea de fuego: el camino que tomaría algo si se suelta, se rompe o se mueve.",
     "points": [
      "Cargas suspendidas y tubería en movimiento",
      "Presión, electricidad y químicos",
      "Caídas, atrapamientos y vehículos",
      "Línea de fuego: no te pongas en el camino"
     ]
    },
    {
     "t": "Tu derecho a saber",
     "say": "Tienes derecho a conocer los peligros de los químicos con los que trabajas. Por eso cada producto en la locación debe tener su etiqueta y su hoja de datos de seguridad, o FDS, disponible para ti. Antes de usar un químico por primera vez, lee la etiqueta y pide la FDS. Si un recipiente no tiene etiqueta, no lo uses y repórtalo.",
     "points": [
      "Cada químico con etiqueta y FDS disponible",
      "Lee antes de usar por primera vez",
      "Recipiente sin etiqueta: no se usa",
      "Pregunta a HSE dónde están las FDS"
     ]
    },
    {
     "t": "La hoja de datos de seguridad",
     "say": "La FDS tiene dieciséis secciones con toda la información del producto. Las que más vas a usar dicen qué peligros tiene, qué primeros auxilios aplicar, qué hacer en caso de derrame o incendio, cómo manejarlo y almacenarlo y qué EPP usar. No necesitas memorizarla, pero sí saber buscar esa información rápido.",
     "points": [
      "Identificación y peligros del producto",
      "Primeros auxilios",
      "Derrames e incendio",
      "Manejo, almacenamiento y EPP"
     ]
    },
    {
     "t": "Etiquetas y pictogramas",
     "say": "Las etiquetas usan pictogramas: rombos con borde rojo y un símbolo negro. La llama indica inflamable; la mano y la superficie corroídas, corrosivo; la calavera, toxicidad aguda; el signo de admiración, irritante o nocivo; la silueta humana con estrella, daño grave a la salud a largo plazo. La etiqueta también trae una palabra de advertencia, “Peligro” o “Atención”. Si pasas un químico a otro recipiente, ese recipiente también debe quedar etiquetado.",
     "points": [
      "Llama: inflamable",
      "Corrosión: quema piel, ojos y metales",
      "Calavera: tóxico",
      "Silueta con estrella: daño crónico a la salud",
      "Recipientes secundarios también etiquetados"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Qué es la línea de fuego?",
     "o": [
      "La ruta de evacuación ante incendio",
      "El camino que tomaría algo si se suelta, se rompe o se mueve",
      "La línea de gas del campamento",
      "El borde de la mesa rotaria"
     ],
     "a": 1,
     "e": "La línea de fuego es la trayectoria de una carga, una herramienta o un fluido si se libera; nunca te ubiques en ella.",
     "ref": 1
    },
    {
     "q": "Encuentras un balde con un líquido y sin etiqueta. ¿Qué haces?",
     "o": [
      "No lo usas y lo reportas",
      "Lo usas si huele a jabón",
      "Lo botas al drenaje",
      "Le escribes el nombre que creas que es"
     ],
     "a": 0,
     "e": "Un recipiente sin etiqueta no se usa; se reporta para identificarlo y manejarlo correctamente.",
     "ref": 2
    },
    {
     "q": "¿Qué indica el pictograma de una mano y una superficie corroídas?",
     "o": [
      "Producto inflamable",
      "Gas a presión",
      "Producto corrosivo",
      "Peligro para el ambiente acuático"
     ],
     "a": 2,
     "e": "Ese pictograma identifica productos corrosivos que queman la piel, los ojos y los metales, como la soda cáustica.",
     "ref": 4
    }
   ]
  },
  {
   "id": "rp07",
   "title": "Análisis de trabajo seguro (AST)",
   "en": {
    "title": "Job Safety Analysis (JSA)",
    "objectives": [
     "Define a job safety analysis and its purpose",
     "List the basic steps to prepare a JSA",
     "Recognize when a JSA must be reviewed or redone"
    ]
   },
   "objectives": [
    "Definir el análisis de trabajo seguro (AST) y su propósito",
    "Enumerar los pasos básicos para elaborar un AST",
    "Reconocer cuándo se debe revisar o repetir un AST"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Qué es el AST",
     "say": "El análisis de trabajo seguro, AST o ATS, es una herramienta para pensar la tarea antes de hacerla. Se divide el trabajo en pasos, se identifican los peligros de cada paso y se definen los controles. Lo hace la cuadrilla que va a ejecutar la tarea, en el sitio, antes de empezar. Es la base de la charla previa al trabajo.",
     "points": [
      "Se hace antes de empezar la tarea",
      "Lo elabora la cuadrilla que la ejecuta",
      "Pasos, peligros y controles",
      "Se discute en el sitio de trabajo"
     ]
    },
    {
     "t": "Paso 1: dividir la tarea",
     "say": "Primero escribe la tarea en pasos en el orden en que se hacen, por ejemplo: preparar el área, posicionar la carga, enganchar, izar, bajar y desenganchar. No hagas pasos demasiado generales ni demasiado detallados. Un buen AST de una tarea común tiene entre cinco y diez pasos. Si no sabes cómo se hace un paso, esa es la primera alerta.",
     "points": [
      "Pasos en orden de ejecución",
      "Ni muy generales ni demasiado detallados",
      "Usa verbos de acción",
      "Si un paso no está claro, pregunta"
     ]
    },
    {
     "t": "Paso 2 y 3: peligros y controles",
     "say": "Para cada paso pregunta qué puede salir mal: golpes, atrapamientos, caídas, químicos, presión, electricidad, ruido. Luego define cómo controlarlo: aislar la energía, usar una herramienta de empuje, poner un señalero, usar el EPP correcto. Cada control debe tener un responsable. El control más fuerte es el que elimina el peligro, no el que solo lo advierte.",
     "points": [
      "Peligros de cada paso",
      "Controles concretos y con responsable",
      "Prioriza eliminar o aislar el peligro",
      "El EPP complementa, no reemplaza"
     ]
    },
    {
     "t": "Participa y firma con conciencia",
     "say": "Tu firma en el AST significa que entendiste los peligros y los controles, no que asististe. Si algo no te queda claro o ves un peligro que no se anotó, dilo en la charla. La experiencia del trabajador nuevo también cuenta, porque a veces ve lo que los demás ya no ven. Un AST bien hecho es una conversación, no un papel.",
     "points": [
      "Firma solo si entendiste",
      "Aporta los peligros que veas",
      "Pregunta tu rol en cada paso",
      "El AST es una conversación de cuadrilla"
     ]
    },
    {
     "t": "Cuándo revisar el AST",
     "say": "El AST se revisa cuando cambian las condiciones: entra una persona nueva a la tarea, cambia el clima, falla un equipo, cambia el método o aparece un peligro no previsto. En ese caso se detiene el trabajo, se actualiza el AST y se vuelve a explicar a todos. Seguir trabajando con un AST que ya no aplica es trabajar a ciegas.",
     "points": [
      "Persona nueva en la tarea",
      "Cambio de clima, equipo o método",
      "Peligro no previsto",
      "Detener, actualizar y volver a explicar"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Quién debe elaborar el AST de una tarea?",
     "o": [
      "Solo el departamento de HSE en la oficina",
      "El company man al final del turno",
      "Cualquier persona después del trabajo",
      "La cuadrilla que va a ejecutar la tarea, en el sitio"
     ],
     "a": 3,
     "e": "El AST lo hace la cuadrilla que ejecuta el trabajo, en el sitio y antes de empezar.",
     "ref": 0
    },
    {
     "q": "Durante una tarea empieza a llover fuerte y la superficie se vuelve resbalosa. ¿Qué haces con el AST?",
     "o": [
      "Nada, ya estaba firmado",
      "Detienes, revisas el AST y lo actualizas con la cuadrilla",
      "Lo firmas de nuevo sin leerlo",
      "Lo guardas para la investigación"
     ],
     "a": 1,
     "e": "Un cambio de condiciones obliga a detener, revisar y actualizar el AST antes de continuar.",
     "ref": 4
    },
    {
     "q": "¿Qué significa tu firma en el AST?",
     "o": [
      "Que asististe a la charla",
      "Que la tarea ya terminó",
      "Que entendiste los peligros, los controles y tu rol",
      "Que aceptas cualquier riesgo"
     ],
     "a": 2,
     "e": "La firma confirma que entendiste; si no entiendes, pregunta antes de firmar.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp08",
   "title": "Permiso de trabajo",
   "en": {
    "title": "Permit to Work",
    "objectives": [
     "Define the permit-to-work system and its purpose",
     "Identify the types of work that require a permit on a land rig",
     "Recognize the responsibilities of the worker who works under a permit"
    ]
   },
   "objectives": [
    "Definir el sistema de permisos de trabajo y su propósito",
    "Identificar los trabajos que requieren permiso en un taladro de tierra",
    "Reconocer las responsabilidades del trabajador que labora bajo un permiso"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Para qué sirve un permiso",
     "say": "Algunos trabajos tienen un riesgo tan alto que no basta con el AST: necesitan una autorización escrita antes de empezar. El permiso de trabajo asegura que se revisaron los peligros, se aplicaron los controles y que las personas responsables autorizaron la tarea en ese lugar y en ese horario. También informa a las demás áreas que ese trabajo está en marcha.",
     "points": [
      "Autorización escrita para trabajos de alto riesgo",
      "Define lugar, tarea, horario y responsables",
      "Confirma controles antes de empezar",
      "Coordina con otras áreas"
     ]
    },
    {
     "t": "Trabajos que requieren permiso",
     "say": "En un taladro de tierra normalmente requieren permiso los trabajos en caliente como soldar, cortar o esmerilar; los trabajos en alturas fuera de la rutina; el ingreso a espacios confinados como tanques; los trabajos eléctricos; las excavaciones; los izajes críticos y el aislamiento de energías en equipos. La lista exacta la define el sistema de permisos de tu empresa. Si no sabes si tu tarea necesita permiso, pregunta antes de empezar.",
     "points": [
      "Trabajo en caliente",
      "Trabajo en alturas",
      "Espacios confinados y excavaciones",
      "Trabajos eléctricos e izajes críticos"
     ]
    },
    {
     "t": "Qué contiene un permiso",
     "say": "Un permiso describe la tarea, el sitio, los peligros, los controles, el EPP, las pruebas de gases si aplican, los aislamientos y el tiempo de validez. Lo firman quien lo emite, quien lo ejecuta y, si aplica, quien autoriza. Antes de empezar, el emisor y el ejecutor revisan juntos el sitio. El permiso debe estar visible en el sitio de trabajo.",
     "points": [
      "Tarea, sitio, peligros y controles",
      "Pruebas de gases y aislamientos",
      "Firmas y tiempo de validez",
      "Copia visible en el sitio"
     ]
    },
    {
     "t": "Tu responsabilidad bajo un permiso",
     "say": "Si trabajas bajo un permiso, debes conocerlo: qué está autorizado, qué no y qué controles se exigen. No hagas nada fuera de lo que dice el permiso, aunque parezca rápido. Si las condiciones cambian, por ejemplo suena una alarma de gas o cambia el viento, detén el trabajo; el permiso queda suspendido hasta que se revise.",
     "points": [
      "Conoce el alcance del permiso",
      "No trabajes fuera de lo autorizado",
      "Si cambian las condiciones, detente",
      "Ante una alarma, el permiso se suspende"
     ]
    },
    {
     "t": "Cierre del permiso",
     "say": "Al terminar, el trabajo no acaba con soltar la herramienta. Se deja el área ordenada y segura, se retiran los aislamientos según el procedimiento y se cierra el permiso con las firmas de quien ejecutó y quien emitió. Un permiso abierto sin control puede hacer que otra persona arranque un equipo con alguien todavía trabajando en él.",
     "points": [
      "Deja el área limpia y segura",
      "Retira aislamientos según procedimiento",
      "Cierra el permiso con firmas",
      "Nunca dejes un permiso abierto sin aviso"
     ]
    }
   ],
   "activity": {
    "mod": "supervisor",
    "label": "Práctica 3D: revisa un permiso de trabajo en alturas"
   },
   "checks": [
    {
     "q": "¿Cuál de estos trabajos normalmente requiere permiso de trabajo?",
     "o": [
      "Soldar una baranda cerca de los tanques",
      "Barrer el piso de la caseta",
      "Llenar la hoja de tubería",
      "Asistir a la charla de seguridad"
     ],
     "a": 0,
     "e": "Soldar es trabajo en caliente y requiere permiso por el riesgo de incendio y explosión.",
     "ref": 1
    },
    {
     "q": "Estás soldando bajo permiso y suena la alarma de gas. ¿Qué pasa con el permiso?",
     "o": [
      "Sigue vigente si ya está firmado",
      "Se extiende una hora más",
      "Lo cancela solo el soldador",
      "Se suspende y debes detener el trabajo"
     ],
     "a": 3,
     "e": "Ante una alarma o un cambio de condiciones el trabajo se detiene y el permiso queda suspendido hasta revisarlo.",
     "ref": 3
    },
    {
     "q": "¿Dónde debe estar el permiso mientras se ejecuta el trabajo?",
     "o": [
      "En la oficina de la base",
      "Visible en el sitio de trabajo",
      "En el bolsillo del supervisor de otro turno",
      "En el archivo del campamento"
     ],
     "a": 1,
     "e": "El permiso se mantiene visible en el sitio para que todos sepan qué está autorizado.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp09",
   "title": "Gestión del cambio",
   "en": {
    "title": "Management of Change",
    "objectives": [
     "Define management of change and its purpose",
     "Recognize the types of changes that must go through the process",
     "Identify your role when you detect or are affected by a change"
    ]
   },
   "objectives": [
    "Definir la gestión del cambio y su propósito",
    "Reconocer los tipos de cambios que deben pasar por el proceso",
    "Identificar tu rol cuando detectas un cambio o te afecta"
   ],
   "minutes": 10,
   "endorsement": false,
   "lessons": [
    {
     "t": "Por qué los cambios son peligrosos",
     "say": "Muchos accidentes ocurren después de un cambio que nadie evaluó: una pieza diferente, un procedimiento modificado a la carrera, una persona nueva en un cargo crítico. La gestión del cambio es el proceso para revisar los riesgos de un cambio antes de hacerlo, aprobarlo y comunicarlo. Su regla es simple: ningún cambio se hace sin evaluarlo.",
     "points": [
      "Los cambios sin evaluar causan accidentes",
      "Evaluar, aprobar y comunicar antes de cambiar",
      "Aplica a cambios permanentes y temporales",
      "Nadie cambia algo por su cuenta"
     ]
    },
    {
     "t": "Qué se considera un cambio",
     "say": "Un cambio puede ser en equipos, por ejemplo reemplazar una válvula por otra de diferente presión; en procedimientos, como hacer un paso en otro orden; en químicos, como usar un aditivo nuevo; o en personal, como cubrir un cargo crítico con alguien menos experimentado. Reemplazar algo por exactamente lo mismo normalmente no es un cambio. Si tienes dudas, pregunta antes de actuar.",
     "points": [
      "Equipos y repuestos diferentes",
      "Procedimientos y métodos",
      "Químicos y materiales nuevos",
      "Personal en cargos críticos"
     ]
    },
    {
     "t": "Cómo funciona el proceso",
     "say": "Quien propone el cambio lo describe, se evalúan los riesgos, se definen los controles y una persona autorizada lo aprueba. Luego se capacita y se informa a quienes se ven afectados, y solo entonces se implementa. Los cambios temporales tienen fecha de vencimiento y se revisan al terminar.",
     "points": [
      "Describir y evaluar el riesgo",
      "Aprobación por persona autorizada",
      "Capacitar e informar a los afectados",
      "Los temporales tienen fecha de cierre"
     ]
    },
    {
     "t": "Tu papel",
     "say": "Tú no apruebas cambios, pero sí los detectas. Si ves que alguien instala una pieza diferente, que te piden hacer una tarea de otra manera o que llega un químico que no conoces, pregunta si pasó por gestión del cambio. Si te informan un cambio, asegúrate de entender cómo afecta tu trabajo.",
     "points": [
      "Detecta y reporta cambios no evaluados",
      "No improvises soluciones en los equipos",
      "Pregunta cómo te afecta un cambio",
      "Usa la autoridad para detener si hay duda"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Cuál de estas situaciones debe pasar por gestión del cambio?",
     "o": [
      "Reemplazar una válvula por otra de diferente rango de presión",
      "Cambiar un guante roto por uno igual",
      "Limpiar la caseta",
      "Recargar agua en el termo"
     ],
     "a": 0,
     "e": "Un equipo con diferente especificación es un cambio que debe evaluarse antes de instalarse.",
     "ref": 1
    },
    {
     "q": "¿Qué debe ocurrir antes de implementar un cambio?",
     "o": [
      "Que alguien lo haga rápido y luego lo informe",
      "Solo comprar el repuesto",
      "Evaluar el riesgo, aprobarlo y comunicarlo",
      "Esperar a que falle el equipo"
     ],
     "a": 2,
     "e": "El cambio se evalúa, se aprueba y se comunica antes de hacerlo.",
     "ref": 2
    },
    {
     "q": "Te piden usar un aditivo que nunca has visto en el sistema de lodo. ¿Qué haces?",
     "o": [
      "Lo usas sin preguntar",
      "Lo mezclas con otro producto para probar",
      "Lo devuelves sin avisar",
      "Preguntas si fue evaluado y pides la hoja de seguridad"
     ],
     "a": 3,
     "e": "Un químico nuevo es un cambio: se verifica que fue evaluado y se consulta su FDS antes de usarlo.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp10",
   "title": "Orden y aseo, resbalones, tropiezos y caídas",
   "en": {
    "title": "Good Housekeeping and Slips, Trips and Falls",
    "objectives": [
     "Recognize how poor housekeeping causes incidents on the rig",
     "Identify the common causes of slips, trips and falls on the same level",
     "List the safe practices for walking surfaces, stairs and ladders"
    ]
   },
   "objectives": [
    "Reconocer cómo el desorden causa incidentes en el taladro",
    "Identificar las causas comunes de resbalones, tropiezos y caídas al mismo nivel",
    "Enumerar las prácticas seguras en superficies, escaleras y escaleras de mano"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "Orden y aseo es seguridad",
     "say": "Un taladro ordenado es un taladro más seguro. Las herramientas tiradas, las mangueras atravesadas y el lodo en el piso causan muchas de las lesiones diarias. El orden también facilita una evacuación rápida y deja ver los peligros. Cada quien limpia y ordena mientras trabaja, no solo al final del turno.",
     "points": [
      "El desorden causa lesiones diarias",
      "Rutas de evacuación siempre despejadas",
      "Ordena mientras trabajas",
      "Cada herramienta en su lugar"
     ]
    },
    {
     "t": "Resbalones",
     "say": "El lodo, el aceite, la grasa de roscas y el agua lluvia vuelven resbalosos el piso de perforación, las escaleras y la rejilla. Limpia los derrames de inmediato o señalízalos si no puedes limpiarlos. Usa botas con suela en buen estado. Camina, no corras, y mira dónde pisas.",
     "points": [
      "Lodo, aceite, grasa y agua lluvia",
      "Limpia o señaliza los derrames",
      "Botas con suela en buen estado",
      "Camina sin correr y mirando el piso"
     ]
    },
    {
     "t": "Tropiezos",
     "say": "Los cables, las mangueras, las herramientas, la tubería pequeña y las rejillas levantadas son trampas para los pies. Pasa los cables y mangueras por donde no se cruce el tránsito o protégelos. Reporta las rejillas sueltas o los huecos en el piso. Con poca luz, usa linterna y reporta las luminarias dañadas.",
     "points": [
      "Cables y mangueras fuera del paso",
      "Rejillas sueltas y huecos se reportan",
      "Buena iluminación en el turno de noche",
      "No cargues objetos que te tapen la vista"
     ]
    },
    {
     "t": "Escaleras y tres puntos de apoyo",
     "say": "En el taladro subes y bajas escaleras muchas veces por turno. Usa siempre el pasamanos y mantén tres puntos de apoyo: dos manos y un pie o dos pies y una mano. No subas con las manos ocupadas; usa una bolsa o una cuerda para subir herramientas. Baja de frente a la escalera de mano, nunca de espaldas.",
     "points": [
      "Siempre el pasamanos",
      "Tres puntos de apoyo",
      "Manos libres al subir",
      "Escalera de mano: de frente y bien apoyada"
     ]
    },
    {
     "t": "Barandas y aberturas",
     "say": "Las barandas, los rodapiés y las cadenas de las aberturas existen para que no caigas al vacío. Nunca retires una baranda sin permiso y sin otra protección. Si ves una abertura sin protección, señalízala y repórtala de inmediato. Pon las barandas y cadenas en su sitio cuando terminas de usar un acceso.",
     "points": [
      "No retires barandas sin autorización",
      "Aberturas siempre protegidas",
      "Cierra las cadenas al pasar",
      "Reporta barandas dañadas"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Qué significa mantener tres puntos de apoyo en una escalera?",
     "o": [
      "Subir con tres herramientas",
      "Tener dos manos y un pie o dos pies y una mano en contacto",
      "Detenerse cada tres escalones",
      "Subir de a tres personas"
     ],
     "a": 1,
     "e": "Tres puntos de apoyo dan estabilidad; por eso las manos deben ir libres al subir o bajar.",
     "ref": 3
    },
    {
     "q": "Ves aceite derramado en las escaleras y no tienes con qué limpiarlo. ¿Qué haces?",
     "o": [
      "Lo ignoras y sigues",
      "Le echas agua",
      "Lo señalizas y avisas para que se limpie",
      "Lo tapas con cartón sin avisar"
     ],
     "a": 2,
     "e": "Si no puedes limpiar un derrame de inmediato, lo señalizas y lo reportas.",
     "ref": 1
    },
    {
     "q": "¿Cuándo se hace el orden y aseo del área de trabajo?",
     "o": [
      "Mientras se trabaja y al terminar",
      "Solo al final del turno",
      "Solo cuando hay visita",
      "Una vez por semana"
     ],
     "a": 0,
     "e": "El orden se mantiene durante todo el trabajo, no solo al final.",
     "ref": 0
    }
   ]
  },
  {
   "id": "rp11",
   "title": "Cuidado de las manos",
   "en": {
    "title": "Hand Safety",
    "objectives": [
     "Identify the pinch points and crush hazards on the rig floor and the pipe rack",
     "Recognize the correct use of hand tools, push-pull tools and gloves",
     "List the rules for keeping hands out of the line of fire"
    ]
   },
   "objectives": [
    "Identificar los puntos de atrapamiento y aplastamiento en el piso de perforación y los burros de tubería",
    "Reconocer el uso correcto de herramientas manuales, herramientas de empuje y guantes",
    "Enumerar las reglas para mantener las manos fuera de la línea de fuego"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Las manos, las más lesionadas",
     "say": "Las lesiones en manos y dedos son las más frecuentes en los taladros. Ocurren en segundos: un dedo entre la tubería y las cuñas, una mano en la bisagra de una llave de fuerza o debajo de una carga que baja. La mayoría se evitan con una sola regla: si no ves tus manos libres de peligro, no muevas el equipo.",
     "points": [
      "Son las lesiones más frecuentes del taladro",
      "Pasan en un segundo",
      "Ojo con tus manos antes de mover algo",
      "Ninguna tarea vale un dedo"
     ]
    },
    {
     "t": "Puntos de atrapamiento",
     "say": "Un punto de atrapamiento es cualquier lugar donde dos objetos se juntan o donde algo gira. En el taladro están entre la tubería y las cuñas, en las mandíbulas y bisagras de las llaves de fuerza, en el elevador, en las poleas, en las cadenas y entre la tubería sobre los burros. Ubícalos antes de empezar y pon tus manos en las manijas, nunca en las zonas de cierre.",
     "points": [
      "Cuñas, llaves de fuerza y elevador",
      "Tubería rodando en los burros",
      "Poleas, cadenas y piñones",
      "Manos solo en las manijas"
     ]
    },
    {
     "t": "Herramientas de empuje y manos libres",
     "say": "Para guiar una carga suspendida o un tubo que se mueve se usan cuerdas guía o herramientas de empuje, no las manos. Así mantienes tu cuerpo fuera de la línea de fuego. Nunca pongas la mano debajo de una carga para guiarla ni entre la carga y una estructura. Si la herramienta no está disponible, detente y pídela.",
     "points": [
      "Usa cuerda guía o herramienta de empuje",
      "Nunca guíes la carga con las manos debajo",
      "Cuerpo fuera de la línea de fuego",
      "Sin herramienta adecuada, detente"
     ]
    },
    {
     "t": "Guantes y herramientas manuales",
     "say": "Usa el guante adecuado para cada tarea: de impacto para el piso de perforación, de nitrilo para químicos y de cuero para trabajo general. Un guante no evita un aplastamiento, solo protege de cortes y golpes menores. Las herramientas manuales deben estar en buen estado y usarse para lo que fueron diseñadas; una llave usada como martillo o una extensión en una llave pueden romperse y golpearte.",
     "points": [
      "Guante de impacto en el piso de perforación",
      "El guante no evita aplastamientos",
      "Herramienta en buen estado y para su uso",
      "Nada de extensiones improvisadas"
     ]
    },
    {
     "t": "Comunicación con el perforador",
     "say": "Muchos atrapamientos ocurren cuando el perforador mueve el bloque o el malacate mientras alguien tiene las manos en la tubería. Antes de que se mueva un equipo, la cuadrilla debe estar lista y con las manos fuera. Usa las señales acordadas y espera la confirmación. Si alguien está en peligro, la señal de parada la puede dar cualquiera.",
     "points": [
      "Manos fuera antes de mover el bloque",
      "Señales acordadas con el perforador",
      "Espera la confirmación",
      "Cualquiera puede dar la señal de parar"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Cómo se debe guiar una carga suspendida?",
     "o": [
      "Con las manos debajo de la carga",
      "Empujándola con el hombro",
      "Parándose entre la carga y la estructura",
      "Con una cuerda guía o una herramienta de empuje"
     ],
     "a": 3,
     "e": "Las cuerdas guía y las herramientas de empuje mantienen tus manos y tu cuerpo fuera de la línea de fuego.",
     "ref": 2
    },
    {
     "q": "¿Dónde debes colocar las manos al operar una llave de fuerza?",
     "o": [
      "En las mandíbulas",
      "En las manijas",
      "En la bisagra",
      "Sobre la tubería"
     ],
     "a": 1,
     "e": "Las manos solo van en las manijas; mandíbulas y bisagras son puntos de atrapamiento.",
     "ref": 1
    },
    {
     "q": "¿Qué protección da un guante frente a un aplastamiento?",
     "o": [
      "Prácticamente ninguna; solo protege de cortes y golpes menores",
      "Protección total",
      "Evita fracturas",
      "Protege si es de cuero"
     ],
     "a": 0,
     "e": "El guante no evita un aplastamiento; la protección real es mantener las manos fuera del punto de atrapamiento.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp12",
   "title": "Cuidado de la espalda y manipulación manual de cargas",
   "en": {
    "title": "Back Safety and Manual Lifting",
    "objectives": [
     "Recognize the causes of back injuries on the rig",
     "Identify the correct technique for lifting and carrying loads",
     "List the alternatives to manual lifting of heavy or awkward loads"
    ]
   },
   "objectives": [
    "Reconocer las causas de las lesiones de espalda en el taladro",
    "Identificar la técnica correcta para levantar y transportar cargas",
    "Enumerar las alternativas al levantamiento manual de cargas pesadas o incómodas"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "Cómo se lesiona la espalda",
     "say": "La espalda se lesiona por levantar demasiado peso, por girar el tronco con una carga, por levantar lejos del cuerpo o por repetir el mismo esfuerzo muchas veces. En el taladro cargas sacos de barita, herramientas, mangueras y protectores de rosca. Una lesión de espalda puede acompañarte toda la vida, así que vale la pena planear cada levantamiento.",
     "points": [
      "Exceso de peso",
      "Girar el tronco con la carga",
      "Carga lejos del cuerpo",
      "Esfuerzos repetitivos sin pausa"
     ]
    },
    {
     "t": "Antes de levantar",
     "say": "Antes de levantar, mira el peso, la forma y el agarre de la carga, y revisa el camino por donde la vas a llevar. Si la carga es pesada, voluminosa o no tiene buen agarre, pide ayuda o usa un medio mecánico. El límite de peso que puedes levantar solo lo define el procedimiento de tu empresa. Calienta y estira si vas a hacer levantamientos repetidos.",
     "points": [
      "Evalúa peso, forma y agarre",
      "Revisa el camino antes de cargar",
      "Pide ayuda si es pesada",
      "Respeta los límites de tu empresa"
     ]
    },
    {
     "t": "Técnica de levantamiento",
     "say": "Acércate a la carga con los pies separados al ancho de los hombros. Dobla las rodillas, mantén la espalda recta y agarra firme. Levanta con la fuerza de las piernas, sin tirones, y con la carga pegada al cuerpo. Para cambiar de dirección mueve los pies; no gires la cintura.",
     "points": [
      "Pies separados y carga cerca",
      "Rodillas dobladas, espalda recta",
      "Fuerza de piernas, sin tirones",
      "Gira con los pies, no con la cintura"
     ]
    },
    {
     "t": "Levantamientos en equipo y ayudas mecánicas",
     "say": "Cuando dos o más personas levantan una carga, una sola persona da las órdenes para levantar, caminar y bajar al mismo tiempo. Para cargas pesadas usa el montacargas, el winche, el polipasto o una carretilla, siempre que estés autorizado. Empujar es mejor que halar. Nunca levantes con la espalda doblada para ahorrar un viaje.",
     "points": [
      "Un solo líder da las órdenes",
      "Usa montacargas, winche o carretilla si estás autorizado",
      "Empujar es mejor que halar",
      "No ahorres viajes a costa de tu espalda"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Al llevar una carga necesitas cambiar de dirección. ¿Qué haces?",
     "o": [
      "Giras la cintura",
      "Lanzas la carga",
      "Mueves los pies para girar",
      "Te inclinas hacia adelante"
     ],
     "a": 2,
     "e": "Girar el tronco con carga lesiona la espalda; el giro se hace moviendo los pies.",
     "ref": 2
    },
    {
     "q": "Dos compañeros y tú van a levantar un tubo corto pesado. ¿Qué es lo correcto?",
     "o": [
      "Cada uno levanta cuando quiera",
      "El más fuerte levanta primero",
      "Lo levantan por un solo extremo",
      "Una sola persona da las órdenes para levantar y bajar"
     ],
     "a": 3,
     "e": "En el levantamiento en equipo, un solo líder coordina para que todos levanten y bajen al tiempo.",
     "ref": 3
    },
    {
     "q": "¿Qué debes evaluar antes de levantar una carga?",
     "o": [
      "Solo el color",
      "El peso, la forma, el agarre y el camino",
      "Quién la dejó allí",
      "La hora del día"
     ],
     "a": 1,
     "e": "Antes de levantar se evalúa peso, forma, agarre y la ruta para saber si necesitas ayuda o un medio mecánico.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp13",
   "title": "Trabajo en alturas y protección contra caídas",
   "en": {
    "title": "Working at Heights and Fall Protection",
    "objectives": [
     "Recognize the work-at-height tasks on a land drilling rig",
     "Identify the components of a personal fall arrest system",
     "List the rules for inspection, anchorage and 100 % tie-off"
    ]
   },
   "objectives": [
    "Reconocer las tareas de trabajo en alturas de un taladro de tierra",
    "Identificar los componentes de un sistema personal de detención de caídas",
    "Enumerar las reglas de inspección, anclaje y conexión al 100 %"
   ],
   "minutes": 16,
   "endorsement": false,
   "lessons": [
    {
     "t": "Dónde se trabaja en alturas",
     "say": "En el taladro se trabaja en alturas en el encuelladero, en el mástil, en la corona, sobre los tanques, en las escaleras del mástil y durante el armado y desarmado. Las caídas de altura son de las causas más graves de muerte en la industria. En Colombia la referencia legal para considerar un trabajo en alturas es 1,50 m, y para hacerlo debes tener la formación y la autorización que exige la ley y tu empresa.",
     "points": [
      "Encuelladero, mástil y corona",
      "Techos de tanques y estructuras",
      "Armado y desarmado del taladro",
      "Solo con formación y autorización vigentes"
     ]
    },
    {
     "t": "El sistema de detención de caídas",
     "say": "El sistema tiene tres partes: un punto de anclaje resistente, un conector como la eslinga con absorbedor o el bloque retráctil, y el arnés de cuerpo completo. Las tres deben estar en buen estado y ser compatibles. En el encuelladero se usa normalmente un bloque retráctil y el encuellador además tiene la línea de escape para evacuar en una emergencia.",
     "points": [
      "Anclaje resistente",
      "Conector: eslinga con absorbedor o bloque retráctil",
      "Arnés de cuerpo completo",
      "Encuelladero: línea de escape para emergencias"
     ]
    },
    {
     "t": "Inspección del arnés y conectores",
     "say": "Antes de cada uso inspecciona tu arnés: correas sin cortes, quemaduras ni desgaste; costuras completas; argollas y hebillas sin deformación ni óxido; etiqueta legible. Revisa que los ganchos cierren y tengan seguro. Si un equipo detuvo una caída o tiene un defecto, sale de servicio de inmediato. Ajusta bien el arnés: las correas de las piernas firmes y la argolla dorsal entre los omóplatos.",
     "points": [
      "Correas, costuras y argollas sin daño",
      "Ganchos con seguro que cierra",
      "Equipo que detuvo una caída sale de servicio",
      "Arnés bien ajustado, argolla dorsal centrada"
     ]
    },
    {
     "t": "Conexión al 100 %",
     "say": "Conexión al 100 % significa que desde que estás expuesto a una caída hasta que regresas a un lugar seguro siempre estás conectado. Si debes cambiar de punto de anclaje, usa una eslinga doble y conecta la segunda antes de soltar la primera. Ancla por encima de tu cabeza cuando sea posible para reducir la distancia de caída. Nunca te conectes a barandas, tuberías o puntos que no fueron aprobados como anclaje.",
     "points": [
      "Siempre conectado mientras estés expuesto",
      "Eslinga doble: conecta antes de soltar",
      "Anclaje arriba de la cabeza cuando se pueda",
      "Solo puntos de anclaje aprobados"
     ]
    },
    {
     "t": "Rescate y trabajo en el mástil",
     "say": "Una persona colgada del arnés no puede esperar mucho tiempo, porque la suspensión le corta la circulación. Por eso todo trabajo en alturas debe tener un plan de rescate antes de empezar. Mientras alguien trabaja arriba, se restringe el paso debajo y se aseguran las herramientas. Si hay tormenta eléctrica o vientos fuertes, el trabajo en el mástil se suspende.",
     "points": [
      "Plan de rescate antes de subir",
      "La suspensión prolongada es peligrosa",
      "Área restringida debajo del trabajo",
      "Tormenta o viento fuerte: se baja del mástil"
     ]
    }
   ],
   "activity": {
    "mod": "encuelle",
    "label": "Práctica 3D: encuelle con arnés, bloque retráctil y línea de escape"
   },
   "checks": [
    {
     "q": "¿Qué significa conexión al 100 %?",
     "o": [
      "Usar el arnés solo en la corona",
      "Conectarse a la baranda más cercana",
      "Estar siempre conectado mientras estés expuesto a una caída",
      "Desconectarse solo para subir más rápido"
     ],
     "a": 2,
     "e": "Al 100 % nunca quedas desconectado; con eslinga doble conectas la segunda antes de soltar la primera.",
     "ref": 3
    },
    {
     "q": "Al inspeccionar tu arnés encuentras una correa con una quemadura. ¿Qué haces?",
     "o": [
      "Lo sacas de servicio y lo reportas",
      "Lo usas con cuidado",
      "Le pones cinta",
      "Lo prestas a otro compañero"
     ],
     "a": 0,
     "e": "Un arnés con daño en las correas no garantiza la detención de la caída; sale de servicio.",
     "ref": 2
    },
    {
     "q": "¿Para qué sirve la línea de escape del encuelladero?",
     "o": [
      "Para subir herramientas",
      "Para amarrar las paradas",
      "Para anclar el arnés al piso",
      "Para que el encuellador evacúe rápido en una emergencia"
     ],
     "a": 3,
     "e": "La línea de escape permite al encuellador bajar rápido del encuelladero ante una emergencia como una patada o un incendio.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp14",
   "title": "Objetos que caen",
   "en": {
    "title": "Dropped Objects",
    "objectives": [
     "Define static and dynamic dropped objects",
     "Identify the main sources of dropped objects on a land rig",
     "List the controls used to prevent dropped objects and protect people below"
    ]
   },
   "objectives": [
    "Definir objetos que caen de forma estática y dinámica",
    "Identificar las principales fuentes de objetos que caen en un taladro de tierra",
    "Enumerar los controles para prevenir la caída de objetos y proteger a quien está debajo"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Un objeto pequeño, un golpe grave",
     "say": "Un perno o una llave que cae desde el encuelladero llega al piso con una fuerza suficiente para matar a una persona, aun con casco. Los objetos que caen son una de las principales causas de lesiones graves en los taladros. Por eso cada objeto en altura se trata como un peligro hasta que esté asegurado.",
     "points": [
      "Un objeto pequeño desde altura puede matar",
      "El casco no protege de todo",
      "Todo objeto en altura es un peligro",
      "Asegura antes de subir"
     ]
    },
    {
     "t": "Estáticos y dinámicos",
     "say": "Un objeto estático cae por su propio peso, sin que nada lo golpee, por ejemplo un perno flojo que se suelta por vibración o una luminaria corroída. Un objeto dinámico cae porque algo lo golpea o lo engancha, como el bloque viajero que roza un elemento del mástil o una carga que golpea una estructura al izarse. Ambos se previenen con inspección y control.",
     "points": [
      "Estático: cae por su peso, por vibración o corrosión",
      "Dinámico: cae por un golpe o enganche",
      "El bloque y las cargas izadas causan caídas dinámicas",
      "Ambos se previenen inspeccionando"
     ]
    },
    {
     "t": "Herramientas en altura",
     "say": "Toda herramienta que subas a una altura debe ir amarrada con su cordón a tu muñeca o a una estructura, y se sube en una bolsa cerrada. Lleva solo lo que necesitas y haz un inventario al subir y al bajar para saber que nada quedó arriba. Nunca lances herramientas ni objetos de un nivel a otro.",
     "points": [
      "Herramientas amarradas con cordón",
      "Súbelas en bolsa cerrada",
      "Inventario al subir y al bajar",
      "Nunca lances objetos"
     ]
    },
    {
     "t": "Inspección del mástil",
     "say": "El mástil y la corona se inspeccionan periódicamente y después de cada movilización, buscando pernos flojos, pasadores sin seguro, luminarias sin retención secundaria, óxido y objetos olvidados. Los elementos fijos en altura deben tener una retención secundaria, como un cable o una malla de seguridad. Si ves algo suelto en altura, aleja a la gente y repórtalo de inmediato.",
     "points": [
      "Inspección periódica y después de movilizar",
      "Pernos, pasadores, luminarias y objetos olvidados",
      "Retención secundaria en elementos fijos",
      "Algo suelto arriba: despeja el área y reporta"
     ]
    },
    {
     "t": "Zonas de exclusión",
     "say": "Cuando hay trabajo en altura o una carga suspendida, la zona de abajo se acordona y nadie entra sin autorización. Respeta las barreras y los avisos aunque parezca que no pasa nada arriba. Si debes cruzar, comunícate con quien trabaja arriba y espera que te autorice. Nunca te pares debajo de una carga.",
     "points": [
      "Zona de abajo acordonada",
      "Respeta barreras y avisos",
      "Comunícate antes de cruzar",
      "Nunca debajo de una carga"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Un perno se suelta por la vibración y cae desde el mástil. ¿Qué tipo de objeto que cae es?",
     "o": [
      "Dinámico",
      "Estático",
      "Controlado",
      "Secundario"
     ],
     "a": 1,
     "e": "Cae por su propio peso sin que nada lo golpee: es un objeto que cae de forma estática.",
     "ref": 1
    },
    {
     "q": "¿Cómo debes subir tus herramientas al encuelladero?",
     "o": [
      "Amarradas con cordón y en bolsa cerrada",
      "En los bolsillos del overol",
      "Que te las lancen desde abajo",
      "En la mano mientras subes la escalera"
     ],
     "a": 0,
     "e": "Las herramientas en altura van amarradas y se suben en bolsa, con las manos libres para la escalera.",
     "ref": 2
    },
    {
     "q": "Ves desde abajo una luminaria colgando suelta del mástil. ¿Qué haces primero?",
     "o": [
      "Subes a ajustarla sin avisar",
      "Esperas al final del turno",
      "Alejas a las personas del área y lo reportas",
      "Le tomas una foto y sigues"
     ],
     "a": 2,
     "e": "Primero se protege a las personas despejando el área de abajo y se reporta para que se asegure con un procedimiento seguro.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp15",
   "title": "Seguridad eléctrica",
   "en": {
    "title": "Electrical Safety",
    "objectives": [
     "Recognize the electrical hazards present on a land drilling rig",
     "Identify the safe practices for using cords, tools and equipment",
     "Define a hazardous (classified) area and the restrictions it imposes"
    ]
   },
   "objectives": [
    "Reconocer los peligros eléctricos presentes en un taladro de tierra",
    "Identificar las prácticas seguras con extensiones, herramientas y equipos",
    "Definir un área clasificada y las restricciones que impone"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "La electricidad en el taladro",
     "say": "El taladro genera su propia electricidad con grandes generadores y la distribuye a motores, bombas, el malacate, el top drive y el campamento. Son voltajes capaces de matar al instante. La electricidad no se ve ni se oye; por eso todo equipo eléctrico se trata como energizado hasta que una persona calificada demuestre lo contrario.",
     "points": [
      "Generadores, cuarto de control y motores",
      "Voltajes que pueden matar",
      "Trata todo como energizado",
      "Solo el personal calificado interviene"
     ]
    },
    {
     "t": "Solo personal calificado",
     "say": "Solo los electricistas calificados y autorizados abren tableros, cambian conexiones o reparan equipos eléctricos. Tú no abres tableros, no quitas tapas ni manipulas cables, aunque parezca un arreglo sencillo. Si un equipo hace chispas, huele a quemado o da corrientazo, deja de usarlo y avisa.",
     "points": [
      "No abras tableros ni cajas eléctricas",
      "No repares cables ni enchufes",
      "Chispas, olor a quemado o corrientazo: para y avisa",
      "Respeta los avisos de alto voltaje"
     ]
    },
    {
     "t": "Extensiones y herramientas",
     "say": "Antes de usar una herramienta eléctrica revisa el cable, el enchufe y la carcasa. No uses extensiones con empalmes, cinta aislante o aislamiento roto. Mantén los cables lejos del agua, del lodo y de los bordes cortantes, y no los pases por donde transitan vehículos. Conecta solo a tomas con protección diferencial cuando la empresa lo exija.",
     "points": [
      "Inspecciona cable, enchufe y carcasa",
      "Nada de empalmes ni cinta",
      "Cables lejos de agua, lodo y tránsito",
      "Usa tomas con protección diferencial"
     ]
    },
    {
     "t": "Agua y electricidad",
     "say": "El agua, el lodo y el sudor hacen que la corriente pase más fácil por tu cuerpo. En la locación llueve fuerte y el lodo está en todas partes. No operes equipos eléctricos con las manos mojadas ni parado en agua. Si ves un cable en un charco, no lo toques ni entres al charco; avisa y aleja a las personas.",
     "points": [
      "Nunca con manos mojadas",
      "No pises charcos con cables",
      "Cable en el agua: aleja a la gente y avisa",
      "Lluvia: más cuidado con los equipos"
     ]
    },
    {
     "t": "Áreas clasificadas",
     "say": "Cerca de la boca del pozo, las zarandas y los tanques de lodo puede haber gases inflamables, por eso son áreas clasificadas. Allí solo se usan equipos aprobados a prueba de explosión o intrínsecamente seguros. Los celulares, linternas y radios personales comunes pueden generar una chispa, así que no se llevan a esas áreas salvo que la empresa los autorice.",
     "points": [
      "Boca del pozo, zarandas y tanques",
      "Solo equipos aprobados para el área",
      "Celulares y linternas comunes prohibidos",
      "Pregunta los límites del área clasificada"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Una pulidora te da un corrientazo leve. ¿Qué haces?",
     "o": [
      "Sigues trabajando con guantes",
      "Le pones cinta al cable",
      "Abres la carcasa para revisarla",
      "Dejas de usarla, la retiras y avisas"
     ],
     "a": 3,
     "e": "Un equipo que da corrientazo sale de uso y lo revisa personal calificado.",
     "ref": 1
    },
    {
     "q": "¿Por qué no se lleva un celular común a la zona de zarandas?",
     "o": [
      "Porque se moja",
      "Porque puede generar una chispa en un área con gases inflamables",
      "Porque distrae al perforador",
      "Porque interfiere con el lodo"
     ],
     "a": 1,
     "e": "Las zarandas están en un área clasificada; solo se usan equipos aprobados que no generan chispas.",
     "ref": 4
    },
    {
     "q": "¿Qué extensión está en condiciones de usarse?",
     "o": [
      "Una con un empalme con cinta",
      "Una con el aislamiento cortado",
      "Una sin daños, con enchufe y cable en buen estado",
      "Una sin polo a tierra"
     ],
     "a": 2,
     "e": "Solo se usan extensiones sin empalmes ni daños y con todos sus componentes en buen estado.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp16",
   "title": "Aislamiento de energías: bloqueo y etiquetado",
   "en": {
    "title": "Lockout/Tagout and Energy Isolation",
    "objectives": [
     "Identify the types of hazardous energy present on a drilling rig",
     "List the basic steps of a lockout/tagout procedure",
     "Recognize the rules for personal locks, tags and verification of zero energy"
    ]
   },
   "objectives": [
    "Identificar los tipos de energía peligrosa presentes en un taladro",
    "Enumerar los pasos básicos del procedimiento de bloqueo y etiquetado",
    "Reconocer las reglas de candados personales, etiquetas y verificación de energía cero"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Energías peligrosas del taladro",
     "say": "En el taladro hay energía eléctrica en motores y tableros; energía hidráulica en el acumulador de las BOP y las llaves; neumática en el aire de servicio; presión en las líneas de lodo; energía mecánica en resortes y contrapesos; y la gravedad en las cargas suspendidas. Todas pueden lesionarte aunque el equipo parezca apagado. Cuando se hace mantenimiento, todas deben estar controladas para que el equipo no arranque o se mueva con alguien trabajando en él.",
     "points": [
      "Eléctrica: motores y tableros",
      "Hidráulica: acumulador y llaves",
      "Neumática y presión de lodo",
      "Mecánica y gravedad: resortes y cargas"
     ]
    },
    {
     "t": "Qué es el bloqueo y etiquetado",
     "say": "El bloqueo consiste en poner un candado en el dispositivo de aislamiento, como un breaker o una válvula, para que no se pueda operar. El etiquetado es la tarjeta que dice quién lo bloqueó, cuándo y por qué. El candado impide la operación; la etiqueta informa. Ninguno de los dos reemplaza al otro.",
     "points": [
      "Candado: impide operar el aislamiento",
      "Etiqueta: quién, cuándo y por qué",
      "Se usan juntos",
      "Se hace bajo permiso de trabajo cuando aplica"
     ]
    },
    {
     "t": "Pasos del procedimiento",
     "say": "Los pasos básicos son: preparar e informar a los afectados, apagar el equipo, aislar todas sus fuentes de energía, poner candado y etiqueta en cada punto, liberar o contener la energía almacenada como presión o resortes, y verificar la energía cero intentando arrancar o midiendo. Solo después se empieza el trabajo. Si te saltas la verificación, no sabes si el bloqueo funciona.",
     "points": [
      "Informar y apagar",
      "Aislar todas las fuentes",
      "Candado y etiqueta en cada punto",
      "Liberar energía almacenada",
      "Verificar energía cero"
     ]
    },
    {
     "t": "Tu candado, tu vida",
     "say": "Cada persona que trabaja en el equipo pone su propio candado, aunque haya un candado del supervisor. Tú guardas la llave de tu candado y solo tú lo retiras al terminar. Nunca retires el candado ni la etiqueta de otra persona. Si encuentras un candado sin dueño, la empresa tiene un procedimiento especial para retirarlo.",
     "points": [
      "Cada trabajador con su candado",
      "Tú guardas tu llave",
      "Nunca retires el candado de otro",
      "Candado olvidado: procedimiento especial"
     ]
    },
    {
     "t": "Retorno a servicio",
     "say": "Al terminar, se recogen las herramientas, se reinstalan las guardas, se verifica que nadie está en el equipo y se avisa a los afectados. Luego cada quien retira su propio candado y se restablece la energía de forma controlada. Arrancar un equipo sin confirmar que todos salieron es una de las causas de accidentes más graves.",
     "points": [
      "Guardas reinstaladas y herramientas fuera",
      "Confirma que nadie está en el equipo",
      "Cada uno retira su candado",
      "Arranque controlado y avisado"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Cuál es el último paso antes de empezar a trabajar en un equipo bloqueado?",
     "o": [
      "Verificar la energía cero",
      "Poner la etiqueta",
      "Llamar al company man",
      "Firmar la hoja de tubería"
     ],
     "a": 0,
     "e": "Se verifica la energía cero intentando arrancar o midiendo; solo así sabes que el aislamiento funciona.",
     "ref": 2
    },
    {
     "q": "El supervisor ya puso su candado en el tablero de la bomba. ¿Debes poner el tuyo?",
     "o": [
      "No, con uno basta",
      "Solo si eres electricista",
      "Solo si el trabajo dura más de un día",
      "Sí, cada trabajador pone su propio candado"
     ],
     "a": 3,
     "e": "Cada persona expuesta pone su candado y guarda su llave.",
     "ref": 3
    },
    {
     "q": "¿Qué energía queda almacenada en el acumulador de las BOP aunque se apaguen las bombas?",
     "o": [
      "Térmica",
      "Hidráulica",
      "Química",
      "Sonora"
     ],
     "a": 1,
     "e": "El acumulador guarda presión hidráulica; debe liberarse o contenerse antes de intervenir.",
     "ref": 0
    }
   ]
  },
  {
   "id": "rp17",
   "title": "Izaje de cargas y señales a la grúa",
   "en": {
    "title": "Rigging and Crane Signals",
    "objectives": [
     "Identify the basic rigging components and how to inspect them",
     "Recognize the standard hand signals for crane and load movements",
     "List the safe behaviors around suspended loads"
    ]
   },
   "objectives": [
    "Identificar los elementos básicos de izaje y cómo inspeccionarlos",
    "Reconocer las señales de mano para movimientos de grúa y carga",
    "Enumerar los comportamientos seguros cerca de cargas suspendidas"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Elementos de izaje",
     "say": "Para izar se usan eslingas de cable, de cadena o sintéticas, grilletes, ganchos con seguro y cuerdas guía. Cada elemento tiene una capacidad máxima de trabajo marcada en su etiqueta o placa. Si no tiene etiqueta legible, no se usa. Solo enganchan las cargas las personas entrenadas y autorizadas como aparejadores.",
     "points": [
      "Eslingas, grilletes, ganchos y cuerdas guía",
      "Capacidad marcada en etiqueta o placa",
      "Sin etiqueta legible: no se usa",
      "Engancha solo personal autorizado"
     ]
    },
    {
     "t": "Inspección antes de usar",
     "say": "Revisa las eslingas buscando cortes, hilos rotos, aplastamientos, nudos, quemaduras o químicos. En los grilletes, que el pasador sea el correcto y esté completo; en los ganchos, que tengan el seguro y no estén abiertos. Un elemento dañado se retira y se marca para que nadie lo use. Nunca hagas nudos en una eslinga para acortarla.",
     "points": [
      "Cortes, hilos rotos, aplastamientos o quemaduras",
      "Grillete con pasador correcto",
      "Gancho con seguro y sin deformación",
      "Elemento dañado: fuera de servicio"
     ]
    },
    {
     "t": "Un solo señalero",
     "say": "El operador de la grúa recibe órdenes de un solo señalero, que debe estar a su vista o comunicado por radio. La única excepción es la señal de parada de emergencia, que la puede dar cualquier persona. Antes del izaje se hace una charla para acordar quién señala, la ruta de la carga y la zona de exclusión.",
     "points": [
      "Un solo señalero identificado",
      "Contacto visual o radio con el operador",
      "Cualquiera puede dar la parada de emergencia",
      "Charla antes de cada izaje"
     ]
    },
    {
     "t": "Señales de mano",
     "say": "Para subir, el señalero levanta el brazo vertical y gira el índice en círculo hacia arriba; para bajar, extiende el brazo hacia abajo y gira el índice. Para parar, extiende el brazo horizontal con la palma hacia abajo. Para la parada de emergencia, extiende ambos brazos y los mueve de lado a lado. Aprende las señales que usa tu locación y confírmalas en la charla previa.",
     "points": [
      "Subir: índice arriba girando",
      "Bajar: brazo abajo, índice girando",
      "Parar: brazo horizontal, palma abajo",
      "Emergencia: ambos brazos de lado a lado"
     ]
    },
    {
     "t": "Cerca de una carga suspendida",
     "say": "Nunca camines ni te pares debajo de una carga suspendida ni entre la carga y una estructura. Guía la carga con cuerdas guía desde una distancia segura. Si la carga gira o se balancea, aléjate, no la detengas con el cuerpo. Con viento fuerte o tormenta eléctrica el izaje se suspende.",
     "points": [
      "Nunca debajo de la carga",
      "Guía con cuerda desde lejos",
      "Carga que gira: aléjate",
      "Viento fuerte o tormenta: se suspende"
     ]
    }
   ],
   "activity": {
    "mod": "patio",
    "label": "Práctica 3D: señales a la grúa en los burros de tubería"
   },
   "checks": [
    {
     "q": "¿Quién puede dar la señal de parada de emergencia a la grúa?",
     "o": [
      "Cualquier persona que vea un peligro",
      "Solo el señalero designado",
      "Solo el company man",
      "Solo el operador"
     ],
     "a": 0,
     "e": "El operador recibe órdenes de un solo señalero, excepto la parada de emergencia, que la da cualquiera.",
     "ref": 2
    },
    {
     "q": "Una eslinga no tiene etiqueta de capacidad legible. ¿Qué haces?",
     "o": [
      "La usas para cargas livianas",
      "Calculas la capacidad a ojo",
      "No la usas y la reportas",
      "Le haces un nudo para reforzarla"
     ],
     "a": 2,
     "e": "Sin capacidad identificable, el elemento no se usa.",
     "ref": 0
    },
    {
     "q": "¿Qué señal se hace con el brazo extendido horizontal y la palma hacia abajo?",
     "o": [
      "Subir",
      "Bajar",
      "Girar",
      "Parar"
     ],
     "a": 3,
     "e": "El brazo horizontal con la palma hacia abajo es la señal de parar.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp18",
   "title": "Montacargas y equipos móviles",
   "en": {
    "title": "Forklift and Mobile Equipment Safety",
    "objectives": [
     "Recognize the hazards of forklifts, telehandlers and other mobile equipment on location",
     "Identify the blind spots and safe zones around mobile equipment",
     "List the rules for pedestrians and authorized operators"
    ]
   },
   "objectives": [
    "Reconocer los peligros del montacargas, el manipulador telescópico y otros equipos móviles en la locación",
    "Identificar los puntos ciegos y las zonas seguras alrededor de los equipos móviles",
    "Enumerar las reglas para peatones y operadores autorizados"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "Equipos móviles en la locación",
     "say": "En la locación circulan montacargas, manipuladores telescópicos, grúas, cargadores, camiones de vacío, carrotanques y camiones de carga. Todos tienen puntos ciegos amplios y pueden atropellar o aplastar a una persona. El peligro aumenta durante el cargue de tubería, la descarga de químicos y la movilización.",
     "points": [
      "Montacargas, telescópicos, grúas y cargadores",
      "Camiones de vacío y carrotanques",
      "Puntos ciegos amplios",
      "Más riesgo en cargue y movilización"
     ]
    },
    {
     "t": "Solo operadores autorizados",
     "say": "Solo opera un montacargas o cualquier equipo móvil quien tiene la formación, la autorización y la inspección preoperacional del día. No muevas un equipo para ayudar, aunque sepas manejarlo, si no estás autorizado en esa locación. El operador respeta la capacidad del equipo, lleva la carga baja y usa el cinturón.",
     "points": [
      "Formación y autorización vigentes",
      "Inspección preoperacional diaria",
      "Carga baja y dentro de la capacidad",
      "Cinturón de seguridad puesto"
     ]
    },
    {
     "t": "Puntos ciegos y contacto visual",
     "say": "El operador de un montacargas con carga no ve bien hacia adelante ni hacia atrás. Si no puedes ver los ojos del operador, él no te ve a ti. Antes de acercarte, busca contacto visual y espera su señal. Nunca pases entre un equipo y una estructura ni detrás de un equipo que retrocede.",
     "points": [
      "Si no ves al operador, él no te ve",
      "Contacto visual antes de acercarte",
      "No pases entre equipo y estructura",
      "Aléjate de la reversa"
     ]
    },
    {
     "t": "Reglas para peatones",
     "say": "Usa los caminos peatonales y respeta las zonas de operación demarcadas. Nunca te subas a las uñas de un montacargas ni pidas que te eleven en él. No te pares debajo de una carga elevada por el montacargas. Usa ropa de alta visibilidad, especialmente de noche.",
     "points": [
      "Caminos peatonales y zonas demarcadas",
      "Nadie viaja en las uñas",
      "Nunca debajo de la carga elevada",
      "Ropa reflectiva de noche"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Qué indica no poder ver los ojos del operador de un montacargas?",
     "o": [
      "Que está concentrado",
      "Que probablemente él no te ve",
      "Que el equipo está apagado",
      "Que puedes pasar rápido"
     ],
     "a": 1,
     "e": "Si no hay contacto visual, el operador probablemente no te ve; espera su señal antes de acercarte.",
     "ref": 2
    },
    {
     "q": "Un compañero te pide que lo subas en las uñas del montacargas para alcanzar un tanque. ¿Qué respondes?",
     "o": [
      "Que sí, si va despacio",
      "Que sí, con arnés",
      "Que no; nadie viaja ni se eleva en las uñas",
      "Que solo hasta un metro"
     ],
     "a": 2,
     "e": "Las uñas no son una plataforma para personas; se usa el equipo de acceso adecuado.",
     "ref": 3
    },
    {
     "q": "Sabes manejar montacargas pero no estás autorizado en esta locación. ¿Puedes moverlo para ayudar?",
     "o": [
      "No, solo lo opera personal autorizado",
      "Sí, si es una emergencia menor",
      "Sí, si lo hace despacio",
      "Sí, si el operador lo presta"
     ],
     "a": 0,
     "e": "Operar exige formación, autorización vigente e inspección preoperacional en esa locación.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp19",
   "title": "Materiales peligrosos",
   "en": {
    "title": "Hazardous Materials",
    "objectives": [
     "Identify the hazardous materials commonly used on a land drilling rig",
     "Recognize the safe handling, mixing and storage practices",
     "List the immediate actions after an exposure or a small spill"
    ]
   },
   "objectives": [
    "Identificar los materiales peligrosos más comunes en un taladro de tierra",
    "Reconocer las prácticas seguras de manejo, mezcla y almacenamiento",
    "Enumerar las acciones inmediatas ante una exposición o un derrame menor"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "Químicos del taladro",
     "say": "En el taladro se manejan barita y bentonita en polvo, soda cáustica, cal, cloruro de potasio, polímeros, aditivos del lodo, diésel, aceites, solventes, pinturas y gases comprimidos como oxígeno y acetileno. Algunos queman la piel, otros irritan los pulmones y otros son inflamables. Antes de manejar cualquiera, consulta su hoja de seguridad y usa el EPP que indica.",
     "points": [
      "Polvos: barita, bentonita, cal",
      "Corrosivos: soda cáustica",
      "Inflamables: diésel, solventes, gases",
      "Consulta la FDS antes de usarlos"
     ]
    },
    {
     "t": "Manejo y mezcla",
     "say": "En el embudo de mezcla, añade los químicos despacio y colócate de manera que el polvo no te llegue a la cara. Al preparar soluciones cáusticas, siempre se agrega el químico al agua, nunca el agua al químico, porque la reacción genera calor y puede salpicar. Usa careta y guantes resistentes, y protección respiratoria cuando la FDS lo pida. Ten identificada la ducha y el lavaojos más cercanos.",
     "points": [
      "Químico al agua, nunca agua al químico",
      "Careta, guantes y respirador si aplica",
      "Añade despacio y lejos de la cara",
      "Ubica ducha y lavaojos antes de empezar"
     ]
    },
    {
     "t": "Almacenamiento",
     "say": "Los químicos se guardan en su recipiente original, etiquetados, cerrados y en el área asignada, con contención para derrames. Los productos incompatibles se separan, por ejemplo ácidos lejos de cáusticos y oxidantes lejos de combustibles. Los cilindros de gas van de pie, asegurados con cadena y con su capuchón cuando no se usan.",
     "points": [
      "Recipiente original, etiquetado y cerrado",
      "Área con contención",
      "Incompatibles separados",
      "Cilindros de pie, encadenados y con capuchón"
     ]
    },
    {
     "t": "Si hay una exposición",
     "say": "Si un químico te cae en los ojos, ve de inmediato al lavaojos y enjuaga durante al menos quince minutos, manteniendo los párpados abiertos. Si cae en la piel, quítate la ropa contaminada y lava con abundante agua. Avisa al paramédico y lleva la FDS del producto. Si se derrama un químico, aleja a las personas, avisa y solo lo recoges si estás entrenado y tienes el EPP.",
     "points": [
      "Ojos: lavaojos al menos 15 minutos",
      "Piel: retira ropa y lava con agua",
      "Avisa al paramédico con la FDS",
      "Derrame: aleja, avisa y contén si estás entrenado"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Al preparar una solución de soda cáustica, ¿cuál es el orden correcto?",
     "o": [
      "Agua sobre la soda",
      "Ambos al mismo tiempo",
      "Primero la soda y luego agua caliente",
      "Soda sobre el agua, despacio"
     ],
     "a": 3,
     "e": "Siempre se agrega el químico al agua, despacio, porque la reacción genera calor y puede salpicar.",
     "ref": 1
    },
    {
     "q": "Te salpica un químico en los ojos. ¿Qué haces primero?",
     "o": [
      "Te frotas los ojos",
      "Vas al lavaojos y enjuagas por al menos quince minutos",
      "Esperas a ver si pasa",
      "Te pones las gafas"
     ],
     "a": 1,
     "e": "El lavado inmediato y prolongado reduce el daño; después avisas al paramédico con la FDS.",
     "ref": 3
    },
    {
     "q": "¿Cómo se almacenan los cilindros de oxígeno y acetileno?",
     "o": [
      "De pie, asegurados con cadena y con capuchón",
      "Acostados en el piso",
      "Junto a los tanques de diésel",
      "Dentro de la caseta del perforador"
     ],
     "a": 0,
     "e": "Los cilindros van de pie, asegurados y con capuchón para evitar caídas y daños en la válvula.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp20",
   "title": "Salud ocupacional: ruido, calor, fatiga y ergonomía",
   "en": {
    "title": "Occupational Health: Noise, Heat Stress, Fatigue and Ergonomics",
    "objectives": [
     "Recognize the effects of noise and the areas where hearing protection is required",
     "Identify the signs of heat exhaustion and heat stroke",
     "List the measures to prevent fatigue and ergonomic injuries"
    ]
   },
   "objectives": [
    "Reconocer los efectos del ruido y las áreas donde se exige protección auditiva",
    "Identificar las señales del agotamiento por calor y del golpe de calor",
    "Enumerar las medidas para prevenir la fatiga y las lesiones ergonómicas"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Ruido",
     "say": "Los generadores, las bombas de lodo, las zarandas y el piso de perforación producen ruido capaz de dañar tu oído de forma permanente. La pérdida auditiva no duele y avanza sin que lo notes. Usa tapones u orejeras en las áreas señalizadas, bien puestos, y aléjate del ruido cuando no tengas que estar allí. Si al salir del turno te zumban los oídos, la protección no fue suficiente.",
     "points": [
      "Generadores, bombas y zarandas",
      "El daño auditivo es permanente",
      "Protección en áreas señalizadas",
      "Zumbido al salir: avisa"
     ]
    },
    {
     "t": "Estrés por calor",
     "say": "Muchos campos en Colombia, como los del Huila, el Meta o el Casanare, son calientes y húmedos, y el overol y el trabajo pesado suben la temperatura del cuerpo. Toma agua con frecuencia aunque no tengas sed, descansa a la sombra según el plan de la locación y acostúmbrate al calor poco a poco si vienes de clima frío. Evita el exceso de bebidas azucaradas y el alcohol antes del turno.",
     "points": [
      "Toma agua con frecuencia",
      "Descansos a la sombra",
      "Aclimatación gradual",
      "Vigila a tus compañeros"
     ]
    },
    {
     "t": "Agotamiento y golpe de calor",
     "say": "El agotamiento por calor da sudor abundante, mareo, dolor de cabeza, náuseas y debilidad: lleva a la persona a la sombra, dale agua si está consciente y avisa al paramédico. El golpe de calor es una emergencia: hay confusión, comportamiento extraño, piel muy caliente y puede haber desmayo. Llama a emergencias de inmediato y enfría a la persona mientras llega la ayuda.",
     "points": [
      "Agotamiento: sudor, mareo, náuseas, debilidad",
      "Golpe de calor: confusión y piel muy caliente",
      "Golpe de calor es emergencia médica",
      "Sombra, enfriar y avisar al paramédico"
     ]
    },
    {
     "t": "Fatiga",
     "say": "Los turnos de doce horas, los cambios de turno de día a noche y el mal descanso en el campamento causan fatiga. La fatiga reduce la atención como si hubieras tomado alcohol. Duerme lo suficiente en tus horas libres, aliméntate bien y avisa si no estás en condiciones de trabajar. Si ves a un compañero cabeceando, díselo al supervisor.",
     "points": [
      "Turnos largos y cambios de horario",
      "Fatiga reduce la atención",
      "Usa tu tiempo libre para dormir",
      "Avisa si no estás en condiciones"
     ]
    },
    {
     "t": "Ergonomía",
     "say": "Las posturas forzadas, los movimientos repetitivos y las vibraciones lesionan músculos y articulaciones con el tiempo. Ajusta la altura de trabajo cuando puedas, alterna tareas, haz pausas activas y usa las herramientas adecuadas. Reporta el dolor desde que empieza; atenderlo temprano evita lesiones mayores.",
     "points": [
      "Evita posturas forzadas",
      "Alterna tareas y haz pausas",
      "Herramienta adecuada para la tarea",
      "Reporta el dolor desde el inicio"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Un compañero está confundido, habla incoherente y tiene la piel muy caliente después de trabajar al sol. ¿Qué sospechas?",
     "o": [
      "Cansancio normal",
      "Hambre",
      "Golpe de calor, una emergencia médica",
      "Deshidratación leve sin importancia"
     ],
     "a": 2,
     "e": "La confusión con piel muy caliente sugiere golpe de calor: llama a emergencias y enfría a la persona.",
     "ref": 2
    },
    {
     "q": "¿Por qué es peligrosa la pérdida auditiva por ruido?",
     "o": [
      "Porque duele mucho",
      "Porque se cura en una semana",
      "Porque solo afecta a los mayores",
      "Porque es permanente y avanza sin que lo notes"
     ],
     "a": 3,
     "e": "El daño por ruido no duele, avanza poco a poco y no tiene cura.",
     "ref": 0
    },
    {
     "q": "¿Cuándo debes tomar agua en un turno caluroso?",
     "o": [
      "Solo cuando tengas sed",
      "Con frecuencia, aunque no tengas sed",
      "Solo a la hora del almuerzo",
      "Al final del turno"
     ],
     "a": 1,
     "e": "La sed aparece tarde; hay que hidratarse con frecuencia durante todo el turno.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp21",
   "title": "Sulfuro de hidrógeno (H2S)",
   "en": {
    "title": "Hydrogen Sulfide (H2S)",
    "objectives": [
     "Identify the properties and health effects of hydrogen sulfide",
     "Recognize where H2S can accumulate on a land drilling location",
     "List the actions to take when the H2S alarm sounds"
    ]
   },
   "objectives": [
    "Identificar las propiedades del H2S y sus efectos en la salud",
    "Reconocer dónde se puede acumular el H2S en una locación de tierra",
    "Enumerar las acciones a seguir cuando suena la alarma de H2S"
   ],
   "minutes": 18,
   "endorsement": false,
   "lessons": [
    {
     "t": "Qué es el H2S",
     "say": "El sulfuro de hidrógeno es un gas que puede venir del pozo, de algunos lodos o de aguas estancadas. Es incoloro, más pesado que el aire, inflamable y muy tóxico. A bajas concentraciones huele a huevo podrido, pero a concentraciones mayores paraliza el olfato y dejas de olerlo justo cuando es más peligroso. Por eso nunca confíes en tu nariz: confía en el detector.",
     "points": [
      "Incoloro, más pesado que el aire",
      "Inflamable y muy tóxico",
      "Huele a huevo podrido a baja concentración",
      "A mayor concentración paraliza el olfato"
     ]
    },
    {
     "t": "Efectos en la salud",
     "say": "A bajas concentraciones el H2S irrita los ojos y la garganta y da dolor de cabeza y náuseas. A concentraciones más altas causa mareo, pérdida del conocimiento y paro respiratorio. A concentraciones muy altas puede matar en pocas respiraciones. Al quemarse produce dióxido de azufre, que también es tóxico.",
     "points": [
      "Irritación de ojos y garganta, dolor de cabeza",
      "Mareo y pérdida del conocimiento",
      "Paro respiratorio a altas concentraciones",
      "Al quemarse produce otro gas tóxico"
     ]
    },
    {
     "t": "Dónde se acumula",
     "say": "Como es más pesado que el aire, el H2S se acumula en las partes bajas: el contrapozo, los tanques de lodo, las zarandas, las piscinas y fosas, las zanjas y los cuartos cerrados. También puede salir con el lodo que retorna del pozo. En estas áreas hay detectores fijos, y tú debes llevar el monitor personal encendido cuando la locación lo exija.",
     "points": [
      "Contrapozo, tanques y zarandas",
      "Piscinas, zanjas y partes bajas",
      "Lodo que retorna del pozo",
      "Monitor personal encendido y probado"
     ]
    },
    {
     "t": "Alarmas y viento",
     "say": "La locación tiene detectores fijos con alarmas sonoras y luminosas, y los niveles de alarma los fija el procedimiento de tu empresa. También hay mangas o conos de viento en varios puntos para que sepas hacia dónde sopla. Cada vez que llegues a la locación y durante el turno, mira hacia dónde va el viento y ubica los puntos de encuentro.",
     "points": [
      "Detectores fijos con alarma sonora y luminosa",
      "Niveles de alarma según el procedimiento",
      "Mangas de viento en varios puntos",
      "Mira el viento y ubica los puntos de encuentro"
     ]
    },
    {
     "t": "Qué hacer si suena la alarma",
     "say": "Si suena la alarma de H2S, deja lo que estás haciendo, contén la respiración si puedes y aléjate en dirección contra el viento o perpendicular a él, nunca a favor del viento ni hacia zonas bajas. Ve al punto de encuentro seguro y repórtate en el conteo. Solo el personal entrenado y con equipo de respiración autónoma entra a la zona. Nunca intentes rescatar a alguien sin ese equipo: la mayoría de las víctimas múltiples son rescatistas sin protección.",
     "points": [
      "Contra el viento o perpendicular a él",
      "Nunca hacia zonas bajas",
      "Punto de encuentro y conteo",
      "Nunca rescates sin equipo de respiración"
     ]
    }
   ],
   "activity": {
    "mod": "hse",
    "label": "Práctica 3D: evacúa ante la alarma de H2S hacia el punto de encuentro seguro"
   },
   "checks": [
    {
     "q": "Ya no sientes el olor a huevo podrido que había hace un momento cerca de las zarandas. ¿Qué significa?",
     "o": [
      "Que el gas se fue",
      "Que el viento cambió y ya es seguro",
      "Que puede haber una concentración alta que paralizó tu olfato",
      "Que el detector está dañado"
     ],
     "a": 2,
     "e": "A concentraciones mayores el H2S paraliza el olfato; dejar de olerlo puede ser señal de mayor peligro.",
     "ref": 0
    },
    {
     "q": "Suena la alarma de H2S y el viento sopla desde los tanques hacia ti. ¿Hacia dónde evacúas?",
     "o": [
      "Contra el viento o perpendicular a él, hacia el punto de encuentro seguro",
      "A favor del viento",
      "Al contrapozo para refugiarte",
      "Hacia la zanja más cercana"
     ],
     "a": 0,
     "e": "Se evacúa contra el viento o perpendicular a él y nunca hacia zonas bajas donde se acumula el gas.",
     "ref": 4
    },
    {
     "q": "¿Por qué el contrapozo es un sitio de riesgo por H2S?",
     "o": [
      "Porque es muy ruidoso",
      "Porque está lejos del pozo",
      "Porque tiene mucha luz",
      "Porque el H2S es más pesado que el aire y se acumula en zonas bajas"
     ],
     "a": 3,
     "e": "El contrapozo es una zona baja junto al pozo donde el gas puede acumularse.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp22",
   "title": "Prevención y respuesta a incendios",
   "en": {
    "title": "Fire Prevention and Response",
    "objectives": [
     "Define the fire triangle and recognize the fire hazards on a rig",
     "Identify the classes of fire and the appropriate portable extinguisher",
     "List the actions to take when you discover a fire"
    ]
   },
   "objectives": [
    "Definir el triángulo del fuego y reconocer los peligros de incendio en el taladro",
    "Identificar las clases de fuego y el extintor portátil adecuado",
    "Enumerar las acciones a seguir cuando descubres un incendio"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "El triángulo del fuego",
     "say": "Para que haya fuego se necesitan tres cosas: combustible, oxígeno y una fuente de calor o ignición. Si quitas cualquiera de las tres, el fuego no se forma o se apaga. En el taladro hay mucho combustible, como diésel, aceites, gas del pozo, trapos con grasa y madera, y muchas fuentes de ignición, como chispas, superficies calientes y cigarrillos.",
     "points": [
      "Combustible, oxígeno y calor",
      "Quita uno y el fuego se apaga",
      "Combustibles: diésel, aceites, gas, trapos",
      "Ignición: chispas, superficies calientes, cigarrillos"
     ]
    },
    {
     "t": "Prevención",
     "say": "La mejor forma de combatir un incendio es evitarlo. Fuma solo en el área designada, guarda los trapos con aceite en recipientes metálicos con tapa, mantén los combustibles lejos de las fuentes de calor y limpia los derrames de aceite y diésel. Todo trabajo en caliente requiere permiso, prueba de gases y un vigía de fuego con extintor.",
     "points": [
      "Fuma solo en el área designada",
      "Trapos con aceite en recipiente metálico tapado",
      "Limpia derrames de combustibles",
      "Trabajo en caliente: permiso, prueba de gases y vigía"
     ]
    },
    {
     "t": "Clases de fuego y extintores",
     "say": "La clase A es de sólidos como madera, papel y trapos; la clase B, de líquidos y gases inflamables como el diésel; la clase C, de equipos eléctricos energizados. Hay también clases especiales como la de metales y la de aceites de cocina. El extintor de polvo químico seco multipropósito sirve para A, B y C, y el de CO2 para B y C. Nunca uses agua en un fuego eléctrico o de combustibles líquidos.",
     "points": [
      "A: sólidos",
      "B: líquidos y gases inflamables",
      "C: equipos eléctricos energizados",
      "Polvo químico seco multipropósito: A, B y C",
      "Nunca agua en fuego eléctrico o de diésel"
     ]
    },
    {
     "t": "Uso del extintor",
     "say": "Usa un extintor solo si el fuego es pequeño, tienes una salida detrás de ti y estás entrenado. Hala el pasador, apunta a la base de las llamas, aprieta la manija y barre de lado a lado. Mantente con el viento a tu espalda. Si el fuego no baja en pocos segundos o crece, abandona el área y deja el control a la brigada.",
     "points": [
      "Solo fuego pequeño y con salida segura",
      "Hala, apunta a la base, aprieta y barre",
      "Viento a tu espalda",
      "Si no cede, retírate"
     ]
    },
    {
     "t": "Si descubres un incendio",
     "say": "Da la alarma de inmediato por el medio que tenga la locación: radio, pulsador o voz. Informa el lugar y qué se está quemando. Si es seguro, intenta controlar un fuego pequeño; si no, evacúa al punto de encuentro siguiendo la ruta y respetando el viento. Nunca regreses por tus pertenencias.",
     "points": [
      "Da la alarma primero",
      "Informa lugar y qué se quema",
      "Fuego grande: evacúa al punto de encuentro",
      "Nunca regreses por pertenencias"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Se incendia un tablero eléctrico energizado. ¿Qué extintor usas si es seguro hacerlo?",
     "o": [
      "Agua",
      "CO2 o polvo químico seco",
      "Espuma a base de agua",
      "Arena mojada"
     ],
     "a": 1,
     "e": "El fuego clase C se ataca con agentes no conductores como el CO2 o el polvo químico seco; nunca con agua.",
     "ref": 2
    },
    {
     "q": "¿Hacia dónde apuntas el extintor?",
     "o": [
      "A la base de las llamas",
      "A la parte alta de las llamas",
      "Al humo",
      "Al aire alrededor"
     ],
     "a": 0,
     "e": "Se apunta a la base, donde está el combustible, barriendo de lado a lado.",
     "ref": 3
    },
    {
     "q": "¿Qué es lo primero que haces al descubrir un incendio?",
     "o": [
      "Buscar tus pertenencias",
      "Tomar una foto",
      "Dar la alarma",
      "Llamar a tu familia"
     ],
     "a": 2,
     "e": "Lo primero es dar la alarma para que la cuadrilla y la brigada respondan.",
     "ref": 4
    }
   ]
  },
  {
   "id": "rp23",
   "title": "Primeros auxilios y patógenos de la sangre",
   "en": {
    "title": "First Aid and Bloodborne Pathogens",
    "objectives": [
     "Recognize the basic actions of first aid within the limits of your training",
     "Identify the location of first aid resources on location",
     "Define bloodborne pathogens and list the precautions to avoid exposure"
    ]
   },
   "objectives": [
    "Reconocer las acciones básicas de primeros auxilios dentro de los límites de tu entrenamiento",
    "Identificar dónde están los recursos de primeros auxilios en la locación",
    "Definir los patógenos de la sangre y enumerar las precauciones para evitar la exposición"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "Primero tu seguridad",
     "say": "Ante una persona lesionada, lo primero es asegurarte de que la escena es segura para ti. Si hay gas, electricidad, una carga suspendida o un equipo en movimiento, no te acerques hasta que se controle. Da la alarma y pide ayuda al paramédico de la locación. Un rescatista lesionado no ayuda a nadie.",
     "points": [
      "Verifica que la escena sea segura",
      "Da la alarma y pide ayuda",
      "No te conviertas en otra víctima",
      "Llama al paramédico de la locación"
     ]
    },
    {
     "t": "Recursos de primeros auxilios",
     "say": "En la inducción de la locación te muestran dónde está el paramédico o enfermero, el botiquín, la camilla, el desfibrilador si lo hay, las duchas y los lavaojos. También debes saber cómo comunicarte en una emergencia médica, por radio o por teléfono, y quiénes son los brigadistas. Ubica estos recursos desde tu primer turno.",
     "points": [
      "Paramédico o enfermero de locación",
      "Botiquín, camilla y desfibrilador",
      "Duchas y lavaojos",
      "Canal de comunicación de emergencia"
     ]
    },
    {
     "t": "Acciones básicas",
     "say": "Actúa solo dentro de lo que te han entrenado. Si la persona no responde, pide ayuda y, si estás entrenado, revisa si respira e inicia reanimación. Ante un sangrado, presiona directamente la herida con un apósito limpio. No muevas a una persona con posible lesión de columna salvo que corra un peligro inmediato. Acompaña y tranquiliza al lesionado hasta que llegue el paramédico.",
     "points": [
      "Actúa dentro de tu entrenamiento",
      "No responde: pide ayuda y revisa si respira",
      "Sangrado: presión directa",
      "No muevas si hay posible lesión de columna"
     ]
    },
    {
     "t": "Patógenos de la sangre",
     "say": "Los patógenos de la sangre son microorganismos como los virus de la hepatitis B, la hepatitis C y el VIH, que pueden transmitirse por contacto con sangre u otros fluidos corporales. Como no puedes saber quién está infectado, trata toda sangre como potencialmente infecciosa. La transmisión ocurre sobre todo cuando la sangre entra por heridas, mucosas u ojos, o por pinchazos con objetos contaminados.",
     "points": [
      "Hepatitis B, hepatitis C y VIH",
      "Toda sangre es potencialmente infecciosa",
      "Entrada por heridas, ojos, boca o pinchazos",
      "No compartas maquinillas ni cortaúñas"
     ]
    },
    {
     "t": "Precauciones y exposición",
     "say": "Para ayudar a alguien que sangra, ponte guantes de nitrilo o látex del botiquín y, si hay salpicaduras, gafas. Lávate las manos al terminar. No limpies sangre derramada si no estás entrenado; señaliza y avisa. Si la sangre de otra persona te toca una herida, los ojos o la boca, lava de inmediato con agua y jabón o enjuaga los ojos, y repórtalo enseguida al paramédico para la atención médica.",
     "points": [
      "Guantes y gafas antes de atender",
      "Lávate las manos al terminar",
      "No limpies sangre si no estás entrenado",
      "Exposición: lava y reporta de inmediato"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Un compañero quedó inconsciente junto a un cable eléctrico caído. ¿Qué haces primero?",
     "o": [
      "Lo halas de inmediato",
      "Le das agua",
      "Le quitas el casco",
      "Te aseguras de que la escena sea segura y das la alarma"
     ],
     "a": 3,
     "e": "Primero tu seguridad: no te acerques hasta que se controle la energía; da la alarma y pide ayuda.",
     "ref": 0
    },
    {
     "q": "¿Cómo debes tratar la sangre de un compañero lesionado?",
     "o": [
      "Como segura si lo conoces",
      "Como potencialmente infecciosa",
      "Como segura si está fresca",
      "Como infecciosa solo si él lo dice"
     ],
     "a": 1,
     "e": "Como no se sabe quién está infectado, toda sangre se trata como potencialmente infecciosa.",
     "ref": 3
    },
    {
     "q": "Al ayudar a un herido, te cae sangre en una cortada que tenías en la mano. ¿Qué haces?",
     "o": [
      "Nada, es poca",
      "Te pones una curita y sigues",
      "Lavas de inmediato con agua y jabón y lo reportas al paramédico",
      "Esperas a terminar el turno"
     ],
     "a": 2,
     "e": "Una exposición se lava de inmediato y se reporta enseguida para recibir atención médica oportuna.",
     "ref": 4
    }
   ]
  },
  {
   "id": "rp24",
   "title": "Respuesta a emergencias, alarmas y punto de encuentro",
   "en": {
    "title": "Emergency Response, Rig Alarms and Muster Points",
    "objectives": [
     "Recognize the alarm signals used on the rig and their meaning",
     "Identify the primary and alternate muster points and escape routes",
     "List your duties during an emergency, a headcount and a drill"
    ]
   },
   "objectives": [
    "Reconocer las señales de alarma del taladro y su significado",
    "Identificar los puntos de encuentro principal y alterno y las rutas de evacuación",
    "Enumerar tus deberes durante una emergencia, el conteo de personal y los simulacros"
   ],
   "minutes": 14,
   "endorsement": false,
   "lessons": [
    {
     "t": "El plan de emergencia",
     "say": "Cada locación tiene un plan de emergencia que define las alarmas, las rutas de evacuación, los puntos de encuentro, quién dirige la respuesta y quiénes son los brigadistas. Las emergencias posibles incluyen incendio, H2S, patada o descontrol de pozo, derrame, lesionados, tormenta y problemas de orden público. En tu inducción en la locación te explican el plan; si algo no te queda claro, pregunta.",
     "points": [
      "Alarmas, rutas y puntos de encuentro",
      "Quién dirige la emergencia",
      "Brigadistas identificados",
      "Pregunta lo que no entiendas"
     ]
    },
    {
     "t": "Las alarmas del taladro",
     "say": "Cada taladro tiene sus propias señales: por ejemplo, una alarma general, una de H2S o gas, una de incendio y una de abandono de la locación. Pueden ser sirenas, pitos, luces o anuncios por radio. Como cambian de un taladro a otro, debes aprender las de tu locación desde el primer día. Ante una alarma que no reconoces, actúa como si fuera una emergencia real y dirígete al punto de encuentro.",
     "points": [
      "Alarmas distintas para cada emergencia",
      "Sonoras, luminosas o por radio",
      "Apréndelas en cada locación",
      "Si no la reconoces, trátala como real"
     ]
    },
    {
     "t": "Puntos de encuentro y rutas",
     "say": "Hay un punto de encuentro principal y al menos uno alterno, ubicados en lados opuestos de la locación para que siempre haya uno con viento a favor de tu seguridad. Elige el que te deje lejos del peligro, teniendo en cuenta la dirección del viento. Las rutas de evacuación deben estar despejadas siempre. Al llegar a la locación, ubica ambos puntos.",
     "points": [
      "Punto principal y alterno",
      "Escoge según el viento y el peligro",
      "Rutas siempre despejadas",
      "Ubícalos al llegar"
     ]
    },
    {
     "t": "Conteo de personal",
     "say": "En el punto de encuentro se cuenta a todo el personal con la lista de ingreso a la locación. Por eso es tan importante registrarte al entrar y al salir. Si falta alguien, informa dónde lo viste por última vez, pero no regreses a buscarlo: eso lo hace el personal de rescate equipado. Permanece en el punto de encuentro hasta que el responsable diga que la emergencia terminó.",
     "points": [
      "Regístrate al entrar y salir",
      "Repórtate en el conteo",
      "No regreses a buscar a nadie",
      "Espera la orden de fin de emergencia"
     ]
    },
    {
     "t": "Simulacros",
     "say": "Los simulacros se hacen con frecuencia: de H2S, de incendio, de evacuación y de cierre del pozo. Tómalos como si fueran reales, porque en una emergencia vas a hacer lo que practicaste. Al final del simulacro se revisa qué funcionó y qué no; aporta lo que observaste.",
     "points": [
      "Simulacros de H2S, incendio, evacuación y pozo",
      "Actúa como si fuera real",
      "Participa en la revisión",
      "Lo que practicas es lo que harás"
     ]
    }
   ],
   "activity": {
    "mod": "casos",
    "label": "Práctica 3D: decisiones ante una alarma de H2S y una emergencia en el piso"
   },
   "checks": [
    {
     "q": "Suena una alarma que no reconoces. ¿Qué haces?",
     "o": [
      "La tratas como real y te diriges al punto de encuentro",
      "Sigues trabajando hasta confirmar",
      "Llamas a tu familia",
      "Esperas a que otros se muevan"
     ],
     "a": 0,
     "e": "Una alarma desconocida se trata como una emergencia real.",
     "ref": 1
    },
    {
     "q": "En el conteo falta un compañero. ¿Qué haces?",
     "o": [
      "Regresas a buscarlo",
      "Te vas al campamento",
      "Lo llamas a gritos desde la zona de peligro",
      "Informas dónde lo viste por última vez y permaneces en el punto de encuentro"
     ],
     "a": 3,
     "e": "Informas al responsable; la búsqueda la hace personal de rescate equipado.",
     "ref": 3
    },
    {
     "q": "¿Por qué hay un punto de encuentro alterno?",
     "o": [
      "Para descansar",
      "Para usarlo si el principal queda a favor del viento o cerca del peligro",
      "Para los visitantes",
      "Para guardar equipos"
     ],
     "a": 1,
     "e": "El alterno permite reunirse lejos del peligro cuando el principal queda expuesto, por ejemplo por la dirección del viento.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp25",
   "title": "Protección ambiental",
   "en": {
    "title": "Environmental Protection",
    "objectives": [
     "Recognize the environmental aspects of a land drilling operation",
     "Identify the correct segregation and handling of waste on location",
     "List the actions to prevent, contain and report spills"
    ]
   },
   "objectives": [
    "Reconocer los aspectos ambientales de una operación de perforación en tierra",
    "Identificar la separación y el manejo correcto de los residuos en la locación",
    "Enumerar las acciones para prevenir, contener y reportar derrames"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "El taladro y su entorno",
     "say": "Una locación en tierra está rodeada de suelos, quebradas, ríos, cultivos, fauna y comunidades. Los derrames de lodo, diésel o aceite, los residuos mal manejados y el ruido pueden afectar ese entorno por años. Las licencias ambientales imponen condiciones que la operación debe cumplir, y tú haces parte de ese cumplimiento.",
     "points": [
      "Suelos, agua, fauna y comunidades",
      "Derrames y residuos afectan por años",
      "La operación tiene obligaciones ambientales",
      "Tú haces parte del cumplimiento"
     ]
    },
    {
     "t": "Prevención de derrames",
     "say": "Los tanques de combustible, los químicos y los equipos con aceite deben estar sobre contención, como diques, bandejas o geomembrana. Revisa mangueras y conexiones antes de trasvasar, no dejes un llenado sin vigilancia y cierra las válvulas al terminar. Mantén los drenajes de la locación libres de residuos para que los fluidos lleguen a los sistemas de tratamiento.",
     "points": [
      "Combustibles y químicos sobre contención",
      "Revisa mangueras y conexiones",
      "Nunca dejes un llenado solo",
      "Cierra válvulas al terminar"
     ]
    },
    {
     "t": "Si hay un derrame",
     "say": "Si ves un derrame, detén la fuente si es seguro hacerlo, por ejemplo cerrando una válvula. Avisa de inmediato a tu supervisor. Contén el derrame con el kit antiderrames, usando barreras y material absorbente, para que no llegue a drenajes, suelos sin protección o cuerpos de agua. Todo derrame se reporta, por pequeño que sea.",
     "points": [
      "Detén la fuente si es seguro",
      "Avisa de inmediato",
      "Contén con el kit antiderrames",
      "Todo derrame se reporta"
     ]
    },
    {
     "t": "Manejo de residuos",
     "say": "Los residuos se separan en la fuente según el código de colores y la señalización de tu empresa: ordinarios, reciclables, orgánicos y peligrosos, como trapos con aceite, filtros, envases de químicos y baterías. Los cortes de perforación y los lodos se manejan con los sistemas de control de sólidos y tratamiento de la locación. Nunca quemes, entierres ni botes residuos en la locación ni en sus alrededores.",
     "points": [
      "Separa en la fuente según el código de colores",
      "Residuos peligrosos en su recipiente",
      "Cortes y lodos en su sistema de manejo",
      "Nunca quemes, entierres ni botes residuos"
     ]
    },
    {
     "t": "Fauna, flora y comunidad",
     "say": "No cortes vegetación fuera del área autorizada, no caces, no captures ni alimentes animales y no saques madera ni plantas. Respeta los linderos de los predios vecinos y las fuentes de agua. Tu comportamiento en las vías y en los pueblos también refleja a la empresa ante la comunidad.",
     "points": [
      "No cortes vegetación fuera del área",
      "Prohibido cazar, capturar o alimentar animales",
      "Respeta predios y fuentes de agua",
      "Buen trato con la comunidad"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Ves que una manguera gotea diésel durante el trasvase al tanque del generador. ¿Qué haces primero si es seguro?",
     "o": [
      "Detienes la fuente cerrando la válvula o parando la bomba",
      "Esperas a que termine el trasvase",
      "Echas agua sobre el diésel",
      "Cubres el charco con tierra"
     ],
     "a": 0,
     "e": "Lo primero, si es seguro, es detener la fuente; luego avisas y contienes con el kit antiderrames.",
     "ref": 2
    },
    {
     "q": "¿Dónde se debe depositar un trapo impregnado de aceite?",
     "o": [
      "En la basura ordinaria",
      "En el recipiente de reciclables",
      "En el recipiente de residuos peligrosos",
      "En la zanja de drenaje"
     ],
     "a": 2,
     "e": "Los trapos con aceite son residuos peligrosos y van en su recipiente marcado.",
     "ref": 3
    },
    {
     "q": "¿Qué derrames se deben reportar?",
     "o": [
      "Solo los mayores de un barril",
      "Solo los que llegan al río",
      "Solo los de lodo",
      "Todos, por pequeños que sean"
     ],
     "a": 3,
     "e": "Todo derrame se reporta, sin importar su tamaño.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp26",
   "title": "Reporte e investigación de incidentes",
   "en": {
    "title": "Incident Reporting and Investigation",
    "objectives": [
     "Define incident, near miss and unsafe condition",
     "Recognize why every incident and near miss must be reported promptly",
     "Identify your role in an incident investigation"
    ]
   },
   "objectives": [
    "Definir incidente, casi accidente y condición insegura",
    "Reconocer por qué todo incidente y casi accidente se debe reportar a tiempo",
    "Identificar tu rol en la investigación de un incidente"
   ],
   "minutes": 12,
   "endorsement": false,
   "lessons": [
    {
     "t": "Definiciones",
     "say": "Un incidente es un evento no deseado que causó o pudo causar lesiones, daños al equipo, daños ambientales o pérdidas. Un casi accidente es un evento que no causó daño solo por suerte, por ejemplo una herramienta que cae y no golpea a nadie. Una condición insegura es algo del ambiente o del equipo que puede causar un incidente, como una baranda suelta. Un acto inseguro es un comportamiento que lo puede causar.",
     "points": [
      "Incidente: causó o pudo causar daño",
      "Casi accidente: no hubo daño por suerte",
      "Condición insegura: en el ambiente o equipo",
      "Acto inseguro: en el comportamiento"
     ]
    },
    {
     "t": "Por qué reportar los casi accidentes",
     "say": "Por cada accidente grave ocurren muchos casi accidentes con las mismas causas. Cada casi accidente reportado es una advertencia gratuita que permite corregir antes de que alguien salga lesionado. Reportar no es acusar a nadie: es proteger a la cuadrilla. Tu empresa tiene tarjetas, aplicaciones o formatos para hacerlo.",
     "points": [
      "Los casi accidentes anuncian los accidentes",
      "Reportar permite corregir a tiempo",
      "Reportar no es acusar",
      "Usa la tarjeta o el formato de tu empresa"
     ]
    },
    {
     "t": "Cómo y cuándo reportar",
     "say": "Reporta de inmediato a tu supervisor cualquier lesión, aunque parezca leve, cualquier daño, derrame o casi accidente. Una lesión que no se reporta a tiempo puede complicarse y además dificulta la atención y el trámite. Describe qué pasó, dónde, cuándo y quiénes estaban, sin suposiciones.",
     "points": [
      "Reporta de inmediato, aunque sea leve",
      "Qué, dónde, cuándo y quiénes",
      "Hechos, no suposiciones",
      "Atiende primero al lesionado"
     ]
    },
    {
     "t": "La investigación",
     "say": "La investigación busca las causas raíz, no culpables. Se preserva la escena siempre que sea seguro, se entrevista a los testigos y se revisan equipos, procedimientos y condiciones. Si te piden contar lo que viste, sé honesto y preciso. El resultado son acciones para que no se repita, y las lecciones aprendidas se comparten con todas las cuadrillas.",
     "points": [
      "Busca causas raíz, no culpables",
      "Preserva la escena si es seguro",
      "Testimonio honesto y preciso",
      "Lecciones aprendidas para todos"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Una llave se cae desde el encuelladero y no golpea a nadie. ¿Cómo se clasifica?",
     "o": [
      "No es nada, no hubo lesión",
      "Casi accidente que se debe reportar",
      "Condición normal del trabajo",
      "Un acto de mantenimiento"
     ],
     "a": 1,
     "e": "Es un casi accidente: no hubo daño solo por suerte, y se reporta para corregir la causa.",
     "ref": 0
    },
    {
     "q": "Te cortaste levemente un dedo y no quieres molestar. ¿Qué haces?",
     "o": [
      "No lo reportas",
      "Lo reportas al final de la semana",
      "Lo reportas de inmediato a tu supervisor",
      "Solo se lo cuentas a un compañero"
     ],
     "a": 2,
     "e": "Toda lesión, aunque sea leve, se reporta de inmediato para recibir atención y registrarla.",
     "ref": 2
    },
    {
     "q": "¿Cuál es el objetivo principal de una investigación de incidentes?",
     "o": [
      "Encontrar las causas raíz para que no se repita",
      "Encontrar un culpable",
      "Cumplir un trámite",
      "Sancionar a la cuadrilla"
     ],
     "a": 0,
     "e": "La investigación busca causas raíz y acciones de mejora, no culpables.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp27",
   "title": "Seguridad física y protección de la locación",
   "en": {
    "title": "Security Awareness",
    "objectives": [
     "Recognize the security risks that can affect a land drilling location",
     "Identify the access control rules for people, vehicles and materials",
     "List the actions to report suspicious activity and protect company information"
    ]
   },
   "objectives": [
    "Reconocer los riesgos de seguridad física que pueden afectar una locación en tierra",
    "Identificar las reglas de control de acceso de personas, vehículos y materiales",
    "Enumerar las acciones para reportar actividades sospechosas y proteger la información"
   ],
   "minutes": 10,
   "endorsement": false,
   "lessons": [
    {
     "t": "Riesgos de seguridad física",
     "say": "Además de los riesgos del trabajo, una locación puede enfrentar robo de materiales y combustible, ingreso de personas no autorizadas, vandalismo y, en algunas zonas del país, situaciones de orden público. La seguridad física protege a las personas, los equipos y la operación. El área de seguridad de tu empresa da las instrucciones específicas para cada zona.",
     "points": [
      "Robo de materiales y combustible",
      "Ingreso no autorizado y vandalismo",
      "Situaciones de orden público en algunas zonas",
      "Sigue las instrucciones del área de seguridad"
     ]
    },
    {
     "t": "Control de acceso",
     "say": "Todas las personas, vehículos y materiales que entran o salen de la locación se registran en la portería. Porta siempre tu carné visible, no prestes tu identificación y no dejes entrar a nadie por otro acceso. Los materiales que salen necesitan su autorización de salida. Los visitantes van siempre acompañados.",
     "points": [
      "Registro en portería de entrada y salida",
      "Carné visible e intransferible",
      "Visitantes siempre acompañados",
      "Salida de materiales con autorización"
     ]
    },
    {
     "t": "Reporta lo sospechoso",
     "say": "Si ves una persona desconocida en la locación, un vehículo extraño rondando, un paquete abandonado o un daño en la cerca, no lo enfrentes: repórtalo al supervisor o al personal de seguridad. Sigue las reglas de desplazamiento de tu empresa, como horarios permitidos, rutas y convoyes. Ante una amenaza, tu prioridad es tu vida, no los equipos.",
     "points": [
      "No enfrentes; reporta",
      "Personas, vehículos o paquetes extraños",
      "Respeta horarios y rutas de viaje",
      "Tu vida primero"
     ]
    },
    {
     "t": "Información y redes sociales",
     "say": "No publiques en redes sociales fotos, ubicaciones ni detalles de la operación, del personal o de los movimientos de la locación. Toma fotos dentro de la locación solo con autorización. Esa información puede ser usada por terceros para planear un robo o algo peor. Habla de tu trabajo con discreción fuera de la locación.",
     "points": [
      "No publiques fotos ni ubicaciones",
      "Fotos solo con autorización",
      "Discreción fuera de la locación",
      "Protege los datos del personal"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Ves a una persona desconocida sin carné cerca de los contenedores de herramientas. ¿Qué haces?",
     "o": [
      "La confrontas",
      "La ignoras",
      "Le tomas una foto y la subes a redes",
      "La reportas al supervisor o a seguridad"
     ],
     "a": 3,
     "e": "No enfrentes a la persona; reporta para que actúe el personal de seguridad.",
     "ref": 2
    },
    {
     "q": "Un compañero olvidó su carné y te pide el tuyo para entrar. ¿Qué respondes?",
     "o": [
      "Se lo prestas",
      "Le dices que el carné es intransferible y que se registre en portería",
      "Lo entras por otro acceso",
      "Le das tu carné y entras después"
     ],
     "a": 1,
     "e": "La identificación es personal; el registro en portería controla quién está en la locación para el conteo y la seguridad.",
     "ref": 1
    },
    {
     "q": "¿Puedes publicar en redes una foto del taladro con su ubicación?",
     "o": [
      "No, sin autorización no se publican fotos ni ubicaciones",
      "Sí, si es de día",
      "Sí, si no salen personas",
      "Sí, después de terminar el pozo"
     ],
     "a": 0,
     "e": "La información de la operación y su ubicación puede ser usada por terceros; no se publica sin autorización.",
     "ref": 3
    }
   ]
  },
  {
   "id": "rp28",
   "title": "Excavaciones y zanjas",
   "en": {
    "title": "Excavating and Trenching",
    "objectives": [
     "Recognize the hazards of excavations and trenches on a land location",
     "Identify the protective measures required before entering an excavation",
     "List the rules for spoil piles, access, buried utilities and mobile equipment near the edge"
    ]
   },
   "objectives": [
    "Reconocer los peligros de las excavaciones y zanjas en una locación de tierra",
    "Identificar las medidas de protección exigidas antes de entrar a una excavación",
    "Enumerar las reglas sobre material excavado, accesos, redes enterradas y equipos cerca del borde"
   ],
   "minutes": 30,
   "endorsement": true,
   "lessons": [
    {
     "t": "Excavaciones en la locación",
     "say": "En una locación de tierra se excavan zanjas para líneas de flujo, drenajes, tuberías de agua y cables, se abren fosas y se hacen trabajos civiles durante la adecuación y el abandono. El mayor peligro es el derrumbe de las paredes: un metro cúbico de tierra pesa más de una tonelada y puede atrapar y asfixiar a una persona en segundos. Por eso toda excavación se trabaja con permiso y bajo la supervisión de una persona competente.",
     "points": [
      "Zanjas para líneas, drenajes y cables",
      "El derrumbe es el mayor peligro",
      "La tierra pesa más de una tonelada por metro cúbico",
      "Trabajo con permiso y supervisión competente"
     ]
    },
    {
     "t": "Antes de excavar: redes enterradas",
     "say": "Antes de excavar se identifican las redes enterradas: líneas de flujo, gasoductos, cables eléctricos, tuberías de agua y sistemas de puesta a tierra. Se revisan los planos, se hace detección en campo y se marcan en el terreno. Cerca de una red enterrada se excava a mano o con métodos aprobados. Golpear una línea de gas o un cable energizado puede causar una explosión o una electrocución.",
     "points": [
      "Revisar planos y detectar en campo",
      "Marcar las redes en el terreno",
      "Cerca de redes: excavación manual",
      "Golpear una línea puede causar explosión o electrocución"
     ]
    },
    {
     "t": "Protección contra derrumbes",
     "say": "Según la profundidad y el tipo de suelo, el procedimiento exige taludes inclinados, terrazas, entibado o cajas de protección para que las paredes no se derrumben. La persona competente inspecciona la excavación antes de cada turno y después de una lluvia, porque el agua debilita las paredes. Si ves grietas en el borde, agua que entra o tierra que se desprende, sal de inmediato y avisa.",
     "points": [
      "Taludes, terrazas, entibado o cajas",
      "Inspección antes de cada turno y tras la lluvia",
      "El agua debilita las paredes",
      "Grietas o desprendimientos: sal y avisa"
     ]
    },
    {
     "t": "Bordes, material y equipos",
     "say": "El material excavado se coloca a una distancia segura del borde, como referencia al menos sesenta centímetros, para que no caiga ni cargue la pared. Las retroexcavadoras, los camiones y los equipos pesados se mantienen alejados del borde según el procedimiento, porque su peso y su vibración pueden provocar un derrumbe. Las excavaciones se acordonan y se señalizan, y de noche se iluminan.",
     "points": [
      "Material excavado lejos del borde",
      "Equipos pesados alejados del borde",
      "Acordona y señaliza",
      "Iluminación de noche"
     ]
    },
    {
     "t": "Acceso y atmósfera",
     "say": "Para entrar y salir de una zanja profunda se usa una escalera bien asegurada que sobresalga del borde, ubicada cerca de donde trabajas. Como el H2S y otros gases son más pesados que el aire, una excavación puede acumular gases o tener poco oxígeno; en ese caso se mide la atmósfera antes de entrar y se trata como espacio confinado. Nunca entres a una zanja mientras opera una máquina dentro de ella.",
     "points": [
      "Escalera asegurada cerca del trabajo",
      "Gases pesados se acumulan en la zanja",
      "Medición de gases cuando aplique",
      "Nunca dentro mientras opera la máquina"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "¿Cuál es el principal peligro al trabajar dentro de una zanja?",
     "o": [
      "El ruido",
      "La falta de luz natural",
      "El derrumbe de las paredes",
      "El polvo"
     ],
     "a": 2,
     "e": "El derrumbe puede atrapar y asfixiar a una persona en segundos; por eso se exigen sistemas de protección.",
     "ref": 0
    },
    {
     "q": "Después de un aguacero vas a volver a entrar a una zanja. ¿Qué debe ocurrir antes?",
     "o": [
      "Nada, ya estaba inspeccionada",
      "Basta con sacar el agua con un balde",
      "Entrar rápido antes de que llueva otra vez",
      "La persona competente debe inspeccionarla de nuevo"
     ],
     "a": 3,
     "e": "El agua debilita las paredes; la excavación se inspecciona otra vez antes de entrar.",
     "ref": 2
    },
    {
     "q": "¿Qué se hace antes de excavar cerca de una línea de flujo enterrada?",
     "o": [
      "Excavar con la retroexcavadora a toda velocidad",
      "Identificar y marcar la línea y excavar a mano cerca de ella",
      "Solo avisar al cocinero",
      "Excavar de noche para que haya menos gente"
     ],
     "a": 1,
     "e": "Se revisan planos, se detecta y marca la red y cerca de ella se excava a mano o con métodos aprobados.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp29",
   "title": "Piscinas, fosas y tanques abiertos",
   "en": {
    "title": "Pits, Ponds and Open Tanks",
    "objectives": [
     "Identify the pits, ponds and open tanks found on a land drilling location",
     "Recognize the hazards of drowning, engulfment, toxic gases and chemicals around them",
     "List the rules for barriers, access and rescue equipment near pits and tanks"
    ]
   },
   "objectives": [
    "Identificar las piscinas, fosas y tanques abiertos de una locación de perforación en tierra",
    "Reconocer los peligros de ahogamiento, hundimiento, gases tóxicos y químicos cerca de ellos",
    "Enumerar las reglas de barreras, accesos y equipos de rescate cerca de piscinas y tanques"
   ],
   "minutes": 30,
   "endorsement": true,
   "lessons": [
    {
     "t": "Piscinas y tanques en la locación",
     "say": "En una locación de tierra encuentras tanques de lodo, tanques de viaje, tanques de agua, cajas o tolvas de cortes, piscinas de agua lluvia o de aguas tratadas y, en algunos campos, piscinas de lodo o de reserva. Muchos campos ya usan sistemas cerrados sin piscinas de lodo, pero siguen existiendo tanques abiertos y fosas. Todos tienen algo en común: una caída dentro de ellos puede ser mortal.",
     "points": [
      "Tanques de lodo y de viaje",
      "Cajas de cortes y fosas",
      "Piscinas de agua o de reserva en algunos campos",
      "Caer adentro puede ser mortal"
     ]
    },
    {
     "t": "Ahogamiento y hundimiento",
     "say": "El lodo es denso y pegajoso; una persona que cae a un tanque o a una piscina de lodo se hunde y no puede nadar ni salir sola. Los bordes de las piscinas suelen estar resbalosos por la geomembrana mojada o el barro. Nunca camines por el borde de una piscina ni sobre las tapas o rejillas de un tanque sin estar seguro de que están completas y aseguradas.",
     "points": [
      "En el lodo no se puede nadar",
      "Geomembrana y bordes resbalosos",
      "No camines por el borde",
      "Rejillas y tapas completas y aseguradas"
     ]
    },
    {
     "t": "Gases y químicos",
     "say": "Los tanques de lodo y las piscinas pueden desprender H2S y gases inflamables que vienen del pozo, y el lodo puede contener químicos cáusticos. Como estos gases son más pesados que el aire, se acumulan sobre la superficie y dentro de los tanques. Ningún tanque se considera seguro para entrar: entrar a un tanque es un ingreso a espacio confinado con permiso, medición de gases, vigía y plan de rescate.",
     "points": [
      "H2S y gases inflamables sobre la superficie",
      "Lodo con químicos cáusticos",
      "Entrar a un tanque es espacio confinado",
      "Permiso, medición de gases, vigía y rescate"
     ]
    },
    {
     "t": "Barreras y señalización",
     "say": "Las piscinas y fosas se rodean con cerca o barreras y avisos para proteger a las personas, al ganado y a la fauna. Los tanques tienen barandas, rejillas y escaleras de acceso. No retires ni cruces una barrera; si encuentras una dañada, repórtala. Nunca trabajes solo cerca de una piscina o tanque abierto.",
     "points": [
      "Cerca y avisos alrededor de piscinas",
      "Barandas y rejillas en los tanques",
      "No cruces ni retires barreras",
      "Nunca trabajes solo cerca de una piscina"
     ]
    },
    {
     "t": "Si alguien cae",
     "say": "Si alguien cae a una piscina o a un tanque, da la alarma de inmediato y no te lances a sacarlo, porque podrías hundirte o desmayarte por los gases. Usa el aro salvavidas o la cuerda que debe estar junto a la piscina, lanzándolos desde un lugar seguro. Dentro de un tanque, el rescate lo hace solo personal entrenado con equipo de respiración.",
     "points": [
      "Da la alarma",
      "No te lances",
      "Lanza el aro o la cuerda desde un lugar seguro",
      "En tanques: solo rescatistas con equipo de respiración"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Un compañero cae a una piscina de agua lluvia con bordes de geomembrana. ¿Qué haces?",
     "o": [
      "Te lanzas a sacarlo",
      "Corres al campamento por ayuda sin avisar",
      "Das la alarma y le lanzas el aro o la cuerda desde un lugar seguro",
      "Esperas a que salga solo"
     ],
     "a": 2,
     "e": "Lanzarte te pone en riesgo; se da la alarma y se usa el equipo de rescate desde un lugar seguro.",
     "ref": 4
    },
    {
     "q": "¿Por qué entrar a un tanque de lodo vacío se trata como espacio confinado?",
     "o": [
      "Porque puede acumular gases tóxicos o inflamables y tener poco oxígeno",
      "Porque es pequeño y oscuro",
      "Porque lo exige el cocinero",
      "Porque tiene ruido"
     ],
     "a": 0,
     "e": "Los gases pesados se acumulan dentro del tanque; se requiere permiso, medición de gases, vigía y plan de rescate.",
     "ref": 2
    },
    {
     "q": "¿Por qué es tan peligroso caer en un tanque de lodo?",
     "o": [
      "Porque el lodo está frío",
      "Porque mancha la ropa",
      "Porque daña el monitor de gases",
      "Porque el lodo es denso y no permite nadar ni salir solo"
     ],
     "a": 3,
     "e": "El lodo es denso y pegajoso; la persona se hunde y no puede salir por sí misma.",
     "ref": 1
    }
   ]
  },
  {
   "id": "rp30",
   "title": "Fauna peligrosa en los campos de Colombia",
   "en": {
    "title": "Wildlife Hazard Awareness",
    "objectives": [
     "Identify the venomous and dangerous animals commonly found in Colombian oilfields",
     "Recognize the practices to prevent bites, stings and vector-borne diseases",
     "List the first actions after a snake bite or a severe sting"
    ]
   },
   "objectives": [
    "Identificar los animales venenosos y peligrosos comunes en los campos petroleros de Colombia",
    "Reconocer las prácticas para prevenir mordeduras, picaduras y enfermedades transmitidas por vectores",
    "Enumerar las primeras acciones ante una mordedura de serpiente o una picadura grave"
   ],
   "minutes": 30,
   "endorsement": true,
   "lessons": [
    {
     "t": "La fauna de los campos",
     "say": "Los campos petroleros de Colombia están en zonas de gran biodiversidad, desde el valle cálido del Magdalena hasta los Llanos y el piedemonte amazónico. Allí viven serpientes venenosas como la talla X o mapaná, la cascabel y las corales, además de alacranes, arañas, abejas africanizadas, avispas, hormigas como la conga, garrapatas y mosquitos. En zonas con cuerpos de agua también puede haber babillas. La mayoría de estos animales solo ataca cuando se siente amenazado.",
     "points": [
      "Serpientes: talla X o mapaná, cascabel, corales",
      "Alacranes, arañas, abejas, avispas y congas",
      "Garrapatas y mosquitos",
      "Atacan sobre todo cuando se sienten amenazados"
     ]
    },
    {
     "t": "Serpientes: prevención",
     "say": "Las serpientes se esconden entre la maleza, los tubos almacenados, las tablas, los sacos y los huecos, y salen más al amanecer, al atardecer y después de la lluvia. Usa botas, pantalón largo y linterna de noche; mira dónde pisas y dónde pones las manos. Antes de mover tubería o material almacenado en el suelo, golpéalo o muévelo con una herramienta. Mantén la maleza corta y el orden en la locación para quitarles refugio.",
     "points": [
      "Se esconden en maleza, tubería y material almacenado",
      "Botas, pantalón largo y linterna de noche",
      "Mira dónde pisas y pones las manos",
      "Mueve el material con herramienta, no con la mano"
     ]
    },
    {
     "t": "Si ves un animal peligroso",
     "say": "Si ves una serpiente u otro animal peligroso, quédate quieto, aléjate despacio y avisa para que la gente no se acerque. No intentes atraparlo, matarlo ni tomarle fotos de cerca: muchas mordeduras ocurren así. La fauna silvestre está protegida, y el manejo del animal lo hace el personal designado por la empresa. Si hay un panal de abejas o avispas, no lo toques y repórtalo.",
     "points": [
      "Quieto, aléjate despacio y avisa",
      "No atrapes, mates ni fotografíes de cerca",
      "El manejo lo hace personal designado",
      "Panales: no tocar, reportar"
     ]
    },
    {
     "t": "Insectos, arañas y vectores",
     "say": "Revisa y sacude tus botas, guantes y ropa antes de ponértelos, porque los alacranes y las arañas se esconden allí. Usa repelente según la indicación del servicio médico, sobre todo al amanecer y al atardecer, y revisa tu cuerpo buscando garrapatas al terminar el turno. En varias regiones del país hay dengue, malaria o leishmaniasis; si tienes fiebre, dolor de cuerpo o una herida que no sana, avisa al paramédico.",
     "points": [
      "Sacude botas, guantes y ropa",
      "Repelente según indicación médica",
      "Revisa garrapatas al final del turno",
      "Fiebre o herida que no sana: avisa"
     ]
    },
    {
     "t": "Mordedura de serpiente o picadura grave",
     "say": "Si una serpiente muerde a alguien, aleja a la persona del animal, mantenla calmada y quieta, retira anillos, relojes y prendas apretadas, inmoviliza la extremidad y avisa de inmediato para el traslado a un centro de salud, donde se aplica el suero antiofídico. No hagas torniquete, no cortes, no chupes la herida ni apliques remedios caseros. Ante muchas picaduras de abejas o una reacción alérgica con hinchazón de la cara o dificultad para respirar, es una emergencia: llama al paramédico.",
     "points": [
      "Calma, quietud e inmovilizar la extremidad",
      "Retira anillos y prendas apretadas",
      "Traslado urgente para suero antiofídico",
      "Nada de torniquete, cortes, succión ni remedios caseros",
      "Alergia o múltiples picaduras: emergencia"
     ]
    }
   ],
   "activity": null,
   "checks": [
    {
     "q": "Una serpiente muerde a un compañero en la pierna. ¿Cuál de estas acciones es correcta?",
     "o": [
      "Hacer un torniquete fuerte",
      "Mantenerlo quieto, inmovilizar la pierna y avisar para el traslado",
      "Cortar y chupar la herida",
      "Ponerle un remedio casero"
     ],
     "a": 1,
     "e": "Se mantiene a la persona calmada e inmóvil y se traslada para el suero antiofídico; torniquetes, cortes y succión hacen daño.",
     "ref": 4
    },
    {
     "q": "Vas a levantar un tubo que lleva días en el suelo. ¿Qué haces primero?",
     "o": [
      "Golpearlo o moverlo con una herramienta para espantar animales",
      "Meter la mano por debajo",
      "Levantarlo de un tirón",
      "Patearlo con la bota"
     ],
     "a": 0,
     "e": "Las serpientes y alacranes se esconden en el material almacenado; se mueve primero con una herramienta.",
     "ref": 1
    },
    {
     "q": "Encuentras una serpiente cerca de los burros de tubería. ¿Qué haces?",
     "o": [
      "La matas con una pala",
      "Le tomas una foto de cerca",
      "Te alejas despacio y avisas para que la maneje el personal designado",
      "La atrapas con un palo"
     ],
     "a": 2,
     "e": "Muchas mordeduras ocurren al intentar matar o atrapar al animal; aléjate y reporta.",
     "ref": 2
    }
   ]
  },
  {
   "id": "rp31",
   "title": "Movilización del taladro y peligros de la locación en tierra",
   "en": {
    "title": "Land Rig Move and Onshore Location Hazards",
    "objectives": [
     "Recognize the hazards of rig-down, transport and rig-up on a land location",
     "Identify the controls for vehicles, cranes and overhead power lines during a rig move",
     "List the actions to take during thunderstorms and severe weather on location"
    ]
   },
   "objectives": [
    "Reconocer los peligros del desarme, el transporte y el armado del taladro en tierra",
    "Identificar los controles para vehículos, grúas y líneas eléctricas aéreas durante la movilización",
    "Enumerar las acciones a seguir ante tormentas eléctricas y clima severo en la locación"
   ],
   "minutes": 30,
   "endorsement": true,
   "lessons": [
    {
     "t": "La movilización, una operación de alto riesgo",
     "say": "Mover un taladro de tierra significa desarmarlo, cargarlo en decenas de camiones, transportarlo por vías rurales y armarlo en la nueva locación. En esos días se juntan grúas, camiones, cargas pesadas, trabajo en alturas, personal de varias empresas y presión por el tiempo. Por eso cada movilización tiene su plan, sus reuniones de seguridad y un responsable que coordina todos los movimientos.",
     "points": [
      "Desarme, transporte y armado",
      "Grúas, camiones y cargas pesadas",
      "Varias empresas trabajando al tiempo",
      "Plan de movilización y un coordinador"
     ]
    },
    {
     "t": "Vehículos y cargas en la locación",
     "say": "Durante la movilización la locación se llena de camiones que entran, retroceden y maniobran. Cada maniobra se hace con un señalero y con las personas fuera de la ruta del vehículo. Nunca te pares entre un camión y una carga ni detrás de un vehículo que retrocede. Las cargas se amarran correctamente antes de moverse, y nadie se sube a una cama baja o a una carga mientras se mueve.",
     "points": [
      "Toda maniobra con señalero",
      "Fuera de la ruta de los vehículos",
      "Nunca entre camión y carga",
      "Nadie viaja sobre la carga"
     ]
    },
    {
     "t": "Armado y desarmado",
     "say": "Al armar y desarmar se izan la subestructura, el mástil y los equipos pesados con grúas, se colocan pasadores y se tensionan cables y vientos. Es cuando más cargas suspendidas, puntos de atrapamiento y trabajos en altura hay. Sigue la secuencia del procedimiento, mantente fuera de la línea de fuego cuando se iza o se baja el mástil, y respeta la zona de exclusión aunque no tengas tarea allí.",
     "points": [
      "Izaje de subestructura y mástil",
      "Pasadores y cables tensionados",
      "Fuera de la línea de fuego al izar el mástil",
      "Respeta la zona de exclusión"
     ]
    },
    {
     "t": "Líneas eléctricas aéreas",
     "say": "En las vías y en los alrededores de las locaciones hay líneas eléctricas aéreas. Si una grúa, un mástil en transporte o una carga se acerca demasiado, la electricidad puede saltar sin contacto directo y electrocutar a quien toca el equipo o está cerca. Antes de la movilización se identifican las líneas en la ruta y en la locación y se definen las distancias de seguridad según el voltaje y el procedimiento. Ante la duda, trata toda línea como energizada y mantente lo más lejos posible.",
     "points": [
      "Identifica las líneas en la ruta y la locación",
      "La electricidad puede saltar sin tocar",
      "Distancias según voltaje y procedimiento",
      "Toda línea se trata como energizada"
     ]
    },
    {
     "t": "Tormentas eléctricas y clima",
     "say": "En muchas zonas petroleras de Colombia las tormentas eléctricas son frecuentes y el mástil es el punto más alto del área. Cuando se aproxima una tormenta se suspenden el trabajo en el mástil, los izajes con grúa y el trasvase de combustibles, según el procedimiento. Una regla práctica muy usada es buscar refugio si el trueno se oye menos de treinta segundos después del relámpago y esperar treinta minutos después del último trueno para volver. Los aguaceros también causan derrumbes, inundaciones y vías resbalosas.",
     "points": [
      "El mástil atrae los rayos",
      "Se suspenden trabajos en altura e izajes",
      "Refugio si el trueno sigue al relámpago en menos de 30 s",
      "Espera 30 minutos tras el último trueno",
      "Lluvia: derrumbes, inundaciones y vías resbalosas"
     ]
    },
    {
     "t": "La locación nueva",
     "say": "Al llegar a una locación nueva, todo el personal recibe su inducción: rutas de evacuación, puntos de encuentro, alarmas, mangas de viento, áreas restringidas y peligros propios del sitio, como fauna, comunidades vecinas y fuentes de agua. Las condiciones cambian de un pozo a otro, así que no supongas que es igual al anterior. Pregunta, observa y reporta lo que encuentres diferente.",
     "points": [
      "Inducción en cada locación nueva",
      "Ubica rutas, puntos de encuentro y mangas de viento",
      "Cada locación tiene sus peligros",
      "No supongas que es igual a la anterior"
     ]
    }
   ],
   "activity": {
    "mod": "rigup",
    "label": "Práctica 3D: armado del taladro con grúa y señalero"
   },
   "checks": [
    {
     "q": "Una grúa debe trabajar cerca de una línea eléctrica aérea durante el armado. ¿Qué es lo correcto?",
     "o": [
      "Trabajar rápido para no demorar",
      "Tocar la línea con un palo para ver si tiene energía",
      "Hacer el izaje de noche",
      "Mantener la distancia de seguridad definida y tratar la línea como energizada"
     ],
     "a": 3,
     "e": "La electricidad puede saltar sin contacto; se respetan las distancias del procedimiento y la línea se trata como energizada.",
     "ref": 3
    },
    {
     "q": "Se acerca una tormenta eléctrica y el encuellador está en el mástil. ¿Qué debe ocurrir?",
     "o": [
      "Que termine la parada",
      "Que baje del mástil y se suspenda el trabajo en altura",
      "Que se amarre mejor",
      "Que espere a que llueva"
     ],
     "a": 1,
     "e": "El mástil es el punto más alto; con tormenta se suspenden los trabajos en altura y los izajes.",
     "ref": 4
    },
    {
     "q": "Durante la movilización un camión va a retroceder hacia una carga. ¿Dónde no debes estar nunca?",
     "o": [
      "En el punto de encuentro",
      "Junto al señalero, a la vista del conductor",
      "Entre el camión y la carga",
      "En el camino peatonal"
     ],
     "a": 2,
     "e": "Entre un camión y una carga hay riesgo de aplastamiento; las maniobras se hacen con señalero y el personal fuera de la ruta.",
     "ref": 1
    }
   ]
  }
 ],
 "exam": {
  "size": 40,
  "pass": 75,
  "bank": []
 }
};
