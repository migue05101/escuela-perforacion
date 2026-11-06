/* ===================================================================== MEJORAS VISUALES
   Terreno con colinas y cordillera, vegetación tropical (árboles, palmas, pasto con viento),
   cielo con nubes, reflejos suavizados, charcos y huellas en la locación,
   y posproceso en calidad alta (oclusión ambiental, resplandor y gradación de color). */
const VIS={grassMat:null,clouds:null,t:0};
/* ---------- ruido ---------- */
const VN=(()=>{const p=new Uint8Array(512),a=[...Array(256).keys()];let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=255;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}for(let i=0;i<512;i++)p[i]=a[i&255];return p})();
function vnoise(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;const h=(i,j)=>VN[(VN[i&255]+j)&255]/255;const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  const a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
function fbm(x,y,o){let a=.5,f=1,s=0;for(let i=0;i<(o||5);i++){s+=a*vnoise(x*f,y*f);f*=2.03;a*=.5}return s}
const sstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};

/* ---------- terreno: llano alrededor, colinas y cordillera al fondo ---------- */
const FLAT=120;   // la locación y el pasto plano ocupan ±120 m
function terrainH(x,z){const d=Math.max(Math.abs(x),Math.abs(z));if(d<FLAT)return -.35;
  const r=Math.hypot(x,z);
  let h=sstep(FLAT,260,d)*(fbm(x*.007,z*.007,4)-.38)*26;                        // colinas suaves
  h+=sstep(420,1000,r)*Math.pow(fbm(x*.0022+3.1,z*.0022+7.7,5),1.7)*520;       // cordillera
  if(z>0&&Math.abs(x)<40)h*=sstep(7,34,Math.abs(x));                             // la vía de acceso
  return Math.max(h,-.3)}
function buildTerrain(){
  const S=4200,N=210,geo=new THREE.PlaneGeometry(S,S,N,N);geo.rotateX(-Math.PI/2);
  const pos=geo.attributes.position,col=new Float32Array(pos.count*3);const c=new THREE.Color(),lush=lin(0x3d6a2a),dry=lin(0x7c8040),forest=lin(0x26421f),rock=lin(0x5d6656),far=lin(0x41584a);
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),h=terrainH(x,z);pos.setY(i,h);
    const n=fbm(x*.02,z*.02,3);c.copy(lush).lerp(dry,clamp(n*1.6-.4,0,1));
    c.lerp(forest,sstep(18,90,h)*.85);c.lerp(rock,sstep(260,480,h)*.7);c.lerp(far,sstep(700,1600,Math.hypot(x,z))*.6);
    col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b}
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,map:rep(TEX.grass,260,260),roughness:1,metalness:0}));
  m.receiveShadow=true;m.castShadow=false;m.name='terreno';ground.add(m);RIG.terrain=m;
  // la vía sigue hasta perderse entre las colinas
  const road=new THREE.Mesh(new THREE.PlaneGeometry(8,520),std(0x7d725f,{map:rep(TEX.gravel,2,90),roughness:1,metalness:0}));road.rotation.x=-Math.PI/2;road.position.set(0,.01,470);road.receiveShadow=true;ground.add(road)}

/* ---------- vegetación ---------- */
function mergeSimple(list){ // [{geo, color}] geometrías no indexadas → una sola, con color por vértice
  let n=0;list.forEach(o=>{o.geo=o.geo.index?o.geo.toNonIndexed():o.geo;n+=o.geo.attributes.position.count});
  const P=new Float32Array(n*3),Nn=new Float32Array(n*3),C=new Float32Array(n*3),U=new Float32Array(n*2);let k=0;
  list.forEach(o=>{const g=o.geo,p=g.attributes.position,nr=g.attributes.normal,uv=g.attributes.uv,cnt=p.count;
    for(let i=0;i<cnt;i++){P.set([p.getX(i),p.getY(i),p.getZ(i)],(k+i)*3);Nn.set([nr.getX(i),nr.getY(i),nr.getZ(i)],(k+i)*3);
      const cc=typeof o.color==='function'?o.color(p.getX(i),p.getY(i),p.getZ(i)):o.color;C.set([cc.r,cc.g,cc.b],(k+i)*3);if(uv)U.set([uv.getX(i),uv.getY(i)],(k+i)*2)}k+=cnt});
  const out=new THREE.BufferGeometry();out.setAttribute('position',new THREE.BufferAttribute(P,3));out.setAttribute('normal',new THREE.BufferAttribute(Nn,3));out.setAttribute('color',new THREE.BufferAttribute(C,3));out.setAttribute('uv',new THREE.BufferAttribute(U,2));return out}
