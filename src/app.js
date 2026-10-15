/* ===================================================================== APP: perfiles, panel principal, bucle */
const store={get(){try{return JSON.parse(localStorage.getItem('escuelaPerforacion')||'null')}catch(e){return null}},set(v){try{localStorage.setItem('escuelaPerforacion',JSON.stringify(v))}catch(e){}}};
let DB=store.get()||{profiles:[],cur:null};
const prof=()=>DB.profiles.find(p=>p.id===DB.cur);
const save=()=>store.set(DB);
const xpOf=p=>Object.values(p.mods||{}).reduce((s,m)=>s+(m.best||0),0);
const levelOf=x=>x<100?'Inducción':x<250?'Patio':x<400?'Piso':x<550?'Encuelladero':'Listo';
function show(id){for(const s of document.querySelectorAll('.screen'))s.hidden=s.id!==id}
$('#pRole').innerHTML=ROLES.map(r=>`<option>${r}</option>`).join('');
function renderLogin(){const L=$('#profileList');
  if(!DB.profiles.length)L.innerHTML=`<button class="prof" type="button" data-demo="1"><span class="avatar">D</span><span><b>Aprendiz de demostración</b><small>Perfil de ejemplo · Cuñero</small></span></button>`;
  else L.innerHTML=DB.profiles.map(p=>`<button class="prof" type="button" data-id="${p.id}"><span class="avatar">${esc((p.name.trim()[0]||'?').toUpperCase())}</span><span><b>${esc(p.name)}</b><small>${esc(p.role)} · ${xpOf(p)} puntos</small></span></button>`).join('')}
$('#profileList').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.demo){createProfile('Aprendiz de demostración','Cuñero');return}DB.cur=b.dataset.id;save();openHub()});
$('#newProfile').addEventListener('submit',e=>{e.preventDefault();const n=$('#pName').value.trim();if(!n){toast('Escribe el nombre del aprendiz.');return}createProfile(n,$('#pRole').value)});
function createProfile(name,role){const p={id:'p'+Date.now().toString(36),name,role,mods:{}};DB.profiles.push(p);DB.cur=p.id;save();$('#pName').value='';openHub()}
$('#switchUser').addEventListener('click',()=>{renderLogin();show('s-login')});
function openHub(){const p=prof();if(!p){renderLogin();show('s-login');return}
  const xp=xpOf(p),done=MODS.filter(m=>(p.mods[m.id]?.best||0)>=PASS).length;
  $('#hubName').textContent=p.name;$('#hubRole').textContent=p.role;$('#hubXp').textContent=xp;$('#hubLevel').textContent=levelOf(xp);$('#hubDone').textContent=`${done}/${MODS.length}`;
  $('#hubBar').style.width=(xp/(MODS.length*100)*100)+'%';
  $('#modGrid').innerHTML=MODS.map(m=>{const b=p.mods[m.id]?.best;const chip=b==null?'<span class="chip">Pendiente</span>':b>=PASS?'<span class="chip ok">Aprobado</span>':'<span class="chip warn">Repetir</span>';
    return `<button class="mod" type="button" data-mod="${m.id}"><span class="num">${m.n}</span><span class="tag">${m.tag}</span><span><h3>${m.t}</h3><p>${m.d}</p></span><span class="foot">${chip}<span class="mono muted">${b==null?`~${m.min} min`:`Mejor: ${b}`}</span></span></button>`}).join('');
  show('s-hub');checkPlatforms()}
$('#modGrid').addEventListener('click',e=>{const b=e.target.closest('[data-mod]');if(b)openModule(b.dataset.mod)});
async function checkPlatforms(){const base=['Celular','Tablet','Computador'].map(t=>`<span class="chip ok">${t}</span>`);
  let vr='<span class="chip">Meta Quest (VR): abrir desde su navegador</span>',ar='<span class="chip">Realidad aumentada: navegador compatible</span>';
  try{if(navigator.xr){if(await navigator.xr.isSessionSupported('immersive-vr'))vr='<span class="chip ok">Meta Quest (VR)</span>';if(await navigator.xr.isSessionSupported('immersive-ar'))ar='<span class="chip ok">Realidad aumentada</span>'}}catch(e){}
  $('#platforms').innerHTML=base.concat(vr,ar).join('')}
