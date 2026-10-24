-- =====================================================================================
-- Escuela de Perforación · base de datos de registros de formación (Supabase / PostgreSQL)
-- Ejecutar completo en Supabase → SQL Editor → New query → Run.
-- Guarda: cuentas de aprendices, progreso y tiempo por módulo, bitácora de eventos (solo se agrega,
-- nunca se borra), intentos del examen calificados en el servidor, constancias, códigos de
-- verificación, quejas y encuestas. Retención mínima exigida por la IADC: 5 años.
-- =====================================================================================

-- ---------- aprendices e instructores ----------
create table if not exists public.trainees(
  id uuid primary key references auth.users(id) on delete restrict,
  full_name text not null,
  doc_type text not null,
  doc_number text not null unique,
  email text, phone text, company text, cargo text,
  role text not null default 'student' check (role in ('student','instructor','admin')),
  photo_path text,
  consent_at timestamptz not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.trainees where id = auth.uid() and role in ('instructor','admin'))
$$;

-- ---------- cursos y banco de preguntas (el banco solo lo leen los instructores) ----------
create table if not exists public.courses(
  id text primary key,
  program text not null check (program in ('RigPass','DIT')),
  title text not null,
  exam_size int not null,
  pass_mark int not null default 75,
  max_attempts int not null default 3,
  validity_months int not null default 0,
  modules jsonb not null default '[]',          -- [{"id":"rp01","minutes":14}, ...]
  iadc_program_id text,
  endorsement text,
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_bank(
  id bigserial primary key,
  course text not null references public.courses(id),
  module text not null,
  q text not null,
  o jsonb not null,                              -- 4 opciones
  a int not null check (a between 0 and 3),
  e text,
  active boolean not null default true
);

-- ---------- registros de formación ----------
create table if not exists public.progress(
  user_id uuid not null references public.trainees(id),
  course text not null,
  module text not null,
  status text not null default 'started' check (status in ('started','completed')),
  active_seconds int not null default 0,
  activity_score int,
  checks_ok int not null default 0,
  checks_wrong int not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, course, module)
);

create table if not exists public.events(
  id bigserial primary key,
  user_id uuid not null default auth.uid() references public.trainees(id),
  course text, module text,
  type text not null,
  data jsonb not null default '{}',
  at timestamptz not null default now()
);
create index if not exists events_user_idx on public.events(user_id, at);

create table if not exists public.exam_attempts(
  id bigserial primary key,
  user_id uuid not null references public.trainees(id),
  course text not null references public.courses(id),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  question_ids bigint[] not null,
  orders jsonb not null,                         -- orden en que se mostraron las opciones de cada pregunta
  answers jsonb,
  score int, passed boolean, breakdown jsonb,
  reset boolean not null default false
);

create table if not exists public.certificates(
  number text primary key,
  user_id uuid not null references public.trainees(id),
  course text not null references public.courses(id),
  program text, title text, full_name text, doc_masked text,
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  score int, instructor_name text, provider_name text, iadc_program_id text, endorsement text,
  revoked boolean not null default false
);

create table if not exists public.verif_codes(
  id bigserial primary key,
  user_id uuid not null references public.trainees(id),
  code text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_by uuid default auth.uid()
);

create table if not exists public.complaints(
  id bigserial primary key,
  user_id uuid not null default auth.uid() references public.trainees(id),
  course text,
  text text not null,
  status text not null default 'abierta' check (status in ('abierta','en revisión','cerrada')),
  response text, responded_by uuid,
  created_at timestamptz not null default now(), updated_at timestamptz
);

create table if not exists public.surveys(
  id bigserial primary key,
  user_id uuid not null default auth.uid() references public.trainees(id),
  course text not null,
  answers jsonb not null,
  comment text,
  created_at timestamptz not null default now()
);

-- ---------- permisos (Row Level Security) ----------
alter table public.trainees enable row level security;
alter table public.courses enable row level security;
alter table public.exam_bank enable row level security;
alter table public.progress enable row level security;
alter table public.events enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.certificates enable row level security;
alter table public.verif_codes enable row level security;
alter table public.complaints enable row level security;
alter table public.surveys enable row level security;

