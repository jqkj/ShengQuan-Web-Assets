/* Wiki-style resources. Names and references checked against CK3 texticon registries; drawn glyphs are original. */
(()=>{
"use strict";
const ICONS=[{"id":"gold","zh":"金币","en":"Gold","macro":"gold_icon","texture":"gfx/interface/icons/icon_gold.dds","color":"#cda852","glyph":"●","description":"王朝经营与部分互动使用的金币。","enDescription":"A widely used currency in realm management and interactions.","group":"vanilla"},{"id":"prestige","zh":"威望","en":"Prestige","macro":"prestige_icon","texture":"gfx/interface/icons/modifiers/icon_prestige_01.dds","color":"#d0ab7c","glyph":"♛","description":"角色的世俗声望；例如骑士团召集可能花费威望。","enDescription":"An individual's secular standing, potentially used to rally knights.","group":"vanilla"},{"id":"piety","zh":"虔诚","en":"Piety","macro":"piety_icon","texture":"gfx/interface/icons/modifiers/icon_piety_christian_01.dds","color":"#8caec3","glyph":"✧","description":"宗教资源；游戏根据宗教有不同的图像变体。","enDescription":"Faith-linked resource; vanilla artwork varies by religion.","group":"vanilla"},{"id":"renown","zh":"宗族威望","en":"Dynasty Renown","macro":"dynasty_prestige_icon","texture":"gfx/interface/icons/modifiers/icon_dynasty_prestige_01.dds","color":"#90bda0","glyph":"♧","description":"宗族层面的名望，不等于个人威望。","enDescription":"Dynastic reputation, distinct from personal Prestige.","group":"vanilla"},{"id":"influence","zh":"影响力","en":"Influence","macro":"influence_icon","texture":"gfx/interface/icons/modifiers/icon_influence_01.dds","color":"#b29ccb","glyph":"✦","description":"部分政体使用的政治资源，并非所有角色都拥有。","enDescription":"A political currency restricted to relevant government mechanics.","group":"vanilla"},{"id":"prowess","zh":"勇武","en":"Prowess","macro":"skill_prowess_icon","texture":"gfx/interface/icons/icon_prowess.dds","color":"#9caec7","glyph":"⚔","description":"角色的战斗能力，是属性而不是可支付货币。","enDescription":"A combat attribute, not a spendable currency.","group":"vanilla"},{"id":"treasury","zh":"国库","en":"Treasury","macro":"treasury_icon","texture":"gfx/interface/icons/icon_imperial_treasury.dds","color":"#d0b68d","glyph":"▣","description":"本体登记的国库标识，是否出现取决于政体与玩法。","enDescription":"A registered treasury icon; its use depends on government and feature.","group":"vanilla"},{"id":"time","zh":"时间与冷却","en":"Time & Cooldown","macro":"time_icon","texture":"gfx/interface/icons/icon_time.dds","color":"#9ebac7","glyph":"⌛","description":"显示年限与冷却条件，不代表可支付资源。","enDescription":"Represents time and cooldowns, not spendable resources.","group":"vanilla"},{"id":"imperialGrace","zh":"帝国恩典","en":"Imperial Grace","macro":"imperial_grace","texture":"gfx/interface/icons/icon_imperial_grace.dds","color":"#cabb85","glyph":"☼","description":"原版登记名，不可直接等同阿斯塔特战士自身的恩典储量。","enDescription":"A base-game registry; not the same as each Astartes Warrior's personal Grace.","group":"vanilla"},{"id":"oathBlood","zh":"功业血纹","en":"Oath Blood","macro":"jic_oath_board_blood_icon","texture":"gfx/interface/illustrations/jic_oath_board/blood.dds","color":"#ba6979","glyph":"◆","description":"圣泉功业的自定义图标，不是 CK3 通用货币。","enDescription":"A custom Sacred Spring commission-system icon, not a vanilla currency.","group":"mod"},{"id":"oathToken","zh":"功业印记","en":"Oath Token","macro":"jic_oath_board_token_icon","texture":"gfx/interface/illustrations/jic_oath_board/token.dds","color":"#83baaa","glyph":"◇","description":"圣泉功业的自定义图标，不是 CK3 通用货币。","enDescription":"A custom Sacred Spring commission-system icon, not a vanilla currency.","group":"mod"}];
const ICONMAP=Object.fromEntries(ICONS.map(x=>[x.id,x]));
const html=document.documentElement;
const toggle=document.querySelector("[data-lang-switch]");
const tr=(z,e)=>'<span class="zh">'+z+'</span><span class="en">'+e+'</span>';
let lastLang="zh",saved="";
try{saved=localStorage.getItem("sq-language")||""}catch(_){}
function symbol(id){
 const cfg=ICONMAP[id],node=document.createElement("span");node.className="ck3-symbol";node.dataset.icon=id;
 node.style.setProperty("--ck3-color",cfg.color);node.setAttribute("aria-hidden","true");
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 28 28");svg.setAttribute("focusable","false");
 const base=document.createElementNS("http://www.w3.org/2000/svg","circle");base.setAttribute("cx","14");base.setAttribute("cy","14");base.setAttribute("r","11");base.setAttribute("fill","none");base.setAttribute("stroke","currentColor");base.setAttribute("stroke-width","1");
 svg.append(base);
 const t=document.createElementNS("http://www.w3.org/2000/svg","text");t.setAttribute("x","14");t.setAttribute("y","18.5");t.setAttribute("text-anchor","middle");t.setAttribute("font-size",cfg.id==="prowess"?"16":"17");t.setAttribute("font-weight","700");t.setAttribute("font-family","Georgia,serif");t.setAttribute("fill","currentColor");t.textContent=cfg.glyph;
 svg.append(t);node.append(svg);return node;
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
 const relevant=Object.keys(patterns).filter(k=>patterns[k].test(s)).slice(0,7);
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
 const caption=document.createElement("p");caption.innerHTML=tr('注册名依照 CK3 本体；矢量图案由本站绘制。<a href="resources.html">查看完整图例 ↗</a>','Icon registries from CK3; site-drawn glyphs. <a href="resources.html">Full glossary ↗</a>');catalog.append(caption);note.after(catalog);
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
 const host=document.querySelector("[data-wiki-catalog]");if(!host)return;
 host.querySelectorAll("[data-glyph]").forEach(slot=>{const id=slot.dataset.glyph;if(ICONMAP[id])slot.append(symbol(id))});
}
articlePanel();annotateValues();directory();glossary();
const progress=document.querySelector(".progress");let scheduled=false;
function onScroll(){if(progress){const limit=document.documentElement.scrollHeight-innerHeight;progress.style.width=(limit>0?Math.min(100,window.scrollY/limit*100):0).toFixed(2)+"%"}scheduled=false;}
addEventListener("scroll",()=>{if(!scheduled){scheduled=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
window.SQ_WIKI_RESOURCE_TEST={iconKeys:ICONS.map(x=>x.macro),iconCount:ICONS.length,originalArtwork:true,topicCards:document.querySelectorAll(".topic-card").length};
})();
