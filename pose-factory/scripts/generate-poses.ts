import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) throw new Error('OPENAI_API_KEY is required');

const ROOT = path.resolve('pose-factory');
const cfg = JSON.parse(await fs.readFile(path.join(ROOT,'config/characters.json'),'utf8'));

const arg = process.argv.find(a=>a.startsWith('--character='));
const onlyCharacter = arg?.split('=')[1];
const selected = cfg.characters.filter((c:any)=>!onlyCharacter || c.id===onlyCharacter);
if (!selected.length) throw new Error(`Unknown character: ${onlyCharacter}`);

async function exists(p:string){try{await fs.access(p);return true}catch{return false}}

async function generate(prompt:string){
  const r = await fetch('https://api.openai.com/v1/images/generations',{
    method:'POST',
    headers:{'Authorization':`Bearer ${API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      model:cfg.imageModel,
      prompt,
      n:1,
      size:cfg.size,
      quality:cfg.quality,
      background:cfg.background,
      output_format:'png'
    })
  });
  if(!r.ok) throw new Error(`Image API ${r.status}: ${await r.text()}`);
  const json:any=await r.json();
  if(!json.data?.[0]?.b64_json) throw new Error('Image API returned no image');
  return Buffer.from(json.data[0].b64_json,'base64');
}

function promptFor(c:any, manifest:any, pose:any){
  return `COLLECTIVERSE HUMANIZED CHARACTER PRODUCTION ASSET.\nCharacter: ${c.name}.\nCharacter lock: ${manifest.lock}\nPOSE: ${pose[1]}.\nMaintain exact same face, apparent age, body proportions, hair, eye color, complexion, wardrobe construction, footwear, emblem placement and asymmetric details as the approved master reference. Only change pose/expression/camera angle/approved prop. Premium stylized high-detail 3D/CGI comic character render. Full body unless the requested camera angle requires otherwise. Clean pure white background. No other characters. No embedded text, numbers, pose labels, captions, QA graphics, border, signature or watermark. Final production asset.`;
}

for(const c of selected){
  const manifestPath=path.resolve(c.poseManifest);
  if(!(await exists(manifestPath))){console.log(`[SKIP] ${c.name}: manifest missing`);continue}
  const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
  const out=path.join(ROOT,'output',c.id,'approved');
  await fs.mkdir(out,{recursive:true});
  for(const pose of manifest.poses){
    const num=String(pose[0]).padStart(2,'0');
    const file=path.join(out,`${c.id}_${num}.png`);
    if(await exists(file)){console.log(`[EXISTS] ${c.name} ${num}`);continue}
    console.log(`[GENERATE] ${c.name} ${num}: ${pose[1]}`);
    const png=await generate(promptFor(c,manifest,pose));
    await fs.writeFile(file,png);
    console.log(`[SAVED] ${file}`);
  }
}
