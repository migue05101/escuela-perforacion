/* ===================================================================== MODELOS */
const F=7.6,H=43,MONK=26.6,LEN=27.4,EOFF=5.7;
const SLOTZ=1.38,SX=i=>-.78-.21*i;
let ground,pad;
const RIG={parts:{},people:[]};
function part(key,parent){const g=new THREE.Group();g.userData.part=key;g.name=key;RIG.parts[key]=g;(parent||world).add(g);return g}

/* ---------- terreno con hueco del contrapozo ---------- */
function rectHole(p,x0,x1,z0,z1,hh,y,mat,tile){
  const g=new THREE.Group();
  const rect=(a,b,c,d)=>{if(b-a<=0||d-c<=0)return;const geo=new THREE.PlaneGeometry(b-a,d-c);const uv=geo.attributes.uv,pos=geo.attributes.position;
    for(let i=0;i<uv.count;i++){const wx=pos.getX(i)+(a+b)/2,wz=-pos.getY(i)+(c+d)/2;uv.setXY(i,wx/tile,-wz/tile)}
    const m=new THREE.Mesh(geo,mat);m.rotation.x=-Math.PI/2;m.position.set((a+b)/2,y,(c+d)/2);m.receiveShadow=true;g.add(m)};
  rect(x0,x1,hh,z1);rect(x0,x1,z0,-hh);rect(x0,-hh,-hh,hh);rect(hh,x1,-hh,hh);p.add(g);return g}

function makeStand(){const g=new THREE.Group();const j=LEN/3;
  for(let k=0;k<3;k++)cyl(g,.064,.064,j-.5,MAT.pipe,0,k*j+j/2,0,14);
  for(let k=0;k<=3;k++)cyl(g,.084,.084,.46,MAT.tj,0,k*j+(k===0?.23:k===3?-.23:0),0,16);
  g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
function setStand(g,base,top){g.position.copy(base);const d=V(top.x-base.x,top.y-base.y,top.z-base.z).normalize();g.quaternion.setFromUnitVectors(Y,d)}

/* ---------- personas ---------- */
function makePerson(o){
  o=Object.assign({suit:0xd8661c,hat:0xf2d22e,skin:0xb07a58,glasses:true},o);
  const suit=std(o.suit,{roughness:.85,metalness:0}),skin=std(o.skin,{roughness:.65,metalness:0}),refl=std(0xd8dcd4,{emissive:0x3a3a3a,roughness:.35,metalness:.4}),
    boot=std(0x2a1d14,{roughness:.8,metalness:0}),glove=std(o.glove||0xe0b23a,{roughness:.8,metalness:0}),dark=std(0x1a1512,{roughness:.6}),hatM=std(o.hat,{roughness:.35,metalness:.05});
  const g=new THREE.Group(),P={g};
  const limb=(par,r1,r2,len,mat)=>{const m=cyl(par,r1,r2,len,mat,0,-len/2,0,12);sph(par,r1,mat,0,0,0);sph(par,r2,mat,0,-len,0);return m};
  function sph(par,r,mat,x,y,z,sx,sy,sz){const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),mat);m.position.set(x,y,z);if(sx)m.scale.set(sx,sy,sz);par.add(m);return m}
  // piernas
  for(const s of[-1,1]){const hip=new THREE.Group();hip.position.set(s*.1,.93,0);g.add(hip);limb(hip,.085,.072,.44,suit);
    const knee=new THREE.Group();knee.position.y=-.44;hip.add(knee);limb(knee,.07,.06,.42,suit);cyl(knee,.075,.075,.06,refl,0,-.3,0,12);
    box(knee,.13,.11,.28,boot,0,-.47,.05);P[s<0?'legL':'legR']={hip,knee}}
  // torso
  const torso=new THREE.Group();torso.position.y=.9;g.add(torso);P.torso=torso;
  const tp=[[0,0],[.16,0],[.17,.08],[.155,.2],[.175,.36],[.19,.47],[.17,.54],[.08,.6],[0,.61]];
  const t=lathe(torso,tp,suit,0,20);t.scale.set(1.15,1,.72);
  for(const y of[.2,.42]){const b=cyl(torso,.166,.166,.045,refl,0,y,0,20);b.scale.set(1.18,1,.74)}
  cyl(torso,.18,.18,.06,std(0x3b2f25,{roughness:.6}),0,.03,0,20).scale.set(1.18,1,.74);// cinturón
  if(o.harness){const hm=std(0x1d4fa0,{roughness:.6});rod(torso,V(-.11,.05,.13),V(.11,.5,.1),.022,hm);rod(torso,V(.11,.05,.13),V(-.11,.5,.1),.022,hm);box(torso,.08,.08,.04,std(0x9aa1a5,{metalness:.8,roughness:.3}),0,.42,-.13)}
  // cabeza
  const neck=cyl(torso,.05,.055,.09,skin,0,.64,0,12);
  const head=new THREE.Group();head.position.y=.76;torso.add(head);P.head=head;
  sph(head,.105,skin,0,0,0,.9,1.08,1);
  sph(head,.1,std(0x1b1410,{roughness:.9}),0,.02,-.02,.92,1,.95);// pelo
  sph(head,.103,skin,0,-.005,.012,.88,1.04,.97);
  for(const s of[-1,1]){sph(head,.016,std(0xf2efe8),s*.037,.02,.088);sph(head,.008,dark,s*.037,.02,.101);box(head,.035,.008,.01,dark,s*.038,.048,.095);sph(head,.022,skin,s*.098,0,0,.5,1,.8)}
  const nose=cyl(head,.004,.018,.04,skin,0,-.005,.1,8);nose.rotation.x=Math.PI/2;
  const mouth=box(head,.042,.008,.012,std(0x5a2420,{roughness:.6}),0,-.048,.093);P.mouth=mouth;
  if(o.mustache)box(head,.055,.012,.012,std(0x1b1410),0,-.033,.098);
  if(o.glasses){const gm=std(0x222a30,{roughness:.1,metalness:.6,transparent:true,opacity:.55});box(head,.13,.035,.01,gm,0,.02,.108)}
  // casco
  const hat=new THREE.Group();hat.position.y=.035;head.add(hat);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(.128,20,12,0,Math.PI*2,0,Math.PI/2),hatM);dome.scale.set(1,.92,1.08);hat.add(dome);
  cyl(hat,.15,.155,.012,hatM,0,0,.012,24).scale.set(1,1,1.1);box(hat,.025,.02,.24,hatM,0,.115,0);
  if(o.hatStripe)cyl(hat,.129,.129,.02,std(o.hatStripe),0,.03,0,24);
  // brazos
  for(const s of[-1,1]){const sh=new THREE.Group();sh.position.set(s*.205,.5,0);torso.add(sh);limb(sh,.06,.052,.29,suit);cyl(sh,.064,.064,.045,refl,0,-.12,0,12);
    const el=new THREE.Group();el.position.y=-.29;sh.add(el);limb(el,.05,.045,.26,suit);box(el,.075,.1,.04,glove,0,-.3,0);
    sh.rotation.z=s*.12;P[s<0?'armL':'armR']={sh,el}}
  P.base={hipL:0};g.userData.person=P;
  g.traverse(m=>{if(m.isMesh){m.castShadow=true}});
  P.anim='idle';P.ph=R()*6;P.point=null;P.talk=false;
  RIG.people.push(P);return P}
