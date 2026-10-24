/* ===================================================================== CURSOS CERTIFICABLES (IADC RigPass y DIT)
   Aviso inicial · declaración de calidad · identidad al inscribirse, al iniciar y antes del examen ·
   módulos en orden sin saltos · tiempo activo con pausa por inactividad · chequeos con remediación ·
   examen final aleatorio calificado en el servidor (mínimo 75 %) · reintento · encuesta · constancia con QR ·
   ayuda, soporte y quejas · panel del instructor con registros y exportes. */
const COURSES=[];
function prepCourse(c){c.endorsementLabel=c.program==='RigPass'?'Tierra (Land)':null;c.totalMin=c.modules.reduce((s,m)=>s+(m.minutes||0),0);c.exam=c.exam||{size:30,pass:75,bank:[]};return c}
if(typeof CERT_RIGPASS!=='undefined')COURSES.push(prepCourse(CERT_RIGPASS));
if(typeof CERT_DIT!=='undefined')CERT_DIT.forEach(c=>COURSES.push(prepCourse(c)));
const courseById=id=>COURSES.find(c=>c.id===id);
function examBank(c){const b=c.exam.bank&&c.exam.bank.length?c.exam.bank:c.modules.flatMap(m=>(m.checks||[]).map(k=>({q:k.q,o:k.o,a:k.a,e:k.e,m:m.id})));return b.map((x,i)=>({...x,id:i+1}))}
const examSize=c=>Math.min(c.exam.size,ST.mode==='server'?c.exam.size:examBank(c).length);
function iadcId(c){return c.program==='RigPass'?CFG.provider.iadcRigPassId:((CFG.provider.iadcDitIds||{})[c.id]||'')}
const LEVEL={awareness:'Concientización',intermediate:'Intermedio',advanced:'Avanzado'};
const DIT_DISCLAIMER='Contenido del curso no examinado por la IADC como parte de la acreditación DIT.';
const fmtMin=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return(h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
const fmtH=s=>(s/3600).toFixed(1).replace('.',',')+' h';
const fmtDate=d=>d?new Date(d).toLocaleDateString('es-CO',{year:'numeric',month:'long',day:'numeric'}):'—';
const fmtDT=d=>d?new Date(d).toLocaleString('es-CO',{dateStyle:'medium',timeStyle:'short'}):'—';
const TEXTS={
  quality:`<p><b>Declaración de calidad y política de comentarios.</b> ${'{P}'} se compromete a que este curso se imparta tal como fue acreditado: con el contenido, la duración, la evaluación y los instructores aprobados, y con registros completos y verificables de tu formación.</p>
<ul class="lesson-pts"><li>Tu identidad se verifica al inscribirte, al iniciar el curso y antes del examen final.</li><li>Tu tiempo de dedicación, tus respuestas y tus resultados quedan registrados y se conservan por lo menos cinco años.</li><li>Recibirás tu constancia de inmediato al aprobar, y tus datos se reportan a la IADC para el certificado oficial.</li><li>Si algo del curso, de la plataforma o del trato recibido no te parece correcto, usa <b>Quejas y comentarios</b> en la pantalla de ayuda: respondemos y lo usamos para mejorar.</li><li>También puedes escribir directamente a la IADC sobre la calidad de un curso acreditado: rigpass@iadc.org (RigPass) o DIT@iadc.org (DIT).</li></ul>`,
  privacy:`<p><b>Tratamiento de datos personales.</b> ${'{P}'} recoge tu nombre, documento, contacto, empresa, cargo, fotos de verificación de identidad y los registros de tu formación (tiempos, respuestas, resultados) con estas finalidades: verificar tu identidad, registrar y certificar tu formación, atender quejas y reportar tus resultados a la IADC y, si tú lo autorizas, a tu empleador.</p>
<p>Los datos se guardan de forma segura y se conservan al menos cinco años, como lo exige la acreditación. Puedes conocer, actualizar y rectificar tus datos escribiendo al soporte. Al marcar la casilla autorizas este tratamiento conforme a la Ley 1581 de 2012.</p>`,
  prelude:(c)=>`<p>Este curso es <b>autodirigido</b>: lo haces a tu propio ritmo, módulo por módulo y en el orden establecido. El tiempo estimado para completarlo es de <b>${c.hours} horas</b>${c.program==='RigPass'?' (contenido básico de al menos 6 horas más el módulo de tierra)':''}.</p>
<ul class="lesson-pts"><li>Debes completar cada módulo antes de pasar al siguiente y al examen final. No se pueden saltar ni adelantar explicaciones.</li><li>El reloj solo cuenta el tiempo en que estás activo: si dejas el curso quieto ${CFG.idleMinutes} minutos, se pausa.</li><li>Cada módulo tiene preguntas de repaso: si fallas, el instructor te vuelve a explicar y lo intentas de nuevo.</li><li>El examen final tiene ${examSize(c)} preguntas al azar y se aprueba con ${c.exam.pass} % o más. Tienes ${CFG.maxExamAttempts} intentos.</li><li>Tienes soporte técnico y un instructor disponibles: mira la pantalla de <b>Ayuda</b>.</li></ul>`
};
const tx=k=>TEXTS[k].split('{P}').join(esc(CFG.provider.name));
const FAQ=[
  ['¿Qué necesito para hacer el curso?','Un computador, tableta o celular con internet, o unas gafas Meta Quest. Para verificar tu identidad necesitas una cámara (la del celular sirve). Activa el sonido: el instructor habla.'],
  ['¿Puedo hacer el curso por partes?','Sí. Tu avance y tu tiempo quedan guardados. Al volver, ingresas con tu documento y tu clave, verificas tu identidad y sigues en el módulo donde ibas.'],
  ['¿Por qué el botón de continuar no se activa?','Cada módulo tiene un tiempo mínimo de dedicación y las explicaciones no se pueden saltar. Repasa las lecciones o la práctica 3D hasta completar el tiempo; el reloj está arriba en la pantalla.'],
  ['El reloj se detuvo','Se pausa cuando no hay actividad durante unos minutos o cuando cambias de pestaña. Toca «Sigo aquí» y continúa.'],
  ['No tengo cámara (o estoy en las gafas)','Pide a tu instructor un código de verificación de 6 dígitos. El instructor confirma quién eres y te lo da; el código vale 30 minutos y sirve una sola vez.'],
  ['Perdí el examen','Revisa los temas que te recomienda el resultado y vuelve a presentarlo: las preguntas cambian. Si agotas los intentos, tu instructor revisa tu caso y te habilita de nuevo.'],
  ['¿Dónde está mi certificado?','Al aprobar recibes de inmediato una constancia con código QR para verificarla. El certificado oficial de la IADC se emite desde su base de datos de acreditación con los datos que reporta el proveedor.'],
  ['Olvidé mi clave','Escribe al soporte desde el correo o el celular que registraste. Por seguridad, la clave solo la puede restablecer el administrador.']
];

/* ---------- arranque ---------- */
async function certBoot(){
  const v=new URLSearchParams(location.search).get('verificar');
  if(v){showVerify(v);return}
  try{await ST.init()}catch(e){}
  if(ST.me){linkProfile();openHub()}else if(prof()&&!String(DB.cur).startsWith('acc:'))openHub();else{renderLogin();show('s-login')}
}
function linkProfile(){const id='acc:'+ST.me.id;let p=DB.profiles.find(x=>x.id===id);const role=ROLES.includes(ST.me.cargo)?ST.me.cargo:ROLES[0];
  if(!p){p={id,name:ST.me.full_name,role,mods:{}};DB.profiles.push(p)}p.name=ST.me.full_name;DB.cur=id;save()}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(!g)return;const k=g.dataset.go;
  if(k==='login'){renderLogin();show('s-login')}else if(k==='acc')openAcc();else if(k==='help')openHelp();else if(k==='hub')openHub();else if(k==='admin')openAdmin();else if(k==='logout')logout();
  else if(k.startsWith('course:'))openCourse(courseById(k.slice(7)))});
document.addEventListener('click',e=>{const m=e.target.closest('[data-modal]');if(!m)return;e.preventDefault();const k=m.dataset.modal;
  modal(`<h3>${k==='privacidad'?'Datos personales':'Declaración de calidad'}</h3>${tx(k==='privacidad'?'privacy':'quality')}<div class="row"><button class="btn primary" type="button" data-close>Cerrar</button></div>`)});
async function logout(){CERT.verified={};await ST.signOut();DB.cur=null;save();renderLogin();show('s-login')}

/* ---------- ventana modal ---------- */
let MODALRES=null;
function modal(html){const m=$('#modal');$('#modalBox').innerHTML=html;m.hidden=false;return new Promise(r=>{MODALRES=r})}
function closeModal(v){const m=$('#modal');m.hidden=true;$('#modalBox').innerHTML='';camStop();const r=MODALRES;MODALRES=null;r&&r(v)}
$('#modal').addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal(e.target.closest('[data-close]').dataset.close||null)});

