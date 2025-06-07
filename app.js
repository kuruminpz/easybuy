if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log("✅ Service Worker registrado"))
        .catch(err => console.error("❌ Falha ao registrar Service Worker:", err));
    });
  }
  