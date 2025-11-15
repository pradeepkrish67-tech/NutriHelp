// Simple AI assistant client-side rules (demo)
const chat = document.getElementById('chatWindow');
const input = document.getElementById('userMsg');
if (document.getElementById('sendAI')) {
  document.getElementById('sendAI').addEventListener('click', () => {
    const text = input.value || '';
    if(!text) return;
    chat.innerHTML += '<div class="user-msg">'+text+'</div>';
    input.value='';
    if (text.toLowerCase().includes('ngo')) {
      chat.innerHTML += '<div class="bot-msg">Suggested match: "Swasthya Food Aid" (demo)</div>';
    } else if (text.toLowerCase().includes('safety')) {
      chat.innerHTML += '<div class="bot-msg">Rule-check: If cooked & >4 hours old => Unsafe</div>';
    } else {
      chat.innerHTML += '<div class="bot-msg">I can help with matching, safety checks, and drone suggestions (demo).</div>';
    }
  });
}
