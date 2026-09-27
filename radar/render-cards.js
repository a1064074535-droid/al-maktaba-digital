const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const D = __dirname;
const FD = path.join(D, 'fonts');
const ICON_DIR = path.join(FD, fs.readdirSync(FD).find(n => n.startsWith('lucide-static-') && !n.endsWith('.tgz')), 'package/icons');
const CAIRO = path.join(FD, fs.readdirSync(FD).find(n => n.startsWith('fontsource-cairo') && !n.endsWith('.tgz')), 'package/files');
const PX = path.join(FD, 'fontsource-ibm-plex-sans-arabic-5.3.0/files');
const b64 = p => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const fontCss = `
@font-face{font-family:Cairo;font-weight:900;src:url(${b64(CAIRO+'/cairo-arabic-900-normal.woff2')})}
@font-face{font-family:Cairo;font-weight:800;src:url(${b64(CAIRO+'/cairo-arabic-800-normal.woff2')})}
@font-face{font-family:Cairo;font-weight:700;src:url(${b64(CAIRO+'/cairo-arabic-700-normal.woff2')})}
@font-face{font-family:CairoL;font-weight:800;src:url(${b64(CAIRO+'/cairo-latin-800-normal.woff2')})}
@font-face{font-family:CairoL;font-weight:700;src:url(${b64(CAIRO+'/cairo-latin-700-normal.woff2')})}
@font-face{font-family:Plex;font-weight:500;src:url(${b64(PX+'/ibm-plex-sans-arabic-arabic-500-normal.woff2')})}
@font-face{font-family:Plex;font-weight:600;src:url(${b64(PX+'/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}`;

function icon(name, { stroke = 'url(#gold)', width = 1.6, size = 100, id = '' } = {}) {
  let s = fs.readFileSync(path.join(ICON_DIR, name + '.svg'), 'utf8');
  s = s.replace(/<!--[\s\S]*?-->/g, '').replace(/class="[^"]*"/, '')
       .replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`)
       .replace(/stroke="currentColor"/, `stroke="${stroke}"`).replace(/stroke-width="2"/, `stroke-width="${width}"`);
  const defs = `<defs><linearGradient id="gold${id}" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#FCE7A8"/><stop offset=".5" stop-color="#E4AE45"/><stop offset="1" stop-color="#B7791F"/></linearGradient></defs>`;
  if (stroke.startsWith('url(#gold')) s = s.replace(/>/, '>' + defs).replace('url(#gold)', `url(#gold${id})`);
  return s;
}