/* ---------- cámara para verificar identidad ---------- */
let CAMST=null;
function camStop(){if(CAMST){CAMST.getTracks().forEach(t=>t.stop());CAMST=null}}
function camWidget(el){
  const st={photo:null};
  el.innerHTML=`<div class="cam" hidden><video playsinline muted></video></div><img alt="Foto tomada" hidden style="max-width:240px;border-radius:8px;display:block">
    <div class="row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn sm" type="button" data-c="on">Activar cámara</button><button class="btn sm primary" type="button" data-c="snap" hidden>Tomar foto</button><button class="btn sm ghost" type="button" data-c="again" hidden>Repetir</button>
    <label class="btn sm ghost" style="cursor:pointer">Subir foto<input type="file" accept="image/*" capture="user" hidden></label></div><div class="muted" style="font-size:13px" data-c="msg"></div>`;
  const vid=el.querySelector('video'),box=el.querySelector('.cam'),img=el.querySelector('img'),msg=el.querySelector('[data-c=msg]');
  const B=k=>el.querySelector(`[data-c=${k}]`);
  const take=src=>{const c=document.createElement('canvas');const w=320,h=240;c.width=w;c.height=h;const g=c.getContext('2d');const sw=src.videoWidth||src.naturalWidth,sh=src.videoHeight||src.naturalHeight;const s=Math.max(w/sw,h/sh);g.drawImage(src,(w-sw*s)/2,(h-sh*s)/2,sw*s,sh*s);st.photo=c.toDataURL('image/jpeg',.72);img.src=st.photo;img.hidden=false;box.hidden=true;camStop();B('snap').hidden=true;B('again').hidden=false;B('on').hidden=true};
  B('on').onclick=async()=>{msg.textContent='';try{camStop();CAMST=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:640,height:480},audio:false});vid.srcObject=CAMST;await vid.play();box.hidden=false;img.hidden=true;B('snap').hidden=false;B('on').hidden=true}catch(e){msg.textContent='No se pudo usar la cámara. Usa «Subir foto» o pide un código a tu instructor.'}};
  B('snap').onclick=()=>take(vid);
  B('again').onclick=()=>{st.photo=null;img.hidden=true;B('again').hidden=true;B('on').hidden=false;B('on').click()};
  el.querySelector('input[type=file]').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>take(im);im.src=URL.createObjectURL(f)};
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){B('on').hidden=true;msg.textContent='Este dispositivo no permite usar la cámara aquí. Sube una foto o pide un código a tu instructor.'}
  return st}

/* ---------- cuenta: ingresar y crear ---------- */
function openAcc(tab){show('s-acc');$('#upRole').innerHTML=ROLES.map(r=>`<option>${r}</option>`).join('');
  $('#accMode').innerHTML=ST.mode==='local'?`<div class="badge-local"><b>Modo local de demostración.</b> Las cuentas y los registros se guardan solo en este dispositivo y el examen se califica aquí mismo. Para certificar ante la IADC hay que conectar el servidor de registros (ver server/LEEME.md).</div>`:'';
  accTab(tab||'in')}
function accTab(k){document.querySelectorAll('[data-acc]').forEach(b=>b.classList.toggle('on',b.dataset.acc===k));$('#fIn').hidden=k!=='in';$('#fUp').hidden=k!=='up';
  if(k==='up'&&!$('#upCam').dataset.ready){$('#upCam').dataset.ready=1;CERT.upCam=camWidget($('#upCam'))}}
document.querySelectorAll('[data-acc]').forEach(b=>b.addEventListener('click',()=>accTab(b.dataset.acc)));
$('#fIn').addEventListener('submit',async e=>{e.preventDefault();const er=$('#inErr');er.textContent='';const bt=e.submitter||e.target.querySelector('button[type=submit]');bt.disabled=true;
  try{await ST.signIn($('#inId').value,$('#inPw').value);$('#inPw').value='';linkProfile();openHub()}catch(x){er.textContent=x.message}bt.disabled=false});
$('#fUp').addEventListener('submit',async e=>{e.preventDefault();const er=$('#upErr');er.textContent='';
  const f={full_name:$('#upName').value.trim().replace(/\s+/g,' '),doc_type:$('#upDocT').value,doc_number:$('#upDoc').value,email:$('#upMail').value.trim(),phone:$('#upTel').value.trim(),company:$('#upCo').value.trim(),cargo:$('#upRole').value,password:$('#upPw').value,photo:CERT.upCam&&CERT.upCam.photo,instructorCode:$('#upInst').value};
  if(f.full_name.split(' ').length<2){er.textContent='Escribe nombres y apellidos completos.';return}
  if(normDoc(f.doc_number).length<5){er.textContent='Revisa el número de documento.';return}
  if(f.password.length<8){er.textContent='La clave debe tener al menos 8 caracteres.';return}
  if(f.password!==$('#upPw2').value){er.textContent='Las claves no coinciden.';return}
  if(!f.photo){er.textContent='Toma o sube una foto de tu cara: es la verificación de identidad de la inscripción.';return}
  const bt=e.submitter||e.target.querySelector('button[type=submit]');bt.disabled=true;
  try{await ST.signUp(f);camStop();linkProfile();toast('Cuenta creada. Bienvenido, '+f.full_name.split(' ')[0]+'.');openHub()}catch(x){er.textContent=x.message}bt.disabled=false});

/* ---------- verificación de identidad (al iniciar y antes del examen) ---------- */
async function verifyIdentity(purpose,c){
  const exam=purpose==='exam';
  const p=modal(`<h3>Verifica tu identidad</h3><p class="muted">${exam?'Antes del examen final confirmamos que eres tú quien lo presenta.':'Antes de iniciar el contenido del curso confirmamos que eres tú.'} Aprendiz: <b>${esc(ST.me.full_name)}</b> · ${esc(ST.me.doc_type)} ${maskDoc(ST.me.doc_number)}</p>
    <div class="form"><label class="fld">Tu clave<input id="vPw" type="password" autocomplete="current-password"></label>
    <div class="tabs"><button type="button" class="on" data-vm="foto">Con foto</button><button type="button" data-vm="code">Con código del instructor</button></div>
    <div id="vFoto"><div id="vCam"></div></div><div id="vCode" hidden><label class="fld">Código de 6 dígitos que te dio el instructor<input id="vK" type="text" inputmode="numeric" maxlength="6"></label></div>
    ${exam?'<label class="check"><input type="checkbox" id="vDecl"><span>Declaro que presentaré el examen yo solo, sin ayuda de otras personas ni materiales de consulta.</span></label>':''}
    <div class="err" id="vErr"></div><div class="row" style="display:flex;gap:8px"><button class="btn primary" type="button" id="vOk">Verificar</button><button class="btn ghost" type="button" data-close="">Cancelar</button></div></div>`);
  const cam=camWidget($('#vCam'));let mode='foto';
  document.querySelectorAll('[data-vm]').forEach(b=>b.onclick=()=>{mode=b.dataset.vm;document.querySelectorAll('[data-vm]').forEach(x=>x.classList.toggle('on',x===b));$('#vFoto').hidden=mode!=='foto';$('#vCode').hidden=mode!=='code';if(mode==='code')camStop()});
  $('#vOk').onclick=async()=>{const er=$('#vErr');er.textContent='';const bt=$('#vOk');
    if(exam&&!$('#vDecl').checked){er.textContent='Marca la declaración para continuar.';return}
    bt.disabled=true;try{
      if(!await ST.checkPassword($('#vPw').value)){er.textContent='La clave no es correcta.';ST.log('id_fail',{purpose,why:'clave'},c&&c.id);bt.disabled=false;return}
      if(mode==='foto'){if(!cam.photo){er.textContent='Toma o sube la foto.';bt.disabled=false;return}await ST.idVerify(purpose,cam.photo,'clave+foto')}
      else{if(!await ST.useCode($('#vK').value,purpose)){er.textContent='El código no es válido o ya venció.';bt.disabled=false;return}}
      if(exam)await ST.log('exam_declaration',{},c&&c.id);
      closeModal(true)}catch(x){er.textContent=x.message;bt.disabled=false}};
  return !!(await p)}

