self.addEventListener('install', () => {
  console.info('Service Worker instalado')
})

self.addEventListener('activate', () => {
  console.info('Service Worker ativado')
  return self.clients.claim() // Faz com que o SW controle imediatamente as páginas
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  console.log(url)
  console.log(url.pathname)

  // Verifique se a URL contém o arquivo "bomb_compressed"
  if (url.pathname.includes('bomb_compressed')) {
    // Remove os parâmetros de cache busting
    url.search = '' // Remove parâmetros como ?t=123456

    event.respondWith(
      caches.match(url).then((response) => {
        if (response) {
          // Retorna o arquivo do cache se disponível
          return response
        }

        return fetch(event.request).then((networkResponse) => {
          // Cacheia o arquivo dinamicamente
          return caches.open('dynamic-cache').then((cache) => {
            cache.put(url, networkResponse.clone())
            return networkResponse
          })
        })
      })
    )
  }
})
