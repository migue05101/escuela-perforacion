/* ===================================================================== CORTE DEL SUBSUELO BAJO EL TALADRO (estilo ilustración) */
const CUT={on:false,R:9,D:46,scale:50,g:null,planes:null,mats:[]};
const CUT_LAYERS=[
  {y0:0,y1:-3,n:'Suelo y aluvión',c:'#6e5536',c2:'#4f3c26',k:'grava'},
  {y0:-3,y1:-10,n:'Arcillolita',c:'#8a7a5f',c2:'#6d5f48',k:'lam'},
  {y0:-10,y1:-19,n:'Arenisca con agua (acuífero)',c:'#c2a676',c2:'#a48a5e',k:'arena'},
  {y0:-19,y1:-29,n:'Lutita',c:'#5d5f63',c2:'#45474a',k:'lam'},
  {y0:-29,y1:-37,n:'Caliza',c:'#b3b0a4',c2:'#94918a',k:'bloque'},
  {y0:-37,y1:-46,n:'Arenisca productora (gas)',c:'#c9a24e',c2:'#9b7a34',k:'arena'}];
function strataCanvas(){
  const W=900,Hc=2300,ppm=Hc/CUT.D;
  return canvasTex(W,Hc,(g)=>{
    CUT_LAYERS.forEach(L=>{const y0=-L.y0*ppm,y1=-L.y1*ppm;g.fillStyle=L.c;g.fillRect(0,y0,W,y1-y0);
      g.save();g.beginPath();g.rect(0,y0,W,y1-y0);g.clip();
      if(L.k==='lam'){for(let y=y0;y<y1;y+=4+Math.random()*9){g.fillStyle=Math.random()<.5?L.c2:'rgba(255,255,255,.08)';g.globalAlpha=.4+Math.random()*.4;g.fillRect(0,y+Math.sin(y)*2,W,1+Math.random()*2.5)}}
      if(L.k==='arena'){for(let i=0;i<(y1-y0)*W/14;i++){g.fillStyle=Math.random()<.5?'rgba(0,0,0,.16)':'rgba(255,255,240,.18)';const s=.8+Math.random()*1.8;g.fillRect(Math.random()*W,y0+Math.random()*(y1-y0),s,s)}
        for(let y=y0;y<y1;y+=26+Math.random()*30){g.strokeStyle=L.c2;g.globalAlpha=.35;g.lineWidth=1.5;g.beginPath();g.moveTo(0,y);for(let x=0;x<=W;x+=30)g.lineTo(x,y+Math.sin(x*.01+y)*5);g.stroke()}}
      if(L.k==='grava'){for(let i=0;i<(y1-y0)*W/60;i++){g.fillStyle=`hsl(${25+Math.random()*20},${15+Math.random()*20}%,${25+Math.random()*35}%)`;g.globalAlpha=.9;g.beginPath();g.ellipse(Math.random()*W,y0+Math.random()*(y1-y0),2+Math.random()*7,1.5+Math.random()*5,Math.random()*3,0,7);g.fill()}}
      if(L.k==='bloque'){g.strokeStyle=L.c2;g.globalAlpha=.55;g.lineWidth=2;let r=0;for(let y=y0;y<y1;y+=22,r++){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();for(let x=(r%2)*40;x<W;x+=80){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+22);g.stroke()}}
        for(let i=0;i<1200;i++){g.fillStyle='rgba(0,0,0,.12)';g.fillRect(Math.random()*W,y0+Math.random()*(y1-y0),2,2)}}
      g.globalAlpha=1;g.restore();
      g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,y1-2,W,3)});
    // poros con gas en la productora
    const L=CUT_LAYERS[5],y0=-L.y0*ppm,y1=-L.y1*ppm;for(let i=0;i<500;i++){g.fillStyle='rgba(235,245,250,.55)';g.beginPath();g.arc(Math.random()*W,y0+Math.random()*(y1-y0),1.2+Math.random()*2.2,0,7);g.fill()}
    // nivel freático
    g.strokeStyle='#4d8fd0';g.lineWidth=4;g.setLineDash([16,10]);g.beginPath();g.moveTo(0,-CUT_LAYERS[2].y0*ppm+40);g.lineTo(W,-CUT_LAYERS[2].y0*ppm+40);g.stroke();g.setLineDash([]);
  })}
