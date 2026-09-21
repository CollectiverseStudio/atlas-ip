import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const arg=(name:string)=>process.argv.find(x=>x.startsWith(`--${name}=`))?.split('=')[1];
const faction=arg('faction'); const character=arg('character'); const form=arg('form')||'original';
if(!faction||!character) throw new Error('Usage: --faction=heroes|villains --character=<id> [--form=original|humanized]');
const dir=path.resolve('characters',faction,character,form,'poses','approved');
const files=(await fs.readdir(dir)).filter(f=>f.toLowerCase().endsWith('.png')).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
if(!files.length) throw new Error(`No PNGs in ${dir}`);
const thumbW=240,thumbH=300,cols=5,rows=Math.ceil(files.length/cols),labelH=28;
const composites:any[]=[];
for(let i=0;i<files.length;i++){
 const buf=await sharp(path.join(dir,files[i])).resize(thumbW,thumbH,{fit:'contain',background:'#ffffff'}).png().toBuffer();
 const x=(i%cols)*thumbW,y=Math.floor(i/cols)*(thumbH+labelH);
 composites.push({input:buf,left:x,top:y});
 const svg=Buffer.from(`<svg width="${thumbW}" height="${labelH}"><rect width="100%" height="100%" fill="white"/><text x="50%" y="20" text-anchor="middle" font-family="Arial" font-size="15" fill="black">${files[i].replace(/[&<>]/g,'')}</text></svg>`);
 composites.push({input:svg,left:x,top:y+thumbH});
}
const outDir=path.resolve('characters',faction,character,form,'contact-sheet'); await fs.mkdir(outDir,{recursive:true});
const out=path.join(outDir,`${character}_${form}_contact_sheet.png`);
await sharp({create:{width:cols*thumbW,height:rows*(thumbH+labelH),channels:3,background:'#ffffff'}}).composite(composites).png().toFile(out);
console.log(out);
