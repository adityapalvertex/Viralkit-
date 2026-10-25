'use strict';
/* ViralKit AI — template-based generator. Change CONFIG.contactEmail to your own address. */
const CONFIG={contactEmail:'adityapalvertex@gmail.com',maxHistory:30,maxFav:300,provider:'local'};
/* Provider layer: add a real AI provider here later (call YOUR OWN backend proxy; never put API keys in frontend code). */
const Providers={local:{label:'Template-based • no AI model',async generate(tool,v){return tool.gen(v)}}};

/* ---------- utils ---------- */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const R=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fill=(s,c)=>s.replace(/\{(\w+)\}/g,(m,k)=>k==='n'&&c.n===undefined?3+Math.floor(Math.random()*8):k==='y'&&c.y===undefined?new Date().getFullYear():c[k]!==undefined?c[k]:m);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const mem={};let storageOK=true,warned=false;
const S={get(k,d){try{const v=localStorage.getItem('vk_'+k);if(v!==null)return JSON.parse(v)}catch(e){storageOK=false}return k in mem?mem[k]:d},
set(k,v){mem[k]=v;try{localStorage.setItem('vk_'+k,JSON.stringify(v))}catch(e){storageOK=false;if(!warned){warned=true;toast('Storage is blocked, so changes last only until you close this tab.')}}}};
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2400)}
async function copyText(s){try{await navigator.clipboard.writeText(s);return true}catch(e){try{const t=document.createElement('textarea');t.value=s;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return !!ok}catch(e2){return false}}}
function download(name,text){try{const b=new Blob([text],{type:'text/plain;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);return true}catch(e){return false}}
const E={professional:'',entertaining:' 😄',educational:' 📚',motivational:' 🚀',promotional:' 🔥'};

/* ---------- engine ---------- */
function mk(v){const l=D[v.lang]?v.lang:'en';return{l,d:D[l],t:(v.topic||'').trim(),a:(v.aud||'').trim()||D[l].aud,p:v.platform||'Instagram',tone:v.tone||'educational',prod:(v.prod||'').trim(),ben:(v.ben||'').trim(),off:(v.offer||'').trim()}}
const pick=(arr,n)=>shuf(arr).slice(0,n);
function ctaLine(c,goal,frame){const d=c.d;let g=goal==='link'&&/YouTube/.test(c.p)?d.gy:d.g[goal];g=fill(g,c);return fill(frame||R(d.fr),{g,G:cap(g)})+E[c.tone]}
function topicTags(t){const w=t.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu,' ').split(/\s+/).filter(x=>x.length>2).slice(0,3);const j=w.join('').slice(0,24);if(!j)return[];return[j,j+'tips','learn'+j,j+'india',j+'forbeginners',j+'hacks',j+'community',j+'ideas',j+'daily','best'+j]}
function nicheTags(t){const l=t.toLowerCase(),o=[];NICHES.forEach(([re,tags])=>{if(re.test(l))o.push(...tags)});return o}
const tags=(c,n)=>topicTags(c.t).slice(0,n).map(x=>'#'+x);
const uniq=a=>[...new Set(a)];

const G={
reel(v){const c=mk(v),d=c.d,np={15:2,30:3,60:5}[v.length]||3,hs=pick(d.hook,3);
 return hs.map((h,i)=>{const pts=shuf(d.pts).concat([d.more,d.more]).slice(0,np).map((s,j)=>`[POINT ${j+1}] ${fill(s,c)}`);
 return `REEL SCRIPT ${i+1} (~${v.length||30}s, ${c.tone})\n[0–3s HOOK] ${fill(h,c)}\n[VISUAL] ${R(VIS)}\n${pts.join('\n')}\n[CLOSER] ${R(d.tp[c.tone])}\n[CTA] ${ctaLine(c,R(['follow','save','comment','like']))}\n[ON-SCREEN TEXT] ${c.t.toUpperCase().slice(0,40)}`})},
hooks(v){const c=mk(v);return pick(c.d.hook,+v.count||8).map(h=>fill(h,c))},
titles(v){const c=mk(v);return pick(c.d.title,+v.count||8).map(h=>fill(h,c))},
ytdesc(v){const c=mk(v),d=c.d;return pick(d.hook,3).map(h=>[fill(h,c),'',fill(d.sum,c),'','Chapters (edit the times):','00:00 Intro','00:45 Main point 1','03:00 Main point 2','05:30 Recap','',d.lk,v.link&&v.link.trim()||'[Add your link here]','',ctaLine({...c,p:'YouTube'},'subscribe'),R(d.tp[c.tone]),'',tags(c,3).concat('#YouTube').join(' ')].join('\n'))},
caption(v){const c=mk(v),d=c.d,op=shuf(d.cap),bd=shuf(d.cb),n=c.p==='LinkedIn'?3:c.p==='X (Twitter)'?2:6;
 return [0,1,2,3].map(i=>{let s=fill(op[i%op.length],c)+E[c.tone];if(v.length!=='short')s+='\n\n'+fill(bd[i%bd.length],c)+' '+R(d.tp[c.tone]);if(v.length==='long')s+='\n\n'+fill(bd[(i+2)%bd.length],c)+'\n\n'+ctaLine(c,R(['follow','save','comment']));return s+'\n\n'+tags(c,n).join(' ')})},
hashtags(v){const c=mk(v),n=+v.count||20,tp=topicTags(c.t),nc=nicheTags(c.t),pl=PTAGS[c.p]||[],ind=INDIA[c.l];
 const mix=(a)=>uniq(a).slice(0,n).map(x=>'#'+x).join(' '),sets=[['MIXED SET',[...tp.slice(0,Math.ceil(n*.4)),...nc,...pl,...ind]],['NICHE-FOCUSED',[...tp,...nc]],['PLATFORM + BROAD',[...pl,...nc,...tp.slice(0,4),...ind]],['INDIA-FOCUSED',[...ind,...tp,...nc,...pl]]];
 return sets.map(([l,a])=>`${l} (${c.p})\n${mix(shuf(a.slice(0,3)).concat(shuf(a.slice(3))))}`)},
ideas(v){const c=mk(v);return pick(c.d.idea,+v.count||8).map(s=>`${fill(s,c)}\nFormat: ${PF[c.p]||'Short video'}\nStarter hook: ${fill(R(c.d.hook),c)}`)},
product(v){const c=mk(v),d=c.d,fs=(v.features||'').split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean).slice(0,8);
 return shuf(d.po).map((o,i)=>fill(o,c)+'\n\n'+R(d.tp[c.tone])+(fs.length?'\n\n'+d.kf+'\n'+fs.map(x=>'• '+x).join('\n'):'')+'\n\n'+fill(d.pc[i%d.pc.length],c))},
ad(v){const c=mk(v),d=c.d,hs=shuf(d.ah.concat(c.off?[d.ao]:[])),bs=shuf(d.ab);
 return [0,1,2,3].map(i=>{const h=c.off&&i===0?d.ao:hs[i%hs.length];return fill(h,c)+'\n'+fill(bs[i%bs.length],c)+'\n'+R(d.tp[c.tone])+(c.off?`\n${d.of} ${c.off}`:'')+'\n'+ctaLine(c,'buy')})},
rewrite(v){const s=(v.text||'').trim();if(v.mode==='hi2hn')return[toHinglish(s)];if(v.mode==='hn2en')return[hn2en(s)];return[tidy(s)]},
outline(v){const c=mk(v),d=c.d,m=+v.length||10,np={5:3,10:5,15:7}[m]||5,pts=()=>shuf(d.pts).concat([d.more,d.more]).slice(0,np),title=fill(R(d.title),c);
 const mkO=(name,mid)=>{const items=[['Intro hook',fill(R(d.hook),c)],...mid,['Call to action',ctaLine(c,'subscribe')]];return `${name} OUTLINE (~${m} min, ${c.tone})\nSuggested title: ${title}\n`+items.map((x,i)=>`${i+1}. ${x[0]}: ${x[1]}`).join('\n')};
 return[mkO('PROBLEM → SOLUTION',[['The problem',fill(d.prob,c)],...pts().map((s,i)=>['Step '+(i+1),fill(s,c)]),['Recap',fill(d.recap,c)]]),
 mkO('LISTICLE',[['Why it matters',fill(d.why,c)],...pts().map((s,i)=>['Tip '+(i+1),fill(s,c)]),['Bonus',fill(d.bonus,c)]]),
 mkO('STORY-DRIVEN',[['Story',fill(d.story,c)],['The challenge',fill(d.prob,c)],...pts().slice(0,Math.max(2,np-1)).map((s,i)=>['Lesson '+(i+1),fill(s,c)]),['Takeaway',fill(d.recap,c)]])]},
cta(v){const c=mk(v),d=c.d;return pick(d.fr,+v.count||8).map(f=>ctaLine(c,v.goal||'follow',f))}};

/* ---------- Hindi → Hinglish transliteration (rule-based, approximate) ---------- */
const IV={'अ':'a','आ':'aa','इ':'i','ई':'ee','उ':'u','ऊ':'oo','ऋ':'ri','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ऑ':'o'};
const MT={'ा':'aa','ि':'i','ी':'ee','ु':'u','ू':'oo','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au','ॉ':'o'};
const CN={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'n','च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'n','ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'sh','ष':'sh','स':'s','ह':'h','\uE000':'gy'};
const NUK={'ज':'z','ड':'r','ढ':'rh','फ':'f','क':'q'};
function trw(w){w=w.replace(/\u091C\u094D\u091E/g,'\uE000');const T=[];
 for(let i=0;i<w.length;i++){const ch=w[i];
  if(CN[ch]!==undefined){let r=CN[ch];if(w[i+1]==='\u093C'){r=NUK[ch]||r;i++}T.push({r,c:1,a:'a',s:1})}
  else if(MT[ch]!==undefined){const L=T[T.length-1];if(L&&L.c&&L.s){L.a=MT[ch];L.s=0}else T.push({r:MT[ch],iv:1})}
  else if(ch==='\u094D'){const L=T[T.length-1];if(L&&L.c){L.a='';L.s=0}}
  else if(IV[ch]!==undefined)T.push({r:IV[ch],iv:1});
  else if(ch==='ं'||ch==='ँ')T.push({r:'n',an:1});
  else if(ch==='ः')T.push({r:'h'});
  else if(ch==='\u093C'){}
  else if(ch==='।'||ch==='॥')T.push({r:'.'});
  else if(ch>='\u0966'&&ch<='\u096F')T.push({r:String(ch.charCodeAt(0)-0x966)});
  else T.push({r:ch})}
 const hv=t=>t&&(t.iv||(t.c&&t.a!==''));
 const last=T[T.length-1];if(last&&last.c&&last.s&&T.length>1)last.a='';
 for(let i=1;i<T.length-1;i++){const t=T[i];if(t.c&&t.s&&hv(T[i-1])&&hv(T[i+1])&&(T[i+1].c||T[i+1].iv))t.a=''}
 return T.map((t,i)=>t.an?(T[i+1]&&T[i+1].c&&/^(p|ph|b|bh|m)$/.test(T[i+1].r)?'m':'n'):t.c?t.r+t.a:t.r).join('')}
function toHinglish(s){return s.normalize('NFD').replace(/[\u0900-\u097F]+/g,trw).normalize('NFC')}
function hn2en(s){if(/[\u0900-\u097F]/.test(s))s=toHinglish(s);const gl=hn2en.g||(hn2en.g=Object.fromEntries(GLOSS.split(',').map(x=>x.split(':')))),ph=Object.keys(PHRASES).sort((a,b)=>b.length-a.length);
 return s.split(/\n/).map(line=>{let l=line;ph.forEach(p=>{l=l.replace(new RegExp('\\b'+p+'\\b','gi'),PHRASES[p])});
  l=l.replace(/[A-Za-z']+/g,w=>{const k=w.toLowerCase();return Object.prototype.hasOwnProperty.call(gl,k)&&!PHRASES[k]?gl[k]:w});return tidy(l)}).join('\n')}
function tidy(s){return s.replace(/[ \t]+/g,' ').replace(/\s+([,.!?;:])/g,'$1').replace(/([!?.])\1{2,}/g,'$1$1$1').replace(/([,.!?;:])(?=[^\s\d,.!?;:)"'])/g,'$1 ').replace(/(^|[.!?]\s+|\n)([a-z])/g,(m,a,b)=>a+b.toUpperCase()).replace(/^ +| +$/gm,'').trim()}

/* ---------- tool definitions ---------- */
const TONES=[['professional','Professional'],['entertaining','Entertaining'],['educational','Educational'],['motivational','Motivational'],['promotional','Promotional']];
const sel=(k,label,opts,o={})=>({k,label,type:'select',opts,...o});
const LANG=sel('lang','Language',[['en','English'],['hn','Hinglish'],['hi','Hindi']],{pref:'lang'});
const PLAT=sel('platform','Platform',Object.keys(PF).map(x=>[x,x]),{pref:'platform'});
const TONE=sel('tone','Tone',TONES,{pref:'tone',def:'educational'});
const AUD={k:'aud',label:'Audience (optional)',type:'text',ph:'e.g. college students, small shop owners',max:60,pref:'aud'};
const TOPIC=ph=>({k:'topic',label:'Topic or niche',type:'text',req:1,ph,max:120,full:1});
const CNT=o=>sel('count','How many results',o.map(x=>[x,x]),{def:String(o[1])});
const TOOLS=[
{id:'reel-script',gen:G.reel,icon:'🎬',name:'Reel Script Generator',desc:'Hook, points, CTA and on-screen text for short videos.',kw:'instagram reel shorts script',fields:[TOPIC('e.g. 5 budget gym tips'),AUD,LANG,TONE,sel('length','Video length',[['15','~15 seconds'],['30','~30 seconds'],['60','~60 seconds']],{def:'30'})]},
{id:'hooks',gen:G.hooks,icon:'🪝',name:'Viral Hook Generator',desc:'Scroll-stopping opening lines for any platform.',kw:'hook opener first line',fields:[TOPIC('e.g. saving money on a small salary'),AUD,LANG,PLAT,TONE,CNT([5,8,12])]},
{id:'yt-titles',gen:G.titles,icon:'▶️',name:'YouTube Title Generator',desc:'Title options with character counts.',kw:'youtube title',fields:[TOPIC('e.g. learning Excel for office jobs'),AUD,LANG,TONE,CNT([5,8,10])]},
{id:'yt-description',gen:G.ytdesc,icon:'📝',name:'YouTube Description Generator',desc:'Description with chapters, links and hashtags.',kw:'youtube description chapters',fields:[TOPIC('e.g. beginner photography with a phone'),AUD,LANG,TONE,{k:'link',label:'Your link (optional)',type:'text',ph:'https://…',max:200,full:1}]},
{id:'ig-caption',gen:G.caption,icon:'💬',name:'Instagram Caption Generator',desc:'Captions with hashtags for any platform.',kw:'instagram caption post',fields:[TOPIC('e.g. my new bakery launch'),AUD,LANG,PLAT,TONE,sel('length','Caption length',[['short','Short'],['medium','Medium'],['long','Long']],{def:'medium'})]},
{id:'hashtags',gen:G.hashtags,icon:'#️⃣',name:'Hashtag Suggestions',desc:'Grouped hashtag sets (not live-trend data).',kw:'hashtag tags',fields:[TOPIC('e.g. street food Delhi'),LANG,PLAT,CNT([10,20,30])]},
{id:'ideas',gen:G.ideas,icon:'💡',name:'Short-Video Idea Generator',desc:'Formats, hooks and angles for your next video.',kw:'idea content calendar',fields:[TOPIC('e.g. home workouts'),AUD,LANG,PLAT,TONE,CNT([5,8,10])]},
{id:'product',gen:G.product,icon:'🛍️',name:'Product Description Generator',desc:'Product copy variants with feature bullets.',kw:'product ecommerce listing',fields:[{k:'prod',label:'Product name',type:'text',req:1,ph:'e.g. Handmade soy candle',max:80,full:1},{k:'features',label:'Features (comma or line separated)',type:'textarea',ph:'e.g. 40-hour burn, natural wax, 3 fragrances',max:400,full:1},AUD,LANG,TONE]},
{id:'ad-copy',gen:G.ad,icon:'📣',name:'Advertisement Copy Generator',desc:'Headlines, body and CTA for ads.',kw:'ad advertisement marketing copy',fields:[{k:'prod',label:'Product or service',type:'text',req:1,ph:'e.g. Online yoga classes',max:80},{k:'ben',label:'Main benefit',type:'text',req:1,ph:'e.g. better flexibility',max:100},{k:'offer',label:'Offer (optional)',type:'text',ph:'e.g. 20% off this week',max:80,full:1},AUD,LANG,PLAT,TONE]},
{id:'rewrite',gen:G.rewrite,icon:'🔁',name:'Hindi ↔ Hinglish ↔ English Helper',desc:'Transliterate, glossary-translate and tidy text.',kw:'translate hindi hinglish english rewrite',fields:[sel('mode','What do you want?',[['hi2hn','Hindi (देवनागरी) → Hinglish'],['hn2en','Hinglish → English (basic glossary)'],['tidy','Tidy up Hinglish/English text']],{full:1}),{k:'text',label:'Your text',type:'textarea',req:1,ph:'Paste text here…',max:2000,full:1,short:1}]},
{id:'outline',gen:G.outline,icon:'🗂️',name:'Video Script Outline',desc:'Three outline structures for longer videos.',kw:'outline structure youtube script',fields:[TOPIC('e.g. starting a vlog channel'),AUD,LANG,TONE,sel('length','Video length',[['5','~5 minutes'],['10','~10 minutes'],['15','~15 minutes']],{def:'10'})]},
{id:'cta',gen:G.cta,icon:'🎯',name:'Call-to-Action Generator',desc:'CTAs for follows, subscribes, sales and more.',kw:'cta call to action',fields:[TOPIC('e.g. my cooking channel'),AUD,LANG,PLAT,TONE,sel('goal','Goal',[['follow','Get follows'],['like','Likes & shares'],['subscribe','Subscribes'],['comment','Comments'],['buy','Sales'],['link','Link clicks'],['save','Saves']],{def:'follow'}),CNT([5,8,10])]}];
const toolById=id=>TOOLS.find(t=>t.id===id);

/* ---------- icons (custom line set) ---------- */
const IC={reel:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',hook:'<path d="M8 4v8a4.5 4.5 0 0 0 9 0V8.5"/><path d="M14.5 11l2.5-2.5 2.5 2.5"/>',title:'<path d="M4 7V5h16v2M12 5v14M9 19h6"/>',desc:'<path d="M4 6h16M4 11h16M4 16h9"/>',caption:'<path d="M4 5h16v11H10l-4 4v-4H4z"/>',hash:'<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.8 10.6c.6.6.8 1.3.8 2.4h6c0-1.1.2-1.8.8-2.4A6 6 0 0 0 12 3z"/>',bag:'<path d="M5 8h14l-1 12H6zM9 8V6.5a3 3 0 0 1 6 0V8"/>',mega:'<path d="M4 10v4h3l7 4V6L7 10zM17.5 9a4 4 0 0 1 0 6"/>',swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>',list:'<path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',copy:'<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',dl:'<path d="M12 4v11M7.5 11L12 15.5 16.5 11M5 20h14"/>',refresh:'<path d="M19 8a7.5 7.5 0 0 0-13-1.5M5 4v3.5h3.5M5 16a7.5 7.5 0 0 0 13 1.5M19 20v-3.5h-3.5"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',trash:'<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',arrow:'<path d="M9 6l6 6-6 6"/>',shield:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>',spark:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'};
const ico=(n,s=20)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;
const CATS=[['create','Create','#6366f1'],['youtube','YouTube','#ef4444'],['social','Social','#ec4899'],['business','Business','#10b981'],['language','Language','#f59e0b']];
const META={'reel-script':['reel','create','Short-form scripts with hook, beats and CTA'],hooks:['hook','create','Opening lines that stop the scroll'],ideas:['bulb','create','Angles and formats for your next video'],outline:['list','create','Three structures for long videos'],'yt-titles':['title','youtube','Click-worthy title options'],'yt-description':['desc','youtube','Description with chapters and tags'],'ig-caption':['caption','social','Captions with hashtags'],hashtags:['hash','social','Grouped hashtag sets'],cta:['target','social','Calls to action for any goal'],product:['bag','business','Listing copy with feature bullets'],'ad-copy':['mega','business','Headlines, body and CTA'],rewrite:['swap','language','Hindi, Hinglish, English helper']};
TOOLS.forEach(t=>{const m=META[t.id];t.ic=m[0];t.cat=m[1];t.desc=m[2]});
LANG.seg=TONE.seg=true;
const catOf=id=>CATS.find(c=>c[0]===id);
const tile=(t,cls='')=>`<span class="tile ${cls}" style="--c:${catOf(t.cat)[2]}">${ico(t.ic,cls?24:20)}</span>`;
const hydrate=(r=document)=>$$('[data-ic]',r).forEach(e=>{if(!e.firstChild)e.innerHTML=ico(e.dataset.ic,+e.dataset.s||20)});
const ib=(a,ic,l,x='')=>`<button class="btn sm" type="button" data-act="${a}" ${x}>${ico(ic,16)}<span>${l}</span></button>`;
const ago=ts=>{const m=Math.round((Date.now()-ts)/6e4);return m<1?'just now':m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':new Date(ts).toLocaleDateString()};

/* ---------- views ---------- */
let cur=null,pending=null;
const prefs=()=>S.get('prefs',{});
function renderStats(){const f=S.get('favs',[]).length,sc=$('#savedCount');sc.hidden=!f;sc.textContent=f;
 $('#stats').innerHTML=[[S.get('gen',0),'Generated'],[f,'Saved'],[TOOLS.length,'Tools']].map(([n,l])=>`<div class="card stat"><b>${n}</b><span>${l}</span></div>`).join('')}
function renderRecent(){const h=S.get('hist',[]).filter(x=>toolById(x.tool)).slice(0,4);$('#recentSec').hidden=!h.length;
 $('#recent').innerHTML=h.map(x=>{const t=toolById(x.tool);return `<a class="tc" style="--c:${catOf(t.cat)[2]}" href="#/tool/${t.id}" data-resume="${esc(x.id)}">${tile(t)}<div class="t" style="min-width:0"><h3>${esc(t.name)}</h3><p>${esc((x.v.topic||x.v.prod||x.v.text||'').slice(0,40))}</p></div></a>`}).join('')}
function renderGrid(q=''){const f=q.trim().toLowerCase();let n=0;
 $('#grid').innerHTML=CATS.map(([id,name,col])=>{const l=TOOLS.filter(t=>t.cat===id&&(!f||(t.name+' '+t.desc+' '+t.kw).toLowerCase().includes(f)));n+=l.length;
  return l.length?`<h2 class="sh">${name}</h2><div class="tg">${l.map(t=>`<a class="tc" style="--c:${col}" href="#/tool/${t.id}">${tile(t)}<div><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></div><span class="go">${ico('arrow',18)}</span></a>`).join('')}</div>`:''}).join('');
 $('#noTools').hidden=n>0}
function renderSidebar(){$('#sbTools').innerHTML=CATS.map(([id,name,col])=>`<div class="gl">${name}</div>`+TOOLS.filter(t=>t.cat===id).map(t=>`<a href="#/tool/${t.id}" data-tool="${t.id}">${tile(t)}${esc(t.name.replace(/ Generator| Suggestions| Helper/,''))}</a>`).join('')).join('')}
function seg(f,id,val){return `<div class="seg" role="radiogroup" aria-label="${esc(f.label)}" data-for="${id}">${f.opts.map(o=>{const on=String(o[0])===String(val);return `<button type="button" role="radio" aria-checked="${on}" class="${on?'on':''}" data-v="${esc(o[0])}">${esc(o[1])}</button>`}).join('')}</div><input type="hidden" id="${id}" name="${f.k}" value="${esc(val)}">`}
function fieldHTML(f,val){const id='f_'+f.k;let c;
 if(f.type==='select'){c=(f.seg||(f.opts.length<=3&&f.k!=='mode'))?seg(f,id,val):`<select id="${id}" name="${f.k}">${f.opts.map(o=>`<option value="${esc(o[0])}"${String(o[0])===String(val)?' selected':''}>${esc(o[1])}</option>`).join('')}</select>`}
 else if(f.type==='textarea')c=`<textarea id="${id}" name="${f.k}" rows="${f.short?7:3}" maxlength="${f.max||500}" placeholder="${esc(f.ph||'')}">${esc(val||'')}</textarea>`;
 else c=`<input id="${id}" name="${f.k}" type="text" maxlength="${f.max||120}" placeholder="${esc(f.ph||'')}" value="${esc(val||'')}" autocomplete="off">`;
 const ex=f.type==='text'&&f.req&&/^e\.g\. /.test(f.ph||'')?`<button type="button" class="try" data-fill="${id}" data-val="${esc(f.ph.slice(5))}">Use example: ${esc(f.ph.slice(5))}</button>`:'';
 return `<div class="fld"><label class="lbl" for="${id}">${esc(f.label.replace(' (optional)',''))}${f.req?' <i>*</i>':''}</label>${c}${ex}<p class="err" id="e_${f.k}" role="alert"></p></div>`}
function initVal(f,v){if(v&&v[f.k]!==undefined)return v[f.k];const p=prefs();if(f.pref&&p[f.pref]!==undefined)return p[f.pref];if(f.def!==undefined)return f.def;return f.opts?f.opts[0][0]:''}
function showTool(id){const t=toolById(id),el=$('#view-tool');
 if(!t){location.hash='#/';return}
 const p=pending&&pending.tool===id?pending:null;pending=null;cur={tool:t,v:p?p.v:null,out:p?p.out:null};
 el.innerHTML=`<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Dashboard</a><span>/</span><span>${esc(t.name)}</span></nav>
 <div class="ph">${tile(t,'lg')}<div><h1>${esc(t.name)}</h1><p>${esc(t.desc)}</p></div><span class="chip" title="Generated locally from templates. No hosted AI model.">Template engine</span></div>
 <div class="split"><form id="form" class="card pad form" novalidate>${t.fields.map(f=>fieldHTML(f,initVal(f,cur.v))).join('')}<button class="btn full" id="genBtn" type="submit">${ico('spark',18)}<span>Generate</span></button></form>
 <section id="out" aria-live="polite"></section></div>`;
 if(p)drawResults();else emptyOut()}
function emptyOut(){$('#out').innerHTML=`<div class="empty"><span class="tile" style="--c:${catOf(cur.tool.cat)[2]}">${ico(cur.tool.ic)}</span>Results appear here.</div>`}
function readForm(){const v={};cur.tool.fields.forEach(f=>{v[f.k]=$('#f_'+f.k).value.trim()});return v}
function validate(v){let ok=true;cur.tool.fields.forEach(f=>{const e=$('#e_'+f.k);e.textContent='';if(f.req){if(f.k==='text'){if(!v[f.k]){e.textContent='Paste some text first.';ok=false}}else if(v[f.k].length<2||!/[\p{L}\p{N}]/u.test(v[f.k])){e.textContent='Enter at least 2 letters or numbers.';ok=false}}});
 if(!ok){const f=$('.err:not(:empty)');if(f&&f.previousElementSibling.focus)f.previousElementSibling.focus();toast('Please fix the highlighted field.')}return ok}
async function run(v){const btn=$('#genBtn'),out=$('#out');btn.disabled=true;btn.querySelector('span').textContent='Generating…';out.setAttribute('aria-busy','true');out.innerHTML='<div class="sk"></div><div class="sk"></div><div class="sk"></div>';
 if(innerWidth<960)out.scrollIntoView({behavior:'smooth',block:'start'});
 try{const [res]=await Promise.all([Providers[CONFIG.provider].generate(cur.tool,v),new Promise(r=>setTimeout(r,350))]);
  if(!res||!res.length||res.some(x=>typeof x!=='string'||!x.trim()))throw new Error('empty');
  cur.v=v;cur.out=res;drawResults();addHistory(cur.tool,v,res)}
 catch(e){out.innerHTML='<div class="empty" style="color:var(--err)">Something went wrong. Check your inputs and try again.</div>'}
 finally{btn.disabled=false;btn.querySelector('span').textContent=cur.out?'Generate again':'Generate';out.removeAttribute('aria-busy')}}
const favKey=(tid,txt)=>tid+'|'+txt;
const favBtn=on=>ico('star',16)+`<span>${on?'Saved':'Save'}</span>`;
function drawResults(){const favs=S.get('favs',[]),out=$('#out');
 out.innerHTML=`<div class="rbar"><h2>${cur.out.length} results</h2>${ib('regen','refresh','Regenerate')}${ib('copyall','copy','Copy all')}${ib('dlall','dl','Download')}</div>`+
 cur.out.map((t,i)=>{const on=favs.some(f=>f.k===favKey(cur.tool.id,t));return `<article class="card res"><div class="rh"><span class="idx">${i+1}</span>Option ${i+1}</div><div class="rt">${esc(t)}</div><div class="ra">${ib('copy','copy','Copy')}${ib('edit','edit','Edit')}<button class="btn sm" type="button" data-act="fav" aria-pressed="${on}">${favBtn(on)}</button><span class="meta">${t.length} chars</span></div></article>`}).join('')}
const texts=()=>$$('#out .rt').map(e=>e.innerText.trim());
function addHistory(t,v,out){const h=S.get('hist',[]);h.unshift({id:uid(),tool:t.id,v,out,ts:Date.now()});S.set('hist',h.slice(0,CONFIG.maxHistory));S.set('gen',S.get('gen',0)+1);
 const p=prefs();t.fields.forEach(f=>{if(f.pref)p[f.pref]=v[f.k]});S.set('prefs',p)}
function showSaved(){const favs=S.get('favs',[]),el=$('#view-saved');
 el.innerHTML=`<div class="ph"><div><h1>Saved</h1><p>${favs.length} item${favs.length===1?'':'s'} on this device.</p></div>${favs.length?`<div style="margin-left:auto;display:flex;gap:8px">${ib('dlfav','dl','Download')}<button class="btn sm danger" type="button" data-act="clrfav">${ico('trash',16)}<span>Remove all</span></button></div>`:''}</div>`+
 (favs.length?favs.map(f=>`<article class="card res" data-fid="${esc(f.id)}"><div class="rh">${esc(f.name)}</div><div class="rt">${esc(f.text)}</div><div class="ra">${ib('copyfav','copy','Copy')}${ib('rmfav','trash','Remove')}</div></article>`).join(''):`<div class="empty"><span class="tile">${ico('star')}</span>Nothing saved yet. Tap Save on any result.</div>`);renderStats()}
function showHistory(){const h=S.get('hist',[]).filter(x=>toolById(x.tool)),el=$('#view-history');
 el.innerHTML=`<div class="ph"><div><h1>History</h1><p>Your last ${CONFIG.maxHistory} generations, stored on this device.</p></div>${h.length?`<button class="btn sm danger" style="margin-left:auto" type="button" data-act="clrhist">${ico('trash',16)}<span>Clear history</span></button>`:''}</div>`+
 (h.length?h.map(x=>{const t=toolById(x.tool);return `<article class="card hi">${tile(t)}<div class="t"><h3>${esc(t.name)}</h3><small>${esc((x.v.topic||x.v.prod||x.v.text||'').slice(0,60))} · ${ago(x.ts)}</small></div><button class="btn sm" type="button" data-act="openhist" data-id="${esc(x.id)}"><span>Open</span></button></article>`}).join(''):`<div class="empty"><span class="tile">${ico('clock')}</span>No history yet.</div>`)}

/* ---------- actions ---------- */
document.addEventListener('click',async e=>{
 const sg=e.target.closest('.seg button');if(sg){const g=sg.closest('.seg');$('#'+g.dataset.for).value=sg.dataset.v;$$('button',g).forEach(b=>{const on=b===sg;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)});return}
 const fl=e.target.closest('[data-fill]');if(fl){const i=$('#'+fl.dataset.fill);i.value=fl.dataset.val;i.focus();return}
 const b=e.target.closest('[data-act]');if(!b)return;const act=b.dataset.act,card=b.closest('.res');
 if(act==='regen'){if(cur&&cur.v)run(cur.v)}
 else if(act==='copy'){toast(await copyText(card.querySelector('.rt').innerText.trim())?'Copied':'Copy failed. Long-press the text to copy.')}
 else if(act==='copyall'){toast(await copyText(texts().join('\n\n---\n\n'))?'All results copied':'Copy failed.')}
 else if(act==='dlall'){toast(download(`viralkit-${cur.tool.id}-${new Date().toISOString().slice(0,10)}.txt`,texts().join('\n\n---\n\n'))?'Download started':'Download not supported here.')}
 else if(act==='edit'){const rt=card.querySelector('.rt'),on=rt.contentEditable==='true';rt.contentEditable=on?'false':'true';b.innerHTML=ico(on?'edit':'check',16)+`<span>${on?'Edit':'Done'}</span>`;if(!on)rt.focus();else toast('Edits kept')}
 else if(act==='fav'){const txt=card.querySelector('.rt').innerText.trim(),k=favKey(cur.tool.id,txt);let f=S.get('favs',[]);
  if(f.some(x=>x.k===k)){f=f.filter(x=>x.k!==k);b.innerHTML=favBtn(false);b.setAttribute('aria-pressed','false');toast('Removed from saved')}
  else{if(f.length>=CONFIG.maxFav){toast('Saved list is full. Remove some first.');return}f.unshift({id:uid(),k,tool:cur.tool.id,name:cur.tool.name,text:txt,ts:Date.now()});b.innerHTML=favBtn(true);b.setAttribute('aria-pressed','true');toast('Saved')}S.set('favs',f);renderStats()}
 else if(act==='copyfav'){toast(await copyText(card.querySelector('.rt').innerText.trim())?'Copied':'Copy failed.')}
 else if(act==='rmfav'){S.set('favs',S.get('favs',[]).filter(x=>x.id!==card.dataset.fid));showSaved();toast('Removed')}
 else if(act==='dlfav'){toast(download('viralkit-saved.txt',S.get('favs',[]).map(f=>`[${f.name}]\n${f.text}`).join('\n\n---\n\n'))?'Download started':'Download not supported here.')}
 else if(act==='clrfav'){if(confirm('Remove all saved items?')){S.set('favs',[]);showSaved()}}
 else if(act==='clrhist'){if(confirm('Clear all history?')){S.set('hist',[]);showHistory();toast('History cleared')}}
 else if(act==='hidewel'){S.set('welcomeDone',true);$('#welcome').hidden=true}
 else if(act==='openhist'){const x=S.get('hist',[]).find(h=>h.id===b.dataset.id);if(x){pending={tool:x.tool,v:x.v,out:x.out};location.hash='#/tool/'+x.tool}}});
document.addEventListener('click',e=>{const r=e.target.closest('[data-resume]');if(!r)return;const x=S.get('hist',[]).find(h=>h.id===r.dataset.resume);if(x)pending={tool:x.tool,v:x.v,out:x.out}},true);
document.addEventListener('submit',e=>{if(e.target.id!=='form')return;e.preventDefault();const v=readForm();if(validate(v))run(v)});
const qi=$('#q');qi.addEventListener('input',()=>{if(currentView()!=='home')location.hash='#/';else renderGrid(qi.value)});
qi.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=$$('#grid .tc');if(a.length===1)location.hash=a[0].getAttribute('href')}});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();qi.focus()}});
function setTheme(t){document.documentElement.dataset.theme=t;$('#themeIc').innerHTML=ico(t==='dark'?'sun':'moon');const m=$('meta[name=theme-color]');if(m)m.content=t==='dark'?'#090b12':'#0e1220'}
$('#themeBtn').addEventListener('click',()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(n);S.set('theme',n)});
const drawer=o=>{$('#sb').classList.toggle('open',o);$('#scrim').classList.toggle('on',o)};
$('#menuBtn').addEventListener('click',()=>drawer(true));$('#scrim').addEventListener('click',()=>drawer(false));

/* ---------- router ---------- */
const currentView=()=>{const h=location.hash||'#/';return h.startsWith('#/tool/')?'tool':h==='#/saved'?'saved':h==='#/history'?'history':h==='#/about'?'about':h==='#/privacy'?'privacy':h==='#/terms'?'terms':'home'};
function route(){const v=currentView();drawer(false);$$('.view').forEach(x=>x.hidden=x.id!=='view-'+v);
 if(v==='home'){$('#welcome').hidden=!!S.get('welcomeDone',false);renderStats();renderRecent();renderGrid(qi.value)}else if(v==='tool')showTool(location.hash.slice(7));else if(v==='saved')showSaved();else if(v==='history')showHistory();
 const tid=v==='tool'?location.hash.slice(7):null;
 $$('[data-nav]').forEach(a=>a.dataset.nav===v?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 $$('[data-tool]').forEach(a=>a.dataset.tool===tid?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 document.title=v==='tool'&&cur?cur.tool.name+' – ViralKit AI':'ViralKit AI – Create Better Content. Faster.';window.scrollTo(0,0)}
window.addEventListener('hashchange',route);

/* ---------- init ---------- */
(function(){hydrate();renderSidebar();const t=S.get('theme',null);setTheme(t==='dark'||t==='light'?t:document.documentElement.dataset.theme);
 $$('.cl').forEach(a=>{a.href='mailto:'+CONFIG.contactEmail;if(!a.closest('.ft'))a.textContent=CONFIG.contactEmail});$('#yr').textContent=new Date().getFullYear();
 route();
 if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{})})();
