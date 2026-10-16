/* ===================================================================== PRÁCTICAS POR CARGO */
const pts=st=>Math.max(0,100-st.errs*8-st.hints*3);
const meterHTML=st=>`<div class="meter"><span>Errores: <b class="mono">${st.errs}</b> · Pistas: <b class="mono">${st.hints}</b></span><span>Puntaje: <b class="mono">${pts(st)}</b></span></div>`;
/* Secuencia de pasos sobre objetos 3D: cada paso tiene k (id), t (nombre), obj (objeto tocable), h (pista) y run (animación) */
async function doSeq(steps,st,o){
  for(let i=0;i<steps.length;i++){const s=steps[i];
    const draw=(fb='')=>panel(head(o.eb,o.title,(o.extra?o.extra():'')+meterHTML(st)+stepsHTML(steps.map(x=>x.t),i)+fb+`<button class="btn sm ghost" type="button" data-in="HINT">Pista</button>`));
    draw();setButtons([{t:'Pista',v:'HINT'}]);task(o.guided?s.t:'Toca en la escena lo que sigue');
    if(o.guided){hot(s.obj);if(CAM.mode==='fp')aim(s.obj);await sayW(s.h)}
    for(;;){const v=await w(waitInput());
      if(v==='HINT'){if(!o.guided)st.hints++;hot(s.obj);if(CAM.mode==='fp')aim(s.obj);draw();await sayW(s.h);continue}
      if(v===s.k){hot(s.obj,false);break}
      if(steps.some(x=>x.k===v)||(o.others||[]).includes(v)){if(!o.guided)st.errs++;draw(`<div class="fb bad">${s.h}</div>`);await sayW('Ese paso no va todavía. '+s.h);continue}}
    task('');if(s.run)await s.run()}}
function grp(pos,parent){const g=temp(new THREE.Group());g.position.copy(pos);(parent||world).add(g);return g}
function bucket(pos,col,lbl){const g=grp(pos);cyl(g,.16,.13,.34,std(col,{roughness:.6}),0,.17,0,18);cyl(g,.15,.15,.02,MAT.mud,0,.3,0,18);box(g,.04,.32,.08,MAT.wood,.06,.42,0).rotation.z=-.3;proxy(g,.5,V(0,.25,0));if(lbl){const l=label3D(lbl,.2);l.position.y=.62;g.add(l)}return g}
async function decide(eb,title,body,opts,st,good){
  const v=await ask(head(eb,title,body),opts);const o=opts.find(x=>x.v===v);
  if(v===good){say(o.f||'Correcto.');await ask(head(eb,title,body+`<div class="fb ok">${o.f||'Correcto.'}</div>`),[{t:'Continuar',v:'n'}]);return true}
  st.errs++;say(o.f);await ask(head(eb,title,body+`<div class="fb bad">${o.f}</div>`),[{t:'Continuar',v:'n'}]);return false}

/* ===================================================================== OBRERO DE PATIO */
function workJoint(){
  const g=grp(V(8.8,1.02,19));
  for(const z of[-3.2,3.2]){box(g,.9,.06,.14,MAT.wood,0,-.1,z);for(const s of[-1,1]){rod(g,V(s*.38,-1.02,z),V(s*.12,-.12,z),.03,MAT.steel)}}
  cyl(g,.064,.064,8.6,MAT.pipe,0,0,0,14,'z');cyl(g,.085,.085,.45,MAT.tj,0,0,-4.4,16,'z');cyl(g,.085,.085,.3,MAT.tj,0,0,4.42,16,'z');
  const pin=new THREE.Group();pin.position.z=4.57;g.add(pin);
  const tm=std(0x6b665a,{roughness:.85,metalness:.35});const thr=cyl(pin,.062,.045,.13,tm,0,0,.065,16,'z');
  for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.058-.003*i,.004,4,16),tm);t.position.z=.015+i*.024;pin.add(t)}
  proxy(pin,.35,V(0,0,.06));
  const cap=new THREE.Group();cap.position.z=4.7;g.add(cap);cyl(cap,.08,.08,.18,std(0xc0281c),0,0,0,16,'z');proxy(cap,.35);
  cyl(g,.1,.1,.08,std(0xc0281c),0,0,-4.67,16,'z');
  return{g,pin,tm,cap}}
