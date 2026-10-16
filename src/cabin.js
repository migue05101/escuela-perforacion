/* ===================================================================== CABINA DEL PERFORADOR: interior, consola, pantallas, manómetros y simulación */
const CAB={x:-7.5,z:-2.4,chair:V(-7.95,0,-2.65),eye:null,ctl:{},gauges:{},screens:[],lights:{}};
function buildCabin(g){
  const x=CAB.x,z=CAB.z,y0=F;CAB.eye=V(-7.88,F+1.25,-2.65);
  const wallO=MAT.white,wallI=std(0xc9ccc8,{roughness:.8,metalness:0}),frame=std(0x3a4148,{roughness:.5,metalness:.5});
  const W=(w,h,d,px,py,pz,m)=>boxT(g,w,h,d,m||wallO,px,py,pz);
  // paredes (paneles delgados: se ven por dentro y por fuera)
  W(.08,3,4.2,x-1.76,y0+1.5,z);                               // fondo
  W(3.6,3,.08,x,y0+1.5,z-2.06);                               // lado izquierdo
  W(3.6,1.0,.08,x,y0+.5,z+2.06);W(3.6,.55,.08,x,y0+2.73,z+2.06);W(1.4,1.45,.08,x-1.1,y0+1.73,z+2.06);W(.6,1.45,.08,x+1.5,y0+1.73,z+2.06); // lado derecho con ventana
  const gR=box(g,1.6,1.45,.03,MAT.glass,x+.4,y0+1.73,z+2.06);gR.castShadow=false;
  // frente hacia la mesa rotaria: ventanal grande + puerta
  const fx=x+1.8;W(.08,.9,3.0,fx,y0+.45,z-.6);W(.08,.35,4.2,fx,y0+2.83,z);W(.08,2.65,.12,fx,y0+1.33,z+.95);W(.08,2.65,.12,fx,y0+1.33,z+2.04);W(.08,.5,1.0,fx,y0+2.4,z+1.5);
  const gl=box(g,.03,1.72,2.94,MAT.glass,fx,y0+1.76,z-.6);gl.castShadow=false;
  for(const dz of[-1.1,-.1])box(g,.1,1.75,.06,frame,fx,y0+1.76,z+dz-.0);
  // puerta entreabierta
  const door=new THREE.Group();door.position.set(fx,y0,z+2.0);g.add(door);box(door,.05,2.12,.92,std(0x8a9096,{roughness:.6,metalness:.4}),.0,1.06,-.46);box(door,.06,.5,.6,MAT.glass,.0,1.6,-.46);door.rotation.y=1.25;
  // techo: parte trasera sólida, claraboya hacia el mástil
  W(2.4,.08,4.2,x-.6,y0+3.0,z);const sky=box(g,1.2,.04,4.2,MAT.glass,x+1.2,y0+3.0,z);sky.castShadow=false;
  box(g,1.2,.6,1,MAT.white,x-.9,y0+3.34,z);
  // piso de caucho
  boxT(g,3.5,.02,4.1,std(0x22262a,{roughness:.95,metalness:0}),x,y0+.01,z);
  // luz interior
  const lp=box(g,1.1,.04,.3,MAT.lamp,x-.4,y0+2.96,z);lp.castShadow=false;
  const L=new THREE.PointLight(0xfff2de,1.1,7,1.4);L.position.set(x-.2,y0+2.6,z);g.add(L);CAB.light=L;
  // ---------- sillón tipo "cyber chair" ----------
  const ch=new THREE.Group();ch.position.set(CAB.chair.x,y0,CAB.chair.z);g.add(ch);CAB.chairG=ch;
  const leather=std(0x1b1d20,{roughness:.55,metalness:.05}),alu=std(0x9aa1a6,{roughness:.35,metalness:.8}),pod=std(0x2a2f34,{roughness:.45,metalness:.4});
  cyl(ch,.32,.36,.06,alu,0,.03,0,24);cyl(ch,.06,.06,.42,alu,0,.27,0,12);
  box(ch,.56,.12,.56,leather,0,.52,0);box(ch,.14,.82,.56,leather,-.3,.96,0).rotation.z=-.12;box(ch,.1,.2,.32,leather,-.39,1.45,0).rotation.z=-.12;
  for(const s of[-1,1]){box(ch,.06,.24,.08,alu,.05,.62,s*.38);box(ch,.72,.1,.2,pod,.22,.72,s*.38);box(ch,.7,.02,.18,std(0x111316,{roughness:.3,metalness:.3}),.22,.775,s*.38)}
  // ---------- mandos del apoyabrazos izquierdo: malacate ----------
  const mkStick=(par,px,pz,col,label)=>{const p=new THREE.Group();p.position.set(px,.79,pz);par.add(p);
    cyl(p,.035,.042,.03,std(0x111316),0,.015,0,16);const boot=new THREE.Mesh(new THREE.SphereGeometry(.035,14,8,0,Math.PI*2,0,Math.PI/2),std(0x0d0e10,{roughness:.9}));boot.position.y=.025;p.add(boot);
    const pv=new THREE.Group();pv.position.y=.035;p.add(pv);cyl(pv,.011,.013,.12,alu,0,.06,0,10);const kn=new THREE.Mesh(new THREE.CylinderGeometry(.022,.026,.085,14),std(col,{roughness:.5}));kn.position.y=.15;pv.add(kn);
    const tr=box(pv,.012,.018,.02,std(0xc8a020),.0,.15,-.026);
    const l=label3D(label,.09);l.position.set(0,.24,0);p.add(l);return pv};
  const jDW=mkStick(ch,.5,-.38,0x2b2d30,'Malacate');
  CAB.ctl.dw=addCtl({id:'dw',obj:jDW,type:'joy',min:-1,max:1,value:0,spring:0,axis:'z',ang:[.42,-.42],drag:'y',sens:.9,grip:V(0,.15,0),hit:.12,hitPos:V(0,.12,0),label:'Joystick del malacate',dirW:V(1,0,0)});
  const btn=(par,px,py,pz,col,id,lbl,onPress,r=.016)=>{const b=new THREE.Group();b.position.set(px,py,pz);par.add(b);cyl(b,r+.006,r+.006,.012,std(0x111316),0,0,0,16);
    const cap=cyl(b,r,r,.014,std(col,{roughness:.35,emissive:0x000000}),0,.012,0,16);const c=addCtl({id,obj:b,type:'button',cap,grip:V(0,.02,0),hit:.05,hitPos:V(0,.01,0),label:lbl,onPress});c.capMat=cap.material;
    if(lbl){const l=label3D(lbl,.065);l.position.y=.045;b.add(l)}return c};
  CAB.ctl.auto=btn(ch,.36,.79,-.32,0x2e9b45,'auto','AUTO',()=>{CS.auto=!CS.auto;if(CS.auto)CS.manualT=0});
  const kn=(par,px,py,pz,col,id,lbl,min,max,val,ang=[2.3,-2.3])=>{const k=new THREE.Group();k.position.set(px,py,pz);par.add(k);cyl(k,.026,.026,.008,std(0x111316),0,0,0,18);
    const pv=new THREE.Group();pv.position.y=.012;k.add(pv);cyl(pv,.02,.022,.03,std(col,{roughness:.5}),0,.015,0,18);box(pv,.004,.004,.02,std(0xffffff,{emissive:0x999999}),0,.032,-.01);
    const l=label3D(lbl,.065);l.position.y=.06;k.add(l);return addCtl({id,obj:pv,type:'knob',axis:'y',ang,min,max,value:val,drag:'x',sens:.7,grip:V(0,.02,0),hit:.1,hitPos:V(0,.015,0),label:lbl,dirW:V(0,0,1)})};
  CAB.ctl.wobSet=kn(ch,.36,.79,-.44,0x333a40,'wobSet','Peso auto',0,40,18);
  // ---------- apoyabrazos derecho: top drive y bombas ----------
  const tdl=new THREE.Group();tdl.position.set(.5,.79,.38);ch.add(tdl);box(tdl,.05,.02,.12,std(0x111316),0,.01,0);
  const tdp=new THREE.Group();tdp.position.y=.02;tdl.add(tdp);cyl(tdp,.008,.008,.11,alu,0,.055,0,8);box(tdp,.06,.028,.032,std(0x2a5a86,{roughness:.5}),0,.115,0);
  const lt=label3D('Rotaria RPM',.075);lt.position.y=.19;tdl.add(lt);
  CAB.ctl.rpm=addCtl({id:'rpm',obj:tdp,type:'lever',min:0,max:180,value:0,axis:'z',ang:[.55,-.55],drag:'y',sens:.6,grip:V(0,.115,0),hit:.1,hitPos:V(0,.1,0),label:'Palanca de rotaria (top drive)',dirW:V(1,0,0)});
  CAB.ctl.p1=kn(ch,.35,.79,.32,0xb1281c,'p1','Bomba 1',0,120,0);
  CAB.ctl.p2=kn(ch,.35,.79,.44,0xb1281c,'p2','Bomba 2',0,120,0);
  CAB.ctl.estop=btn(ch,.2,.79,.38,0xd8261a,'estop','PARADA',()=>{CS.estop=2;setCtl(CAB.ctl.rpm,0);setCtl(CAB.ctl.p1,0);setCtl(CAB.ctl.p2,0);CS.auto=false},.022);
  // ---------- escritorio con pantallas ----------
  const desk=new THREE.Group();desk.position.set(x+.75,y0,CAB.chair.z);g.add(desk);
  box(desk,.5,.06,2.2,std(0x2a2f34,{roughness:.5,metalness:.3}),0,.78,0);box(desk,.46,.76,2.1,std(0x3a4148,{roughness:.6,metalness:.3}),.02,.38,0);
  CAB.screens=[];
  [[-.82,'scrA',.62,1.08],[0,'scrB',.74,.93],[.82,'scrC',.62,1.08]].forEach(([dz,id,dx,hy],i)=>{
    const s=new THREE.Group();s.position.set(x+dx,y0+hy,CAB.chair.z+dz);g.add(s);s.lookAt(CAB.eye.x,y0+hy,CAB.eye.z);
    box(s,.62,.4,.04,std(0x0d0f12,{roughness:.4,metalness:.4}),0,0,-.025);rod(s,V(0,-.2,-.03),V(0,-.33,-.03),.02,frame);
    const cv=document.createElement('canvas');cv.width=640;cv.height=400;const tx=new THREE.CanvasTexture(cv);tx.encoding=THREE.sRGBEncoding;tx.anisotropy=4;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(.58,.3625),new THREE.MeshBasicMaterial({map:tx,toneMapped:false}));m.position.z=.0;m.rotation.x=0;s.add(m);m.castShadow=false;s.rotateX(-.12);
    CAB.screens.push({cv,tx,g:cv.getContext('2d'),id})});
  // ---------- indicador de peso analógico (tipo Martin-Decker) y manómetros ----------
  const ga=(par,pos,r,o)=>{const G=gauge3D(o);G.g.position.copy(pos);par.add(G.g);G.g.lookAt(CAB.eye);G.g.scale.setScalar(r/.12);return G};
  CAB.gauges.weight=ga(g,V(x+1.55,y0+2.32,CAB.chair.z),.17,{min:0,max:400,major:50,label:'PESO',unit:'klb',second:{min:0,max:40,color:'#c0281c',label:'PSB'}});
  CAB.gauges.spp=ga(g,V(x+1.55,y0+2.3,CAB.chair.z-.52),.12,{min:0,max:5000,major:1000,label:'PRESIÓN BOMBA',unit:'psi'});
  CAB.gauges.tq=ga(g,V(x+1.55,y0+2.3,CAB.chair.z+.52),.12,{min:0,max:30,major:5,label:'TORQUE',unit:'klb·pie'});
  const ov=new THREE.Group();ov.position.set(x+1.62,y0+2.31,CAB.chair.z);g.add(ov);box(ov,.08,.42,1.62,std(0x2a2f34,{roughness:.5,metalness:.4}),.04,0,0);rod(g,V(x+1.66,y0+2.52,CAB.chair.z),V(x+1.66,y0+2.95,CAB.chair.z),.025,frame);
  // ---------- panel de control de pozo (analógico, azul) ----------
  const bp=new THREE.Group();bp.position.set(x-.25,y0,z+1.05);g.add(bp);bp.lookAt(CAB.eye.x,y0,CAB.eye.z);CAB.bopG=bp;
  const blue=std(0x1f4f8f,{roughness:.45,metalness:.3});box(bp,.9,.95,.36,blue,0,.475,0);const top=new THREE.Group();top.position.set(0,.95,.05);top.rotation.x=.55;bp.add(top);box(top,.9,.03,.5,blue,0,0,0);
  const lab=new THREE.Mesh(new THREE.PlaneGeometry(.86,.07),new THREE.MeshBasicMaterial({map:textTex(['CONTROL DE POZO · BOP'],{w:768,h:64,bg:'#163a6a',font:'bold 40px Arial'}),toneMapped:false}));lab.rotation.x=-Math.PI/2;lab.position.set(0,.017,-.21);top.add(lab);
  const tg=(px,pz,o)=>{const G=gauge3D(o);G.g.position.set(px,.018,pz);G.g.rotation.x=-Math.PI/2;G.g.scale.setScalar(.075/.12);top.add(G.g);return G};
  CAB.gauges.dp=tg(-.3,-.08,{min:0,max:2000,major:500,label:'TUBERÍA',unit:'psi'});CAB.gauges.cs=tg(-.1,-.08,{min:0,max:2000,major:500,label:'REVEST.',unit:'psi'});CAB.gauges.acc=tg(.12,-.08,{min:0,max:5000,major:1000,label:'ACUMUL.',unit:'psi'});
  const bb=(px,pz,col,id,lbl,fn)=>{const b=btn(top,px,.016,pz,col,id,lbl,fn,.022);const lt=cyl(top,.009,.009,.01,std(0x222222,{emissive:0x000000}),px+.035,.02,pz-.03,10);CAB.lights[id]=lt;return b};
  CAB.ctl.master=bb(-.32,.13,0xe0b21c,'master','MAESTRO',()=>{CS.masterT=6});
  CAB.ctl.ann=bb(-.13,.13,0xc0281c,'ann','CERRAR ANULAR',()=>{if(CS.masterT>0){CS.masterT=0;bopClose('annular')}else CS.msg('Presiona primero MAESTRO y luego la función')});
  CAB.ctl.rams=bb(.06,.13,0xc0281c,'rams','CERRAR ARIETES',()=>{if(CS.masterT>0){CS.masterT=0;bopClose('rams')}else CS.msg('Presiona primero MAESTRO y luego la función')});
  CAB.ctl.hcr=bb(.25,.13,0x2e8b3a,'hcr','ABRIR HCR',()=>{if(CS.masterT>0){CS.masterT=0;CS.hcr=true;CS.msg('Válvula HCR abierta hacia el múltiple de estrangulación')}else CS.msg('Presiona primero MAESTRO y luego la función')});
  CAB.ctl.sil=btn(top,.36,.016,-.12,0x2a5a86,'sil','SILENCIAR',()=>{CS.silenced=true},.016);
  // pantalla de radio / intercomunicador en la pared izquierda
  const rad=new THREE.Group();rad.position.set(x-.3,y0+1.55,z-2.0);g.add(rad);box(rad,.3,.18,.08,std(0x1b1d20),0,0,0);box(rad,.04,.18,.03,std(0x111111),.12,.2,0);
  // proxy de los controles: apagados hasta sentarse
  CTLS.forEach(c=>c.off=true);
}

