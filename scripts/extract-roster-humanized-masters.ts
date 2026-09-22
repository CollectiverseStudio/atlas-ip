import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source=path.resolve('archive/roster-images/import-2026-09/character roster.png');
const meta=await sharp(source).metadata();
if(!meta.width||!meta.height) throw new Error('Cannot read roster dimensions');

// Coordinates are normalized to the approved consolidated roster layout.
// Each box isolates the HUMANIZED half of the character panel and excludes labels as much as possible.
const boxes:any[]=[
 ['heroes','atlas',0.070,0.105,0.080,0.300],
 ['heroes','pixel',0.210,0.105,0.080,0.300],
 ['heroes','forge',0.570,0.105,0.080,0.300],
 ['heroes','porter',0.710,0.105,0.080,0.300],
 ['heroes','echo',0.850,0.105,0.080,0.300],
 ['villains','director',0.070,0.555,0.060,0.245],
 ['villains','counterfeiter',0.195,0.555,0.060,0.245],
 ['villains','restorer',0.320,0.555,0.060,0.245],
 ['villains','hacker',0.445,0.555,0.060,0.245],
 ['villains','hoarder',0.570,0.555,0.060,0.245],
 ['villains','vault',0.695,0.555,0.060,0.245],
 ['villains','whisper',0.820,0.555,0.060,0.245],
 ['villains','smuggler',0.940,0.555,0.058,0.245]
];

for(const [faction,id,x,y,w,h] of boxes){
 const left=Math.max(0,Math.floor(meta.width*x)),top=Math.max(0,Math.floor(meta.height*y));
 const width=Math.min(meta.width-left,Math.floor(meta.width*w)),height=Math.min(meta.height-top,Math.floor(meta.height*h));
 const out=path.resolve('characters',faction,id,'humanized','master','master.png');
 await fs.mkdir(path.dirname(out),{recursive:true});
 await sharp(source).extract({left,top,width,height}).resize(1024,1536,{fit:'contain',background:'#ffffff'}).png().toFile(out);
 console.log(`${id}: ${out}`);
}
