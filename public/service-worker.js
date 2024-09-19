self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        '/img/icons/icon-192x192.png',
        '/img/icons/icon-512x512.png',
        '/assets/audios/bomb-explosion.mp3',
        '/assets/audios/flag.mp3',
        '/assets/audios/more-than-one-numbers.mp3',
        '/assets/audios/one-number.mp3',
        '/assets/audios/winner.mp3',
        '/assets/fonts/BleedingCowboys.ttf',
        '/assets/fonts/Thelamonblack.ttf',
        '/assets/images/background.png',
        '/assets/bomb_compressed.gif',
        '/assets/bomb.gif',
        '/assets/explosion.gif'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
