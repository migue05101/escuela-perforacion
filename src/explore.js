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
  {x0:-.45,x1:.45,z0:.95,z1:3.4,h:()=>F+MONK,monkey:true},
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
  [-2.8,2.8,.95,3.45,F+MONK-.05,F+MONK+1.2,'mk1'],
].map(a=>({x0:a[0],x1:a[1],z0:a[2],z1:a[3],y0:a[4],y1:a[5],id:a[6]}));
function inHole(x,z){return Math.abs(x)<1.85&&Math.abs(z)<1.85}
function surfaceAt(x,z,y){let best=null;for(const s of WS){if(x<s.x0||x>s.x1||z<s.z0||z>s.z1)continue;if(s.hole&&inHole(x,z))continue;if(s.monkey&&!WALK.monkey)continue;const h=s.h(x,z);if(h<=y+STEP&&(best===null||h>best))best=h}return best}
function blocked(x,z,y){for(const b of BLK){if(b.id==='mk1'){if(!WALK.monkey)continue;if(x>-.45&&x<.45&&z>.95&&z<3.4)continue}
  if(x>b.x0-RAD&&x<b.x1+RAD&&z>b.z0-RAD&&z<b.z1+RAD&&y+1.75>b.y0&&y+.35<b.y1)return true}return Math.abs(x)>130||Math.abs(z)>130}
function tryMove(p,dx,dz){const nx=p.x+dx,nz=p.z+dz,s=surfaceAt(nx,nz,p.y);if(s===null||p.y-s>DROP||blocked(nx,nz,s))return false;p.x=nx;p.z=nz;p.y=s;return true}
const WALK={pos:V(0,0,47),monkey:false,bob:0,snapT:0,turnT:0};
const yawTo=(a,b)=>Math.atan2(-(b.x-a.x),-(b.z-a.z));

/* ---------- lugares y puntos de interés ---------- */
const PLACES=[
  ['Portería',V(0,0,46),V(0,10,0)],['Piso de perforación',V(2.6,F,3.6),V(0,F+1,0)],['Cabina del perforador',V(-6.3,F,-1.0),V(-7.2,F+1,-2.6)],
  ['Base de la escalera',V(4,F,-.35),V(3,F+3,-.35)],['Bajo el piso (contrapozo)',V(.2,.24,3.4),V(0,1,0)],['Tanques de lodo',V(13.4,2.63,3),V(14.5,3,-10)],
  ['Burros de tubería',V(1.8,0,18),V(5,1,19)],['Bombas de lodo',V(18,0,6),V(22,1,0)],['Generadores',V(-19,0,-3),V(-27,1,-3)]];
const SPOTS=[
  ['info:cellar',V(2.1,.95,1.4)],['info:sub',V(6.4,1.4,8.6)],['info:floor',V(2.8,F+1.4,2.6)],['info:drawworks',V(1.7,F+1.4,-2.9)],['info:doghouse',V(-4.9,F+1.6,-.6)],
  ['info:mast',V(4.2,F+1.6,.6)],['info:crown',V(.3,F+MONK+1.9,3.2)],['info:monkey',V(-.3,F+MONK+1.5,3.2)],['info:block',V(-1.5,F+1.6,2.4)],['info:bop',V(1.75,1.6,-1.2)],
  ['info:mud',V(12.2,3.9,6.2)],['info:rack',V(1.6,1.6,15.5)],
  ['sit',V(-7.6,F+1.15,-2.65),'Sentarse en la consola'],['climb',V(3.6,F+1.2,-.35),'Subir al encuelladero'],['down',V(.35,F+MONK+1.2,1.2),'Bajar por la escalera'],['well',V(.6,.9,1.95),'Bajar por el pozo']];
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
function exploreCleanup(){if(!MODE.walk&&!MODE.explore)return;exploreUI(false);MODE.walk=false;MODE.explore=false;stopAmbient();beepSnd(false);underground(false);camera.fov=55;camera.updateProjectionMatrix();if(MODE.console)consoleSeat(false)}

