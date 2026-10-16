/* ===================================================================== RECORRIDO LIBRE EN PRIMERA PERSONA */
const EYE_H=1.65,STEP=.45,DROP=.62,RAD=.28;
const WS=[ // superficies caminables
  {x0:-140,x1:140,z0:-140,z1:140,h:()=>0,hole:true},
  {x0:-6.5,x1:6.5,z0:-8.3,z1:8.3,h:()=>.24,hole:true},
  {x0:-5.3,x1:5.3,z0:-6.3,z1:6.3,h:()=>F},
  {x0:5.78,x1:6.83,z0:3.2,z1:10.4,h:(x,z)=>lerp(F,.24,(z-3.2)/7.2)},
  {x0:5.3,x1:6.85,z0:1.6,z1:3.2,h:()=>F},
  {x0:-.8,x1:.8,z0:6.3,z1:12.6,h:(x,z)=>lerp(F,1.15,(z-6.3)/6.3)},
  {x0:-.85,x1:.85,z0:12.5,z1:25.5,h:()=>1.12},
  {x0:-.85,x1:.85,z0:25.5,z1:27.2,h:(x,z)=>lerp(1.12,0,(z-25.5)/1.7)},
  {x0:-9.25,x1:-5.68,z0:-4.45,z1:-.35,h:()=>F},
  {x0:-5.72,x1:-5.28,z0:-1.4,z1:-.5,h:()=>F},
  {x0:12.9,x1:16.1,z0:-14,z1:14,h:()=>2.63},
  {x0:11.2,x1:12.95,z0:3.5,z1:4.5,h:(x,z)=>lerp(0,2.63,(x-11.2)/1.7)},
  {x0:-.45,x1:.45,z0:.95,z1:3.4,h:()=>F+MONK,lvl:'monkey'},
  {x0:.4,x1:2.25,z0:-.5,z1:1.0,h:()=>F+MONK,lvl:'monkey'},
  {x0:-1.72,x1:1.72,z0:-1.72,z1:1.32,h:()=>F+H+.1,lvl:'crown'},
];
const BLK=[ // volúmenes que bloquean
  [-2.8,2.8,-6,-3.4,F,F+2.6],[.6,2.5,1.15,2.15,F,F+30],[-1.3,1.3,-.7,.7,-1,F-.4],[3.7,5.1,-6.3,6.3,0,F-.4],[-5.1,-3.7,-6.3,6.3,0,F-.4],
  [2.2,3.2,1,2,F,F+6],[-3.2,-2.2,1,2,F,F+6],[2.2,3.2,-2.6,-1.6,F,F+6],[-3.2,-2.2,-2.6,-1.6,F,F+6],
  [-9.35,-9.15,-4.5,-.3,F,F+3],[-9.3,-5.7,-4.55,-4.38,F,F+3],[-9.3,-5.7,-.42,-.25,F,F+3],[-5.78,-5.62,-4.5,-1.45,F,F+3],[-5.78,-5.62,-.5,-.3,F,F+3],
  [-7.05,-6.5,-3.8,-1.5,F,F+1],[-8.35,-7.55,-3.1,-2.2,F,F+1],[-8.05,-7.05,-1.75,-.95,F,F+1.2],
  [12.9,16.1,-14,14,0,2.6],[13.4,15.6,-13.3,-7.8,2.6,3.6],[19.3,25.7,-4.3,-1.7,0,2.6],[19.3,25.7,1.7,4.3,0,2.6],
  [-33,-21,-11.3,-8.7,0,3],[-33,-21,-4.8,-2.2,0,3],[-33,-21,1.7,4.3,0,3],[-32.2,-21.8,-25.7,-22.3,0,4],[25.6,30.4,-26.4,-21.6,0,5],
  [-30.5,-21.5,30.5,33.5,0,3],[-30.5,-21.5,36.5,39.5,0,3],[-16.5,-7.5,38.5,41.5,0,3],[-16.7,-12.3,7.8,10.2,0,2],[7.2,10.8,-2.4,-.6,0,1.6],[5.6,7.2,-4,-2.4,0,3.3],
  [2.4,8.2,12.4,26,0,1.25],[-8.2,-2.4,12.4,26,0,1.25],[-.85,.85,12.5,25.5,0,1.1],[11.2,16.9,39.2,40.3,0,1],
  [-2.8,2.8,.95,3.45,F+MONK-.05,F+MONK+1.2,'mk1'],[-1.05,1.05,-.68,.68,F+H+.1,F+H+1.45],[-2,2,-2,-1.85,F+H,F+H+1.2],
].map(a=>({x0:a[0],x1:a[1],z0:a[2],z1:a[3],y0:a[4],y1:a[5],id:a[6]}));
function inHole(x,z){return Math.abs(x)<1.85&&Math.abs(z)<1.85}
function surfaceAt(x,z,y){let best=null;for(const s of WS){if(x<s.x0||x>s.x1||z<s.z0||z>s.z1)continue;if(s.hole&&inHole(x,z))continue;if(s.lvl&&s.lvl!==WALK.lvl)continue;if(s.hole&&CUT.on&&x>-CUT.R-.3&&x<CUT.R+.3&&z>-.3&&z<CUT.R+.3)continue;const h=s.h(x,z);if(h<=y+STEP&&(best===null||h>best))best=h}return best}
function blocked(x,z,y){for(const b of BLK){if(b.id==='mk1'){if(WALK.lvl!=='monkey')continue;if(x>-.45&&x<.45)continue}
  if(x>b.x0-RAD&&x<b.x1+RAD&&z>b.z0-RAD&&z<b.z1+RAD&&y+1.75>b.y0&&y+.35<b.y1)return true}return Math.abs(x)>130||Math.abs(z)>130}
