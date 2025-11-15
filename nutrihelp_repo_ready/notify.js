export function sendNotify(text){
  const el = document.createElement('div');
  el.className = 'notification';
  el.innerText = text;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),5000);
}
