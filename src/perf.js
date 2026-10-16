/* ===================================================================== RENDIMIENTO: unir piezas estáticas (menos llamadas de dibujo) */
const PERF={merged:0,before:0,after:0};
function perfRefs(){
  const S=new Set(),seen=new Set();
  const walk=(v,d)=>{if(!v||typeof v!=='object'||seen.has(v)||d>5)return;seen.add(v);
    if(v.isObject3D){S.add(v);return}if(v.isMaterial||v.isTexture||v.isBufferGeometry||v.nodeType)return;
    if(Array.isArray(v)){v.forEach(x=>walk(x,d+1));return}if(v instanceof Map){v.forEach((x,k)=>{walk(k,d+1);walk(x,d+1)});return}if(v instanceof Set){v.forEach(x=>walk(x,d+1));return}
    const pr=Object.getPrototypeOf(v);if(pr===Object.prototype||pr===null)for(const k in v)walk(v[k],d+1)};
  [RIG,DET,CS,CUT,CTLS,FPH,INTER,TEMP,typeof WELL!=='undefined'?WELL:null,typeof ROAM!=='undefined'?ROAM:null].forEach(o=>walk(o,0));
  return S}
function geoSig(g){const a=Object.keys(g.attributes).sort();return a.map(k=>k+g.attributes[k].itemSize).join(',')+(g.index?'|i':'|n')+(g.morphAttributes&&Object.keys(g.morphAttributes).length?'|m':'')}
function mergeGeos(list){ // list: [{geo, m:Matrix4}]
  const keys=Object.keys(list[0].geo.attributes);let nv=0,ni=0;const idx=!!list[0].geo.index;
  list.forEach(o=>{nv+=o.geo.attributes.position.count;if(idx)ni+=o.geo.index.count});
  const out=new THREE.BufferGeometry();const arrs={};keys.forEach(k=>arrs[k]=new Float32Array(nv*list[0].geo.attributes[k].itemSize));
  const ind=idx?(nv>65535?new Uint32Array(ni):new Uint16Array(ni)):null;
  let vo=0,io=0;const nm=new THREE.Matrix3(),v=new THREE.Vector3();
  for(const o of list){const g=o.geo,n=g.attributes.position.count;nm.getNormalMatrix(o.m);
    for(const k of keys){const at=g.attributes[k],is=at.itemSize,dst=arrs[k];
      for(let i=0;i<n;i++){
        if(k==='position'){v.fromBufferAttribute(at,i).applyMatrix4(o.m);dst[(vo+i)*3]=v.x;dst[(vo+i)*3+1]=v.y;dst[(vo+i)*3+2]=v.z}
        else if(k==='normal'){v.fromBufferAttribute(at,i).applyMatrix3(nm).normalize();dst[(vo+i)*3]=v.x;dst[(vo+i)*3+1]=v.y;dst[(vo+i)*3+2]=v.z}
        else if(k==='tangent'){v.set(at.getX(i),at.getY(i),at.getZ(i)).transformDirection(o.m);dst[(vo+i)*4]=v.x;dst[(vo+i)*4+1]=v.y;dst[(vo+i)*4+2]=v.z;dst[(vo+i)*4+3]=at.getW(i)}
        else for(let c=0;c<is;c++)dst[(vo+i)*is+c]=c===0?at.getX(i):c===1?at.getY(i):c===2?at.getZ(i):at.getW(i)}}
    if(idx){const ia=g.index.array;for(let i=0;i<ia.length;i++)ind[io+i]=ia[i]+vo;io+=ia.length}
    vo+=n}
  keys.forEach(k=>out.setAttribute(k,new THREE.BufferAttribute(arrs[k],list[0].geo.attributes[k].itemSize)));if(ind)out.setIndex(new THREE.BufferAttribute(ind,1));
  out.computeBoundingSphere();out.computeBoundingBox();return out}
function batchStatic(root,dry){
  const refs=perfRefs(),skip=new Set();
  // personas animadas, instructor y piezas que se mueven: no se tocan
  (RIG.people||[]).concat(RIG.ins?[RIG.ins]:[]).forEach(P=>P&&P.g&&P.g.traverse(o=>skip.add(o)));
  root.traverse(o=>{if(o.isSkinnedMesh||o.isBone)skip.add(o)});
  let before=0,merged=0;const groups=[];
  root.traverse(g=>{if(!g.children.length||skip.has(g))return;
    const bins=new Map();
    for(const m of g.children){
      if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||skip.has(m)||refs.has(m)||m.children.length||Array.isArray(m.material)||!m.geometry||!m.geometry.isBufferGeometry||!m.visible)continue;
      if(Object.keys(m.userData).length||m.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender)continue;
      if(m.material.transparent&&m.material.opacity<.99)continue;
      m.updateMatrix();if(m.matrix.determinant()<0)continue;
      if(!m.geometry.attributes.position||m.geometry.attributes.position.count>20000)continue;
      const k=m.material.uuid+'|'+m.castShadow+m.receiveShadow+'|'+m.renderOrder+'|'+m.frustumCulled+'|'+geoSig(m.geometry);
      if(!bins.has(k))bins.set(k,[]);bins.get(k).push(m)}
    bins.forEach(list=>{if(list.length>1)groups.push([g,list])})});
  if(dry)return groups.flatMap(x=>x[1]);
  for(const [g,list] of groups){
    list.forEach(m=>m.updateMatrix());
    const geo=mergeGeos(list.map(m=>({geo:m.geometry,m:m.matrix})));
    const mm=new THREE.Mesh(geo,list[0].material);mm.castShadow=list[0].castShadow;mm.receiveShadow=list[0].receiveShadow;mm.renderOrder=list[0].renderOrder;mm.frustumCulled=list[0].frustumCulled;mm.name='lote';
    const at=g.children.indexOf(list[0]);list.forEach(m=>g.remove(m));g.add(mm);
    // mantener el orden aproximado de los hijos
    g.children.splice(g.children.indexOf(mm),1);g.children.splice(Math.min(at,g.children.length),0,mm);
    before+=list.length;merged++}
  PERF.merged+=merged;PERF.before+=before;return {before,merged}}
// partes que no cambian nunca: no recalcular su matriz cada cuadro
function freezeStatic(root){let n=0;root.traverse(o=>{if(o.name==='lote'&&o.parent&&o.matrixAutoUpdate){o.updateMatrix();o.matrixAutoUpdate=false;n++}});return n}
