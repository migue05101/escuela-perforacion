/* ===================================================================== MOTOR */
const $=s=>document.querySelector(s);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const isMobile=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
let renderer,scene,camera,dolly,world,sky,sun,raycaster;
let QUALITY=isMobile?'medio':'alto';
const TEX={},MAT={};
const TW=[];
function tween(dur,fn,done){const t={t:0,dur:Math.max(.001,dur),fn,done};TW.push(t);return t}
function tweenP(dur,fn){return new Promise(r=>tween(dur,fn,r))}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3800)}

/* ---------- texturas procedurales ---------- */
function canvasTex(w,h,draw,rep,srgb=true){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);if(srgb)t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}
const R=Math.random;
function speckle(g,w,h,n,fn){for(let i=0;i<n;i++){g.fillStyle=fn();const s=.6+R()*2.6;g.fillRect(R()*w,R()*h,s,s)}}
function blotch(g,w,h,n,col,rmax){for(let i=0;i<n;i++){const x=R()*w,y=R()*h,r=8+R()*rmax;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r)}}
function makeTextures(){
  TEX.gravel=canvasTex(512,512,(g,w,h)=>{g.fillStyle='#8f8571';g.fillRect(0,0,w,h);blotch(g,w,h,40,'rgba(70,58,40,.25)',60);speckle(g,w,h,14000,()=>`hsl(${28+R()*18},${8+R()*14}%,${30+R()*42}%)`)});
  TEX.grass=canvasTex(512,512,(g,w,h)=>{g.fillStyle='#5f6b37';g.fillRect(0,0,w,h);blotch(g,w,h,60,'rgba(120,98,60,.45)',70);blotch(g,w,h,40,'rgba(70,95,40,.5)',50);speckle(g,w,h,9000,()=>`hsl(${60+R()*40},${25+R()*20}%,${22+R()*25}%)`)});
  TEX.grime=canvasTex(256,256,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);for(let i=0;i<40;i++){g.fillStyle=`rgba(60,45,30,${.02+R()*.035})`;const x=R()*w;g.fillRect(x,R()*h*.4,2+R()*10,h*R())}blotch(g,w,h,30,'rgba(80,55,30,.18)',30);speckle(g,w,h,1500,()=>`rgba(40,30,20,${R()*.25})`)});
  TEX.plate=canvasTex(128,128,(g,w,h)=>{g.fillStyle='#8a8f93';g.fillRect(0,0,w,h);for(let y=0;y<8;y++)for(let x=0;x<8;x++){g.save();g.translate(x*16+8,y*16+8);g.rotate(((x+y)%2?1:-1)*.78);g.fillStyle='#b0b5b8';g.fillRect(-6,-1.5,12,3);g.fillStyle='#62676b';g.fillRect(-6,1.5,12,1);g.restore()}speckle(g,w,h,500,()=>`rgba(50,40,30,${R()*.3})`)});
  TEX.grate=canvasTex(128,128,(g,w,h)=>{g.fillStyle='#2a2e31';g.fillRect(0,0,w,h);g.fillStyle='#8c9296';for(let i=0;i<8;i++){g.fillRect(i*16,0,4,h)}g.fillStyle='#6d7377';for(let j=0;j<4;j++)g.fillRect(0,j*32,w,3)});
  TEX.wood=canvasTex(256,256,(g,w,h)=>{g.fillStyle='#7d5b39';g.fillRect(0,0,w,h);for(let i=0;i<8;i++){g.fillStyle=`hsl(28,${30+R()*10}%,${22+R()*12}%)`;g.fillRect(0,i*32,w,30);g.fillStyle='rgba(20,10,0,.5)';g.fillRect(0,i*32+30,w,2);for(let k=0;k<30;k++){g.fillStyle=`rgba(40,25,10,${R()*.25})`;g.fillRect(R()*w,i*32+R()*30,30+R()*80,1)}}});
  TEX.concrete=canvasTex(256,256,(g,w,h)=>{g.fillStyle='#9a968c';g.fillRect(0,0,w,h);blotch(g,w,h,30,'rgba(60,55,45,.2)',40);speckle(g,w,h,4000,()=>`rgba(${R()<.5?40:200},${R()<.5?40:200},${R()<.5?40:190},${R()*.25})`)});
  TEX.dot=canvasTex(64,64,(g,w,h)=>{const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,64)});
  TEX.sock=canvasTex(128,32,(g,w,h)=>{for(let i=0;i<5;i++){g.fillStyle=i%2?'#f2f2f2':'#e2531f';g.fillRect(i*w/5,0,w/5,h)}},null);
}
function rep(t,x,y){const c=t.clone();c.needsUpdate=true;c.repeat.set(x,y);return c}
function std(color,o){const m=new THREE.MeshStandardMaterial(Object.assign({color,roughness:.7,metalness:.2},o||{}));m.color.convertSRGBToLinear();m.emissive.convertSRGBToLinear();return m}
const lin=c=>new THREE.Color(c).convertSRGBToLinear();
function makeMaterials(){
  Object.assign(MAT,{
    paint:std(0xc9561b,{map:TEX.grime,roughness:.55,metalness:.3}),
    paintDk:std(0x9e4318,{map:TEX.grime,roughness:.6,metalness:.3}),
    steel:std(0x5a656e,{map:TEX.grime,roughness:.55,metalness:.5}),
    steelDk:std(0x30373d,{roughness:.55,metalness:.6}),
    galv:std(0xa3a9ad,{roughness:.42,metalness:.75}),
    yellow:std(0xe2ad1b,{roughness:.5,metalness:.15}),
    yellowW:std(0xd9a51c,{map:TEX.grime,roughness:.55,metalness:.2}),
    blue:std(0x2a5a86,{map:TEX.grime,roughness:.5,metalness:.35}),
    red:std(0xb1281c,{map:TEX.grime,roughness:.48,metalness:.3}),
    white:std(0xe7e4dc,{map:TEX.grime,roughness:.6,metalness:.05}),
    pipe:std(0x7b858b,{roughness:.32,metalness:.85}),
    tj:std(0x575f64,{roughness:.28,metalness:.9}),
    wire:std(0x2c3034,{roughness:.4,metalness:.8}),
    rubber:std(0x1c1e20,{roughness:.9,metalness:0}),
    glass:std(0x2a3c48,{roughness:.05,metalness:.9,transparent:true,opacity:.6}),
    wood:std(0x80603e,{map:TEX.wood,roughness:.9,metalness:0}),
    concrete:std(0x9b978e,{map:TEX.concrete,roughness:.95,metalness:0}),
    plate:std(0x737a80,{map:rep(TEX.plate,8,10),roughness:.5,metalness:.65}),
    grate:std(0x7d8387,{map:TEX.grate,roughness:.6,metalness:.6}),
    tank:std(0x6b7e8d,{map:TEX.grime,roughness:.6,metalness:.35}),
    mud:std(0x5d4631,{roughness:.25,metalness:0}),
    lamp:std(0xfff6d8,{emissive:0xfff2c8,emissiveIntensity:1.3}),
    dark:std(0x15181b,{roughness:.8,metalness:.1}),
    green:std(0x2f7d4a,{roughness:.6,metalness:.1}),
  });
}
/* ---------- geometría ---------- */
const UB=new THREE.BoxGeometry(1,1,1),UC=new THREE.CylinderGeometry(1,1,1,12),UC6=new THREE.CylinderGeometry(1,1,1,6);
const Y=V(0,1,0);
function add(p,m){p.add(m);return m}
function box(p,w,h,d,mat,x,y,z){const m=new THREE.Mesh(UB,mat);m.scale.set(w,h,d);m.position.set(x,y,z);return add(p,m)}
function boxT(p,w,h,d,mat,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);return add(p,m)}
function cyl(p,r1,r2,h,mat,x,y,z,seg,axis){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg||20),mat);m.position.set(x,y,z);if(axis==='x')m.rotation.z=Math.PI/2;if(axis==='z')m.rotation.x=Math.PI/2;return add(p,m)}
function orient(m,a,b,sx,sz){const d=V(b.x-a.x,b.y-a.y,b.z-a.z),L=d.length()||.001;m.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);m.quaternion.setFromUnitVectors(Y,d.multiplyScalar(1/L));m.scale.set(sx,L,sz==null?sx:sz);return m}
function rod(p,a,b,r,mat,lo){return add(p,orient(new THREE.Mesh(lo?UC6:UC,mat),a,b,r))}
function bar(p,a,b,w,mat,h){return add(p,orient(new THREE.Mesh(UB,mat),a,b,w,h))}
function lathe(p,pts,mat,y,seg){const m=new THREE.Mesh(new THREE.LatheGeometry(pts.map(q=>new THREE.Vector2(q[0],q[1])),seg||28),mat);m.position.y=y||0;return add(p,m)}
function tube(p,pts,r,mat,seg){const c=new THREE.CatmullRomCurve3(pts);return add(p,new THREE.Mesh(new THREE.TubeGeometry(c,seg||24,r,8,false),mat))}
function handrail(p,pts,h=1.1){for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];rod(p,V(a.x,a.y+h,a.z),V(b.x,b.y+h,b.z),.025,MAT.yellow,1);rod(p,V(a.x,a.y+h/2,a.z),V(b.x,b.y+h/2,b.z),.02,MAT.yellow,1);
  const L=a.distanceTo(b),n=Math.max(1,Math.ceil(L/1.6));for(let k=0;k<=n;k++){const q=a.clone().lerp(b,k/n);rod(p,q,V(q.x,q.y+h,q.z),.025,MAT.yellow,1)}}}