async function modPatio(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Tubería en los burros y grúa','El instructor te explica qué hace el obrero de patio con la tubería y cómo se le hacen señales a la grúa. Luego lo haces tú en primera persona.');
  const st={errs:0,hints:0};const tally=[];
  const tbl=()=>`<table class="tbl"><tr><th>Tubo</th><th>Estado</th><th>Longitud</th></tr>${tally.map((r,i)=>`<tr><td>${i+1}</td><td style="font-family:var(--body)">${r[0]}</td><td>${r[1]}</td></tr>`).join('')||'<tr><td colspan="3" style="text-align:left;font-family:var(--body)" class="muted">Sin registros todavía</td></tr>'}</table>`;
  insAt(V(11.2,0,22.4));station(V(10.3,0,21.4),2.4);$('#cams').hidden=true;
  if(how==='demo'){
    lookFrom([14,5,30],[6,1,19]);RIG.ins.point=V(5,1,19);
    panel(head('Explicación','El obrero de patio y la tubería','<p>Antes de que un tubo suba a la mesa, el obrero de patio lo prepara en los burros: quita protectores, limpia e inspecciona las roscas, lo mide y lo registra en la hoja de tubería (el <i>tally</i>).</p>'));
    await sayW('Bienvenido a los burros de tubería. Antes de que un tubo suba al piso, el obrero de patio lo prepara aquí.');
    await sayW('Primero quita el protector de la rosca. Luego limpia la rosca con cepillo y solvente, y la inspecciona: una rosca golpeada o corroída no se puede usar.');
    await sayW('Después mide el tubo con el flexómetro, desde la cara de la caja hasta el hombro del pin, sin contar el pin, y anota la longitud en la hoja de tubería. Con esa hoja el perforador sabe a qué profundidad está la broca.');
    await sayW('Un error de medida en un tubo se suma en todo el pozo. Por eso se mide con cuidado y se registra exacto.');RIG.ins.point=null}
  await w(fade(()=>{fpMode(V(10.3,1.7,21.4),2.4,-.45)}));
  const J=[{dmg:false,len:'9,18'},{dmg:true},{dmg:false,len:'9,05'}];
  for(let j=0;j<J.length;j++){
    const W=workJoint();const bk=bucket(V(9.9,0,23.4),0x2f5f8a,'Cepillo y solvente');
    const tape=grp(V(9.35,.94,15.8));box(tape,.09,.09,.05,MAT.yellow,0,0,0);proxy(tape,.3);const tl=label3D('Flexómetro',.4);tl.position.y=.3;tape.add(tl);
    act(W.cap,'protector','Protector de la rosca');act(bk,'limpiar','Cepillo y solvente');act(W.pin,'inspeccionar','Rosca del pin');act(tape,'medir','Flexómetro');
    const guided=j===0&&how==='demo';
    const eb=`Tubo ${j+1} de ${J.length}`,title='Preparar la tubería';const extra=()=>tbl();
    const steps=[
      {k:'protector',t:'Quitar el protector de la rosca',obj:W.cap,h:'Quita el protector rojo de la rosca del pin.',run:async()=>{unact(W.cap);await w(tweenP(.7,p=>{W.cap.position.set(p*.6,p*.4,4.7+p*.4)}));W.cap.visible=false}},
      {k:'limpiar',t:'Limpiar la rosca',obj:bk,h:'Limpia la rosca con el cepillo y el solvente del balde azul.',run:async()=>{unact(bk);if(!J[j].dmg)W.tm.color.copy(lin(0xb9bcbf));W.tm.metalness=.8;W.tm.roughness=.35;
        if(J[j].dmg){W.tm.color.copy(lin(0x7a5638));const d=box(W.pin,.05,.03,.05,MAT.dark,.045,.03,.06);d.rotation.z=.6}await sleep(500)}},
      {k:'inspeccionar',t:'Inspeccionar la rosca',obj:W.pin,h:'Inspecciona la rosca: tócala para revisarla de cerca.',run:async()=>{unact(W.pin);aim(W.pin)}},
    ];
    await doSeq(steps,st,{eb,title,guided,extra,others:['medir']});
    const ok=await decide(eb,'¿Cómo está la rosca?',J[j].dmg?'<p>La rosca tiene un golpe y está corroída.</p>':'<p>La rosca está limpia, sin golpes ni corrosión.</p>',
      [{t:'En buen estado: continuar con la medición',v:'bien',f:J[j].dmg?'No. Una rosca golpeada no sella y puede soltarse en el pozo.':'Correcto. Rosca en buen estado.'},
       {t:'Dañada: marcarla con pintura roja «NO USAR» y apartar el tubo',v:'mala',f:J[j].dmg?'Correcto. Se marca, se aparta y se reporta para que no llegue a la mesa.':'Esa rosca está en buen estado; apartarla sin razón retrasa la operación.'},
       {t:'Limarla un poco para que enrosque',v:'limar',f:'Nunca. Las roscas no se reparan en el patio; un tubo dañado se aparta.'}],st,J[j].dmg?'mala':'bien');
    if(J[j].dmg){const r=cyl(W.g,.07,.07,.25,std(0xd0201a),0,0,3.6,16,'z');tally.push(['Rechazado (rosca dañada)','—']);await sayW('Marcado y apartado. En la hoja queda registrado como rechazado.')}
    else{
      await doSeq([{k:'medir',t:'Medir el tubo',obj:tape,h:'Toma el flexómetro y mide el tubo.',run:async()=>{unact(tape);const a=V(8.8,1.14,14.6),b=V(8.8,1.14,23.4);const line=temp(rod(world,a,a,.008,MAT.yellow));
        await w(tweenP(1.4,p=>orient(line,a,a.clone().lerp(b,p),.008)));const l=temp(label3D(`${J[j].len} m`,.6));l.position.set(8.8,1.5,19);world.add(l);fpLook(2.0,-.4)}}],st,{eb,title,guided,extra,others:['protector','limpiar','inspeccionar']});
      const v=await decide(eb,'¿Qué anotas en la hoja de tubería?',`<p>El flexómetro marca <b class="mono">${J[j].len} m</b> desde la cara de la caja hasta el hombro del pin.</p>`,
        shuffle([{t:`${J[j].len} m`,v:'ok',f:'Correcto. Se anota la longitud útil, sin el pin.'},{t:`${J[j].len.split(',')[0]},${J[j].len.split(',')[1].split('').reverse().join('')} m`,v:'x1',f:'Cuidado al copiar: los dígitos quedaron invertidos.'},{t:`${(parseFloat(J[j].len.replace(',','.'))+.16).toFixed(2).replace('.',',')} m (contando el pin)`,v:'x2',f:'El pin no se cuenta: queda dentro de la caja del tubo de abajo.'}]),st,'ok');
      tally.push(['Bueno',J[j].len+' m'])}
    clearActs();await w(fade(()=>{clearTemp();fpMode(V(10.3,1.7,21.4),2.4,-.45)}))}
  // PARTE 2: SEÑALES A LA GRÚA
  $('#cams').hidden=false;RIG.crane.visible=true;
  const bundle=grp(V(14,.35,27));for(let i=0;i<5;i++)cyl(bundle,.09,.09,9,MAT.pipe,(i-2)*.2,0,0,10,'z');
  const B=V(14,.35,27);const setB=p=>{bundle.position.copy(p);const hk=p.clone().add(V(0,2.2,0));craneHook(hk);RIG.slings.forEach((s,i)=>{s.visible=i<2;if(i<2)orient(s,hk,p.clone().add(V(0,.1,i?3.5:-3.5)),.02)})};setB(B);
  await w(fade(()=>{lookFrom([22,5,36],[13,2,25]);insAt(V(19,0,31))}));
  const SIG=[{v:'izar',t:'IZAR — antebrazo vertical, índice hacia arriba, mano girando en círculos pequeños'},{v:'bajar',t:'BAJAR — brazo hacia abajo, índice hacia abajo, mano girando en círculos pequeños'},{v:'parar',t:'PARAR — brazo extendido, palma hacia abajo, moviéndolo de lado a lado'},{v:'emergencia',t:'PARADA DE EMERGENCIA — ambos brazos extendidos, palmas abajo, moviéndolos de lado a lado'}];
  const eb='Señales a la grúa',sigs=shuffle(SIG);
  await sayW('Ahora eres el señalero. El operador de la grúa no siempre ve la carga: depende de tus señales.');
  await decide(eb,'¿Quién da las señales al operador de la grúa?','',[{t:'Una sola persona designada como señalero, siempre visible para el operador',v:'ok',f:'Correcto. Un solo señalero evita órdenes contradictorias.'},{t:'Cualquiera que vea la carga',v:'x',f:'Si varias personas dan señales, el operador recibe órdenes contradictorias. Solo el señalero designado, salvo la parada de emergencia, que puede darla cualquiera.'},{t:'Nadie: el operador decide solo',v:'y',f:'El operador necesita al señalero, sobre todo cuando no ve la carga.'}],st,'ok');
  const S=[
    {txt:'La carga está enganchada, las eslingas revisadas y todos fuera del área. Hay que subirla.',good:'izar',after:async()=>{await w(tweenP(2.2,p=>setB(B.clone().add(V(0,p*2.4,0)))))}},
    {txt:'La carga va a 2,7 m de altura y un compañero entra caminando por debajo.',good:'emergencia',pre:async()=>{const pp=makePerson({});const g=grp(V(17,0,27.5));g.add(pp.g);pp.anim='walk';pp.g.rotation.y=-Math.PI/2;await w(tweenP(1.8,p=>g.position.x=17-p*3))},after:async()=>{await sayW('Parada total. El compañero sale del área y se reanuda solo cuando todos están fuera.');TEMP.filter(o=>o.children[0]&&o.children[0].userData.person).forEach(o=>o.visible=false)}},
    {txt:'Ya no hay nadie bajo la carga. La grúa la llevó sobre el burro y está a 40 cm de apoyarse.',good:'bajar',pre:async()=>{const a=bundle.position.clone(),b=V(5,1.45,19);await w(tweenP(3,p=>setB(a.clone().lerp(b,p))))},after:async()=>{const a=bundle.position.clone();await w(tweenP(1.6,p=>setB(a.clone().add(V(0,-p*.4,0)))))}},
    {txt:'La carga quedó apoyada en el burro.',good:'parar'},
  ];
  for(const s of S){if(s.pre)await s.pre();
    const ok=await decide(eb,'¿Qué señal das?',`<p>${s.txt}</p>`,sigs.map(x=>({t:x.t,v:x.v,f:x.v===s.good?'Correcto.':'No es esa señal. '+SIG.find(y=>y.v===s.good).t+'.'})),st,s.good);
    if(s.after)await s.after()}
  RIG.slings.forEach(s=>s.visible=false);
  await sayW('Muy bien. Tubería preparada y registrada, y la carga en su sitio sin exponer a nadie.');
  await result(pts(st),`Hoja de tubería: ${tally.map(r=>r[1]).join(' · ')}. ${st.errs} error${st.errs===1?'':'es'}.`)}

