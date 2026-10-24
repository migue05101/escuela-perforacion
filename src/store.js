/* ===================================================================== CUENTAS Y REGISTROS (servidor Supabase o modo local)
   Todo lo que la IADC revisa en una auditoría pasa por aquí: inscripción, identidad, tiempos,
   progreso, chequeos, exámenes, constancias, encuestas y quejas. */
const LS={get(k,d){try{const v=localStorage.getItem('ep_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('ep_'+k,JSON.stringify(v));return true}catch(e){toast('El dispositivo no tiene espacio para guardar más registros.');return false}}};
const uidGen=()=>(crypto.randomUUID?crypto.randomUUID():'u'+Date.now().toString(36)+Math.random().toString(36).slice(2));
async function pbkdf2(pw,salt){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);const b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:120000,hash:'SHA-256'},k,256);return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const certNumber=prog=>(prog==='RigPass'?'EP-RP-':'EP-DIT-')+new Date().getFullYear()+'-'+uidGen().replace(/-/g,'').slice(0,8).toUpperCase();
const maskDoc=d=>'****'+String(d||'').slice(-4);
const normDoc=d=>String(d||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
function loginEmail(id){id=String(id||'').trim().toLowerCase();return id.includes('@')?id:'doc'+normDoc(id).toLowerCase()+'@'+CFG.server.emailDomain}

const ST={
  mode:CFG.server.url&&CFG.server.anonKey?'server':'local',
  me:null,          // perfil del aprendiz conectado
  sess:null,        // sesión del servidor {access_token, refresh_token, expires_at}
  /* ---------- servidor: llamadas REST ---------- */
  async api(path,{method='GET',body,headers={},raw=false,auth=true}={}){
    if(auth&&this.sess&&this.sess.expires_at&&Date.now()/1000>this.sess.expires_at-60)await this.refresh();
    const h={apikey:CFG.server.anonKey,'Content-Type':'application/json',...headers};
    if(auth&&this.sess)h.Authorization='Bearer '+this.sess.access_token;else h.Authorization='Bearer '+CFG.server.anonKey;
    let r;try{r=await fetch(CFG.server.url.replace(/\/$/,'')+path,{method,headers:h,body:body==null?undefined:(raw?body:JSON.stringify(body))})}
    catch(e){throw new Error('Sin conexión con el servidor de registros. Revisa el internet e inténtalo de nuevo.')}
    const txt=await r.text();let j=null;try{j=txt?JSON.parse(txt):null}catch(e){}
    if(!r.ok){const m=j&&(j.message||j.msg||j.error_description||j.error)||txt||('Error '+r.status);throw new Error(srvMsg(m))}
    return j},
  async refresh(){if(!this.sess||!this.sess.refresh_token)return;try{const j=await fetch(CFG.server.url.replace(/\/$/,'')+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:CFG.server.anonKey,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:this.sess.refresh_token})}).then(r=>r.ok?r.json():null);if(j&&j.access_token){this.sess=sessOf(j);LS.set('sess',this.sess)}}catch(e){}},
  async rpc(fn,args){return this.api('/rest/v1/rpc/'+fn,{method:'POST',body:args||{}})},
  async rest(table,{method='GET',query='',body,prefer}={}){return this.api('/rest/v1/'+table+(query?'?'+query:''),{method,body,headers:prefer?{Prefer:prefer}:{}})},

  /* ---------- sesión ---------- */
  async init(){
    if(this.mode==='server'){this.sess=LS.get('sess',null);if(this.sess){try{await this.loadMe()}catch(e){this.sess=null;this.me=null;LS.set('sess',null)}}}
    else{const id=LS.get('cur',null);this.me=id?(LS.get('acc',[]).find(a=>a.id===id)||null):null}
    return this.me},
  async loadMe(){const r=await this.rest('trainees',{query:'select=*&id=eq.'+this.sess.user.id});this.me=r&&r[0]?r[0]:null;if(!this.me)throw new Error('Perfil no encontrado');return this.me},
  async signUp(f){f={...f,doc_number:normDoc(f.doc_number)}; // f: {full_name, doc_type, doc_number, email, phone, company, cargo, password, photo, instructorCode}
    if(this.mode==='server'){
      const email=f.email?f.email.trim().toLowerCase():loginEmail(f.doc_number);
      const j=await this.api('/auth/v1/signup',{method:'POST',auth:false,body:{email,password:f.password,data:{full_name:f.full_name}}});
      if(!j.access_token)throw new Error('La cuenta quedó creada, pero el servidor pide confirmar el correo. El administrador debe desactivar la confirmación de correo en Supabase (ver LEEME).');
      this.sess=sessOf(j);LS.set('sess',this.sess);
      await this.rest('trainees',{method:'POST',prefer:'return=minimal',body:{id:this.sess.user.id,full_name:f.full_name,doc_type:f.doc_type,doc_number:f.doc_number,email:f.email||null,phone:f.phone||null,company:f.company||null,cargo:f.cargo,consent_at:new Date().toISOString()}});
      await this.loadMe();
    }else{
      const acc=LS.get('acc',[]);if(acc.some(a=>a.doc_number===f.doc_number))throw new Error('Ya existe una cuenta con ese documento en este dispositivo.');
      const salt=uidGen();const role=f.instructorCode&&f.instructorCode===CFG.localInstructorCode?'instructor':'student';
      const a={id:uidGen(),full_name:f.full_name,doc_type:f.doc_type,doc_number:f.doc_number,email:f.email||'',phone:f.phone||'',company:f.company||'',cargo:f.cargo,role,salt,hash:await pbkdf2(f.password,salt),consent_at:new Date().toISOString(),created_at:new Date().toISOString()};
      acc.push(a);LS.set('acc',acc);LS.set('cur',a.id);this.me=a}
    await this.log('enroll',{method:f.photo?'foto':'sin_foto',doc_type:f.doc_type,doc:maskDoc(f.doc_number)});
    if(f.photo)await this.idVerify('enroll',f.photo,'foto_inscripcion');
    return this.me},
  async signIn(id,pw){
    if(this.mode==='server'){
      const j=await this.api('/auth/v1/token?grant_type=password',{method:'POST',auth:false,body:{email:loginEmail(id),password:pw}});
      this.sess=sessOf(j);LS.set('sess',this.sess);await this.loadMe()}
    else{const key=String(id).trim().toLowerCase(),nd=normDoc(id);const a=LS.get('acc',[]).find(x=>(nd&&x.doc_number===nd)||(x.email&&x.email.toLowerCase()===key));
      if(!a||await pbkdf2(pw,a.salt)!==a.hash)throw new Error('Documento o clave incorrectos.');LS.set('cur',a.id);this.me=a}
    await this.log('login',{});return this.me},
  async checkPassword(pw){ // vuelve a pedir la clave para verificar identidad
    if(this.mode==='server'){try{const j=await this.api('/auth/v1/token?grant_type=password',{method:'POST',auth:false,body:{email:this.sess.user.email,password:pw}});this.sess=sessOf(j);LS.set('sess',this.sess);return true}catch(e){return false}}
    return await pbkdf2(pw,this.me.salt)===this.me.hash},
  async signOut(){try{await this.log('logout',{})}catch(e){}if(this.mode==='server'&&this.sess){try{await this.api('/auth/v1/logout',{method:'POST'})}catch(e){}}this.sess=null;this.me=null;LS.set('sess',null);LS.set('cur',null)},
  isStaff(){return !!this.me&&(this.me.role==='instructor'||this.me.role==='admin')},

  /* ---------- bitácora y progreso ---------- */
  async log(type,data,course,module){if(!this.me)return;const e={user_id:this.me.id,type,data:data||{},course:course||null,module:module||null};
    if(this.mode==='server'){try{await this.rest('events',{method:'POST',prefer:'return=minimal',body:e})}catch(err){queueLater(e);}}
    else{const ev=LS.get('ev',[]);ev.push({...e,id:ev.length+1,at:new Date().toISOString()});LS.set('ev',ev)}},
  async progress(course){ // {modulo: fila}
    const rows=this.mode==='server'?await this.rest('progress',{query:`select=*&user_id=eq.${this.me.id}&course=eq.${encodeURIComponent(course)}`}):LS.get('prog',[]).filter(p=>p.user_id===this.me.id&&p.course===course);
    const m={};(rows||[]).forEach(r=>m[r.module]=r);return m},
  async saveProgress(course,module,patch){
    const row={user_id:this.me.id,course,module,...patch,updated_at:new Date().toISOString()};
    if(this.mode==='server'){await this.rest('progress',{method:'POST',query:'on_conflict=user_id,course,module',prefer:'resolution=merge-duplicates,return=minimal',body:row})}
    else{const all=LS.get('prog',[]);const i=all.findIndex(p=>p.user_id===row.user_id&&p.course===course&&p.module===module);if(i>=0)all[i]={...all[i],...row};else all.push({status:'started',active_seconds:0,checks_ok:0,checks_wrong:0,started_at:row.updated_at,...row});LS.set('prog',all)}},

  /* ---------- identidad ---------- */
  async idVerify(purpose,photo,method){let ref=null;
    if(photo){if(this.mode==='server'){const path=`${this.me.id}/${Date.now()}_${purpose}.jpg`;const blob=await (await fetch(photo)).blob();
        await this.api('/storage/v1/object/idphotos/'+path,{method:'POST',raw:true,body:blob,headers:{'Content-Type':'image/jpeg'}});ref=path}
      else ref=photo}
    await this.log('id_verify',{purpose,method:method||'clave+foto',photo:ref});return true},
  async useCode(code,purpose){if(this.mode==='server')return !!(await this.rpc('use_code',{p_code:code,p_purpose:purpose}));
    const cs=LS.get('codes',[]);const c=cs.find(x=>x.user_id===this.me.id&&x.code===String(code).trim()&&!x.used_at&&new Date(x.expires_at)>new Date());if(!c)return false;c.used_at=new Date().toISOString();LS.set('codes',cs);await this.log('id_verify',{purpose,method:'codigo_instructor'});return true},

  /* ---------- examen ---------- */
  async startExam(course){
    if(this.mode==='server')return this.rpc('start_exam',{p_course:course.id});
    // modo local: el examen se arma aquí (solo demostración: las respuestas viajan en la app)
    const evs=LS.get('ev',[]).filter(e=>e.user_id===this.me.id);
    if(!evs.some(e=>e.type==='id_verify'&&e.data.purpose==='exam'&&Date.now()-new Date(e.at)<30*60e3))throw new Error('Primero verifica tu identidad para el examen');
    const atts=LS.get('att',[]).filter(a=>a.user_id===this.me.id&&a.course===course.id&&!a.reset);
    if(atts.some(a=>a.passed))throw new Error('Ya aprobaste este examen');
    let open=atts.find(a=>!a.submitted_at&&Date.now()-new Date(a.started_at)<3*3600e3);
    if(!open){if(atts.filter(a=>a.submitted_at).length>=CFG.maxExamAttempts)throw new Error(`Agotaste los ${CFG.maxExamAttempts} intentos. Tu instructor debe revisar tu caso y habilitarte de nuevo`);
      const bank=examBank(course);if(bank.length<examSize(course))throw new Error('El banco de preguntas del curso está incompleto');
      const by={};bank.forEach(b=>(by[b.m]=by[b.m]||[]).push(b));Object.values(by).forEach(a=>a.sort(()=>Math.random()-.5));
      const pick=[];for(let r=0;pick.length<examSize(course);r++){const row=Object.values(by).map(a=>a[r]).filter(Boolean).sort(()=>Math.random()-.5);if(!row.length)break;pick.push(...row.slice(0,examSize(course)-pick.length))}
      pick.sort(()=>Math.random()-.5);
      open={id:LS.get('att',[]).length+1,user_id:this.me.id,course:course.id,started_at:new Date().toISOString(),question_ids:pick.map(b=>b.id),orders:Object.fromEntries(pick.map(b=>[b.id,[0,1,2,3].sort(()=>Math.random()-.5)])),reset:false};
      const all=LS.get('att',[]);all.push(open);LS.set('att',all);await this.log('exam_start',{attempt:open.id,questions:pick.length},course.id)}
    const bank=Object.fromEntries(examBank(course).map(b=>[b.id,b]));
    return{attempt:open.id,started_at:open.started_at,pass:course.exam.pass,questions:open.question_ids.map(id=>({id,q:bank[id].q,o:open.orders[id].map(i=>bank[id].o[i])}))}},
  async submitExam(course,attempt,answers){
    const instr=(CFG.instructors[0]||{}).name||'',prov=CFG.provider.name;
    if(this.mode==='server')return this.rpc('submit_exam',{p_attempt:attempt,p_answers:answers,p_instructor:instr,p_provider:prov});
    const all=LS.get('att',[]);const at=all.find(a=>a.id===attempt&&a.user_id===this.me.id);if(!at||at.submitted_at)throw new Error('Este intento ya fue calificado');
    const bank=Object.fromEntries(examBank(course).map(b=>[b.id,b]));let ok=0;const bd={},fb=[];
    at.question_ids.forEach(id=>{const b=bank[id],sh=answers[id],ch=sh==null?null:at.orders[id][sh],good=ch===b.a;if(good)ok++;const x=bd[b.m]||(bd[b.m]={ok:0,total:0});x.total++;if(good)x.ok++;if(!good)fb.push({module:b.m,q:b.q,tuya:ch==null?null:b.o[ch],correcta:b.o[b.a],e:b.e})});
    const score=Math.round(100*ok/at.question_ids.length),passed=score>=course.exam.pass;Object.assign(at,{submitted_at:new Date().toISOString(),answers,score,passed,breakdown:bd});LS.set('att',all);
    await this.log('exam_submit',{attempt,score,passed},course.id);
    let cert=null;if(passed){cert=(LS.get('cert',[])).find(c=>c.user_id===this.me.id&&c.course===course.id&&!c.revoked);
      if(!cert){const now=new Date(),exp=course.validityMonths?new Date(now.getFullYear(),now.getMonth()+course.validityMonths,now.getDate()):null;
        cert={number:certNumber(course.program),user_id:this.me.id,course:course.id,program:course.program,title:course.title,full_name:this.me.full_name,doc_masked:maskDoc(this.me.doc_number),issued_at:now.toISOString(),expires_at:exp&&exp.toISOString(),score,instructor_name:instr,provider_name:prov,iadc_program_id:iadcId(course),endorsement:course.endorsementLabel||null,revoked:false};
        const cs=LS.get('cert',[]);cs.push(cert);LS.set('cert',cs);await this.log('certificate',{number:cert.number},course.id)}}
    return{score,passed,pass:course.exam.pass,total:at.question_ids.length,ok,breakdown:bd,feedback:fb,certificate:cert}},
  async attempts(course){return this.mode==='server'?await this.rest('exam_attempts',{query:`select=id,started_at,submitted_at,score,passed,reset&user_id=eq.${this.me.id}&course=eq.${course}&order=id`}):LS.get('att',[]).filter(a=>a.user_id===this.me.id&&a.course===course)},
  async certs(){return this.mode==='server'?await this.rest('certificates',{query:`select=*&user_id=eq.${this.me.id}`}):LS.get('cert',[]).filter(c=>c.user_id===this.me.id)},
  async verifyCert(n){n=String(n).trim().toUpperCase();if(this.mode==='server')return this.rpc('verify_certificate',{p_number:n});
    const c=LS.get('cert',[]).find(x=>x.number===n);if(!c)return{found:false};return{...c,valid:!c.revoked&&(!c.expires_at||new Date(c.expires_at)>new Date())}},
  async survey(course,answers,comment){const r={user_id:this.me.id,course,answers,comment:comment||null};if(this.mode==='server')await this.rest('surveys',{method:'POST',prefer:'return=minimal',body:r});else{const s=LS.get('srv',[]);s.push({...r,id:s.length+1,created_at:new Date().toISOString()});LS.set('srv',s)}await this.log('survey',{},course)},
  async complaint(course,text){const r={user_id:this.me.id,course:course||null,text};if(this.mode==='server')await this.rest('complaints',{method:'POST',prefer:'return=minimal',body:r});else{const s=LS.get('cmp',[]);s.push({...r,id:s.length+1,status:'abierta',created_at:new Date().toISOString()});LS.set('cmp',s)}await this.log('complaint',{},course)},
  async myComplaints(){return this.mode==='server'?await this.rest('complaints',{query:`select=*&user_id=eq.${this.me.id}&order=id.desc`}):LS.get('cmp',[]).filter(c=>c.user_id===this.me.id).reverse()},

  /* ---------- instructor ---------- */
  async staffAll(){ // todo lo necesario para el panel del instructor
    if(this.mode==='server'){const [tr,pr,at,ce,cp,sv]=await Promise.all(['trainees?select=*&order=created_at.desc','progress?select=*','exam_attempts?select=id,user_id,course,started_at,submitted_at,score,passed,reset&order=id','certificates?select=*','complaints?select=*&order=id.desc','surveys?select=*'].map(p=>this.api('/rest/v1/'+p)));return{tr,pr,at,ce,cp,sv}}
    return{tr:LS.get('acc',[]).map(({hash,salt,...a})=>a),pr:LS.get('prog',[]),at:LS.get('att',[]),ce:LS.get('cert',[]),cp:LS.get('cmp',[]),sv:LS.get('srv',[])}},
  async staffEvents(uid){return this.mode==='server'?await this.rest('events',{query:`select=*&user_id=eq.${uid}&order=at`}):LS.get('ev',[]).filter(e=>e.user_id===uid)},
  async photoURL(ref){if(!ref)return null;if(this.mode!=='server')return ref;try{const j=await this.api('/storage/v1/object/sign/idphotos/'+ref,{method:'POST',body:{expiresIn:600}});return CFG.server.url.replace(/\/$/,'')+'/storage/v1'+j.signedURL}catch(e){return null}},
  async genCode(uid){if(this.mode==='server')return this.rpc('gen_code',{p_user:uid});const k=String(Math.floor(Math.random()*1e6)).padStart(6,'0');const cs=LS.get('codes',[]);cs.push({user_id:uid,code:k,expires_at:new Date(Date.now()+30*60e3).toISOString()});LS.set('codes',cs);return k},
  async resetAttempts(uid,course){if(this.mode==='server')return this.rpc('reset_attempts',{p_user:uid,p_course:course});const all=LS.get('att',[]);let n=0;all.forEach(a=>{if(a.user_id===uid&&a.course===course&&!a.passed&&!a.reset){a.reset=true;n++}});LS.set('att',all);return n},
  async answerComplaint(id,status,response){if(this.mode==='server')return this.rest('complaints',{method:'PATCH',query:'id=eq.'+id,prefer:'return=minimal',body:{status,response,responded_by:this.me.id,updated_at:new Date().toISOString()}});const s=LS.get('cmp',[]);const c=s.find(x=>x.id===id);if(c)Object.assign(c,{status,response,updated_at:new Date().toISOString()});LS.set('cmp',s)},
  async publishCourse(course,bank){ // sube la definición del curso y su banco de preguntas al servidor
    const row={id:course.id,program:course.program,title:course.title,exam_size:course.exam.size,pass_mark:course.exam.pass,max_attempts:CFG.maxExamAttempts,validity_months:course.validityMonths||0,modules:course.modules.map(m=>({id:m.id,minutes:m.minutes})),iadc_program_id:iadcId(course)||null,endorsement:course.endorsementLabel||null,updated_at:new Date().toISOString()};
    await this.rest('courses',{method:'POST',query:'on_conflict=id',prefer:'resolution=merge-duplicates,return=minimal',body:row});
    if(bank&&bank.length){await this.rest('exam_bank',{method:'PATCH',query:'course=eq.'+course.id,prefer:'return=minimal',body:{active:false}});
      for(let i=0;i<bank.length;i+=200)await this.rest('exam_bank',{method:'POST',prefer:'return=minimal',body:bank.slice(i,i+200).map(b=>({course:course.id,module:b.m,q:b.q,o:b.o,a:b.a,e:b.e||null}))})}
    return true}
};
function sessOf(j){return{access_token:j.access_token,refresh_token:j.refresh_token,expires_at:j.expires_at||Math.floor(Date.now()/1000)+(j.expires_in||3600),user:{id:j.user.id,email:j.user.email}}}
function srvMsg(m){m=String(m);if(/Invalid login/i.test(m))return 'Documento o clave incorrectos.';if(/already registered|already exists/i.test(m))return 'Ya existe una cuenta con ese documento o correo.';if(/duplicate key.*doc_number/i.test(m))return 'Ya existe una cuenta con ese número de documento.';if(/Password should be/i.test(m))return 'La clave debe tener al menos 8 caracteres.';return m}
// eventos que no se pudieron enviar (sin señal): se reintentan después
let LATER=LS.get('later',[]);function queueLater(e){e.at=new Date().toISOString();LATER.push(e);LS.set('later',LATER)}
async function flushLater(){if(ST.mode!=='server'||!ST.sess||!LATER.length)return;const q=LATER.slice();try{await ST.rest('events',{method:'POST',prefer:'return=minimal',body:q});LATER=LATER.slice(q.length);LS.set('later',LATER)}catch(e){}}
setInterval(flushLater,60000);addEventListener('online',flushLater);