const tmpV=V(0,0,0),tmpQ=new THREE.Quaternion();
function animatePeople(dt,T){
  for(const P of RIG.people){if(!visibleDeep(P.g))continue;if(P.gltf){animGLTF(P,dt,T);continue}const t=T+P.ph;
    P.torso.scale.y=1+Math.sin(t*1.6)*.008;P.head.rotation.y=Math.sin(t*.4)*.15;
    let ar=P.armR,al=P.armL;
    if(P.anim==='walk'){const s=Math.sin(t*7);P.legL.hip.rotation.x=s*.5;P.legR.hip.rotation.x=-s*.5;P.legL.knee.rotation.x=Math.max(0,-s)*.6;P.legR.knee.rotation.x=Math.max(0,s)*.6;al.sh.rotation.x=-s*.4;ar.sh.rotation.x=s*.4}
    else if(P.anim==='climb'){const s=Math.sin(t*4);P.legL.hip.rotation.x=-.6-s*.4;P.legR.hip.rotation.x=-.6+s*.4;P.legL.knee.rotation.x=.9+s*.3;P.legR.knee.rotation.x=.9-s*.3;al.sh.rotation.x=-2.6-s*.3;ar.sh.rotation.x=-2.6+s*.3;al.el.rotation.x=-.4;ar.el.rotation.x=-.4}
    else if(P.anim==='work'){const s=Math.sin(t*3);al.sh.rotation.x=-.9+s*.25;ar.sh.rotation.x=-.9-s*.25;al.el.rotation.x=-.8;ar.el.rotation.x=-.8;P.legL.hip.rotation.x=P.legR.hip.rotation.x=0}
    else if(P.anim==='down'){P.g.rotation.z=lerp(P.g.rotation.z,Math.PI/2,.1)}
    else{for(const L of[P.legL,P.legR]){L.hip.rotation.x*=.9;L.knee.rotation.x*=.9}al.sh.rotation.x=lerp(al.sh.rotation.x,P.talk?-.35+Math.sin(t*2.3)*.25:0,.1);al.el.rotation.x=lerp(al.el.rotation.x,P.talk?-.7:0,.1)}
    if(P.anim!=='walk'&&P.anim!=='climb'&&P.anim!=='work'){
      if(P.point){P.g.updateMatrixWorld();const sw=ar.sh.parent.localToWorld(ar.sh.position.clone());const d=P.point.clone().sub(sw).normalize();
        tmpQ.copy(ar.sh.parent.getWorldQuaternion(new THREE.Quaternion())).invert();d.applyQuaternion(tmpQ);const q=new THREE.Quaternion().setFromUnitVectors(V(0,-1,0),d);ar.sh.quaternion.slerp(q,.12);ar.el.rotation.x=lerp(ar.el.rotation.x,0,.1)}
      else{ar.sh.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(P.talk?-.25+Math.sin(t*1.9+1)*.2:0,0,.12)),.1);ar.el.rotation.x=lerp(ar.el.rotation.x,P.talk?-.5:0,.1)}}
    if(P.mouth){const m=P.talk?(.25+.75*Math.abs(Math.sin(t*15)*Math.sin(t*4.7+1))):0;P.mouth.scale.y=lerp(P.mouth.scale.y,.008+m*.03,.5)}
  }}

/* ---------- mundo ---------- */
function buildWorld(){
  ground=new THREE.Group();world.add(ground);
  const gm=std(0xffffff,{map:TEX.grass,roughness:1,metalness:0}),pm=std(0xffffff,{map:TEX.gravel,roughness:1,metalness:0});
  rectHole(ground,-700,700,-700,700,1.85,-.02,gm,9);
  pad=rectHole(ground,-42,46,-52,54,1.85,.01,pm,5);
  buildSite();buildCellar();buildBOP();buildSub();buildFloor();buildDrawworks();buildDoghouse();buildMast();buildMud();buildRacks();buildTools();buildCrew();buildCrane();buildInstructor();buildWell();buildFX();
  world.traverse(o=>{if(o.isMesh){if(o.castShadow===false)return;o.castShadow=true;o.receiveShadow=true}});
  ground.traverse(o=>{if(o.isMesh)o.castShadow=false});
  // materiales propios por componente (para resaltarlos sin afectar a los demás)
  for(const k in RIG.parts){const cache=new Map();RIG.parts[k].traverse(o=>{if(o.isMesh&&o.material&&!o.userData.keepMat){if(!cache.has(o.material))cache.set(o.material,o.material.clone());o.material=cache.get(o.material)}})}
}
function highlight(key){for(const k in RIG.parts)RIG.parts[k].traverse(o=>{if(o.isMesh&&o.material.emissive&&!o.userData.act&&!o.userData.keepMat)o.material.emissive.setHex(k===key?0x2b1a00:0)})}

function buildSite(){
  const s=new THREE.Group();world.add(s);RIG.site=s;
  // montañas del Huila al fondo
  const mm=std(0x4f6a45,{roughness:1,metalness:0,flatShading:true});
  [[-420,-380,170,140],[-150,-520,210,190],[220,-470,190,160],[480,-260,160,120],[520,180,150,110],[-520,200,200,150],[60,560,230,170],[-300,480,170,120]].forEach(([x,z,r,h])=>{const c=new THREE.Mesh(new THREE.ConeGeometry(r,h,9,1),mm);c.position.set(x,h/2-6,z);c.rotation.y=R()*3;c.castShadow=false;s.add(c)});
  // árboles (instanciados)
  const N=110,trunk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.18,.28,4,6),std(0x5a4330,{roughness:1}),N),crown=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.6,0),std(0x3f6a2c,{roughness:1,flatShading:true}),N);
  const mtx=new THREE.Matrix4();let n=0;
  while(n<N){const a=R()*Math.PI*2,r=62+R()*140,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<9&&z>40)continue;const sc=.7+R()*.9;
    mtx.compose(V(x,2*sc,z),new THREE.Quaternion(),V(sc,sc,sc));trunk.setMatrixAt(n,mtx);mtx.compose(V(x,(4.6+R())*sc,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(R(),R(),R())),V(sc*(1+R()*.4),sc*(.9+R()*.5),sc*(1+R()*.4)));crown.setMatrixAt(n,mtx);n++}
  s.add(trunk);s.add(crown);
  // vía de acceso
  const road=new THREE.Mesh(new THREE.PlaneGeometry(8,160),std(0x7d725f,{map:rep(TEX.gravel,2,30),roughness:1}));road.rotation.x=-Math.PI/2;road.position.set(0,.015,132);road.receiveShadow=true;s.add(road);
  // portería y aviso
  for(const x of[-5,5])box(s,.3,4,.3,MAT.yellowW,x,2,52);box(s,10.6,.3,.3,MAT.yellowW,0,4,52);
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(6,1.6),std(0xffffff,{map:textTex(['LOCACIÓN DE PERFORACIÓN','USO OBLIGATORIO DE EPP'],{bg:'#0f4d8a',font:'bold 56px Barlow Condensed, Arial Narrow, sans-serif'}),roughness:.6}));sign.position.set(0,5.1,52.2);s.add(sign);
  // generadores, combustible, agua
  for(let i=0;i<3;i++){const z=-10+i*6.5;boxT(s,12,2.8,2.6,MAT.white,-27,1.4,z);for(const x of[-30,-26])cyl(s,.22,.22,1.8,MAT.steelDk,x,3.6,z,10);box(s,11.8,.2,2.4,MAT.steel,-27,2.9,z)}
  cyl(s,1.6,1.6,10,MAT.white,-27,2,-24,24,'x');for(const x of[-31,-23])box(s,.5,1,2.6,MAT.steel,x,.5,-24);
  cyl(s,2.4,2.4,4.5,MAT.tank,28,2.25,-24,24);
  // contenedores / oficinas
  [[-26,32],[-26,38],[-12,40]].forEach(([x,z])=>{boxT(s,9,2.8,3,MAT.white,x,1.5,z);box(s,.05,1,1.6,MAT.glass,x+4.52,1.9,z);box(s,2,.05,1,MAT.glass,x,1.9,z+1.52)});
  // torres de iluminación
  RIG.lamps=[];[[-34,-40],[38,-44],[-36,44],[40,40]].forEach(([x,z])=>{cyl(s,.12,.18,10,MAT.galv,x,5,z,8);const h=box(s,1.6,.8,.3,MAT.steelDk,x,10.2,z);h.lookAt(0,0,0);const l=box(s,1.4,.6,.05,MAT.lamp,x,10.2,z);l.lookAt(0,10,0);l.castShadow=false;RIG.lamps.push(l)});
  // manga de viento (viento del norte → sopla hacia +z)
  cyl(s,.06,.08,8,MAT.galv,-14,4,-14,8);const sock=new THREE.Mesh(new THREE.CylinderGeometry(.32,.12,2.2,16,1,true),std(0xffffff,{map:TEX.sock,side:THREE.DoubleSide,roughness:.8}));
  const sg=new THREE.Group();sg.position.set(-14,7.8,-14);s.add(sg);sock.rotation.x=Math.PI/2;sock.position.z=1.1;sg.add(sock);RIG.sock=sg;
  // puntos de encuentro
  RIG.pe=[];[[-6,-46,'PUNTO DE ENCUENTRO 1'],[-22,42,'PUNTO DE ENCUENTRO 2']].forEach(([x,z,t],i)=>{const g=new THREE.Group();g.position.set(x,0,z);s.add(g);cyl(g,.06,.06,2.6,MAT.galv,-.7,1.3,0,8);cyl(g,.06,.06,2.6,MAT.galv,.7,1.3,0,8);
    const tx=textTex([t.split(' ').slice(0,3).join(' '),t.split(' ').slice(3).join(' ')],{bg:'#147a3c',font:'bold 64px Barlow Condensed, Arial Narrow, sans-serif',border:'#fff'});const b=new THREE.Mesh(new THREE.BoxGeometry(2,1.1,.06),[MAT.white,MAT.white,MAT.white,MAT.white,std(0xffffff,{map:tx}),std(0xffffff,{map:tx})]);b.position.y=2.3;g.add(b);RIG.pe.push(g)});
  // estación de EPP
  const e=new THREE.Group();e.position.set(14,0,40);s.add(e);RIG.eppStation=e;
  for(const x of[-3.2,3.2])for(const z of[-1.6,1.4])cyl(e,.06,.06,2.8,MAT.galv,x,1.4,z,8);box(e,7,.1,3.4,MAT.blue,0,2.85,-.1);
  boxT(e,5.8,.08,1.1,MAT.wood,0,.9,-.6);for(const x of[-2.7,2.7])box(e,.08,.9,1,MAT.steel,x,.45,-.6);
  const sgn=new THREE.Mesh(new THREE.PlaneGeometry(3.2,.7),std(0xffffff,{map:textTex(['ESTACIÓN DE EPP'],{w:512,h:112,bg:'#0f4d8a'})}));sgn.position.set(0,2.4,-1.62);e.add(sgn);
}

