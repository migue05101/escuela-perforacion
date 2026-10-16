/* ===================================================================== POZO EN CORTE PARA RECORRER (escala de profundidad comprimida) */
const WELL={depth:160,scale:15,xs:3,layers:[
  {y0:0,y1:-12,n:'Suelo y aluvión',c:'#7b6243',c2:'#5d4630'},
  {y0:-12,y1:-40,n:'Arcillolita',c:'#6f7366',c2:'#585c50'},
  {y0:-40,y1:-70,n:'Arenisca con agua',c:'#b49a6e',c2:'#97805a'},
  {y0:-70,y1:-100,n:'Lutita',c:'#4f5155',c2:'#3c3e41'},
  {y0:-100,y1:-125,n:'Caliza',c:'#a7a59b',c2:'#8c8a80'},
  {y0:-125,y1:-162,n:'Arenisca productora (gas)',c:'#c2a35a',c2:'#9e8344'}],
  stops:[]};
const CAMTH=.94;
function rockTex(c,c2,seed){return canvasTex(256,256,(g,w,h)=>{g.fillStyle=c;g.fillRect(0,0,w,h);for(let i=0;i<14;i++){g.fillStyle=c2;g.globalAlpha=.25+Math.random()*.3;g.fillRect(0,Math.random()*h,w,2+Math.random()*6)}g.globalAlpha=1;
  for(let i=0;i<2600;i++){const v=Math.random();g.fillStyle=v<.5?'rgba(0,0,0,.18)':'rgba(255,255,255,.12)';const s=.8+Math.random()*2.2;g.fillRect(Math.random()*w,Math.random()*h,s,s)}})}