function stairs(p,a,b,w){const rise=b.y-a.y,n=Math.ceil(rise/.2);const dir=V(b.x-a.x,0,b.z-a.z);const run=dir.length();dir.normalize();const side=V(-dir.z,0,dir.x).multiplyScalar(w/2);
  for(let i=0;i<n;i++){const q=a.clone().lerp(b,(i+.5)/n);const s=box(p,w,.04,run/n*1.1,MAT.grate,q.x,q.y,q.z);s.rotation.y=Math.atan2(dir.x,dir.z)}
  for(const sg of[1,-1]){const o=side.clone().multiplyScalar(sg);bar(p,a.clone().add(o),b.clone().add(o),.08,MAT.yellowW,.22);handrail(p,[a.clone().add(o),b.clone().add(o)],1)}}
function textTex(lines,{w=512,h=256,bg='#13603a',fg='#fff',font='bold 64px Barlow Condensed, Arial Narrow, sans-serif',border}={}){
  return canvasTex(w,h,(g)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);if(border){g.strokeStyle=border;g.lineWidth=10;g.strokeRect(5,5,w-10,h-10)}g.fillStyle=fg;g.font=font;g.textAlign='center';g.textBaseline='middle';const lh=h/(lines.length+1);lines.forEach((t,i)=>g.fillText(t,w/2,lh*(i+1)))})}