function buildCellar(){
  const g=part('cellar');const c=MAT.concrete;
  for(const[x,z,w,d]of[[0,1.83,3.9,.24],[0,-1.83,3.9,.24],[1.83,0,.24,3.9],[-1.83,0,.24,3.9]])boxT(g,w,2.4,d,c,x,-1.05,z);
  boxT(g,3.7,.2,3.7,c,0,-2.25,0);
  cyl(g,.34,.34,.9,MAT.steel,0,-1.7,0);cyl(g,.56,.56,.42,MAT.blue,0,-1.1,0);cyl(g,.66,.66,.08,MAT.blue,0,-.86,0);
  for(const s of[-1,1]){cyl(g,.09,.09,.6,MAT.steel,s*.75,-1.1,0,10,'x');box(g,.2,.26,.26,MAT.blue,s*1.1,-1.1,0)}
}
function flange(p,y,r){const t=new THREE.Mesh(new THREE.TorusGeometry(r,.06,8,32),MAT.steelDk);t.rotation.x=Math.PI/2;t.position.y=y;p.add(t);
  const n=14,st=new THREE.InstancedMesh(new THREE.CylinderGeometry(.025,.025,.2,6),MAT.galv,n);const m=new THREE.Matrix4();for(let i=0;i<n;i++){const a=i/n*Math.PI*2;m.makeTranslation(Math.cos(a)*(r+.03),y,Math.sin(a)*(r+.03));st.setMatrixAt(i,m)}p.add(st)}
function gateValve(p,x,y,z,axis){const g=new THREE.Group();g.position.set(x,y,z);p.add(g);box(g,.32,.32,.36,MAT.red,0,0,0);cyl(g,.05,.05,.5,MAT.galv,0,.35,0,8);const hw=new THREE.Mesh(new THREE.TorusGeometry(.17,.02,6,20),MAT.steelDk);hw.rotation.x=Math.PI/2;hw.position.y=.6;g.add(hw);if(axis==='z')g.rotation.y=Math.PI/2;return g}
function buildBOP(){
  const g=part('bop');RIG.bop=g;
  flange(g,-.8,.6);cyl(g,.42,.42,.7,MAT.red,0,-.42,0);flange(g,-.06,.55);
  for(const s of[-1,1]){cyl(g,.1,.1,1.1,MAT.steel,s*.95,-.42,0,10,'x');gateValve(g,s*1.25,-.42,0);gateValve(g,s*1.75,-.42,0)}
  box(g,2.5,1.45,1.05,MAT.red,0,.75,0);flange(g,1.5,.55);
  for(const y of[.4,1.1])for(const s of[-1,1]){cyl(g,.38,.38,.45,MAT.red,s*1.47,y,0,24,'x');cyl(g,.26,.26,.7,MAT.paintDk,s*2.0,y,0,20,'x');const hw=new THREE.Mesh(new THREE.TorusGeometry(.2,.025,6,20),MAT.steelDk);hw.rotation.y=Math.PI/2;hw.position.set(s*2.42,y,0);g.add(hw)}
  const ann=lathe(g,[[.3,0],[.9,0],[1,.25],[1,.9],[.86,1.35],[.55,1.65],[.36,1.72],[.3,1.72]],MAT.red,1.55,32);RIG.annular=ann;
  flange(g,3.3,.42);cyl(g,.32,.32,F-3.6,MAT.galv,0,3.3+(F-3.6)/2,0);
  // línea de flote hacia las zarandas
  tube(g,[V(.3,F-1.3,0),V(3,F-1.5,-.4),V(9,4.4,-6),V(13,3.9,-10.5)],.13,MAT.galv,40);
  // mangueras hidráulicas y acumulador
  for(let i=0;i<3;i++)tube(g,[V(-2.1,.4+i*.35,.3),V(-3.2,-.2,1.4),V(-8,.12,6+i*.2),V(-12.4,.5,8.4+i*.2)],.035,std(0x8c1a12,{roughness:.6}),30);
  const k=new THREE.Group();k.position.set(-14.5,0,9);g.add(k);box(k,4.2,.25,2.2,MAT.steel,0,.12,0);
  for(let r=0;r<2;r++)for(let i=0;i<7;i++)cyl(k,.17,.17,1.5,MAT.red,-1.7+i*.5,1,-.45+r*.9,14);box(k,.9,1.4,1.8,MAT.blue,1.7,.95,0);
  for(let i=0;i<3;i++){const d=cyl(k,.1,.1,.02,MAT.white,2.16,1.3,-.5+i*.5,16,'x')}
  // múltiple de estrangulación
  const cm=new THREE.Group();cm.position.set(9,0,-1.5);g.add(cm);box(cm,3.6,.2,1.8,MAT.steel,0,.1,0);rod(cm,V(-1.6,.8,0),V(1.6,.8,0),.08,MAT.galv);rod(cm,V(0,.4,-.7),V(0,1.4,-.7),.08,MAT.galv);
  for(const x of[-1.2,-.4,.4,1.2])gateValve(cm,x,.8,0,'z');
  tube(g,[V(1.9,-.42,0),V(3.6,-.3,0),V(6,.5,-.8),V(7.4,.8,-1.5)],.07,MAT.galv,20);
}

