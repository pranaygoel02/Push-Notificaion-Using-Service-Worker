console.log('Service Worker Loaded...');

self.addEventListener('push', () => {
    self.registration.showNotification("hello world", {})
});