function tryMove(p,dx,dz){const nx=p.x+dx,nz=p.z+dz,s=surfaceAt(nx,nz,p.y);if(s===null||p.y-s>DROP||blocked(nx,nz,s))return false;p.x=nx;p.z=nz;p.y=s;return true}
let ROAMRET=null;
const WALK={pos:V(0,0,47),lvl:'ground',climb:null,srl:false,tied:true,bob:0,snapT:0,turnT:0};
const yawTo=(a,b)=>Math.atan2(-(b.x-a.x),-(b.z-a.z));

/* ---------- lugares y puntos de interés ---------- */
const PLACES=[
  ['Portería',V(0,0,46),V(0,10,0)],['Piso de perforación',V(2.6,F,3.6),V(0,F+1,0)],['Cabina del perforador',V(-6.3,F,-1.0),V(-7.2,F+1,-2.6)],
  ['Base de la escalera',V(4,F,-.35),V(3,F+3,-.35)],['Bajo el piso (contrapozo)',V(.2,.24,3.4),V(0,1,0)],['Tanques de lodo',V(13.4,2.63,3),V(14.5,3,-10)],
  ['Burros de tubería',V(1.8,0,18),V(5,1,19)],['Bombas de lodo',V(18,0,6),V(22,1,0)],['Generadores',V(-19,0,-3),V(-27,1,-3)],
  ['Encuelladero',V(0,F+MONK,2.5),V(0,F+MONK,-1)],['Corona (43 m)',V(1.5,F+H+.1,.9),V(0,F+H,-1)],['Mirador del pozo en corte',V(1.5,0,CUT.R+1.7),V(0,-14,0)]];
const SPOTS=[
  ['info:cellar',V(2.1,.95,1.4)],['info:sub',V(6.4,1.4,8.6)],['info:floor',V(2.8,F+1.4,2.6)],['info:drawworks',V(1.7,F+1.4,-2.9)],['info:doghouse',V(-4.9,F+1.6,-.6)],
  ['info:mast',V(4.2,F+1.6,.6)],['info:crown',V(-.9,F+H+1.6,.9)],['info:monkey',V(-.3,F+MONK+1.5,3.2)],['info:block',V(-1.5,F+1.6,2.4)],['info:bop',V(1.75,1.6,-1.2)],
  ['info:mud',V(12.2,3.9,6.2)],['info:rack',V(1.6,1.6,15.5)],
  ['sit',V(-7.6,F+1.15,-2.65),'Sentarse en la consola (práctica libre)'],['srl',V(3.25,F+1.35,-.05),'Conectar el arnés al bloque retráctil'],['climb',V(3.75,F+1.2,-.55),'Subir por la escalera del mástil'],
  ['ladder:m',V(1.95,F+MONK+1.2,-.3),'Volver a la escalera'],['ladder:c',V(1.55,F+H+1.2,-.35),'Bajar por la escalera'],['escape',V(-1.9,F+MONK+1.3,2.95),'Línea de escape (simulacro)'],
  ['well',V(.6,.9,1.95),'Bajar por el pozo (recorrido en corte)'],['cut',V(-1.2,1.2,CUT.R+1.3),'Ver el subsuelo en corte bajo el taladro'],
  ['job:cunero',V(1.25,F+1.3,1.9),'Práctica: conexiones en la mesa (cuñero)'],['job:encuelle',V(-.15,F+MONK+1.3,1.75),'Práctica: encuellar (encuellador)'],['job:patio',V(5.2,1.5,15.3),'Práctica: preparar tubería (obrero de patio)'],
  ['job:lodo',V(15.2,4.0,1.1),'Práctica: pruebas de lodo (encuellador)'],['job:consola',V(-7.2,F+1.7,-3.85),'Práctica: perforar y cerrar el pozo (perforador)'],['job:supervisor',V(-21,1.6,32),'Práctica: permiso e inspección (supervisor)'],['job:hse',V(14,1.7,39.2),'Práctica: inducción HSE y EPP']];
function spotMarker(id,pos,label){const g=new THREE.Group();g.position.copy(pos);world.add(g);
  const isInfo=id.startsWith('info:');const c=isInfo?0xf0a81c:0x62a8d4;
  const disc=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.025,24),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9}));disc.rotation.x=Math.PI/2;g.add(disc);
  const ic=new THREE.Mesh(new THREE.PlaneGeometry(.17,.17),new THREE.MeshBasicMaterial({map:textTex([isInfo?'i':'➜'],{w:128,h:128,bg:isInfo?'#f0a81c':'#62a8d4',fg:'#10161b',font:'bold 96px Georgia, serif'}),transparent:true}));ic.position.z=.014;g.add(ic);
  const lb=label3D(label||(PARTS[id.slice(5)]||{}).n||id,.2);lb.position.y=.2;g.add(lb);g.userData.lbl=lb;
  proxy(g,.5);act(g,id,label||(PARTS[id.slice(5)]||{}).n);g.userData.spot=id;g.userData.isInfo=isInfo;
  g.traverse(o=>{if(o.isMesh)o.castShadow=false});return g}