function complete(id,score){const p=prof();const m=p.mods[id]||(p.mods[id]={});const prev=m.best;m.best=Math.max(prev||0,score);m.last=score;m.tries=(m.tries||0)+1;save();return{prev,best:m.best}}

const SCRIPTS={hse:modHSE,taladro:modTaladro,rigup:modRigup,encuelle:modEncuelle,control:modControl,casos:modCasos};
function openModule(id,opt){
  const m=MODS.find(x=>x.id===id);show('s-mod');$('#modTitle').textContent=`${m.n} · ${m.t}`;
  initEngine();resize();if(!RIG.home)saveHome();
  newCtx();MODE={id};resetScene();panel('');
  run(()=>SCRIPTS[id](opt));
}
function backToHub(){newCtx();MODE={};if(RIG.home)resetScene();openHub()}
$('#backHub').addEventListener('click',backToHub);
document.querySelectorAll('[data-cam]').forEach(b=>b.addEventListener('click',()=>{const c={general:[[44,30,52],[0,16,0]],piso:[[9,F+4,10],[0,F+.8,0]],encuelladero:[[6,F+MONK+3,8],[-.4,F+MONK+.5,1.3]],bop:[[4.6,1.8,5],[0,1.3,0]]}[b.dataset.cam];if(CAM.mode!=='fp')lookFrom(c[0],c[1])}));

/* ---------- bucle principal ---------- */
let lastT=performance.now(),T=0,talkWas=null,SPEED=1;
const tv=V(0,0,0),hv=V(0,0,0);
function tick(){
  const now=performance.now(),dt=Math.min(.05,(now-lastT)/1000)*SPEED;lastT=now;T+=dt;
  for(const tw of TW.slice()){tw.t+=dt;const p=Math.min(1,tw.t/tw.dur);tw.fn(ease(p));if(p>=1){const i=TW.indexOf(tw);if(i>=0)TW.splice(i,1);tw.done&&tw.done()}}
  if(MODE.tick)MODE.tick(dt);
  const I=RIG.ins;I.talk=NAR.speaking;if(talkWas!==I.talk){talkWas=I.talk;$('#talkDot').classList.toggle('on',I.talk)}
  insFace(dt);animatePeople(dt,T);updateLines();updateFX(dt);updateBubbles(dt);
  const k=.5+.5*Math.sin(T*5);
  for(const o of INTER){const h=o.userData.hot,a=h?.35+.65*k:.06+.1*k;o.traverse(m=>{if(m.isMesh)emis(m,.94*a,.62*a,.1*a)})}
  RIG.beacons.forEach((b,i)=>b.material.emissive.setHex(MODE.alarm&&((T*4|0)%2===i)?b.userData.c:0));
  if(RIG.sock)RIG.sock.rotation.y=Math.sin(T*1.3)*.12;
  if(!renderer.xr.isPresenting)camUpdate(dt);
  camera.getWorldPosition(tv);sky.position.copy(tv);
  renderer.shadowMap.needsUpdate=true;renderer.shadowMap.autoUpdate=false;
  const cv=renderer.domElement,W=cv.clientWidth,Hh=cv.clientHeight;
  if(renderer.xr.isPresenting){renderer.render(scene,camera);return}
  renderer.setScissorTest(false);renderer.setViewport(0,0,W,Hh);renderer.render(scene,camera);
  // retrato del instructor (imagen en imagen)
  const pip=$('#pip');
  if(!renderer.xr.isPresenting&&I.g.visible&&pip.offsetWidth){const r=pip.getBoundingClientRect(),c=cv.getBoundingClientRect();
    const x=r.left-c.left+2,y=c.bottom-r.bottom+2,w=r.width-4,h=r.height-4;
    I.head.getWorldPosition(hv);const yaw=I.g.rotation.y;const pc=RIG.pipCam;pc.position.set(hv.x+Math.sin(yaw)*.95,hv.y+.06,hv.z+Math.cos(yaw)*.95);pc.lookAt(hv.x,hv.y-.1,hv.z);pc.aspect=w/h;pc.updateProjectionMatrix();
    renderer.setViewport(x,y,w,h);renderer.setScissor(x,y,w,h);renderer.setScissorTest(true);renderer.setClearColor(0x2a3640,1);renderer.clear();renderer.render(scene,pc);renderer.setScissorTest(false);renderer.setClearColor(0x000000,0)}
}

if(prof())openHub();else{renderLogin();show('s-login')}
