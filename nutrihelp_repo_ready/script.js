// General client-side logic: image preview, offline save, AI demo hooks, notifications
document.addEventListener('DOMContentLoaded', () => {
  // image preview
  const upload = document.getElementById('imageUpload');
  const preview = document.getElementById('previewImage');
  if (upload) {
    upload.addEventListener('change', () => {
      const f = upload.files[0];
      if (f) {
        preview.src = URL.createObjectURL(f);
        preview.style.display = 'block';
      }
    });
  }

  // donate form
  const donateForm = document.getElementById('donateForm');
  if (donateForm) {
    donateForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        name: document.getElementById('foodName').value || 'Unnamed',
        type: document.getElementById('foodType').value,
        quantity: document.getElementById('foodQty').value,
        unit: document.getElementById('foodUnit').value,
        expiry: Number(document.getElementById('expiry').value || 120),
        createdAt: Date.now()
      };
      // push to local demo storage and display
      const pending = JSON.parse(localStorage.getItem('nutri_pending')|| '[]');
      pending.push(data);
      localStorage.setItem('nutri_pending', JSON.stringify(pending));
      notify('Saved donation locally (demo). It will sync when online.');
    });
  }

  const saveOffline = document.getElementById('saveOffline');
  if (saveOffline) {
    saveOffline.addEventListener('click', () => {
      notify('Saved offline (demo).');
    });
  }

  // drone start
  const start = document.getElementById('startDrone');
  const droneBox = document.getElementById('drone3d');
  if (start && droneBox) {
    start.addEventListener('click', () => {
      droneBox.style.transform = 'translateY(-200px) scale(1.1)';
      setTimeout(()=> droneBox.style.transform = 'translateX(220px) translateY(-200px)', 1500);
      setTimeout(()=> droneBox.style.transform = 'translateY(0) scale(1)', 3200);
    });
  }

  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
  }

  // online sync demo
  window.addEventListener('online', () => {
    const pending = JSON.parse(localStorage.getItem('nutri_pending')|| '[]');
    if (pending.length) {
      notify('Syncing ' + pending.length + ' offline donations (demo).');
      localStorage.removeItem('nutri_pending');
    }
  });
});

function notify(msg){
  const box = document.createElement('div');
  box.className = 'notification';
  box.innerText = msg;
  document.body.appendChild(box);
  setTimeout(()=> box.remove(), 5000);
}