/* ---------- interfaz del recorrido ---------- */
function exploreUI(on){
  const touch=matchMedia('(pointer:coarse)').matches;$('#joy').hidden=!on||!touch;$('#useBtn').hidden=!on||!touch;$('#cross').hidden=!on;$('#prompt').hidden=true;
  if(on)setupTouchJoy();else{JOY.x=JOY.y=0;if(document.pointerLockElement)document.exitPointerLock()}}
function exploreCleanup(){if(CUT.g&&CUT.on)setCutaway(false);MODE.handAt=null;if(!MODE.walk&&!MODE.explore)return;exploreUI(false);MODE.walk=false;MODE.explore=false;stopAmbient();beepSnd(false);underground(false);camera.fov=55;camera.updateProjectionMatrix();if(MODE.console)consoleSeat(false)}

/* ---------- caminar ---------- */
function walkTick(dt){
  if(!MODE.walk)return;
  updateRigLife(dt);
  if(WALK.climb){climbTick(dt);return}
  if(RIG.derrick)RIG.derrick.g.visible=WALK.lvl!=='monkey';
  let f=0,s=0;
  if(KEYS.has('KeyW')||KEYS.has('ArrowUp'))f+=1;if(KEYS.has('KeyS')||KEYS.has('ArrowDown'))f-=1;if(KEYS.has('KeyD')||KEYS.has('ArrowRight'))s+=1;if(KEYS.has('KeyA')||KEYS.has('ArrowLeft'))s-=1;
  f+=JOY.y;s+=JOY.x;
  let yaw=CAM.fp.yaw;
  if(renderer.xr.isPresenting){
    const ses=renderer.xr.getSession();const d=V(0,0,0);camera.getWorldDirection(d);yaw=Math.atan2(-d.x,-d.z);
    if(ses)for(const src of ses.inputSources){const gp=src.gamepad;if(!gp||gp.axes.length<4)continue;const ax=gp.axes[2],ay=gp.axes[3];
      if(src.handedness==='left'){f+=-ay;s+=ax}else if(src.handedness==='right'){WALK.turnT-=dt;if(Math.abs(ax)>.7&&WALK.turnT<=0){WALK.turnT=.35;dolly.rotation.y-=Math.sign(ax)*Math.PI/4}}}}
  if(WALK.lvl!=='ground'&&!WALK.tied){f=0;s=0}
  const L=Math.hypot(f,s);if(L>1){f/=L;s/=L}
  const run=KEYS.has('ShiftLeft')||KEYS.has('ShiftRight')||L>.95&&JOY.on;
  const sp=(run?4.2:2.1)*dt,fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
  const dx=(fx*f+rx*s)*sp,dz=(fz*f+rz*s)*sp;const p=WALK.pos;
  if(L>.05){if(!tryMove(p,dx,dz)){tryMove(p,dx,0)||tryMove(p,0,dz)}WALK.bob+=dt*(run?11:7.5)*Math.min(1,L)}
  else{const s0=surfaceAt(p.x,p.z,p.y);if(s0!==null&&p.y-s0>0&&p.y-s0<DROP)p.y=s0}
  const bob=Math.sin(WALK.bob)*.035*Math.min(1,L);
  CAM.fp.pos.set(p.x,p.y+EYE_H+bob,p.z);
  if(renderer.xr.isPresenting){dolly.position.set(p.x,p.y,p.z)}
  // punto de interés más cercano
  let best=null,bd=3.2;for(const o of INTER){if(!o.userData.spot||!visibleDeep(o))continue;const q=o.getWorldPosition(V(0,0,0));const d=Math.hypot(q.x-p.x,q.z-p.z)+Math.max(0,Math.abs(q.y-(p.y+1.2))-1.2);if(d<bd){bd=d;best=o}}
  for(const o of INTER){if(!o.userData.lbl)continue;const q=o.getWorldPosition(V(0,0,0));o.userData.lbl.visible=q.distanceTo(CAM.pos)>2.4}
  MODE.near=best;const pr=$('#prompt');
  if(WALK.lvl!=='ground'&&!WALK.tied){pr.hidden=false;pr.textContent='Conéctate primero: '+(best&&best.userData.spot==='tie'?(matchMedia('(pointer:coarse)').matches?'toca «Usar»':'presiona E'):'busca el punto de anclaje')}
  else if(best){pr.hidden=false;pr.textContent=(matchMedia('(pointer:coarse)').matches?'Toca «Usar»: ':'E · ')+best.userData.label}else pr.hidden=true;
  setAmbient({level:p.y<0?.15:p.y>F+20?.3:.5,inside:p.x<-5.6&&p.x>-9.3&&p.z<-.3&&p.z>-4.5&&p.y>F-1,spm:150,rpm:60});
}
function lvlOf(y){return y>F+H-1?'crown':y>F+MONK-1?'monkey':'ground'}
function teleportYaw(pos,yaw){teleport(pos,V(pos.x-Math.sin(yaw),pos.y,pos.z-Math.cos(yaw)))}
function teleport(pos,look){WALK.pos.copy(pos);WALK.lvl=lvlOf(pos.y);WALK.climb=null;MODE.handAt=null;const y=yawTo(pos,look);fpMode(V(pos.x,pos.y+EYE_H,pos.z),y,-.1);station(pos,y);if(renderer.xr.isPresenting){dolly.position.copy(pos);dolly.rotation.y=y}}