/* ---------- manómetro 3D ---------- */
function gauge3D(o){
  o=Object.assign({min:0,max:100,major:10,label:'',unit:''},o);
  const g=new THREE.Group();const S=256,cv=document.createElement('canvas');cv.width=cv.height=S;const x=cv.getContext('2d');
  const phi=t=>(225-270*t)*Math.PI/180;
  x.fillStyle='#f4f1e8';x.beginPath();x.arc(S/2,S/2,S/2-4,0,7);x.fill();
  const scale=(sc,R,col,txtR,font)=>{const n=Math.round((sc.max-sc.min)/(sc.major||((sc.max-sc.min)/8)));x.strokeStyle=col;x.fillStyle=col;
    for(let i=0;i<=n*5;i++){const t=i/(n*5),a=phi(t),maj=i%5===0;x.lineWidth=maj?3:1.2;const r0=R-(maj?18:9);x.beginPath();x.moveTo(S/2+Math.cos(a)*r0,S/2-Math.sin(a)*r0);x.lineTo(S/2+Math.cos(a)*R,S/2-Math.sin(a)*R);x.stroke();
      if(maj){const v=sc.min+(sc.max-sc.min)*t;x.font=font;x.textAlign='center';x.textBaseline='middle';x.fillText(v>=1000?(v/1000)+'k':Math.round(v),S/2+Math.cos(a)*txtR,S/2-Math.sin(a)*txtR)}}};
  scale(o,S/2-10,'#14181c',S/2-42,'bold 20px Arial');
  if(o.second)scale(Object.assign({major:5},o.second),S/2-66,o.second.color,S/2-92,'bold 15px Arial');
  x.fillStyle='#14181c';x.font='bold 17px Arial';x.textAlign='center';x.fillText(o.label,S/2,S/2+52);x.font='14px Arial';x.fillText(o.unit,S/2,S/2+72);
  if(o.second){x.fillStyle=o.second.color;x.font='bold 13px Arial';x.fillText(o.second.label,S/2,S/2-40)}
  const tx=new THREE.CanvasTexture(cv);tx.encoding=THREE.sRGBEncoding;
  const face=new THREE.Mesh(new THREE.CircleGeometry(.12,40),new THREE.MeshBasicMaterial({map:tx,toneMapped:false}));g.add(face);
  const bez=new THREE.Mesh(new THREE.TorusGeometry(.124,.012,10,40),std(0x2a2f34,{metalness:.8,roughness:.3}));g.add(bez);
  const back=new THREE.Mesh(new THREE.CylinderGeometry(.124,.124,.05,32),std(0x2a2f34,{metalness:.6,roughness:.4}));back.rotation.x=Math.PI/2;back.position.z=-.026;g.add(back);
  const mkN=(col,len,w)=>{const p=new THREE.Group();p.position.z=.006;g.add(p);const n=new THREE.Mesh(new THREE.BoxGeometry(w,len,.004),new THREE.MeshBasicMaterial({color:col}));n.position.y=len/2-.012;p.add(n);return p};
  const n1=mkN(0x111111,.105,.006),n2=o.second?mkN(0xc0281c,.08,.005):null;
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.012,12),std(0x111111));cap.rotation.x=Math.PI/2;cap.position.z=.01;g.add(cap);
  const glass=new THREE.Mesh(new THREE.CircleGeometry(.122,40),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.08,roughness:0,metalness:1}));glass.position.z=.014;g.add(glass);
  g.traverse(m=>{if(m.isMesh)m.castShadow=false});
  const G={g,v:0,v2:0,set(v,v2){this.v=lerp(this.v,v,.25);const t=clamp((this.v-o.min)/(o.max-o.min),0,1);n1.rotation.z=phi(t)-Math.PI/2;
    if(n2&&v2!=null){this.v2=lerp(this.v2,v2,.25);const t2=clamp((this.v2-o.second.min)/(o.second.max-o.second.min),0,1);n2.rotation.z=phi(t2)-Math.PI/2}}};
  G.set(o.min,o.second?o.second.min:null);return G}

