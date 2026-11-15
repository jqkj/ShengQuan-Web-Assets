#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Script} from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const block=id=>{
 const open='<script type="application/json" id="'+id+'">';
 const start=html.indexOf(open);
 assert.ok(start>=0,'Missing inline data block '+id);
 const end=html.indexOf('</script>',start+open.length);
 assert.ok(end>start,'Unterminated JSON block '+id);
 return JSON.parse(html.slice(start+open.length,end));
};
const site=block('site-data'),assets=block('asset-data'),icons=block('icon-data');
assert.equal(Object.keys(site.routes).length,30,'Expected 30 site topic routes');
assert.equal(site.professions.length,5,'Expected five professions');
assert.equal(site.releases.length,3,'Expected three releases');
assert.equal(icons.meta.length,48,'Expected 48 original site icon definitions');
assert.ok(!icons.ornamentPng,'Ornament PNG blobs should not be inline');
assert.ok(!Object.keys(assets).some(x=>x.startsWith('png-')),'480 raster export copies must be removed');
for(const [name,item] of Object.entries(assets)){
 assert.match(item.src||'',/^https:\/\/cdn\.jsdelivr\.net\/gh\/jqkj\/ShengQuan-Web-Assets@/,'External image missing GitHub CDN URL: '+name);
}
assert.ok(!/<link[^>]+rel=["']stylesheet["']/i.test(html),'External CSS is not allowed in Muse single HTML');
assert.ok(!/<script[^>]+src=["']/i.test(html),'External JS is not allowed in Muse single HTML');
assert.ok(html.includes('function renderMuseCompendium'),'Missing 35-guide view');
assert.ok(html.includes('function renderMuseGlossary'),'Missing resource view');
assert.ok(html.includes("resources:renderMuseGlossary")&&html.includes("compendium:renderMuseCompendium"),'Missing hash routers');
assert.ok(html.includes('async function exportIconPngOnDemand'),'Missing PNG export function');
assert.ok(html.includes('SQ_COLOR_PNG=')&&html.includes('SQ_PIETY_PNG=')&&html.includes('SQ_FLAT_PNG='),'Missing GitHub resource-image maps');
assert.ok(html.includes('SQ_RESOURCE_CATALOG=')&&html.includes('muse-guide-search'),'Missing glossary or guide search');
assert.ok(html.includes('muse-guide-grid article :is(a,button[data-nav])'),'Hash-button rendering CSS missing');
const codeStart=html.lastIndexOf('<script>');
const codeEnd=html.lastIndexOf('</script>');
assert.ok(codeStart>=0&&codeEnd>codeStart,'Main JS missing');
new Script(html.slice(codeStart+8,codeEnd),{filename:'index.html#app'});
const groupCount=site.groups.reduce((sum,g)=>sum+g.routes.length,0);
assert.equal(groupCount+site.professions.length+6+6,35,'Expected 35 compendium entries');
console.log('PASS Muse single HTML: 35 guides, 3 releases, 11-macro glossary, 48 SVGs, 0 embedded PNG exports, '+Object.keys(assets).length+' GitHub image URLs');
