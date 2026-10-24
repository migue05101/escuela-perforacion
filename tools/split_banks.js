// Saca los bancos del examen final de los archivos de cursos y los guarda en privado/ (no se publica).
// Uso: node tools/split_banks.js   → deja `bank: []` en src/cert_*.js y escribe privado/banco_<curso>.json
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..'),out=path.join(root,'privado');fs.mkdirSync(out,{recursive:true});
for(const f of ['cert_rigpass.js','cert_dit.js']){
  const file=path.join(root,'src',f);if(!fs.existsSync(file))continue;
  const src=fs.readFileSync(file,'utf8');const ctx={};vm.createContext(ctx);vm.runInContext(src+';this.R=typeof CERT_RIGPASS!=="undefined"?CERT_RIGPASS:CERT_DIT',ctx);
  const list=Array.isArray(ctx.R)?ctx.R:[ctx.R];let n=0;
  for(const c of list){if(!c.exam.bank.length)continue;fs.writeFileSync(path.join(out,`banco_${c.id}.json`),JSON.stringify({course:c.id,title:c.title,size:c.exam.size,pass:c.exam.pass,bank:c.exam.bank},null,1));n+=c.exam.bank.length;c.exam.bank=[]}
  const name=Array.isArray(ctx.R)?'CERT_DIT':'CERT_RIGPASS';
  fs.writeFileSync(file,`/* Contenido del curso. El banco del examen final NO va aquí: está en privado/ y se sube al servidor desde el panel del instructor. */\nconst ${name} = ${JSON.stringify(Array.isArray(ctx.R)?list:list[0],null,1)};\n`);
  console.log(f,'→',n,'preguntas movidas a privado/')}