/* ---------- módulo ---------- */
const CUT_NARR='Así se ve el pozo por debajo del taladro, en corte, como en una ilustración. Arriba, en el contrapozo, están el cabezal y las preventoras. Hacia abajo, cada revestimiento es más angosto y va cementado contra la roca. Por dentro baja la sarta: tubería de perforación, tubería extrapesada, lastrabarrenas, el MWD y la broca. El lodo baja por dentro de la tubería, sale por la broca y sube por el anular con los recortes.';
const JOBN={cunero:'Conexiones en la mesa',encuelle:'Encuelle en el encuelladero',patio:'Preparar tubería en los burros',lodo:'Pruebas de lodo y ronda',consola:'Perforar desde la consola',supervisor:'Permiso, inspección y simulacro',hse:'Inducción HSE y EPP'};
let ROAM={};
function roamPanel(){
  const keys=Object.keys(PARTS),touch=matchMedia('(pointer:coarse)').matches,seen=ROAM.seen||new Set();
  panel(head('Recorrido libre','Explora y trabaja en el taladro',`
    <p class="muted" style="font-size:14px">${touch?'Mueve el joystick para caminar y arrastra para mirar. Toca «Usar» cerca de los puntos.':'<b>W A S D</b> para caminar, <b>Shift</b> para correr, arrastra para mirar y <b>E</b> para usar. En la escalera: <b>W</b> sube y <b>S</b> baja.'} En las Meta Quest: palanca izquierda para caminar o trepar, derecha para girar y gatillo para usar.</p>
    <div class="meter"><span>Componentes vistos: <b class="mono">${seen.size} de ${keys.length}</b></span><span>Nivel: <b>${{ground:'Suelo / piso',monkey:'Encuelladero (27 m)',crown:'Corona (43 m)'}[WALK.lvl]}</b></span></div>
    <div class="eyebrow" style="margin-top:12px">Ir a</div><div class="chips">${PLACES.map((p,i)=>`<button class="pchip" type="button" data-in="tp:${i}">${p[0]}</button>`).join('')}</div>
    <div class="eyebrow">Trabajar aquí</div><div class="chips">${Object.keys(JOBN).map(k=>`<button class="pchip" type="button" data-in="job:${k}">${JOBN[k]}</button>`).join('')}</div>
    <div class="eyebrow">Componentes</div><div class="chips">${keys.map(k=>`<span class="pchip ${seen.has(k)?'seen':''}" style="cursor:default">${PARTS[k].n}</span>`).join('')}</div>
    <div class="row" style="margin-top:6px"><button class="btn sm ${CUT.on?'primary':''}" type="button" data-in="cut">${CUT.on?'Ocultar el corte del subsuelo':'Ver el subsuelo en corte'}</button>${CUT.on?'<button class="btn sm" type="button" data-in="cutview">Vista general del corte</button>':''}
    <button class="btn sm" type="button" data-in="lock" ${touch?'hidden':''}>Modo juego (ratón)</button><button class="btn sm ghost" type="button" data-in="fin">Terminar recorrido</button></div>`));
  setButtons([{t:CUT.on?'Ocultar corte':'Ver subsuelo en corte',v:'cut'},{t:'Terminar recorrido',v:'fin'}])}