function buildSub(){
  const g=part('sub');
  for(let i=0;i<9;i++)boxT(g,13,.24,1.25,MAT.wood,0,.12,-7.4+i*1.85);
  const sm=MAT.steel,bm=MAT.steelDk;
  for(const sx of[-1,1])for(const off of[-.7,.7]){const x=sx*4.4+off;
    bar(g,V(x,.6,-6.3),V(x,.6,6.3),.45,sm,.55);bar(g,V(x,F-.6,-6.3),V(x,F-.6,6.3),.45,sm,.55);
    const zs=[-6.1,-3,0,3,6.1];zs.forEach(z=>bar(g,V(x,.3,z),V(x,F-.3,z),.36,sm));
    for(let i=0;i<4;i++){rod(g,V(x,.9,zs[i]),V(x,F-.9,zs[i+1]),.07,bm,1);rod(g,V(x,F-.9,zs[i]),V(x,.9,zs[i+1]),.07,bm,1)}}
  for(const sx of[-1,1])for(const z of[-6.1,0,6.1])for(const y of[.6,F-.6])bar(g,V(sx*4.4-.7,y,z),V(sx*4.4+.7,y,z),.3,sm);
  for(const y of[.6,F-.6])bar(g,V(-5.1,y,-6.1),V(5.1,y,-6.1),.4,sm,.5);
  bar(g,V(-5.1,.6,6.1),V(5.1,.6,6.1),.4,sm,.5);
  stairs(g,V(6.3,.24,10.4),V(6.3,F-.1,3.2),1.05);boxT(g,1.5,.1,1.6,MAT.grate,6.05,F-.05,2.4);
  // ancla de la línea muerta
  const an=box(g,.7,.6,.9,MAT.blue,-3.1,F-.35,-3.8);RIG.deadAnchor=an;cyl(g,.35,.35,.5,MAT.steelDk,-3.1,F,-3.8,16,'x');
}
function buildFloor(){
  const g=part('floor');
  boxT(g,10.6,.35,12.6,MAT.plate,0,F-.175,0);
  for(const[a,b]of[[[-5.3,-6.3],[5.3,-6.3]],[[5.3,-6.3],[5.3,1.8]],[[5.3,3.4],[5.3,6.3]],[[5.3,6.3],[1.1,6.3]],[[-1.1,6.3],[-5.3,6.3]],[[-5.3,6.3],[-5.3,-.2]],[[-5.3,-1.4],[-5.3,-6.3]]]){
    const A=V(a[0],F,a[1]),B=V(b[0],F,b[1]);bar(g,V(A.x,F+.08,A.z),V(B.x,F+.08,B.z),.03,MAT.yellow,.16);handrail(g,[A,B])}
  // mesa rotaria
  box(g,2.2,.5,2.2,MAT.blue,0,F-.4,0);cyl(g,1.02,1.02,.12,MAT.steelDk,0,F+.04,0,32);lathe(g,[[.22,.11],[.5,.11],[.6,.07],[.95,.07],[.95,0]],MAT.steel,F,32);cyl(g,.22,.22,.02,MAT.dark,0,F+.105,0,20);
  // setback de madera
  boxT(g,2.8,.18,1.6,MAT.wood,-1.9,F+.09,1.75);boxT(g,2.8,.18,1.6,MAT.wood,1.9,F+.09,1.75);
  // agujero de ratón
  cyl(g,.16,.16,.1,MAT.dark,1.5,F+.05,-1.3,16);
}
function buildDrawworks(){
  const g=part('drawworks');const z=-4.7;RIG.dwZ=z;
  box(g,5.6,.3,2.6,MAT.steel,0,F+.15,z);
  for(const s of[-1,1]){box(g,.7,2.1,2.3,MAT.blue,s*1.35,F+1.35,z);cyl(g,.75,.75,.25,MAT.steelDk,s*1.83,F+1.45,z,28,'x');cyl(g,.48,.48,1.05,MAT.blue,s*2.45,F+1,z+.1,20,'x');box(g,.9,.5,1.1,MAT.blue,s*2.45,F+.5,z+.1)}
  const drum=new THREE.Group();drum.position.set(0,F+1.45,z);g.add(drum);RIG.drum=drum;
  cyl(drum,.52,.52,1.95,MAT.steelDk,0,0,0,24,'x');for(const s of[-1,1])cyl(drum,.85,.85,.06,MAT.steel,s*.98,0,0,28,'x');
  for(let i=0;i<9;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.56,.035,6,24),MAT.wire);t.rotation.y=Math.PI/2;t.position.x=-.85+i*.21;drum.add(t)}
  const guard=new THREE.Mesh(new THREE.CylinderGeometry(.95,.95,2,24,1,true,-Math.PI/2,Math.PI),MAT.blue);guard.rotation.z=Math.PI/2;guard.position.set(0,F+1.5,z-.05);guard.material=MAT.blue;g.add(guard);
}
function buildDoghouse(){
  const g=part('doghouse');const x=-7.5,z=-2.4;
  for(const dx of[-1.6,1.6])for(const dz of[-1.9,1.9])bar(g,V(x+dx,0,z+dz),V(x+dx,F-.2,z+dz),.3,MAT.steel);
  rod(g,V(x-1.6,.5,z-1.9),V(x-1.6,F-.6,z+1.9),.08,MAT.steelDk,1);rod(g,V(x+1.6,.5,z-1.9),V(x+1.6,F-.6,z+1.9),.08,MAT.steelDk,1);
  boxT(g,3.6,.3,4.2,MAT.steel,x,F-.15,z);
  boxT(g,3.6,3,4.2,MAT.white,x,F+1.5,z);
  const gl=box(g,.06,1.3,3.4,MAT.glass,x+1.81,F+1.9,z);gl.castShadow=false;box(g,1.4,1.1,.06,MAT.glass,x+.6,F+1.9,z+2.11).castShadow=false;
  box(g,1.2,.6,1,MAT.white,x-.5,F+3.3,z);
  RIG.beacons=[];[[x+1.2,0xff3018],[x+.7,0xffb000]].forEach(([bx,c])=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.17,12,10),std(c,{emissive:0x000000,roughness:.3}));b.position.set(bx,F+3.2,z-1.6);b.userData.c=c;g.add(b);RIG.beacons.push(b)});
  // consola del perforador
  const con=box(g,.8,.9,2,MAT.steelDk,x+1.1,F+.75,z);con.rotation.z=.25;
  box(g,.04,.5,.8,std(0x103550,{emissive:0x0a3a5a,roughness:.2}),x+1.35,F+1.35,z-.4);
  // pasarela al piso
  boxT(g,.5,.1,1.6,MAT.grate,x+2.0,F-.05,z+1.6);
  // panel remoto de BOP (en el piso, junto a la puerta)
  const bp=new THREE.Group();bp.position.set(-4.85,F,-3.6);g.add(bp);RIG.bopPanel=bp;
  box(bp,.12,1.1,.1,MAT.steel,0,.55,0);box(bp,.18,.7,.9,MAT.red,0,1.45,0);
  const lab=new THREE.Mesh(new THREE.PlaneGeometry(.8,.18),std(0xffffff,{map:textTex(['PANEL REMOTO BOP'],{w:512,h:112,bg:'#b1281c'})}));lab.rotation.y=Math.PI/2;lab.position.set(.095,1.72,0);bp.add(lab);
  const btn=(c,z)=>{const g=new THREE.Group();g.position.set(.12,1.42,z);bp.add(g);box(g,.08,.14,.22,std(c,{roughness:.4}),0,0,0);return g};RIG.bopBtn=btn(0x2e8b3a,-.18);RIG.bopBtn2=btn(0xe0b21c,.18);
}