/* ---------- panel principal: tarjetas de los cursos ---------- */
const CERTPROG={};   // avance por curso del aprendiz conectado
async function renderCertHub(){
  let el=$('#certHub');if(!el){el=document.createElement('div');el.id='certHub';$('#modGrid').before(el)}
  if(!ST.me){el.innerHTML=`<section class="sect"><div class="eyebrow"><span>Cursos certificables · IADC RigPass y DIT</span></div><p>Para los cursos que se certifican necesitas una cuenta personal con verificación de identidad.</p><div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary sm" type="button" data-go="acc">Ingresar o crear cuenta</button><button class="btn ghost sm" type="button" data-go="help">Ayuda y soporte</button></div></section>`;return}
  el.innerHTML=`<section class="sect"><div class="eyebrow"><span>Cursos certificables · IADC RigPass y DIT</span><span class="muted">${ST.mode==='local'?'Modo local de demostración':'Registros en el servidor'}</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">${ST.isStaff()?'<button class="btn sm" type="button" data-go="admin">Panel del instructor</button>':''}<button class="btn ghost sm" type="button" data-go="help">Ayuda, soporte y quejas</button><button class="btn ghost sm" type="button" data-go="logout">Cerrar sesión</button></div>
    <div class="mods" id="certCards">${COURSES.map(c=>`<button class="ccard" type="button" data-go="course:${c.id}"><span class="eyebrow">${c.program==='RigPass'?'IADC RigPass · Tierra':'IADC DIT · '+LEVEL[c.level]}</span><h3>${esc(c.title)}</h3><span class="meta"><span>${c.modules.length} módulos</span><span>· ${c.hours} h</span><span>· ${c.validityMonths?'Vigencia '+c.validityMonths+' meses':'Sin vencimiento'}</span></span><span class="bar"><i data-bar="${c.id}" style="width:0"></i></span><span class="muted" style="font-size:13px" data-st="${c.id}">…</span></button>`).join('')}</div></section>`;
  let certs=[];try{certs=await ST.certs()}catch(e){}
  for(const c of COURSES){try{const pr=await ST.progress(c.id);CERTPROG[c.id]=pr;const d=c.modules.filter(m=>pr[m.id]&&pr[m.id].status==='completed').length;const b=document.querySelector(`[data-bar="${c.id}"]`),s=document.querySelector(`[data-st="${c.id}"]`);if(b)b.style.width=(d/c.modules.length*100)+'%';
      const ce=certs.find(x=>x.course===c.id&&!x.revoked);if(s)s.innerHTML=ce?`<span class="chip ok">Aprobado</span> Constancia ${esc(ce.number)}`:d?`${d} de ${c.modules.length} módulos completos`:'Sin iniciar'}catch(e){}}
}

/* ---------- página del curso ---------- */
async function openCourse(c){if(!c)return;if(!ST.me){openAcc();return}
  CERT.course=c;show('s-course');const W=$('#courseWrap');W.innerHTML='<p class="muted">Cargando tu avance…</p>';
  let pr={},atts=[],certs=[];try{[pr,atts,certs]=await Promise.all([ST.progress(c.id),ST.attempts(c.id),ST.certs()])}catch(e){W.innerHTML=`<p class="err">${esc(e.message)}</p><button class="btn" type="button" data-go="hub">Volver</button>`;return}
  CERTPROG[c.id]=pr;const cert=certs.find(x=>x.course===c.id&&!x.revoked);
  const started=!!(pr._aviso&&pr._aviso.status==='completed');
  const done=m=>pr[m.id]&&pr[m.id].status==='completed';const nextIdx=c.modules.findIndex(m=>!done(m));
  const secs=c.modules.reduce((s,m)=>s+((pr[m.id]&&pr[m.id].active_seconds)||0),0);
  const used=atts.filter(a=>a.submitted_at&&!a.reset).length,best=atts.reduce((b,a)=>Math.max(b,a.score||0),0);
  const allDone=nextIdx<0;
  W.innerHTML=`<button class="btn ghost sm" type="button" data-go="hub">← Panel principal</button>
   <div class="eyebrow" style="margin-top:16px">${c.program==='RigPass'?'IADC RigPass · Orientación HSE · Endoso de tierra':'IADC DIT · Drilling Industry Training'}</div>
   <h1 style="font-size:clamp(30px,5vw,50px);text-transform:uppercase;margin-top:6px">${esc(c.title)}</h1>
   <p class="muted" style="max-width:75ch">${esc(c.description||'')}</p>
   ${ST.mode==='local'?'<div class="badge-local"><b>Modo local de demostración.</b> Este avance no es válido para certificación: los registros están solo en este dispositivo.</div>':''}
   <div class="grid2" style="margin-top:12px"><dl class="kv card" style="margin:0"><dt>Nivel</dt><dd>${LEVEL[c.level]||c.level}</dd><dt>Duración</dt><dd>${c.hours} horas (${c.modules.length} módulos)</dd><dt>Dirigido a</dt><dd>${esc(c.audience||'')}</dd><dt>Idioma</dt><dd>Español</dd><dt>Vigencia</dt><dd>${c.validityMonths?c.validityMonths+' meses':'No vence'}</dd><dt>Programa IADC</dt><dd>${esc(iadcId(c)||'Número por asignar')}</dd></dl>
   <dl class="kv card" style="margin:0"><dt>Tu tiempo activo</dt><dd class="mono">${fmtH(secs)} de ${c.hours} h</dd><dt>Módulos</dt><dd>${c.modules.filter(done).length} de ${c.modules.length}</dd><dt>Examen</dt><dd>${cert?'Aprobado ('+cert.score+' %)':used?`${used} de ${CFG.maxExamAttempts} intentos · mejor ${best} %`:allDone?'Disponible':'Se habilita al completar los módulos'}</dd><dt>Constancia</dt><dd>${cert?esc(cert.number):'—'}</dd></dl></div>
   ${c.program==='DIT'?`<p class="note">${DIT_DISCLAIMER}</p>`:''}
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">${cert?`<button class="btn primary" type="button" id="cCert">Ver mi constancia</button>`:allDone?`<button class="btn primary" type="button" id="cExam">Presentar el examen final</button>`:`<button class="btn primary" type="button" id="cGo">${started&&nextIdx>0?'Continuar':'Comenzar'}: módulo ${nextIdx+1}</button>`}<button class="btn ghost" type="button" data-go="help">Ayuda y quejas</button><button class="btn ghost" type="button" data-modal="calidad">Declaración de calidad</button></div>
   <div class="cmods">${c.modules.map((m,i)=>{const r=pr[m.id]||{};const st=done(m)?'done':i===nextIdx?'next':i>nextIdx&&nextIdx>=0?'lock':'';return `<button class="cmod ${st}" type="button" data-cm="${i}" ${st==='lock'?'aria-disabled="true"':''}><span class="n">${String(i+1).padStart(2,'0')}</span><span><b>${esc(m.title)}${m.endorsement?' <span class="chip">Tierra</span>':''}</b><small>${m.activity?'Incluye práctica 3D · ':''}${m.minutes} min mínimos · ${m.lessons.length} lecciones · ${m.checks.length} preguntas de repaso</small></span><span class="mono muted" style="font-size:13px">${st==='done'?'✓ '+fmtMin(r.active_seconds||0):st==='lock'?'🔒':r.active_seconds?fmtMin(r.active_seconds):''}</span></button>`}).join('')}</div>`;
  const go=async i=>{const m=c.modules[i];if(!m)return;
    if(i>nextIdx&&nextIdx>=0){toast('Primero completa el módulo '+(nextIdx+1)+'.');return}
    if(!started){const ok=await prelude(c);if(!ok)return;CERTPROG[c.id]._aviso={status:'completed'}}
    if(!CERT.verified[c.id]){if(!await verifyIdentity('start',c))return;CERT.verified[c.id]=true}
    runModule(c,i)};
  const gb=$('#cGo');if(gb)gb.onclick=()=>go(nextIdx);
  const eb=$('#cExam');if(eb)eb.onclick=()=>startExam(c);
  const cb=$('#cCert');if(cb)cb.onclick=()=>showCert(cert,c);
  W.querySelectorAll('[data-cm]').forEach(b=>b.onclick=()=>go(+b.dataset.cm));
  // dentro de las gafas la página del curso no se ve: menú flotante para seguir o salir
  if(renderer&&renderer.xr.isPresenting&&!MODE.ar){newCtx();MODE={};resetScene();certStage();
    setSub(allDone?'Completaste todos los módulos. Quítate las gafas para presentar el examen final en la pantalla.':`Vas en el módulo ${nextIdx+1} de ${c.modules.length}.`);
    run(async()=>{const v=await ask(head('Curso',esc(c.title)),(!allDone&&started&&CERT.verified[c.id]?[{t:`Continuar: módulo ${nextIdx+1}`,v:'go'}]:[]).concat([{t:'Salir de la realidad virtual',v:'exit'}]));
      if(v==='go')go(nextIdx);else{try{renderer.xr.getSession().end()}catch(e){}}})}
}
async function prelude(c){
  const p=modal(`<h3>Antes de empezar</h3>${TEXTS.prelude(c)}<hr style="border:0;border-top:1px solid var(--line);margin:14px 0">${tx('quality')}
   ${c.program==='DIT'?`<p class="note">${DIT_DISCLAIMER}</p>`:''}
   <label class="check" style="margin-top:12px"><input type="checkbox" id="pOk"><span>Leí el aviso y la declaración de calidad, y entiendo cómo funciona el curso.</span></label>
   <div class="row" style="display:flex;gap:8px;margin-top:12px"><button class="btn primary" type="button" id="pGo">Aceptar y continuar</button><button class="btn ghost" type="button" data-close="">Cancelar</button></div>`);
  $('#pGo').onclick=async()=>{if(!$('#pOk').checked){toast('Marca la casilla para continuar.');return}
    await ST.log('disclaimer',{hours:c.hours,quality_statement:true},c.id);await ST.saveProgress(c.id,'_aviso',{status:'completed',completed_at:new Date().toISOString()});closeModal(true)};
  return !!(await p)}