/* ===================================================================== SIMULACIÓN DE PERFORACIÓN */
const KS=60,STRW=182;
const CS={};
function consoleReset(o){
  Object.assign(CS,{bit:2134.5,hole:2135,wob:0,hook:STRW,rpm:0,tq:0,spm1:0,spm2:0,flowIn:0,spp:0,flowOut:0,pit:182,gain:0,rop:0,auto:false,manualT:0,estop:0,
    kickEnabled:false,kickAt:4.5,kick:false,kickT:0,annular:false,rams:false,hcr:false,sidpp:0,sicp:0,masterT:0,silenced:false,alarms:[],msgs:[],hist:[],histT:0,drawT:0,
    start:2135,events:{},impact:0,noPumpT:0,stall:0,run:true,joint:0,ev:[]},o||{});
  CS.msg=t=>{CS.msgs.unshift({t,ts:performance.now()});CS.msgs.length=Math.min(CS.msgs.length,6);CS.ev.push(t)};
  if(RIG.annular)RIG.annular.material.color.copy(lin(0xb1281c));
  if(CAB.ctl.dw)['dw','rpm','p1','p2'].forEach(k=>setCtl(CAB.ctl[k],0,true));
  if(CAB.ctl.wobSet)setCtl(CAB.ctl.wobSet,18,true);
}
consoleReset();
function bopClose(which){
  if(which==='annular'){if(CS.annular)return;CS.annular=true;tween(1.4,p=>RIG.annular.material.color.setRGB(lerp(.43,.03,p),lerp(.02,.2,p),lerp(.012,.04,p)));CS.msg('Preventora anular cerrada')}
  else{if(CS.rams)return;CS.rams=true;CS.msg('Arietes de tubería cerrados')}
  CS.ev.push('close:'+which);
}
const TOPS=F+1.0+9;
function consoleVisual(){const d=CS.bit-CS.start+.5;setBlock(clamp(TOPS-d-.25-F+EOFF,EOFF+.6,H-2.2));placeStand()}
function consoleSim(dt){
  if(!CS.run)return;
  const c=CAB.ctl;
  if(CS.estop>0)CS.estop-=dt;
  // bombas (rampa)
  const tSpm1=c.p1.value,tSpm2=c.p2.value;CS.spm1=lerp(CS.spm1,tSpm1,1-Math.exp(-dt*1.6));CS.spm2=lerp(CS.spm2,tSpm2,1-Math.exp(-dt*1.6));
  if(CS.spm1<.5)CS.spm1=tSpm1<.5?0:CS.spm1;if(CS.spm2<.5)CS.spm2=tSpm2<.5?0:CS.spm2;
  CS.flowIn=(CS.spm1+CS.spm2)*3.5;
  // rotaria
  let tr=CS.estop>0?0:c.rpm.value;if(CS.stall>0){CS.stall-=dt;tr=0}CS.rpm=lerp(CS.rpm,tr,1-Math.exp(-dt*2.2));if(CS.rpm<1&&tr<1)CS.rpm=0;
  // malacate: + baja la sarta
  let joy=CS.estop>0?0:c.dw.value;if(KEYS.has('ArrowUp')&&MODE.console)joy=.6;if(KEYS.has('ArrowDown')&&MODE.console)joy=-.6;
  const onB=CS.bit>=CS.hole-1e-3;
  let v=joy*.75;
  if(Math.abs(joy)>.08){if(CS.auto){CS.auto=false;CS.msg('Autoperforador desactivado (mando manual)')}}
  else if(CS.auto){const ok=CS.rpm>20&&CS.flowIn>300;v=ok?clamp(CS.rop+(c.wobSet.value-CS.wob)/KS*1.6,-.08,.25):0;if(!onB&&ok)v=.25}
  const before=CS.bit-CS.hole;
  CS.bit+=v*dt;
  // límites del bloque (protector de corona / de piso)
  const dmin=TOPS-.25-F+EOFF-(H-2.2)-.5+CS.start,dmax=TOPS-.25-F+EOFF-(EOFF+.6)-.5+CS.start;
  if(CS.bit<dmin){CS.bit=dmin;if(!CS.events.crown){CS.events.crown=1;CS.msg('PROTECTOR DE CORONA: el bloque se detuvo');CS.ev.push('crown')}}else CS.events.crown=0;
  if(CS.bit>dmax){CS.bit=dmax;if(!CS.events.floor){CS.events.floor=1;CS.msg('Unión perforada: el bloque llegó abajo');CS.ev.push('kellydown')}}else CS.events.floor=0;
  const after=CS.bit-CS.hole;
  if(before<=0&&after>0&&v>.42){CS.ev.push('impact');CS.msg('¡Golpe en el fondo! Baja más despacio al tocar fondo')}
  // peso sobre la broca
  CS.bit=Math.min(CS.bit,CS.hole+55/KS);
  CS.wob=Math.max(0,(CS.bit-CS.hole)*KS);
  // avance (ROP)
  const flowF=clamp(CS.flowIn/450,0,1),drilling=CS.rpm>20&&CS.wob>1&&CS.flowIn>150;
  let rop=drilling?.1*Math.pow(CS.wob/18,.9)*Math.sqrt(CS.rpm/110)*flowF:0;
  if(CS.kick&&!CS.annular&&CS.hole-CS.start>=CS.kickAt)rop*=2.4;
  CS.rop=rop;CS.hole+=rop*dt;
  // torque
  CS.tq=CS.rpm>1?1.4+.3*CS.wob+.004*CS.rpm+Math.sin(T*7)*.25+Math.sin(T*2.3)*.3:0;
  if(CS.wob>32&&CS.rpm>1){CS.tq+=(CS.wob-32)*1.3;if(CS.tq>24&&CS.stall<=0){CS.stall=2.5;CS.msg('¡Atascamiento! El top drive se frenó por torque. Reduce el peso');CS.ev.push('stall')}}
  // rotar sin bombas
  if(CS.rpm>15&&CS.flowIn<100){CS.noPumpT+=dt;if(CS.noPumpT>1.5&&!CS.events.np){CS.events.np=1;CS.msg('Rotando sin circulación: riesgo de pegar la sarta');CS.ev.push('nopump')}}else{CS.noPumpT=0;CS.events.np=0}
  // presión
  const kickP=CS.annular?CS.sicp:0;CS.spp=2150*Math.pow(CS.flowIn/600,2)+(CS.annular&&CS.flowIn>20?CS.sidpp+600:0);
  // patada
  if(CS.kickEnabled&&!CS.kick&&CS.hole-CS.start>=CS.kickAt){CS.kick=true;CS.kickT=0;CS.ev.push('kick')}
  if(CS.kick)CS.kickT+=dt;
  const flowing=CS.kick&&!CS.annular&&!CS.rams;
  if(flowing)CS.gain+=dt*.13;
  if(CS.kick&&(CS.annular||CS.rams)){CS.sidpp=lerp(CS.sidpp,350,1-Math.exp(-dt*.6));CS.sicp=lerp(CS.sicp,520,1-Math.exp(-dt*.6));if(CS.flowIn>20&&!CS.events.pc){CS.events.pc=1;CS.ev.push('pumpclosed');CS.msg('¡Bombeando contra el pozo cerrado! Apaga las bombas')}}
  CS.flowOut=(CS.flowIn>0?CS.flowIn/600*62:0)+(flowing?(CS.flowIn>0?14:22)+Math.sin(T*3)*1.5:0);
  CS.pit=182+CS.gain+(CS.flowIn>0?-.6:0);
  CS.hook=STRW-CS.wob+(v<-.05?4:v>.05?-2:0)+Math.sin(T*5)*.4;
  // alarmas
  CS.alarms=[];if(CS.gain>=2)CS.alarms.push('GANANCIA EN TANQUES +'+CS.gain.toFixed(1).replace('.',',')+' bbl');if(CS.flowOut>(CS.flowIn>0?CS.flowIn/600*62*1.15:6)&&CS.flowOut>8)CS.alarms.push('FLUJO DE RETORNO ALTO');if(CS.wob>32)CS.alarms.push('PESO SOBRE BROCA ALTO');
  if(CS.alarms.length&&!CS.silenced)beepSnd(true);else beepSnd(false);if(!CS.alarms.length)CS.silenced=false;
  if(CS.masterT>0)CS.masterT-=dt;
  // historial
  CS.histT+=dt;if(CS.histT>.5){CS.histT=0;CS.hist.push({wob:CS.wob,rop:CS.rop*3600/12,gain:CS.gain,spp:CS.spp});if(CS.hist.length>200)CS.hist.shift()}
  // visual y sonido
  consoleVisual();
  CS.spin=(CS.spin||0)+CS.rpm/60*6.28*dt;RIG.stand.rotateY(CS.spin)
  RIG.fx.spray=CS.kick&&!CS.annular&&CS.flowIn<20&&CS.bit<CS.hole-2?.3:0;
  setAmbient({level:.55,inside:true,spm:CS.spm1+CS.spm2,rpm:CS.rpm});
  // instrumentos
  CAB.gauges.weight.set(CS.hook,CS.wob);CAB.gauges.spp.set(CS.spp);CAB.gauges.tq.set(CS.tq);
  CAB.gauges.dp.set(CS.annular?CS.sidpp:0);CAB.gauges.cs.set(CS.annular?CS.sicp:0);CAB.gauges.acc.set(3000-(CS.annular?250:0)-(CS.rams?200:0));
  const blink=(T*3|0)%2;
  CAB.ctl.auto.capMat.emissive.setHex(CS.auto?0x2e9b45:0);CAB.ctl.master.capMat.emissive.setHex(CS.masterT>0&&blink?0xe0b21c:0);CAB.ctl.ann.capMat.emissive.setHex(CS.annular?0x9a1a10:0);CAB.ctl.rams.capMat.emissive.setHex(CS.rams?0x9a1a10:0);
  if(CAB.lights.ann)CAB.lights.ann.material.emissive.setHex(CS.annular?0xff2a10:0x0a3a10);
  MODE.alarm=!!CS.alarms.length;
  CS.drawT-=dt;if(CS.drawT<=0){CS.drawT=.22;drawScreens()}
}