drop policy if exists tr_sel on public.trainees;
create policy tr_sel on public.trainees for select using (id = auth.uid() or public.is_staff());
drop policy if exists tr_ins on public.trainees;
create policy tr_ins on public.trainees for insert with check (id = auth.uid() and role = 'student');
drop policy if exists tr_upd_self on public.trainees;
create policy tr_upd_self on public.trainees for update using (id = auth.uid()) with check (id = auth.uid() and role = (select t.role from public.trainees t where t.id = auth.uid()));
drop policy if exists tr_upd_staff on public.trainees;
create policy tr_upd_staff on public.trainees for update using (public.is_staff());

drop policy if exists co_sel on public.courses;
create policy co_sel on public.courses for select using (true);
drop policy if exists co_all on public.courses;
create policy co_all on public.courses for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists eb_all on public.exam_bank;
create policy eb_all on public.exam_bank for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists pr_sel on public.progress;
create policy pr_sel on public.progress for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists pr_ins on public.progress;
create policy pr_ins on public.progress for insert with check (user_id = auth.uid());
drop policy if exists pr_upd on public.progress;
create policy pr_upd on public.progress for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists ev_sel on public.events;
create policy ev_sel on public.events for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists ev_ins on public.events;
create policy ev_ins on public.events for insert with check (user_id = auth.uid());
-- sin políticas de update/delete: la bitácora no se puede modificar

drop policy if exists ea_sel on public.exam_attempts;
create policy ea_sel on public.exam_attempts for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists ea_upd on public.exam_attempts;
create policy ea_upd on public.exam_attempts for update using (public.is_staff());

drop policy if exists ce_sel on public.certificates;
create policy ce_sel on public.certificates for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists ce_upd on public.certificates;
create policy ce_upd on public.certificates for update using (public.is_staff());

drop policy if exists vc_staff on public.verif_codes;
create policy vc_staff on public.verif_codes for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists cp_sel on public.complaints;
create policy cp_sel on public.complaints for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists cp_ins on public.complaints;
create policy cp_ins on public.complaints for insert with check (user_id = auth.uid());
drop policy if exists cp_upd on public.complaints;
create policy cp_upd on public.complaints for update using (public.is_staff());

drop policy if exists sv_sel on public.surveys;
create policy sv_sel on public.surveys for select using (user_id = auth.uid() or public.is_staff());
drop policy if exists sv_ins on public.surveys;
create policy sv_ins on public.surveys for insert with check (user_id = auth.uid());