function label3D(text,scale=1){const c=document.createElement('canvas');const g=c.getContext('2d');g.font='600 40px IBM Plex Sans, Arial, sans-serif';const tw=g.measureText(text).width+36;c.width=tw;c.height=64;g.font='600 40px IBM Plex Sans, Arial, sans-serif';g.fillStyle='rgba(16,22,27,.86)';g.fillRect(0,0,tw,64);g.fillStyle='#f0a81c';g.fillRect(0,0,6,64);g.fillStyle='#ebe6da';g.textBaseline='middle';g.fillText(text,20,34);
  const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.scale.set(tw/64*.32*scale,.32*scale,1);s.renderOrder=10;return s}

/* ---------- motor ---------- */
function initEngine(){
  if(renderer)return;
  makeTextures();makeMaterials();
  const view=$('#view');
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.xr.enabled=true;
  view.prepend(renderer.domElement);
  scene=new THREE.Scene();scene.fog=new THREE.Fog(0xc9d5dc,220,1300);
  camera=new THREE.PerspectiveCamera(55,1,.08,2400);
  dolly=new THREE.Group();dolly.add(camera);scene.add(dolly);
  const sunDir=V(.55,.72,.42).normalize();
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{top:{value:new THREE.Color(0x3f78b5)},hor:{value:new THREE.Color(0xd4e0e6)},bot:{value:new THREE.Color(0x9c9682)},sd:{value:sunDir}},
    vertexShader:'varying vec3 vW;void main(){vW=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform vec3 top,hor,bot,sd;varying vec3 vW;void main(){float h=vW.y;vec3 c=h>0.?mix(hor,top,pow(clamp(h,0.,1.),.5)):mix(hor,bot,pow(clamp(-h,0.,1.),.35));float s=max(dot(normalize(vW),sd),0.);c+=vec3(1.,.92,.75)*pow(s,600.)*3.+vec3(1.,.88,.7)*pow(s,10.)*.22;gl_FragColor=vec4(c,1.);}'});
  sky=new THREE.Mesh(new THREE.SphereGeometry(1500,32,16),skyMat);scene.add(sky);
  // entorno para reflejos
  const envT=canvasTex(512,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#5d8ec4');gr.addColorStop(.47,'#dbe5ea');gr.addColorStop(.53,'#9a9078');gr.addColorStop(1,'#5f5442');g.fillStyle=gr;g.fillRect(0,0,w,h);const sx=w*.62,sy=h*.2;const sg=g.createRadialGradient(sx,sy,0,sx,sy,60);sg.addColorStop(0,'rgba(255,250,230,1)');sg.addColorStop(1,'rgba(255,250,230,0)');g.fillStyle=sg;g.fillRect(0,0,w,h)});
  envT.mapping=THREE.EquirectangularReflectionMapping;envT.wrapS=THREE.ClampToEdgeWrapping;envT.wrapT=THREE.ClampToEdgeWrapping;scene.environment=envT;
  scene.add(new THREE.HemisphereLight(0xd9e6f0,0x6e5d43,.55));
  sun=new THREE.DirectionalLight(0xfff0d6,2.1);sun.position.copy(sunDir).multiplyScalar(120);sun.castShadow=true;
  const sc=sun.shadow.camera;sc.left=-55;sc.right=55;sc.top=60;sc.bottom=-40;sc.near=20;sc.far=300;sun.shadow.bias=-.0004;sun.shadow.normalBias=.03;
  scene.add(sun);scene.add(sun.target);
  world=new THREE.Group();scene.add(world);
  raycaster=new THREE.Raycaster();
  buildWorld();
  setupInput(renderer.domElement);setupXR();
  new ResizeObserver(resize).observe(view);applyQuality();resize();
  renderer.setAnimationLoop(tick);
}
function applyQuality(){
  const q=QUALITY;renderer.setPixelRatio(Math.min(devicePixelRatio,q==='alto'?2:q==='medio'?1.5:1));
  renderer.shadowMap.enabled=q!=='bajo';sun.shadow.mapSize.set(q==='alto'?4096:2048,q==='alto'?4096:2048);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}
  scene.traverse(o=>{if(o.material&&o.material.needsUpdate!==undefined)o.material.needsUpdate=true});
  $('#btnQ').textContent='Gráficos: '+q;resize();
}
$('#btnQ').addEventListener('click',()=>{QUALITY=QUALITY==='alto'?'medio':QUALITY==='medio'?'bajo':'alto';applyQuality()});
function resize(){if(!renderer||renderer.xr.isPresenting)return;const v=$('#view');const w=v.clientWidth||1,h=v.clientHeight||1;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}