const C=(sx,front,y)=>{const t=y/H;return V(sx*lerp(2.7,1.15,t),y,front?lerp(1.5,.65,t):lerp(-2.1,-1.05,t))};
function buildMast(){
  const m=part('mast');m.position.set(0,F,0);RIG.mast=m;
  const pm=MAT.paint,pd=MAT.paintDk;
  for(const sx of[-1,1])for(const fr of[0,1])bar(m,C(sx,fr,0),C(sx,fr,H),.4,pm);
  for(const sx of[-1,1])for(const fr of[0,1])box(m,.9,.4,.9,MAT.steelDk,C(sx,fr,0).x,.2,C(sx,fr,0).z);
  const step=3.1;
  for(let y=step;y<=H+.01;y+=step){const y0=y-step;
    for(const sx of[-1,1]){bar(m,C(sx,0,y),C(sx,1,y),.18,pd);rod(m,C(sx,0,y0),C(sx,1,y),.075,pd,1);rod(m,C(sx,1,y0),C(sx,0,y),.075,pd,1)}
    bar(m,C(-1,0,y),C(1,0,y),.18,pd);rod(m,C(-1,0,y0),C(1,0,y),.075,pd,1);rod(m,C(1,0,y0),C(-1,0,y),.075,pd,1);
    if(y>MONK+4)bar(m,C(-1,1,y),C(1,1,y),.18,pd)}
  // rieles del top drive
  for(const s of[-1,1]){bar(m,V(s*.5,4,-1.05),V(s*.5,H-3,-1.05),.18,MAT.steelDk);for(let y=6;y<H-3;y+=6)bar(m,V(s*.5,y,-1.05),V(s*.5,y,C(1,0,y).z),.1,MAT.steelDk)}
  // escalera con jaula en el costado +x
  const lad=new THREE.Group();m.add(lad);
  const LX=y=>C(1,0,y).x+.3,LZ=-.35;
  for(const dz of[-.22,.22])rod(lad,V(LX(0),0,LZ+dz),V(LX(H-1),H-1,LZ+dz),.03,MAT.galv,1);
  for(let y=.3;y<H-1;y+=.3)rod(lad,V(LX(y),y,LZ-.22),V(LX(y),y,LZ+.22),.016,MAT.galv,1);
  for(let y=2.4;y<H-1;y+=1.2){const t=new THREE.Mesh(new THREE.TorusGeometry(.38,.018,4,16,Math.PI),MAT.galv);t.position.set(LX(y)+.02,y,LZ);t.rotation.set(Math.PI/2,0,-Math.PI/2);lad.add(t)}
  RIG.retract=box(m,.2,.28,.16,MAT.red,LX(MONK+1.5)+.05,MONK+1.6,LZ+.3);
  // tubo vertical (standpipe)
  rod(m,V(2.4,.3,1.25),V(1.71,19,.87),.09,MAT.galv);
  RIG.hose=null;RIG.hoseY=-99;
  // línea de escape (geronimo)
  RIG.escape=rod(world,V(0,0,0),V(1,1,1),.02,MAT.wire);
  buildCrown(m);buildBoard(m);buildBlock(m);
}
function buildCrown(m){
  const g=part('crown',m);
  box(g,3.6,.3,3.2,MAT.paintDk,0,H-.05,-.2);
  for(let i=0;i<7;i++)cyl(g,.6,.6,.13,MAT.steelDk,-.75+i*.25,H+.75,0,24,'x');
  cyl(g,.06,.06,2,MAT.galv,0,H+.75,0,8,'x');
  const gd=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,2.1,20,1,true,-Math.PI/2,Math.PI),MAT.yellowW);gd.rotation.z=Math.PI/2;gd.position.set(0,H+.75,0);g.add(gd);
  for(const s of[-1,1]){const sh=cyl(g,.45,.45,.12,MAT.steelDk,s*1.25,H+.55,0,20,'x');sh.rotation.y=s*.4}
  for(const s of[-1,1])rod(g,V(s*1.4,H+.1,-1.4),V(0,H+4.2,-.9),.08,MAT.paint);bar(g,V(0,H+4.2,-.9),V(0,H+4.2,.6),.14,MAT.paint);
  handrail(g,[V(-1.8,H+.1,-1.8),V(1.8,H+.1,-1.8),V(1.8,H+.1,1.4),V(-1.8,H+.1,1.4),V(-1.8,H+.1,-1.8)],1)
}
function buildBoard(m){
  const g=part('monkey',m);const y=MONK;
  for(const s of[-1,1]){bar(g,V(s*2.75,y,.95),V(s*2.75,y,3.45),.16,MAT.paintDk);bar(g,V(s*1.9,y,C(1,1,y).z),V(s*2.75,y,.95),.14,MAT.paintDk)}
  bar(g,V(-2.75,y,3.45),V(2.75,y,3.45),.16,MAT.paintDk);
  for(let z=1.23;z<3.4;z+=.3)for(const s of[-1,1])box(g,2.2,.1,.06,MAT.yellowW,s*1.65,y+.08,z);
  boxT(g,.9,.06,2.6,MAT.grate,0,y,2.2);
  handrail(g,[V(-.45,y,3.4),V(-.45,y,.95)],1.05);handrail(g,[V(.45,y,3.4),V(.45,y,.95)],1.05);handrail(g,[V(-2.75,y,3.5),V(2.75,y,3.5)],1.1);
  // línea de vida
  RIG.lifeline=rod(g,V(-1.75,y+2.25,.98),V(1.75,y+2.25,.98),.012,MAT.wire);
  // pestillos de los peines (fila de práctica)
  RIG.latch=new THREE.Group();RIG.latch.position.set(-.52,y+.14,1.23);g.add(RIG.latch);rod(RIG.latch,V(0,0,0),V(0,0,.3),.018,MAT.red);RIG.latch.rotation.x=-1.3;
  // tablero de señales (radio)
  const sp=new THREE.Group();sp.position.set(.55,y+1.05,1.3);g.add(sp);RIG.signal=sp;
  box(sp,.08,.42,.5,MAT.steelDk,0,0,0);
  const mk=(c,txt,dz)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.06,.12,.12),std(c,{roughness:.4}));b.position.set(-.06,.06,dz);sp.add(b);const l=new THREE.Mesh(new THREE.PlaneGeometry(.16,.06),new THREE.MeshBasicMaterial({map:textTex([txt],{w:256,h:96,bg:'#111',font:'bold 56px Arial'})}));l.rotation.y=-Math.PI/2;l.position.set(-.045,-.08,dz);sp.add(l);return b};
  RIG.btnUp=mk(0x2e9b45,'SUBIR',-.16);RIG.btnStop=mk(0xd22a18,'PARAR',0);RIG.btnDown=mk(0xe0b21c,'BAJAR',.16);sp.rotation.y=-.5;
  // cuerda de encuelle enrollada
  RIG.coil=new THREE.Mesh(new THREE.TorusGeometry(.13,.035,8,20),std(0xe8dcb4,{roughness:.9}));RIG.coil.position.set(-.48,y+.92,1.25);RIG.coil.rotation.y=Math.PI/2;g.add(RIG.coil);
  // encuellador (vista en 3.ª persona)
  const d=makePerson({suit:0xd8661c,harness:true});d.g.position.set(0,y+.03,1.12);d.g.rotation.y=Math.PI;g.add(d.g);RIG.derrick=d;
  RIG.lanyard=rod(g,V(0,y+1.45,1.25),V(0,y+2.25,.98),.012,std(0x1d4fa0));
}
function buildBlock(m){
  const g=part('block',m);RIG.block=g;
  for(const s of[-1,1])box(g,.1,2,1.2,MAT.yellow,s*.5,0,0);cyl(g,.6,.6,1.1,MAT.yellow,0,1,0,24,'x');
  for(let i=0;i<6;i++)cyl(g,.55,.55,.1,MAT.steelDk,-.37+i*.15,.55,0,24,'x');
  box(g,1.05,.6,.95,MAT.yellow,0,-1.15,0);cyl(g,.12,.12,.5,MAT.steelDk,0,-1.6,0,12);
  const hook=new THREE.Mesh(new THREE.TorusGeometry(.28,.09,10,20,Math.PI*1.4),MAT.yellow);hook.position.set(0,-2.05,0);hook.rotation.z=Math.PI*.8;g.add(hook);
  for(const s of[-1,1])rod(g,V(s*.25,-1.9,0),V(s*.42,-2.5,0),.05,MAT.steelDk);
  // top drive
  box(g,1.05,1.5,.95,std(0x3f4b55,{map:TEX.grime,roughness:.5,metalness:.5}),0,-3.35,0);cyl(g,.42,.42,.55,MAT.blue,0,-2.4,0,20);
  tube(g,[V(.1,-2.65,.35),V(.3,-2.3,.6),V(.35,-2.6,.85)],.06,MAT.galv,10);
  for(const s of[-1,1])box(g,.18,1,.7,MAT.steelDk,s*.5,-3.35,-.7);
  cyl(g,.1,.1,.6,MAT.steel,0,-4.35,0,12);
  for(const s of[-1,1])rod(g,V(s*.33,-4.1,0),V(s*.33,-5.6,0),.045,MAT.steelDk);
  // elevador
  const el=new THREE.Group();el.position.y=-EOFF;g.add(el);RIG.elev=el;
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.19,.075,10,22),MAT.steelDk);ring.rotation.x=Math.PI/2;el.add(ring);
  box(el,.5,.16,.22,MAT.steelDk,0,0,-.18);
  RIG.elevLatch=new THREE.Group();RIG.elevLatch.position.set(.2,0,.18);el.add(RIG.elevLatch);box(RIG.elevLatch,.08,.08,.26,MAT.red,0,0,.1);
  // líneas entre corona y bloque
  RIG.lines=[];for(let i=0;i<8;i++){const l=new THREE.Mesh(UC6,MAT.wire);l.userData.cx=-.7+i*.2;l.userData.bx=-.37+(i%6)*.15;l.userData.keepMat=true;g.add(l);RIG.lines.push(l)}
  RIG.fast=rod(world,V(0,0,0),V(0,1,0),.03,MAT.wire);RIG.dead=rod(world,V(0,0,0),V(0,1,0),.03,MAT.wire);
  setBlock(10);
}
function setBlock(y){
  RIG.blockY=y;RIG.block.position.y=y;
  for(const l of RIG.lines)orient(l,V(l.userData.bx,.55,0),V(l.userData.cx,H+.15-y,0),.022);
  if(Math.abs(y-RIG.hoseY)>.15){RIG.hoseY=y;if(RIG.hose){RIG.mast.remove(RIG.hose);RIG.hose.geometry.dispose()}
    const a=V(1.71,19.3,.87),b=V(.35,y-2.6,.85),mid=a.clone().lerp(b,.5);mid.y=Math.min(a.y,b.y)-3.5-Math.abs(a.y-b.y)*.15;
    RIG.hose=tube(RIG.mast,[a,a.clone().add(V(-.2,.6,0)),mid,b],.07,MAT.rubber,30);RIG.hose.castShadow=true}
}
const elevY=()=>F+RIG.blockY-EOFF;
function updateLines(){
  const up=Math.abs(RIG.mast.rotation.x)<.01&&RIG.parts.block.visible&&RIG.parts.mast.visible;
  RIG.fast.visible=RIG.dead.visible=up&&RIG.parts.drawworks.visible;RIG.escape.visible=up&&RIG.parts.monkey.visible;
  if(!up)return;
  orient(RIG.fast,V(1.25,F+H+.5,0),V(.8,F+1.95,RIG.dwZ+.3),.03);orient(RIG.dead,V(-1.25,F+H+.5,0),V(-3.1,F+.2,-3.8),.03);
  orient(RIG.escape,V(-2.7,F+MONK+2,2.8),V(-14,.4,44),.02);
}

