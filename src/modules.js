/* ===================================================================== GUIONES DE LOS MÓDULOS */
const head=(eb,t,b='')=>`<div class="eyebrow">${eb}</div><h3>${t}</h3>${b}`;
const stepsHTML=(list,cur)=>`<ul class="steps">${list.map((s,i)=>`<li class="${i<cur?'done':i===cur?'now':''}">${s}</li>`).join('')}</ul>`;
const sayW=t=>w(say(t));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const sleep=ms=>w(wait(ms));
const WP=a=>V(a[0],a[1],a[2]);
function aim(obj){const p=obj.isVector3?obj:obj.getWorldPosition(V(0,0,0));const d=p.clone().sub(CAM.fp.pos);fpLook(Math.atan2(-d.x,-d.z),Math.atan2(d.y,Math.hypot(d.x,d.z)))}
function proxy(g,size,pos){const m=new THREE.Mesh(UB,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));m.scale.setScalar(size);if(pos)m.position.copy(pos);m.castShadow=false;g.add(m);return m}
function marker(pos,label){const g=new THREE.Group();g.position.copy(pos);world.add(g);const b=new THREE.Mesh(new THREE.BoxGeometry(.28,.5,.28),std(0xf0a81c,{transparent:true,opacity:.45,emissive:0x5a3a00}));g.add(b);proxy(g,.5);if(label){const l=label3D(label,.32);l.position.y=.42;g.add(l)}return g}
let TEMP=[];function temp(o){TEMP.push(o);return o}
function clearTemp(){TEMP.forEach(o=>{unact(o);o.parent&&o.parent.remove(o)});TEMP=[]}
function gauge(on,title,foot,max,lo,hi){$('#gauge').hidden=!on;if(!on)return;$('#gTitle').innerHTML=title+'<br><b class="mono" id="gVal">—</b>';$('#gFoot').textContent=foot;GAUGE={max,lo,hi};
  $('#gBand').style.bottom=(lo/max*100)+'%';$('#gBand').style.height=((hi-lo)/max*100)+'%'}
let GAUGE={max:1};
function gaugeVal(v,txt){$('#gMark').style.bottom=`calc(${clamp(v/GAUGE.max,0,1)*100}% - 1px)`;const e=$('#gVal');if(e)e.textContent=txt}

/* ---------- estado base de la escena ---------- */
function saveHome(){RIG.home=new Map();const objs=Object.values(RIG.parts).concat([RIG.fosv,RIG.fosvKey,RIG.climber.g,RIG.latch,RIG.elevLatch,RIG.coil]);objs.forEach(o=>RIG.home.set(o,{parent:o.parent,p:o.position.clone(),q:o.quaternion.clone(),s:o.scale.clone()}))}
function restoreHome(){RIG.home.forEach((h,o)=>{if(o.parent!==h.parent)h.parent.add(o);o.position.copy(h.p);o.quaternion.copy(h.q);o.scale.copy(h.s);o.visible=true})}
let NIGHT=false,nightLights=[];
function setNight(on){NIGHT=on;const u=sky.material.uniforms;u.top.value.set(on?0x0a1424:0x3f78b5);u.hor.value.set(on?0x2a3242:0xd4e0e6);u.bot.value.set(on?0x15140f:0x9c9682);
  sun.intensity=on?.12:2.1;scene.children.forEach(c=>{if(c.isHemisphereLight)c.intensity=on?.18:.55});scene.fog.color.set(on?0x1a2230:0xc9d5dc);
  if(on&&!nightLights.length){[[0,F+9,6],[10,9,-6],[-6,9,14],[0,F+20,-2]].forEach(p=>{const l=new THREE.PointLight(0xfff0d0,1.4,55,1.6);l.position.set(...p);scene.add(l);nightLights.push(l)})}
  nightLights.forEach(l=>l.visible=on);RIG.lamps.forEach(l=>l.material.emissiveIntensity=on?3:1.3)}
function resetScene(){
  restoreHome();clearTemp();setNight(false);
  RIG.mast.rotation.x=0;setBlock(10);
  for(const k in RIG.parts)RIG.parts[k].visible=true;
  RIG.tools.visible=true;RIG.crew.visible=true;RIG.derrick.g.visible=true;RIG.climber.g.visible=false;RIG.lanyard.visible=true;
  RIG.crane.visible=false;RIG.hook.visible=false;RIG.hookCab.visible=false;RIG.slings.forEach(s=>s.visible=false);
  RIG.stand.visible=false;RIG.racked.forEach(r=>world.remove(r));RIG.racked=[];RIG.string.visible=false;RIG.slips.visible=false;RIG.rope.visible=false;
  RIG.latch.rotation.x=-1.3;RIG.elevLatch.rotation.y=0;RIG.coil.visible=true;
  RIG.tongs.forEach(t=>{t.t.position.copy(t.home);t.t.rotation.y=t.home.x>0?0:Math.PI});
  RIG.kick=0;RIG.well.visible=false;groundGhost(false);MODE.under=false;RIG.fx.spray=0;RIG.fx.gas=0;MODE.alarm=false;RIG.annular.material.color.copy(lin(0xb1281c));
  RIG.people.forEach(p=>{p.anim='idle';p.point=null;p.g.rotation.z=0});RIG.hand2.g.position.set(-1.35,F,.9);ground.visible=true;RIG.mudman.g.position.set(11.4,0,-11.6);
  highlight(null);insAt(V(4.6,F,4.6));RIG.ins.face=null;
  gauge(false);$('#cams').hidden=false;MODE.tick=null;MODE.onPart=null;setSub('—');task('');
  lookFrom([44,30,52],[0,16,0]);station(V(6,F,6),.7);
}
function groundGhost(on){ground.traverse(o=>{if(o.isMesh){o.material.transparent=on;o.material.opacity=on?.22:1;o.material.depthWrite=!on}});RIG.parts.cellar.traverse(o=>{if(o.isMesh){o.material.transparent=on;o.material.opacity=on?.25:1}})}

/* ---------- utilidades de evaluación ---------- */
async function quizFlow(id){
  const Q=QUIZ[id];let ok=0;
  for(let i=0;i<Q.length;i++){const q=Q[i];say(q.q);
    const v=+(await ask(head(`Evaluación · ${i+1} de ${Q.length}`,q.q),q.o.map((o,j)=>({t:o,v:String(j)}))));
    const good=v===q.a;if(good)ok++;
    const opts=q.o.map((o,j)=>`<div class="opt ${j===q.a?'right':j===v?'wrong':''}">${o}</div>`).join('');
    say((good?'Correcto. ':'No es así. ')+q.e);
    await ask(head(`Evaluación · ${i+1} de ${Q.length}`,q.q,`<div class="list">${opts}</div><div class="fb ${good?'ok':'bad'}">${q.e}</div>`),[{t:i<Q.length-1?'Siguiente pregunta':'Ver resultado',v:'n'}]);
  }
  return Math.round(ok/Q.length*100)}
async function result(score,detail){
  const {prev,best}=complete(MODE.id,score);const ok=score>=PASS;
  say(ok?`Aprobaste con ${score} puntos. Buen trabajo.`:`Obtuviste ${score} puntos. Necesitas ${PASS} para aprobar. Repasa y vuelve a intentarlo.`);
  const v=await ask(`<div class="eyebrow">Resultado</div><div class="score mono" style="color:var(${ok?'--ok':'--bad'})">${score}</div>
    <p><span class="chip ${ok?'ok':'bad'}">${ok?'Aprobado':'No aprobado'}</span> <span class="muted">Mínimo ${PASS} · Mejor: ${best}${prev!=null&&score>prev?' (nuevo récord)':''}</span></p>${detail?`<p class="muted">${detail}</p>`:''}`,
    [{t:'Repetir el módulo',v:'retry'},{t:'Volver a los módulos',v:'hub'}]);
  if(v==='retry')openModule(MODE.id);else backToHub()}
async function startChoice(title,txt){return ask(head('Cómo empezar',title,`<p>${txt}</p>`),[{t:'Ver la explicación y la demostración (recomendado)',v:'demo'},{t:'Ir directo a la práctica',v:'practice'}])}

