/* Wiki-style resources. Names and references checked against CK3 texticon registries; drawn glyphs are original. */
(()=>{
"use strict";
const ICONS=[{"id":"gold","zh":"金币","en":"Gold","macro":"gold_icon","texture":"gfx/interface/icons/icon_gold.dds","color":"#cda852","glyph":"●","description":"王朝经营与部分互动使用的金币。","enDescription":"A widely used currency in realm management and interactions.","group":"vanilla"},{"id":"prestige","zh":"威望","en":"Prestige","macro":"prestige_icon","texture":"gfx/interface/icons/modifiers/icon_prestige_01.dds","color":"#d0ab7c","glyph":"♛","description":"角色的世俗声望；例如骑士团召集可能花费威望。","enDescription":"An individual's secular standing, potentially used to rally knights.","group":"vanilla"},{"id":"piety","zh":"虔诚","en":"Piety","macro":"piety_icon","texture":"gfx/interface/icons/modifiers/icon_piety_christian_01.dds","color":"#8caec3","glyph":"✧","description":"宗教资源；游戏根据宗教有不同的图像变体。","enDescription":"Faith-linked resource; vanilla artwork varies by religion.","group":"vanilla"},{"id":"renown","zh":"宗族威望","en":"Dynasty Renown","macro":"dynasty_prestige_icon","texture":"gfx/interface/icons/modifiers/icon_dynasty_prestige_01.dds","color":"#90bda0","glyph":"♧","description":"宗族层面的名望，不等于个人威望。","enDescription":"Dynastic reputation, distinct from personal Prestige.","group":"vanilla"},{"id":"influence","zh":"影响力","en":"Influence","macro":"influence_icon","texture":"gfx/interface/icons/modifiers/icon_influence_01.dds","color":"#b29ccb","glyph":"✦","description":"部分政体使用的政治资源，并非所有角色都拥有。","enDescription":"A political currency restricted to relevant government mechanics.","group":"vanilla"},{"id":"prowess","zh":"勇武","en":"Prowess","macro":"skill_prowess_icon","texture":"gfx/interface/icons/icon_prowess.dds","color":"#9caec7","glyph":"⚔","description":"角色的战斗能力，是属性而不是可支付货币。","enDescription":"A combat attribute, not a spendable currency.","group":"vanilla"},{"id":"treasury","zh":"国库","en":"Treasury","macro":"treasury_icon","texture":"gfx/interface/icons/icon_imperial_treasury.dds","color":"#d0b68d","glyph":"▣","description":"本体登记的国库标识，是否出现取决于政体与玩法。","enDescription":"A registered treasury icon; its use depends on government and feature.","group":"vanilla"},{"id":"time","zh":"时间与冷却","en":"Time & Cooldown","macro":"time_icon","texture":"gfx/interface/icons/icon_time.dds","color":"#9ebac7","glyph":"⌛","description":"显示年限与冷却条件，不代表可支付资源。","enDescription":"Represents time and cooldowns, not spendable resources.","group":"vanilla"},{"id":"imperialGrace","zh":"帝国恩典","en":"Imperial Grace","macro":"imperial_grace","texture":"gfx/interface/icons/icon_imperial_grace.dds","color":"#cabb85","glyph":"☼","description":"原版登记名，不可直接等同阿斯塔特战士自身的恩典储量。","enDescription":"A base-game registry; not the same as each Astartes Warrior's personal Grace.","group":"vanilla"},{"id":"oathBlood","zh":"功业血纹","en":"Oath Blood","macro":"jic_oath_board_blood_icon","texture":"gfx/interface/illustrations/jic_oath_board/blood.dds","color":"#ba6979","glyph":"◆","description":"圣泉功业的自定义图标，不是 CK3 通用货币。","enDescription":"A custom Sacred Spring commission-system icon, not a vanilla currency.","group":"mod"},{"id":"oathToken","zh":"功业印记","en":"Oath Token","macro":"jic_oath_board_token_icon","texture":"gfx/interface/illustrations/jic_oath_board/token.dds","color":"#83baaa","glyph":"◇","description":"圣泉功业的自定义图标，不是 CK3 通用货币。","enDescription":"A custom Sacred Spring commission-system icon, not a vanilla currency.","group":"mod"}];
const ICONMAP=Object.fromEntries(ICONS.map(x=>[x.id,x]));
/* Flat UI reference PNGs are distinct from the color images referenced by @texticon! macros. */
const FLAT_UI_REFERENCES=[{"id":"prestige","zh":"威望","en":"Prestige","src":"../assets/ck3-ui/flat/prestige.png","source":"gfx/interface/icons/flat_icons/prestige.dds"},{"id":"piety","zh":"虔诚","en":"Piety","src":"../assets/ck3-ui/flat/piety.png","source":"gfx/interface/icons/flat_icons/piety.dds"},{"id":"time","zh":"时间","en":"Time","src":"../assets/ck3-ui/flat/time.png","source":"gfx/interface/icons/flat_icons/time.dds"},{"id":"treasury","zh":"国库","en":"Treasury","src":"../assets/ck3-ui/flat/treasury.png","source":"gfx/interface/icons/flat_icons/treasury.dds"}];
function flatReferenceImage(item){
 const img=document.createElement("img");img.src=item.src;img.alt="";img.width=60;img.height=60;img.loading="lazy";img.decoding="async";
 img.addEventListener("error",()=>{img.hidden=true;img.parentElement?.classList.add("is-missing");},{once:true});
 return img;
}

const html=document.documentElement;
const toggle=document.querySelector("[data-lang-switch]");
const tr=(z,e)=>'<span class="zh">'+z+'</span><span class="en">'+e+'</span>';
let lastLang="zh",saved="";
try{saved=localStorage.getItem("sq-language")||""}catch(_){}
const resourceGeometry={"gold":"<circle cx=\"10\" cy=\"11\" r=\"6.9\"/><circle cx=\"15\" cy=\"14\" r=\"5.3\"/><path d=\"M7.5 11h5M10 8.7v4.6m2.6 1.1h4.5\"/>","prestige":"<path d=\"m3 7.5 4 3 5-6 5 6 4-3-2 11H5z\"/><path d=\"M5.5 15h13M6 20h12\"/>","piety":"<path d=\"M11 2h2l1 5 4 2-1 4-5 9-5-9-1-4 4-2z\"/><path d=\"M8 11h8M12 5v12\"/>","renown":"<path d=\"M12 22V7m0 8-5-5m5 2 5-5M6 22h12\"/><path d=\"M12 5c-4-4-9 0-9 5 0 3 3 5 6 4m3-9c5-3 9 0 9 5 0 3-3 5-6 4\"/>","influence":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m12 5 2 5 5 2-5 2-2 5-2-5-5-2 5-2z\"/>","prowess":"<path d=\"M4 4l16 16M20 4 4 20M6 15l3 3m6-12 3 3M3 18l3 3m12-18 3 3\"/>","treasury":"<rect x=\"3.5\" y=\"7.5\" width=\"17\" height=\"13\" rx=\"1\"/><path d=\"m3.5 8 8.5 5 8.5-5M12 13v7.5M4.5 5h15\"/>","time":"<path d=\"M6 2.5h12M6 21.5h12M7 3.5c0 6 5 6 5 8.5s-5 4-5 8.5m10-17c0 6-5 6-5 8.5s5 4 5 8.5\"/><path d=\"M9 9h6m-6 9h6\"/>","imperialGrace":"<circle cx=\"12\" cy=\"12\" r=\"4.4\"/><path d=\"M12 1v5m0 12v5M1 12h5m12 0h5M4 4l3.5 3.5m9 9L20 20m0-16-3.5 3.5m-9 9L4 20\"/>","oathBlood":"<path d=\"M12 2C8 8 5 12 5 15a7 7 0 0 0 14 0c0-3-3-7-7-13z\"/><path d=\"M8.5 15.5c0 2 1 3 3 3\"/>","oathToken":"<path d=\"m12 2 8.5 5v10L12 22l-8.5-5V7z\"/><path d=\"m12 6 5 6-5 6-5-6z\"/>"};
function symbol(id){
 const cfg=ICONMAP[id],node=document.createElement("span");node.className="ck3-symbol";node.dataset.icon=id;
 node.style.setProperty("--ck3-color",cfg.color);node.setAttribute("aria-hidden","true");
 node.innerHTML='<svg viewBox="0 0 24 24" focusable="false" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.65">'+resourceGeometry[id]+"</g></svg>";
 return node;
}
function chip(id){
 const cfg=ICONMAP[id],root=document.createElement("span");root.className="ck3-resource-chip";root.dataset.macro=cfg.macro;
 root.title="@"+cfg.macro+"!";root.append(symbol(id));
 const label=document.createElement("span");label.className="zh";label.textContent=cfg.zh;root.append(label);
 const english=document.createElement("span");english.className="en";english.textContent=cfg.en;root.append(english);
 return root;
}
function switchTo(language){
 const v=language==="en"?"en":"zh";lastLang=v;html.dataset.lang=v;html.lang=v==="en"?"en":"zh-CN";
 if(toggle){toggle.textContent=v==="en"?"中文":"EN";toggle.setAttribute("aria-label",v==="en"?"Switch to Chinese":"切换到英文");}
 try{localStorage.setItem("sq-language",v)}catch(_){}
 if(window.SQ_WIKI_REFRESH)window.SQ_WIKI_REFRESH();
}
switchTo(new URLSearchParams(location.search).get("lang")||saved||"zh");
if(toggle)toggle.addEventListener("click",()=>switchTo(lastLang==="en"?"zh":"en"));
const patterns={
gold:/金币|黄金|Gold/i,prestige:/威望|Prestige/i,piety:/虔诚|Piety/i,
renown:/宗族威望|Renown/i,influence:/影响力|Influence/i,prowess:/勇武|Prowess/i,
treasury:/国库储备|Treasury/i,time:/冷却|间隔|Cooldown/i,
oathBlood:/功业血纹/i,oathToken:/功业印记|凝露|Oath Token/i
};
function articlePanel(){
 const article=document.querySelector("article.article");if(!article)return;
 const s=[...article.querySelectorAll(".story.zh,.quick .zh,.rules .zh")].map(x=>x.textContent).join(" ");
 const relevant=Object.keys(patterns).filter(k=>patterns[k].test(k==="prestige"?s.replace(/宗族威望/g,""):s)).slice(0,7);
 const panel=document.createElement("section");panel.className="wiki-resource-panel";panel.id="resources";
 const header=document.createElement("div");header.className="wiki-resource-heading";header.innerHTML='<h2>'+tr("玩法速览","At a glance")+'</h2><a href="resources.html">'+tr("货币与图标词典 ↗","Resource glossary ↗")+"</a>";panel.append(header);
 if(relevant.length){const line=document.createElement("div");line.className="wiki-resource-row";const strong=document.createElement("strong");strong.innerHTML=tr("本文涉及","Mentioned resources");line.append(strong);
 const icons=document.createElement("div");icons.className="wiki-resource-chips";relevant.forEach(k=>icons.append(chip(k)));line.append(icons);panel.append(line);}
 else{const hint=document.createElement("p");hint.innerHTML=tr("这篇主要介绍人物、身份或安装事项，没有固定的通用货币清单。","This topic focuses on roles or guidance, with no universal currency list.");panel.append(hint);}
 const fine=document.createElement("p");fine.className="wiki-resource-note";fine.innerHTML=tr("仅表示文本涉及的资源或属性，并非固定消耗、奖励或保底。本站使用自绘示意图，不是官方 DDS 原图；金额与条件以游戏为准。","Mentioned terms are not guaranteed costs, rewards or drop rates. These are original site glyphs, not the official DDS images; check the game for precise values.");panel.append(fine);
 article.insertBefore(panel,article.firstChild);
}
function annotateValues(){
 const cn=/([0-9][0-9,.]*)(\s*)(宗族威望|金币|威望|虔诚|影响力|勇武)/;
 const en=/([0-9][0-9,.]*)(\s+)(Gold|Prestige|Piety|Renown|Influence|Prowess)\b/i;
 const lookup={金币:"gold",威望:"prestige",虔诚:"piety",宗族威望:"renown",影响力:"influence",勇武:"prowess",gold:"gold",prestige:"prestige",piety:"piety",renown:"renown",influence:"influence",prowess:"prowess"};
 for(const el of document.querySelectorAll(".quick dd,.rule-content p,.ability p,.ability li")){
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement?.closest("a,code,pre,summary,svg,.wiki-resource-number"))nodes.push(n);}
  let used=0;
  for(const n of nodes){if(used>=2)break;const value=n.nodeValue||"",english=!!n.parentElement?.closest(".en"),match=value.match(english?en:cn);if(!match)continue;
   const key=lookup[english?match[3].toLowerCase():match[3]];if(!key)continue;
   const i=match.index,frag=document.createDocumentFragment(),span=document.createElement("span");span.className="wiki-resource-number";span.append(symbol(key),document.createTextNode(match[0]));
   frag.append(document.createTextNode(value.slice(0,i)),span,document.createTextNode(value.slice(i+match[0].length)));
   n.parentNode.replaceChild(frag,n);used++;
  }
 }
}
function directory(){
 const groups=[...document.querySelectorAll(".directory-group")],note=document.querySelector(".notice");if(!groups.length||!note)return;
 const catalog=document.createElement("section");catalog.className="wiki-resource-catalog";
 const heading=document.createElement("h2");heading.innerHTML=tr("CK3 资源速查","CK3 resource index");catalog.append(heading);
 const icons=document.createElement("div");icons.className="wiki-resource-chips";["gold","prestige","piety","renown","influence","prowess"].forEach(k=>icons.append(chip(k)));catalog.append(icons);
 const caption=document.createElement("p");caption.innerHTML=tr('注册名依照 CK3 本体；矢量图案由本站绘制。<a href="resources.html">查看完整图例 ↗</a>','Icon registries from CK3; site-drawn glyphs. <a href="resources.html">Full glossary ↗</a>');
 catalog.append(caption);
 const preview=document.createElement("div");preview.className="wiki-flat-preview";
 const previewTitle=document.createElement("strong");previewTitle.innerHTML=tr("原版 UI 图案 · 扁平图标参考","Vanilla UI emblems · flat-icon samples");preview.append(previewTitle);
 const previewGrid=document.createElement("div");previewGrid.className="wiki-flat-preview-strip";
 FLAT_UI_REFERENCES.forEach(item=>{const link=document.createElement("a");link.className="wiki-flat-preview-link";link.href="resources.html#vanilla-ui-icons";link.title=item.source;link.append(flatReferenceImage(item));const lbl=document.createElement("span");lbl.innerHTML=tr(item.zh,item.en);link.append(lbl);previewGrid.append(link)});
 preview.append(previewGrid);
 const previewNote=document.createElement("small");previewNote.innerHTML=tr("仅作界面装饰参考，不是上方 @texticon! 的彩色贴图。","UI emblem references only, not the color artwork for the @texticon! macros above.");preview.append(previewNote);
 catalog.append(preview);note.after(catalog);
 const toolbar=document.createElement("section");toolbar.className="wiki-toolbar";
 toolbar.innerHTML='<label for="wiki-search">'+tr("检索 35 篇专题","Search 35 guides")+'</label><input id="wiki-search" type="search" autocomplete="off"><div class="wiki-filters" role="group" aria-label="Topic categories"></div><p class="wiki-filter-count" aria-live="polite"></p>';
 catalog.after(toolbar);
 const names=[["all","全部","All"],["core","主模组","Core"],["roles","五种职业","Roles"],["expansion","独立扩展","Expansions"],["support","支持资料","Support"]];
 const buttons=toolbar.querySelector(".wiki-filters");let active="all",query="";
 names.forEach(([id,zh,en])=>{const button=document.createElement("button");button.type="button";button.className="wiki-filter";button.dataset.filter=id;button.setAttribute("aria-pressed",id===active?"true":"false");button.innerHTML=tr(zh,en);button.addEventListener("click",()=>{active=id;refresh()});buttons.append(button)});
 groups.forEach((g,i)=>g.dataset.section=i<4?"core":i===4?"roles":i===5?"expansion":"support");
 const input=toolbar.querySelector("input");input.addEventListener("input",()=>{query=input.value.trim().toLocaleLowerCase();refresh()});
 function refresh(){let total=0;
  groups.forEach(g=>{let shown=0;g.querySelectorAll(".topic-card").forEach(card=>{
   const match=(active==="all"||g.dataset.section===active)&&(!query||card.textContent.toLocaleLowerCase().includes(query));card.hidden=!match;if(match){shown++;total++;}});g.hidden=shown===0;});
  buttons.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.filter===active?"true":"false"));
  toolbar.querySelector(".wiki-filter-count").textContent=lastLang==="en"?"Showing "+total+" / 35 independent guides":"显示 "+total+" / 35 篇独立专题";
 }
 window.SQ_WIKI_REFRESH=refresh;refresh();
}
function glossary(){
 const host=document.querySelector("[data-wiki-catalog]");
 if(host)host.querySelectorAll("[data-glyph]").forEach(slot=>{const id=slot.dataset.glyph;if(ICONMAP[id])slot.append(symbol(id))});
 const references=document.querySelector("[data-ck3-flat]");if(!references)return;
 FLAT_UI_REFERENCES.forEach(item=>{
  const figure=document.createElement("figure");figure.className="ck3-flat-reference";
  const thumb=document.createElement("div");thumb.className="ck3-flat-image";thumb.append(flatReferenceImage(item));figure.append(thumb);
  const cap=document.createElement("figcaption");const title=document.createElement("strong");title.innerHTML=tr(item.zh,item.en);cap.append(title);
  const path=document.createElement("code");path.textContent=item.source;cap.append(path);figure.append(cap);references.append(figure);
 });
}
articlePanel();annotateValues();directory();glossary();
const progress=document.querySelector(".progress");let scheduled=false;
function onScroll(){if(progress){const limit=document.documentElement.scrollHeight-innerHeight;progress.style.width=(limit>0?Math.min(100,window.scrollY/limit*100):0).toFixed(2)+"%"}scheduled=false;}
addEventListener("scroll",()=>{if(!scheduled){scheduled=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
window.SQ_WIKI_RESOURCE_TEST={iconKeys:ICONS.map(x=>x.macro),iconCount:ICONS.length,originalArtwork:true,flatIconCount:FLAT_UI_REFERENCES.length,flatIconKind:"ui-flat-not-texticon",topicCards:document.querySelectorAll(".topic-card").length};
})();
