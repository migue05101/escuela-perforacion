/* ===================================================================== MANOS EN 1.ª PERSONA, MANDOS ARRASTRABLES, TECLADO, SONIDO */
const PTR={x:0,y:0,has:false,hp:null,act:false};
const KEYS=new Set();let LOCK=false;
addEventListener('keydown',e=>{const t=e.target.tagName;if(t==='INPUT'||t==='SELECT'||t==='TEXTAREA')return;if(!KEYS.has(e.code)&&MODE.onKey)MODE.onKey(e.code);KEYS.add(e.code);if(MODE.walk&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault()});
addEventListener('keyup',e=>KEYS.delete(e.code));
addEventListener('blur',()=>KEYS.clear());
document.addEventListener('pointerlockchange',()=>{LOCK=!!renderer&&document.pointerLockElement===renderer.domElement;const c=$('#cross');if(c)c.classList.toggle('lock',LOCK)});
document.addEventListener('mousemove',e=>{if(!LOCK)return;CAM.fg.yaw-=e.movementX*.0024;CAM.fg.pitch=clamp(CAM.fg.pitch-e.movementY*.0024,-1.35,1.25)});

/* ---------- guante ---------- */
function makeGlove(side){
  const g=new THREE.Group();
  const glove=std(0xe0b23a,{roughness:.82,metalness:0}),pad=std(0x2d2a26,{roughness:.9,metalness:0}),cuff=std(0x3b3a36,{roughness:.9});
  const palm=new THREE.Mesh(new THREE.BoxGeometry(.084,.03,.092),glove);g.add(palm);
  const back=new THREE.Mesh(new THREE.BoxGeometry(.078,.012,.07),pad);back.position.set(0,.019,.006);g.add(back);
  for(let i=0;i<4;i++){const k=new THREE.Mesh(new THREE.BoxGeometry(.017,.012,.016),pad);k.position.set((-.03+i*.02)*side,.02,-.04);g.add(k)}
  const cf=new THREE.Mesh(new THREE.CylinderGeometry(.047,.043,.075,14),cuff);cf.rotation.x=Math.PI/2;cf.position.z=.075;g.add(cf);
  const fingers=[];const L=[[.04,.028],[.046,.031],[.043,.029],[.034,.024]];
  for(let i=0;i<4;i++){const a=new THREE.Group();a.position.set((-.031+i*.0205)*side,0,-.046);g.add(a);
    const s1=new THREE.Mesh(new THREE.CylinderGeometry(.0095,.0098,L[i][0],8),glove);s1.rotation.x=Math.PI/2;s1.position.z=-L[i][0]/2;a.add(s1);
    const b=new THREE.Group();b.position.z=-L[i][0];a.add(b);
    const s2=new THREE.Mesh(new THREE.CylinderGeometry(.0085,.0092,L[i][1],8),glove);s2.rotation.x=Math.PI/2;s2.position.z=-L[i][1]/2;b.add(s2);
    const tip=new THREE.Mesh(new THREE.SphereGeometry(.0088,8,6),glove);tip.position.z=-L[i][1];b.add(tip);fingers.push({a,b})}
  const th=new THREE.Group();th.position.set(-.043*side,-.006,-.004);th.rotation.set(0,.75*side,0);g.add(th);
  const t1=new THREE.Mesh(new THREE.CylinderGeometry(.0115,.012,.036,8),glove);t1.rotation.x=Math.PI/2;t1.position.z=-.018;th.add(t1);
  const tb=new THREE.Group();tb.position.z=-.036;th.add(tb);const t2=new THREE.Mesh(new THREE.CylinderGeometry(.0105,.011,.028,8),glove);t2.rotation.x=Math.PI/2;t2.position.z=-.014;tb.add(t2);
  g.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false}});
  return{g,fingers,th,tb,curl:0,point:0,
    set(c,pt){this.curl=c;this.point=pt;this.fingers.forEach((f,i)=>{const cc=i===0?c*(1-pt):c;f.a.rotation.x=-cc*1.25;f.b.rotation.x=-cc*1.35});this.th.rotation.x=-c*.5;this.tb.rotation.x=-c*.7}}}

