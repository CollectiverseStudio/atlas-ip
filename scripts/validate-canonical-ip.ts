import fs from 'node:fs';
import path from 'node:path';

const roster = [
  ['heroes','atlas'],['heroes','pixel'],['heroes','ink'],['heroes','sterling'],['heroes','forge'],['heroes','porter'],['heroes','echo'],
  ['villains','director'],['villains','counterfeiter'],['villains','restorer'],['villains','hacker'],['villains','hoarder'],['villains','vault'],['villains','whisper'],['villains','smuggler']
] as const;

function pngs(dir:string){ return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f=>f.toLowerCase().endsWith('.png')) : []; }
let failed=false;
console.log('Collectiverse canonical IP validation');
for(const [faction,id] of roster){
  const base=path.join('characters',faction,id);
  const original=pngs(path.join(base,'original','poses','approved'));
  const human=pngs(path.join(base,'humanized','poses','approved'));
  const master=path.join(base,'humanized','master','master.png');
  const hasMaster=fs.existsSync(master);
  const originalOk=original.length>=40;
  if(!originalOk) failed=true;
  console.log(`${faction}/${id}: original=${original.length} ${originalOk?'OK':'FAIL'} | humanized-approved=${human.length} | humanized-master=${hasMaster?'YES':'NO'}`);
}
const ink=pngs(path.join('characters','heroes','ink','humanized','poses','approved'));
if(ink.length!==40){console.error(`Ink humanized expected 40 approved, found ${ink.length}`);failed=true;}
const sterling=pngs(path.join('characters','heroes','sterling','humanized','poses','approved'));
console.log(`Sterling humanized manual approved count: ${sterling.length}`);
if(!fs.existsSync(path.join('canon','CURRENT-CHARACTER-ROSTER.md'))){console.error('Missing current roster canon');failed=true;}
if(!fs.existsSync(path.join('canon','POSE-VARIANT-POLICY.md'))){console.error('Missing pose variant policy');failed=true;}
if(failed) process.exit(1);