// accent per group: [deep, mid, bright]
const TH = {
  gov:  ['#061430', '#0B2A55', '#1AA6A6'],
  jobs: ['#071431', '#0E2A63', '#2F7FD6'],
  biz:  ['#0A1233', '#20205E', '#7B61D6'],
  tour: ['#0B1330', '#2A2248', '#D98A2B'],
};
const DISC = new Set([1,2,3,4,5,6,7,8,15,16,17,18]);
const S = [
 {id:1,g:'gov',l:[['w','التسجيل في'],['g','الضمان'],['w','الاجتماعي'],['g','المطوّر']],tag:'نراجع طلبك ونتابعه خطوة بخطوة',hero:'shield-check',f:[['file-check','مراجعة','الأهلية'],['refresh-cw','تحديث','البيانات'],['scale','رفع','الاعتراض'],['bell-ring','متابعة','الصرف']]},
 {id:2,g:'gov',l:[['w','التسجيل في'],['G','حافز'],['s','دعم الباحثين عن عمل']],tag:'نسجّلك ونتابع التحديث عنك',hero:'hand-coins',f:[['user-check','التحقق من','الأهلية'],['clipboard-list','التسجيل','الكامل'],['calendar-check','التحديث','الأسبوعي'],['bell-ring','متابعة','الدعم']]},
 {id:3,g:'gov',l:[['w','خدمات'],['g','حساب'],['g','المواطن']],tag:'استحقاقك كامل بدون تعقيد',hero:'house',f:[['user-plus','إضافة','التابعين'],['refresh-cw','تحديث','البيانات'],['scale','رفع','الاعتراض'],['wallet','متابعة','الاستحقاق']]},
 {id:4,g:'gov',l:[['w','التقديم على'],['G','ساند'],['s','لمن فقد عمله في القطاع الخاص']],tag:'قدّم قبل ما تفوتك المهلة',hero:'umbrella',f:[['search-check','التحقق من','الأهلية'],['file-text','تجهيز','المستندات'],['send','رفع','الطلب'],['timer','قبل انتهاء','المهلة']]},
 {id:5,g:'gov',l:[['w','التسجيل في'],['G','قياس'],['s','القدرات والتحصيلي']],tag:'موعدك محجوز بدون زحمة',hero:'graduation-cap',f:[['user-round-check','إنشاء','الحساب'],['calendar-days','حجز','الموعد'],['map-pin','اختيار','المقر'],['printer','طباعة','البطاقة']]},
 {id:6,g:'jobs',l:[['w','التقديم على'],['G','جدارات'],['s','الوظائف الحكومية']],tag:'ملفك جاهز قبل نزول الإعلان',hero:'briefcase-business',f:[['id-card','إنشاء','الملف'],['award','إرفاق','المؤهلات'],['briefcase','التقديم على','الوظائف'],['bell-ring','متابعة','الإعلانات']]},
 {id:7,g:'jobs',l:[['w','التسجيل في'],['G','تمهير'],['s','تدريب منتهي بالتوظيف']],tag:'خطوتك الأولى لسوق العمل',hero:'sprout',f:[['search','البحث عن','جهة تدريب'],['file-pen-line','التسجيل','والتقديم'],['badge-dollar-sign','مكافأة','شهرية'],['list-checks','متابعة','الطلب']]},
 {id:8,g:'jobs',l:[['w','فرص'],['G','توطين'],['s','وظائف القطاع الخاص']],tag:'نوصلك للمهن الموطّنة',hero:'briefcase',f:[['list','المهن','الموطّنة'],['user-plus','التسجيل','في البرامج'],['briefcase','التقديم على','الفرص'],['handshake','الاستفادة','من الدعم']]},
 {id:9,g:'biz',l:[['w','إنشاء'],['g','متجر'],['g','إلكتروني'],['s','احترافي وجاهز للبيع']],tag:'مشروعك يبدأ يبيع من أول يوم',hero:'store',f:[['palette','تصميم','احترافي'],['credit-card','ربط بوابات','الدفع'],['truck','ربط شركات','الشحن'],['rocket','تسليم جاهز','للبيع']]},
 {id:10,g:'biz',l:[['w','دورة'],['g','التجارة'],['g','الإلكترونية']],tag:'من الصفر إلى أول طلب',hero:'shopping-cart',f:[['lightbulb','اختيار','المنتج'],['store','بناء','المتجر'],['megaphone','التسويق','والإعلان'],['chart-line','إدارة','المبيعات']]},
 {id:11,g:'jobs',l:[['w','التدريس'],['G','من المنزل'],['s','دخل مرن من بيتك']],tag:'علّمي من بيتك بثقة',hero:'book-open-text',f:[['laptop','منصات','موثوقة'],['users','الوصول','للطلاب'],['id-card','ملف تعريفي','احترافي'],['clock','مواعيد','مرنة']]},
 {id:12,g:'biz',l:[['w','خدمات'],['g','التسويق'],['g','الرقمي']],tag:'عملاء أكثر ومبيعات أعلى',hero:'megaphone',f:[['target','استهداف','دقيق'],['pen-tool','محتوى','إبداعي'],['chart-column','حملات','إعلانية'],['trending-up','زيادة','المبيعات']]},
 {id:13,g:'biz',l:[['w','زيادة'],['G','المتابعين'],['s','نمو حقيقي وآمن لحسابك']],tag:'حسابك يكبر كل يوم',hero:'users-round',f:[['user-plus','متابعين','حقيقيين'],['sparkles','تحسين','الحساب'],['calendar','خطة','محتوى'],['shield','نمو','آمن']]},
 {id:14,g:'jobs',l:[['w','إعداد'],['g','السيرة'],['g','الذاتية']],tag:'سيرة تفتح لك باب الوظيفة',hero:'file-user',f:[['scan-search','متوافقة مع','أنظمة ATS'],['languages','عربي','وإنجليزي'],['sparkles','تصميم','احترافي'],['zap','تسليم','سريع']]},
 {id:15,g:'gov',l:[['w','طلب مساعدة'],['g','إمارة'],['g','الرياض']],tag:'طلبك مصاغ ومستنداتك كاملة',hero:'scroll-text',f:[['file-pen-line','صياغة','الطلب'],['folder-check','تجهيز','المستندات'],['send','رفع','الطلب'],['list-checks','متابعة','الحالة']]},
 {id:16,g:'gov',l:[['w','طلب'],['g','مساعدة'],['w','من الجمعيات'],['g','الخيرية']],tag:'نوصلك للجمعية المناسبة لك',hero:'hand-heart',f:[['search','اختيار','الجمعية'],['file-text','تجهيز','الطلب'],['send','التسجيل','والتقديم'],['list-checks','متابعة','الطلب']]},
 {id:17,g:'gov',l:[['w','دعم'],['g','تذاكر العلاج'],['w','ومبلغ مالي'],['s','من وزارة الصحة']],tag:'علاجك خارج منطقتك أسهل',hero:'plane',f:[['stethoscope','للمحالين','للعلاج'],['plane','تذاكر','السفر'],['wallet','المبلغ','المالي'],['file-check','تجهيز','الطلب']]},
 {id:18,g:'gov',l:[['w','طلب'],['g','مساعدة'],['w','من جمعية'],['g','الجفالي الخيرية']],tag:'مساعدتك .. لأجل حياة أفضل',hero:'gift',f:[['file-text','تجهيز','الطلب'],['folder-check','رفع','المستندات'],['shield-check','بسرية','تامة'],['list-checks','متابعة','الحالة']]},
 {id:19,g:'tour',l:[['w','رحلات'],['G','الربع الخالي'],['s','عروق بني معارض · الفاو · العين الحارة']],tag:'تجربة صحراوية ما تنساها',hero:'tent-tree',f:[['map','مرشد','محلي'],['car','تنقّل','آمن'],['camera','مواقع','أثرية'],['users','للعائلات','والشباب']]},
 {id:20,g:'jobs',l:[['w','وظائف'],['G','عن بُعد'],['s','رواتب ٤٠٠٠ – ٧٠٠٠ ريال']],tag:'اشتغل من بيتك براتب ثابت',hero:'laptop',f:[['house','العمل من','المنزل'],['badge-check','جهات','موثوقة'],['banknote','رواتب','مجزية'],['clock','دوام','مرن']]},
];

