// Auto Favicon for all pages - TheChauhanSite
(function(){
  if(!document.querySelector("link[rel='icon']")){
    var f1=document.createElement('link'); f1.rel='icon'; f1.type='image/png'; f1.href='/favicon.png'; document.head.appendChild(f1);
    var f2=document.createElement('link'); f2.rel='apple-touch-icon'; f2.href='/favicon.png'; document.head.appendChild(f2);
  }
})();
// --- original code starts below ---
// TheChauhanSite - World Language System - 12 Countries
const LANG_DATA = {
  hi: {title:"इंस्टाग्राम फॉन्ट प्रो", sub:"अपना नाम लिखो - 100+ फॉन्ट", ph:"अपना नाम लिखो...", btn:"बनाओ", empty:"👆 ऊपर नाम लिखो"},
  hinglish: {title:"Instagram Font Pro", sub:"Apna naam likho - 100+ fonts", ph:"Apna naam likho...", btn:"GENERATE", empty:"👆 Upar naam likho"},
  en: {title:"Instagram Font Pro", sub:"Type your name - 100+ stylish fonts", ph:"Type your name...", btn:"GENERATE", empty:"Type your name above"},
  es: {title:"Generador de Fuentes", sub:"Escribe tu nombre - 100+ fuentes", ph:"Escribe tu nombre...", btn:"GENERAR", empty:"Escribe arriba"},
  pt: {title:"Gerador de Fontes", sub:"Digite seu nome - 100+ fontes", ph:"Digite seu nome...", btn:"GERAR", empty:"Digite acima"},
  fr: {title:"Générateur de Polices", sub:"Tapez votre nom - 100+ polices", ph:"Tapez votre nom...", btn:"GÉNÉRER", empty:"Tapez ci-dessus"},
  de: {title:"Schrift Generator", sub:"Name eingeben - 100+ Schriftarten", ph:"Name eingeben...", btn:"GENERIEREN", empty:"Oben eingeben"},
  ar: {title:"مولد الخطوط", sub:"اكتب اسمك - 100+ خط", ph:"اكتب اسمك...", btn:"إنشاء", empty:"اكتب أعلاه"},
  ru: {title:"Генератор Шрифтов", sub:"Введите имя - 100+ шрифтов", ph:"Введите имя...", btn:"ГЕНЕРИРОВАТЬ", empty:"Введите выше"},
  id: {title:"Generator Font", sub:"Ketik nama - 100+ font", ph:"Ketik nama...", btn:"BUAT", empty:"Ketik di atas"},
  tr: {title:"Font Oluşturucu", sub:"Adınızı yazın - 100+ font", ph:"Adınızı yazın...", btn:"OLUŞTUR", empty:"Yukarıya yazın"},
  bn: {title:"ফন্ট জেনারেটর প্রো", sub:"আপনার নাম লিখুন - 100+ ফন্ট", ph:"আপনার নাম...", btn:"তৈরি করুন", empty:"উপরে লিখুন"}
};

function detectLang(){
  let l=(navigator.language||'en').toLowerCase();
  if(l.startsWith('hi')) return 'hi';
  if(l.startsWith('es')) return 'es';
  if(l.startsWith('pt')) return 'pt';
  if(l.startsWith('fr')) return 'fr';
  if(l.startsWith('de')) return 'de';
  if(l.startsWith('ar')) return 'ar';
  if(l.startsWith('ru')) return 'ru';
  if(l.startsWith('id')) return 'id';
  if(l.startsWith('tr')) return 'tr';
  if(l.startsWith('bn')) return 'bn';
  return 'en';
}

function setWorldLang(code){
  if(code==='auto') code=detectLang();
  let t=LANG_DATA[code]||LANG_DATA.en;
  if(document.getElementById('t_title')) document.getElementById('t_title').textContent=t.title;
  if(document.getElementById('t_sub')) document.getElementById('t_sub').textContent=t.sub;
  if(document.getElementById('inputText')) document.getElementById('inputText').placeholder=t.ph;
  if(document.getElementById('genBtn')) document.getElementById('genBtn').textContent=t.btn;
  localStorage.setItem('user_lang', code);
  window.CUR_LANG=code;
}

// Auto load saved language
window.addEventListener('DOMContentLoaded', ()=>{
  let saved = localStorage.getItem('user_lang')||'auto';
  setWorldLang(saved);
});