/* ---------- cámara: órbita / primera persona / cinemática ---------- */
const CAM={mode:'orbit',lock:false,orb:{th:.75,ph:1.15,r:80,t:V(0,18,0)},og:{th:.75,ph:1.15,r:80,t:V(0,18,0)},fp:{pos:V(),yaw:0,pitch:0},fg:{yaw:0,pitch:0},cine:null,pos:V(60,40,60),tgt:V(0,18,0)};
function syncOrbit(){const d=CAM.pos.clone().sub(CAM.tgt);const r=d.length()||1;Object.assign(CAM.orb,{r,ph:Math.acos(clamp(d.y/r,-1,1)),th:Math.atan2(d.x,d.z)});CAM.orb.t.copy(CAM.tgt)}
function orbit(t,r,th,ph){if(CAM.mode!=='orbit'){syncOrbit();CAM.og.th=CAM.orb.th;CAM.og.ph=CAM.orb.ph}CAM.mode='orbit';CAM.lock=false;const g=CAM.og;g.t.copy(t);g.r=r;if(th!=null){let d=th-CAM.orb.th;d=Math.atan2(Math.sin(d),Math.cos(d));g.th=CAM.orb.th+d}if(ph!=null)g.ph=ph}
function lookFrom(pos,tgt){const d=V(tgt[0]-pos[0],tgt[1]-pos[1],tgt[2]-pos[2]);const r=d.length();orbit(V(...tgt),r,Math.atan2(-d.x,-d.z),Math.acos(clamp(-d.y/r,-1,1)))}
function fpMode(pos,yaw,pitch){CAM.mode='fp';CAM.lock=false;CAM.fp.pos.copy(pos);CAM.fp.yaw=CAM.fg.yaw=yaw;CAM.fp.pitch=CAM.fg.pitch=pitch||0}
function fpLook(yaw,pitch){CAM.fg.yaw=yaw;CAM.fg.pitch=pitch}
function cineTo(pos,tgt,dur,lock=true){return new Promise(res=>{CAM.mode='cine';CAM.lock=lock;CAM.cine={p0:CAM.pos.clone(),t0:CAM.tgt.clone(),p1:pos.clone(),t1:tgt.clone(),t:0,dur:dur||2,res}})}
function camUpdate(dt){
  const k=1-Math.pow(.003,dt);
  if(CAM.mode==='orbit'){const o=CAM.orb,g=CAM.og;o.th+=(g.th-o.th)*k;o.ph+=(g.ph-o.ph)*k;o.r+=(g.r-o.r)*k;o.t.lerp(g.t,k);CAM.tgt.copy(o.t);
    CAM.pos.set(o.t.x+o.r*Math.sin(o.ph)*Math.sin(o.th),o.t.y+o.r*Math.cos(o.ph),o.t.z+o.r*Math.sin(o.ph)*Math.cos(o.th));if(CAM.pos.y<.6&&!MODE.under)CAM.pos.y=.6}
  else if(CAM.mode==='fp'){const f=CAM.fp,g=CAM.fg;f.yaw+=(g.yaw-f.yaw)*k;f.pitch+=(g.pitch-f.pitch)*k;CAM.pos.copy(f.pos);
    CAM.tgt.set(f.pos.x-Math.sin(f.yaw)*Math.cos(f.pitch),f.pos.y+Math.sin(f.pitch),f.pos.z-Math.cos(f.yaw)*Math.cos(f.pitch))}
  else if(CAM.cine){const c=CAM.cine;c.t+=dt;const p=ease(Math.min(1,c.t/c.dur));CAM.pos.lerpVectors(c.p0,c.p1,p);CAM.tgt.lerpVectors(c.t0,c.t1,p);if(p>=1&&c.res){const r=c.res;c.res=null;r()}}
  camera.position.copy(CAM.pos);camera.lookAt(CAM.tgt);
}
async function fade(fn){$('#fade').classList.add('on');await wait(380);fn&&fn();await wait(80);$('#fade').classList.remove('on')}