function cutFace(g,tex,a,b,y0,y1,orient){ // orient: 'back' (z=0, mira +z), 'side-' (x=-R), 'side+' (x=R), 'bottom'
  const R=CUT.R,D=CUT.D;let geo;
  if(orient==='back'){geo=new THREE.PlaneGeometry(b-a,y0-y1);geo.translate((a+b)/2,(y0+y1)/2,0)}
  else if(orient==='front'){geo=new THREE.PlaneGeometry(b-a,y0-y1);geo.rotateY(Math.PI);geo.translate((a+b)/2,(y0+y1)/2,R)}
  else{geo=new THREE.PlaneGeometry(b-a,y0-y1);geo.rotateY(orient==='side-'?Math.PI/2:-Math.PI/2);geo.translate(orient==='side-'?-R:R,(y0+y1)/2,(a+b)/2)}
  const uv=geo.attributes.uv,p=geo.attributes.position;
  for(let i=0;i<uv.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);const u=orient==='back'||orient==='front'?(x+R)/(2*R):(orient==='side-'?z:(-z))/(2*R)+.5;uv.setXY(i,u,1+y/D)}
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,roughness:1,metalness:0}));m.receiveShadow=true;g.add(m);return m}
function shell(g,rIn,rOut,y0,y1,mat,cap){ // anillo cortado a la mitad (mitad trasera) con sus caras de corte
  const h=y0-y1,ds=THREE.DoubleSide;const m2=mat.clone();m2.side=ds;
  const out=new THREE.Mesh(new THREE.CylinderGeometry(rOut,rOut,h,40,1,true,Math.PI/2,Math.PI),m2);out.position.y=(y0+y1)/2;g.add(out);
  if(rIn>0){const inn=new THREE.Mesh(new THREE.CylinderGeometry(rIn,rIn,h,40,1,true,Math.PI/2,Math.PI),m2);inn.position.y=out.position.y;g.add(inn)}
  for(const s of[-1,1]){const w=rOut-rIn,f=new THREE.Mesh(new THREE.PlaneGeometry(w,h),cap||m2);f.position.set(s*(rIn+w/2),(y0+y1)/2,0);g.add(f)}
  return out}
function leader(g,from,to,text,sc){const l=label3D(text,(sc||.42)*2.1);l.position.copy(from);g.add(l);
  const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([from.clone().add(V(-.15,0,0)),to]),new THREE.LineBasicMaterial({color:0xffffff,depthTest:false,transparent:true,opacity:.85}));ln.renderOrder=9;g.add(ln);
  const dot=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false}));dot.position.copy(to);dot.renderOrder=9;g.add(dot);return l}
