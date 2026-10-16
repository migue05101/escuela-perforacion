/* ===================================================================== DETALLES DEL EQUIPO Y LA LOCACIÓN */
const DET={};
function sign(p,pos,ry,lines,bg,w,h,fg){w=w||1.2;h=h||.45;
  const g=new THREE.Group();g.position.copy(pos);g.rotation.y=ry;p.add(g);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),std(0xffffff,{map:textTex(lines,{w:640,h:Math.round(640*h/w),bg,fg:fg||'#fff',font:`bold ${lines.length>1?38:46}px Arial`,border:'#fff'}),roughness:.6}));m.position.z=.012;g.add(m);
  box(g,w+.04,h+.04,.02,MAT.steel,0,0,0);return g}
function extinguisher(p,x,y,z,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;p.add(g);
  const red=std(0xc4211a,{roughness:.35,metalness:.2});cyl(g,.09,.09,.5,red,0,.3,0,16);lathe(g,[[.0,0],[.09,0],[.09,.02],[.06,.07],[.03,.09],[0,.09]],red,.55,16);
  cyl(g,.02,.02,.08,MAT.steelDk,0,.68,0,8);box(g,.1,.015,.03,MAT.steelDk,.03,.73,0);tube(g,[V(0,.68,0),V(.08,.62,.02),V(.11,.3,.04),V(.1,.12,.05)],.012,MAT.rubber,10);
  box(g,.13,.02,.1,MAT.steelDk,0,.03,-.06);const lab=new THREE.Mesh(new THREE.PlaneGeometry(.1,.14),std(0xffffff,{map:textTex(['ABC'],{w:128,h:180,bg:'#f2efe6',fg:'#c4211a',font:'bold 64px Arial'})}));lab.position.set(0,.32,.091);g.add(lab);return g}
function h2sDetector(p,x,y,z,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;p.add(g);
  box(g,.16,.22,.09,std(0xe2b21c,{roughness:.5}),0,0,0);const sc=box(g,.1,.05,.01,std(0x103040,{emissive:0x0a4a30}),0,.04,.05);sc.userData.keepMat=true;
  cyl(g,.03,.04,.06,MAT.steelDk,0,-.14,0,10);const dome=new THREE.Mesh(new THREE.SphereGeometry(.05,12,8,0,Math.PI*2,0,Math.PI/2),std(0xffaa00,{emissive:0x000000,roughness:.3,transparent:true,opacity:.9}));dome.position.y=.11;g.add(dome);
  dome.userData.c=0xffaa00;RIG.beacons.push(dome);const l=label3D('Detector de H2S',.16);l.position.y=.3;g.add(l);return g}
