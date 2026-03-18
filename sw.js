const CACHE_NAME = 'health-tracker-v1';
const STATIC_ASSETS = [
  '/track-health/',
  '/track-health/index.html',
  '/track-health/css/style.css',
  '/track-health/js/app.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Install — cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => {
        return new Request(url, { mode: 'no-cors' });
      }));
    }).catch(() => {})
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', (e) => {
  // Skip Supabase API calls — always network
  if (e.request.url.includes('supabase.co') || 
      e.request.url.includes('workers.dev')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache successful GET responses
        if (e.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(e.request).then(cached => {
          if (cached) return cached;
          // Offline fallback for navigation
          if (e.request.mode === 'navigate') {
            return caches.match('/track-health/index.html');
          }
        });
      })
  );
});

// Push notification for water reminder
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Health Tracker', {
      body: data.body || 'পানি খাওয়ার সময়!',
      icon: '/track-health/icons/icon-192.png',
      badge: '/track-health/icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'water-reminder'
    })
  );
});