/* ---------- interacción ---------- */
const INTER=[];let WAITER=null;const HOLD={on:false};
function act(obj,id,label){obj.userData.act=id;if(label)obj.userData.label=label;obj.traverse(o=>{if(o.isMesh&&!o.userData.m0){o.userData.m0=o.material;o.material=Array.isArray(o.material)?o.material.map(x=>x.clone()):o.material.clone()}});if(!INTER.includes(obj))INTER.push(obj);return obj}
function emis(o,r,g,b){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{if(m&&m.emissive)m.emissive.setRGB(r,g,b)})}
function unact(obj){const i=INTER.indexOf(obj);if(i>=0)INTER.splice(i,1);obj.userData.hot=false;obj.traverse(o=>{if(o.isMesh)emis(o,0,0,0)})}
function clearActs(){INTER.slice().forEach(unact)}
function hot(obj,v=true){if(obj)obj.userData.hot=v}
function waitInput(){return new Promise(r=>{WAITER=r})}
function dispatch(v){if(WAITER){const w=WAITER;WAITER=null;w(v)}}
function visibleDeep(o){while(o){if(!o.visible)return false;o=o.parent}return true}
function hitTest(rc){
  const objs=INTER.filter(visibleDeep);const h=rc.intersectObjects(objs,true)[0];
  if(h){let o=h.object;while(o&&!o.userData.act)o=o.parent;if(o)return{act:o.userData.act,obj:o,point:h.point}}
  for(const x of rc.intersectObject(world,true)){let o=x.object,vis=true;while(o&&!o.userData.part){if(!o.visible)vis=false;o=o.parent}if(o&&vis&&visibleDeep(o))return{part:o.userData.part,point:x.point}}
  return null}
