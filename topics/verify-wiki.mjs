#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const listing=read('topics/index.html');
const matches=[...listing.matchAll(/<article class="topic-card"><a href="([^"]+[.]html)"/g)].map(x=>x[1]);
assert.equal(matches.length,35,'Expected 35 topic-card anchors');
assert.equal(new Set(matches).size,matches.length,'Duplicate topic links');
for(const entry of matches){
 const file=path.resolve(here,entry);
 assert.ok(file.startsWith(here+path.sep),'Unsafe topic link');
 assert.ok(fs.existsSync(file),'Missing topic page: '+entry);
 const html=fs.readFileSync(file,'utf8');
 assert.ok(html.includes('src="theme.js"'),'Missing shared JS: '+entry);
 assert.ok(html.includes('href="style.css"'),'Missing shared CSS: '+entry);
 assert.ok(html.includes('class="article"'),'Missing article content: '+entry);
 for(const match of html.matchAll(/href="#([^"]+)"/g)){
  assert.ok(html.includes('id="'+match[1]+'"')||html.includes('name="'+match[1]+'"'),'Broken on-page anchor '+entry+'#'+match[1]);
 }
 for(const match of html.matchAll(/href="((?:[.][.]\/)?[^"#]+[.]html)(?:#[^"]*)?"/g)){
  const local=path.resolve(here,match[1]);
  assert.ok(fs.existsSync(local),'Missing linked HTML from '+entry+': '+match[1]);
 }
}
assert.equal((listing.match(/class="directory-group"/g)||[]).length,7,'Unexpected category count');
const glossary=read('topics/resources.html');
assert.equal((glossary.match(/class="resource-glossary-item"/g)||[]).length,11,'Changed macro count');
assert.ok(glossary.includes('data-piety-variants'),'Missing religion variants');
for(const category of ['resource','system'])assert.ok(glossary.includes('data-ck3-flat="'+category+'"'),'Missing flat icon group '+category);
const js=read('topics/theme.js');
new Function(js);
assert.ok(js.includes('OFFICIAL_ICON_ARTWORK'),'Missing original reference map');
const manifest=JSON.parse(read('assets/ck3-ui/texticons/manifest.json'));
assert.equal(manifest.textures.length,6,'Expected six colored reference PNGs');
for(const item of manifest.textures){
 const png=fs.readFileSync(path.join(root,'assets/ck3-ui/texticons',item.site_png));
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a','Not a PNG: '+item.site_png);
 assert.equal(png.readUInt32BE(16),item.dimensions[0],'PNG width mismatch');
 assert.equal(png.readUInt32BE(20),item.dimensions[1],'PNG height mismatch');
}
for(const rel of ['versions/index.html','versions/3.1.6.1.html','versions/3.1.6.html','versions/3.1.5.html','versions/versions.css'])assert.ok(fs.existsSync(path.join(root,rel)),'Missing version page/stylesheet '+rel);
assert.ok(fs.existsSync(path.join(root,'assets/releases/3.1.6.1/dragon-horns-gallery.avif')),'Missing release gallery');
assert.ok(listing.includes('id="chaos"'),'Missing Chaos directory anchor');
const flat=JSON.parse(read('assets/ck3-ui/manifest.json'));
assert.equal(flat.images.length,12,'Expected twelve flat UI PNGs');
for(const item of flat.images)assert.ok(fs.existsSync(path.join(root,'assets/ck3-ui',item.png)),'Missing flat UI image '+item.png);
console.log('PASS: 35 standalone guides, valid internal anchors and HTML links, 3 release pages, 11 macro entries, 6 colored and 12 flat PNGs');