function updateRigLife(dt){
  if(!MODE.explore||MODE.console)return;
  if(!RIG.stand.visible)RIG.stand.visible=true;
  const y=RIG.blockY-dt*.05;setBlock(y<7.5?15:y);placeStand();RIG.stand.rotateY(T*5%6.283);
  RIG.shakers.forEach((s,i)=>s.position.x=14.5+Math.sin(T*55+i)*.006);
  const t=T%18;RIG.hand1.anim=t<6?'work':'idle';RIG.hand2.anim=t>9&&t<14?'work':'idle';
}
async function modRecorrido(opt){
  MODE.walk=true;MODE.explore=true;startAmbient();
  tripSetup();RIG.slips.visible=true;RIG.slips.position.y=F+.12;setBlock(15);placeStand();RIG.stand.visible=true;
  ROAM={seen:new Set(),markers:SPOTS.map(([id,pos,lbl])=>temp(spotMarker(id,pos,lbl))),tie:null};
  WALK.srl=false;WALK.tied=true;WALK.climb=null;
  RIG.ins.g.visible=true;insAt(V(1.6,0,44.6));$('#cams').hidden=true;
  const resume=opt&&opt.resume;
  if(resume){if(resume.cut)setCutaway(true);teleportYaw(resume.pos,resume.yaw)}else teleport(V(0,0,47.5),V(0,8,0));
  exploreUI(true);roamPanel();
  MODE.use=()=>{if(WALK.climb){if(MODE.climbAct)dispatch(MODE.climbAct[0]);return}if(MODE.near)dispatch(MODE.near.userData.spot);else toast('No hay nada para usar aquí. Acércate a un punto ⓘ o ➜.')};
  MODE.onKey=code=>{if(code==='KeyE'&&MODE.walk)MODE.use()};
  MODE.tick=walkTick;
  if(!resume)say('Bienvenido al recorrido libre. Camina por toda la locación: sube al piso, entra a la cabina, trepa por la escalera hasta el encuelladero y la corona, o mira el pozo en corte. En los puntos verdes puedes hacer el trabajo de cada cargo.');
  for(;;){const v=await w(waitInput());
    if(v==='fin'){backToHub();return}
    if(v==='lock'){try{const r=renderer.domElement.requestPointerLock();if(r&&r.catch)r.catch(()=>toast('Este navegador no permite capturar el ratón aquí. Arrastra para mirar.'))}catch(e){toast('Arrastra para mirar.')}continue}
    if(v.startsWith('tp:')){const pl=PLACES[+v.slice(3)];if(pl[0].startsWith('Mirador')&&!CUT.on)setCutaway(true);else if(CUT.on&&pl[1].y<1&&pl[1].z>-.5&&pl[1].z<CUT.R+.5&&Math.abs(pl[1].x)<CUT.R+.5)setCutaway(false);await w(fade(()=>{teleport(pl[1],pl[2]);WALK.tied=true;removeTie()}));roamPanel();continue}
    if(v==='cut'){setCutaway(!CUT.on);roamPanel();if(CUT.on){if(WALK.lvl==='ground'&&WALK.pos.y<1&&WALK.pos.z>-.5&&WALK.pos.z<CUT.R+.5&&Math.abs(WALK.pos.x)<CUT.R+.5)await w(fade(()=>teleport(V(1.5,0,CUT.R+1.7),V(0,-14,0))));say(CUT_NARR)}continue}
    if(v==='cutview'){await cutOverview();continue}
    if(v.startsWith('cexit:')){await climbExit(v.slice(6));roamPanel();continue}
    const mk=ROAM.markers.concat(ROAM.tie?[ROAM.tie]:[]).find(m=>m.userData.spot===v);
    if(mk&&MODE.walk&&!WALK.climb){const q=mk.getWorldPosition(V(0,0,0));if(Math.hypot(q.x-WALK.pos.x,q.z-WALK.pos.z)>6.5||Math.abs(q.y-WALK.pos.y)>4){toast('Acércate más para usar: '+mk.userData.label);continue}}
    if(v.startsWith('info:')){const k=v.slice(5),pp=PARTS[k];ROAM.seen.add(k);roamPanel();
      const fw=V(-Math.sin(CAM.fp.yaw),0,-Math.cos(CAM.fp.yaw)),rt=V(Math.cos(CAM.fp.yaw),0,-Math.sin(CAM.fp.yaw));
      const ip=WALK.pos.clone().addScaledVector(fw,1.6).addScaledVector(rt,.7);const sy=surfaceAt(ip.x,ip.z,WALK.pos.y+.3);ip.y=sy==null?WALK.pos.y:sy;insAt(ip);RIG.ins.point=WP(pp.tgt);
      say(pp.narr).then(()=>{if(RIG.ins)RIG.ins.point=null});continue}
    if(v==='srl'){if(WALK.srl){toast('Ya estás conectado al bloque retráctil.');continue}WALK.srl=true;const m=ROAM.markers.find(x=>x.userData.spot==='srl');if(m)m.visible=false;clickSnd();say('Conectado al bloque retráctil. Ahora puedes subir por la escalera. Sube con tres puntos de apoyo.');continue}
    if(v==='climb'){if(!WALK.srl){say('¡Alto! No se sube sin conexión. Primero conecta tu arnés al gancho del bloque retráctil, aquí al pie de la escalera.');const m=ROAM.markers.find(x=>x.userData.spot==='srl');if(m)hot(m);continue}
      await w(fade(()=>enterClimb(0)));continue}
    if(v==='ladder:m'){await w(fade(()=>{removeTie();WALK.srl=true;enterClimb(MONK)}));say('Pasas tu conexión al bloque retráctil antes de soltar la línea de vida.');continue}
    if(v==='ladder:c'){await w(fade(()=>{removeTie();WALK.srl=true;enterClimb(H-1.3)}));continue}
    if(v==='tie'){WALK.tied=true;removeTie();clickSnd();say(WALK.lvl==='crown'?'Conectado al punto de anclaje de la corona. Puedes moverte por la plataforma.':'Conectado a la línea de vida. Ahora puedes moverte por el encuelladero.');roamPanel();continue}
    if(v==='escape'){await escapeRide();roamPanel();continue}
    if(v.startsWith('job:')){const id=v.slice(4);const ok=await ask(head('Trabajar aquí',JOBN[id],`<p>Vas a hacer la práctica <b>${JOBN[id]}</b> en este lugar. Al terminar puedes volver al recorrido donde estabas.</p>`),[{t:'Empezar la práctica',v:'go'},{t:'Seguir explorando',v:'no'}]);
      if(ok!=='go'){roamPanel();continue}
      ROAMRET={pos:WALK.climb?V(3.9,F,-.35):WALK.pos.clone(),yaw:CAM.fp.yaw,cut:CUT.on,opt:{practice:true,fromRoam:true,fromBoard:id==='encuelle'&&WALK.lvl==='monkey'}};
      openModule(id,ROAMRET.opt);return}
    if(v==='sit'){await consoleFree();roamPanel();continue}
    if(v==='well'){await wellRide();roamPanel();continue}}
}
function removeTie(){if(ROAM.tie){unact(ROAM.tie);ROAM.tie.parent&&ROAM.tie.parent.remove(ROAM.tie);ROAM.tie=null}}
function needTie(pos,label){removeTie();WALK.tied=false;const m=spotMarker('tie',pos,label);ROAM.tie=m;temp(m);hot(m)}
/* ---------- escalera del mástil (subir y bajar libremente) ---------- */
const ladderX=y=>C(1,0,y).x+.3;
function enterClimb(y){WALK.climb={y,ph:0,warned:false};WALK.lvl='ground';MODE.climbAct=null;fpMode(V(ladderX(y)+.62,F+y+1.55,-.35),Math.PI/2,.12);station(V(ladderX(y)+.62,F+y,-.35),Math.PI/2);$('#prompt').hidden=true;drawClimb()}
function drawClimb(){const a=MODE.climbAct;const c=WALK.climb;
  panel(head('Escalera del mástil','Subiendo con bloque retráctil',`<p>Altura sobre el piso: <b class="mono" id="climbH">${fmt(c.y,1)} m</b></p>
    <p class="muted" style="font-size:14px">${matchMedia('(pointer:coarse)').matches?'Joystick arriba para subir y abajo para bajar.':'<b>W</b> o ↑ para subir, <b>S</b> o ↓ para bajar.'} Mantén siempre tres puntos de apoyo.</p>
    <div class="row"><button class="btn hold" type="button" id="cUp" style="width:auto;flex:1;background:#1f3a5c;border-color:#62a8d4">Subir</button><button class="btn hold" type="button" id="cDn" style="width:auto;flex:1">Bajar</button></div>
    <ul class="steps" style="margin-top:12px"><li class="${c.y>=MONK-.7?'done':''}">Encuelladero · 26,6 m</li><li class="${c.y>=H-1.4?'done':''}">Plataforma de la corona · 43 m</li></ul>
    ${a?`<button class="btn primary" type="button" data-in="${a[0]}">${a[1]}</button>`:''}`));
  const hb=(id,d)=>{const b=$('#'+id);if(!b)return;b.addEventListener('pointerdown',()=>WALK.climb&&(WALK.climb.hold=d));['pointerup','pointercancel','pointerleave'].forEach(e=>b.addEventListener(e,()=>{if(WALK.climb&&WALK.climb.hold===d)WALK.climb.hold=0}))};hb('cUp',1);hb('cDn',-1);
  setButtons(a?[{t:a[1],v:a[0]}]:[])}