function onHit(h){if(!h)return;if(h.act){if(h.act==='HOLD')return;dispatch(h.act)}else if(h.part&&MODE.onPart)MODE.onPart(h.part)}
function setupInput(el){
  const pts=new Map();let down=null,pinch=0;
  const dist=()=>{const a=[...pts.values()];return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};
  el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===1)down={moved:0};if(pts.size===2)pinch=dist()});
  el.addEventListener('pointermove',e=>{
    const p=pts.get(e.pointerId);if(!p){if(e.pointerType==='mouse')hover(e);return}
    const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
    if(pts.size===1){if(down)down.moved+=Math.abs(dx)+Math.abs(dy);if(down&&down.moved<5)return;
      if(CAM.mode==='cine'){if(CAM.lock)return;syncOrbit();CAM.og.th=CAM.orb.th;CAM.og.ph=CAM.orb.ph;CAM.og.r=CAM.orb.r;CAM.og.t.copy(CAM.orb.t);CAM.mode='orbit'}
      if(CAM.mode==='orbit'){CAM.og.th-=dx*.006;CAM.og.ph=clamp(CAM.og.ph-dy*.006,.12,MODE.under?2.6:1.56)}
      else if(CAM.mode==='fp'){CAM.fg.yaw+=dx*.005;CAM.fg.pitch=clamp(CAM.fg.pitch+dy*.005,-1.35,1.2)}}
    else if(pts.size===2&&CAM.mode==='orbit'){const d=dist();if(pinch)CAM.og.r=clamp(CAM.og.r*pinch/d,3,220);pinch=d;if(down)down.moved=99}});
  const up=e=>{if(down&&down.moved<6&&pts.size===1)pickAt(e.clientX,e.clientY);pts.delete(e.pointerId);if(!pts.size)down=null;pinch=0};
  el.addEventListener('pointerup',up);el.addEventListener('pointercancel',e=>{pts.delete(e.pointerId);down=null});
  el.addEventListener('wheel',e=>{e.preventDefault();if(CAM.mode==='orbit')CAM.og.r=clamp(CAM.og.r*(1+e.deltaY*.001),3,220)},{passive:false});
  el.addEventListener('pointerleave',()=>{$('#tip').hidden=true});
}
function rayFromScreen(x,y){const r=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera({x:(x-r.left)/r.width*2-1,y:-(y-r.top)/r.height*2+1},camera);return raycaster}
function pickAt(x,y){onHit(hitTest(rayFromScreen(x,y)))}
let hoverT=0;
function hover(e){const now=performance.now();if(now-hoverT<60)return;hoverT=now;const h=hitTest(rayFromScreen(e.clientX,e.clientY));const tip=$('#tip');
  const lbl=h&&(h.act?h.obj.userData.label:(MODE.onPart&&PARTS[h.part]?PARTS[h.part].n:null));
  renderer.domElement.style.cursor=lbl||(h&&h.act)?'pointer':'grab';
  if(lbl){const r=$('#view').getBoundingClientRect();tip.textContent=lbl;tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';tip.hidden=false}else tip.hidden=true}

/* ---------- XR ---------- */
const XRS={pos:V(4,0,10),yaw:0};let VRB=null,VRBTN=[],CURBTN=[];
function station(pos,yaw){XRS.pos.copy(pos);XRS.yaw=yaw||0;if(renderer&&renderer.xr.isPresenting&&!MODE.ar){dolly.position.copy(XRS.pos);dolly.rotation.y=XRS.yaw}}
function setupXR(){
  const tmp=new THREE.Matrix4(),rc=new THREE.Raycaster();
  for(let i=0;i<2;i++){const c=renderer.xr.getController(i);
    const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(0,0,0),V(0,0,-8)]),new THREE.LineBasicMaterial({color:0xf0a81c}));c.add(line);
    const sel=down=>{tmp.identity().extractRotation(c.matrixWorld);rc.ray.origin.setFromMatrixPosition(c.matrixWorld);rc.ray.direction.set(0,0,-1).applyMatrix4(tmp);
      if(down){const h=hitTest(rc);if(h&&h.act==='HOLD'){HOLD.on=true;return}onHit(h)}else HOLD.on=false};
    c.addEventListener('selectstart',()=>sel(true));c.addEventListener('selectend',()=>sel(false));dolly.add(c);
    const g=renderer.xr.getControllerGrip(i);box(g,.05,.04,.14,MAT.steelDk,0,0,.03);dolly.add(g)}
  // tablero flotante con instructor + tarea
  const cv=document.createElement('canvas');cv.width=1024;cv.height=512;const tx=new THREE.CanvasTexture(cv);tx.encoding=THREE.sRGBEncoding;
  VRB={cv,tx,mesh:new THREE.Mesh(new THREE.PlaneGeometry(1.3,.65),new THREE.MeshBasicMaterial({map:tx,transparent:true}))};
  VRB.mesh.position.set(-.85,1.45,-1.35);VRB.mesh.rotation.y=.5;VRB.mesh.visible=false;dolly.add(VRB.mesh);
  renderer.xr.addEventListener('sessionstart',()=>{VRB.mesh.visible=true;vrDraw();vrButtons(CURBTN)});
  renderer.xr.addEventListener('sessionend',()=>{VRB.mesh.visible=false;vrButtons(CURBTN);MODE.ar=false;sky.visible=true;ground.visible=true;world.scale.setScalar(1);world.position.set(0,0,0);dolly.position.set(0,0,0);dolly.rotation.set(0,0,0);resize()});
}
function wrapText(g,text,x,y,maxW,lh){const words=String(text).split(' ');let line='';for(const w of words){const t=line?line+' '+w:w;if(g.measureText(t).width>maxW&&line){g.fillText(line,x,y);y+=lh;line=w}else line=t}if(line)g.fillText(line,x,y);return y}
function vrDraw(){if(!VRB||!renderer.xr.isPresenting)return;const g=VRB.cv.getContext('2d');g.fillStyle='rgba(16,22,27,.92)';g.fillRect(0,0,1024,512);g.fillStyle='#f0a81c';g.fillRect(0,0,10,512);
  g.font='600 30px Arial';g.fillStyle='#f0a81c';g.fillText('ING. RAMIRO CÁRDENAS · INSTRUCTOR',36,52);g.font='34px Arial';g.fillStyle='#ebe6da';let y=wrapText(g,SUBTXT,36,104,950,42);
  g.font='600 30px Arial';g.fillStyle='#62a8d4';wrapText(g,TASK?'TAREA: '+TASK:'',36,Math.max(y+56,380),950,38);VRB.tx.needsUpdate=true}