function blob(r,detail,amp,seed){const g=new THREE.IcosahedronGeometry(r,detail);const p=g.attributes.position;for(let i=0;i<p.count;i++){const v=V(p.getX(i),p.getY(i),p.getZ(i));const n=fbm(v.x*1.3+seed,v.y*1.3+v.z*1.1+seed*2,3);v.multiplyScalar(1+(n-.5)*amp);p.setXYZ(i,v.x,v.y,v.z)}g.computeVertexNormals();return g}
function treeGeo(kind){
  const parts=[],bark=lin(0x5b4632);
  const H=kind===1?7.5:5;const tr=new THREE.CylinderGeometry(.22,.42,H,7,3);tr.translate(0,H/2,0);parts.push({geo:tr,color:bark});
  // ramas
  for(let i=0;i<3;i++){const a=i*2.1+.3,b=new THREE.CylinderGeometry(.09,.16,2.4,5);b.translate(0,1.2,0);b.rotateZ(.85);b.rotateY(a);b.translate(0,H*.8,0);parts.push({geo:b,color:bark})}
  // copa: varias masas irregulares, más claras arriba y oscuras abajo
  const blobs=kind===1?[[0,H+1.8,0,3.4],[2.2,H+1,0.6,2.5],[-2,H+1.2,-.8,2.6],[.6,H+2.9,-1.4,2.2],[-.8,H+.6,1.9,2.3]]:[[0,H+1.4,0,2.6],[1.6,H+.8,.4,1.9],[-1.4,H+.9,-.6,2],[.3,H+2.2,-.9,1.7]];
  const lo=lin(0x1f3d17),hi=lin(0x4f7d31);
  blobs.forEach(([x,y,z,r],i)=>{const g=blob(r,2,.45,i*3.7+kind);g.scale(1,.78,1);g.translate(x,y,z);parts.push({geo:g,color:(px,py,pz)=>lo.clone().lerp(hi,clamp((py-H)/4.5,0,1))})});
  return mergeSimple(parts)}
function palmTex(){return canvasTex(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);g.strokeStyle='#4d6b26';g.lineWidth=4;g.beginPath();g.moveTo(w/2,h);g.lineTo(w/2,0);g.stroke();
  for(let i=0;i<34;i++){const y=h-i*(h/34);const L=(w*.48)*Math.sin(Math.PI*(i+3)/40);g.strokeStyle=`hsl(${85+R()*20},${45+R()*15}%,${24+R()*12}%)`;g.lineWidth=3;
    for(const s of[-1,1]){g.beginPath();g.moveTo(w/2,y);g.quadraticCurveTo(w/2+s*L*.5,y-6,w/2+s*L,y+10+R()*6);g.stroke()}}},null)}
function palmGeo(){const parts=[];const trunkC=lin(0x6d6253);
  const pts=[];for(let i=0;i<=8;i++){const t=i/8;pts.push(V(Math.sin(t*1.2)*.9,t*11,0))}
  parts.push({geo:new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),12,.26,7,false),color:trunkC});
  const top=pts[8];
  for(let i=0;i<11;i++){const a=i/11*Math.PI*2+R()*.3,L=4.2+R()*1.2,droop=.9+R()*.6;const g=new THREE.PlaneGeometry(1.7,L,1,6);g.translate(0,L/2,0);
    const p=g.attributes.position;for(let k=0;k<p.count;k++){const y=p.getY(k),t=y/L;p.setZ(k,-Math.pow(t,1.6)*droop*L*.55);p.setY(k,y*(1-t*.25))}
    g.rotateX(-Math.PI/2+.55);g.rotateY(a);g.translate(top.x,top.y,top.z);g.computeVertexNormals();parts.push({geo:g,color:new THREE.Color(1,1,1)})}
  return mergeSimple(parts)}