function buildDetails(){
  const w0=world;RIG.beacons=RIG.beacons||[];
  // ---------- señalización ----------
  sign(w0,V(0,F+2.3,6.36),0,['ZONA ROJA','SOLO PERSONAL AUTORIZADO'],'#b1281c',1.5,.55);
  sign(w0,V(3.55,F+2.25,.75),Math.PI/2,['USO OBLIGATORIO','ARNÉS Y BLOQUE RETRÁCTIL'],'#0f4d8a',1.25,.5);
  sign(w0,V(12.82,4.2,-10.5),-Math.PI/2,['¡PELIGRO!','POSIBLE PRESENCIA DE H2S'],'#d8a61c',1.3,.55,'#111');
  sign(w0,V(5.3,1.9,12.2),0,['NO SE PARE BAJO','CARGAS SUSPENDIDAS'],'#d8a61c',1.3,.5,'#111');
  sign(w0,V(-5.66,F+2.62,-.85),Math.PI/2,['CABINA DEL PERFORADOR'],'#2a3640',1.2,.24);
  sign(w0,V(-1.8,F+.6,-6.3),Math.PI,['MALACATE · NO SE ACERQUE'],'#b1281c',1.1,.24);
  // ---------- extintores y lavaojos ----------
  [[4.85,F,-5.85,0],[-4.85,F,5.85,Math.PI],[-9.0,F,-.75,Math.PI/2],[15.9,2.63,9,-Math.PI/2],[-20,0,-6.5,0],[-11.6,0,11,0],[10.6,0,-3.2,0]].forEach(a=>extinguisher(w0,...a));
  const ew=new THREE.Group();ew.position.set(10.6,0,6.2);w0.add(ew);cyl(ew,.04,.04,1,std(0x2f7d4a),0,.5,0,8);const bw=new THREE.Mesh(new THREE.SphereGeometry(.22,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),std(0xd8d3c7,{roughness:.3,side:THREE.DoubleSide}));bw.position.y=1.05;ew.add(bw);
  for(const s of[-1,1])cyl(ew,.025,.02,.06,std(0x2f7d4a),s*.06,1.06,0,8);sign(ew,V(0,1.75,0),0,['LAVAOJOS'],'#147a3c',.8,.22);
  // ---------- detectores de H2S ----------
  h2sDetector(w0,2.9,F+1.6,1.25,Math.PI);h2sDetector(w0,14.5,3.2,-14.1,0);h2sDetector(w0,1.9,.4,1.95,Math.PI);h2sDetector(w0,-4.6,F+1.6,-5.9,0);
  // ---------- carrete del cable de perforación ----------
  const rl=new THREE.Group();rl.position.set(-6.8,0,-10.6);w0.add(rl);box(rl,3.2,.3,2.2,MAT.steel,0,.15,0);
  for(const s of[-1,1]){cyl(rl,1.1,1.1,.08,MAT.paintDk,s*.75,1.3,0,32,'x');bar(rl,V(s*.85,.3,-.9),V(s*.85,1.3,0),.12,MAT.steelDk);bar(rl,V(s*.85,.3,.9),V(s*.85,1.3,0),.12,MAT.steelDk)}
  cyl(rl,.7,.7,1.42,MAT.wire,0,1.3,0,28,'x');for(let i=0;i<10;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.72,.03,6,28),MAT.wire);t.rotation.y=Math.PI/2;t.position.set(-.65+i*.145,1.3,0);rl.add(t)}
  const lr=label3D('Carrete de cable de perforación',.22);lr.position.y=2.7;rl.add(lr);
  rod(w0,V(-6.8,2.0,-10.2),V(-3.1,F+.2,-3.8),.025,MAT.wire);
  // ---------- winche neumático en el piso ----------
  const tg=new THREE.Group();tg.position.set(-4.1,F,4.9);w0.add(tg);box(tg,.7,.12,.5,MAT.steelDk,0,.06,0);cyl(tg,.16,.16,.42,MAT.red,0,.32,0,18,'z');for(const s of[-1,1])cyl(tg,.21,.21,.03,MAT.steelDk,0,.32,s*.22,18,'z');
  box(tg,.22,.24,.24,MAT.red,.34,.24,0);rod(w0,V(-4.1,F+.48,4.9),V(-1.2,F+H-1,0),.012,MAT.wire);const lt=label3D('Winche neumático',.16);lt.position.y=.75;tg.add(lt);
  // ---------- herramientas sueltas ordenadas ----------
  const tb=new THREE.Group();tb.position.set(-3.9,F,-5.1);w0.add(tb);box(tb,.7,.32,.32,std(0xc4211a,{roughness:.4,metalness:.3}),0,.16,0);box(tb,.6,.03,.06,MAT.steelDk,0,.34,0);
  const bk=new THREE.Group();bk.position.set(2.7,F,-2.6);w0.add(bk);cyl(bk,.22,.18,.38,std(0x2a5a86,{roughness:.6}),0,.19,0,16);box(bk,.06,.06,.6,MAT.steelDk,0,.45,0);const lbk=label3D('Balde para lodo',.14);lbk.position.y=.75;bk.add(lbk);
  // cadenas de seguridad en la puerta en V
  for(const y of[.5,.95]){const pts=[];for(let i=0;i<=12;i++){const t=i/12;pts.push(V(-1.05+2.1*t,F+y-Math.sin(t*Math.PI)*.08,6.3))}tube(w0,pts,.012,std(0xe2b21c,{metalness:.6,roughness:.4}),20)}
  // ---------- mástil: reflectores ----------
  DET.flood=[];[12,24,36].forEach(y=>{for(const s of[-1,1]){const p=C(s,1,y);const g=new THREE.Group();g.position.set(p.x,y,p.z);RIG.mast.add(g);box(g,.32,.22,.14,MAT.steelDk,0,0,.12);const l=box(g,.28,.18,.02,MAT.lamp,0,0,.2);l.castShadow=false;l.userData.keepMat=true;DET.flood.push(l);g.rotation.x=.45}});
  // ---------- corona: luz de obstrucción aérea y anemómetro ----------
  const cr=RIG.parts.crown;
  const ob=new THREE.Mesh(new THREE.SphereGeometry(.13,14,10),std(0xff2a10,{emissive:0x000000,roughness:.3}));ob.position.set(0,H+4.42,-.9);cr.add(ob);DET.obs=ob;ob.userData.keepMat=true;
  const an=new THREE.Group();an.position.set(1.5,H+2.4,-1.6);cr.add(an);cyl(an,.02,.02,1.3,MAT.galv,0,-.6,0,8);const hub=new THREE.Group();hub.position.y=.05;an.add(hub);DET.anemo=hub;
  for(let i=0;i<3;i++){const a=i*2.094;rod(hub,V(0,0,0),V(Math.cos(a)*.22,0,Math.sin(a)*.22),.008,MAT.galv);const c=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8,0,Math.PI),MAT.white);c.position.set(Math.cos(a)*.22,0,Math.sin(a)*.22);c.rotation.y=-a;hub.add(c)}
  const lan=label3D('Anemómetro',.16);lan.position.y=.4;an.add(lan);
  sign(cr,V(0,H+1.2,1.42),0,['PLATAFORMA DE LA CORONA','100 % CONECTADO'],'#0f4d8a',1.3,.42);
  // ---------- encuelladero: línea de escape ----------
  const A=V(-2.7,F+MONK+2,2.8);const tr=new THREE.Group();tr.position.copy(A);w0.add(tr);DET.trolley=tr;
  box(tr,.28,.16,.12,std(0xe2b21c,{roughness:.4,metalness:.4}),0,0,0);for(const s of[-1,1])cyl(tr,.05,.05,.03,MAT.steelDk,s*.08,.06,0,12,'z');rod(tr,V(0,-.08,0),V(0,-.75,0),.012,MAT.wire);box(tr,.36,.04,.04,MAT.red,0,-.78,0);
  sign(RIG.parts.monkey,V(-2.0,MONK+1.45,3.52),0,['LÍNEA DE ESCAPE','SOLO EMERGENCIAS'],'#147a3c',.9,.32);
  const ld=new THREE.Group();ld.position.set(-14,0,44);w0.add(ld);cyl(ld,.12,.15,2.4,MAT.paintDk,.0,1.2,.6,10);const sand=new THREE.Mesh(new THREE.CylinderGeometry(1.6,2.2,.35,20),std(0xc2a676,{roughness:1}));sand.position.set(0,.17,-1.6);ld.add(sand);
  sign(ld,V(0,2.3,.7),0,['LLEGADA','LÍNEA DE ESCAPE'],'#147a3c',1.2,.42);
  // ---------- tanque de viaje: escala graduada ----------
  sign(RIG.tripTank,V(0,3.5,0),0,['TANQUE DE VIAJE'],'#2a3640',1.0,.22);
}
function detailTick(dt){
  if(!DET.obs)return;
  DET.obs.material.emissive.setHex((T%1.6)<.5?0xff2a10:0x200000);
  if(DET.anemo)DET.anemo.rotation.y+=dt*6;
  const night=typeof NIGHT!=='undefined'&&NIGHT;DET.flood.forEach(l=>l.material.emissiveIntensity=night?3:.9);
}