function halfCyl(p,r,y0,y1,mat){const h=y0-y1,m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,36,1,true,CAMTH+Math.PI/2,Math.PI),mat);m.position.y=(y0+y1)/2;p.add(m);return m}
function buildDeepWell(){
  if(RIG.deep)return RIG.deep;
  const g=new THREE.Group();g.position.y=-2.3;world.add(g);g.visible=false;RIG.deep=g;
  const ds=THREE.DoubleSide;
  // pared de roca detrás del corte, paredes laterales y fondo
  WELL.layers.forEach((L,i)=>{const t=rockTex(L.c,L.c2);t.repeat.set(2,Math.max(1,(L.y0-L.y1)/6));const m=std(0xffffff,{map:t,roughness:1,metalness:0,side:ds});
    const hh=L.y0-L.y1,mid=(L.y0+L.y1)/2;
    const back=new THREE.Mesh(new THREE.PlaneGeometry(9,hh),m);back.position.set(-Math.sin(CAMTH)*.6,mid,-Math.cos(CAMTH)*.6);back.rotation.y=CAMTH;g.add(back);
    for(const s of[-1,1]){const side=new THREE.Mesh(new THREE.PlaneGeometry(5,hh),m);const ax=Math.cos(CAMTH)*s*4.4,az=-Math.sin(CAMTH)*s*4.4;side.position.set(ax+Math.sin(CAMTH)*1.9,mid,az+Math.cos(CAMTH)*1.9);side.rotation.y=CAMTH+Math.PI/2;g.add(side)}
    L.mat=m;
    const lb=label3D(`${L.n} · ${Math.round(-L.y0*WELL.scale).toLocaleString('es-CO')}–${Math.round(-L.y1*WELL.scale).toLocaleString('es-CO')} m`,.42);lb.position.set(-Math.sin(CAMTH)*.5+Math.cos(CAMTH)*-1.6,L.y0-1.2,-Math.cos(CAMTH)*.5-Math.sin(CAMTH)*-1.6);g.add(lb)});
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(9,6),WELL.layers[5].mat);floor.rotation.x=-Math.PI/2;floor.position.y=-162;g.add(floor);
  // hueco (pared del pozo) por tramos de formación
  const holeR=y=>y>-10?.42:y>-45?.22:y>-105?.155:.108;
  WELL.layers.forEach(L=>{const segs=[[L.y0,L.y1]];segs.forEach(([a,b])=>{const cuts=[-10,-45,-105].filter(c=>c<a&&c>b);let top=a;[...cuts,b].forEach(c=>{const rm=std(0xffffff,{map:L.mat.map,roughness:1,metalness:0,side:ds,color:new THREE.Color(.75,.75,.75)});halfCyl(g,holeR((top+c)/2),top,c,rm);top=c})})});
  // revestimientos (casing) con cemento
  const cem=std(0x9c9a92,{roughness:.95,metalness:0,side:ds}),stl=std(0x6d757b,{roughness:.4,metalness:.8,side:ds});
  const csg=[{n:'Revestimiento conductor 30"',r:.38,y0:0,y1:-10,cTop:0},{n:'Revestimiento de superficie 13⅜"',r:.17,y0:0,y1:-45,cTop:0},{n:'Revestimiento intermedio 9⅝"',r:.122,y0:0,y1:-105,cTop:-60}];
  csg.forEach((c,i)=>{const hr=holeR((c.y0+c.y1)/2+.1);halfCyl(g,c.r,c.y0,c.y1,stl);
    if(hr>c.r+.005)halfCyl(g,hr-.004,Math.min(c.cTop,c.y0),c.y1,cem);
    const shoe=new THREE.Mesh(new THREE.CylinderGeometry(c.r+.012,c.r+.012,.35,36,1,true,CAMTH+Math.PI/2,Math.PI),std(0x3a3f44,{side:ds,metalness:.7,roughness:.4}));shoe.position.y=c.y1+.17;g.add(shoe);
    const l=label3D(c.n,.3);l.position.set(Math.cos(CAMTH)*.35,c.y1+1.6-i*.4,-Math.sin(CAMTH)*.35);g.add(l);
    const l2=label3D('Zapata · '+Math.round(-c.y1*WELL.scale).toLocaleString('es-CO')+' m',.26);l2.position.set(Math.cos(CAMTH)*.35,c.y1+.5,-Math.sin(CAMTH)*.35);g.add(l2)});
  // sarta de perforación
  const sg=new THREE.Group();g.add(sg);RIG.deepString=sg;
  const dp=std(0x7b858b,{roughness:.32,metalness:.85}),tj=std(0x575f64,{roughness:.28,metalness:.9}),dc=std(0x50585e,{roughness:.35,metalness:.85});
  cyl(sg,.064,.064,140,dp,0,-70,0,14);for(let y=-3;y>-140;y-=3)cyl(sg,.084,.084,.3,tj,0,y,0,16);
  cyl(sg,.07,.07,6,dc,0,-143,0,14);for(const y of[-140.5,-143,-145.5])cyl(sg,.085,.085,.5,tj,0,y,0,16);
  cyl(sg,.083,.083,9,dc,0,-150.5,0,16);
  const stab=y=>{const s=new THREE.Group();s.position.y=y;sg.add(s);for(let i=0;i<3;i++){const b=box(s,.03,.6,.05,std(0x9aa1a6,{metalness:.8,roughness:.3}),Math.cos(i*2.1)*.095,0,Math.sin(i*2.1)*.095);b.rotation.y=-i*2.1;b.rotation.x=.25}};stab(-149);stab(-154);
  const mwd=cyl(sg,.083,.083,1.5,std(0xd0a020,{roughness:.4,metalness:.5}),0,-155.75,0,16);
  const bit=new THREE.Group();bit.position.y=-157;sg.add(bit);RIG.deepBit=bit;
  lathe(bit,[[.0,-.42],[.06,-.43],[.1,-.4],[.108,-.3],[.108,-.12],[.09,-.05],[.075,0]],std(0x3a3f44,{metalness:.8,roughness:.35}),0,28);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const bl=box(bit,.03,.32,.05,std(0x2a2f34,{metalness:.7,roughness:.4}),Math.cos(a)*.09,-.25,Math.sin(a)*.09);bl.rotation.y=-a;
    for(let k=0;k<4;k++){const ct=cyl(bit,.011,.011,.012,std(0x1a1a1a,{metalness:1,roughness:.15}),Math.cos(a)*.104,-.14-k*.07,Math.sin(a)*.104,10);ct.rotation.z=Math.PI/2;ct.rotation.y=-a}}
  [['Tubería de perforación 5"',-30],['Tubería extrapesada (HWDP)',-142],['Lastrabarrenas (drill collars)',-151.5],['Estabilizador',-149],['Herramienta MWD',-155.75],['Broca PDC 8½"',-157.2]].forEach(([t,y])=>{const l=label3D(t,.26);l.position.set(Math.cos(CAMTH)*.32+Math.sin(CAMTH)*.15,y,-Math.sin(CAMTH)*.32+Math.cos(CAMTH)*.15);g.add(l)});
  // circulación: recortes subiendo por el anular
  const n=400,geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));
  const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0x8a7a62,size:.022,transparent:true,opacity:.9}));pts.frustumCulled=false;g.add(pts);RIG.cut=pts;
  RIG.cutS=[...Array(n)].map(()=>({y:-158+Math.random()*156,a:CAMTH+Math.PI/2+Math.random()*Math.PI,r:0}));
  const n2=120,g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n2*3),3));
  const jets=new THREE.Points(g2,new THREE.PointsMaterial({color:0xb08a58,size:.03,transparent:true,opacity:.8}));jets.frustumCulled=false;g.add(jets);RIG.jets=jets;RIG.jetS=[...Array(n2)].map(()=>({p:V(0,-157.4,0),v:V(),t:Math.random()}));
  // gas en la formación productora
  const gg=new THREE.BufferGeometry(),ng=90;gg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(ng*3),3));const gas=new THREE.Points(gg,new THREE.PointsMaterial({color:0xe6edf0,size:.05,map:TEX.dot,transparent:true,depthWrite:false}));gas.frustumCulled=false;g.add(gas);RIG.gasP=gas;
  RIG.gasS=[...Array(ng)].map(()=>{const s=-.3-Math.random()*1.6,u=(Math.random()-.5)*7;return{x:Math.cos(CAMTH+Math.PI)*-.0+(-Math.sin(CAMTH))*(.6+Math.random()*.1)+Math.cos(CAMTH)*u,z:-Math.cos(CAMTH)*.62-Math.sin(CAMTH)*u,y:-127-Math.random()*33,ph:Math.random()*6}});
  g.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false}if(o.isSprite)o.scale.x/=WELL.xs});
  g.scale.set(WELL.xs,1,WELL.xs);
  return g}