/* ===================================================================== 1 · HSE */
const HSE_STEPS=['Bienvenida','Ponte el EPP','Línea de fuego','Trabajo en alturas','Alarma de H2S','Autoridad para detener','Evaluación'];
function buildEPPItems(){
  const e=RIG.eppStation,items={};
  EPP.forEach((it,i)=>{const g=new THREE.Group();g.position.set(-1.6+i*.355,.94,-.6);e.add(g);items[it.k]=g;temp(g);
    const hm=c=>std(c,{roughness:.5,metalness:.05});
    if(it.k==='casco'){const d=new THREE.Mesh(new THREE.SphereGeometry(.14,20,10,0,Math.PI*2,0,Math.PI/2),hm(0xf2d22e));g.add(d);cyl(g,.17,.17,.012,hm(0xf2d22e),0,0,.02,24)}
    if(it.k==='gafas'){box(g,.17,.05,.02,std(0x2a3640,{metalness:.6,roughness:.1,transparent:true,opacity:.7}),0,.03,0);box(g,.02,.012,.14,hm(0x222222),-.085,.03,-.07);box(g,.02,.012,.14,hm(0x222222),.085,.03,-.07)}
    if(it.k==='auditiva'){for(const s of[-1,1])cyl(g,.05,.05,.04,hm(0xd23b2a),s*.08,.06,0,16,'x');const b=new THREE.Mesh(new THREE.TorusGeometry(.085,.012,6,16,Math.PI),hm(0x222222));b.position.y=.06;g.add(b)}
    if(it.k==='guantes'){for(const s of[-1,1]){box(g,.09,.03,.13,hm(0xe0b23a),s*.06,.02,0);for(let f=0;f<4;f++)box(g,.016,.02,.06,hm(0xe0b23a),s*.06-.03+f*.02,.02,-.09)}}
    if(it.k==='botas'){for(const s of[-1,1]){box(g,.1,.07,.24,hm(0x3a2618),s*.065,.035,.02);box(g,.09,.18,.09,hm(0x3a2618),s*.065,.12,.08)}}
    if(it.k==='overol'){box(g,.36,.08,.26,hm(0xd8661c),0,.04,0);box(g,.37,.012,.04,std(0xd8dcd4,{emissive:0x333333}),0,.085,-.04)}
    if(it.k==='reloj'){cyl(g,.03,.03,.012,std(0xc9c9c9,{metalness:.9,roughness:.2}),0,.01,0,20);box(g,.03,.006,.16,hm(0x222222),0,.004,0)}
    if(it.k==='anillo'){const t=new THREE.Mesh(new THREE.TorusGeometry(.022,.007,8,20),std(0xd4af37,{metalness:1,roughness:.2}));t.rotation.x=Math.PI/2;t.position.y=.01;g.add(t)}
    if(it.k==='cadena'){for(let c=0;c<6;c++){const t=new THREE.Mesh(new THREE.TorusGeometry(.012,.004,6,10),std(0xd4af37,{metalness:1,roughness:.2}));t.position.set(-.05+c*.02,.006,Math.sin(c)*.02);t.rotation.x=c%2?Math.PI/2:0;g.add(t)}}
    if(it.k==='gorra'){const d=new THREE.Mesh(new THREE.SphereGeometry(.09,16,8,0,Math.PI*2,0,Math.PI/2),hm(0x1f4f8a));g.add(d);box(g,.12,.01,.08,hm(0x1f4f8a),0,.005,.1)}
    const l=label3D(it.n,.3);l.position.y=i%2?.42:.26;g.add(l);proxy(g,.3,V(0,.1,0));act(g,it.k,it.n)});
  return items}
async function modHSE(){
  let errs=0;
  // 1. bienvenida en la portería
  insAt(V(1.4,0,49.6));station(V(0,0,55),0);
  CAM.mode='cine';CAM.pos.set(-1,1.7,56);CAM.tgt.set(1,1.6,49);
  const draw=(i,extra='')=>panel(head('Módulo 1 · Inducción HSE',HSE_STEPS[i],stepsHTML(HSE_STEPS,i)+extra));
  draw(0);w(cineTo(V(-1.2,1.7,54),V(1.4,1.5,49.6),2));
  await sayW('Hola, soy Ramiro Cárdenas, instructor de seguridad. Bienvenido a la locación de perforación.');
  await sayW('Antes de pisar el taladro vamos a practicar cinco cosas que te mantienen vivo: el equipo de protección, la línea de fuego, el trabajo en alturas, el gas H2S y la autoridad para detener.');
  // 2. EPP en primera persona
  await w(fade(()=>{fpMode(V(14,1.68,41.3),0,-.62);insAt(V(17.2,0,40.6));station(V(14,0,41.3),0);$('#cams').hidden=true}));
  const items=buildEPPItems();let got=0;const have=new Set();
  const list=()=>`<ul class="steps">${EPP.filter(e=>e.ok).map(e=>`<li class="${have.has(e.k)?'done':''}">${e.n}</li>`).join('')}</ul>`;
  draw(1,list());task('Toca los elementos de EPP que debes ponerte');
  await sayW('Esta es la estación de EPP. Toca, uno por uno, los elementos que debes ponerte para trabajar en el piso de perforación. Ojo: en la mesa también hay cosas que no deben ir.');
  while(got<6){const v=await w(waitInput());const it=EPP.find(e=>e.k===v);if(!it)continue;const o=items[v];
    if(it.ok){got++;have.add(v);unact(o);const y0=o.position.y;tween(.6,p=>{o.position.y=y0+p*.5;o.scale.setScalar(1-p*.9)},()=>o.visible=false);draw(1,list());say(it.f)}
    else{errs++;const x0=o.position.x;tween(.5,p=>o.position.x=x0+Math.sin(p*25)*.02*(1-p));draw(1,list()+`<div class="fb bad">${it.f}</div>`);await sayW(it.f)}}
  await sayW('Muy bien, ya tienes el EPP completo. Revísalo antes de cada turno: un casco golpeado o unos guantes rotos ya no protegen.');
  // 3. línea de fuego
  task('');
  RIG.crane.visible=true;const bundle=temp(new THREE.Group());world.add(bundle);for(let i=0;i<5;i++)cyl(bundle,.09,.09,9,MAT.pipe,(i-2)*.2,0,0,10,'z');const hp=V(8.2,6.5,19);
  const setB=p=>{craneHook(p.clone().add(V(0,1.6,0)));bundle.position.copy(p);RIG.slings.forEach((s,i)=>{s.visible=i<2;if(i<2)orient(s,p.clone().add(V(0,1.6,0)),p.clone().add(V(0,.1,i?3.5:-3.5)),.02)})};setB(hp);
  await w(fade(()=>{lookFrom([20,7,34],[7,1.5,19]);insAt(V(14,0,27));station(V(14,0,30),.5);$('#cams').hidden=false}));
  const mA=temp(marker(V(8.2,.25,19),'A')),mB=temp(marker(V(5.9,.25,19),'B')),mC=temp(marker(V(13,.25,24.5),'C'));act(mA,'A','Posición A');act(mB,'B','Posición B');act(mC,'C','Posición C');
  const cones=[];for(let i=0;i<7;i++){cones.push(temp(cyl(world,.02,.16,.45,std(0xe2531f),10.5+i*.7,.22,22.5,12)))}
  draw(2,'<p>Toca la letra donde te ubicarías mientras la grúa mueve la carga.</p>');task('Toca A, B o C');
  await sayW('La grúa va a llevar este paquete de tubería hasta el burro. Toca la letra donde te ubicarías mientras se hace la maniobra.');
  for(;;){const v=await w(waitInput());if(v==='C'){unact(mA);unact(mB);unact(mC);break}
    errs++;await sayW(v==='A'?'No. En la posición A quedas debajo de una carga suspendida: si una eslinga falla, la carga cae sobre ti.':'No. En la posición B quedas entre la carga y el burro: si la carga se balancea, te aplasta.')}
  say('Correcto. Fuera de la trayectoria y detrás de la cinta. Si hay que guiar la carga, se hace con cabo, nunca con las manos.');
  await w(tweenP(4,p=>setB(V(lerp(8.2,4.2,p),6.5-Math.sin(p*Math.PI)*.5-p*5.2,19))));
  await sleep(1500);RIG.crane.visible=false;RIG.hook.visible=false;RIG.hookCab.visible=false;RIG.slings.forEach(s=>s.visible=false);
  // 4. alturas
  task('');const cl=RIG.climber;cl.g.visible=true;cl.anim='climb';const LX=y=>C(1,0,y).x+.62;
  w(cineTo(V(13,F+6,4),V(2.6,F+5,-.35),2.4,false));draw(3);insAt(V(4.8,F,2.6));
  tween(9,p=>{const y=.2+p*9;cl.g.position.set(LX(y),y,-.35)});
  await sayW('Mira al encuellador subiendo. Va conectado al bloque retráctil, que frena una caída en centímetros. En Colombia, todo trabajo desde dos metros de altura exige curso vigente, arnés de cuerpo completo y permiso firmado.');
  let v=await ask(head('Trabajo en alturas','¿En qué momento puede desconectarse el encuellador mientras está en altura?'),[{t:'Cuando llega al encuelladero, para moverse mejor',v:'a'},{t:'Nunca: debe estar conectado el 100 % del tiempo',v:'b'},{t:'Si tiene más de cinco años de experiencia',v:'c'}]);
  if(v!=='b'){errs++;await sayW('No. En altura se trabaja conectado el cien por ciento del tiempo: al subir con el bloque retráctil, y arriba con la línea de vida.')}else await sayW('Correcto. Cien por ciento conectado: al subir con el bloque retráctil, y arriba con la línea de vida.');
  cl.anim='idle';cl.g.visible=false;
  // 5. H2S
  draw(4);MODE.alarm=true;RIG.fx.gas=1;
  w(cineTo(V(-40,26,-6),V(-8,0,-18),3,false));insAt(V(-10,0,-30));
  const pe1=RIG.pe[0],pe2=RIG.pe[1];proxy(pe1,2.4,V(0,2,0));proxy(pe2,2.4,V(0,2,0));act(pe1,'pe1','Punto de encuentro 1');act(pe2,'pe2','Punto de encuentro 2');
  task('Toca el punto de encuentro al que debes ir');
  await sayW('¡Alarma de H2S! Suspende lo que estás haciendo. Mira la manga de viento: indica que el viento viene del norte. Toca el punto de encuentro al que debes ir.');
  for(;;){const v2=await w(waitInput());if(v2==='pe1')break;if(v2==='pe2'){errs++;await sayW('No. El punto de encuentro dos queda a favor del viento: el gas va hacia allá. Busca el que queda contra el viento.')}}
  unact(pe1);unact(pe2);
  await sayW('Correcto: contra el viento. Y recuerda que el H2S es más pesado que el aire: nunca te refugies en el contrapozo ni en zonas bajas.');
  MODE.alarm=false;RIG.fx.gas=0;task('');
  // 6. autoridad para detener
  draw(5);w(cineTo(V(6,F+3.2,8),V(0,F+1,0),2.4,false));insAt(V(2.6,F,3.4));
  await sayW('Por último, la regla más importante: cualquier persona, sin importar su cargo, puede y debe detener un trabajo que vea inseguro, sin represalias. Y reporta los casi accidentes: son la información que evita el próximo accidente.');
  // 7. evaluación
  draw(6);await sayW('Ahora una evaluación corta.');
  const q=await quizFlow('hse');const prac=Math.max(0,100-errs*10);
  await result(Math.round(q*.6+prac*.4),`Práctica: ${prac} puntos (${errs} error${errs===1?'':'es'}). Evaluación: ${q} puntos.`)}