function buildMud(){
  const g=part('mud');
  for(const z of[-9.5,0,9.5]){boxT(g,3.2,2.6,9,MAT.tank,14.5,1.3,z);boxT(g,3.2,.06,9,MAT.grate,14.5,2.63,z);
    handrail(g,[V(12.9,2.6,z-4.5),V(12.9,2.6,z+4.5)]);handrail(g,[V(16.1,2.6,z-4.5),V(16.1,2.6,z+4.5)]);
    for(const dz of[-2,2]){cyl(g,.25,.25,.5,MAT.blue,14.5,2.95,z+dz,12);box(g,.4,.3,.4,MAT.blue,14.5,3.3,z+dz)}}
  RIG.shakers=[];for(const z of[-12,-9]){const s=new THREE.Group();s.position.set(14.5,2.6,z);g.add(s);box(s,2.2,.5,2.4,MAT.blue,0,.25,0);const d=box(s,1.8,.08,2.2,MAT.grate,0,.75,0);d.rotation.x=.12;for(const x of[-1,1])cyl(s,.2,.2,.3,MAT.steelDk,x*1.15,.6,0,12,'x');RIG.shakers.push(s)}
  cyl(g,.6,.6,2.4,MAT.tank,17.4,3.8,-6,16);
  stairs(g,V(11.2,0,4),V(12.9,2.6,4),1);
  for(const z of[-3,3]){const p=new THREE.Group();p.position.set(22.5,0,z);g.add(p);box(p,6.4,.3,2.4,MAT.steel,0,.15,0);boxT(p,2.4,1.9,2,MAT.red,.4,1.25,0);
    for(let i=0;i<3;i++)cyl(p,.26,.26,1.3,MAT.red,-1.5,1.05,-.6+i*.6,16,'x');box(p,.4,.5,2,MAT.red,-2.15,1.05,0);
    box(p,2,1.4,1.4,MAT.blue,2.6,1.05,0);box(p,.3,1.4,1.7,MAT.yellowW,1.55,1.35,0);cyl(p,.12,.12,1.6,MAT.galv,-1.6,2.1,0,10,'z');
    tube(p,[V(-2.3,1.1,0),V(-5,.35,0),V(-6.4,.35,0)],.1,MAT.galv,12)}
  tube(g,[V(20.6,2.1,-3),V(14,.35,-1.6),V(6.4,.35,1.2),V(4.6,.4,1.2),V(2.4,F+.3,1.25)],.1,MAT.galv,40);
  // tanque de viaje
  const tt=new THREE.Group();tt.position.set(6.4,0,-3.2);g.add(tt);RIG.tripTank=tt;
  cyl(tt,.75,.75,3.2,MAT.tank,0,1.6,0,20);box(tt,.12,2.8,.06,MAT.white,.76,1.6,0);
  RIG.ttLevel=box(tt,.14,.06,.08,std(0xd22a18,{emissive:0x500000}),.78,1.6,0);RIG.ttLevel.userData.keepMat=true;
}
function buildRacks(){
  const g=part('rack');
  boxT(g,1.7,1.1,13,MAT.plate,0,.55,19);handrail(g,[V(.85,1.1,12.6),V(.85,1.1,25.4)],.9);
  bar(g,V(0,F,6.3),V(0,1.15,12.6),1.6,MAT.steel,.22);for(const s of[-1,1])handrail(g,[V(s*.8,F,6.3),V(s*.8,1.15,12.6)],.9);
  for(const s of[-1,1])for(const z of[13.5,17.5,21.5,25])box(g,5.6,.75,.35,MAT.steelDk,s*5.3,.375,z);
  const N=2*3*12,bd=new THREE.InstancedMesh(new THREE.CylinderGeometry(.064,.064,8.6,10),MAT.pipe,N),tj=new THREE.InstancedMesh(new THREE.CylinderGeometry(.085,.085,.42,12),MAT.tj,N*2);
  const m=new THREE.Matrix4(),q=new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI/2,0,0));let i=0,j=0;
  for(const s of[-1,1])for(let l=0;l<3;l++)for(let k=0;k<12;k++){const x=s*(3+k*.19+(l%2)*.09),y=.84+l*.16;m.compose(V(x,y,19.2),q,V(1,1,1));bd.setMatrixAt(i++,m);for(const dz of[-4.5,4.5]){m.compose(V(x,y,19.2+dz),q,V(1,1,1));tj.setMatrixAt(j++,m)}}
  g.add(bd);g.add(tj);for(const s of[-1,1])for(let l=0;l<2;l++)for(const z of[13.5,17.5,21.5,25])box(g,2.5,.05,.12,MAT.wood,s*4.1,.92+l*.16,z);
}
function buildTools(){
  const g=new THREE.Group();g.userData.part='floor';world.add(g);RIG.tools=g;
  // llaves de fuerza colgantes
  RIG.tongs=[];[[1.5,-.9],[-1.5,-.9]].forEach(([x,z],i)=>{const t=new THREE.Group();t.position.set(x,F+1.05,z);g.add(t);box(t,1.2,.32,.42,MAT.blue,0,0,0);const jaw=new THREE.Mesh(new THREE.TorusGeometry(.2,.07,8,16,Math.PI*1.5),MAT.steelDk);jaw.rotation.x=Math.PI/2;jaw.position.x=-.7*Math.sign(x);t.add(jaw);rod(t,V(.6*Math.sign(x),0,0),V(1.2*Math.sign(x),0,0),.04,MAT.yellow);t.rotation.y=i?Math.PI:0;
    const cab=rod(g,V(x,F+1.2,z),V(x*.8,F+14,-1),.015,MAT.wire);RIG.tongs.push({t,cab,home:t.position.clone()})});
  // cuñas
  RIG.slips=new THREE.Group();RIG.slips.position.set(0,F+.12,0);g.add(RIG.slips);for(let i=0;i<3;i++){const s=box(RIG.slips,.14,.32,.12,MAT.steelDk,Math.cos(i*2.1)*.13,.12,Math.sin(i*2.1)*.13);s.rotation.y=-i*2.1;const h=rod(RIG.slips,V(Math.cos(i*2.1)*.2,.28,Math.sin(i*2.1)*.2),V(Math.cos(i*2.1)*.45,.5,Math.sin(i*2.1)*.45),.02,MAT.steel)}
  RIG.slips.visible=false;
  // sarta en el pozo y parada en movimiento
  RIG.string=cyl(world,.064,.064,F+.9+80,MAT.pipe,0,(F+.9-80)/2,0,12);RIG.string.visible=false;
  RIG.stand=makeStand();world.add(RIG.stand);RIG.stand.visible=false;RIG.racked=[];
  RIG.rope=rod(world,V(0,0,0),V(0,1,0),.016,std(0xe8dcb4,{roughness:.9}));RIG.rope.visible=false;
  // paradas ya encuelladas (banco derecho) — instanciadas
  const n=16,bd=new THREE.InstancedMesh(new THREE.CylinderGeometry(.064,.064,LEN,10),MAT.pipe,n),tj=new THREE.InstancedMesh(new THREE.CylinderGeometry(.084,.084,.46,12),MAT.tj,n*4);const mx=new THREE.Matrix4();let k=0;
  for(let i=0;i<n;i++){const x=.78+(i%8)*.21,z=i<8?SLOTZ:SLOTZ+.3;const base=V(x,F+.2,1.62+(i<8?0:.3)),top=V(x,F+.2+LEN,z);const d=top.clone().sub(base).normalize();const q=new THREE.Quaternion().setFromUnitVectors(Y,d);
    mx.compose(base.clone().addScaledVector(d,LEN/2),q,V(1,1,1));bd.setMatrixAt(i,mx);for(let j=0;j<4;j++){mx.compose(base.clone().addScaledVector(d,j*LEN/3+(j===0?.23:j===3?-.23:0)),q,V(1,1,1));tj.setMatrixAt(k++,mx)}}
  g.add(bd);g.add(tj);RIG.rackedStatic=[bd,tj];
  // válvula de seguridad (FOSV) y su llave, junto a la cabina
  const fs=new THREE.Group();fs.position.set(-4.4,F,-1.2);g.add(fs);box(fs,.5,.8,.4,MAT.steel,0,.4,0);
  RIG.fosv=new THREE.Group();RIG.fosv.position.set(0,1.05,0);fs.add(RIG.fosv);lathe(RIG.fosv,[[.06,-.35],[.1,-.35],[.1,-.2],[.13,-.15],[.13,.15],[.1,.2],[.1,.35],[.06,.35]],MAT.yellow,0,20);
  RIG.fosvKey=new THREE.Group();RIG.fosvKey.position.set(.35,.95,0);fs.add(RIG.fosvKey);bar(RIG.fosvKey,V(0,0,0),V(0,.45,0),.04,MAT.red);box(RIG.fosvKey,.05,.05,.16,MAT.red,0,0,.06);
  // múltiple de presión en el piso (para registrar SIDPP/SICP)
  const gp=new THREE.Group();gp.position.set(4.6,F,-3.2);g.add(gp);RIG.gauges=gp;box(gp,.1,1.2,.1,MAT.steel,0,.6,0);box(gp,.12,.5,.8,MAT.steelDk,0,1.35,0);
  for(const dz of[-.2,.2]){const d=cyl(gp,.15,.15,.04,MAT.white,-.08,1.4,dz,20,'x');}
  const gl=new THREE.Mesh(new THREE.PlaneGeometry(.7,.12),new THREE.MeshBasicMaterial({map:textTex(['SIDPP   ·   SICP'],{w:512,h:88,bg:'#111',font:'bold 48px Arial'})}));gl.rotation.y=-Math.PI/2;gl.position.set(-.07,1.66,0);gp.add(gl);
}
function buildCrew(){
  const g=new THREE.Group();world.add(g);RIG.crew=g;
  const a=makePerson({});a.g.position.set(1.45,F,.95);a.g.rotation.y=-2.3;g.add(a.g);RIG.hand1=a;
  const b=makePerson({});b.g.position.set(-1.35,F,.9);b.g.rotation.y=2.4;g.add(b.g);RIG.hand2=b;
  const d=makePerson({suit:0x2a5a86,hat:0xf3f3f0});d.g.position.set(-7.0,F,-2.3);d.g.rotation.y=Math.PI/2;g.add(d.g);RIG.driller=d;
  const r1=makePerson({suit:0xd8661c});r1.g.position.set(3.4,0,15);r1.g.rotation.y=-.6;g.add(r1.g);
  const r2=makePerson({suit:0x2f7d4a,hat:0xffffff});r2.g.position.set(11.4,0,-11.6);r2.g.rotation.y=1.2;g.add(r2.g);RIG.mudman=r2;
  // trabajador que sube por la escalera (casos)
  const cl=makePerson({suit:0xd8661c,harness:true});cl.g.visible=false;RIG.mast.add(cl.g);cl.g.rotation.y=-Math.PI/2;RIG.climber=cl;
}
function buildCrane(){
  const c=new THREE.Group();c.position.set(20,0,-17);world.add(c);c.visible=false;RIG.crane=c;
  const y=MAT.yellowW;
  boxT(c,3,1.3,12,y,0,1.35,0);for(const z of[-4.5,-3,3,4.5])for(const s of[-1,1])cyl(c,.55,.55,.5,MAT.rubber,s*1.35,.55,z,18,'x');
  box(c,2.6,1.6,2,y,0,2.4,5.4);box(c,2.4,.9,.06,MAT.glass,0,2.6,6.41);
  for(const z of[-4.8,4.8])for(const s of[-1,1]){bar(c,V(s*1.4,1.2,z),V(s*3.6,.2,z),.25,MAT.steelDk);box(c,.7,.12,.7,MAT.steel,s*3.6,.08,z)}
  const sl=new THREE.Group();sl.position.set(0,2,-2);c.add(sl);RIG.slew=sl;
  cyl(sl,1.2,1.2,.4,MAT.steelDk,0,.2,0,24);box(sl,2.6,1.6,4,y,0,1.2,-.6);box(sl,2.4,1.2,1.4,MAT.steelDk,0,1,-3);box(sl,1.1,1.5,1.6,y,1.4,1.4,1.4);
  const bp=new THREE.Group();bp.position.set(0,2.1,1.5);sl.add(bp);RIG.boom=bp;
  RIG.boomSec=[];[[1,.9,.4],[.82,.72,.35],[.64,.56,.3]].forEach(([w,h],i)=>{const geo=new THREE.BoxGeometry(w,h,1);geo.translate(0,0,.5);const s=new THREE.Mesh(geo,y);bp.add(s);RIG.boomSec.push(s)});
  RIG.hookCab=rod(world,V(0,0,0),V(0,1,0),.03,MAT.wire);RIG.hookCab.visible=false;
  const hb=new THREE.Group();world.add(hb);hb.visible=false;RIG.hook=hb;box(hb,.5,.7,.35,MAT.yellow,0,.35,0);const hk=new THREE.Mesh(new THREE.TorusGeometry(.16,.05,8,14,Math.PI*1.4),MAT.steelDk);hk.position.y=-.1;hk.rotation.z=Math.PI*.8;hb.add(hk);
  RIG.slings=[0,1,2,3].map(()=>{const r=rod(world,V(0,0,0),V(0,1,0),.02,std(0xe0b21c));r.visible=false;return r});
}
function craneHook(p){
  const c=RIG.crane,piv=V(0,0,0);RIG.boom.updateMatrixWorld(true);RIG.boom.getWorldPosition(piv);
  const dx=p.x-c.position.x,dz=p.z-c.position.z;RIG.slew.rotation.y=Math.atan2(dx,dz);RIG.slew.updateMatrixWorld(true);RIG.boom.getWorldPosition(piv);
  const Rh=Math.max(4,Math.hypot(p.x-piv.x,p.z-piv.z)),hy=Math.max(p.y+5-piv.y,3),L=clamp(Math.hypot(Rh,hy),10,80),a=Math.atan2(hy,Rh);
  RIG.boom.rotation.x=-a;RIG.boomSec[0].scale.z=L*.42;RIG.boomSec[1].position.z=L*.38;RIG.boomSec[1].scale.z=L*.36;RIG.boomSec[2].position.z=L*.72;RIG.boomSec[2].scale.z=L*.28;
  const tip=V(0,0,L).applyMatrix4(RIG.boom.matrixWorld);
  RIG.hook.position.copy(p);RIG.hook.visible=true;RIG.hookCab.visible=true;orient(RIG.hookCab,tip,V(p.x,p.y+.7,p.z),.03);
}
function buildInstructor(){
  const I=makePerson({suit:0x1f3a5c,hat:0xf6f6f2,hatStripe:0x2f7d4a,skin:0x9a6a4c,mustache:true,glasses:false,glove:0xd8d0bc});
  world.add(I.g);RIG.ins=I;I.g.position.set(4,0,10);
  RIG.pipCam=new THREE.PerspectiveCamera(30,150/170,.05,8);
}
function insAt(pos,face,point){const I=RIG.ins;I.g.visible=true;I.g.position.copy(pos);I.face=face||null;I.point=point||null}
async function insWalk(to,speed=1.6){const I=RIG.ins,from=I.g.position.clone(),d=from.distanceTo(to);if(d<.05)return;if(d>18){I.g.position.copy(to);return}
  I.anim='walk';I.g.rotation.y=Math.atan2(to.x-from.x,to.z-from.z);await tweenP(d/speed,p=>I.g.position.lerpVectors(from,to,p));I.anim='idle'}