function okSpot(x,z){if(x>-62&&x<68&&z>-72&&z<72)return false;if(z>40&&Math.abs(x)<14)return false;if(Math.abs(x)<34&&Math.abs(z)<52)return false;return true}
function scatter(n,rMin,rMax,fn){let k=0,guard=0;while(k<n&&guard++<n*40){const a=R()*Math.PI*2,r=rMin+Math.pow(R(),.8)*(rMax-rMin),x=Math.cos(a)*r,z=Math.sin(a)*r;if(!okSpot(x,z))continue;fn(x,Math.max(0,terrainH(x,z)),z,k++)}}
function buildVegetation(){const q=QUALITY,mul=q==='bajo'?.45:q==='medio'?.75:1;
  const mtx=new THREE.Matrix4(),quat=new THREE.Quaternion(),sc=V(1,1,1),col=new THREE.Color();
  const leafMat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.92,metalness:0});
  [[0,Math.round(70*mul)],[1,Math.round(55*mul)]].forEach(([kind,n])=>{const im=new THREE.InstancedMesh(treeGeo(kind),leafMat,n);im.castShadow=true;im.receiveShadow=true;
    scatter(n,72,520,(x,y,z,i)=>{const s=.75+R()*.7;quat.setFromAxisAngle(Y,R()*6.28);mtx.compose(V(x,y-.2,z),quat,sc.set(s,s*(.85+R()*.35),s));im.setMatrixAt(i,mtx);col.setHSL(.24+R()*.06,.35+R()*.25,.42+R()*.2);im.setColorAt(i,col)});
    im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;im.name='arboles';ground.add(im)});
  // palmas de moriche y palma real (llanos y vegas del Huila)
  const pt=palmTex();const palmMat=new THREE.MeshStandardMaterial({vertexColors:true,map:pt,alphaTest:.45,side:THREE.DoubleSide,roughness:.85,metalness:0});
  const np=Math.round(46*mul),pm=new THREE.InstancedMesh(palmGeo(),palmMat,np);pm.castShadow=true;
  scatter(np,66,320,(x,y,z,i)=>{const s=.8+R()*.6;quat.setFromAxisAngle(Y,R()*6.28);mtx.compose(V(x,y-.2,z),quat,sc.set(s,s*(.9+R()*.4),s));pm.setMatrixAt(i,mtx)});pm.instanceMatrix.needsUpdate=true;pm.name='palmas';ground.add(pm);
  // arbustos
  const bush=mergeSimple([{geo:blob(1,1,.5,2),color:(x,y)=>lin(0x2a4a1e).lerp(lin(0x557f35),clamp(y+.4,0,1))}]);const nb=Math.round(140*mul);
  const bm=new THREE.InstancedMesh(bush,leafMat,nb);bm.castShadow=true;bm.receiveShadow=true;
  scatter(nb,58,260,(x,y,z,i)=>{const s=.5+R()*1.1;quat.setFromAxisAngle(Y,R()*6.28);mtx.compose(V(x,y+.25*s,z),quat,sc.set(s*(1+R()*.6),s*.7,s));bm.setMatrixAt(i,mtx);col.setHSL(.22+R()*.08,.3+R()*.3,.45+R()*.2);bm.setColorAt(i,col)});
  bm.instanceMatrix.needsUpdate=true;if(bm.instanceColor)bm.instanceColor.needsUpdate=true;ground.add(bm);
  buildGrass(Math.round((q==='bajo'?2500:q==='medio'?6000:11000)))}
function buildGrass(n){
  const tex=canvasTex(128,128,(g,w,h)=>{g.clearRect(0,0,w,h);for(let i=0;i<26;i++){const x=8+R()*(w-16),hh=h*(.45+R()*.55),bend=(R()-.5)*30;g.strokeStyle=`hsl(${62+R()*30},${40+R()*25}%,${30+R()*25}%)`;g.lineWidth=2+R()*2.5;g.beginPath();g.moveTo(x,h);g.quadraticCurveTo(x+bend*.3,h-hh*.5,x+bend,h-hh);g.stroke()}},null);
  const parts=[];for(let i=0;i<3;i++){const p=new THREE.PlaneGeometry(.9,.55);p.translate(0,.27,0);p.rotateY(i*Math.PI/3);parts.push({geo:p,color:new THREE.Color(1,1,1)})}
  const geo=mergeSimple(parts);
  const mat=new THREE.MeshStandardMaterial({map:tex,alphaTest:.5,side:THREE.DoubleSide,roughness:1,metalness:0,vertexColors:true});
  mat.onBeforeCompile=sh=>{sh.uniforms.uT={value:0};VIS.grassSh=sh;sh.vertexShader='uniform float uT;\n'+sh.vertexShader.replace('#include <begin_vertex>',
    '#include <begin_vertex>\n#ifdef USE_INSTANCING\nfloat ph=instanceMatrix[3].x*.35+instanceMatrix[3].z*.27;\n#else\nfloat ph=0.;\n#endif\ntransformed.x+=sin(uT*1.9+ph)*.07*position.y*2.;transformed.z+=cos(uT*1.3+ph)*.04*position.y*2.;')};
  const im=new THREE.InstancedMesh(geo,mat,n);im.receiveShadow=true;im.castShadow=false;im.name='pasto';
  const mtx=new THREE.Matrix4(),quat=new THREE.Quaternion(),sc=V(1,1,1),col=new THREE.Color();let k=0,guard=0;
  while(k<n&&guard++<n*30){const r=46+Math.pow(R(),1.3)*200,a=R()*Math.PI*2,x=Math.cos(a)*r,z=Math.sin(a)*r;
    if(x>-44&&x<48&&z>-54&&z<56)continue;if(z>40&&Math.abs(x)<6)continue;if(Math.abs(x)<34&&Math.abs(z)<56)continue;
    const y=Math.max(-.02,terrainH(x,z));const s=.7+R()*.9;quat.setFromAxisAngle(Y,R()*6.28);mtx.compose(V(x,y,z),quat,sc.set(s,s*(.7+R()*.8),s));im.setMatrixAt(k,mtx);
    col.setHSL(.15+R()*.1,.35+R()*.25,.55+R()*.25);im.setColorAt(k,col);k++}
  im.count=k;im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;ground.add(im);VIS.grass=im}