/* ---------- pantallas ---------- */
const fmt=(v,d=0)=>v.toFixed(d).replace('.',',');
function drawScreens(){
  CAB.screens.forEach((s,i)=>{const g=s.g,W=640,Hh=400;g.fillStyle='#071019';g.fillRect(0,0,W,Hh);
    const head=(t,c)=>{g.fillStyle=c||'#123044';g.fillRect(0,0,W,34);g.fillStyle='#cfe3ee';g.font='bold 20px Arial';g.textBaseline='middle';g.textAlign='left';g.fillText(t,14,18);g.textAlign='right';g.font='16px Arial';g.fillText(new Date().toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),W-12,18)};
    if(i===0){head('PERFORACIÓN · PARÁMETROS');
      sArc(g,120,135,78,CS.hook,0,400,'GANCHO','klb',null);sArc(g,320,135,78,CS.wob,0,40,'PESO SOBRE BROCA','klb',[16,20]);sArc(g,520,135,78,CS.rpm,0,200,'ROTARIA','RPM',[100,120]);
      sArc(g,120,300,62,CS.tq,0,30,'TORQUE','klb·pie',null);
      sCell(g,230,240,190,52,'PROF. BROCA',fmt(CS.bit,1)+' m');sCell(g,430,240,190,52,'PROF. POZO',fmt(CS.hole,1)+' m');
      sCell(g,230,300,190,52,'ROP',fmt(CS.rop*3600/12,1)+' m/h');sCell(g,430,300,190,52,'AUTOPERF.',CS.auto?'ACTIVO '+fmt(CAB.ctl.wobSet.value)+' klb':'APAGADO',CS.auto?'#55b77d':null);
      sCell(g,230,360,390,32,'SOBRE FONDO',CS.bit>=CS.hole-.05?'SÍ':'NO · '+fmt(CS.hole-CS.bit,1)+' m arriba')}
    if(i===1){head('LODO Y BOMBAS',CS.alarms.some(a=>a.startsWith('GAN')||a.startsWith('FLU'))&&(T*2|0)%2?'#7a1a10':null);
      sBar(g,20,50,140,'BOMBA 1',CS.spm1,120,'epm');sBar(g,170,50,140,'BOMBA 2',CS.spm2,120,'epm');
      sCell(g,330,50,290,60,'CAUDAL',fmt(CS.flowIn)+' gpm');sCell(g,330,118,290,60,'PRESIÓN DE BOMBA',fmt(CS.spp)+' psi');
      const fo=CS.flowOut,foBad=CS.alarms.some(a=>a.startsWith('FLU'));sCell(g,20,200,290,60,'FLUJO DE RETORNO',fmt(fo)+' %',foBad?'#e2573f':null);
      const gb=CS.gain>=2;sCell(g,330,200,290,60,'VOLUMEN TANQUES',fmt(CS.pit,1)+' bbl',gb?'#e2573f':null);
      sCell(g,20,270,600,70,'GANANCIA / PÉRDIDA',(CS.gain>=0?'+':'')+fmt(CS.gain,1)+' bbl',gb?'#e2573f':CS.gain>.5?'#e9c046':'#55b77d',40);
      g.fillStyle='#8fb3c6';g.font='15px Arial';g.textAlign='left';g.fillText('Tanque de viaje: 23,1 bbl · Peso del lodo: 10,4 lpg',20,370)}
    if(i===2){head('TENDENCIAS Y ALARMAS',CS.alarms.length&&(T*2|0)%2?'#7a1a10':null);
      sTrend(g,20,46,600,80,CS.hist.map(h=>h.wob),0,40,'Peso sobre broca (klb)','#62a8d4');sTrend(g,20,134,600,80,CS.hist.map(h=>h.rop),0,90,'ROP (m/h)','#e9c046');sTrend(g,20,222,600,80,CS.hist.map(h=>h.gain),-1,10,'Ganancia (bbl)','#e2573f');
      g.textAlign='left';g.font='bold 16px Arial';let y=326;
      if(CS.alarms.length)CS.alarms.slice(0,2).forEach(a=>{g.fillStyle=(T*2|0)%2?'#ff5a40':'#ffb0a0';g.fillText('⚠ '+a,22,y);y+=22});
      g.font='14px Arial';g.fillStyle='#8fb3c6';CS.msgs.slice(0,Math.max(0,3-Math.min(2,CS.alarms.length))).forEach(m=>{g.fillText('• '+m.t,22,y);y+=20});
      if(CS.annular||CS.rams){g.fillStyle='#c0281c';g.fillRect(470,360,160,30);g.fillStyle='#fff';g.font='bold 15px Arial';g.textAlign='center';g.fillText('POZO CERRADO',550,375)}}
    s.tx.needsUpdate=true})}
