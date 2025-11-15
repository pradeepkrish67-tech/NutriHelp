const languages = {
  en: { donate: 'Donate Food', login: 'Login' },
  hi: { donate: 'भोजन दान करें', login: 'लॉगिन' },
  ta: { donate: 'உணவு கொடு', login: 'உள்நுழைக' }
};
export function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(languages[lang] && languages[lang][key]) el.innerText = languages[lang][key];
  });
}