/* ===================================================================== 2 · CONOCE EL TALADRO */
async function modTaladro(){
  const seen=new Set();let cur=null,tour=false,EXP=0;
  const keys=Object.keys(PARTS);
  const draw=()=>{const p=cur&&PARTS[cur];panel(head(`Recorrido · ${seen.size} de ${keys.length} vistos`,p?p.n:'Recorre el equipo',
    `<p class="${p?'':'muted'}">${p?'Escucha al instructor. Puedes girar la cámara mientras habla.':'Toca un componente en la escena o elígelo en la lista. El instructor va hasta allá y te lo explica.'}</p>
    <div class="chips">${keys.map(k=>`<button class="pchip ${k===cur?'on':seen.has(k)?'seen':''}" type="button" data-in="p:${k}">${PARTS[k].n}</button>`).join('')}</div>
    <div class="row"><button class="btn" type="button" data-in="tour">Recorrido guiado completo</button><button class="btn ${seen.size>=6?'primary':''}" type="button" data-in="quiz">Iniciar evaluación</button></div>
    ${seen.size<6?'<p class="muted" style="font-size:13px;margin-top:8px">Recomendado: conoce al menos 6 componentes antes de la evaluación.</p>':''}`))};
  const explain=async k=>{const id=++EXP;cur=k;seen.add(k);draw();highlight(k);const p=PARTS[k];
    const st=WP(p.st);if(RIG.ins.g.position.distanceTo(st)<14)insWalk(st);else insAt(st);RIG.ins.point=WP(p.tgt);
    w(cineTo(WP(p.cam),WP(p.tgt),2.2,false));await sayW(p.narr);if(id===EXP){RIG.ins.point=null}};
  MODE.onPart=k=>dispatch('p:'+k);
  draw();lookFrom([44,30,52],[0,16,0]);insAt(V(4.6,F,4.6));
  await sayW('Bienvenido al taladro. Toca cualquier componente, o elígelo en la lista, y te explico para qué sirve. Si prefieres, te doy el recorrido completo.');
  for(;;){const v=await w(waitInput());
    if(v.startsWith('p:')){explain(v.slice(2)).catch(e=>{if(e!==ABORT)console.error(e)});continue}
    if(v==='tour'){for(const k of keys){await explain(k)}await sayW('Ese fue el recorrido completo. Puedes repasar cualquier componente o pasar a la evaluación.');continue}
    if(v==='quiz')break}
  MODE.onPart=null;highlight(null);RIG.ins.point=null;lookFrom([30,20,36],[0,12,0]);
  const q=await quizFlow('taladro');await result(q,`Componentes explorados: ${seen.size} de ${keys.length}.`)}

/* ===================================================================== 3 · ARMADO DEL EQUIPO */
const RIG_CAM={cellar:[[8,5,10],[0,-1,0]],sub:[[26,13,26],[0,3,0]],floor:[[24,17,24],[0,F,0]],drawworks:[[16,16,8],[0,F,-4]],doghouse:[[8,14,16],[-7,F,-2]],mast:[[36,20,14],[0,F,-20]],crown:[[14,15,-28],[0,F,-40]],
  block:[[16,14,-6],[0,F,-12]],raise:[[48,26,34],[0,16,-6]],bop:[[9,3.5,10],[0,1.5,0]],mud:[[2,15,-28],[15,2,-4]],rack:[[16,10,38],[0,1,18]]};
function rigEmpty(){for(const k in RIG.parts)RIG.parts[k].visible=false;RIG.mast.rotation.x=-Math.PI/2;RIG.tools.visible=false;RIG.crew.visible=false;RIG.crane.visible=true;craneHook(V(14,14,-10));setBlock(10)}
function slings(g,bb,p){const top=bb.max.y,c=[[bb.min.x,bb.min.z],[bb.max.x,bb.min.z],[bb.min.x,bb.max.z],[bb.max.x,bb.max.z]];RIG.slings.forEach((s,i)=>{s.visible=true;orient(s,p,V(c[i][0],top,c[i][1]),.025)})}
async function liftPiece(key,mode){
  const g=RIG.parts[key],h=RIG.home.get(g);g.visible=true;
  if(g.parent!==h.parent)h.parent.add(g);g.position.copy(h.p);g.quaternion.copy(h.q);if(key==='mast')g.rotation.x=-Math.PI/2;g.updateMatrixWorld(true);
  world.attach(g);const fin=g.position.clone();const bb0=new THREE.Box3().setFromObject(g);
  const off={x:(bb0.min.x+bb0.max.x)/2-fin.x,z:(bb0.min.z+bb0.max.z)/2-fin.z,top:bb0.max.y-fin.y,bot:bb0.min.y-fin.y};
  const start=V(26-off.x,-off.bot+.25,-30-off.z);const hy=Math.max(fin.y+off.top,start.y+off.top)+6;
  const place=p=>{g.position.copy(p);const bb=new THREE.Box3(V(bb0.min.x-fin.x+p.x,bb0.min.y-fin.y+p.y,bb0.min.z-fin.z+p.z),V(bb0.max.x-fin.x+p.x,bb0.max.y-fin.y+p.y,bb0.max.z-fin.z+p.z));
    const hk=V(p.x+off.x,bb.max.y+4,p.z+off.z);craneHook(hk);slings(g,bb,V(hk.x,hk.y,hk.z))};
  place(start);await sleep(300);
  const up=V(start.x,hy-off.top,start.z),over=V(fin.x,hy-off.top,fin.z);
  await w(tweenP(2.2,p=>place(start.clone().lerp(up,p))));
  await w(tweenP(3,p=>place(up.clone().lerp(over,p))));
  if(mode==='auto'){await w(tweenP(2.2,p=>place(over.clone().lerp(fin,p))))}
  else{panel(head('Grúa · '+PARTS_N(key),'Baja la pieza despacio',`<p>Mantén presionado el botón mientras la pieza baja. Suelta si necesitas detenerla.</p><button class="btn hold" type="button">Mantener: bajar</button>`));
    setButtons([{t:'Mantener: BAJAR',v:'HOLD'}]);task('Mantén presionado BAJAR');
    const cur=over.clone();await w(new Promise(res=>{MODE.tick=dt=>{if(HOLD.on){cur.y=Math.max(fin.y,cur.y-1.8*dt);place(cur);if(cur.y<=fin.y+1e-3){MODE.tick=null;res()}}}}));setButtons([]);task('')}
  h.parent.attach(g);g.position.copy(h.p);g.quaternion.copy(h.q);if(key==='mast')g.rotation.x=-Math.PI/2;RIG.slings.forEach(s=>s.visible=false);craneHook(V(fin.x+off.x,fin.y+off.top+8,fin.z+off.z));
}
const PARTS_N=k=>(PARTS[k]||{n:k}).n;
async function pinStep(points,title){
  const pins=points.map((p,i)=>{const g=temp(new THREE.Group());g.position.copy(p).add(V(.45,0,0));world.add(g);cyl(g,.08,.08,.5,MAT.galv,0,0,0,12,'x');cyl(g,.13,.13,.06,MAT.red,.27,0,0,12,'x');proxy(g,.6);act(g,'pin'+i,'Pasador');hot(g);return g});
  const left=new Set(pins.map((_,i)=>'pin'+i));
  panel(head('Asegurar',title||'Instala los pasadores',`<p>Toca cada pasador que brilla para meterlo y asegurarlo con su chaveta. Faltan <b class="mono">${left.size}</b>.</p>`));task('Toca cada pasador');
  while(left.size){const v=await w(waitInput());if(!left.has(v))continue;left.delete(v);const g=pins[+v.slice(3)];unact(g);const x0=g.position.x;tween(.4,p=>g.position.x=x0-p*.38);
    panel(head('Asegurar',title||'Instala los pasadores',`<p>Toca cada pasador que brilla para meterlo y asegurarlo con su chaveta. Faltan <b class="mono">${left.size}</b>.</p>`))}
  task('')}
