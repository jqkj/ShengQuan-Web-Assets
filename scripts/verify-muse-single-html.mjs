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
assert.ok(site.releases.length >= 4,'Earlier releases and the maintenance release must remain available');
assert.equal(new Set(site.releases.map(r=>r.id)).size,site.releases.length,'Duplicate version route');
assert.ok(site.releases.slice(1).every((r,i)=>site.releases[i].date >= r.date),'Order releases newest first');
assert.ok(html.includes('DATA.releases.slice(0,2).map(releaseCard)'),'Home must show the latest two releases');
assert.ok(html.includes('esc(DATA.releases[0].version)'),'Footer must follow the current release');
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

// Release archive metadata is a static-host index, not a dependency of the Muse HTML.
const archive=JSON.parse(fs.readFileSync(path.join(root,'versions/index.json'),'utf8'));
assert.equal(archive.current,site.releases[0].version,'Latest release differs from archive');
assert.equal(archive.entries.length,site.releases.length,'Release archive and Muse entries differ');
assert.equal(archive.static_archive,'versions/index.html','Missing static archive index');
const archivePage=path.join(root,archive.static_archive);
assert.ok(fs.existsSync(archivePage),'Missing static archive index HTML');
const archiveHtml=fs.readFileSync(archivePage,'utf8');
const seenVersions=new Set();
for(const entry of archive.entries){
 assert.ok(!seenVersions.has(entry.version),'Duplicate archive version: '+entry.version);
 seenVersions.add(entry.version);
 const muse=site.releases.find(item=>item.version===entry.version);
 assert.ok(muse,'Archive version missing from Muse: '+entry.version);
 assert.equal(entry.id,muse.id,'Release route ID mismatch: '+entry.version);
 assert.equal(entry.date,muse.date,'Release date mismatch: '+entry.version);
 assert.equal(entry.title_zh,muse.zh.title,'Chinese release title mismatch: '+entry.version);
 assert.equal(entry.title_en,muse.en.title,'English release title mismatch: '+entry.version);
 assert.equal(entry.page,'versions/'+entry.version+'.html','Unexpected static page path');
 assert.equal(entry.document,'versions/'+entry.version+'.md','Unexpected source note path');
 for(const rel of [entry.page,entry.document])assert.ok(fs.existsSync(path.join(root,rel)),'Missing archive file: '+rel);
 const pageHtml=fs.readFileSync(path.join(root,entry.page),'utf8');
 const english=entry.title_en.replaceAll('&','&amp;');
 assert.ok(pageHtml.includes(entry.title_zh),'Standalone page missing Chinese title: '+entry.version);
 assert.ok(pageHtml.includes(entry.title_en)||pageHtml.includes(english),'Standalone page missing English title: '+entry.version);
 assert.ok(pageHtml.includes('class="release-story zh"')&&pageHtml.includes('class="release-story en"'),'Missing bilingual release body: '+entry.version);
 assert.ok(archiveHtml.includes('href="'+entry.version+'.html"'),'Release archive index missing link: '+entry.version);
}


// Copy-Issue integration invariant: every public guide retains one canonical site narrative.
const issueTopicRoutes=[...Object.keys(site.routes),...site.professions.map(p=>'profession-'+p.id)];
assert.equal(issueTopicRoutes.length,35,'35 Issue guides not represented');
assert.equal(new Set(issueTopicRoutes).size,35,'Duplicate Issue topic route');
for(const [id,entry] of Object.entries(site.routes)){
 assert.ok(Array.isArray(entry.narrative)&&entry.narrative.length>0,'Missing narrative: '+id);
 assert.equal(entry.story,entry.narrative.join('\n\n'),'Search/fallback copy differs from displayed narrative: '+id);
 assert.ok(fs.existsSync(path.join(root,'topics',id+'.html')),'Missing standalone topic: '+id);
}
for(const role of site.professions){
 assert.ok(fs.existsSync(path.join(root,'topics','profession-'+role.id+'.html')),'Missing role article: '+role.id);
}
for(const id of ['c1','c2','c3','c4','c5']){
 assert.equal(site.routes[id].status,'candidate','Chaos guide not marked candidate: '+id);
 assert.match(site.routes[id].summary,/测试候选/,'Chaos summary needs visible candidate qualifier: '+id);
}
assert.match(site.routes.m8.story,/蒙养学段考核/,'Academy hook milestone misrepresented');
assert.match(site.routes.m9.story,/召集加入战争/,'Knight mobilization should describe actual interaction');
assert.match(site.routes.m7.caution,/不等于所有个人免费抽取资格/,'Covenant inheritance caveat missing');
assert.match(site.routes.m16.summary,/14种精钢军械/,'Newly craftable steel count missing');
assert.match(site.routes.status.summary,/工坊/,'Workshop status missing');
assert.match(site.routes.status.summary,/显示名/,'Descriptor version and display name must be distinguished');
assert.ok(!site.routes.unknown.story.includes('且未婚未成阿斯塔特'),'Invented implantation marriage restriction');
assert.match(site.routes.unknown.story,/未婚/,'FAQ correction needs explanatory context');


// Issue #39: compendium uses the plural DOM helper for three collection traversals.
const filterStart=html.indexOf('function filterMuseCompendium(){');
assert.ok(filterStart>=0,'Missing compendium filter');
const filterEnd=html.indexOf('\nfunction ',filterStart+30);
assert.ok(filterEnd>filterStart,'Cannot isolate compendium filter');
const filterSource=html.slice(filterStart,filterEnd);
for(const expr of [
 "$$('[data-muse-group]',main).forEach",
 "$$('[data-muse-card]',group).forEach",
 "$$('[data-muse-filter]').forEach"
])assert.ok(filterSource.includes(expr),'Compendium iteration must use $$: '+expr);
assert.ok(!/(^|[^$])\$\([^\n]+\)\.forEach/m.test(filterSource),'Single-element helper $ cannot be iterated');

console.log('PASS Muse single HTML: 35 guides, '+site.releases.length+' releases, 11-macro glossary, 48 SVGs, 0 embedded PNG exports, '+Object.keys(assets).length+' GitHub image URLs');