/* ---------- cielo con nubes ---------- */
function buildClouds(){
  const W=1024,Hh=512;const cv=document.createElement('canvas');cv.width=W;cv.height=Hh;const g=cv.getContext('2d');const img=g.createImageData(W,Hh);
  for(let y=0;y<Hh;y++){const lat=y/Hh;const fade=sstep(.02,.35,lat)*(1-sstep(.85,1,lat));for(let x=0;x<W;x++){
    const n=fbm(x/W*14,y/Hh*5,5),m=fbm(x/W*5+9,y/Hh*2+3,3);let a=clamp((n*1.2+m*.55-.74)*3.4,0,1)*fade;
    const i=(y*W+x)*4,sh=clamp(1-(n-.5)*.9,.72,1);img.data[i]=255*sh;img.data[i+1]=255*sh;img.data[i+2]=255*Math.min(1,sh+.03);img.data[i+3]=Math.min(255,a*290)}}
  g.putImageData(img,0,0);const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.wrapS=THREE.RepeatWrapping;
  const m=new THREE.Mesh(new THREE.SphereGeometry(1350,48,16,0,Math.PI*2,0,Math.PI*.5),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,fog:false,side:THREE.BackSide}));
  m.renderOrder=-1;m.scale.y=.32;scene.add(m);VIS.clouds=m}

/* ---------- huellas, charcos y manchas de lodo en la locación ---------- */
function decal(tex,w,h,x,z,ry,o){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial(Object.assign({map:tex,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,roughness:1,metalness:0},o||{})));
  m.rotation.x=-Math.PI/2;m.rotation.z=ry||0;m.position.set(x,.03,z);m.receiveShadow=true;m.castShadow=false;m.renderOrder=1;ground.add(m);return m}
function buildDecals(){
  const tracks=canvasTex(128,512,(g,w,h)=>{g.clearRect(0,0,w,h);for(const cx of[26,102]){for(let y=0;y<h;y+=6){g.fillStyle=`rgba(52,40,28,${.45+R()*.25})`;g.fillRect(cx-12+R()*2,y,24,3)}g.fillStyle='rgba(40,30,20,.25)';g.fillRect(cx-14,0,28,h)}},null);
  decal(tracks,2.6,60,0,82,0);decal(tracks,2.6,46,2,38,.05);decal(tracks,2.6,30,-10,8,1.2);decal(tracks,2.6,26,14,-20,-.6);
  const puddle=canvasTex(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);const gr=g.createRadialGradient(w/2,h/2,10,w/2,h/2,w/2);gr.addColorStop(0,'rgba(58,52,44,1)');gr.addColorStop(.7,'rgba(70,60,48,.95)');gr.addColorStop(1,'rgba(70,60,48,0)');g.fillStyle=gr;
    g.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2,r=w*(.36+fbm(Math.cos(a)*2+5,Math.sin(a)*2+5,3)*.22);g.lineTo(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r)}g.fill()},null);
  [[6,24,3.2],[-14,30,2.4],[20,-10,2.8],[-8,-30,2],[3,46,2.6]].forEach(([x,z,s])=>decal(puddle,s*1.6,s,x,z,R()*3,{color:lin(0x5a5248),roughness:.12,metalness:0,envMapIntensity:.55}));
  const mud=canvasTex(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);for(let i=0;i<70;i++){const r=6+R()*28,x=w/2+(R()-.5)*w*.8,y=h/2+(R()-.5)*h*.8;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(74,52,32,.55)');gr.addColorStop(1,'rgba(74,52,32,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r)}},null);
  decal(mud,14,14,0,0,0,{roughness:.5});decal(mud,10,8,14,-6,1,{roughness:.55});decal(mud,8,8,-5,-9,2)}