function sCell(g,x,y,w,h,lbl,val,col,fs){g.fillStyle='#0e1d29';g.fillRect(x,y,w,h);g.strokeStyle='#1d3a4e';g.strokeRect(x+.5,y+.5,w-1,h-1);g.textAlign='left';g.textBaseline='top';g.fillStyle='#7f9fb2';g.font='12px Arial';g.fillText(lbl,x+8,y+6);g.fillStyle=col||'#e8f2f7';g.font=`bold ${fs||Math.min(26,h-24)}px Arial`;g.textBaseline='bottom';g.fillText(val,x+8,y+h-4);g.textBaseline='middle'}
function sArc(g,cx,cy,r,v,min,max,lbl,unit,band){const a0=Math.PI*.75,a1=Math.PI*2.25,t=clamp((v-min)/(max-min),0,1);
  g.lineCap='butt';g.lineWidth=14;g.strokeStyle='#1d3a4e';g.beginPath();g.arc(cx,cy,r,a0,a1);g.stroke();
  if(band){g.strokeStyle='#2c6e47';g.beginPath();g.arc(cx,cy,r,a0+(band[0]-min)/(max-min)*(a1-a0),a0+(band[1]-min)/(max-min)*(a1-a0));g.stroke()}
  const inb=!band||(v>=band[0]&&v<=band[1]);g.strokeStyle=v<=min+1e-3?'#1d3a4e':inb?'#62c0f0':'#e9c046';g.lineWidth=8;g.beginPath();g.arc(cx,cy,r,a0,a0+t*(a1-a0));g.stroke();
  g.textAlign='center';g.fillStyle='#e8f2f7';g.font=`bold ${Math.round(r*.42)}px Arial`;g.fillText(fmt(v,v<100&&max<=40?1:0),cx,cy+2);g.font='12px Arial';g.fillStyle='#7f9fb2';g.fillText(unit,cx,cy+r*.38);g.fillText(lbl,cx,cy+r+4)}