function climbTick(dt){
  const c=WALK.climb;let f=c.hold||0;
  if(KEYS.has('KeyW')||KEYS.has('ArrowUp')||KEYS.has('Space'))f+=1;if(KEYS.has('KeyS')||KEYS.has('ArrowDown'))f-=1;f+=JOY.y;
  if(renderer.xr.isPresenting){const ses=renderer.xr.getSession();if(ses)for(const s of ses.inputSources){const gp=s.gamepad;if(gp&&gp.axes.length>3)f+=-gp.axes[3]}}
  f=clamp(f,-1,1);const top=H-1.3;
  c.y=clamp(c.y+f*.62*dt,0,top);if(Math.abs(f)>.05)c.ph+=dt*Math.abs(f)*7.5;
  const lx=ladderX(c.y);CAM.fp.pos.set(lx+.62,F+c.y+1.55+Math.sin(c.ph)*.025,-.35);
  if(renderer.xr.isPresenting)dolly.position.set(lx+.62,F+c.y,-.35);
  const ry=Math.round((c.y+1.85)/.3)*.3;MODE.handAt=V(ladderX(ry)+.02,F+ry,-.35+(Math.sin(c.ph*.5)>0?.1:-.08));
  let a=null;if(Math.abs(c.y-MONK)<.75)a=['cexit:monkey','Pasar al encuelladero'];else if(c.y>=top-.05)a=['cexit:crown','Subir a la plataforma de la corona'];else if(c.y<=.02)a=['cexit:bottom','Bajarse de la escalera'];
  if((a&&a[0])!==(MODE.climbAct&&MODE.climbAct[0])){MODE.climbAct=a;drawClimb()}
  const e=$('#climbH');if(e)e.textContent=fmt(c.y,1)+' m';
  const pr=$('#prompt');if(a){pr.hidden=false;pr.textContent=(matchMedia('(pointer:coarse)').matches?'Toca «Usar»: ':'E · ')+a[1]}else pr.hidden=true;
  setAmbient({level:.3+.2*(1-c.y/H),spm:150,rpm:60})}
async function climbExit(where){
  MODE.handAt=null;
  if(where==='bottom'){await w(fade(()=>{teleport(V(3.95,F,-.35),V(0,F+1,0));WALK.srl=false;const m=ROAM.markers.find(x=>x.userData.spot==='srl');if(m)m.visible=true}));say('Te desconectas del bloque retráctil al pisar el piso.');return}
  if(where==='monkey'){await w(fade(()=>{teleport(V(1.6,F+MONK,-.15),V(0,F+MONK,1.8));needTie(V(1.05,F+MONK+2.05,.8),'Conectar a la línea de vida')}));say('Llegaste al encuelladero, a veintisiete metros. Antes de soltar el bloque retráctil, conecta tu mosquetón a la línea de vida.');return}
  if(where==='crown'){await w(fade(()=>{teleport(V(1.5,F+H+.1,-.4),V(0,F+H+.5,1.1));needTie(V(.9,F+H+1.3,-1.6),'Conectar al punto de anclaje')}));say('Estás en la plataforma de la corona, a cuarenta y tres metros. Aquí se inspeccionan y engrasan las poleas. Conéctate al punto de anclaje antes de moverte.')}}
