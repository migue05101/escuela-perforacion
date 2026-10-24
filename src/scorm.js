/* ===================================================================== SCORM (1.2 y 2004)
   Si la app se abre dentro de una plataforma LMS (Moodle, etc.) como paquete SCORM, le reporta
   el avance, la nota, el estado (aprobado/no aprobado) y el tiempo de cada sesión. */
const SCORM={api:null,ver:null,t0:Date.now(),on:false,
  find(){const look=w=>{for(let n=0;w&&n<12;n++){try{if(w.API_1484_11)return[w.API_1484_11,'2004'];if(w.API)return[w.API,'1.2']}catch(e){return null}if(w.parent===w)break;w=w.parent}return null};
    const r=look(window)||(window.opener?look(window.opener):null);if(r){this.api=r[0];this.ver=r[1]}return !!this.api},
  call(f12,f04,...a){if(!this.api)return'';try{return this.ver==='1.2'?this.api[f12](...a):this.api[f04](...a)}catch(e){return''}},
  init(){if(!this.find())return false;this.on=String(this.call('LMSInitialize','Initialize',''))==='true';
    if(this.on){const st=this.get(this.ver==='1.2'?'cmi.core.lesson_status':'cmi.completion_status');if(!st||st==='not attempted'||st==='unknown')this.set(this.ver==='1.2'?'cmi.core.lesson_status':'cmi.completion_status','incomplete');this.commit()}
    addEventListener('pagehide',()=>this.finish());return this.on},
  get(k){return this.call('LMSGetValue','GetValue',k)},
  set(k,v){return this.call('LMSSetValue','SetValue',k,String(v))},
  commit(){return this.call('LMSCommit','Commit','')},
  learner(){return this.on?this.get(this.ver==='1.2'?'cmi.core.student_name':'cmi.learner_name'):''},
  progress(course,done,total){if(!this.on)return;if(this.ver==='2004')this.set('cmi.progress_measure',(done/total).toFixed(2));this.set(this.ver==='1.2'?'cmi.core.lesson_location':'cmi.location',course+':'+done);this.commit()},
  score(score,passed,pass){if(!this.on)return;if(this.ver==='1.2'){this.set('cmi.core.score.min',0);this.set('cmi.core.score.max',100);this.set('cmi.core.score.raw',score);this.set('cmi.core.lesson_status',passed?'passed':'failed')}
    else{this.set('cmi.score.min',0);this.set('cmi.score.max',100);this.set('cmi.score.raw',score);this.set('cmi.score.scaled',(score/100).toFixed(2));this.set('cmi.scaled_passing_score',(pass/100).toFixed(2));this.set('cmi.success_status',passed?'passed':'failed');if(passed)this.set('cmi.completion_status','completed')}
    this.commit()},
  finish(){if(!this.on)return;const s=(Date.now()-this.t0)/1000;
    if(this.ver==='1.2'){const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=(s%60).toFixed(2);this.set('cmi.core.session_time',`${String(h).padStart(4,'0')}:${String(m).padStart(2,'0')}:${x.padStart(5,'0')}`);this.set('cmi.core.exit','suspend')}
    else{this.set('cmi.session_time',`PT${Math.floor(s/3600)}H${Math.floor(s%3600/60)}M${(s%60).toFixed(2)}S`);this.set('cmi.exit','suspend')}
    this.commit();this.call('LMSFinish','Terminate','');this.on=false}
};
SCORM.init();