function vrButtons(list){VRBTN.forEach(b=>{unact(b);dolly.remove(b)});VRBTN=[];if(!renderer||!renderer.xr.isPresenting)return;
  list.forEach((o,i)=>{const t=textTex([o.t.length>46?o.t.slice(0,44)+'…':o.t],{w:1024,h:128,bg:o.v==='HOLD'?'#a3301e':'#232e37',fg:'#ebe6da',font:'600 40px Arial',border:'#f0a81c'});
    const m=new THREE.Mesh(new THREE.PlaneGeometry(.9,.112),new THREE.MeshStandardMaterial({map:t,emissive:0x000000,emissiveMap:t}));m.position.set(.75,1.62-i*.135,-1.2);m.rotation.y=-.5;dolly.add(m);act(m,o.v);VRBTN.push(m)})}
async function enterXR(mode){
  initEngine();
  if(!navigator.xr){toast('Este navegador no tiene WebXR. Abre la versión publicada (GitHub Pages) en el navegador de las Meta Quest o en Chrome para Android.');return}
  let ok=false;try{ok=await navigator.xr.isSessionSupported(mode)}catch(e){}
  if(!ok){toast(mode==='immersive-vr'?'Modo VR no disponible aquí. En las Quest, abre la versión publicada en su navegador.':'Modo AR no disponible aquí. Prueba en Chrome para Android con ARCore o en las Quest 3.');return}
  try{const s=await navigator.xr.requestSession(mode,{optionalFeatures:['local-floor']});renderer.xr.setReferenceSpaceType('local-floor');await renderer.xr.setSession(s);
    if(mode==='immersive-ar'){MODE.ar=true;sky.visible=false;ground.visible=false;world.scale.setScalar(.018);world.position.set(0,0,-1.4)}
    else{dolly.position.copy(XRS.pos);dolly.rotation.y=XRS.yaw}
  }catch(e){toast('No se pudo iniciar la sesión inmersiva: '+e.message)}}
$('#btnVR').addEventListener('click',()=>enterXR('immersive-vr'));
$('#btnAR').addEventListener('click',()=>enterXR('immersive-ar'));