/* ===================================================================== CUÑERO */
function hangStand(gap){setBlock(gap+LEN-.25+EOFF);placeStand()}
async function modCunero(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Conexión en la mesa','El instructor te explica cómo se mete tubería al pozo y qué hace cada herramienta del piso. Luego haces tú las conexiones en primera persona.');
  const st={errs:0,hints:0};
  tripSetup();RIG.string.visible=true;RIG.slips.visible=true;RIG.slips.position.y=F+.12;hangStand(1.4);
  insAt(V(2.4,F,-2.2));station(V(.15,F,-1.75),Math.PI);
  if(how==='demo'){
    lookFrom([6,F+3,7],[0,F+1.2,0]);RIG.ins.point=V(0,F+1,0);
    panel(head('Explicación','Meter tubería: la conexión','<p>Al meter tubería, cada parada se enrosca sobre la sarta que está sentada en cuñas. El orden es: grasa, emboque, llave de giro, llaves de fuerza con el torque correcto, retirar llaves y sacar cuñas.</p>'));
    await sayW('Vamos a meter tubería al pozo. La sarta queda sostenida por las cuñas en la mesa rotaria, y el encuellador nos entrega la siguiente parada colgada del elevador.');
    await sayW('Primero se aplica grasa a la rosca de la caja. Luego el perforador baja la parada y tú la guías hasta que el pin entre en la caja: eso es el emboque.');
    await sayW('La llave de giro enrosca rápido la conexión. Después van las llaves de fuerza: la de aguante abajo, sujetando la caja, y la de fuerza arriba, en el tubo que se está enroscando.');
    await sayW('El perforador tensiona hasta el torque especificado. Ni más, ni menos: con poco torque la conexión se suelta, y con mucho se daña la rosca. Mientras se tensiona, nadie se para en la línea de la llave.');RIG.ins.point=null}
  $('#cams').hidden=true;await w(fade(()=>{fpMode(V(.15,F+1.65,-1.75),Math.PI,-.35)}));
  const dope=bucket(V(.75,F,-1.25),0x7d858b,'Grasa para roscas');
  const stab=grp(V(0,F+1.6,0));proxy(stab,.45);
  const sp=grp(V(-.95,F+1.55,-.95));box(sp,.42,.22,.32,MAT.blue,0,0,0);for(const z of[-.08,.08])cyl(sp,.07,.07,.24,MAT.steelDk,.22,0,z,12);rod(sp,V(0,.1,0),V(0,6,-.6),.012,MAT.wire);proxy(sp,.5);
  const [lead,back]=RIG.tongs;proxy(lead.t,.7);proxy(back.t,.7);proxy(RIG.slips,.7,V(0,.15,0));
  const N=how==='demo'?3:2;
  for(let c=0;c<N;c++){
    const guided=how==='demo'&&c===0;
    act(dope,'grasa','Grasa para roscas');act(stab,'emboque','Base de la parada');act(sp,'giro','Llave de giro');act(back.t,'aguante','Llave de aguante (abajo)');act(lead.t,'fuerza','Llave de fuerza (arriba)');act(RIG.slips,'cunas','Cuñas');
    const eb=guided?'Conexión guiada':`Conexión ${c+(how==='demo'?0:1)} de ${N-(how==='demo'?1:0)}`,title='Meter tubería: conexión';
    const shine=temp(cyl(world,.088,.088,.06,std(0xd8d0a0,{metalness:.6,roughness:.3}),0,F+.9,0,16));shine.visible=false;
    await doSeq([
      {k:'grasa',t:'Aplicar grasa a la rosca de la caja',obj:dope,h:'Aplica grasa a la rosca de la caja, en la sarta sentada en cuñas: toca el balde de grasa.',run:async()=>{shine.visible=true;await sleep(400)}},
      {k:'emboque',t:'Guiar la parada para el emboque',obj:stab,h:'Guía la parada mientras el perforador la baja: toca la base de la parada.',run:async()=>{const y0=RIG.blockY;await w(tweenP(1.4,p=>{setBlock(y0-p*.45);placeStand()}))}},
      {k:'giro',t:'Enroscar con la llave de giro',obj:sp,h:'Enrosca rápido con la llave de giro, la que cuelga a tu izquierda.',run:async()=>{const a=sp.position.clone(),b=V(.3,F+1.25,0);await w(tweenP(1,p=>sp.position.lerpVectors(a,b,p)));
        await w(tweenP(1.4,p=>{placeStand();RIG.stand.rotateY(p*12)}));await w(tweenP(.9,p=>sp.position.lerpVectors(b,a,p)))}},
      {k:'aguante',t:'Colocar la llave de aguante (abajo)',obj:back.t,h:'Coloca la llave de aguante abajo, sobre la caja de la sarta.',run:async()=>{const a=back.t.position.clone();back.t.rotation.y=0;await w(tweenP(1,p=>back.t.position.lerpVectors(a,V(-.72,F+.78,0),p)))}},
      {k:'fuerza',t:'Colocar la llave de fuerza (arriba)',obj:lead.t,h:'Coloca la llave de fuerza arriba, sobre el tubo que se está enroscando.',run:async()=>{const a=lead.t.position.clone();await w(tweenP(1,p=>lead.t.position.lerpVectors(a,V(.72,F+1.32,0),p)))}},
    ],st,{eb,title,guided,others:['cunas']});
    // seguridad antes de tensionar
    await decide(eb,'Antes de tensionar','<p>El perforador va a tensionar con la línea de la llave de fuerza.</p>',shuffle([
      {t:'Me retiro fuera del radio de giro de la llave y de la línea del cable',v:'ok',f:'Correcto. Si la llave se suelta o el cable se revienta, la línea de fuego es mortal.'},
      {t:'Sostengo la llave con la mano para que no se mueva',v:'x',f:'Nunca. La llave gira con miles de libras de fuerza: tu mano no la detiene.'},
      {t:'Me paro detrás del cable de tensión para vigilarlo',v:'y',f:'Detrás del cable estás justo en la línea de fuego si se revienta.'}]),st,'ok');
    // tensionar
    gauge(true,'Torque','klb·pie',45,28,32);let tq=0,held=false,done=false;
    const dr=fb=>panel(head(eb,'Tensionar la conexión',meterHTML(st)+`<p>Especificación: <b class="mono">28 a 32 klb·pie</b>. Mantén presionado para tensionar y suelta dentro de la franja verde.</p>${fb||''}<button class="btn hold" type="button">Mantener: tensionar</button>`));
    dr();setButtons([{t:'Mantener: TENSIONAR',v:'HOLD'}]);task('Mantén presionado TENSIONAR');
    if(guided)await sayW('Indícale al perforador que tensione. Mantén presionado y suelta cuando el torque esté entre veintiocho y treinta y dos.');
    await w(new Promise(res=>{MODE.tick=dt=>{
      if(HOLD.on){held=true;tq=Math.min(45,tq+dt*5.5);lead.t.rotation.y=-tq/45*.25}
      else if(held){held=false;
        if(tq>32){st.errs++;dr('<div class="fb bad">Sobretorque: la rosca se puede dañar. Se quiebra la conexión y se vuelve a tensionar.</div>');say('Te pasaste. Con sobretorque la rosca se daña. Se afloja y se repite.');tq=0;lead.t.rotation.y=0}
        else if(tq>=28){MODE.tick=null;res()}
        else{dr('<div class="fb info">Falta torque. Sigue tensionando.</div>')}}
      gaugeVal(tq,tq.toFixed(1).replace('.',','))}}));
    gauge(false);setButtons([]);task('');say('Torque correcto.');
    act(lead.t,'retirar','Llaves de fuerza');act(back.t,'retirar','Llaves de fuerza');
    await doSeq([
      {k:'retirar',t:'Retirar las llaves',obj:lead.t,h:'Retira las llaves de fuerza: toca la llave de arriba.',run:async()=>{const a=lead.t.position.clone(),b=back.t.position.clone();await w(tweenP(1,p=>{lead.t.position.lerpVectors(a,lead.home,p);back.t.position.lerpVectors(b,back.home,p);lead.t.rotation.y=0}));back.t.rotation.y=Math.PI}},
      {k:'cunas',t:'Sacar las cuñas y bajar la sarta',obj:RIG.slips,h:'Saca las cuñas para que el perforador baje la sarta.',run:async()=>{await w(tweenP(.8,p=>RIG.slips.position.y=F+.12+p*.5));RIG.slips.visible=false;shine.visible=false;
        const y0=RIG.blockY;await w(tweenP(2.4,p=>{setBlock(y0-p*6);placeStand()}))}},
    ],st,{eb,title,guided,others:['grasa','emboque','giro','aguante','fuerza']});
    clearActs();
    if(c<N-1){await sayW(guided?'Así es una conexión completa. Ahora hazlo tú solo.':'Bien. Siguiente parada.');
      await w(fade(()=>{RIG.slips.visible=true;RIG.slips.position.y=F+.12;hangStand(1.4);sp.position.set(-.95,F+1.55,-.95)}))}}
  await sayW('Excelente trabajo en la mesa. Conexiones con grasa, torque correcto y siempre fuera de la línea de fuego.');
  await result(pts(st),`${st.errs} error${st.errs===1?'':'es'} y ${st.hints} pista${st.hints===1?'':'s'}.`)}