/* ---------- caminar ---------- */
function walkTick(dt){
  if(!MODE.walk)return;
  let f=0,s=0;
  if(KEYS.has('KeyW')||KEYS.has('ArrowUp'))f+=1;if(KEYS.has('KeyS')||KEYS.has('ArrowDown'))f-=1;if(KEYS.has('KeyD')||KEYS.has('ArrowRight'))s+=1;if(KEYS.has('KeyA')||KEYS.has('ArrowLeft'))s-=1;
  f+=JOY.y;s+=JOY.x;
  let yaw=CAM.fp.yaw;
  if(renderer.xr.isPresenting){
    const ses=renderer.xr.getSession();const d=V(0,0,0);camera.getWorldDirection(d);yaw=Math.atan2(-d.x,-d.z);
    if(ses)for(const src of ses.inputSources){const gp=src.gamepad;if(!gp||gp.axes.length<4)continue;const ax=gp.axes[2],ay=gp.axes[3];
      if(src.handedness==='left'){f+=-ay;s+=ax}else if(src.handedness==='right'){WALK.turnT-=dt;if(Math.abs(ax)>.7&&WALK.turnT<=0){WALK.turnT=.35;dolly.rotation.y-=Math.sign(ax)*Math.PI/4}}}}
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
  if(best){pr.hidden=false;pr.textContent=(matchMedia('(pointer:coarse)').matches?'Toca «Usar»: ':'E · ')+best.userData.label}else pr.hidden=true;
  setAmbient({level:p.y<0?.15:.5,inside:p.x<-5.6&&p.x>-9.3&&p.z<-.3&&p.z>-4.5&&p.y>F-1});
}
function teleport(pos,look){WALK.pos.copy(pos);WALK.monkey=pos.y>F+MONK-1;const y=yawTo(pos,look);fpMode(V(pos.x,pos.y+EYE_H,pos.z),y,-.1);station(pos,y);if(renderer.xr.isPresenting){dolly.position.copy(pos);dolly.rotation.y=y}}

/* ---------- módulo ---------- */
async function modRecorrido(){
  MODE.walk=true;MODE.explore=true;startAmbient();
  tripSetup();RIG.slips.visible=true;RIG.slips.position.y=F+.12;setBlock(18);placeStand();RIG.stand.visible=false;
  const markers=SPOTS.map(([id,pos,lbl])=>temp(spotMarker(id,pos,lbl)));
  const seen=new Set();
  RIG.ins.g.visible=true;insAt(V(1.6,0,44.6));
  teleport(V(0,0,47.5),V(0,8,0));exploreUI(true);$('#cams').hidden=true;
  const keys=Object.keys(PARTS);
  const draw=()=>panel(head('Recorrido libre','Explora el taladro',`
    <p class="muted" style="font-size:14px">${matchMedia('(pointer:coarse)').matches?'Mueve el joystick para caminar y arrastra para mirar. Toca «Usar» cerca de los puntos.':'<b>W A S D</b> para caminar, <b>Shift</b> para correr, arrastra para mirar y <b>E</b> para usar. Con el botón «Modo juego» el ratón mueve la vista.'} En las Meta Quest: palanca izquierda para caminar, derecha para girar y gatillo para usar.</p>
    <div class="meter"><span>Componentes vistos: <b class="mono">${seen.size} de ${keys.length}</b></span></div>
    <div class="eyebrow" style="margin-top:12px">Ir a</div><div class="chips">${PLACES.map((p,i)=>`<button class="pchip" type="button" data-in="tp:${i}">${p[0]}</button>`).join('')}</div>
    <div class="eyebrow">Componentes</div><div class="chips">${keys.map(k=>`<span class="pchip ${seen.has(k)?'seen':''}" style="cursor:default">${PARTS[k].n}</span>`).join('')}</div>
    <div class="row" style="margin-top:6px"><button class="btn sm" type="button" data-in="lock" ${matchMedia('(pointer:coarse)').matches?'hidden':''}>Modo juego (ratón)</button><button class="btn sm ghost" type="button" data-in="fin">Terminar recorrido</button></div>`));
  draw();setButtons([{t:'Terminar recorrido',v:'fin'}]);
  MODE.use=()=>{if(MODE.near)dispatch(MODE.near.userData.spot);else toast('No hay nada para usar aquí. Acércate a un punto ⓘ o ➜.')};
  MODE.onKey=code=>{if(code==='KeyE'&&MODE.walk)MODE.use()};
  MODE.tick=walkTick;
  await sayW('Bienvenido. Este es el recorrido libre: camina por toda la locación, sube al piso, entra a la cabina, sube al encuelladero o baja por el pozo. Los puntos amarillos tienen información y los azules son acciones.');
  for(;;){const v=await w(waitInput());
    if(v==='fin'){backToHub();return}
    if(v==='lock'){try{const r=renderer.domElement.requestPointerLock();if(r&&r.catch)r.catch(()=>toast('Este navegador no permite capturar el ratón aquí. Arrastra para mirar.'))}catch(e){toast('Arrastra para mirar.')}continue}
    if(v.startsWith('tp:')){const pl=PLACES[+v.slice(3)];await w(fade(()=>teleport(pl[1],pl[2])));continue}
    const mk=markers.find(m=>m.userData.spot===v);
    if(mk&&MODE.walk){const q=mk.getWorldPosition(V(0,0,0));if(Math.hypot(q.x-WALK.pos.x,q.z-WALK.pos.z)>6.5){toast('Acércate más para usar: '+mk.userData.label);continue}}
    if(v.startsWith('info:')){const k=v.slice(5),pp=PARTS[k];seen.add(k);draw();
      const fw=V(-Math.sin(CAM.fp.yaw),0,-Math.cos(CAM.fp.yaw)),rt=V(Math.cos(CAM.fp.yaw),0,-Math.sin(CAM.fp.yaw));
      const ip=WALK.pos.clone().addScaledVector(fw,1.6).addScaledVector(rt,.7);const sy=surfaceAt(ip.x,ip.z,WALK.pos.y+.3);ip.y=sy==null?WALK.pos.y:sy;insAt(ip);RIG.ins.point=WP(pp.tgt);
      say(pp.narr).then(()=>{if(RIG.ins)RIG.ins.point=null});continue}
    if(v==='sit'){await consoleFree();draw();setButtons([{t:'Terminar recorrido',v:'fin'}]);continue}
    if(v==='climb'){await climbLadder(true);continue}
    if(v==='down'){await climbLadder(false);continue}
    if(v==='well'){await wellRide();draw();setButtons([{t:'Terminar recorrido',v:'fin'}]);continue}}
}
async function climbLadder(up){
  MODE.walk=false;$('#prompt').hidden=true;const LX=y=>C(1,0,y).x+.95;
  if(up){say('Te conectas al bloque retráctil y subes con tres puntos de apoyo.');await w(fade(()=>{fpMode(V(LX(0),F+1.62,-.35),Math.PI/2,.25)}));
    await w(tweenP(6,p=>{const y=p*MONK;CAM.fp.pos.set(LX(y),F+1.62+y,-.35);CAM.fg.pitch=.25+Math.sin(p*40)*.02;if(renderer.xr.isPresenting)dolly.position.set(LX(y),F+y,-.35)}));
    RIG.derrick.g.visible=false;WALK.monkey=true;await w(fade(()=>teleport(V(0,F+MONK,2.6),V(0,F+MONK,-1))));say('Estás en el encuelladero, a veintisiete metros. Aquí te conectas a la línea de vida.')}
  else{await w(fade(()=>{fpMode(V(LX(MONK),F+MONK+1.62,-.35),Math.PI/2,-.3)}));await w(tweenP(5,p=>{const y=(1-p)*MONK;CAM.fp.pos.set(LX(y),F+1.62+y,-.35);if(renderer.xr.isPresenting)dolly.position.set(LX(y),F+y,-.35)}));
    WALK.monkey=false;RIG.derrick.g.visible=true;await w(fade(()=>teleport(V(4,F,-.35),V(0,F+1,0))))}
  MODE.walk=true}