/* ---------- reloj de dedicación con pausa por inactividad ---------- */
const CERT={course:null,mod:null,idx:0,active:0,base:0,last:Date.now(),idle:false,verified:{},tick:null,act:null,saveT:0,camQ:null};
function userActive(){CERT.last=Date.now()}
['pointerdown','keydown','wheel','touchstart'].forEach(ev=>addEventListener(ev,userActive,{passive:true,capture:true}));
function clockStart(c,m,base){CERT.base=base||0;CERT.active=0;CERT.last=Date.now();CERT.lastTick=Date.now();CERT.idle=false;clearInterval(CERT.tick);
  ST.log('module_start',{seconds_before:CERT.base},c.id,m.id);
  CERT.tick=setInterval(()=>clockTick(c,m),1000);clockShow(c,m)}
function clockTick(c,m){
  // en las gafas también cuenta como actividad mover la cabeza
  if(renderer&&renderer.xr.isPresenting){const q=camera.getWorldQuaternion(new THREE.Quaternion());if(CERT.camQ&&q.angleTo(CERT.camQ)>.02)userActive();CERT.camQ=q}
  const idle=Date.now()-CERT.last>CFG.idleMinutes*60e3;
  if(document.hidden){CERT.lastTick=Date.now();clockShow(c,m,'pausa');return}
  if(idle&&!CERT.idle){CERT.idle=true;ST.log('idle_pause',{},c.id,m.id);stopSay();
    if(renderer.xr.isPresenting){setSub('El reloj está en pausa por inactividad. Aprieta el gatillo para seguir.')}
    modal(`<h3>¿Sigues ahí?</h3><p>El reloj de dedicación se pausó porque no hubo actividad durante ${CFG.idleMinutes} minutos. Solo cuenta el tiempo en que estás trabajando en el curso.</p><button class="btn primary" type="button" data-close="1">Sigo aquí</button>`).then(()=>{CERT.idle=false;userActive();ST.log('idle_resume',{},c.id,m.id)})}
  if(CERT.idle&&!idle&&renderer.xr.isPresenting){CERT.idle=false;closeModal(1)}
  const now=Date.now(),dt=Math.min(5,(now-(CERT.lastTick||now))/1000);CERT.lastTick=now;
  if(!CERT.idle&&!idle)CERT.active+=dt;
  clockShow(c,m,CERT.idle?'pausa':'');
  if(++CERT.saveT>=30){CERT.saveT=0;clockSave(c,m)}}
function clockSave(c,m,extra){return ST.saveProgress(c.id,m.id,{active_seconds:Math.round(CERT.base+CERT.active),...(extra||{})}).catch(()=>{})}
function clockShow(c,m,state){const el=$('#certClock');if(!el)return;const need=m.minutes*60,have=CERT.base+CERT.active;el.hidden=false;el.classList.toggle('ok',have>=need);
  el.innerHTML=`Módulo ${CERT.idx+1} de ${c.modules.length} · ${state==='pausa'?'⏸ ':''}dedicación <b>${fmtMin(Math.min(have,need))}</b> de ${fmtMin(need)}`;
  if(renderer&&renderer.xr.isPresenting)task(`Módulo ${CERT.idx+1}/${c.modules.length} · ${fmtMin(Math.min(have,need))} de ${fmtMin(need)}`)}
async function clockStop(){if(!CERT.mod)return;clearInterval(CERT.tick);CERT.tick=null;const c=CERT.course,m=CERT.mod;await clockSave(c,m);ST.log('module_leave',{seconds:Math.round(CERT.active),total:Math.round(CERT.base+CERT.active)},c.id,m.id);$('#certClock').hidden=true}

/* ---------- módulo: lecciones narradas, práctica 3D, preguntas de repaso con remediación ---------- */
function certStage(){const me=V(-12.6,0,13.8),ins=V(-10.8,0,11.9);insAt(ins);RIG.ins.face=null;teleport(me,V(ins.x,1.55,ins.z));$('#cams').hidden=true}
function lessonHTML(c,m,i,more){const L=m.lessons[i];return head(`Módulo ${CERT.idx+1} · Lección ${i+1} de ${m.lessons.length}`,esc(L.t),`<ul class="lesson-pts">${L.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>${more||''}`)}
async function runModule(c,i,phase){
  const m=c.modules[i];CERT.course=c;CERT.mod=m;CERT.idx=i;
  show('s-mod');$('#s-mod').classList.add('certmode');$('#modTitle').textContent=`${c.program==='RigPass'?'RigPass':'DIT'} · ${m.title}`;
  initEngine();resize();if(!RIG.home)saveHome();newCtx();MODE={id:'cert'};resetScene();panel('');certStage();
  if(!phase){const pr=(CERTPROG[c.id]||{})[m.id]||{};clockStart(c,m,pr.active_seconds||0);await ST.saveProgress(c.id,m.id,{status:pr.status||'started',active_seconds:pr.active_seconds||0}).catch(()=>{})}
  run(async()=>{
    if(!phase||phase==='lessons'){
      if(!phase){panel(head(`Módulo ${i+1} de ${c.modules.length}`,esc(m.title),`<p><b>Al terminar este módulo podrás:</b></p><ul class="lesson-pts">${m.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`),{open:true});
        await sayW(`Módulo ${i+1}: ${m.title}. Al terminar podrás: ${m.objectives.join('; ')}.`);await ask(head(`Módulo ${i+1}`,esc(m.title),`<ul class="lesson-pts">${m.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`),[{t:'Comenzar las lecciones',v:'n'}])}
      for(let k=0;k<m.lessons.length;k++){
        panel(lessonHTML(c,m,k),{open:true});await sayW(m.lessons[k].say);
        for(;;){const v=await ask(lessonHTML(c,m,k),[{t:k<m.lessons.length-1?'Siguiente lección':'Continuar',v:'n'},{t:'Repetir la explicación',v:'r'}]);if(v==='n')break;panel(lessonHTML(c,m,k),{open:true});await sayW(m.lessons[k].say)}}
      await ST.log('lessons_done',{},c.id,m.id)}
    if(phase==='checks_done'){await sayW('Sigamos con el módulo.');await checksAndFinish(c,i,true);return}
    if(m.activity&&(!phase||phase==='lessons'||phase==='activity')){await runActivity(c,i);return}
    await checksAndFinish(c,i)});
}
async function runActivity(c,i){const m=c.modules[i];
  await ask(head(`Módulo ${i+1} · Práctica 3D`,esc(m.activity.label),`<p>Ahora lo practicas en primera persona. La práctica se aprueba con ${PASS} puntos o más; si no, la repites.</p>`),[{t:'Comenzar la práctica',v:'go'}]);
  CERT.act=async(score)=>{await ST.log('activity',{mod:m.activity.mod,score,passed:score>=PASS},c.id,m.id);await clockSave(c,m,{activity_score:score});
    if(score<PASS){toast(`Obtuviste ${score}. Necesitas ${PASS}: repite la práctica.`);setTimeout(()=>runModule(c,i,'activity'),400)}else runModule(c,i,'checks')};
  openModule(m.activity.mod,{noIntro:true,cert:true});$('#s-mod').classList.add('certmode');$('#modTitle').textContent=`Práctica 3D · ${m.activity.label}`}
