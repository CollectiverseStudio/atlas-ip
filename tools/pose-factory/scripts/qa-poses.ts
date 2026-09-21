import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY=process.env.OPENAI_API_KEY;
if(!API_KEY) throw new Error('OPENAI_API_KEY is required');
const ROOT=path.resolve('pose-factory');
const cfg=JSON.parse(await fs.readFile(path.join(ROOT,'config/characters.json'),'utf8'));
const rules=JSON.parse(await fs.readFile(path.join(ROOT,'config/qa-rules.json'),'utf8'));
const arg=process.argv.find(a=>a.startsWith('--character='));
const id=arg?.split('=')[1];
const c=cfg.characters.find((x:any)=>x.id===id);
if(!c) throw new Error(`Unknown character: ${id}`);
const manifest=JSON.parse(await fs.readFile(path.resolve(c.poseManifest),'utf8'));
const referencePath=path.resolve(c.reference);

async function exists(p:string){try{await fs.access(p);return true}catch{return false}}
function dataUrl(buf:Buffer){return `data:image/png;base64,${buf.toString('base64')}`}

async function judge(candidate:Buffer, pose:any){
  const content:any[]=[{type:'input_text',text:`You are a strict visual QA inspector for a copyrighted character asset library. Evaluate the candidate image against the requested pose and canonical identity. Return ONLY valid compact JSON: {"pass":boolean,"confidence":0-1,"reasons":[string]}. Character: ${c.name}. Lock: ${manifest.lock}. Requested pose: ${pose[1]}. Global requirements: ${rules.required.join('; ')}. Character-specific: ${(rules.characterSpecific[c.id]||[]).join('; ')}. Fail if identity/wardrobe/accessories drift, requested pose is unclear, left/right details are wrong, anatomy is malformed, an unrequested prop/scenery appears, or text/watermark appears.`},{type:'input_image',image_url:dataUrl(candidate),detail:'high'}];
  if(await exists(referencePath)) content.push({type:'input_text',text:'The next image is the canonical approved master reference. Compare identity and design against it.'},{type:'input_image',image_url:dataUrl(await fs.readFile(referencePath)),detail:'high'});
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-5.6-sol',input:[{role:'user',content}],max_output_tokens:300})});
  if(!r.ok) throw new Error(`QA API ${r.status}: ${await r.text()}`);
  const j:any=await r.json();
  const text=j.output_text ?? j.output?.flatMap((x:any)=>x.content||[]).find((x:any)=>x.type==='output_text')?.text;
  if(!text) throw new Error('QA model returned no text');
  return JSON.parse(text.replace(/^```json\s*|\s*```$/g,''));
}

const generated=path.join(ROOT,'output',c.id,'humanized','generated');
const approved=path.join(ROOT,'output',c.id,'humanized','approved');
const failed=path.join(ROOT,'output',c.id,'humanized','failed');
await fs.mkdir(approved,{recursive:true}); await fs.mkdir(failed,{recursive:true});
const report:any={schemaVersion:1,character:c.id,form:'humanized',createdAt:new Date().toISOString(),results:[]};
for(const pose of manifest.poses){
  const num=String(pose[0]).padStart(2,'0');
  const name=`${c.id}_humanized_${num}.png`; const src=path.join(generated,name);
  if(!(await exists(src))){report.results.push({pose:pose[0],status:'MISSING'});continue}
  const buf=await fs.readFile(src); const verdict=await judge(buf,pose);
  const pass=verdict.pass===true && Number(verdict.confidence||0)>=0.80;
  const dest=path.join(pass?approved:failed,name); await fs.copyFile(src,dest);
  report.results.push({pose:pose[0],status:pass?'PASS':'FAIL',confidence:verdict.confidence,reasons:verdict.reasons||[]});
  console.log(`[QA ${pass?'PASS':'FAIL'}] ${c.name} ${num}: ${(verdict.reasons||[]).join(' | ')}`);
}
await fs.mkdir(path.join(ROOT,'qa'),{recursive:true});
await fs.writeFile(path.join(ROOT,'qa',`${c.id}-latest.json`),JSON.stringify(report,null,2));