async function doStep(s,mode){
  if(s.kind==='appear'){const g=RIG.parts.cellar;g.visible=true;g.scale.y=.01;await w(tweenP(1.6,p=>g.scale.y=Math.max(.01,p)));g.scale.y=1}
  else if(s.kind==='crane'){const keys=s.k==='crown'?['crown','monkey']:[s.k];for(const k of keys)await liftPiece(k,mode);
    if(mode==='hold'&&s.pins){const L=k=>RIG.parts[s.k].localToWorld(k);let pts;
      if(s.k==='sub')pts=[V(-5.1,.7,-6.1),V(5.1,.7,-6.1),V(-5.1,.7,6.1),V(5.1,.7,6.1)];
      else if(s.k==='floor')pts=[V(-5.4,F-.5,-5.8),V(5.4,F-.5,-5.8),V(-5.4,F-.5,5.8),V(5.4,F-.5,5.8)];
      else if(s.k==='mast')pts=[L(C(-1,1,.3)),L(C(1,1,.3)),L(C(-1,0,.3)),L(C(1,0,.3))];
      else pts=[L(V(-1.7,H,-1.7)),L(V(1.7,H,-1.7)),L(V(-1.7,H,1.3)),L(V(1.7,H,1.3))];
      await pinStep(pts,'Pinea: '+s.t)}}
  else if(s.kind==='string'){const g=RIG.parts.block;g.visible=true;await w(tweenP(2.5,p=>setBlock(lerp(3,10,p))));
    if(mode==='hold'){const a=temp(new THREE.Group());world.add(a);a.position.set(-3.1,F+.3,-3.8);proxy(a,1);act(a,'anchor','Ancla de la línea muerta');hot(a);
      panel(head('Guarnido','Asegura la línea muerta','<p>Toca el ancla de la línea muerta, en la subestructura, para fijar el extremo del cable.</p>'));task('Toca el ancla de la línea muerta');
      w(cineTo(V(4,F+4,2),V(-3.1,F,-3.8),2,false));for(;;){if(await w(waitInput())==='anchor')break}unact(a);task('')}}
  else if(s.kind==='raise'){
    if(mode==='hold'){
      const v=await ask(head('Antes de izar','¿Qué se verifica justo antes de izar el mástil?'),[{t:'Que el área esté despejada: nadie debajo del mástil ni en la línea del cable',v:'ok'},{t:'Que la cuadrilla esté cerca para ayudar a empujar',v:'x'},{t:'Nada: el perforador ya sabe cómo hacerlo',v:'y'}]);
      if(v!=='ok'){MODE.st.errs++;await sayW('No. Antes de izar se despeja el área: nadie debajo del mástil ni en la línea del cable. Si algo falla, el mástil cae sobre esa zona.')}else await sayW('Correcto. Área despejada y todos fuera de la línea de fuego.');
      panel(head('Izado','Iza el mástil con el malacate','<p>Mantén presionado el botón. El perforador iza despacio y sin detenerse; suelta solo si ves algo raro.</p><button class="btn hold" type="button">Mantener: izar</button>'));
      setButtons([{t:'Mantener: IZAR',v:'HOLD'}]);task('Mantén presionado IZAR');
      let a=-Math.PI/2;await w(new Promise(res=>{MODE.tick=dt=>{if(HOLD.on){a=Math.min(0,a+dt*.2);RIG.mast.rotation.x=a;RIG.drum.rotation.x+=dt*3;if(a>=0){MODE.tick=null;res()}}}}));
      setButtons([]);task('');await pinStep([RIG.mast.localToWorld(C(-1,1,.4)),RIG.mast.localToWorld(C(1,1,.4))],'Asegura el mástil con los pasadores de seguridad')}
    else await w(tweenP(7,p=>{RIG.mast.rotation.x=-Math.PI/2*(1-p);RIG.drum.rotation.x+=.05}));
    RIG.mast.rotation.x=0;RIG.tools.visible=true;RIG.crew.visible=true}
  else if(s.kind==='trolley'){const g=RIG.parts.bop;g.visible=true;const h=RIG.home.get(g);await w(tweenP(3,p=>g.position.set(h.p.x+(1-p)*9,h.p.y,h.p.z)));g.position.copy(h.p)}
}
async function modRigup(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Armado del equipo','Primero puedes ver cómo se arma un taladro paso a paso: qué pieza va, por qué va en ese orden y quién lo hace. Después diriges tú el armado.');
  insAt(V(11,0,10));
  if(how==='demo'){
    rigEmpty();lookFrom([46,28,40],[2,4,-10]);
    await sayW('Vas a ver el armado completo de un taladro. Fíjate en el orden: cada pieza necesita que otras ya estén en su sitio. Te explico también quién hace cada tarea.');
    for(let i=0;i<RIGUP.length;i++){const s=RIGUP[i];const cm=RIG_CAM[s.k];
      panel(head(`Demostración · paso ${i+1} de ${RIGUP.length}`,s.t,`<p>${s.why}</p><div class="fb info"><b>Quién lo hace:</b> ${s.who}</div>`+stepsHTML(RIGUP.map(x=>x.t),i)+`<button class="btn" type="button" data-in="skip">Saltar demostración</button>`));
      w(cineTo(WP(cm[0]),WP(cm[1]),2.2,false));RIG.ins.point=WP(cm[1]);
      const r=await w(Promise.race([Promise.all([say(s.narr),doStep(s,'auto')]),waitInput()]));if(r==='skip'){openModule(MODE.id,{practice:true});return}}
    RIG.ins.point=null;
    await sayW('Así se arma un taladro. Ahora es tu turno de dirigir el armado.')}
  // práctica
  newStage();rigEmpty();insAt(V(11,0,10));lookFrom([46,28,40],[2,4,-10]);
  const st={errs:0};MODE.st=st;const done=[];
  await sayW('Ahora diriges tú. En cada paso elige qué va, baja la pieza con la grúa y asegúrala con los pasadores. Si te equivocas de orden, te digo qué falta.');
  while(done.length<RIGUP.length){
    const left=RIGUP.filter(s=>!done.includes(s.k));
    const hd=head(`Práctica · ${done.length} de ${RIGUP.length} instalados`,'¿Qué se instala ahora?',`<div class="meter"><span>Errores: <b class="mono">${st.errs}</b></span><span>Puntaje: <b class="mono">${Math.max(0,100-st.errs*6)}</b></span></div>`)+
      (done.length?stepsHTML(done.map(k=>RIGUP.find(s=>s.k===k).t),done.length):'');
    const v=await ask(hd,shuffle(left).map(s=>({t:s.t,v:s.k})));const s=RIGUP.find(x=>x.k===v);const miss=s.pre.filter(p=>!done.includes(p));
    if(miss.length){st.errs++;panel(hd+`<div class="fb bad"><b>Todavía no.</b> Antes necesitas: ${miss.map(m=>RIGUP.find(x=>x.k===m).t).join(', ')}.</div>`);await sayW('Todavía no. Antes necesitas: '+miss.map(m=>RIGUP.find(x=>x.k===m).t).join(', ')+'. '+s.why);continue}
    const cm=RIG_CAM[s.k];w(cineTo(WP(cm[0]),WP(cm[1]),2,false));say('Bien. '+s.why);
    await doStep(s,'hold');done.push(s.k)}
  await sayW('¡Excelente! El taladro quedó armado y listo para iniciar la perforación.');
  await result(Math.max(0,100-st.errs*6),`${st.errs} error${st.errs===1?'':'es'} de secuencia o de seguridad.`)}