function insFace(dt){const I=RIG.ins;if(!I||I.anim==='walk'||I.anim==='climb')return;const tgt=I.face||(I.point?CAM.pos.clone().lerp(I.point,.45):CAM.pos);const a=Math.atan2(tgt.x-I.g.position.x,tgt.z-I.g.position.z);let d=a-I.g.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));I.g.rotation.y+=d*Math.min(1,dt*4)}

/* ---------- vista del pozo en corte (control de pozo) ---------- */
function buildWell(){
  const g=new THREE.Group();world.add(g);g.visible=false;RIG.well=g;
  const cas=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,70,24,1,true),new THREE.MeshBasicMaterial({color:lin(0x9aa4aa),transparent:true,opacity:.35,side:THREE.DoubleSide,fog:false}));cas.position.y=-35;g.add(cas);
  const mud=new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,70,24),new THREE.MeshBasicMaterial({color:lin(0x8a5a2e),transparent:true,opacity:.5,fog:false}));mud.position.y=-35;g.add(mud);
  cyl(g,.15,.15,66,MAT.pipe,0,-33,0,12);cyl(g,.3,.2,.6,MAT.steelDk,0,-66.3,0,12);
  [[-6,0x9a8460],[-22,0x86745a],[-40,0x6e6452],[-58,0x4a3c2e]].forEach(([y,c],i)=>{const l=new THREE.Mesh(new THREE.BoxGeometry(18,i===3?12:16,.3),new THREE.MeshBasicMaterial({color:lin(c),fog:false}));l.position.set(0,y-(i===3?2:0),-3);g.add(l)});
  const lab=label3D('Formación productora (gas)',1.6);lab.position.set(0,-60,-2.6);g.add(lab);
  const n=60;const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));
  RIG.bubbles=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:.4,fog:false,map:TEX.dot,transparent:true,depthWrite:false}));RIG.bubbles.userData.seed=[...Array(n)].map(()=>({y:-66+R()*65,a:R()*6.28,r:.25+R()*.3,on:false}));RIG.bubbles.frustumCulled=false;RIG.bubbles.material.depthTest=false;RIG.bubbles.renderOrder=6;g.add(RIG.bubbles);RIG.kick=0;
}
function updateBubbles(dt){if(!RIG.well.visible)return;const s=RIG.bubbles.userData.seed,pos=RIG.bubbles.geometry.attributes.position;const act=Math.floor(s.length*RIG.kick);
  s.forEach((b,i)=>{if(i<act){b.y+=dt*(1.2+RIG.kick*4);if(b.y>-.5)b.y=-66+R()*3;pos.setXYZ(i,Math.cos(b.a)*b.r,b.y,Math.sin(b.a)*b.r)}else pos.setXYZ(i,0,-200,0)});pos.needsUpdate=true}