function updateDeep(dt){
  if(!RIG.deep||!RIG.deep.visible)return;
  RIG.deepString.rotation.y+=dt*1.4;
  const pos=RIG.cut.geometry.attributes.position,holeR=y=>y>-45?.17:y>-105?.122:.108;
  RIG.cutS.forEach((s,i)=>{s.y+=dt*(1.2+Math.random()*.4);if(s.y>-1.5){s.y=-158}const r=(holeR(s.y)+.084)/2+Math.sin(i)*.012;pos.setXYZ(i,Math.sin(s.a)*r,s.y,Math.cos(s.a)*r)});pos.needsUpdate=true;
  const jp=RIG.jets.geometry.attributes.position;RIG.jetS.forEach((s,i)=>{s.t-=dt;if(s.t<=0){s.p.set(0,-157.4,0);const a=CAMTH+Math.PI/2+Math.random()*Math.PI;s.v.set(Math.sin(a)*.4,-.1+Math.random()*.2,Math.cos(a)*.4);s.t=.4+Math.random()*.4}s.p.addScaledVector(s.v,dt);if(Math.hypot(s.p.x,s.p.z)>.1){s.v.set(s.v.x*.2,1.2,s.v.z*.2)}jp.setXYZ(i,s.p.x,s.p.y,s.p.z)});jp.needsUpdate=true;
  const gp=RIG.gasP.geometry.attributes.position;RIG.gasS.forEach((s,i)=>gp.setXYZ(i,s.x,s.y+Math.sin(T*.8+s.ph)*.1,s.z));gp.needsUpdate=true;
}