/* ===================================================================== ENCUELLADOR: LODO */
async function modLodo(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Pruebas de lodo y ronda','El instructor te explica por qué el encuellador controla el lodo y cómo se usan la balanza de lodo y el embudo Marsh. Luego haces las pruebas y la ronda.');
  const st={errs:0,hints:0};const TY=2.63;
  insAt(V(14.6,TY,2.6));station(V(13.9,TY,1.0),-Math.PI/2);
  // mesa de pruebas
  const tb=grp(V(15.3,TY,1.1));box(tb,.75,.05,1.5,MAT.steel,0,.9,0);for(const x of[-.3,.3])for(const z of[-.65,.65])box(tb,.04,.9,.04,MAT.steelDk,x,.45,z);
  const top=.925;
  const jar=new THREE.Group();jar.position.set(-.1,top,-.55);tb.add(jar);temp(jar);cyl(jar,.06,.05,.15,MAT.galv,0,.075,0,16);const jarMud=cyl(jar,.055,.055,.01,MAT.mud,0,.14,0,16);jarMud.visible=false;proxy(jar,.25,V(0,.08,0));
  const bal=new THREE.Group();bal.position.set(0,top,0);tb.add(bal);temp(bal);box(bal,.12,.03,.18,MAT.steelDk,0,.015,0);box(bal,.03,.1,.03,MAT.steelDk,0,.08,0);
  const beam=new THREE.Group();beam.position.set(0,.14,0);bal.add(beam);box(beam,.02,.02,.5,MAT.galv,0,0,.08);
  const cup=new THREE.Group();cup.position.set(0,0,-.17);beam.add(cup);cyl(cup,.045,.045,.07,MAT.galv,0,-.01,0,16);const lid=cyl(cup,.048,.048,.012,MAT.galv,0,.03,0,16);lid.visible=false;proxy(cup,.2);
  const rider=box(beam,.035,.035,.03,MAT.red,0,.015,.05);const bub=cyl(beam,.012,.012,.06,std(0x8fd6ff,{transparent:true,opacity:.7}),0,.02,-.06,8,'z');
  const fun=new THREE.Group();fun.position.set(0,top,.5);tb.add(fun);temp(fun);rod(fun,V(.12,0,0),V(.12,.62,0),.012,MAT.steelDk);rod(fun,V(.12,.5,0),V(0,.5,0),.01,MAT.steelDk);
  const cone=new THREE.Mesh(new THREE.CylinderGeometry(.08,.008,.3,20,1,true),std(0xd8d4c8,{side:THREE.DoubleSide,roughness:.6}));cone.position.y=.42;fun.add(cone);const coneMud=cyl(fun,.07,.07,.01,MAT.mud,0,.54,0,16);coneMud.visible=false;proxy(fun,.3,V(0,.42,0));
  const mcup=new THREE.Group();mcup.position.set(0,0,0);fun.add(mcup);cyl(mcup,.06,.055,.13,std(0xe8e8e8,{transparent:true,opacity:.55}),0,.065,0,16);const mcMud=cyl(mcup,.054,.054,.12,MAT.mud,0,.06,0,16);mcMud.scale.y=.01;mcMud.position.y=0;
  const stream=rod(fun,V(0,.27,0),V(0,.13,0),.006,MAT.mud);stream.visible=false;
  const labels=[['Jarra de muestra',jar,.24],['Balanza de lodo',bal,.3],['Embudo Marsh',fun,.72]];labels.forEach(([t,o,y])=>{const l=label3D(t,.2);l.position.y=y;o.add(l)});
  if(how==='demo'){
    lookFrom([10,6.5,6],[15,3.2,1]);RIG.ins.point=V(15.3,3.6,1.1);
    panel(head('Explicación','El encuellador y el lodo','<p>Mientras se perfora, el encuellador es el responsable del lodo: mide su <b>peso</b> (densidad, en libras por galón) y su <b>viscosidad</b>, y vigila tanques, zarandas y bombas. El peso del lodo es la primera barrera para controlar el pozo.</p>'));
    await sayW('Cuando no hay viaje, el encuellador trabaja aquí, en los tanques. Es el responsable de que el lodo tenga las propiedades del programa.');
    await sayW('El peso del lodo se mide con la balanza de lodo, en libras por galón. Se llena la copa, se tapa, y se corre el jinete por el brazo hasta que la burbuja quede en el centro.');
    await sayW('La viscosidad se mide con el embudo Marsh: se llena con mil quinientos centímetros cúbicos y se toma el tiempo que tarda en llenar un cuarto de galón. El resultado se da en segundos por cuarto.');
    await sayW('Y en cada ronda revisas zarandas, niveles de tanques y bombas. Cualquier cambio se le avisa al perforador de inmediato.');RIG.ins.point=null}
  $('#cams').hidden=true;await w(fade(()=>{fpMode(V(13.9,TY+1.62,1.1),-Math.PI/2,-.5)}));
  act(jar,'muestra','Jarra de muestra');act(cup,'copa','Copa de la balanza');
  const eb='Prueba de peso',guided=how==='demo';
  await doSeq([
    {k:'muestra',t:'Tomar una muestra del tanque activo',obj:jar,h:'Toma una muestra de lodo del tanque activo con la jarra.',run:async()=>{jarMud.visible=true;await sleep(300)}},
    {k:'copa',t:'Llenar y tapar la copa de la balanza',obj:cup,h:'Llena la copa de la balanza con la muestra y ponle la tapa.',run:async()=>{jarMud.visible=false;lid.visible=true;await sleep(300)}},
  ],st,{eb,title:'Balanza de lodo',guided});
  // nivelar
  const TRUE=10.4;let val=8.6;
  const setVal=v=>{val=Math.round(clamp(v,6,16)*10)/10;rider.position.z=-.05+(val-6)/10*.3;beam.rotation.x=clamp((val-TRUE)*.06,-.18,.18);gaugeVal(1+clamp((TRUE-val)*.45,-1,1),val.toFixed(1).replace('.',',')+' lpg')};
  gauge(true,'Burbuja','',2,.93,1.07);setVal(val);
  const dr=fb=>panel(head(eb,'Nivela la balanza',meterHTML(st)+`<p>Corre el jinete hasta que la burbuja quede centrada (franja verde) y el brazo quede horizontal.</p><p>Jinete en <b class="mono">${val.toFixed(1).replace('.',',')} lpg</b></p>${fb||''}<div class="row"><button class="btn sm" type="button" data-in="m1">− 1</button><button class="btn sm" type="button" data-in="m01">− 0,1</button><button class="btn sm" type="button" data-in="p01">+ 0,1</button><button class="btn sm" type="button" data-in="p1">+ 1</button></div><div class="row" style="margin-top:8px"><button class="btn primary sm" type="button" data-in="lvl">Está nivelada</button></div>`));
  dr();setButtons([{t:'− 1',v:'m1'},{t:'− 0,1',v:'m01'},{t:'+ 0,1',v:'p01'},{t:'+ 1',v:'p1'},{t:'Está nivelada',v:'lvl'}]);task('Corre el jinete hasta centrar la burbuja');aim(bal);
  if(guided)await sayW('Corre el jinete con los botones hasta que la burbuja quede en la franja verde. Luego confirma.');
  for(;;){const v=await w(waitInput());const d={m1:-1,m01:-.1,p01:.1,p1:1}[v];
    if(d){setVal(val+d);dr();continue}
    if(v==='lvl'){if(Math.abs(val-TRUE)<.05)break;st.errs++;dr('<div class="fb bad">La burbuja no está centrada: el brazo sigue inclinado.</div>');say('Todavía no está nivelada. Mira la burbuja.')}}
  gauge(false);setButtons([]);task('');
  await decide(eb,'¿Qué peso registras?','<p>La burbuja está centrada con el jinete en la marca. El programa de lodo pide 10,4 lpg.</p>',shuffle([{t:'10,4 lpg: igual al programa',v:'ok',f:'Correcto. El lodo está en el peso del programa.'},{t:'14,0 lpg',v:'x',f:'Esa no es la lectura del jinete.'},{t:'10,4 segundos',v:'y',f:'El peso se da en libras por galón (lpg); los segundos son de la viscosidad Marsh.'}]),st,'ok');
  // viscosidad Marsh
  act(fun,'embudo','Embudo Marsh');
  await doSeq([{k:'embudo',t:'Llenar el embudo con 1500 cm³',obj:fun,h:'Tapa la salida con el dedo y llena el embudo con 1500 centímetros cúbicos de lodo, pasándolo por la malla.',run:async()=>{coneMud.visible=true;await sleep(300)}}],st,{eb:'Viscosidad Marsh',title:'Embudo Marsh',guided});
  for(;;){
    gauge(true,'Taza','cm³',1200,920,975);let cc=0,t=0,run=true;mcMud.scale.y=.01;stream.visible=true;
    panel(head('Viscosidad Marsh','Toma el tiempo',meterHTML(st)+'<p>El lodo cae a la taza. Detén el cronómetro cuando la taza llegue a la marca de un cuarto de galón (946 cm³), en la franja verde.</p><p>Cronómetro: <b class="mono" id="mt">0 s</b></p><button class="btn primary" type="button" data-in="stopT">Detener cronómetro</button>'));
    setButtons([{t:'Detener cronómetro',v:'stopT'}]);task('Detén el cronómetro en la marca');
    MODE.tick=dt=>{if(!run)return;t+=dt*4;cc=Math.min(1200,946*t/45);mcMud.scale.y=Math.max(.01,cc/1200);mcMud.position.y=.06*mcMud.scale.y;gaugeVal(cc,Math.round(cc)+' cm³');const e=$('#mt');if(e)e.textContent=Math.floor(t)+' s';if(cc>=1200){run=false;dispatch('stopT')}};
    for(;;){if(await w(waitInput())==='stopT')break}
    run=false;MODE.tick=null;stream.visible=false;gauge(false);setButtons([]);task('');
    if(cc>=920&&cc<=975)break;
    st.errs++;await sayW(cc<920?'Muy pronto: la taza no había llegado a la marca. Se repite la prueba.':'Muy tarde: la taza pasó la marca. Se repite la prueba.')}
  await decide('Viscosidad Marsh','¿Qué registras?','<p>El cronómetro marcó unos 45 segundos al llegar a la marca.</p>',shuffle([{t:'45 s/cuarto de galón',v:'ok',f:'Correcto. La viscosidad Marsh se reporta en segundos por cuarto de galón.'},{t:'45 lpg',v:'x',f:'Las lpg son unidades de peso, no de viscosidad.'},{t:'946 cm³',v:'y',f:'Ese es el volumen de la taza; lo que se registra es el tiempo.'}]),st,'ok');
  // ronda
  clearActs();$('#cams').hidden=false;
  await w(fade(()=>{lookFrom([4,12,-22],[15,2,-4]);insAt(V(11.5,0,-13))}));
  const sh=RIG.shakers[0];const torn=temp(box(sh,.5,.02,.6,MAT.dark,.1,.82,.2));torn.rotation.x=.12;proxy(sh,2.6,V(0,.6,0));act(sh,'zaranda','Zaranda 1');
  const tk=grp(V(14.5,2.9,9.5));const gl=label3D('Tanque 3 · nivel',.6);tk.add(gl);proxy(tk,1.2);act(tk,'tanque','Tanque 3');
  const pu=grp(V(20.5,.03,-3));const puddle=new THREE.Mesh(new THREE.CircleGeometry(.9,24),std(0x2a1c10,{roughness:.1,metalness:.3}));puddle.rotation.x=-Math.PI/2;pu.add(puddle);proxy(pu,1.6,V(0,.5,0));act(pu,'bomba','Bomba de lodo 1');
  const R={
    zaranda:['Zaranda 1','La malla de la zaranda 1 está rota: los cortes pasan al tanque.',[{t:'Avisar al perforador; parar la zaranda con bloqueo de energía y cambiar la malla',v:'ok',f:'Correcto. Malla rota significa cortes en el lodo, y la máquina se interviene solo bloqueada.'},{t:'Dejarla así hasta el cambio de turno',v:'x',f:'Los cortes que pasan cambian las propiedades del lodo y desgastan las bombas.'},{t:'Tapar el hueco con la mano con la zaranda andando',v:'y',f:'Nunca se mete la mano en una máquina en movimiento.'}]],
    tanque:['Tanque 3','El nivel del tanque 3 está subiendo y nadie está transfiriendo ni mezclando.',[{t:'Avisar de inmediato al perforador: puede ser ganancia del pozo',v:'ok',f:'Correcto. Un aumento de nivel sin explicación puede ser una patada.'},{t:'Anotarlo y revisarlo en la próxima ronda',v:'x',f:'Una ganancia en tanques se reporta en el momento, no en la próxima ronda.'},{t:'Vaciar un poco el tanque para que no se rebose',v:'y',f:'Así escondes la señal de una posible patada.'}]],
    bomba:['Bomba de lodo 1','Hay una fuga de lodo por el empaque de un pistón de la bomba 1.',[{t:'Avisar al perforador; no tocar la bomba en marcha; se repara bloqueada y despresurizada',v:'ok',f:'Correcto. Una bomba trabaja a miles de psi: se interviene solo bloqueada y sin presión.'},{t:'Apretar el empaque con la bomba en marcha',v:'x',f:'Con la bomba presurizada, un chorro de lodo puede causar lesiones graves.'},{t:'Ignorarla: es una fuga pequeña',v:'y',f:'Una fuga pequeña en el empaque crece rápido y termina dañando la bomba.'}]],
  };
  const left=new Set(Object.keys(R));
  await sayW('Ahora haz la ronda. Revisa la zaranda 1, el tanque 3 y la bomba de lodo 1. Gira la cámara y toca cada uno.');
  while(left.size){
    panel(head('Ronda','Zarandas, tanques y bombas',meterHTML(st)+`<p>Toca en la escena cada punto de la ronda. Faltan: <b>${[...left].map(k=>R[k][0]).join(', ')}</b>.</p>`));setButtons([]);task('Toca cada punto de la ronda');
    const v=await w(waitInput());if(!left.has(v))continue;left.delete(v);const[n,txt,opts]=R[v];
    const cm={zaranda:[[9,6,-14],[14.5,3,-12]],tanque:[[9,6,14],[14.5,2.6,9.5]],bomba:[[16,3,-7],[21,1,-3]]}[v];w(cineTo(WP(cm[0]),WP(cm[1]),1.6,false));
    say(txt);await decide('Ronda',n,`<p>${txt}</p>`,shuffle(opts),st,'ok')}
  await sayW('Buen trabajo. Lodo medido y registrado, y la ronda completa con cada novedad reportada al perforador.');
  await result(pts(st),`Peso 10,4 lpg · Viscosidad 45 s/cuarto. ${st.errs} error${st.errs===1?'':'es'}.`)}