/* ---------- mano y brazo en pantalla (PC, celular, tableta) ---------- */
let FPH=null;
const ELBOW=V(.36,-.5,-.12);
function initHands(){
  const h=makeGlove(1);h.g.scale.setScalar(1.25);camera.add(h.g);
  const suit=std(0xd8661c,{roughness:.86,metalness:0}),refl=std(0xd8dcd4,{emissive:0x4a4a4a,roughness:.3,metalness:.4});
  const sl=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,16),suit);camera.add(sl);
  const band=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,16),refl);camera.add(band);
  [h.g,sl,band].forEach(o=>o.traverse(m=>{if(m.isMesh){m.castShadow=false;m.receiveShadow=false;m.frustumCulled=false}}));
  FPH={h,sl,band,pos:V(.19,-.19,-.5),dir:V(0,0,-1),curl:.2,point:0,poke:0,show:false};
}
const _v1=V(0,0,0),_v2=V(0,0,0),_q=new THREE.Quaternion();
function updateHands(dt){
  if(!FPH)return;
  const flat=!renderer.xr.isPresenting;const show=flat&&CAM.mode==='fp'&&!MODE.noHand;
  FPH.show=show;FPH.h.g.visible=FPH.sl.visible=FPH.band.visible=show;
  if(show){
    camera.updateMatrixWorld(true);
    let tgt=null,curl=.22,point=0;
    if(MODE.handAt){tgt=camera.worldToLocal(MODE.handAt.clone());curl=.92}
    else if(DRAG){tgt=camera.worldToLocal(ctlGrip(DRAG.ctl));curl=.95}
    else if(PTR.has||LOCK){
      const px=LOCK?null:PTR;let rc;
      if(LOCK){const r=renderer.domElement.getBoundingClientRect();rc=rayFromScreen(r.left+r.width/2,r.top+r.height/2)}else rc=rayFromScreen(px.x,px.y);
      const d=PTR.hp?PTR.hp.distanceTo(rc.ray.origin):99;
      if(PTR.hp&&d<1.15){tgt=camera.worldToLocal(PTR.hp.clone().addScaledVector(rc.ray.direction,-.075));point=PTR.act?1:.3;curl=PTR.act?.75:.35}
      else tgt=camera.worldToLocal(rc.ray.at(.62,_v1));}
    else tgt=V(.19,-.19,-.5);
    tgt.x=clamp(tgt.x,-.22,.46);tgt.y=clamp(tgt.y,-.5,.14);tgt.z=clamp(tgt.z,-1.0,-.26);
    if(FPH.poke>0){FPH.poke=Math.max(0,FPH.poke-dt*3);tgt.z-=Math.sin(FPH.poke*Math.PI)*.05;point=1;curl=.8}
    const k=1-Math.exp(-dt*14);FPH.pos.lerp(tgt,k);FPH.curl=lerp(FPH.curl,curl,k);FPH.point=lerp(FPH.point,point,k);
    const dir=_v2.copy(FPH.pos).sub(ELBOW).normalize();FPH.dir.lerp(dir,k).normalize();
    FPH.h.g.position.copy(FPH.pos);FPH.h.g.quaternion.setFromUnitVectors(V(0,0,-1),FPH.dir);FPH.h.g.rotateZ(.35);
    FPH.h.set(FPH.curl,FPH.point);
    const wrist=FPH.pos.clone().addScaledVector(FPH.dir,-.12);
    orient(FPH.sl,wrist,ELBOW.clone().add(V(.08,-.16,.02)),.042,.042);
    const b0=wrist.clone().lerp(ELBOW,.3),b1=wrist.clone().lerp(ELBOW,.38);orient(FPH.band,b0,b1,.0445,.0445);
  }
  updateXRDrag(dt);
  const k=.5+.5*Math.sin(T*6);for(const c of CTLS){if(c.glow||c.glowWas){const a=c.glow?.15+.45*k:0;c.obj.traverse(m=>{if(m.isMesh&&m.material.emissive&&m.material!==c.capMat)m.material.emissive.setRGB(.94*a,.62*a,.1*a)});c.glowWas=c.glow}}
}

/* ---------- mandos (palancas, joysticks, perillas, botones) ---------- */
const CTLS=[];let DRAG=null;const XDRAG=[null,null];
function addCtl(o){o=Object.assign({min:0,max:1,value:0,type:'lever',axis:'z',ang:[.5,-.5],drag:'y',sens:1,grip:V(0,.12,0),off:true},o);
  o.obj.traverse(m=>{if(m.isMesh&&m.material&&m.material.isMeshStandardMaterial)m.material=m.material.clone()});
  o.obj.userData.ctl=o;if(o.hit)proxy(o.obj,o.hit,o.hitPos||o.grip);CTLS.push(o);if(o.type!=='button')setCtl(o,o.value,true);return o}