function buildCutaway(){
  if(CUT.g)return CUT.g;
  const g=new THREE.Group();g.visible=false;world.add(g);CUT.g=g;const R=CUT.R,D=CUT.D;
  const tex=strataCanvas();
  // caras de roca con hueco para el pozo
  const gaps=[[0,-2.3,1.92],[-2.3,-8,.74],[-8,-22,.52],[-22,-36,.38],[-36,-D,.26]];
  gaps.forEach(([y0,y1,r])=>{cutFace(g,tex,-R,-r,y0,y1,'back');cutFace(g,tex,r,R,y0,y1,'back')});
  cutFace(g,tex,0,R,0,-D,'side-');cutFace(g,tex,0,R,0,-D,'side+');cutFace(g,tex,-R,R,0,-D,'front');
  const bot=new THREE.Mesh(new THREE.PlaneGeometry(2*R,R),std(0x6a5430,{roughness:1}));bot.rotation.x=-Math.PI/2;bot.position.set(0,-D,R/2);g.add(bot);
  // borde: capa vegetal y baranda de seguridad
  const lip=std(0x4e3b24,{roughness:1});box(g,2*R+.2,.35,.2,lip,0,-.15,R);for(const s of[-1,1])box(g,.2,.35,R,lip,s*R,-.15,R/2);
  const rail=[V(-R,0,0),V(-R,0,R),V(R,0,R),V(R,0,0)];handrail(g,rail,1.05);
  const sg=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.6),std(0xffffff,{map:textTex(['CORTE ILUSTRATIVO DEL POZO','No es una excavación real'],{w:640,h:150,bg:'#0f4d8a',font:'bold 44px Arial'})}));sg.position.set(-2.2,1.35,R+.02);g.add(sg);box(g,.08,1.4,.08,MAT.galv,-3.4,.7,R+.05);box(g,.08,1.4,.08,MAT.galv,-1,.7,R+.05);
  // pozo: revestimientos, cemento y hueco abierto (mitad trasera visible)
  const steel=std(0x8b939a,{roughness:.35,metalness:.85}),cem=std(0xa9a69b,{roughness:.95,metalness:0,map:TEX.concrete}),rock=new THREE.MeshStandardMaterial({map:tex,roughness:1,metalness:0,side:THREE.DoubleSide,color:0xb0b0b0});
  const mud=std(0x6b4a2e,{roughness:.3,metalness:0,transparent:true,opacity:.55});
  shell(g,.58,.62,-2.3,-8,steel);shell(g,.62,.72,-2.3,-8,cem);                 // conductor 30" + cemento
  shell(g,.34,.38,-2.3,-22,steel);shell(g,.38,.58,-2.3,-8,cem);shell(g,.38,.5,-8,-22,cem);   // superficie 13 3/8"
  shell(g,.23,.27,-2.3,-36,steel);shell(g,.27,.34,-16,-22,cem);shell(g,.27,.36,-22,-36,cem); // intermedio 9 5/8"
  const oh=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,10,40,1,true,Math.PI/2,Math.PI),rock);oh.position.y=-41;g.add(oh);// hueco abierto
  for(const[y,r]of[[-8,.62],[-22,.38],[-36,.27]]){const z=new THREE.Mesh(new THREE.CylinderGeometry(r+.04,r+.04,.4,40,1,true,Math.PI/2,Math.PI),std(0x3a3f44,{metalness:.7,roughness:.4,side:THREE.DoubleSide}));z.position.y=y+.2;g.add(z)}
  shell(g,.0,.23,-2.3,-36,mud,mud);                                                            // lodo en el anular
  // sarta (gira)
  const st=new THREE.Group();g.add(st);CUT.string=st;
  const dp=std(0x7b858b,{roughness:.3,metalness:.85}),tj=std(0x5a6268,{roughness:.25,metalness:.9}),dc=std(0x4d555b,{roughness:.35,metalness:.85});
  cyl(st,.13,.13,33.7,dp,0,-2.3-33.7/2,0,18);for(let y=-4.5;y>-36;y-=3.2)cyl(st,.17,.17,.32,tj,0,y,0,20);
  cyl(st,.15,.15,3,dc,0,-37.5,0,18);for(const y of[-36.2,-37.5,-38.8])cyl(st,.18,.18,.4,tj,0,y,0,20);
  cyl(st,.19,.19,5.4,dc,0,-41.7,0,20);
  for(const y of[-40.3,-43.3]){for(let i=0;i<3;i++){const a=i*2.094,b=box(st,.07,.9,.1,std(0xa0a7ac,{metalness:.85,roughness:.3}),Math.cos(a)*.215,y,Math.sin(a)*.215);b.rotation.y=-a;b.rotation.x=.3}}
  cyl(st,.19,.19,.9,std(0xd4a21c,{roughness:.4,metalness:.5}),0,-44.85,0,20);
  const bit=new THREE.Group();bit.position.y=-45.3;st.add(bit);
  lathe(bit,[[0,-.7],[.1,-.7],[.2,-.62],[.24,-.45],[.24,-.18],[.2,-.06],[.17,0]],std(0x3a3f44,{metalness:.85,roughness:.3}),0,32);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const bl=box(bit,.06,.5,.1,std(0x2a2f34,{metalness:.7,roughness:.4}),Math.cos(a)*.2,-.42,Math.sin(a)*.2);bl.rotation.y=-a;
    for(let k=0;k<4;k++){const c=cyl(bit,.025,.025,.02,std(0x111111,{metalness:1,roughness:.1}),Math.cos(a)*.245,-.25-k*.11,Math.sin(a)*.245,10);c.rotation.z=Math.PI/2;c.rotation.y=-a}}
  // circulación: recortes que suben por el anular y chorros en la broca
  const n=520,geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));
  const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0x5b4630,size:.06,transparent:true,opacity:.95}));pts.frustumCulled=false;g.add(pts);CUT.cut=pts;
  CUT.cutS=[...Array(n)].map(()=>({y:-46+Math.random()*44,a:Math.PI/2+Math.random()*Math.PI,f:Math.random()}));
  // flechas del lodo
  const arrow=(pos,up,txt)=>{const a=new THREE.Group();a.position.copy(pos);g.add(a);const c=new THREE.Mesh(new THREE.ConeGeometry(.12,.3,12),new THREE.MeshBasicMaterial({color:up?0xe9c046:0x62a8d4}));c.rotation.x=up?0:Math.PI;a.add(c);CUT.arrows=(CUT.arrows||[]).concat([{a,up,y0:pos.y}]);return a};
  for(let i=0;i<6;i++){arrow(V(0,-4-i*5.5,.24),false);arrow(V(.3,-6-i*5.5,-.08),true)}
  leader(g,V(-3.6,-9,.6),V(-.1,-9,.24),'↓ El lodo baja por dentro de la tubería',.36);leader(g,V(-3.6,-12,.6),V(.2,-12,-.05),'↑ Sube por el anular con los recortes',.36);
  // etiquetas con líneas guía (como la ilustración)
  const LX=5.0,L=(y,to,t)=>leader(g,V(LX,y,.6),to,t,.4);
  L(-1.0,V(1.6,-1.2,-.4),'Contrapozo y cabezal');L(.4+F*0,V(1.0,1.6,.2),'Preventoras (BOP)');
  L(-5,V(.7,-5,-.1),'Revestimiento conductor 30"');L(-7.5,V(.68,-6.5,-.05),'Cemento');
  L(-14,V(.44,-14,-.05),'Revestimiento de superficie 13⅜"');L(-25,V(.31,-25,-.05),'Revestimiento intermedio 9⅝"');
  L(-30,V(.2,-30,-.05),'Lodo en el anular (sube con recortes)');L(-33,V(.15,-33,.05),'Tubería de perforación 5"');
  L(-37.5,V(.17,-37.5,.05),'Tubería extrapesada (HWDP)');L(-40.6,V(.24,-41,.05),'Lastrabarrenas (collares de perforación)');
  L(-43.3,V(.26,-43.3,.05),'Estabilizador');L(-44.85,V(.2,-44.85,.05),'MWD (mediciones mientras se perfora)');L(-46.2,V(.2,-45.8,.05),'Broca PDC 8½"');
  L(-39,V(.25,-39,-.05),'Hueco abierto 8½"');
  // formaciones y escala de profundidad
  CUT_LAYERS.forEach(Ly=>{const l=label3D(Ly.n,1.0);l.position.set(-5.4,(Ly.y0+Ly.y1)/2,.3);g.add(l)});
  for(let d=0;d<=2300;d+=500){const y=-d/CUT.scale,l=label3D(d.toLocaleString('es-CO')+' m',.8);l.position.set(-8.1,y,.3);g.add(l);box(g,.5,.03,.03,std(0xffffff,{emissive:0x888888}),-8.75,y,.03)}
  const tl=label3D('Profundidad real · el ancho del pozo está ampliado',.7);tl.position.set(-5,-.8,.4);g.add(tl);
  g.traverse(o=>{if(o.isMesh){o.castShadow=false}if(o.isSprite||o.isLine||(o.isMesh&&o.material.depthTest===false)){o.material.depthTest=true;o.renderOrder=0}});
  // terreno alterno con el hueco del corte (el original se oculta)
  const gq=new THREE.Group();gq.visible=false;ground.add(gq);CUT.ground=gq;
  const mats=[];ground.children.forEach(c=>{if(c===gq)return;let m=null;c.traverse(o=>{if(o.isMesh&&!m)m=o.material});mats.push(m)});
  const rect=(m,a,b,c,d,y,tile)=>{if(b-a<=0||d-c<=0)return;const geo=new THREE.PlaneGeometry(b-a,d-c);const uv=geo.attributes.uv,pos=geo.attributes.position;
    for(let i=0;i<uv.count;i++){const wx=pos.getX(i)+(a+b)/2,wz=-pos.getY(i)+(c+d)/2;uv.setXY(i,wx/tile,-wz/tile)}const me=new THREE.Mesh(geo,m);me.rotation.x=-Math.PI/2;me.position.set((a+b)/2,y,(c+d)/2);me.receiveShadow=true;gq.add(me)};
  const holed=(m,X0,X1,Z0,Z1,y,tile)=>{const h=1.85,cl=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
    rect(m,X0,X1,Z0,cl(-h,Z0,Z1),y,tile);rect(m,X0,X1,cl(R,Z0,Z1),Z1,y,tile);
    rect(m,X0,cl(-h,X0,X1),cl(-h,Z0,Z1),cl(0,Z0,Z1),y,tile);rect(m,cl(h,X0,X1),X1,cl(-h,Z0,Z1),cl(0,Z0,Z1),y,tile);
    rect(m,X0,cl(-R,X0,X1),cl(0,Z0,Z1),cl(R,Z0,Z1),y,tile);rect(m,cl(R,X0,X1),X1,cl(0,Z0,Z1),cl(R,Z0,Z1),y,tile)};
  holed(mats[0],-700,700,-700,700,-.02,9);if(mats[1])holed(mats[1],-42,46,-52,54,.01,5);
  // recorte (un solo plano: z > 0) para el contrapozo y las esteras
  CUT.planes=[new THREE.Plane(V(0,0,-1),0)];
  const add=m=>{if(!CUT.mats.includes(m))CUT.mats.push(m)};
  RIG.parts.cellar.traverse(o=>{if(o.isMesh&&o.material.map===TEX.concrete)add(o.material)});
  RIG.parts.sub.traverse(o=>{if(o.isMesh&&o.material.map===TEX.wood)add(o.material)});
  return g}