function newStage(){clearTemp();RIG.home.forEach((h,o)=>{if(RIG.parts[o.name]===o){if(o.parent!==h.parent)h.parent.add(o);o.position.copy(h.p);o.quaternion.copy(h.q);o.scale.copy(h.s)}})}

/* ===================================================================== 4 · ENCUELLE */
const TRIP_ACTS=['up','stop','down','cuerda','elevador','peine','pestillo'];
const EYE=()=>V(0,F+MONK+1.62,1.12);
const standTop=()=>V(0,elevY()+.25,0);
const SB=i=>V(SX(i),F+.2,1.62),SLOT=i=>V(SX(i),F+.2+LEN,SLOTZ);
function placeStand(){const t=standTop();setStand(RIG.stand,V(0,t.y-LEN,0),t)}
function tripSetup(){RIG.string.visible=true;RIG.stand.visible=true;setBlock(.9+EOFF);placeStand();RIG.racked.forEach(r=>world.remove(r));RIG.racked=[];RIG.latch.rotation.x=0;RIG.elevLatch.rotation.y=0;RIG.slips.visible=false;RIG.rope.visible=false;RIG.coil.visible=true}
function tripActs(i){
  const coil=RIG.coil;if(!coil.userData.px){proxy(coil,.38);coil.userData.px=1}
  if(!RIG.elevLatch.userData.px){proxy(RIG.elevLatch,.42,V(0,0,.1));RIG.elevLatch.userData.px=1}
  if(!RIG.latch.userData.px){proxy(RIG.latch,.32,V(0,0,.15));RIG.latch.userData.px=1}
  for(const b of[RIG.btnUp,RIG.btnStop,RIG.btnDown])if(!b.userData.px){proxy(b,.16);b.userData.px=1}
  const slot=temp(marker(SLOT(i).add(V(0,-.3,0)),'Peine'));
  const snap=RIG.lanyard;
  act(RIG.btnUp,'up','Señal: SUBIR');act(RIG.btnStop,'stop','Señal: PARAR');act(RIG.btnDown,'down','Señal: BAJAR');
  act(coil,'cuerda','Cuerda de encuelle');act(RIG.elevLatch,'elevador','Manija del elevador');act(slot,'peine','Espacio libre en el peine');act(RIG.latch,'pestillo','Pestillo del peine');act(snap,'soltar','Mosquetón de tu línea de vida');
  return {up:RIG.btnUp,stop:RIG.btnStop,down:RIG.btnDown,cuerda:coil,elevador:RIG.elevLatch,peine:slot,pestillo:RIG.latch}}
async function floorAuto(i,narr){
  RIG.hand1.anim='work';RIG.hand2.anim='work';
  if(narr)say('Abajo, los cuñeros sientan las cuñas: la sarta queda sostenida en la mesa rotaria.');
  RIG.slips.visible=true;await w(tweenP(1,p=>RIG.slips.position.y=F+.6-p*.48));if(narr)await sleep(2600);
  if(narr)say('Con la llave de fuerza quiebran la conexión y la desenroscan.');
  const tg=RIG.tongs[0],h=tg.home.clone(),to=V(.72,F+1.0,0);await w(tweenP(1.1,p=>tg.t.position.lerpVectors(h,to,p)));await w(tweenP(.9,p=>tg.t.rotation.y=p*.7));
  const y0=RIG.blockY;await w(tweenP(.8,p=>{setBlock(y0+p*.35);placeStand()}));await w(tweenP(1,p=>{tg.t.position.lerpVectors(to,h,p);tg.t.rotation.y=.7*(1-p)}));
  if(narr){await sleep(1200);say('Ahora empujan la base de la parada y la asientan en el setback, sobre la madera.')}
  const b0=V(0,standTop().y-LEN,0),b1=SB(i),yA=RIG.blockY,yB=F+.2+LEN-.25-F+EOFF;
  await w(tweenP(2.2,p=>{setBlock(lerp(yA,yB,p));const base=b0.clone().lerp(b1,p);setStand(RIG.stand,base,standTop())}));
  RIG.hand1.anim='idle';RIG.hand2.anim='idle';if(narr)await sleep(1500)}
async function standCycle(i,mode,st){
  const A=MODE.acts,auto=mode==='auto',guided=mode==='guided';
  const HT={up:'Pide al perforador que suba el bloque: toca SUBIR en el tablero de señales, a tu derecha.',
    stop:'Toca PARAR cuando el elevador llegue a tu altura de trabajo, la franja verde del indicador.',
    cuerda:'Enlaza la parada: toca la cuerda de encuelle, enrollada en la baranda de tu izquierda.',
    elevador:'Ahora abre el elevador: toca su manija roja.',
    peine:'Jala la parada hacia los peines: toca el espacio libre que brilla entre los peines, a tu izquierda.',
    pestillo:'Asegura la parada: cierra el pestillo del peine.',
    down:'Listo. Pide al perforador que baje el bloque: toca BAJAR.'};
  const exp=async k=>{
    if(auto)return;const obj=A[k];if(CAM.mode==='fp'&&guided)aim(obj);if(guided){hot(obj);await sayW(HT[k])}
    drawTrip(i,st,k);
    for(;;){const v=await w(waitInput());
      if(v==='HINT'){st.hints++;hot(obj);if(CAM.mode==='fp')aim(obj);await sayW(HT[k]);continue}
      if(v===k){hot(obj,false);return}
      if(v==='soltar'){if(!guided)st.errs+=3;drawTrip(i,st,k);await sayW('¡Alto! Nunca te sueltes de la línea de vida en el encuelladero. Eso es un error grave: una caída desde aquí es mortal.');continue}
      if(TRIP_ACTS.includes(v)){if(!guided)st.errs++;drawTrip(i,st,k);await sayW('Ese paso no va todavía. '+HT[k]);continue}}};
  // A · subir y parar
  for(;;){
    await exp('up');if(auto)say('El encuellador pide por radio que suban el bloque.');
    MODE.lifting=true;gauge(true,'Elevador','Piso 0 m',36,27.9,28.8);
    const spd=(auto?2.4:2.2+i*.35);let autoStop=false;
    const target=28.3;
    MODE.tick=dt=>{if(!MODE.lifting)return;const nb=Math.min(H-2.2,RIG.blockY+spd*dt);setBlock(nb);placeStand();const hgt=elevY()-F;gaugeVal(hgt,hgt.toFixed(1).replace('.',',')+' m');
      if(auto&&hgt>=target){MODE.lifting=false;dispatch('stop')}else if(nb>=H-2.2){MODE.lifting=false;autoStop=true;dispatch('AUTOSTOP')}};
    if(!auto){drawTrip(i,st,'stop');task('Toca PARAR en la franja verde')}
    let v;for(;;){v=await w(waitInput());if(v==='stop'||v==='AUTOSTOP')break;if(v==='HINT'){st.hints++;say(HT.stop)}}
    MODE.lifting=false;MODE.tick=null;task('');const hgt=elevY()-F;
    if(hgt>=27.9&&hgt<=28.8){if(!auto)say('Bien, la parada quedó a tu altura.');break}
    if(!guided)st.errs++;
    await sayW(autoStop?'Se activó la protección de corona: el bloque siguió subiendo hacia la corona. Debes dar la señal de parar a tiempo.':hgt<27.9?'Muy bajo: la parada no llega a tu altura y la conexión queda dentro de la mesa. Se baja y se repite.':'Muy alto: la parada te queda por encima y es difícil de controlar. Se baja y se repite.');
    const y0=RIG.blockY;await w(tweenP(1.6,p=>{setBlock(lerp(y0,.9+EOFF,p));placeStand()}));gauge(false)}
  gauge(false);
  // B · el piso trabaja
  if(!auto)drawTrip(i,st,'piso');await floorAuto(i,auto||guided);
  // C · encuelle
  await exp('cuerda');if(auto)await sayW('El encuellador enlaza la parada con la cuerda, para poder controlarla.');
  const hand=RIG.coil.getWorldPosition(V(0,0,0));RIG.coil.visible=false;RIG.rope.visible=true;const rp=()=>{const t=standTop();orient(RIG.rope,hand,V(t.x,t.y-.45,t.z),.016)};rp();MODE.tick=()=>{if(RIG.rope.visible)rp()};
  await exp('elevador');if(auto)await sayW('Con la parada enlazada y asentada abajo, abre el elevador.');
  await w(tweenP(.6,p=>RIG.elevLatch.rotation.y=-1.3*p));
  await exp('peine');if(auto)await sayW('Jala la parada hasta los peines.');
  await w(tweenP(.5,p=>RIG.latch.rotation.x=-1.3*p));
  const t0=standTop(),t1=SLOT(i),base=SB(i);MODE.tick=null;
  await w(tweenP(1.8,p=>{const t=t0.clone().lerp(t1,p);setStand(RIG.stand,base,t);orient(RIG.rope,hand,V(t.x,t.y-.45,t.z),.016)}));
  RIG.rope.visible=false;RIG.coil.visible=true;
  await exp('pestillo');if(auto)await sayW('Y cierra el pestillo para que la parada no se salga.');
  await w(tweenP(.5,p=>RIG.latch.rotation.x=-1.3*(1-p)));
  const r=makeStand();world.add(r);setStand(r,base,t1);RIG.racked.push(r);RIG.stand.visible=false;
  await exp('down');if(auto)await sayW('Por último, pide al perforador que baje el bloque vacío para la siguiente parada.');
  RIG.elevLatch.rotation.y=0;const y0=RIG.blockY;await w(tweenP(2.4,p=>setBlock(lerp(y0,.9+EOFF,p))));
  RIG.slips.visible=false;RIG.stand.visible=true;placeStand()}