/* ---------- reflejos del cielo suavizados (PMREM) ---------- */
function upgradeEnv(){try{const pm=new THREE.PMREMGenerator(renderer);const src=scene.environment;src.encoding=THREE.sRGBEncoding;const rt=pm.fromEquirectangular(src);scene.environment=rt.texture;pm.dispose()}catch(e){console.warn('PMREM',e)}}

/* ---------- posproceso (solo calidad alta, sin VR) ---------- */
const POST={on:false,composer:null,sao:null};
const GradeShader={uniforms:{tDiffuse:{value:null},uVig:{value:.32},uSat:{value:1.08},uCon:{value:1.06}},
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`uniform sampler2D tDiffuse;uniform float uVig,uSat,uCon;varying vec2 vUv;
  vec3 toSRGB(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(vec3(.0031308),c));}
  void main(){vec4 t=texture2D(tDiffuse,vUv);vec3 c=toSRGB(clamp(t.rgb,0.,1.));float l=dot(c,vec3(.299,.587,.114));c=mix(vec3(l),c,uSat);c=(c-.5)*uCon+.5;
    c*=vec3(1.02,1.,.97);float d=distance(vUv,vec2(.5));c*=1.-uVig*smoothstep(.35,.85,d);gl_FragColor=vec4(clamp(c,0.,1.),t.a);}`};
function setupPost(){POST.on=false;POST.composer=null;if(QUALITY!=='alto'||!THREE.EffectComposer||!THREE.ShaderPass)return;
  try{const cv=renderer.domElement,w=Math.max(1,cv.clientWidth),h=Math.max(1,cv.clientHeight);const C=new THREE.EffectComposer(renderer);
    if(THREE.SSAOPass&&THREE.SimplexNoise&&THREE.SSAOShader){const s=new THREE.SSAOPass(scene,camera,w,h);s.kernelRadius=.55;s.minDistance=.000012;s.maxDistance=.0007;
      s.normalMaterial.skinning=true;
      // el pasto, las nubes y el cielo no aportan a la oclusión
      const ov=s.overrideVisibility.bind(s),rv=s.restoreVisibility.bind(s);s.overrideVisibility=()=>{ov();VIS.hid=[VIS.grass,VIS.clouds,sky].filter(o=>o&&o.visible);VIS.hid.forEach(o=>o.visible=false)};s.restoreVisibility=()=>{(VIS.hid||[]).forEach(o=>o.visible=true);rv()};
      C.addPass(s);POST.sao=s}else C.addPass(new THREE.RenderPass(scene,camera));
    if(THREE.UnrealBloomPass)C.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(256,256),.16,.4,.95));
    if(THREE.FXAAShader){const f=new THREE.ShaderPass(THREE.FXAAShader);POST.fxaa=f;C.addPass(f)}
    C.addPass(new THREE.ShaderPass(GradeShader));POST.composer=C;POST.on=true;postResize()}catch(e){console.warn('Posproceso no disponible',e);POST.on=false}}
function postResize(){if(!POST.composer)return;const cv=renderer.domElement;const pr=renderer.getPixelRatio(),w=cv.clientWidth,h=cv.clientHeight;POST.composer.setPixelRatio(pr);POST.composer.setSize(w,h);if(POST.fxaa)POST.fxaa.material.uniforms.resolution.value.set(1/(w*pr),1/(h*pr))}
function renderMain(){if(POST.on&&POST.composer&&!renderer.xr.isPresenting&&!MODE.ar)POST.composer.render();else renderer.render(scene,camera)}

/* ---------- tick ---------- */
function visualTick(dt){VIS.t+=dt;if(VIS.grassSh)VIS.grassSh.uniforms.uT.value=VIS.t;if(VIS.clouds)VIS.clouds.rotation.y+=dt*.0016}
function visualUpgrade(){buildTerrain();buildVegetation();buildClouds();buildDecals();upgradeEnv()}