async function checksAndFinish(c,i,skipChecks){const m=c.modules[i];let ok=0,bad=0;
  for(let k=0;k<(skipChecks?0:m.checks.length);k++){const q=m.checks[k];
    for(let tries=0;;tries++){const ord=[0,1,2,3].sort(()=>Math.random()-.5);
      say(q.q);const v=await ask(head(`Repaso · pregunta ${k+1} de ${m.checks.length}`,esc(q.q)),ord.map(j=>({t:esc(q.o[j]),v:'o'+j})));const j=+v.slice(1),good=j===q.a;
      ST.log('check',{q:k,answer:j,correct:good,try:tries+1},c.id,m.id);
      if(good){ok++;say('Correcto. '+q.e);await ask(head(`Repaso · pregunta ${k+1}`,esc(q.q),`<div class="fb ok"><b>Correcto.</b> ${esc(q.e)}</div>`),[{t:'Continuar',v:'n'}]);break}
      bad++;const L=m.lessons[q.ref]||m.lessons[0];
      // remediación: el instructor vuelve a explicar la lección relacionada y se intenta otra vez
      panel(head('Repasemos',esc(L.t),`<div class="fb bad">Esa no es la respuesta. Vuelve a escuchar la explicación y lo intentas de nuevo.</div><ul class="lesson-pts">${L.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`),{open:true});
      await sayW('Repasemos. '+L.say);await ask(head('Repasemos',esc(L.t),`<ul class="lesson-pts">${L.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`),[{t:'Intentar de nuevo',v:'n'}])}}
  if(!skipChecks)await clockSave(c,m,{checks_ok:ok,checks_wrong:bad});
  // tiempo mínimo de dedicación
  while(CFG.enforceSeatTime&&CERT.base+CERT.active<m.minutes*60){const left=m.minutes*60-(CERT.base+CERT.active);
    const v=await ask(head('Dedicación mínima',`Te faltan ${Math.ceil(left/60)} min en este módulo`,`<p>Este módulo pide al menos <b>${m.minutes} minutos</b> de estudio activo. Aprovecha para repasar:</p>`),[{t:'Repasar las lecciones con el instructor',v:'l'}].concat(m.activity?[{t:'Repetir la práctica 3D',v:'a'}]:[],[{t:'Ver los objetivos y puntos clave',v:'p'}]));
    if(v==='a'){CERT.act=async(score)=>{await ST.log('activity',{mod:m.activity.mod,score,repeat:true},c.id,m.id);runModule(c,i,'checks_done')};openModule(m.activity.mod,{noIntro:true,cert:true});$('#s-mod').classList.add('certmode');return}
    if(v==='l'){for(let k=0;k<m.lessons.length;k++){panel(lessonHTML(c,m,k),{open:true});await sayW(m.lessons[k].say)}}
    if(v==='p'){await ask(head('Puntos clave',esc(m.title),`<p><b>Objetivos</b></p><ul class="lesson-pts">${m.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`+m.lessons.map(L=>`<p style="margin:10px 0 2px"><b>${esc(L.t)}</b></p><ul class="lesson-pts">${L.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`).join('')),[{t:'Listo',v:'n'}])}}
  await finishModule(c,i)}
async function finishModule(c,i){const m=c.modules[i];clearInterval(CERT.tick);CERT.tick=null;
  await clockSave(c,m,{status:'completed',completed_at:new Date().toISOString()});await ST.log('module_complete',{seconds:Math.round(CERT.base+CERT.active)},c.id,m.id);
  CERTPROG[c.id]=await ST.progress(c.id).catch(()=>CERTPROG[c.id]);$('#certClock').hidden=true;CERT.mod=null;
  SCORM.progress(c.id,c.modules.filter(x=>(CERTPROG[c.id][x.id]||{}).status==='completed').length,c.modules.length);
  say(`Completaste el módulo ${i+1}. Buen trabajo.`);const last=i>=c.modules.length-1;
  const v=await ask(head('Módulo completo',esc(m.title),`<div class="fb ok">Completaste el módulo ${i+1} de ${c.modules.length}.</div>`),last?[{t:'Ir al examen final',v:'x'}]:[{t:'Siguiente módulo',v:'n'},{t:'Volver al curso',v:'c'}]);
  if(v==='n')runModule(c,i+1);else{certLeave(true);if(v==='x')startExam(c)}}
async function certLeave(silent){if(CERT.mod)await clockStop();CERT.mod=null;CERT.act=null;$('#s-mod').classList.remove('certmode');newCtx();MODE={};if(RIG.home)resetScene();if(CERT.course)openCourse(CERT.course);else openHub()}