function drawTrip(i,st,k){if(!MODE.trip)return;const names={up:'Señal: subir',stop:'Señal: parar a tu altura',piso:'El piso: cuñas, llave y setback',cuerda:'Enlazar la parada',elevador:'Abrir el elevador',peine:'Llevar al peine',pestillo:'Cerrar el pestillo',down:'Señal: bajar el bloque'};
  const order=['up','stop','piso','cuerda','elevador','peine','pestillo','down'];const ci=order.indexOf(k);
  panel(head(MODE.trip==='guided'?'Parada guiada':`Parada ${i} de ${MODE.total}`,'Encuelle en el encuelladero',
    `<div class="meter"><span>Errores: <b class="mono">${st.errs}</b> · Pistas: <b class="mono">${st.hints}</b></span><span>Puntaje: <b class="mono">${Math.max(0,100-st.errs*8-st.hints*3)}</b></span></div>
    ${stepsHTML(order.map(o=>names[o]),ci)}<p class="muted" style="font-size:13px">Arrastra para mirar alrededor. Toca los objetos en la escena; el tablero de señales también está aquí abajo.</p>
    <div class="row"><button class="btn sm" type="button" data-in="up">Subir</button><button class="btn sm" type="button" data-in="stop" style="border-color:var(--bad)">Parar</button><button class="btn sm" type="button" data-in="down">Bajar</button><button class="btn sm ghost" type="button" data-in="HINT">Pista</button></div>`));
  setButtons([{t:'SUBIR',v:'up'},{t:'PARAR',v:'stop'},{t:'BAJAR',v:'down'},{t:'Pista',v:'HINT'}])}
async function modEncuelle(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Encuelle','Primero el instructor te explica el trabajo del encuellador y te muestra una parada completa. Después subes tú al encuelladero, en primera persona.');
  const st={errs:0,hints:0};
  if(how==='demo'){
    tripSetup();insAt(V(2.6,F,3.4));RIG.ins.point=V(-7,F+1.5,-2.2);
    panel(head('Explicación','El viaje de tubería','<p>Sacar tubería del pozo se llama <b>viaje</b>. Se saca de a tres tubos (una <b>parada</b>, ~27 m) y se guarda parada en el setback y en los peines del encuelladero.</p>')+'<button class="btn" type="button" data-in="skip">Saltar explicación</button>');
    const skip=waitInput();
    const tour=(async()=>{
      await w(cineTo(V(8,F+3.5,9),V(-2,F+1.5,-1),2.4,false));
      await sayW('Vamos a sacar tubería del pozo. Esto se llama hacer un viaje. La tubería sale de a tres tubos unidos, unos veintisiete metros: eso es una parada.');
      await sayW('En la cabina está el perforador: maneja el malacate y sube o baja el bloque. En el piso, los cuñeros sientan las cuñas y quiebran las conexiones con la llave.');
      RIG.ins.point=V(0,F+MONK,1.5);w(cineTo(V(6,F+MONK+3,8),V(-.5,F+MONK+.6,1.3),3,false));
      await sayW('Arriba, en el encuelladero, trabaja el encuellador. Cuando el bloque sube la parada, la detiene a su altura, la enlaza con una cuerda, abre el elevador y la guarda entre los peines.');
      await sayW('Fíjate en tres cosas del encuelladero: el tablero de señales para hablar con el perforador, la cuerda de encuelle enrollada en la baranda, y la línea de vida, a la que siempre está conectado.');
      RIG.ins.point=null;await sayW('Ahora mira una parada completa.')})();
    const r=await w(Promise.race([tour.then(()=>'done'),skip]));
    if(r==='skip'){openModule(MODE.id,{practice:true});return}
    {WAITER=null;panel(head('Demostración','Una parada completa','<p>Mira cómo trabajan juntos el perforador, los cuñeros y el encuellador. Después lo haces tú.</p>'));MODE.acts=tripActs(0);MODE.trip=null;w(cineTo(V(5.5,F+MONK+2.2,6.5),V(-.4,F+MONK+.4,.8),2,false));await standCycle(0,'auto',st);clearActs();clearTemp()}
    await sayW('Ahora es tu turno. Vas a subir al encuelladero.')}
  // PRÁCTICA EN PRIMERA PERSONA
  tripSetup();newStage();RIG.derrick.g.visible=false;$('#cams').hidden=true;
  const LX=y=>C(1,0,y).x+.95;
  await w(fade(()=>{fpMode(V(LX(0),F+1.62,-.35),Math.PI/2,.25);station(V(LX(0),F,-.35),Math.PI/2);insAt(V(LX(0)+.8,F,1.2))}));
  const hook=temp(new THREE.Group());RIG.mast.add(hook);hook.position.set(LX(0)-.6,1.3,-.1);const hk=new THREE.Mesh(new THREE.TorusGeometry(.05,.015,6,12),MAT.galv);hook.add(hk);rod(hook,V(0,0,0),V(0,MONK+.2-1.3,-.4),.008,MAT.wire);proxy(hook,.35);act(hook,'clip','Gancho del bloque retráctil');hot(hook);
  panel(head('Práctica · 1.ª persona','Sube al encuelladero','<p>Antes de poner un pie en la escalera, conecta tu arnés al gancho del bloque retráctil.</p>'));task('Conecta el arnés al bloque retráctil');
  await sayW('Estás al pie de la escalera del mástil. Antes de subir, conecta tu arnés al gancho del bloque retráctil: es el que brilla frente a ti.');
  for(;;){if(await w(waitInput())==='clip')break}unact(hook);hook.visible=false;task('');
  say('Conectado. Ahora sube con tres puntos de apoyo: dos manos y un pie, o dos pies y una mano.');
  await w(tweenP(7.5,p=>{const y=p*MONK;CAM.fp.pos.set(LX(y),F+1.62+y,-.35);CAM.fg.pitch=.25+Math.sin(p*40)*.02}));
  await w(fade(()=>{fpMode(EYE(),0,-.2);station(V(0,F+MONK,1.12),0);insAt(V(.05,F+MONK,2.7))}));
  const snap=temp(new THREE.Group());RIG.parts.monkey.add(snap);snap.position.set(.25,MONK+2.0,1.0);snap.add(new THREE.Mesh(new THREE.TorusGeometry(.05,.016,6,12),MAT.galv));proxy(snap,.4);act(snap,'linea','Línea de vida');hot(snap);aim(snap);
  panel(head('Práctica · 1.ª persona','Conéctate a la línea de vida','<p>Ya estás en el encuelladero. Antes de soltar el bloque retráctil, pasa tu conexión a la línea de vida.</p>'));task('Conéctate a la línea de vida');
  await sayW('Llegaste al encuelladero. Antes de soltar el bloque retráctil, conecta tu mosquetón a la línea de vida, encima de ti.');
  for(;;){if(await w(waitInput())==='linea')break}unact(snap);snap.visible=false;task('');
  await sayW('Perfecto, cien por ciento conectado. Mira hacia el centro del mástil: por ahí va a subir la parada.');fpLook(0,-.25);
  // primera parada guiada, luego 4 por tu cuenta
  const TOTAL=4;MODE.total=TOTAL;
  MODE.trip='guided';MODE.acts=tripActs(0);await standCycle(0,'guided',st);clearActs();clearTemp();
  await sayW('Muy bien. Ahora haz las siguientes paradas por tu cuenta. Si te pierdes, pide una pista, aunque cuesta puntos. La velocidad del bloque va a ir subiendo.');
  for(let i=1;i<=TOTAL;i++){MODE.trip='practice';MODE.acts=tripActs(i);await standCycle(i,'practice',st);clearActs();clearTemp()}
  MODE.trip=null;task('');
  await sayW('Terminaste el viaje: todas las paradas quedaron aseguradas en los peines.');
  await result(Math.max(0,100-st.errs*8-st.hints*3),`${TOTAL} paradas por tu cuenta. ${st.errs} error${st.errs===1?'':'es'} y ${st.hints} pista${st.hints===1?'':'s'}.`)}