/* ---------- línea de escape (simulacro) ---------- */
async function escapeRide(){
  const v=await ask(head('Línea de escape','¿Hacer el simulacro?','<p>La línea de escape baja desde el encuelladero hasta un punto seguro en el suelo. Solo se usa en una emergencia, cuando no es posible bajar por la escalera: un incendio o un reventón.</p><p>Te enganchas al carro, te sueltas de la línea de vida y te deslizas sentado hasta la zona de llegada.</p>'),[{t:'Sí, hacer el simulacro',v:'y'},{t:'Cancelar',v:'n'}]);
  if(v!=='y')return;
  MODE.walk=false;$('#prompt').hidden=true;
  const A=V(-2.7,F+MONK+2,2.8),B=V(-14,.4,44),yaw=yawTo(A,B),tr=DET.trolley;
  await w(fade(()=>{fpMode(A.clone().add(V(0,-1.0,0)),yaw,-.25);RIG.derrick.g.visible=true}));
  await sayW('Te enganchas al carro de la línea de escape. Desconéctate de la línea de vida y siéntate en el asiento.');
  panel(head('Línea de escape','Bajando…','<p>El freno del carro controla la velocidad y la zona de llegada tiene arena para amortiguar.</p>'));
  await w(tweenP(10,p=>{const t=.935*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2);const P=A.clone().lerp(B,t);tr.position.copy(P);CAM.fp.pos.copy(P).add(V(0,-1.05,0));MODE.handAt=P.clone().add(V(.08,-.78,0));if(renderer.xr.isPresenting)dolly.position.copy(P).add(V(0,-2.6,0))}));
  MODE.handAt=null;
  await w(fade(()=>{tr.position.copy(A);teleport(V(-14,0,42.2),V(0,10,0));WALK.tied=true;removeTie()}));
  say('Llegaste a la zona segura. En una emergencia real te diriges de inmediato al punto de encuentro y reportas al supervisor.');MODE.walk=true}
/* ---------- vista general del corte ---------- */
async function cutOverview(){
  MODE.walk=false;exploreUI(false);const back={p:WALK.pos.clone(),y:CAM.fp.yaw,l:WALK.lvl};
  cutView('top');
  panel(head('Corte del subsuelo','Vista dentro del corte','<p>Arrastra para girar y usa la rueda o pellizca para acercar.</p><div class="row"><button class="btn sm" type="button" data-in="cv:top">Contrapozo y revestimientos</button><button class="btn sm" type="button" data-in="cv:mid">Formaciones</button><button class="btn sm" type="button" data-in="cv:bit">Fondo y broca</button><button class="btn sm" type="button" data-in="cv:sup">Desde la superficie</button></div><button class="btn primary" type="button" data-in="back" style="margin-top:10px">Volver a caminar</button>'));
  setButtons([{t:'Contrapozo',v:'cv:top'},{t:'Formaciones',v:'cv:mid'},{t:'Broca',v:'cv:bit'},{t:'Volver a caminar',v:'back'}]);
  say(CUT_NARR);
  for(;;){const v=await w(waitInput());if(v==='back')break;if(v.startsWith('cv:'))cutView(v.slice(3))}
  MODE.under=false;
  stopSay();await w(fade(()=>{teleportYaw(back.p,back.y)}));exploreUI(true);MODE.walk=true;roamPanel()}
/* ---------- consola libre desde el recorrido ---------- */
async function consoleFree(){
  MODE.walk=false;exploreUI(false);$('#cross').hidden=false;consoleReset({kickEnabled:false});
  await w(fade(()=>{consoleSeat(true);camera.fov=70;camera.updateProjectionMatrix()}));
  const prevTick=MODE.tick;MODE.tick=dt=>consoleSim(dt);
  panel(head('Consola libre','Prueba los mandos',`<p>Practica sin evaluación. Apunta la <b>mira</b> a un mando: aparece un recuadro con su valor y los botones para manejarlo. También sirven la rueda del ratón, + y −, y ↑ ↓ para el malacate.</p>
    <ul class="steps"><li class="done"><b>Bombas 1 y 2</b>: perillas rojas, apoyabrazos derecho.</li><li class="done"><b>Rotaria</b>: palanca azul, apoyabrazos derecho.</li><li class="done"><b>Malacate</b>: joystick izquierdo. Adelante baja, atrás sube.</li><li class="done"><b>AUTO</b>: autoperforador con el peso de la perilla.</li></ul>
    <button class="btn primary" type="button" data-in="stand">Levantarse</button>`));setButtons([{t:'Levantarse',v:'stand'}]);
  say('Siéntete libre de probar la consola. Empieza por las bombas, luego la rotaria, y baja la sarta con el joystick hasta tocar fondo.');
  for(;;){if(await w(waitInput())==='stand')break}
  MODE.tick=prevTick;RIG.ins.face=null;CS.run=false;
  await w(fade(()=>{consoleSeat(false);camera.fov=55;camera.updateProjectionMatrix();consoleReset();setBlock(18);placeStand();teleport(V(-6.4,F,-1.0),V(-4,F+1,-1))}));
  exploreUI(true);MODE.walk=true}

/* ---------- bajada por el pozo ---------- */
const FOG0={c:0xc9d5dc,n:220,f:1300};let headLamp=null;
function underground(on){
  if(!scene)return;MODE.under=on;sky.visible=!on;scene.fog.color.set(on?0x0b0907:FOG0.c);scene.fog.near=on?1:FOG0.n;scene.fog.far=on?26:FOG0.f;scene.background=on?new THREE.Color(0x050403):null;
  if(on&&!headLamp){headLamp=new THREE.PointLight(0xfff0d8,1.4,14,1.5);camera.add(headLamp);headLamp.position.set(.2,.2,0)}if(headLamp)headLamp.visible=on;
  if(RIG.deep)RIG.deep.visible=on;sun.intensity=on?0:(NIGHT?.12:2.1)}