/* ---------- examen final ---------- */
async function startExam(c){
  if(!await verifyIdentity('exam',c))return;
  show('s-exam');const W=$('#examWrap');W.innerHTML='<p class="muted">Preparando tu examen…</p>';
  let ex;try{ex=await ST.startExam(c)}catch(e){W.innerHTML=`<p class="err">${esc(e.message)}</p><button class="btn" type="button" data-go="course:${c.id}">Volver al curso</button>`;return}
  const key='examdraft_'+c.id+'_'+ex.attempt;const ans=LS.get(key,{});let cur=0;const t0=new Date(ex.started_at).getTime();
  const draw=()=>{const q=ex.questions[cur];const n=Object.keys(ans).length;
    W.innerHTML=`<div class="eyebrow">Examen final · ${esc(c.title)}</div><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:6px 0"><b>Pregunta ${cur+1} de ${ex.questions.length}</b><span class="muted mono" id="exT"></span></div>
     <p class="exam-q">${esc(q.q)}</p><div class="exam-o">${q.o.map((o,j)=>`<button type="button" data-a="${j}" class="${ans[q.id]===j?'on':''}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join('')}</div>
     <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><button class="btn" type="button" id="exP" ${cur?'':'disabled'}>← Anterior</button><button class="btn" type="button" id="exN" ${cur<ex.questions.length-1?'':'disabled'}>Siguiente →</button><button class="btn primary" type="button" id="exS">Entregar examen (${n}/${ex.questions.length} respondidas)</button></div>
     <div class="qnav">${ex.questions.map((x,k)=>`<button type="button" data-q="${k}" class="${ans[x.id]!=null?'ans':''} ${k===cur?'cur':''}">${k+1}</button>`).join('')}</div>
     <p class="note">Mínimo para aprobar: ${ex.pass} %. Tus respuestas se guardan mientras avanzas. Las preguntas salen al azar de un banco y cambian en cada intento.</p>`;
    W.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ans[q.id]=+b.dataset.a;LS.set(key,ans);if(cur<ex.questions.length-1){cur++}draw()});
    W.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{cur=+b.dataset.q;draw()});
    $('#exP').onclick=()=>{cur--;draw()};$('#exN').onclick=()=>{cur++;draw()};$('#exS').onclick=submit};
  const tm=setInterval(()=>{const e=$('#exT');if(!e||$('#s-exam').hidden){clearInterval(tm);return}e.textContent='Tiempo: '+fmtMin((Date.now()-t0)/1000)},1000);
  const submit=async()=>{const miss=ex.questions.length-Object.keys(ans).length;
    const ok=await modal(`<h3>¿Entregar el examen?</h3><p>${miss?`Tienes <b>${miss}</b> preguntas sin responder: cuentan como incorrectas.`:'Respondiste todas las preguntas.'} Después de entregar no puedes cambiar las respuestas.</p><div class="row" style="display:flex;gap:8px"><button class="btn primary" type="button" data-close="1">Entregar</button><button class="btn ghost" type="button" data-close="">Seguir revisando</button></div>`);
    if(!ok)return;W.innerHTML='<p class="muted">Calificando…</p>';
    let r;try{r=await ST.submitExam(c,ex.attempt,ans)}catch(e){W.innerHTML=`<p class="err">${esc(e.message)}</p><button class="btn" type="button" data-go="course:${c.id}">Volver al curso</button>`;return}
    clearInterval(tm);LS.set(key,null);examResult(c,r)};
  draw()}
async function examResult(c,r){SCORM.score(r.score,r.passed,r.pass);const W=$('#examWrap');const mt=id=>{const m=c.modules.find(x=>x.id===id);return m?m.title:id};
  const weak=Object.entries(r.breakdown||{}).filter(([k,v])=>v.ok<v.total).sort((a,b)=>a[1].ok/a[1].total-b[1].ok/b[1].total);
  let atts=[];try{atts=await ST.attempts(c.id)}catch(e){}const used=atts.filter(a=>a.submitted_at&&!a.reset).length;
  W.innerHTML=`<div class="eyebrow">Resultado del examen final</div><div class="score mono" style="color:var(${r.passed?'--ok':'--bad'})">${r.score} %</div>
   <p><span class="chip ${r.passed?'ok':'bad'}">${r.passed?'Aprobado':'No aprobado'}</span> <span class="muted">${r.ok} de ${r.total} correctas · mínimo ${r.pass} %</span></p>
   ${weak.length?`<h3 style="margin-top:18px;text-transform:uppercase">Temas para repasar</h3><ul class="lesson-pts">${weak.map(([k,v])=>`<li>${esc(mt(k))}: ${v.ok} de ${v.total}</li>`).join('')}</ul>`:''}
   ${(r.feedback||[]).length?`<details style="margin-top:10px"><summary>Retroalimentación de las preguntas que fallaste (${r.feedback.length})</summary>${r.feedback.map(f=>`<div class="fb bad"><b>${esc(f.q)}</b><br>Tu respuesta: ${esc(f.tuya||'sin responder')}<br><span class="muted">${esc(f.e||'')}</span></div>`).join('')}</details>`:''}
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">${r.passed?'<button class="btn primary" type="button" id="erSurvey">Continuar a tu constancia</button>':used<CFG.maxExamAttempts?`<button class="btn primary" type="button" id="erRetry">Presentar de nuevo (intento ${used+1} de ${CFG.maxExamAttempts})</button>`:'<span class="fb info">Agotaste los intentos. Tu instructor revisará tu caso y te habilitará de nuevo.</span>'}<button class="btn ghost" type="button" data-go="course:${c.id}">Volver al curso</button></div>`;
  const s=$('#erSurvey');if(s)s.onclick=async()=>{await survey(c);const cs=await ST.certs();showCert(cs.find(x=>x.course===c.id&&!x.revoked)||r.certificate,c)};
  const rt=$('#erRetry');if(rt)rt.onclick=()=>startExam(c)}
async function survey(c){
  const Q=['El contenido fue claro y fácil de entender','Lo aprendido me sirve para mi trabajo en el taladro','Las prácticas 3D me ayudaron a aprender','La plataforma funcionó bien (sin fallas)','El soporte y el instructor respondieron cuando los necesité'];
  const p=modal(`<h3>Encuesta del curso</h3><p class="muted">Tus respuestas nos ayudan a mejorar el curso. 1 = totalmente en desacuerdo, 5 = totalmente de acuerdo.</p>
   ${Q.map((q,i)=>`<div style="margin:10px 0"><div>${q}</div><div class="tabs" data-sv="${i}">${[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}">${n}</button>`).join('')}</div></div>`).join('')}
   <label class="fld">Comentarios (opcional)<textarea id="svC"></textarea></label><div class="err" id="svE"></div><button class="btn primary" type="button" id="svOk">Enviar</button>`);
  const a={};document.querySelectorAll('[data-sv]').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{a[g.dataset.sv]=+b.dataset.n;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))}));
  $('#svOk').onclick=async()=>{if(Object.keys(a).length<Q.length){$('#svE').textContent='Responde las cinco preguntas.';return}try{await ST.survey(c.id,Q.map((q,i)=>({q,v:a[i]})),$('#svC').value.trim())}catch(e){}closeModal(true)};
  return p}

/* ---------- constancia y verificación ---------- */
function loadQR(){return new Promise(res=>{if(window.QRCode)return res(true);const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=()=>res(true);s.onerror=()=>res(false);document.head.appendChild(s)})}
async function showCert(ce,c){if(!ce){toast('Constancia no encontrada.');return}c=c||courseById(ce.course);show('s-cert');const W=$('#certWrap');const url=CFG.provider.verifyBase+'?verificar='+encodeURIComponent(ce.number);
  const rp=ce.program==='RigPass';
  W.innerHTML=`<div class="noprint" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px"><button class="btn ghost sm" type="button" data-go="${c?'course:'+c.id:'hub'}">← Volver</button><button class="btn primary sm" type="button" onclick="print()">Imprimir o guardar PDF</button></div>
  <div class="diploma"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><div style="font-family:var(--display);letter-spacing:.14em;text-transform:uppercase;color:#b07400;font-weight:700">${esc(ce.provider_name||CFG.provider.name)}</div><h2>Constancia de finalización</h2></div><div style="font-family:var(--display);font-weight:700;font-size:22px;text-align:right">${rp?'IADC RigPass®':'IADC DIT'}</div></div>
   <p style="margin:14px 0 0">Se hace constar que</p><div class="who">${esc(ce.full_name)}</div><div style="color:#5b6670">Documento ${esc(ce.doc_masked||'')}</div>
   <p style="margin:12px 0 0">completó y aprobó el curso <b>${esc(ce.title||(c&&c.title)||'')}</b>${rp?' con endoso de <b>tierra (land)</b>':''}.</p>
   <div class="row2"><dl><dt>Fecha de finalización</dt><dd>${fmtDate(ce.issued_at)}</dd><dt>Vigencia</dt><dd>${ce.expires_at?'Hasta el '+fmtDate(ce.expires_at):'No vence'}</dd><dt>Nota del examen</dt><dd>${ce.score} %</dd><dt>Instructor</dt><dd>${esc(ce.instructor_name||'')}</dd><dt>Proveedor</dt><dd>${esc(ce.provider_name||CFG.provider.name)}</dd><dt>N.º de programa IADC</dt><dd>${esc(ce.iadc_program_id||'Por asignar')}</dd>${rp?'<dt>Endoso</dt><dd>Tierra (Land)</dd>':''}<dt>N.º de constancia</dt><dd class="mono">${esc(ce.number)}</dd></dl><div id="qrBox" title="Verificar"></div></div>
   <div class="fine">${rp?'Esta constancia la emite el proveedor de formación. El certificado y la tarjeta oficiales IADC RigPass se emiten electrónicamente desde la base de datos de acreditación de la IADC y se verifican en iadc.org.':'El certificado de finalización DIT oficial se emite desde la base de datos de acreditación de la IADC. '+DIT_DISCLAIMER} Verifica esta constancia escaneando el código QR o en ${esc(url)}</div></div>`;
  if(await loadQR()){try{new QRCode($('#qrBox'),{text:url,width:120,height:120,correctLevel:QRCode.CorrectLevel.M})}catch(e){}}}
async function showVerify(n){show('s-cert');const W=$('#certWrap');W.innerHTML='<p class="muted">Verificando…</p>';let r;try{r=await ST.verifyCert(n)}catch(e){r={error:e.message}}
  W.innerHTML=`<div style="max-width:620px;margin:0 auto"><div class="eyebrow">${esc(CFG.provider.name)} · Verificación de constancias</div><h1 style="font-size:40px;text-transform:uppercase;margin:8px 0">${r&&r.full_name?(r.valid?'Constancia válida':'Constancia no vigente'):'Constancia no encontrada'}</h1>
   ${r&&r.full_name?`<dl class="kv card"><dt>Número</dt><dd class="mono">${esc(r.number)}</dd><dt>Nombre</dt><dd>${esc(r.full_name)}</dd><dt>Documento</dt><dd>${esc(r.doc_masked||'')}</dd><dt>Curso</dt><dd>${esc(r.title||'')}</dd><dt>Programa</dt><dd>${esc(r.program||'')}${r.endorsement?' · '+esc(r.endorsement):''}</dd><dt>Fecha</dt><dd>${fmtDate(r.issued_at)}</dd><dt>Vigencia</dt><dd>${r.expires_at?'Hasta el '+fmtDate(r.expires_at):'No vence'}</dd><dt>Estado</dt><dd><span class="chip ${r.valid?'ok':'bad'}">${r.valid?'Válida':r.revoked?'Anulada':'Vencida'}</span></dd></dl>`:`<p class="muted">${esc(r&&r.error||'No existe una constancia con el número '+n+'.')}</p>`}
   <p class="note">Los certificados oficiales de la IADC se verifican en iadc.org. Esta página verifica las constancias que emite ${esc(CFG.provider.name)}.</p><a class="btn" href="${location.pathname}">Ir a la Escuela de Perforación</a></div>`}

/* ---------- ayuda, soporte y quejas ---------- */
async function openHelp(){show('s-help');const W=$('#helpWrap');const s=CFG.support;const contact=(o)=>[o.email&&`Correo: <a href="mailto:${esc(o.email)}">${esc(o.email)}</a>`,o.phone&&`Teléfono: <a href="tel:${esc(o.phone)}">${esc(o.phone)}</a>`,o.whatsapp&&`WhatsApp: ${esc(o.whatsapp)}`].filter(Boolean).join(' · ')||'<span class="muted">Datos de contacto por definir</span>';
  W.innerHTML=`<button class="btn ghost sm" type="button" data-go="${ST.me?'hub':'login'}">← Volver</button><h1 style="font-size:clamp(34px,6vw,54px);text-transform:uppercase;margin-top:14px">Ayuda y soporte</h1>
   <div class="grid2" style="margin-top:12px"><div class="card"><div class="eyebrow">Soporte técnico en vivo</div><p style="margin:6px 0">${esc(s.hours)}</p><p style="margin:6px 0">${contact(s)}</p><p class="muted" style="font-size:13px;margin:0">${esc(s.reply)}</p></div>
   <div class="card"><div class="eyebrow">Instructores</div>${CFG.instructors.map(i=>`<p style="margin:6px 0"><b>${esc(i.name)}</b><br><span class="muted">${esc(i.hours||'')}</span><br>${contact(i)}</p>`).join('')}</div></div>
   <h2 style="margin-top:26px;text-transform:uppercase">Preguntas frecuentes</h2>${FAQ.map(([q,a])=>`<details class="card" style="margin-top:8px"><summary><b>${esc(q)}</b></summary><p style="margin:8px 0 0">${esc(a)}</p></details>`).join('')}
   <h2 style="margin-top:26px;text-transform:uppercase">Quejas y comentarios</h2>
   ${ST.me?`<form class="card form" id="cmpF"><label class="fld">Curso<select id="cmpC"><option value="">General / plataforma</option>${COURSES.map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join('')}</select></label><label class="fld">Cuéntanos qué pasó o qué se puede mejorar<textarea id="cmpT" required></textarea></label><button class="btn primary" type="submit">Enviar</button></form><div id="cmpL"></div>`:'<p class="muted">Ingresa con tu cuenta para enviar una queja o comentario y ver la respuesta.</p>'}
   <div class="card" style="margin-top:20px">${tx('quality')}</div><div class="card" style="margin-top:12px">${tx('privacy')}</div>`;
  if(ST.me){const L=async()=>{try{const cs=await ST.myComplaints();$('#cmpL').innerHTML=cs.length?`<div class="list">${cs.map(x=>`<div class="card"><div class="muted" style="font-size:13px">${fmtDT(x.created_at)} · <span class="chip ${x.status==='cerrada'?'ok':'warn'}">${esc(x.status)}</span></div><p style="margin:6px 0">${esc(x.text)}</p>${x.response?`<div class="fb info"><b>Respuesta:</b> ${esc(x.response)}</div>`:''}</div>`).join('')}</div>`:''}catch(e){}};L();
    $('#cmpF').onsubmit=async e=>{e.preventDefault();const t=$('#cmpT').value.trim();if(!t)return;try{await ST.complaint($('#cmpC').value,t);$('#cmpT').value='';toast('Recibimos tu mensaje. Te responderemos aquí mismo.');L()}catch(x){toast(x.message)}}}}

/* ---------- panel del instructor ---------- */
let ADM={tab:'tr',data:null};
async function openAdmin(tab){if(!ST.isStaff()){toast('Solo para instructores.');return}show('s-admin');ADM.tab=tab||ADM.tab;const W=$('#adminWrap');W.innerHTML='<p class="muted">Cargando registros…</p>';
  try{ADM.data=await ST.staffAll()}catch(e){W.innerHTML=`<p class="err">${esc(e.message)}</p>`;return}renderAdmin()}
function stuStats(D,u,c){const pr=D.pr.filter(p=>p.user_id===u.id&&p.course===c.id);const done=c.modules.filter(m=>pr.some(p=>p.module===m.id&&p.status==='completed')).length;const secs=pr.reduce((s,p)=>s+(p.module==='_aviso'?0:p.active_seconds||0),0);
  const at=D.at.filter(a=>a.user_id===u.id&&a.course===c.id);const best=at.reduce((b,a)=>Math.max(b,a.score||0),0);const ce=D.ce.find(x=>x.user_id===u.id&&x.course===c.id&&!x.revoked);
  const first=pr.map(p=>p.started_at).filter(Boolean).sort()[0];return{pr,done,secs,at,best,ce,first,started:pr.length>0}}
function renderAdmin(){const W=$('#adminWrap'),D=ADM.data;const T=ADM.tab;
  const tabs=[['tr','Aprendices'],['cp','Quejas'],['sv','Encuestas'],['co','Cursos y servidor'],['ex','Exportar registros']];
  let body='';
  if(T==='tr'){body=`<div class="tblwrap"><table class="tbl"><thead><tr><th>Aprendiz</th><th>Documento</th><th>Cargo / empresa</th><th>Inscripción</th>${COURSES.map(c=>`<th>${esc(c.code||c.id)}</th>`).join('')}</tr></thead><tbody>${D.tr.filter(u=>u.role==='student').map(u=>`<tr><td><button class="btn ghost sm" type="button" data-stu="${u.id}">${esc(u.full_name)}</button></td><td>${esc(u.doc_type)} ${esc(u.doc_number)}</td><td>${esc(u.cargo||'')}<br><span class="muted">${esc(u.company||'')}</span></td><td>${fmtDate(u.created_at||u.consent_at)}</td>${COURSES.map(c=>{const s=stuStats(D,u,c);return `<td>${!s.started?'<span class="muted">—</span>':`${s.done}/${c.modules.length} · ${fmtH(s.secs)}<br>${s.ce?`<span class="chip ok">${s.ce.score} %</span>`:s.at.length?`<span class="chip warn">${s.best} %</span>`:''}`}</td>`}).join('')}</tr>`).join('')||`<tr><td colspan="${4+COURSES.length}" class="muted">Sin aprendices registrados.</td></tr>`}</tbody></table></div>`}
  if(T==='cp')body=D.cp.length?D.cp.map(x=>{const u=D.tr.find(t=>t.id===x.user_id)||{};return `<div class="card" style="margin-bottom:10px"><div class="muted" style="font-size:13px">${fmtDT(x.created_at)} · ${esc(u.full_name||'')} · ${esc((courseById(x.course)||{}).title||'General')}</div><p>${esc(x.text)}</p><div class="grid2"><label class="fld">Estado<select data-cps="${x.id}">${['abierta','en revisión','cerrada'].map(s=>`<option ${s===x.status?'selected':''}>${s}</option>`).join('')}</select></label><label class="fld">Respuesta<textarea data-cpr="${x.id}">${esc(x.response||'')}</textarea></label></div><button class="btn sm" type="button" data-cpsave="${x.id}">Guardar respuesta</button></div>`}).join(''):'<p class="muted">No hay quejas ni comentarios.</p>';
  if(T==='sv')body=COURSES.map(c=>{const ss=D.sv.filter(s=>s.course===c.id);if(!ss.length)return `<div class="card" style="margin-bottom:10px"><b>${esc(c.title)}</b><p class="muted">Sin encuestas.</p></div>`;const qs=ss[0].answers.map(a=>a.q);return `<div class="card" style="margin-bottom:10px"><b>${esc(c.title)}</b> <span class="muted">· ${ss.length} encuestas</span><ul class="lesson-pts">${qs.map((q,i)=>`<li>${esc(q)}: <b>${(ss.reduce((s,x)=>s+(x.answers[i]?x.answers[i].v:0),0)/ss.length).toFixed(1)}</b> / 5</li>`).join('')}</ul>${ss.filter(s=>s.comment).map(s=>`<div class="fb info">${esc(s.comment)}</div>`).join('')}</div>`}).join('');
  if(T==='co')body=`${ST.mode==='local'?'<div class="badge-local">Modo local: no hay servidor configurado. Configure <b>CFG.server</b> en src/config.js (ver server/LEEME.md).</div>':''}
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Curso</th><th>Programa</th><th>Nivel</th><th>Horas</th><th>Módulos</th><th>Examen</th><th>Banco en la app</th><th>N.º IADC</th></tr></thead><tbody>${COURSES.map(c=>`<tr><td>${esc(c.title)}</td><td>${c.program}</td><td>${LEVEL[c.level]}</td><td>${c.hours} (${c.totalMin} min)</td><td>${c.modules.length}</td><td>${c.exam.size} preg. · ${c.exam.pass} %</td><td>${c.exam.bank&&c.exam.bank.length?c.exam.bank.length:'No (se sube aparte)'}</td><td>${esc(iadcId(c)||'por asignar')}</td></tr>`).join('')}</tbody></table></div>
    ${ST.mode==='server'?`<div class="card" style="margin-top:14px"><b>Publicar los cursos y sus bancos de preguntas en el servidor</b><p class="muted" style="font-size:14px">Los bancos del examen final no se publican en la app (sería ver las respuestas). Selecciona los archivos <span class="mono">banco_*.json</span> que se entregan aparte. Al publicar se reemplaza el banco activo del curso.</p><input type="file" id="bkF" accept=".json" multiple><div style="margin-top:8px"><button class="btn primary sm" type="button" id="bkGo">Publicar</button></div><div id="bkMsg" class="muted" style="font-size:13px"></div></div>`:''}`;
  if(T==='ex')body=`<div class="card"><p>Descarga los registros para la auditoría o para cargarlos en la base de datos de acreditación de la IADC. Los registros deben conservarse al menos 5 años.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${COURSES.map(c=>`<button class="btn sm" type="button" data-csv="${c.id}">Registros · ${esc(c.code||c.id)} (CSV)</button>`).join('')}<button class="btn sm" type="button" id="exEv">Bitácora completa (CSV)</button><button class="btn sm" type="button" id="exAll">Respaldo completo (JSON)</button></div></div>`;
  W.innerHTML=`<button class="btn ghost sm" type="button" data-go="hub">← Panel principal</button><h1 style="font-size:clamp(30px,5vw,48px);text-transform:uppercase;margin:14px 0 10px">Panel del instructor</h1><div class="tabs">${tabs.map(([k,t])=>`<button type="button" class="${k===T?'on':''}" data-at="${k}">${t}</button>`).join('')}<button type="button" data-at="reload">↻ Actualizar</button></div>${body}`;
  W.querySelectorAll('[data-at]').forEach(b=>b.onclick=()=>{if(b.dataset.at==='reload')openAdmin();else{ADM.tab=b.dataset.at;renderAdmin()}});
  W.querySelectorAll('[data-stu]').forEach(b=>b.onclick=()=>adminStudent(b.dataset.stu));
  W.querySelectorAll('[data-cpsave]').forEach(b=>b.onclick=async()=>{const id=+b.dataset.cpsave;try{await ST.answerComplaint(id,W.querySelector(`[data-cps="${id}"]`).value,W.querySelector(`[data-cpr="${id}"]`).value.trim());toast('Respuesta guardada.');openAdmin('cp')}catch(e){toast(e.message)}});
  W.querySelectorAll('[data-csv]').forEach(b=>b.onclick=()=>exportCourse(courseById(b.dataset.csv)));
  const ev=$('#exEv');if(ev)ev.onclick=exportEvents;const al=$('#exAll');if(al)al.onclick=async()=>{const all={...ADM.data,events:await allEvents()};download('respaldo_registros_'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(all,null,1),'application/json')};
  const bk=$('#bkGo');if(bk)bk.onclick=publishBanks}
async function adminStudent(uid){const D=ADM.data,u=D.tr.find(t=>t.id===uid),W=$('#adminWrap');W.innerHTML='<p class="muted">Cargando…</p>';let ev=[];try{ev=await ST.staffEvents(uid)}catch(e){}
  const NAMES={enroll:'Inscripción',login:'Ingreso',logout:'Salida',id_verify:'Verificación de identidad',id_fail:'Verificación fallida',disclaimer:'Aceptó aviso y declaración de calidad',module_start:'Inició módulo',module_leave:'Salió del módulo',module_complete:'Completó módulo',lessons_done:'Terminó lecciones',check:'Pregunta de repaso',activity:'Práctica 3D',idle_pause:'Pausa por inactividad',idle_resume:'Reanudó',exam_declaration:'Declaración del examen',exam_start:'Inició examen',exam_submit:'Entregó examen',exam_reset:'Instructor habilitó el examen',certificate:'Constancia emitida',survey:'Encuesta',complaint:'Queja o comentario'};
  const items=await Promise.all(ev.map(async e=>{const c=courseById(e.course),m=c&&c.modules.find(x=>x.id===e.module);let extra='';const d=e.data||{};
    if(e.type==='id_verify'){const url=d.photo?await ST.photoURL(d.photo):null;extra=`${esc(d.purpose||'')} · ${esc(d.method||'')}${url?`<img src="${url}" alt="Foto de verificación">`:''}`}
    else if(e.type==='check')extra=`pregunta ${d.q+1} · intento ${d.try} · ${d.correct?'correcta':'incorrecta'}`;
    else if(e.type==='exam_submit')extra=`nota ${d.score} % · ${d.passed?'aprobado':'no aprobado'}`;
    else if(e.type==='activity')extra=`${esc(d.mod)} · ${d.score} puntos`;
    else if(e.type==='module_leave'||e.type==='module_complete')extra=`${fmtMin(d.seconds||0)} en esta sesión${d.total?' · total '+fmtMin(d.total):''}`;
    else if(e.type==='certificate')extra=esc(d.number);
    return `<li><span class="muted">${fmtDT(e.at)}</span><span><b>${NAMES[e.type]||esc(e.type)}</b>${c?' · '+esc(c.code||c.id):''}${m?' · '+esc(m.title):''}${extra?'<br>'+extra:''}</span></li>`}));
  W.innerHTML=`<button class="btn ghost sm" type="button" id="stBack">← Aprendices</button><h1 style="font-size:36px;text-transform:uppercase;margin:12px 0 6px">${esc(u.full_name)}</h1>
   <dl class="kv card"><dt>Documento</dt><dd>${esc(u.doc_type)} ${esc(u.doc_number)}</dd><dt>Contacto</dt><dd>${esc(u.email||'')} ${esc(u.phone||'')}</dd><dt>Empresa / cargo</dt><dd>${esc(u.company||'')} · ${esc(u.cargo||'')}</dd><dt>Autorizó datos</dt><dd>${fmtDT(u.consent_at)}</dd></dl>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0"><button class="btn sm" type="button" id="stCode">Generar código de verificación</button>${COURSES.map(c=>`<button class="btn sm ghost" type="button" data-rst="${c.id}">Habilitar examen · ${esc(c.code||c.id)}</button>`).join('')}</div><div id="stMsg"></div>
   ${COURSES.map(c=>{const s=stuStats(D,u,c);if(!s.started)return'';return `<h3 style="margin-top:16px;text-transform:uppercase">${esc(c.title)}</h3><div class="tblwrap" style="max-height:none"><table class="tbl"><thead><tr><th>Módulo</th><th>Estado</th><th>Tiempo activo</th><th>Mínimo</th><th>Repaso (bien/mal)</th><th>Práctica 3D</th><th>Inicio</th><th>Fin</th></tr></thead><tbody>${c.modules.map(m=>{const p=s.pr.find(x=>x.module===m.id)||{};return `<tr><td>${esc(m.title)}</td><td>${p.status==='completed'?'<span class="chip ok">Completo</span>':p.status?'En curso':'—'}</td><td class="mono">${p.active_seconds?fmtMin(p.active_seconds):'—'}</td><td class="mono">${m.minutes}:00</td><td>${p.checks_ok!=null&&p.status?`${p.checks_ok}/${p.checks_wrong}`:'—'}</td><td>${p.activity_score!=null?p.activity_score:'—'}</td><td>${fmtDT(p.started_at)}</td><td>${fmtDT(p.completed_at)}</td></tr>`}).join('')}</tbody></table></div>
     <p class="muted" style="font-size:13px">Total ${fmtH(s.secs)} · Intentos del examen: ${s.at.map(a=>`${fmtDT(a.submitted_at||a.started_at)} → ${a.score!=null?a.score+' %':'abierto'}${a.reset?' (anulado)':''}`).join(' · ')||'ninguno'} ${s.ce?'· Constancia '+esc(s.ce.number):''}</p>`}).join('')}
   <h3 style="margin-top:18px;text-transform:uppercase">Bitácora</h3><ul class="tl">${items.join('')||'<li class="muted">Sin eventos.</li>'}</ul>`;
  $('#stBack').onclick=()=>openAdmin('tr');
  $('#stCode').onclick=async()=>{try{const k=await ST.genCode(uid);$('#stMsg').innerHTML=`<div class="fb info">Código para ${esc(u.full_name)}: <b class="mono" style="font-size:22px">${esc(k)}</b> · vale 30 minutos y una sola vez. Entrégalo solo después de confirmar la identidad del aprendiz.</div>`}catch(e){toast(e.message)}};
  W.querySelectorAll('[data-rst]').forEach(b=>b.onclick=async()=>{try{const n=await ST.resetAttempts(uid,b.dataset.rst);toast(n?`Examen habilitado (${n} intentos anulados).`:'No había intentos por anular.')}catch(e){toast(e.message)}})}
const csvCell=v=>{v=v==null?'':String(v);return /[",\n;]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
function download(name,text,type){const b=new Blob(['﻿'+text],{type:type||'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function exportCourse(c){const D=ADM.data;const rows=[['Nombres y apellidos','Tipo doc','Documento','Correo','Celular','Empresa','Cargo','Curso','Programa','N.º programa IADC','Endoso','Inicio','Módulos completos','Módulos totales','Tiempo activo (h)','Intentos de examen','Nota final','Aprobado','Fecha de aprobación','N.º constancia','Vence','Instructor','Proveedor']];
  D.tr.filter(u=>u.role==='student').forEach(u=>{const s=stuStats(D,u,c);if(!s.started)return;const sub=s.at.filter(a=>a.submitted_at&&!a.reset);rows.push([u.full_name,u.doc_type,u.doc_number,u.email,u.phone,u.company,u.cargo,c.title,c.program,iadcId(c),c.endorsementLabel||'',s.first||'',s.done,c.modules.length,(s.secs/3600).toFixed(2),sub.length,s.ce?s.ce.score:(sub.length?s.best:''),s.ce?'Sí':'No',s.ce?s.ce.issued_at:'',s.ce?s.ce.number:'',s.ce&&s.ce.expires_at||'',s.ce?s.ce.instructor_name:'',CFG.provider.name])});
  download(`registros_${c.id}_${new Date().toISOString().slice(0,10)}.csv`,rows.map(r=>r.map(csvCell).join(';')).join('\n'))}
async function allEvents(){const D=ADM.data;const out=[];for(const u of D.tr){try{out.push(...await ST.staffEvents(u.id))}catch(e){}}return out}
async function exportEvents(){const ev=await allEvents(),D=ADM.data;const rows=[['Fecha','Aprendiz','Documento','Curso','Módulo','Evento','Detalle']];ev.forEach(e=>{const u=D.tr.find(t=>t.id===e.user_id)||{};const d={...(e.data||{})};if(d.photo&&String(d.photo).startsWith('data:'))d.photo='(foto)';rows.push([e.at,u.full_name,u.doc_number,e.course,e.module,e.type,JSON.stringify(d)])});download('bitacora_'+new Date().toISOString().slice(0,10)+'.csv',rows.map(r=>r.map(csvCell).join(';')).join('\n'))}
async function publishBanks(){const files=[...$('#bkF').files];const msg=$('#bkMsg');msg.textContent='';const banks={};
  for(const f of files){try{const j=JSON.parse(await f.text());if(j.course&&Array.isArray(j.bank))banks[j.course]=j.bank}catch(e){msg.textContent='Archivo inválido: '+f.name;return}}
  for(const c of COURSES){const bank=banks[c.id]||(c.exam.bank&&c.exam.bank.length?c.exam.bank:null);
    try{msg.textContent=`Publicando ${c.title}…`;await ST.publishCourse(c,bank)}catch(e){msg.textContent=`Error en ${c.title}: ${e.message}`;return}}
  msg.textContent=`Listo: ${COURSES.length} cursos publicados; bancos cargados: ${Object.keys(banks).join(', ')||'ninguno'}.`}