/* ===================================================================== 5 · CONTROL DE POZO */
async function modControl(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Control de pozo','Primero ves en corte cómo entra una patada al pozo y cuáles son las señales. Después llevas la hoja de viaje y haces el simulacro de cierre en el piso.');
  let errs=0;
  if(how==='demo'){
    panel(head('Animación','¿Qué es una patada?','<p>Observa el pozo en corte. La vista está ampliada para que se vea el interior.</p>'));
    lookFrom([5,2.4,6],[0,1.4,0]);insAt(V(2.6,0,2.9));RIG.ins.point=V(0,1.5,0);
    await sayW('Estas son las preventoras, sobre el cabezal. Pero para entender el control de pozo hay que ver lo que pasa abajo, en el pozo.');
    MODE.under=true;ground.visible=false;RIG.parts.cellar.visible=false;RIG.well.visible=true;RIG.ins.point=null;
    await w(cineTo(V(5.5,-24,8),V(0,-30,-1),3.5));
    await sayW('Este es el pozo, visto en corte y ampliado. Adentro está la tubería, y todo el espacio está lleno de lodo. El peso de esa columna de lodo es la presión hidrostática: es la primera barrera que mantiene los fluidos de la formación en su sitio.');
    w(cineTo(V(4.5,-55,7),V(0,-60,-1),3));gauge(true,'Tanques','Normal',10,0,1.5);
    say('Si la presión de la formación supera la del lodo, entra gas al pozo. Eso es una patada. Mira las burbujas: suben y se expanden.');
    await w(tweenP(9,p=>{RIG.kick=p*.9;gaugeVal(p*7,'+'+(p*7).toFixed(1).replace('.',',')+' bbl')}));
    await w(cineTo(V(7,-8,12),V(0,-18,-1),3));
    await sayW('Y como el gas ocupa espacio, empuja lodo hacia afuera: sube el volumen en los tanques y aumenta el flujo de retorno. Esas son las señales que tú puedes ver en superficie.');
    RIG.well.visible=false;ground.visible=true;RIG.parts.cellar.visible=true;MODE.under=false;RIG.kick=0;gauge(false);
    w(cineTo(V(9,6,4),V(5.5,1.5,-3),2.5,false));insAt(V(8.4,0,-1.2));RIG.ins.point=V(6.4,1.6,-3.2);
    panel(head('Señales de alerta','Lo que ves en superficie','<ul class="steps"><li class="done">Aumento de volumen en tanques</li><li class="done">Aumento del flujo de retorno</li><li class="done">El pozo fluye con las bombas apagadas</li><li class="done">En un viaje: el pozo recibe menos lodo del que dice la hoja</li><li class="done">Cambio brusco en la rata de penetración</li></ul>'));
    await sayW('Este es el tanque de viaje. Cuando sacas tubería, el nivel del pozo baja y hay que llenarlo con lodo de este tanque. Cada parada que sale debe tomar un volumen conocido: eso se anota en la hoja de viaje.');
    await sayW('Si el pozo toma menos lodo del que debería, algo más está ocupando ese espacio. Puede ser gas entrando. Eso se detecta con la hoja de viaje, y es tu primera práctica.');
    RIG.ins.point=null}
  // PRÁCTICA 1 · hoja de viaje
  tripSetup();lookFrom([13,F+1,9],[3.5,F-3,-1.5]);insAt(V(3,F,3.4));station(V(3,F,2.5),.6);
  const exp=.9,meas=[.9,.88,.92,.87,.42,.31,.12];let tank=24,stopped=false,i=0;const rows=[];
  const tbl=()=>`<table class="tbl"><tr><th>Parada</th><th>Calculado</th><th>Medido</th><th>Diferencia</th></tr>${rows.map((r,k)=>`<tr class="${k===rows.length-1?'cur':''}"><td>${r[0]}</td><td>${r[1].toFixed(2)}</td><td>${r[2].toFixed(2)}</td><td>${(r[2]-r[1]).toFixed(2)}</td></tr>`).join('')}</table>`;
  await sayW('Vas a llevar la hoja de viaje. Por cada parada que sale, el pozo debe tomar cero coma nueve barriles del tanque de viaje. Tú comparas lo medido con lo calculado y decides si se sigue o se para.');
  gauge(true,'Tanque de viaje','bbl',30,0,0);
  for(i=0;i<meas.length;i++){
    const y0=RIG.blockY;await w(tweenP(1.4,p=>{setBlock(lerp(y0,y0+6,p));placeStand()}));await w(tweenP(.8,p=>{setBlock(lerp(y0+6,y0,p));placeStand()}));
    const m=meas[i];const t0=tank;tank-=m;await w(tweenP(.8,p=>{const v=lerp(t0,tank,p);gaugeVal(v,v.toFixed(1).replace('.',','));RIG.ttLevel.position.y=.3+v/30*2.6}));
    rows.push([i+1,exp,m]);if(i>=5)RIG.fx.spray=.25;
    const v=await ask(head('Práctica · Hoja de viaje',`Parada ${i+1}`,tbl()+`<p>El pozo tomó <b class="mono">${m.toFixed(2)} bbl</b>. Lo calculado es <b class="mono">${exp.toFixed(2)} bbl</b>.</p>`),[{t:'Llenado correcto: continuar el viaje',v:'go'},{t:'Diferencia: parar el viaje y hacer flow check',v:'stop'}]);
    if(v==='stop'){if(m<exp-.15){stopped=true;await sayW(i===4?'Correcto. El pozo tomó menos de la mitad de lo calculado. Se detiene el viaje y se hace flow check.':'Bien, aunque ya debiste parar antes: la diferencia empezó en la parada cinco.');if(i>4)errs++;break}
      errs++;await sayW('La diferencia es pequeña y está dentro de lo normal. Pararse por eso no es malo, pero aquí sí se puede continuar.');continue}
    if(m<exp-.15){errs++;await sayW(i===4?'Cuidado: el pozo tomó menos de la mitad del lodo calculado. Eso es una alerta de influjo; aquí se debía parar.':'Sigues sacando con el pozo tomando muy poco lodo. Cada parada empeora el influjo.')}}
  if(!stopped){errs++;await sayW('El pozo empezó a fluir. Hay que cerrar ya.')}
  gauge(false);RIG.fx.spray=.6;MODE.alarm=true;
  // PRÁCTICA 2 · simulacro de cierre (1.ª persona en el piso)
  setBlock(18);RIG.stand.visible=false;RIG.slips.visible=true;RIG.slips.position.y=F+.12;$('#cams').hidden=true;
  await w(fade(()=>{fpMode(V(-.4,F+1.62,2.6),.55,-.28);station(V(-.4,F,2.6),.55);insAt(V(1.2,F,3.9));RIG.hand2.g.position.set(1.3,F,-1.4)}));
  const L=[['alarma',RIG.bopBtn2,'ALARMA'],['fosv',RIG.fosv,'Válvula FOSV'],['llave',RIG.fosvKey,'Llave de la FOSV'],['anular',RIG.bopBtn,'CERRAR ANULAR'],['presiones',RIG.gauges,'Manómetros']];
  L.forEach(([k,o,n])=>{if(!o.userData.px){proxy(o,k==='presiones'?1:k==='fosv'?.9:.6,k==='presiones'?V(0,1.35,0):null);o.userData.px=1}act(o,k,n);const lb=temp(label3D(n,.55));o.add(lb);lb.position.set(0,k==='presiones'?1.95:k==='llave'?-.25:.55,0)});
  const order=['alarma','fosv','llave','anular','presiones'];const NM={alarma:'Dar la alarma',fosv:'Instalar la FOSV abierta',llave:'Cerrar la FOSV con su llave',anular:'Cerrar la preventora anular',presiones:'Registrar presiones de cierre'};
  const HN={alarma:'Primero da la alarma: botón amarillo del panel remoto, junto a la cabina.',fosv:'Instala la válvula de seguridad, la FOSV amarilla, abierta sobre la tubería.',llave:'Ahora cierra la FOSV con su llave roja.',anular:'Cierra el pozo: botón verde de cerrar anular en el panel remoto.',presiones:'Registra las presiones de cierre en los manómetros del múltiple.'};
  let t0=performance.now(),step=0,hints=0;
  const dr=(fb='')=>panel(head('Simulacro de cierre','¡El pozo está fluyendo!',`<div class="meter"><span>Errores: <b class="mono">${errs}</b></span><span>Tiempo: <b class="mono" id="drT">0 s</b></span></div>${stepsHTML(order.map(o=>NM[o]),step)}${fb}<button class="btn sm ghost" type="button" data-in="HINT">Pista</button>`));
  dr();task('Actúa: toca los equipos en orden');MODE.tick=()=>{const e=$('#drT');if(e)e.textContent=Math.round((performance.now()-t0)/1000)+' s'};
  await sayW('¡Simulacro! El pozo está fluyendo por la tubería. Estás en el piso. Actúa en orden: toca los equipos en la escena. El tiempo corre.');
  t0=performance.now();
  while(step<order.length){const k=order[step];const v=await w(waitInput());
    if(v==='HINT'){hints++;const o=L.find(x=>x[0]===k)[1];hot(o);aim(o);say(HN[k]);continue}
    if(v!==k){if(order.includes(v)){errs++;dr(`<div class="fb bad">${HN[k]}</div>`);say('No, ese paso no va ahora. '+HN[k])}continue}
    const o=L.find(x=>x[0]===k)[1];hot(o,false);unact(o);step++;dr();
    if(k==='alarma'){say('Alarma dada. El perforador detiene todo y la cuadrilla toma posiciones.')}
    if(k==='fosv'){world.attach(RIG.fosv);const a=RIG.fosv.position.clone(),b=V(0,F+1.25,0);await w(tweenP(1.4,p=>{RIG.fosv.position.lerpVectors(a,b,p);RIG.fosv.position.y+=Math.sin(p*Math.PI)*.5}));say('FOSV instalada abierta: así se puede enroscar aunque haya flujo.')}
    if(k==='llave'){world.attach(RIG.fosvKey);const a=RIG.fosvKey.position.clone(),b=V(.16,F+1.15,0);await w(tweenP(1,p=>RIG.fosvKey.position.lerpVectors(a,b,p)));await w(tweenP(.8,p=>RIG.fosvKey.rotation.y=p*Math.PI/2));RIG.fx.spray=.15;say('FOSV cerrada. Ya no sale por la tubería, pero sigue saliendo por el anular.')}
    if(k==='anular'){await w(tweenP(1.2,p=>RIG.annular.material.color.setRGB(lerp(.43,.03,p),lerp(.02,.2,p),lerp(.012,.04,p))));RIG.fx.spray=0;MODE.alarm=false;say('Preventora anular cerrada: el pozo está cerrado.')}
    if(k==='presiones'){await sayW('Registra: presión de cierre en la tubería, trescientos cincuenta psi; en el anular, quinientos veinte psi; ganancia en tanques, cinco barriles. Con esos datos se planea cómo matar el pozo.')}}
  MODE.tick=null;task('');const secs=Math.round((performance.now()-t0)/1000);
  await sayW(`Simulacro terminado en ${secs} segundos. Recuerda: alarma, válvula, cierre y registro.`);
  const prac=Math.max(0,100-errs*8-hints*3-Math.max(0,secs-90)/3|0);
  const q=await quizFlow('control');
  await result(Math.round(prac*.5+q*.5),`Hoja de viaje y simulacro: ${prac} puntos (${errs} error${errs===1?'':'es'}, ${secs} s). Evaluación: ${q} puntos.`)}