function setCtl(c,v,silent){c.value=clamp(v,c.min,c.max);if(c.type!=='button'){const t=(c.value-c.min)/(c.max-c.min);c.obj.rotation[c.axis]=lerp(c.ang[0],c.ang[1],t)}if(!silent&&c.onChange)c.onChange(c.value)}
function ctlHit(rc){const objs=CTLS.filter(c=>!c.off&&visibleDeep(c.obj)).map(c=>c.obj);if(!objs.length)return null;const h=rc.intersectObjects(objs,true)[0];if(!h)return null;let o=h.object;while(o&&!o.userData.ctl)o=o.parent;return o?{ctl:o.userData.ctl,point:h.point}:null}
function ctlGrip(c){c.obj.updateMatrixWorld(true);return c.obj.localToWorld(c.grip.clone())}
function pressBtn(c){if(c.cap){const y0=c.cap.position.y;tween(.16,p=>c.cap.position.y=y0-Math.sin(p*Math.PI)*.008)}if(FPH)FPH.poke=1;clickSnd();if(c.onPress)c.onPress();dispatch('ctl:'+c.id)}
function releaseCtl(c){if(c.spring!=null){const v0=c.value;tween(.25,p=>setCtl(c,lerp(v0,c.spring,p)))}}
function ctlDown(x,y,id){const ch=ctlHit(rayFromScreen(x,y));if(!ch)return false;const c=ch.ctl;if(c.type==='button'){pressBtn(c);return true}
  DRAG={ctl:c,x,y,v0:c.value,id};return true}
function ctlMove(x,y){if(!DRAG)return;const c=DRAG.ctl;const d=c.drag==='x'?(x-DRAG.x):-(y-DRAG.y);setCtl(c,DRAG.v0+d/180*c.sens*(c.max-c.min))}
function ctlUp(){if(!DRAG)return;const c=DRAG.ctl;DRAG=null;releaseCtl(c)}
/* VR: agarrar por cercanía o con el rayo, y mover con el control */
function xrGrab(i,ctrl,rc){
  const gp=V(0,0,0);ctrl.getWorldPosition(gp);let best=null,bd=.16;
  for(const c of CTLS){if(c.off||!visibleDeep(c.obj))continue;const d=ctlGrip(c).distanceTo(gp);if(d<bd){bd=d;best=c}}
  if(!best){const h=ctlHit(rc);if(h)best=h.ctl}
  if(!best)return false;if(best.type==='button'){pressBtn(best);return true}
  XDRAG[i]={ctl:best,ctrl,p0:gp.clone(),v0:best.value};return true}
function xrRelease(i){const d=XDRAG[i];if(!d)return;XDRAG[i]=null;releaseCtl(d.ctl)}
function updateXRDrag(){for(const d of XDRAG){if(!d)continue;const p=V(0,0,0);d.ctrl.getWorldPosition(p);const c=d.ctl;const dir=c.dirW||V(0,1,0);
  setCtl(c,d.v0+p.sub(d.p0).dot(dir)/.14*c.sens*(c.max-c.min)*.5)}}

/* ---------- joystick táctil y botón Usar ---------- */
const JOY={x:0,y:0,on:false};
function setupTouchJoy(){
  const j=$('#joy'),k=$('#joyKnob');if(!j||j.dataset.ok)return;j.dataset.ok=1;let id=null,cx=0,cy=0;
  const mv=e=>{const dx=e.clientX-cx,dy=e.clientY-cy,r=Math.min(1,Math.hypot(dx,dy)/48),a=Math.atan2(dy,dx);JOY.x=Math.cos(a)*r;JOY.y=-Math.sin(a)*r;k.style.transform=`translate(${JOY.x*40}px,${-JOY.y*40}px)`};
  j.addEventListener('pointerdown',e=>{id=e.pointerId;j.setPointerCapture(id);const r=j.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;JOY.on=true;mv(e);e.stopPropagation()});
  j.addEventListener('pointermove',e=>{if(e.pointerId===id)mv(e)});
  const end=e=>{if(e.pointerId!==id)return;id=null;JOY.x=JOY.y=0;JOY.on=false;k.style.transform=''};j.addEventListener('pointerup',end);j.addEventListener('pointercancel',end);
  $('#useBtn').addEventListener('click',()=>{if(MODE.use)MODE.use()});
}