async function wellRide(){
  buildDeepWell();MODE.walk=false;exploreUI(false);
  const R=2.6,cx=Math.sin(CAMTH)*R,cz=Math.cos(CAMTH)*R;let y=-3.5,vy=0;const yTop=-3.5,yBot=-159.4;
  await w(fade(()=>{underground(true);fpMode(V(cx,y,cz),CAMTH,-.15);MODE.noHand=true}));
  const NARR=[[-3,'Bajamos por el pozo, visto en corte. Para que se vea mejor, el ancho está ampliado tres veces y la profundidad comprimida: cada metro que bajas aquí son unos quince metros reales.'],
    [-7,'Este tubo grande es el revestimiento conductor de treinta pulgadas. Evita que el suelo blando se derrumbe al inicio del pozo.'],
    [-20,'Adentro va el revestimiento de superficie, de trece y tres octavos. El cemento gris entre el tubo y la roca lo fija y aísla los acuíferos.'],
    [-48,'Aquí termina el revestimiento de superficie: esa es su zapata. Seguimos dentro del revestimiento intermedio, de nueve y cinco octavos.'],
    [-75,'En la lutita la roca es más dura y menos permeable. Fíjate en los recortes: el lodo los sube por el espacio anular, entre la tubería y el revestimiento.'],
    [-107,'Pasamos la zapata del revestimiento intermedio. De aquí en adelante es hueco abierto de ocho y media pulgadas: la roca queda expuesta.'],
    [-130,'Esta es la arenisca productora. Tiene gas en sus poros. Si la presión del lodo es menor que la de esta formación, el gas entra al pozo: eso es una patada.'],
    [-145,'Abajo de la tubería extrapesada están los lastrabarrenas: tubos muy pesados que ponen el peso sobre la broca.'],
    [-154,'La herramienta amarilla es el MWD: mide la dirección y la inclinación del pozo mientras se perfora y manda los datos a superficie por pulsos de lodo.'],
    [-158,'Y esta es la broca PDC. Gira, corta la roca con sus cortadores de diamante, y el lodo sale por sus boquillas para limpiar el fondo.']];
  const done=new Set();
  const dr=()=>panel(head('Bajada por el pozo','Recorrido en corte',`<p>Profundidad real aproximada: <b class="mono" id="wd">0 m</b></p><p class="muted" style="font-size:14px">Mantén presionado para bajar o subir (o usa W y S). Arrastra para mirar alrededor.</p>
    <div class="row"><button class="btn hold" type="button" id="hDown" style="width:auto;flex:1">Bajar</button><button class="btn hold" type="button" id="hUp" style="width:auto;flex:1;background:#1f3a5c;border-color:#62a8d4">Subir</button></div>
    <div class="row" style="margin-top:10px"><button class="btn sm" type="button" data-in="bot">Ir a la broca</button><button class="btn sm" type="button" data-in="top">Volver arriba</button><button class="btn sm ghost" type="button" data-in="exit">Salir del pozo</button></div>`));
  dr();setButtons([{t:'Ir a la broca',v:'bot'},{t:'Volver arriba',v:'top'},{t:'Salir del pozo',v:'exit'}]);
  let dirH=0;const hb=(id,d)=>{const b=$('#'+id);b.addEventListener('pointerdown',()=>dirH=d);['pointerup','pointercancel','pointerleave'].forEach(e=>b.addEventListener(e,()=>{if(dirH===d)dirH=0}))};hb('hDown',-1);hb('hUp',1);
  let target=null;
  MODE.tick=dt=>{let d=dirH;if(KEYS.has('KeyS')||KEYS.has('ArrowDown'))d=-1;if(KEYS.has('KeyW')||KEYS.has('ArrowUp'))d=1;d+=JOY.y;
    if(renderer.xr.isPresenting){const ses=renderer.xr.getSession();if(ses)for(const s of ses.inputSources){if(s.gamepad&&s.gamepad.axes.length>3)d+=-s.gamepad.axes[3]}}
    if(target!=null){const dy=target-y;d=Math.sign(dy)*Math.min(1,Math.abs(dy)/4);if(Math.abs(dy)<.05)target=null}
    vy=lerp(vy,d*(target!=null?12:5),1-Math.exp(-dt*3));y=clamp(y+vy*dt,yBot,yTop);
    CAM.fp.pos.set(cx,y-2.3+1.6,cz);if(renderer.xr.isPresenting)dolly.position.set(cx,y-2.3,cz);
    const e=$('#wd');if(e)e.textContent=Math.max(0,Math.round(-(y+1.5)*WELL.scale)).toLocaleString('es-CO')+' m';
    for(const[ny,t]of NARR){if(!done.has(ny)&&y<=ny+2.3){done.add(ny);say(t);break}}
    updateDeep(dt)};
  if(renderer.xr.isPresenting)station(V(cx,y-2.3,cz),CAMTH);
  for(;;){const v=await w(waitInput());if(v==='exit')break;if(v==='bot')target=yBot+1;if(v==='top')target=yTop}
  MODE.tick=walkTick;stopSay();
  await w(fade(()=>{underground(false);MODE.noHand=false;if(CUT.on)teleport(V(1.5,0,CUT.R+1.7),V(0,-14,0));else teleport(V(.2,.24,3.4),V(0,1,0))}));
  exploreUI(true);MODE.walk=true}