/* ===================================================================== PERFORADOR: CONSOLA */
function glowCtl(ids){CTLS.forEach(c=>{c.glow=ids.includes(c.id)})}
function untilC(fn){return w(new Promise(res=>{MODE.waitC=MODE.waitC||[];MODE.waitC.push({fn,res})}))}
async function modConsola(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Consola del perforador','El instructor te muestra la cabina: el joystick del malacate, la palanca de la rotaria, las bombas, las pantallas, el indicador de peso y el panel de control de pozo. Luego perforas y respondes a lo que pase en el pozo.');
  const st={errs:0,hints:0};const pen=new Set();
  consoleReset({kickEnabled:false});tripSetup();RIG.string.visible=true;RIG.slips.visible=false;consoleVisual();startAmbient();
  $('#cams').hidden=true;insAt(V(-8.55,F,-1.25));RIG.ins.face=CAB.eye;
  MODE.tick=dt=>{consoleSim(dt);if(MODE.waitC)MODE.waitC=MODE.waitC.filter(x=>{if(x.fn()){x.res();return false}return true})};
  if(how==='demo'){
    CS.run=true;drawScreens();
    const shot=async(pos,tgt,ids,t)=>{glowCtl(ids||[]);RIG.ins.point=tgt;w(cineTo(pos,tgt,1.8,false));await sayW(t)};
    panel(head('Explicación','La cabina del perforador','<p>Sillón con mandos en los apoyabrazos, tres pantallas de perforación, instrumentos analógicos de respaldo y el panel de control de pozo.</p>')+'<button class="btn" type="button" data-in="skip">Saltar explicación</button>');
    const sk=waitInput();
    const tour=(async()=>{
      await shot(V(-8.9,F+1.9,-1.2),V(-7.2,F+1.1,-2.65),[],'Esta es la cabina del perforador. Desde este sillón se controla toda la perforación. Mira por el ventanal: tienes vista directa a la mesa rotaria y al mástil.');
      const g=k=>ctlGrip(CAB.ctl[k]);
      await shot(g('dw').clone().add(V(-.55,.45,-.35)),g('dw'),['dw'],'El joystick del apoyabrazos izquierdo maneja el malacate. Hacia adelante baja la sarta y hacia atrás la sube. Si lo sueltas vuelve al centro y el freno sostiene toda la carga.');
      await shot(g('auto').clone().add(V(-.5,.42,-.3)),g('auto'),['auto','wobSet'],'El botón verde AUTO activa el autoperforador: baja la sarta solo, manteniendo el peso sobre la broca que marques con la perilla.');
      await shot(g('rpm').clone().add(V(-.55,.45,.35)),g('rpm'),['rpm'],'En el apoyabrazos derecho, la palanca azul controla la rotaria del top drive, en revoluciones por minuto.');
      await shot(g('p1').clone().add(V(-.5,.45,.4)),g('p1'),['p1','p2'],'Las perillas rojas controlan las dos bombas de lodo, en emboladas por minuto. Y el botón rojo grande es la parada de emergencia.');
      await shot(V(-7.75,F+1.25,-2.65),V(-6.78,F+1.1,-2.65),[],'Las tres pantallas: a la izquierda los parámetros de perforación, en el centro el lodo y las bombas, donde ves los tanques y el flujo de retorno, y a la derecha las tendencias y alarmas.');
      await shot(V(-7.5,F+1.6,-2.65),V(-5.95,F+2.3,-2.65),[],'Arriba, sobre el ventanal, está el indicador de peso analógico. La aguja negra marca el peso en el gancho y la roja el peso sobre la broca. Si las pantallas fallan, este instrumento sigue funcionando.');
      await shot(V(-8.1,F+1.6,-2.0),CAB.bopG.localToWorld(V(0,1,.1)),['master','ann','rams','hcr'],'A tu derecha, el panel de control de pozo. Para cerrar una preventora se presiona MAESTRO y luego la función, así se evita un cierre accidental. Sus manómetros muestran la presión de la tubería y del revestimiento con el pozo cerrado.');
      RIG.ins.point=null;glowCtl([])})();
    const rr=await w(Promise.race([tour.then(()=>'done'),sk]));glowCtl([]);RIG.ins.point=null;
    if(rr==='skip'){openModule(MODE.id,{practice:true});return}
    await sayW('Ahora te sientas tú. Vamos a perforar.')}
  // ---------- práctica ----------
  consoleReset({kickEnabled:false});
  await w(fade(()=>{consoleSeat(true);RIG.ins.face=CAB.eye}));
  const STEPS=['Encender las bombas (≈ 85 epm cada una)','Arrancar la rotaria a 100–120 RPM','Bajar la sarta y tocar fondo despacio','Poner 16–20 klb sobre la broca','Perforar vigilando tanques y flujo'];
  let cur=0;const T0={};
  const dr=(fb='')=>panel(head('Consola del perforador',cur<STEPS.length?STEPS[cur]:'¡Atención al pozo!',meterHTML(st)+stepsHTML(STEPS,cur)+fb+
    `<p class="muted" style="font-size:13px">Arrastra para mirar y apunta la <b>mira</b> (centro de la pantalla) al mando: aparece un recuadro con su valor y botones. También sirven la rueda del ratón, las teclas + y −, y ↑ ↓ para el malacate.</p><button class="btn sm ghost" type="button" data-in="HINT">Pista</button>`));
  const HINT={0:'Apunta la mira a la perilla roja de la bomba uno, en el apoyabrazos derecho, y súbela con el botón más hasta unas ochenta y cinco emboladas. Luego haz lo mismo con la bomba dos.',1:'Apunta la mira a la palanca azul de la rotaria y súbela con el botón más hasta ciento diez.',2:'Apunta la mira al joystick del apoyabrazos izquierdo y mantén presionado Bajar. Cuando falte poco para el fondo, suéltalo y baja a toques.',3:'Sigue bajando poco a poco hasta que el peso sobre la broca marque entre dieciséis y veinte, o presiona AUTO.',4:'Vigila la pantalla central: volumen de tanques y flujo de retorno.'};
  const GL={0:['p1','p2'],1:['rpm'],2:['dw'],3:['dw','auto','wobSet'],4:[]};
  // eventos de la simulación → errores
  const evLoop=()=>{while(CS.ev.length){const e=CS.ev.shift();const P={impact:'Golpeaste el fondo con la broca. Al acercarte al fondo baja despacio.',crown:'Casi chocas el bloque contra la corona. Vigila la posición del bloque.',nopump:'Estás rotando sin bombas. Primero se circula, después se rota.',stall:'El top drive se frenó por exceso de peso. Mantén el peso en el rango del programa.',pumpclosed:'Estás bombeando contra el pozo cerrado: puedes fracturar la formación. Apaga las bombas.'}[e];
    if(P&&!(e==='crown'&&pen.has('crown'))){st.errs++;pen.add(e);say(P);dr(`<div class="fb bad">${P}</div>`)}}};
  setInterval&&(MODE.evI=setInterval(()=>{if(!MODE.console){clearInterval(MODE.evI);return}evLoop()},250));
  const stable=(fn,secs)=>{let t=0,last=performance.now();return()=>{const n=performance.now(),d=(n-last)/1000;last=n;t=fn()?t+d*SPEED:0;return t>=secs}};
  const step=async(i,txt,cond)=>{cur=i;dr();glowCtl(GL[i]);task(STEPS[i]);
    if(how==='demo'||i<2)say(txt);
    await untilC(cond);glowCtl([])};
  // pistas
  const hintLoop=async()=>{for(;;){const v=await w(waitInput());if(v==='HINT'){st.hints++;glowCtl(GL[Math.min(cur,4)]);await sayW(HINT[Math.min(cur,4)])}}};
  hintLoop().catch(()=>{});
  await step(0,'Primero enciende las bombas de lodo. Apunta la mira a cada perilla roja y súbela hasta unas ochenta y cinco emboladas por minuto.',stable(()=>CS.flowIn>=520&&CS.flowIn<=690,1.2));
  say('Bien, circulación establecida: unos seiscientos galones por minuto.');
  await step(1,'Ahora arranca la rotaria: empuja la palanca azul hasta ciento diez RPM.',stable(()=>CS.rpm>=100&&CS.rpm<=120,1.2));
  await step(2,'Baja la sarta con el joystick del malacate hasta tocar fondo. Despacio al llegar.',()=>CS.wob>=2);
  await step(3,'Pon entre dieciséis y veinte mil libras sobre la broca. Puedes hacerlo a mano o activar el autoperforador.',stable(()=>CS.wob>=16&&CS.wob<=20&&CS.rop>0,2.5));
  say('Excelente, estás perforando. Mantén los parámetros y vigila tanques y flujo de retorno.');
  cur=4;dr();task('Perfora y vigila los tanques');CS.kickEnabled=true;CS.kickAt=Math.max(1.6,CS.hole-CS.start+2.2);
  await untilC(()=>CS.kick);
  // ---------- patada: el aprendiz debe detectarla ----------
  const t={};let hinted=false,late=false;cur=5;
  const PROC=['Detener la rotaria y quitar el peso','Levantar la sarta del fondo (≥ 1,5 m)','Apagar las bombas','Observar el flujo (flow check)','Cerrar el pozo (MAESTRO + ANULAR)','Leer las presiones de cierre'];
  const drK=(fb='')=>panel(head('Consola del perforador','Responde al pozo',meterHTML(st)+stepsHTML(PROC,PROC.findIndex((_,i)=>!t['s'+i]))+fb+`<button class="btn sm ghost" type="button" data-in="HINT">Pista</button>`));
  await untilC(()=>{const k=CS.kickT;
    if(!t.s0&&!t.s1&&k>14&&!hinted){hinted=true;st.hints++;say('Revisa la pantalla central. ¿Qué está pasando con los tanques y el flujo de retorno?');drK()}
    if(!t.s0&&!t.s1&&k>28&&!late){late=true;st.errs++;say('Estás reaccionando tarde. Los tanques llevan rato subiendo.');drK('<div class="fb bad">Reacción tardía.</div>')}
    if(!t.s0&&CS.rpm<5&&CS.wob<1.5){t.s0=k;say('Rotaria detenida.');drK()}
    if(!t.s1&&CS.hole-CS.bit>=1.5){t.s1=k;say('Sarta fuera del fondo.');drK()}
    if(!t.s2&&CS.flowIn<5){t.s2=k;if(!t.s1){st.errs++;say('Apagaste las bombas con la broca en el fondo: riesgo de pegar la sarta. Primero se levanta.');drK('<div class="fb bad">Primero levanta la sarta, luego apaga las bombas.</div>')}else{say('Bombas apagadas. Ahora observa el flujo de retorno.');drK()}}
    if(t.s2&&t.s1&&!t.s3&&CS.rpm<5){if(t.fc==null)t.fc=k;if(k-t.fc>3.2&&CS.flowOut>8){t.s3=k;say('Flow check positivo: con las bombas apagadas el pozo sigue fluyendo. Es una patada. Cierra el pozo.');drK();glowCtl(['master','ann'])}}
    if(!t.s4&&(CS.annular||CS.rams)){t.s4=k;glowCtl([]);const bad=[];if(CS.rpm>5)bad.push('cerraste con la tubería rotando');if(CS.bit>=CS.hole-.3)bad.push('cerraste con la broca en el fondo');if(CS.flowIn>20)bad.push('cerraste con las bombas encendidas');
      if(bad.length){st.errs+=bad.length;say('Pozo cerrado, pero '+bad.join(' y ')+'.');drK(`<div class="fb bad">Pozo cerrado, pero ${bad.join(' y ')}.</div>`)}else{say('Pozo cerrado. Espera a que las presiones se estabilicen.');drK()}}
    return !!t.s4});
  const gainAt=CS.gain,react=t.s0!=null?Math.min(t.s0,t.s1||99):(t.s1||CS.kickT);
  await untilC(stable(()=>Math.abs(CS.sidpp-350)<12&&Math.abs(CS.sicp-520)<15,1.5));
  glowCtl([]);fpLook(-Math.PI/2-1.05,-.5);task('Lee los manómetros del panel de control de pozo');
  await decide('Presiones de cierre','Lee los manómetros del panel de control de pozo','<p>Mira a tu derecha, el panel azul: el manómetro <b>TUBERÍA</b> es la presión de cierre en la tubería (SIDPP) y <b>REVEST.</b> la del revestimiento (SICP).</p>',
    shuffle([{t:'SIDPP 350 psi · SICP 520 psi',v:'ok',f:'Correcto. Con la SIDPP se calcula el peso del lodo para matar el pozo.'},{t:'SIDPP 520 psi · SICP 350 psi',v:'x',f:'Están invertidas: TUBERÍA marca 350 y REVEST. marca 520.'},{t:'SIDPP 3.500 psi · SICP 5.200 psi',v:'y',f:'Fíjate en la escala del manómetro: va de 0 a 2.000 psi.'}]),st,'ok');
  t.s5=1;clearInterval(MODE.evI);evLoop();
  const gpen=gainAt>6?Math.round((gainAt-6)*4):0;
  await sayW(`Pozo cerrado con ${fmt(gainAt,1)} barriles de ganancia. Mientras más rápido reacciones, más pequeño es el influjo y más fácil el control.`);
  await result(Math.max(0,100-st.errs*8-st.hints*3-gpen),`Ganancia al cierre: ${fmt(gainAt,1)} bbl · Reacción: ${Math.round(react)} s · ${st.errs} error${st.errs===1?'':'es'}, ${st.hints} pista${st.hints===1?'':'s'}.`)}