function sBar(g,x,y,h,lbl,v,max,unit){g.fillStyle='#0e1d29';g.fillRect(x,y,140,h);const t=clamp(v/max,0,1);g.fillStyle='#2f7d4a';g.fillRect(x+10,y+h-10-t*(h-50),30,t*(h-50));g.strokeStyle='#1d3a4e';g.strokeRect(x+10,y+40,30,h-50);
  g.textAlign='left';g.fillStyle='#7f9fb2';g.font='12px Arial';g.fillText(lbl,x+8,y+14);g.fillStyle='#e8f2f7';g.font='bold 24px Arial';g.fillText(fmt(v),x+52,y+h/2+10);g.font='12px Arial';g.fillStyle='#7f9fb2';g.fillText(unit,x+52,y+h/2+32)}
function sTrend(g,x,y,w,h,arr,min,max,lbl,col){g.fillStyle='#0e1d29';g.fillRect(x,y,w,h);g.strokeStyle='#15303f';g.lineWidth=1;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x,y+h*i/4);g.lineTo(x+w,y+h*i/4);g.stroke()}
  g.strokeStyle=col;g.lineWidth=2;g.beginPath();const n=200;arr.slice(-n).forEach((v,i,a)=>{const px=x+w-(a.length-1-i)/(n-1)*w,py=y+h-clamp((v-min)/(max-min),0,1)*h;i?g.lineTo(px,py):g.moveTo(px,py)});g.stroke();
  g.textAlign='left';g.fillStyle='#8fb3c6';g.font='12px Arial';g.fillText(lbl,x+6,y+12);const last=arr[arr.length-1];if(last!=null){g.textAlign='right';g.fillStyle=col;g.font='bold 14px Arial';g.fillText(fmt(last,1),x+w-6,y+12)}}

/* ---------- sentarse / levantarse ---------- */
function consoleSeat(on){
  CTLS.forEach(c=>{if(['dw','rpm','p1','p2','auto','wobSet','estop','master','ann','rams','hcr','sil'].includes(c.id))c.off=!on});
  MODE.console=on;RIG.driller.g.visible=!on;
  if(on){fpMode(CAB.eye,-Math.PI/2,-.42);camera.fov=70;camera.updateProjectionMatrix();station(V(CAB.chair.x+.05,F,CAB.chair.z),-Math.PI/2);RIG.string.visible=true;RIG.stand.visible=true;RIG.slips.visible=false;consoleVisual();drawScreens()}
  else{beepSnd(false);camera.fov=55;camera.updateProjectionMatrix()}
}
