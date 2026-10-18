import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const web=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(web,'pendant-cad/build');
const assets=path.join(web,'public/device/pendant-v4');await mkdir(assets,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewport({width:2000,height:2400,deviceScaleFactor:1});
 for(const [name,query] of [['card','screen=card'],['medications','screen=medications'],['contacts','screen=contacts'],['preferences','screen=preferences'],['conditions','screen=conditions'],['request','screen=request'],['front','screen=card&angle=front'],['necklace','screen=card&necklace=1']]) {
  await page.goto('http://127.0.0.1:3110/scripts/pendant-preview/render.html?'+query,{waitUntil:'networkidle0'});
  await page.waitForFunction(()=>window.cadReady===true);
  const data=await page.$eval('canvas',node=>node.toDataURL('image/png').split(',')[1]);
  const png=Buffer.from(data,'base64');await writeFile(path.join(out,'pendant-'+name+'.png'),png);
  await sharp(png).webp({quality:94}).toFile(path.join(assets,'pendant-'+name+'.webp'));
 }
 if(errors.length)throw Error(JSON.stringify(errors));
 for(const name of ['card','medications','contacts','preferences','conditions','request'])await writeFile(path.join(assets,'screen-'+name+'.png'),await readFile(path.join(out,'screen-'+name+'.png')));
 await writeFile(path.join(assets,'controls.json'),await readFile(path.join(out,'controls.json')));
 await writeFile(path.join(assets,'provenance.json'),await readFile(path.join(out,'provenance.json')));
 console.log('PASS: eight local CAD renders, actual 200x200 SD UI textures, no browser errors.');
}finally{await browser.close();}