/* ===================================================================== SUPERVISOR */
async function modSupervisor(opt){
  const how=opt&&opt.practice?'practice':await startChoice('Permiso, inspección y simulacro','El instructor te explica el papel del supervisor en la seguridad del equipo. Luego revisas un permiso, inspeccionas el taladro y diriges un simulacro.');
  const st={errs:0,hints:0};
  insAt(V(6,0,10));station(V(8,0,12),.6);
  if(how==='demo'){
    lookFrom([18,8,22],[0,F,0]);
    panel(head('Explicación','El supervisor','<p>El supervisor no hace el trabajo de cada cargo: se asegura de que se haga de forma segura. Revisa y aprueba permisos, inspecciona el equipo, dirige charlas y simulacros, y coordina con la operadora.</p>'));
    await sayW('Como supervisor, tu trabajo es que cada tarea se haga de forma segura. Un permiso de trabajo no es un papel para firmar: es la verificación de que los controles están en su sitio.');
    await sayW('Vas a hacer tres cosas: revisar un permiso de trabajo en alturas, inspeccionar el taladro buscando peligros, y dirigir un simulacro de patada.')}
  // 1 · permiso
  const today=new Date(),venc=new Date(today.getTime()-15*864e5),f=d=>d.toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
  const rows=[['Trabajo','Encuelle durante viaje de tubería, en el encuelladero (27 m)',0],['Ejecutor','Jhon Pérez, encuellador',0],['Certificado de alturas',`Nivel avanzado · vence ${f(venc)}`,1,`El certificado de alturas está vencido (hoy es ${f(today)}).`],
    ['Arnés N.º 14','Inspección preuso conforme y firmada',0],['Bloque retráctil','Última inspección: sin registro',1,'El bloque retráctil no tiene inspección registrada.'],['Plan de rescate','Rescatista asignado: Carlos Ruiz · equipo en la base del mástil',0],
    ['Condiciones','Viento moderado · sin tormenta eléctrica',0],['Firmas','Emisor: pendiente (tú) · Ejecutor: sin firma',1,'Falta la firma del ejecutor: no ha confirmado que conoce los riesgos y controles.']];
  const mk=new Set();
  const drP=fb=>{panel(head('1 · Permiso de trabajo','Revisa el permiso en alturas',meterHTML(st)+'<p>Toca cada línea que tenga un problema para marcarla como observación. Luego decide.</p>'+
    `<div class="list">${rows.map((r,i)=>`<button class="opt ${mk.has(i)?'wrong':''}" type="button" data-in="r${i}"><b>${r[0]}</b><br><span class="muted" style="font-size:13px">${r[1]}</span></button>`).join('')}</div>${fb||''}<div class="row"><button class="btn" type="button" data-in="aprobar">Aprobar el permiso</button><button class="btn primary" type="button" data-in="devolver">Devolver con observaciones</button></div>`));
    setButtons(rows.map((r,i)=>({t:(mk.has(i)?'✔ ':'')+r[0],v:'r'+i})).concat([{t:'Aprobar',v:'aprobar'},{t:'Devolver con observaciones',v:'devolver'}]))};
  drP();lookFrom([6,F+MONK+3,9],[0,F+MONK,1]);
  await sayW('Este es el permiso para el encuellador de hoy. Revísalo línea por línea y marca lo que esté mal.');
  for(;;){const v=await w(waitInput());
    if(v[0]==='r'){const i=+v.slice(1);mk.has(i)?mk.delete(i):mk.add(i);drP();continue}
    const bad=rows.map((r,i)=>r[2]?i:-1).filter(i=>i>=0),miss=bad.filter(i=>!mk.has(i)),wrong=[...mk].filter(i=>!rows[i][2]);
    st.errs+=miss.length+wrong.length;if(v==='aprobar'&&bad.length)st.errs+=3;
    const fb=`<div class="fb ${miss.length||wrong.length||v==='aprobar'?'bad':'ok'}">${v==='aprobar'?'<b>Un permiso con fallas no se aprueba.</b><br>':''}${bad.map(i=>(mk.has(i)?'✔ ':'✘ ')+rows[i][3]).join('<br>')}${wrong.length?'<br>Marcaste líneas que estaban bien: '+wrong.map(i=>rows[i][0]).join(', ')+'.':''}</div>`;
    panel(head('1 · Permiso de trabajo','Resultado de la revisión',meterHTML(st)+fb));
    await sayW(v==='aprobar'?'No. Este permiso tenía fallas: certificado vencido, bloque retráctil sin inspección y sin la firma del ejecutor. Nadie sube con ese permiso.':miss.length||wrong.length?'Revisa el resultado: estas eran las fallas del permiso.':'Muy bien. Encontraste las tres fallas y devolviste el permiso. Nadie sube hasta corregirlas.');
    await ask(head('1 · Permiso de trabajo','Resultado de la revisión',meterHTML(st)+fb),[{t:'Continuar',v:'n'}]);break}
  // 2 · inspección
  const H=[];const hz=(id,lbl,pos,build)=>{const g=grp(pos);build(g);proxy(g,1.1,V(0,.4,0));act(g,id,'?');g.userData.lbl=lbl;H.push(g);return g};
  hz('baranda','Baranda suelta en el piso',V(5.3,F,-4.6),g=>{rod(g,V(0,1.1,-.8),V(.35,.25,.6),.025,MAT.yellow)});
  hz('herramienta','Llave suelta en el borde del encuelladero',V(-2.4,F+MONK+.12,3.3),g=>{box(g,.35,.04,.08,MAT.red,0,0,0)});
  hz('fuga','Fuga hidráulica en el acumulador',V(-12.6,.03,7.4),g=>{const c=new THREE.Mesh(new THREE.CircleGeometry(.8,24),std(0x2a1c10,{roughness:.1,metalness:.3}));c.rotation.x=-Math.PI/2;g.add(c)});
  hz('cilindros','Cilindros de gas sin asegurar',V(-5,0,2.4),g=>{cyl(g,.12,.12,1.4,std(0x2f7d4a),0,.7,0,14);cyl(g,.12,.12,1.4,std(0xb1281c),.32,.7,.1,14)});
  hz('extintor','Soporte de extintor vacío',V(-5.62,F+1.1,-1.1),g=>{const s=new THREE.Mesh(new THREE.PlaneGeometry(.4,.25),std(0xffffff,{map:textTex(['EXTINTOR'],{w:256,h:128,bg:'#c0281c',font:'bold 56px Arial'})}));s.rotation.y=Math.PI/2;s.position.y=.4;g.add(s);box(g,.05,.3,.05,MAT.steelDk,.02,0,0)});
  H.forEach(g=>g.userData.label='Revisar');
  const found=new Set();lookFrom([24,16,26],[0,F,0]);
  const drI=fb=>{panel(head('2 · Inspección','Encuentra los peligros',meterHTML(st)+`<p>Gira y acerca la cámara por todo el equipo y toca cada condición insegura. Hay <b>5</b>: en el piso, en el encuelladero, junto a la cabina y en el acumulador.</p><p>Encontrados: <b class="mono">${found.size} de 5</b></p><ul class="steps">${[...found].map(id=>`<li class="done">${H.find(g=>g.userData.act===id).userData.lbl}</li>`).join('')}</ul>${fb||''}<button class="btn sm ghost" type="button" data-in="HINT">Pista</button> <button class="btn sm" type="button" data-in="fin">Terminar inspección</button>`));setButtons([{t:'Pista',v:'HINT'},{t:'Terminar inspección',v:'fin'}])};
  drI();await sayW('Ahora inspecciona el equipo antes del arranque del turno. Hay cinco condiciones inseguras. Encuéntralas.');
  for(;;){const v=await w(waitInput());
    if(v==='HINT'){const g=H.find(x=>!found.has(x.userData.act));if(g){st.hints++;hot(g);const p=g.getWorldPosition(V(0,0,0));lookFrom([p.x+6,p.y+4,p.z+7],[p.x,p.y,p.z]);drI()}continue}
    if(v==='fin'){const m=5-found.size;st.errs+=m*2;if(m)await sayW(`Te faltaron ${m}. Una condición insegura que no ves es la que causa el accidente.`);break}
    const g=H.find(x=>x.userData.act===v);if(g&&!found.has(v)){found.add(v);unact(g);const l=label3D('✔ '+g.userData.lbl,.5);l.position.y=.9;g.add(l);say(g.userData.lbl+'. Bien visto.');drI();if(found.size===5){await sayW('Encontraste las cinco. Cada una se corrige antes de arrancar.');break}}}
  // 3 · simulacro
  lookFrom([10,F+4,12],[0,F+1,0]);MODE.alarm=true;
  await sayW('Por último, vas a dirigir un simulacro de patada durante un viaje. Asigna a cada uno su tarea.');
  const Q=[['perforador','¿Qué hace el perforador?',[['ok','Detener la operación, verificar el flujo y cerrar el pozo'],['x','Ir a los tanques a medir el lodo'],['y','Bajar al contrapozo a revisar el cabezal']]],
    ['cunero','¿Qué hace el cuñero?',[['ok','Instalar la FOSV abierta en la tubería y cerrarla'],['x','Ir al punto de encuentro'],['y','Encender las bombas']]],
    ['encuellador','¿Qué hace el encuellador?',[['ok','Asegurar la parada, bajar conectado y vigilar los tanques'],['x','Quedarse en el encuelladero hasta que termine'],['y','Cerrar la preventora']]],
    ['patio','¿Qué hace el obrero de patio?',[['ok','Ir a su puesto asignado y apoyar en los tanques con químicos'],['x','Subir al piso a ayudar a cerrar'],['y','Seguir con su trabajo']]]];
  const t0=performance.now();
  for(const[k,q,o]of Q)await decide('3 · Simulacro',q,'',shuffle(o.map(([v,t])=>({t,v,f:v==='ok'?'Correcto.':'No. '+o.find(x=>x[0]==='ok')[1]+'.'}))),st,'ok');
  MODE.alarm=false;
  await decide('3 · Simulacro','¿Cómo cierras el simulacro?','',shuffle([{t:'Reunión de cierre: tiempos, aciertos, fallas y acciones; queda registrado',v:'ok',f:'Correcto. Un simulacro sin revisión no mejora nada.'},{t:'Felicitar a todos y volver al trabajo',v:'x',f:'Sin revisar tiempos y fallas, el simulacro no deja aprendizaje.'},{t:'Repetirlo de inmediato sin hablar',v:'y',f:'Primero se analiza qué pasó; luego se repite si hace falta.'}]),st,'ok');
  await sayW('Excelente. Permiso revisado, equipo inspeccionado y simulacro dirigido.');
  await result(pts(st),`${st.errs} error${st.errs===1?'':'es'} y ${st.hints} pista${st.hints===1?'':'s'}.`)}