/* ===================================================================== 6 · CASOS */
async function stageCase(c,rk){
  if(c.stage==='kick'){setNight(true);tripSetup();RIG.slips.visible=true;insAt(V(3,F,3.6));
    if(rk==='encuellador')lookFrom([5,F+MONK+2.5,7],[0,F+MONK,0]);else if(rk==='perforador'||rk==='supervisor')lookFrom([-6.2,F+1.6,-1.6],[0,F+.8,0]);else if(rk==='patio')lookFrom([12,4,22],[0,F,0]);else lookFrom([7,F+3,8],[0,F+.6,0])}
  if(c.stage==='ladder'){RIG.climber.g.visible=true;RIG.climber.anim='climb';lookFrom([14,F+2,6],[2.8,F+6,-.35]);insAt(V(4.8,F,3.2))}
  if(c.stage==='gas'){lookFrom([4,6,-24],[13,2.4,-10]);insAt(V(8,0,-18));RIG.mudman.g.position.set(12.2,0,-13.5)}}
function nodeFX(c,n){MODE.alarm=!!n.alarm;RIG.fx.spray=n.fx?.6:0;RIG.fx.gas=n.gas||0;
  if(n.climb!=null){const cl=RIG.climber,LX=y=>C(1,0,y).x+.62,y0=cl.g.position.y||.2,y1=Math.min(n.climb,MONK-.2);cl.anim='climb';tween(Math.max(.5,Math.abs(y1-y0)/1.4),p=>{const y=lerp(y0,y1,p);cl.g.position.set(LX(y),y,-.35)},()=>{cl.anim='idle';if(y1>=MONK-1){cl.g.position.set(-.2,MONK+.03,1.6);cl.g.rotation.y=Math.PI}})}
  if(n.down){RIG.mudman.anim='down'}}
async function runCase(c0){
  const rk=roleKey(prof().role),rv=(CASE_ROLE[c0.id]||{})[rk];const c=rv?Object.assign({},c0,{r:rv.r,brief:rv.brief,nodes:rv.nodes}):c0;
  resetScene();await stageCase(c,rk);let first=0;
  panel(head(`Caso · ${c.t}`,'Situación',`<p>${c.brief}</p><p class="muted">Tu rol: ${c.r}</p>`));await sayW(c.brief);
  for(let i=0;i<c.nodes.length;i++){const n=c.nodes[i];nodeFX(c,n);let miss=false;
    const hd=head(`${c.t} · decisión ${i+1} de ${c.nodes.length}`,n.x,`<div class="ind">${n.ind.map(([l,v,s])=>`<div class="${s}"><small>${l}</small><b>${v}</b></div>`).join('')}</div>`);
    say(n.x+' ¿Qué haces?');const opts=shuffle(n.o.map((o,j)=>({t:o.t,v:String(j)})));
    for(;;){const v=await ask(hd,opts);const o=n.o[+v];
      if(o.ok){if(!miss)first++;panel(hd+`<div class="fb ok">${o.f}</div>`);await sayW(o.f);break}
      miss=true;panel(hd+`<div class="fb bad">${o.f}</div>`);await sayW(o.f+' Intenta de nuevo.')}}
  MODE.alarm=false;RIG.fx.spray=0;RIG.fx.gas=0;setNight(false);
  return Math.round(first/c.nodes.length*100)}
async function modCasos(){
  for(;;){const p=prof();const m=p.mods.casos||(p.mods.casos={});m.cases=m.cases||{};
    resetScene();lookFrom([40,24,46],[0,12,0]);
    const v=await ask(head('Simulación','Casos simulados','<p class="muted">Situaciones reales recreadas en el equipo. Cada decisión correcta al primer intento suma. Completa los tres para tu nota del módulo.</p>'),
      CASES.map(c=>({t:`<b>${c.t}</b><br><span class="muted" style="font-size:13px">Rol: ${((CASE_ROLE[c.id]||{})[roleKey(p.role)]||c).r}${m.cases[c.id]!=null?` · Último puntaje: ${m.cases[c.id]}`:''}</span>`,v:c.id})));
    const c=CASES.find(x=>x.id===v);await sayW('Caso: '+c.t+'.');const sc=await runCase(c);
    m.cases[c.id]=Math.max(m.cases[c.id]||0,sc);save();
    if(CASES.every(k=>m.cases[k.id]!=null)){const avg=Math.round(CASES.reduce((s,k)=>s+m.cases[k.id],0)/CASES.length);await result(avg,`Último caso: ${sc} puntos. Promedio de los tres casos: ${avg}.`);return}
    await ask(head('Caso terminado',`${sc} puntos`,`<p>Decisiones correctas al primer intento en «${c.t}».</p>`),[{t:'Siguiente caso',v:'n'}])}}