// Islamic 8-point star lattice
const star = (cx, cy, r) => { const pts = []; for (let i = 0; i < 16; i++) { const a = Math.PI / 8 * i - Math.PI / 2; const rr = i % 2 ? r * 0.72 : r; pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); } return pts.join(' '); };
function pattern() {
  let s = '';
  for (let y = -60; y < 900; y += 150) for (let x = -60; x < 1150; x += 150) {
    s += `<polygon points="${star(x, y, 62)}"/><rect x="${x - 34}" y="${y - 34}" width="68" height="68" transform="rotate(45 ${x} ${y})"/>`;
  }
  return s;
}
const PAT = pattern();

function html(s) {
  const [deep, mid, acc] = TH[s.g];
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const lines = s.l.map(([k, t]) => {
    const len = t.length;
    if (k === 'w') return `<div class="lw">${t}</div>`;
    if (k === 's') return `<div class="ls">${t}</div>`;
    const big = k === 'G';
    const fs = big ? (len <= 5 ? 210 : len <= 8 ? 170 : 132) : (len <= 6 ? 150 : len <= 9 ? 124 : 100);
    return `<div class="lg" style="font-size:${fs}px">${t}</div>`;
  }).join('');
  const feats = s.f.map(([ic, a, b], i) => `<div class="ft">${icon(ic, { size: 92, width: 1.5, id: 'f' + i })}<div>${a}<br>${b}</div></div>`).join('');
  const qr = fs.readFileSync(path.join(D, 'qr', String(s.id).padStart(2, '0') + '.svg'), 'utf8');
  return `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><style>${fontCss}
*{margin:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{font-family:Cairo,CairoL,sans-serif;color:#fff;background:#F4F1EA;position:relative}
.top{position:absolute;inset:0 0 auto 0;height:1520px;overflow:hidden;
  background:radial-gradient(900px 700px at 20% 18%, ${mid} 0%, ${deep} 62%),${deep};
  clip-path:path('M0 0H1080V1380C900 1470 700 1505 540 1505C380 1505 180 1470 0 1380Z')}
.pat{position:absolute;inset:0;opacity:.09}
.sweep{position:absolute;right:-220px;top:-120px;width:760px;height:760px;border-radius:50%;
  background:conic-gradient(from 200deg, ${acc}00, ${acc}66, ${acc}00 40%);filter:blur(10px);opacity:.55}
.band{position:absolute;left:-10%;right:-10%;top:1180px;height:260px;transform:rotate(-7deg);
  background:linear-gradient(90deg, ${acc}00, ${acc}55 45%, ${acc}22);filter:blur(1px)}
.goldline{position:absolute;left:0;right:0;top:0;height:1520px;pointer-events:none}
.brand{position:absolute;top:70px;right:80px;display:flex;align-items:center;gap:16px;font-weight:800;font-size:34px}
.brand .m{width:62px;height:62px;border-radius:16px;background:linear-gradient(160deg,#FCE7A8,#C98A12);display:grid;place-items:center}
.head{position:absolute;top:170px;right:56px;width:590px;display:flex;flex-direction:column;align-items:center;text-align:center}
.lw{font-weight:800;font-size:92px;line-height:1.15;white-space:nowrap;text-shadow:0 6px 18px rgba(0,0,0,.35)}
.lg{font-weight:900;line-height:1.08;white-space:nowrap;background:linear-gradient(180deg,#FFF0C2 0%,#F2C45A 45%,#C98A12 80%,#9A6210 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 8px 14px rgba(0,0,0,.45));padding:.12em 6px .3em;margin:-.12em 0 -.3em}
.ls{margin-top:14px;font-family:Plex;font-weight:600;font-size:40px;color:#DDE6F5}
.hero{position:absolute;top:330px;left:30px;width:370px;height:370px}
.hero .ped{position:absolute;left:40px;right:40px;bottom:-58px;height:46px;border-radius:50%;background:radial-gradient(ellipse, rgba(0,0,0,.55), rgba(0,0,0,0) 70%)}
.hero .orb{position:absolute;width:118px;height:118px;border-radius:50%;padding:5px;background:conic-gradient(from 210deg,#FCE7A8,#C98A12,#F2C45A,#FCE7A8);box-shadow:0 14px 28px rgba(0,0,0,.5)}
.hero .orb>div{width:100%;height:100%;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%, #FFFFFF 0%, #E9EEF7 55%, #C9D3E6 100%)}
.hero .halo{position:absolute;inset:-60px;border-radius:50%;background:radial-gradient(circle, ${acc}55 0%, ${acc}00 65%)}
.hero .ring{position:absolute;inset:0;border-radius:50%;padding:10px;background:conic-gradient(from 210deg,#FCE7A8,#C98A12,#7A4A0A,#F2C45A,#FCE7A8);
  box-shadow:0 30px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)}
.hero .core{width:100%;height:100%;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 35% 28%, ${acc} 0%, ${mid} 48%, ${deep} 100%);box-shadow:inset 0 -18px 40px rgba(0,0,0,.45), inset 0 18px 30px rgba(255,255,255,.12)}
.hero .gloss{position:absolute;left:18%;top:9%;width:52%;height:28%;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,.32),rgba(255,255,255,0));filter:blur(2px)}
.hero svg{filter:drop-shadow(0 10px 12px rgba(0,0,0,.45))}
.spark{position:absolute;width:18px;height:18px;background:#FCE7A8;clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);box-shadow:0 0 12px #FCE7A8}
.div{position:absolute;top:835px;left:150px;right:150px;height:2px;background:linear-gradient(90deg,transparent,#E4AE45,transparent)}
.div i{position:absolute;left:50%;top:-11px;margin-left:-12px;width:24px;height:24px;background:#FFF3C9;clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);filter:drop-shadow(0 0 8px #FCE7A8)}
.tag{position:absolute;top:880px;right:110px;left:110px;height:104px;border-radius:60px;border:2px solid ${acc}AA;
  background:linear-gradient(90deg, ${acc}22, rgba(255,255,255,.03));display:flex;align-items:center;justify-content:center;gap:24px;font-weight:700;font-size:44px}
.tag .ic{position:absolute;left:22px;width:72px;height:72px;border-radius:50%;border:2px solid ${acc};display:grid;place-items:center}
.feats{position:absolute;top:1030px;right:60px;left:60px;display:grid;grid-template-columns:repeat(4,1fr)}
.ft{display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;font-weight:700;font-size:36px;line-height:1.3;color:#EEF3FB;padding:0 8px;border-inline-start:2px solid rgba(228,174,69,.28)}
.ft:first-child{border-inline-start:0}
.cta{position:absolute;top:1330px;right:150px;left:150px;height:132px;border-radius:30px;
  background:linear-gradient(180deg, ${acc}, ${mid});border:3px solid #E4AE45;box-shadow:0 18px 36px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.25);
  display:flex;align-items:center;justify-content:center;gap:22px;font-weight:800;font-size:50px;white-space:nowrap}
.cta b{font-family:CairoL,Cairo;font-weight:800;font-size:62px;color:#FCE7A8}
.card{position:absolute;top:1560px;right:50px;left:50px;height:300px;border-radius:34px;background:#fff;
  border:3px solid #E4AE45;box-shadow:0 20px 40px rgba(11,27,58,.18);display:flex;align-items:center;padding:0 46px;gap:40px;color:#0B1B3A}
.card .who{flex:1;display:flex;flex-direction:column;gap:6px}
.card .row{display:flex;align-items:center;gap:18px}
.card .lm{width:86px;height:86px;border-radius:22px;background:linear-gradient(160deg,${mid},${deep});display:grid;place-items:center}
.card .nm{font-weight:800;font-size:46px;line-height:1.1}
.card .nm small{display:block;font-family:Plex;font-weight:500;font-size:26px;color:#51607A}
.card .wa{display:flex;align-items:center;gap:12px;font-family:CairoL,Cairo;font-weight:800;color:#1B9E5A;font-size:32px;margin-top:10px}
.card .ph{font-family:CairoL;font-weight:800;font-size:76px;letter-spacing:1px;direction:ltr;text-align:right;line-height:1}
.card .sep{width:2px;align-self:stretch;margin:40px 0;background:linear-gradient(transparent,#E4AE45,transparent)}
.card .qr{width:210px;height:210px;flex:none}
.card .qrc{display:flex;flex-direction:column;align-items:center;gap:6px;font-family:Plex;font-weight:600;font-size:22px;color:#51607A}
.disc{position:absolute;bottom:18px;left:0;right:0;text-align:center;font-family:Plex;font-weight:500;font-size:24px;color:#6A7489}
</style></head><body>
<div class="top">
  <svg class="pat" viewBox="0 0 1080 900" preserveAspectRatio="xMidYMin slice" width="1080" height="900" fill="none" stroke="#E4AE45" stroke-width="1.4">${PAT}</svg>
  <div class="sweep"></div><div class="band"></div>
</div>
<svg class="goldline" viewBox="0 0 1080 1520"><path d="M0 1380C180 1470 380 1505 540 1505C700 1505 900 1470 1080 1380" fill="none" stroke="#E4AE45" stroke-width="6"/>
  <path d="M760 0 L1080 250" stroke="#E4AE45" stroke-width="5" opacity=".8"/><path d="M810 0 L1080 205" stroke="${acc}" stroke-width="3" opacity=".6"/></svg>
<div class="brand"><span class="m">${icon('book-open', { stroke: '#0B1B3A', size: 38, width: 2.2 })}</span>المكتبة الرقمية</div>
<div class="head">${lines}</div>
<div class="hero"><div class="halo"></div><div class="ring"><div class="core">${icon(s.hero, { size: 200, width: 1.7, id: 'h' })}</div></div><div class="gloss"></div><div class="ped"></div><div class="orb" style="right:-20px;bottom:-6px"><div>${icon(s.f[0][0], { stroke: "#0B2A55", size: 56, width: 2 })}</div></div>
  <i class="spark" style="left:-6px;top:40px"></i><i class="spark" style="right:10px;top:-14px;transform:scale(.7)"></i><i class="spark" style="right:-18px;bottom:70px;transform:scale(1.2)"></i></div>
<div class="div"><i></i></div>
<div class="tag"><span>${s.tag}</span><span class="ic">${icon('user-round', { stroke: '#8FE3E3', size: 40, width: 2 })}</span></div>
<div class="feats">${feats}</div>
<div class="cta"><span>للطلب أرسل رقم الخدمة:</span><b>${s.id}</b>${icon('send', { size: 58, width: 1.8, id: 'c' })}</div>
<div class="card">
  <div class="who">
    <div class="row"><span class="lm">${icon('book-open', { size: 50, width: 1.8, id: 'l' })}</span><div class="nm">المكتبة الرقمية<small>خدمات رقمية لكل مناطق المملكة</small></div></div>
    <div class="wa">${icon('message-circle', { stroke: '#1B9E5A', size: 34, width: 2.4 })}WhatsApp</div>
    <div class="ph">0545888559</div>
  </div>
  <div class="sep"></div>
  <div class="qrc"><div class="qr">${qr}</div>امسح وتواصل مباشرة</div>
</div>
${DISC.has(s.id) ? '<div class="disc">خدمة مستقلة غير تابعة لأي جهة حكومية أو خيرية · لا نضمن القبول</div>' : '<div class="disc">vip365.tjar.store</div>'}
</body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  fs.mkdirSync(path.join(D, 'cards2'), { recursive: true });
  const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  for (const s of S) {
    if (only && !only.includes(s.id)) continue;
    await p.setContent(html(s), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => { const W = 585; document.querySelectorAll('.lg,.lw,.ls').forEach(el => { let f = parseFloat(getComputedStyle(el).fontSize); while (el.scrollWidth > W && f > 30) { f -= 2; el.style.fontSize = f + 'px'; } });
      const h = document.querySelector('.head'); let tries = 0; while (h.getBoundingClientRect().bottom > 810 && tries++ < 60) { h.querySelectorAll('.lg,.lw').forEach(el => { el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * 0.96) + 'px'; }); } });
    await p.screenshot({ path: path.join(D, 'cards2', `svc-${String(s.id).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 93 });
  }
  await b.close();
})();