/* ---------- efectos: lodo y gas ---------- */
function particles(n,color,size,op){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));const p=new THREE.Points(geo,new THREE.PointsMaterial({color,size,map:TEX.dot,transparent:true,opacity:op,depthWrite:false}));p.userData.s=[...Array(n)].map(()=>({p:V(0,-999,0),v:V(),t:R()*2}));p.visible=false;p.frustumCulled=false;world.add(p);return p}
function buildFX(){RIG.spray=particles(260,0x5d4129,.16,.9);RIG.gas=particles(220,0xd9d27a,3.2,.18);RIG.fx={spray:0,gas:0}}
function updateFX(dt){
  const sp=RIG.spray,gs=RIG.gas;sp.visible=RIG.fx.spray>0;gs.visible=RIG.fx.gas>0;
  if(sp.visible){const pos=sp.geometry.attributes.position;sp.userData.s.forEach((q,i)=>{q.t-=dt;if(q.t<=0||q.p.y<F){q.p.set((R()-.5)*.2,F+.9,(R()-.5)*.2);q.v.set((R()-.5)*1.6,2+R()*3*RIG.fx.spray,(R()-.5)*1.6);q.t=1+R()}q.v.y-=9.8*dt;q.p.addScaledVector(q.v,dt);pos.setXYZ(i,q.p.x,q.p.y,q.p.z)});pos.needsUpdate=true}
  if(gs.visible){const pos=gs.geometry.attributes.position;gs.material.opacity=.2*RIG.fx.gas;gs.userData.s.forEach((q,i)=>{q.t-=dt;if(q.t<=0){const src=i%2?V(0,F+.5,0):V(14.5,3,-10.5);q.p.copy(src).add(V((R()-.5)*3,R()*1.5,(R()-.5)*3));q.v.set((R()-.5)*.6,.15+R()*.3,.9+R()*.8);q.t=4+R()*5}q.p.addScaledVector(q.v,dt);pos.setXYZ(i,q.p.x,q.p.y,q.p.z)});pos.needsUpdate=true}
}

/* ---------- personajes animados (Worker.gltf) ---------- */
let WORKER=null;
function loadWorker(){
  if(!THREE.GLTFLoader||!THREE.SkeletonUtils)return;
  new THREE.GLTFLoader().load('Worker.gltf',g=>{WORKER=g;upgradePeople()},undefined,e=>console.warn('No se pudo cargar Worker.gltf',e));
}
function makeWorker(o){
  const m=THREE.SkeletonUtils.clone(WORKER.scene);m.scale.setScalar(.95);
  const cache=new Map();
  m.traverse(x=>{if(x.isMesh){x.castShadow=true;x.receiveShadow=true;x.frustumCulled=false;
    if(!cache.has(x.material)){const c=x.material.clone();const t=o.tint&&o.tint[c.name];if(t!=null)c.color.copy(lin(t));c.metalness=0;c.roughness=Math.max(.55,c.roughness);cache.set(x.material,c)}x.material=cache.get(x.material)}});
  const mixer=new THREE.AnimationMixer(m),acts={};WORKER.animations.forEach(a=>acts[a.name]=mixer.clipAction(a));
  for(const k of['Interact','Wave','Death']){if(acts[k]){acts[k].setLoop(THREE.LoopOnce,1);acts[k].clampWhenFinished=true}}
  let head=null;m.traverse(x=>{if(x.isBone&&x.name==='Head')head=x});
  return{m,mixer,acts,head,cur:null}}
function playClip(P,name,fade=.3){const W=P.gltf;if(W.cur===name)return;const a=W.acts[name];if(!a)return;const prev=W.cur&&W.acts[W.cur];a.reset().setEffectiveWeight(1).play();if(prev)prev.crossFadeTo(a,fade,false);W.cur=name}
function upgradeOne(P,o){
  const W=makeWorker(o);P.g.children.forEach(c=>c.visible=false);P.g.add(W.m);P.gltf=W;
  if(o.mouth&&W.head){W.m.updateMatrixWorld(true);W.mixer.update(0);playClip(P,'Idle',0);W.mixer.update(.01);W.m.updateMatrixWorld(true);
    const hp=W.head.getWorldPosition(V(0,0,0)),local=P.g.worldToLocal(hp.clone());
    const mp=P.g.localToWorld(V(0,local.y+o.mouth[1],o.mouth[2]));const mouth=new THREE.Mesh(new THREE.BoxGeometry(.045,.01,.004),new THREE.MeshBasicMaterial({color:lin(0x3a1512),depthTest:false}));mouth.renderOrder=8;mouth.castShadow=false;
    W.head.add(mouth);W.head.updateMatrixWorld(true);mouth.position.copy(W.head.worldToLocal(mp));mouth.scale.setScalar(1/(W.m.scale.x*W.head.getWorldScale(V(0,0,0)).x/W.m.scale.x));P.mouth=mouth;P.mouthBase=mouth.scale.y}
  else P.mouth=null;
  P.head=W.head||P.head;P.pipOff=.1;playClip(P,'Idle',0)}
function upgradePeople(){
  try{
    upgradeOne(RIG.ins,{tint:{Worker_Yellow:0xf2f2ee,Worker_Vest:0x1f3f6a},mouth:[0,.002,.165]});
    upgradeOne(RIG.hand1,{});upgradeOne(RIG.hand2,{});upgradeOne(RIG.mudman,{tint:{Worker_Vest:0x2f7d4a}});
  }catch(e){console.warn('Personajes: se mantienen los básicos',e)}
}
function animGLTF(P,dt,T){
  const W=P.gltf,t=T+P.ph;
  if(P.anim==='walk')playClip(P,'Walk');
  else if(P.anim==='work')playClip(P,W.cur==='Interact'&&W.acts.Interact.isRunning()?'Interact':(Math.sin(t*1.3)>0?'Interact':'Idle'));
  else if(P.anim==='down')playClip(P,'Death',.2);
  else{if(P.point&&P.pointWas!==P.point){P.pointWas=P.point;W.cur=null;playClip(P,'Interact',.25)}
    if(!P.point)P.pointWas=null;
    if(W.cur==='Interact'&&!W.acts.Interact.isRunning())playClip(P,'Idle',.4);
    if(W.cur!=='Interact'&&W.cur!=='Idle')playClip(P,'Idle',.4)}
  W.mixer.update(dt);
  if(P.talk&&W.head&&P.anim!=='walk'){W.head.rotation.x+=Math.sin(t*5.2)*.05;W.head.rotation.y+=Math.sin(t*2.1)*.06}
  if(P.mouth){const m=P.talk?(.3+.7*Math.abs(Math.sin(t*15)*Math.sin(t*4.7+1))):0;P.mouth.scale.y=lerp(P.mouth.scale.y,P.mouthBase*(1+m*2.6),.5)}
}