-- ---------- examen final: se arma y se califica en el servidor (el aprendiz nunca ve las respuestas) ----------
create or replace function public.start_exam(p_course text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  c public.courses;
  missing int;
  used int;
  att public.exam_attempts;
  qs jsonb;
begin
  if uid is null then raise exception 'Debes iniciar sesión'; end if;
  select * into c from public.courses where id = p_course;
  if not found then raise exception 'Curso no publicado en el servidor'; end if;
  -- todos los módulos completos
  select count(*) into missing from jsonb_array_elements(c.modules) m
    where not exists(select 1 from public.progress p where p.user_id = uid and p.course = p_course and p.module = m->>'id' and p.status = 'completed');
  if missing > 0 then raise exception 'Faltan % módulos por completar', missing; end if;
  -- identidad verificada para el examen en los últimos 30 minutos
  if not exists(select 1 from public.events where user_id = uid and type = 'id_verify' and data->>'purpose' = 'exam' and at > now() - interval '30 minutes') then
    raise exception 'Primero verifica tu identidad para el examen';
  end if;
  if exists(select 1 from public.exam_attempts where user_id = uid and course = p_course and passed and not reset) then
    raise exception 'Ya aprobaste este examen';
  end if;
  -- intento abierto en las últimas 3 horas: se retoma el mismo (no se pueden pedir preguntas nuevas)
  select * into att from public.exam_attempts where user_id = uid and course = p_course and submitted_at is null and not reset and started_at > now() - interval '3 hours' order by id desc limit 1;
  if not found then
    if (select count(*) from public.exam_bank where course = p_course and active) < c.exam_size then raise exception 'El banco de preguntas del curso está incompleto'; end if;
    select count(*) into used from public.exam_attempts where user_id = uid and course = p_course and submitted_at is not null and not reset;
    if used >= c.max_attempts then raise exception 'Agotaste los % intentos. Tu instructor debe revisar tu caso y habilitarte de nuevo', c.max_attempts; end if;
    with ranked as (
      select id, row_number() over (partition by module order by random()) rn, random() r
      from public.exam_bank where course = p_course and active
    ), pick as (select id from ranked order by rn, r limit c.exam_size)
    insert into public.exam_attempts(user_id, course, question_ids, orders)
    select uid, p_course, array_agg(pick.id order by random()),
           jsonb_object_agg(pick.id::text, (select jsonb_agg(x order by random()) from generate_series(0,3) x))
    from pick
    returning * into att;
    insert into public.events(user_id, course, type, data) values (uid, p_course, 'exam_start', jsonb_build_object('attempt', att.id, 'questions', cardinality(att.question_ids)));
  end if;
  select jsonb_agg(jsonb_build_object('id', b.id, 'q', b.q,
           'o', (select jsonb_agg(b.o->(ord.v::int) order by ord.i) from jsonb_array_elements_text(att.orders->(b.id::text)) with ordinality ord(v,i)))
         order by array_position(att.question_ids, b.id))
    into qs from public.exam_bank b where b.id = any(att.question_ids);
  return jsonb_build_object('attempt', att.id, 'started_at', att.started_at, 'pass', c.pass_mark, 'questions', qs);
end $$;

create or replace function public.submit_exam(p_attempt bigint, p_answers jsonb, p_instructor text default null, p_provider text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  att public.exam_attempts;
  c public.courses;
  t public.trainees;
  total int := 0; ok int := 0; sc int; pass boolean;
  bd jsonb := '{}'; fb jsonb := '[]';
  b record; shown int; chosen int; good boolean;
  cert public.certificates;
begin
  select * into att from public.exam_attempts where id = p_attempt and user_id = uid for update;
  if not found then raise exception 'Intento no encontrado'; end if;
  if att.submitted_at is not null then raise exception 'Este intento ya fue calificado'; end if;
  select * into c from public.courses where id = att.course;
  for b in select * from public.exam_bank where id = any(att.question_ids) loop
    total := total + 1;
    shown := nullif(p_answers->>(b.id::text), '')::int;
    chosen := case when shown is null then null else (att.orders->(b.id::text)->>shown)::int end;
    good := chosen is not null and chosen = b.a;
    if good then ok := ok + 1; end if;
    bd := jsonb_set(bd, array[b.module], jsonb_build_object(
            'ok', coalesce((bd->b.module->>'ok')::int, 0) + case when good then 1 else 0 end,
            'total', coalesce((bd->b.module->>'total')::int, 0) + 1), true);
    if not good then
      fb := fb || jsonb_build_array(jsonb_build_object('module', b.module, 'q', b.q,
              'tuya', case when chosen is null then null else b.o->>chosen end, 'correcta', b.o->>b.a, 'e', b.e));
    end if;
  end loop;
  sc := case when total = 0 then 0 else round(100.0 * ok / total) end;
  pass := sc >= c.pass_mark;
  update public.exam_attempts set submitted_at = now(), answers = p_answers, score = sc, passed = pass, breakdown = bd where id = att.id;
  insert into public.events(user_id, course, type, data) values (uid, att.course, 'exam_submit', jsonb_build_object('attempt', att.id, 'score', sc, 'passed', pass));
  if pass then
    select * into cert from public.certificates where user_id = uid and course = att.course and not revoked;
    if not found then
      select * into t from public.trainees where id = uid;
      insert into public.certificates(number, user_id, course, program, title, full_name, doc_masked, expires_at, score, instructor_name, provider_name, iadc_program_id, endorsement)
      values (case when c.program = 'RigPass' then 'EP-RP-' else 'EP-DIT-' end || to_char(now(), 'YYYY') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
              uid, att.course, c.program, c.title, t.full_name, '****' || right(t.doc_number, 4),
              case when c.validity_months > 0 then now() + make_interval(months => c.validity_months) end,
              sc, p_instructor, p_provider, c.iadc_program_id, c.endorsement)
      returning * into cert;
      insert into public.events(user_id, course, type, data) values (uid, att.course, 'certificate', jsonb_build_object('number', cert.number));
    end if;
  end if;
  return jsonb_build_object('score', sc, 'passed', pass, 'pass', c.pass_mark, 'total', total, 'ok', ok, 'breakdown', bd, 'feedback', fb,
                            'certificate', case when pass then to_jsonb(cert) end);
end $$;

-- verificación pública de una constancia (para el código QR)
create or replace function public.verify_certificate(p_number text) returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce((select jsonb_build_object('number', number, 'full_name', full_name, 'doc_masked', doc_masked, 'title', title, 'program', program,
          'issued_at', issued_at, 'expires_at', expires_at, 'endorsement', endorsement, 'provider_name', provider_name,
          'valid', not revoked and (expires_at is null or expires_at > now()), 'revoked', revoked)
   from public.certificates where number = upper(trim(p_number))), jsonb_build_object('found', false))
$$;

-- códigos de verificación de identidad que genera el instructor (cuando no hay cámara, por ejemplo en las gafas)
create or replace function public.gen_code(p_user uuid) returns text
language plpgsql security definer set search_path = public as $$
declare k text;
begin
  if not public.is_staff() then raise exception 'Solo instructores'; end if;
  k := lpad((floor(random() * 1000000))::int::text, 6, '0');
  insert into public.verif_codes(user_id, code, expires_at, created_by) values (p_user, k, now() + interval '30 minutes', auth.uid());
  return k;
end $$;

create or replace function public.use_code(p_code text, p_purpose text) returns boolean
language plpgsql security definer set search_path = public as $$
declare v public.verif_codes;
begin
  select * into v from public.verif_codes where user_id = auth.uid() and code = trim(p_code) and used_at is null and expires_at > now() order by id desc limit 1 for update;
  if not found then return false; end if;
  update public.verif_codes set used_at = now() where id = v.id;
  insert into public.events(user_id, type, data) values (auth.uid(), 'id_verify', jsonb_build_object('purpose', p_purpose, 'method', 'codigo_instructor', 'by', v.created_by));
  return true;
end $$;

-- el instructor habilita de nuevo el examen después de revisar el caso
create or replace function public.reset_attempts(p_user uuid, p_course text) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not public.is_staff() then raise exception 'Solo instructores'; end if;
  update public.exam_attempts set reset = true where user_id = p_user and course = p_course and not coalesce(passed, false);
  get diagnostics n = row_count;
  insert into public.events(user_id, course, type, data) values (p_user, p_course, 'exam_reset', jsonb_build_object('by', auth.uid(), 'attempts', n));
  return n;
end $$;

revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;
grant execute on function public.start_exam(text), public.submit_exam(bigint, jsonb, text, text), public.use_code(text, text), public.gen_code(uuid), public.reset_attempts(uuid, text), public.is_staff() to authenticated;

-- ---------- fotos de verificación de identidad (Storage, privado) ----------
insert into storage.buckets(id, name, public) values ('idphotos', 'idphotos', false) on conflict (id) do nothing;
drop policy if exists idp_ins on storage.objects;
create policy idp_ins on storage.objects for insert to authenticated with check (bucket_id = 'idphotos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists idp_sel on storage.objects;
create policy idp_sel on storage.objects for select to authenticated using (bucket_id = 'idphotos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