/* ---------- sonido ambiente del taladro (generado) ---------- */
const SND={ctx:null,on:false};
function startAmbient(){try{
  if(!SND.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;SND.ctx=new C()}
  const a=SND.ctx;if(a.state==='suspended')a.resume();if(SND.on)return;SND.on=true;
  const len=a.sampleRate*2,buf=a.createBuffer(1,len,a.sampleRate),d=buf.getChannelData(0);let last=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;last=(last+.02*w)/1.02;d[i]=last*3.2}
  const src=a.createBufferSource();src.buffer=buf;src.loop=true;const lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=320;
  const eng=a.createGain();eng.gain.value=.0;src.connect(lp);lp.connect(eng);
  const hum=a.createOscillator();hum.type='sawtooth';hum.frequency.value=48;const hlp=a.createBiquadFilter();hlp.type='lowpass';hlp.frequency.value=140;const hg=a.createGain();hg.gain.value=.0;hum.connect(hlp);hlp.connect(hg);
  const pump=a.createOscillator();pump.type='sine';pump.frequency.value=38;const pg=a.createGain();pg.gain.value=0;const lfo=a.createOscillator();lfo.frequency.value=0;const lg=a.createGain();lg.gain.value=0;lfo.connect(lg);lg.connect(pg.gain);pump.connect(pg);
  const master=a.createGain();master.gain.value=0;eng.connect(master);hg.connect(master);pg.connect(master);master.connect(a.destination);
  src.start();hum.start();pump.start();lfo.start();
  Object.assign(SND,{src,eng,hg,pg,lfo,lg,master,hum});setAmbient({});
}catch(e){}}
function setAmbient(o){if(!SND.on)return;const a=SND.ctx,t=a.currentTime;o=Object.assign({level:.5,inside:false,spm:0,rpm:0},o);
  const lv=NAR.muted?0:o.level*(o.inside?.45:1);SND.master.gain.setTargetAtTime(lv*.5,t,.4);SND.eng.gain.setTargetAtTime(.55,t,.4);SND.hg.gain.setTargetAtTime(.08+o.rpm/180*.12,t,.4);SND.hum.frequency.setTargetAtTime(42+o.rpm/180*30,t,.4);
  const f=o.spm/60;SND.lfo.frequency.setTargetAtTime(Math.max(.01,f*3),t,.3);SND.lg.gain.setTargetAtTime(o.spm>0?.12:0,t,.3);SND.pg.gain.setTargetAtTime(o.spm>0?.06:0,t,.3)}
function stopAmbient(){if(!SND.on)return;try{SND.master.gain.setTargetAtTime(0,SND.ctx.currentTime,.2);['src','hum','pump','lfo'].forEach(k=>{try{SND[k]&&SND[k].stop(SND.ctx.currentTime+.6)}catch(e){}})}catch(e){}SND.on=false}
function clickSnd(){try{if(!SND.ctx)return;const a=SND.ctx,o=a.createOscillator(),g=a.createGain();o.frequency.value=1800;g.gain.value=.05;o.connect(g);g.connect(a.destination);o.start();g.gain.setTargetAtTime(0,a.currentTime,.015);o.stop(a.currentTime+.08)}catch(e){}}
function beepSnd(on){try{if(!SND.ctx)return;const a=SND.ctx;if(on&&!SND.beep){const o=a.createOscillator(),g=a.createGain(),l=a.createOscillator(),lg=a.createGain();o.type='square';o.frequency.value=880;l.frequency.value=2.5;lg.gain.value=.035;l.connect(lg);lg.connect(g.gain);g.gain.value=.035;o.connect(g);g.connect(a.destination);o.start();l.start();SND.beep={o,l,g}}
  else if(!on&&SND.beep){SND.beep.g.gain.setTargetAtTime(0,a.currentTime,.05);SND.beep.o.stop(a.currentTime+.3);SND.beep.l.stop(a.currentTime+.3);SND.beep=null}}catch(e){}}