function setCutaway(on){
  buildCutaway();CUT.on=on;CUT.g.visible=on;renderer.localClippingEnabled=true;
  ground.children.forEach(c=>{c.visible=c===CUT.ground?on:!on});MODE.under=on;
  CUT.mats.forEach(m=>{m.clippingPlanes=on?CUT.planes:null;m.clipIntersection=false;m.clipShadows=true;m.needsUpdate=true});
}
function updateCut(dt){
  if(!CUT.on||!CUT.g)return;CUT.string.rotation.y+=dt*1.6;
  const pos=CUT.cut.geometry.attributes.position;
  const rr=y=>y>-36?.23:.24;
  CUT.cutS.forEach((s,i)=>{s.y+=dt*(1.3+s.f);if(s.y>-2.4)s.y=-45.6;const rin=y=>y<-39&&y>-44.4?.19:y<-36?.15:.13;const r=rin(s.y)+(rr(s.y)-rin(s.y))*(.25+.6*s.f);pos.setXYZ(i,Math.sin(s.a)*r,s.y,Math.cos(s.a)*r)});pos.needsUpdate=true;
  (CUT.arrows||[]).forEach(o=>{const k=((T*1.4+o.y0)%3+3)%3;o.a.position.y=o.y0+(o.up?k:-k)})}

const CUTV={top:[[3.4,-1.2,8.6],[1.6,-6,0]],mid:[[3.4,-20,8.6],[1.6,-27,0]],bit:[[3,-38.5,8.6],[1.5,-43.5,0]],sup:[[5,15,23],[0,-12,1]]};
function cutView(k){MODE.under=true;const c=CUTV[k];lookFrom(c[0],c[1])}
