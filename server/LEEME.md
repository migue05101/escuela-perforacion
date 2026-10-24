# Servidor de registros (Supabase)

La IADC exige que cada aprendiz tenga usuario y clave propios, y que el proveedor guarde los registros de formación (inscripción, identidad, tiempos, evaluaciones y certificados) al menos **5 años**, disponibles para auditoría. Además, el examen final debe estar protegido.

Por eso la app trabaja con un servidor **Supabase**, que es una base de datos PostgreSQL en la nube con usuarios y almacenamiento de archivos. El servidor guarda los registros, arma el examen y lo califica: las respuestas correctas nunca llegan al celular ni al computador del aprendiz.

Sin servidor, la app funciona en **modo local de demostración**. En ese modo todo queda solo en el dispositivo y no es válido para certificar.

## 1. Crear el proyecto

1. Cree una cuenta en https://supabase.com y luego un proyecto nuevo.
   - **Región:** la más cercana, por ejemplo São Paulo.
   - **Contraseña de la base de datos:** fuerte, y guárdela.
2. Para los registros oficiales use un plan **pago**. En el plan gratuito, los proyectos sin uso se pausan y las copias de seguridad son limitadas. La auditoría exige conservar los registros 5 años.

## 2. Crear las tablas

1. Abra **SQL Editor → New query**.
2. Pegue todo el archivo `server/supabase.sql` y presione **Run**.

El script crea lo siguiente:

- **Tablas:** `trainees`, `courses`, `exam_bank`, `progress`, `events`, `exam_attempts`, `certificates`, `verif_codes`, `complaints` y `surveys`.
- **Permisos por fila:**
  - Cada aprendiz solo ve lo suyo.
  - Los instructores ven todo.
  - La bitácora de eventos no se puede modificar ni borrar.
- **Funciones del servidor:**
  - `start_exam` y `submit_exam`: arman el examen al azar y lo califican.
  - `verify_certificate`: verificación pública de constancias, para el código QR.
  - `gen_code` y `use_code`: códigos de verificación de identidad.
  - `reset_attempts`: habilita de nuevo el examen.
- **Bucket privado `idphotos`:** guarda las fotos de verificación de identidad.

## 3. Configurar el ingreso

En **Authentication → Providers → Email**:

- Deje activo **Email**.
- **Desactive «Confirm email».** Muchos aprendices no tienen correo. La app crea un usuario interno con el número de documento, del tipo `doc1075123456@aprendices.escuela-perforacion.co`. El aprendiz ingresa con su número de documento y su clave.
- La longitud mínima de la clave debe ser 8.

## 4. Conectar la app

En **Project Settings → API** copie la **Project URL** y la clave **anon public**. Péguelas en `src/config.js`:

```js
server:{url:'https://xxxx.supabase.co',anonKey:'eyJ...',emailDomain:'aprendices.escuela-perforacion.co'},
```

Luego ejecute `sh src/build.sh` y publique (`git push`).

La clave `anon` es pública por diseño: la seguridad la dan los permisos por fila del paso 2. **Nunca** ponga en la app la clave `service_role`.

## 5. Crear el primer instructor

1. El instructor crea su cuenta en la app, como cualquier aprendiz.
2. En **SQL Editor**, el administrador le asigna el rol:

```sql
update public.trainees set role = 'instructor' where doc_number = '1075000000';
-- o 'admin' para el responsable de calidad
```

Así nadie puede hacerse instructor desde la app.

## 6. Publicar los cursos y los bancos del examen

Los bancos de preguntas del examen final **no están en la app ni en GitHub**, porque eso sería publicar las respuestas. Se entregan aparte como archivos `privado/banco_<curso>.json`.

1. Ingrese como instructor: **Panel del instructor → Cursos y servidor**.
2. Seleccione los seis archivos `banco_*.json`.
3. Presione **Publicar**.

Al publicar se suben la definición de cada curso (módulos, tiempos mínimos, tamaño del examen, nota mínima, intentos y vigencia) y su banco. Si después cambia un banco, vuelva a publicar: el banco anterior queda inactivo, pero no se borra, para que la auditoría pueda ver contra qué preguntas se calificó cada intento.

## 7. Respaldo y retención

- Active las copias de seguridad diarias del plan pago (**Database → Backups**).
- Una vez al mes, descargue desde el **Panel del instructor → Exportar registros**:
  - el **respaldo completo (JSON)**;
  - el **CSV de registros por curso**.
- Guárdelos en un almacenamiento de la empresa, por ejemplo en Dropbox.
- No borre registros antes de 5 años. Las tablas no tienen borrado desde la app.

## 8. Qué revisa el auditor y dónde está

| Requisito | Dónde se ve |
|---|---|
| Usuario y clave únicos | Authentication → Users; tabla `trainees` |
| Identidad al inscribirse, al iniciar y antes del examen | `events` tipo `id_verify` (con foto en `idphotos` o código del instructor) |
| Hora de inicio y fin, y tiempo total | `progress` (por módulo); `events` `module_start`, `module_leave` y `module_complete` |
| Módulos en orden y sin saltos | `progress.completed_at` en orden; la app bloquea el siguiente módulo |
| Chequeos con remediación | `events` tipo `check` (intento, correcta o incorrecta) |
| Examen final calificado y seguro | `exam_attempts` (preguntas, respuestas, nota); banco solo visible a instructores |
| Retroalimentación al aprendiz | Respuesta de `submit_exam` (temas por repasar) |
| Reintento | `exam_attempts`; `reset_attempts` deja constancia en `events` |
| Constancia inmediata | `certificates`; verificación pública por QR |
| Encuestas y quejas para la mejora continua | `surveys`, `complaints` |
