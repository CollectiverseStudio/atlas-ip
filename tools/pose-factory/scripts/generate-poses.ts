import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) throw new Error('OPENAI_API_KEY is required');

const TOOL_ROOT = path.resolve('tools/pose-factory');
const cfg = JSON.parse(await fs.readFile(path.join(TOOL_ROOT,'config/characters.json'),'utf8'));
const arg = process.argv.find(a=>a.startsWith('--character='));
const onlyCharacter = arg?.split('=')[1];
const force = process.argv.includes('--force');
const poseArg = process.argv.find(a=>a.startsWith('--pose='));
const onlyPose = poseArg ? Number(poseArg.split('=')[1]) : undefined;
const selected = cfg.characters.filter((c:any)=>!onlyCharacter || c.id===onlyCharacter);
if (!selected.length) throw new Error(`Unknown character: ${onlyCharacter}`);

async function exists(p:string){try{await fs.access(p);return true}catch{return false}}

async function generateTextOnly(prompt:string){
  const r=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{Authorization:`Bearer ${API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:cfg.imageModel,prompt,n:1,size:cfg.size,quality:cfg.quality,background:cfg.background,output_format:'png'})});
  if(!r.ok) throw new Error(`Image API ${r.status}: ${await r.text()}`);
  const json:any=await r.json(); if(!json.data?.[0]?.b64_json) throw new Error('Image API returned no image');
  return Buffer.from(json.data[0].b64_json,'base64');
}

async function generateFromReference(prompt:string,referencePath:string){
  const image=await fs.readFile(referencePath); const form=new FormData();
  for(const [k,v] of Object.entries({model:cfg.imageModel,prompt,n:'1',size:cfg.size,quality:cfg.quality,background:cfg.background,output_format:'png',input_fidelity:'high'})) form.append(k,String(v));
  form.append('image',new Blob([image],{type:'image/png'}),'master.png');
  const r=await fetch('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:`Bearer ${API_KEY}`},body:form});
  if(!r.ok) throw new Error(`Image Edit API ${r.status}: ${await r.text()}`);
  const json:any=await r.json(); if(!json.data?.[0]?.b64_json) throw new Error('Image Edit API returned no image');
  return Buffer.from(json.data[0].b64_json,'base64');
}

function promptFor(c:any,manifest:any,pose:any){
 return `COLLECTIVERSE HUMANIZED CHARACTER PRODUCTION ASSET.
Character: ${c.name}.
Character lock: ${manifest.lock}
POSE: ${pose[1]}.
The supplied image is the canonical approved master reference. Preserve exact identity, apparent age, facial geometry, body proportions, hair, eyes, complexion, wardrobe construction, footwear, emblem placement, accessories, and asymmetric left/right details. Do not redesign the character. Only change pose, expression, camera angle, and specifically requested prop. Premium stylized high-detail 3D/CGI comic render. Full body unless the requested camera angle requires otherwise. Clean pure white background. No other characters. Do not invent furniture, scenery, bars, or props. No embedded text, number, pose label, caption, QA graphic, border, signature, or watermark.`;
}

for(const c of selected){
 const manifestPath=path.resolve(c.poseManifest);
 if(!(await exists(manifestPath))){console.log(`[SKIP] ${c.name}: manifest missing`);continue}
 const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
 const referencePath=path.resolve(c.reference); const hasReference=await exists(referencePath);
 if(!hasReference){console.log(`[BLOCKED] ${c.name}: canonical humanized master missing: ${referencePath}`);continue}
 const out=path.resolve('characters',c.faction,c.id,'humanized','poses','generated');
 await fs.mkdir(out,{recursive:true});
 console.log(`[REFERENCE] ${c.name}: ${referencePath}`);
 for(const pose of manifest.poses){
  if(onlyPose && Number(pose[0])!==onlyPose) continue;
  const num=String(pose[0]).padStart(2,'0'); const file=path.join(out,`${c.id}_humanized_${num}.png`);
  const approvedFile=path.resolve('characters',c.faction,c.id,'humanized','poses','approved',`${c.id}_humanized_${num}.png`);
  if(!force && (await exists(file) || await exists(approvedFile))){console.log(`[EXISTS] ${c.name} ${num}`);continue}
  console.log(`[GENERATE] ${c.name} ${num}: ${pose[1]}`);
  const png=await generateFromReference(promptFor(c,manifest,pose),referencePath);
  await fs.writeFile(file,png); console.log(`[STAGED] ${file}`);
 }
}