/* ---------- consola libre desde el recorrido ---------- */
async function consoleFree(){
  MODE.walk=false;exploreUI(false);$('#cross').hidden=false;consoleReset({kickEnabled:false});
  await w(fade(()=>{consoleSeat(true);camera.fov=70;camera.updateProjectionMatrix()}));
  const prevTick=MODE.tick;MODE.tick=dt=>consoleSim(dt);
  panel(head('Consola libre','Prueba los mandos',`<p>Practica sin evaluación. Arrastra las palancas, el joystick y las perillas con la mano. En el computador también puedes usar ↑ ↓ para el malacate.</p>
    <ul class="steps"><li class="done"><b>Bombas 1 y 2</b>: perillas rojas, apoyabrazos derecho.</li><li class="done"><b>Rotaria</b>: palanca azul, apoyabrazos derecho.</li><li class="done"><b>Malacate</b>: joystick izquierdo. Adelante baja, atrás sube.</li><li class="done"><b>AUTO</b>: autoperforador con el peso de la perilla.</li></ul>
    <button class="btn primary" type="button" data-in="stand">Levantarse</button>`));setButtons([{t:'Levantarse',v:'stand'}]);
  say('Siéntete libre de probar la consola. Empieza por las bombas, luego la rotaria, y baja la sarta con el joystick hasta tocar fondo.');
  for(;;){if(await w(waitInput())==='stand')break}
  MODE.tick=prevTick;CS.run=false;
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
  await w(fade(()=>{underground(false);MODE.noHand=false;teleport(V(.2,.24,3.4),V(0,1,0))}));
  exploreUI(true);MODE.walk=true}
