/* ===================================================================== CONFIGURACIÓN DEL PROVEEDOR DE FORMACIÓN
   Edite estos datos antes de publicar. Los campos vacíos se muestran como «por definir». */
const CFG={
  provider:{
    name:'Escuela de Perforación',               // razón social del proveedor acreditado
    address:'Neiva, Huila, Colombia',             // dirección física de la sede principal
    // números de programa que asigna la IADC al aprobar la acreditación (dejar vacío hasta tenerlos)
    iadcRigPassId:'',
    iadcDitIds:{'dit-patio':'','dit-cunero':'','dit-encuellador':'','dit-perforador':'','dit-supervisor':''},
    verifyBase:'https://migue05101.github.io/escuela-perforacion/'   // página donde se verifican las constancias (QR)
  },
  // instructores aprobados por la IADC que responden dudas y firman las constancias
  instructors:[{name:'Por definir',email:'',phone:'',hours:'Lunes a sábado, 7:00 a 17:00 (hora de Colombia)'}],
  // soporte técnico en vivo: la IADC pide al menos 12 horas al día cuando el curso se toma desde casa
  support:{email:'',phone:'',whatsapp:'',hours:'Todos los días, 6:00 a 18:00 (hora de Colombia)',reply:'Respuesta por correo en menos de 24 horas; por teléfono o WhatsApp, inmediata en el horario de soporte.'},
  // servidor de registros (Supabase). Ver server/LEEME.md. Vacío = modo local de demostración (no apto para certificar)
  server:{url:'',anonKey:'',emailDomain:'aprendices.escuela-perforacion.co'},
  // reglas de los cursos
  idleMinutes:5,            // sin actividad este tiempo, el reloj de dedicación se pausa
  enforceSeatTime:true,     // exigir el tiempo mínimo de cada módulo
  maxExamAttempts:3,        // intentos del examen final antes de requerir al instructor
  // código para crear cuentas de instructor en el modo local (en el servidor el rol se asigna en la base de datos)
  localInstructorCode:'CAMBIAR-ESTE-CODIGO'
};