/* ---------- narrador (voz del instructor) ---------- */
const NAR={muted:false,voice:null,speaking:false,cancel:null,last:''};
let SUBTXT='',TASK='';
function pickVoice(){if(!('speechSynthesis' in window))return;const vs=speechSynthesis.getVoices();const pref=['es-CO','es-MX','es-US','es-419','es-ES','es'];
  for(const p of pref){const m=vs.filter(v=>v.lang&&v.lang.replace('_','-').toLowerCase().startsWith(p.toLowerCase()));if(m.length){NAR.voice=m.find(v=>/male|jorge|diego|pablo|juan|carlos|raul|enrique/i.test(v.name))||m[0];return}}}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function setSub(t){SUBTXT=t;$('#subText').textContent=t||'—';vrDraw()}
function task(t){TASK=t||'';$('#hintText').textContent=TASK;$('#hint').hidden=!TASK;vrDraw()}
function stopSay(){if(NAR.cancel){const c=NAR.cancel;NAR.cancel=null;c()}}
function say(text){
  stopSay();NAR.last=text;setSub(text);
  return new Promise(res=>{
    let done=false;const fin=()=>{if(done)return;done=true;NAR.speaking=false;NAR.cancel=null;clearTimeout(tm);res()};
    const est=Math.max(1600,text.split(/\s+/).length*390);let tm;
    NAR.speaking=true;
    if(NAR.muted||!('speechSynthesis' in window)){tm=setTimeout(fin,NAR.muted?Math.max(1400,est*.75):est);NAR.cancel=fin;return}
    try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=NAR.voice?NAR.voice.lang:'es-CO';if(NAR.voice)u.voice=NAR.voice;u.rate=1.04;u.pitch=.92;
      u.onend=fin;u.onerror=fin;NAR.cancel=()=>{try{speechSynthesis.cancel()}catch(e){}fin()};speechSynthesis.speak(u);tm=setTimeout(fin,est*2.2+3000)}
    catch(e){tm=setTimeout(fin,est);NAR.cancel=fin}
  })}
$('#subSkip').addEventListener('click',stopSay);
$('#subRepeat').addEventListener('click',()=>{if(NAR.last)say(NAR.last)});
$('#btnVoice').addEventListener('click',()=>{NAR.muted=!NAR.muted;$('#btnVoice').textContent='Voz: '+(NAR.muted?'no':'sí');if(NAR.muted&&'speechSynthesis' in window)speechSynthesis.cancel()});

/* ---------- control de guiones (cancelables) ---------- */
const ABORT={abort:1};let CTX={dead:true};let MODE={};
function newCtx(){CTX.dead=true;stopSay();WAITER=null;TW.length=0;clearActs();CURBTN=[];vrButtons([]);HOLD.on=false;task('');CTX={dead:false};return CTX}
async function w(p){const c=CTX;const r=await p;if(c.dead)throw ABORT;return r}
function run(fn){fn().catch(e=>{if(e!==ABORT)console.error(e)})}

/* ---------- panel ---------- */
const P=$('#panel');
P.addEventListener('click',e=>{const b=e.target.closest('[data-in]');if(b&&!b.disabled)dispatch(b.dataset.in)});
P.addEventListener('pointerdown',e=>{const b=e.target.closest('.hold');if(b){HOLD.on=true;b.classList.add('on');b.setPointerCapture&&b.setPointerCapture(e.pointerId)}});
const holdOff=()=>{HOLD.on=false;P.querySelectorAll('.hold.on').forEach(b=>b.classList.remove('on'))};
P.addEventListener('pointerup',holdOff);P.addEventListener('pointercancel',holdOff);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function panel(h){P.innerHTML=h}
function optsHTML(opts){return `<div class="list">${opts.map(o=>o.v==='HOLD'?`<button class="btn hold" type="button">${esc(o.t)}</button>`:`<button class="opt" type="button" data-in="${esc(o.v)}">${o.t}</button>`).join('')}</div>`}
function setButtons(opts){CURBTN=opts;vrButtons(opts)}
async function ask(head,opts,valid){
  panel(head+optsHTML(opts));setButtons(opts);
  for(;;){const v=await w(waitInput());if((valid&&valid.includes(v))||opts.some(o=>o.v===v)){setButtons([]);return v}}
}
