self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  console.log(url)
  console.log(url.pathname)
  // Se o arquivo for o GIF com o parâmetro ?t=...
  if (url.pathname.startsWith('bomb_compressed.gif')) {
    // Remove o parâmetro para buscar o cache
    url.search = '' // Remove os parâmetros de cache busting

    event.respondWith(
      caches.match(url).then((response) => {
        if (response) {
          // Se o arquivo já está no cache, o retorna
          return response
        }

        // Se não está no cache, busca na rede
        return fetch(event.request).then((networkResponse) => {
          // Opcionalmente, adiciona a resposta ao cache
          return caches.open('dynamic-cache').then((cache) => {
            cache.put(url, networkResponse.clone())
            return networkResponse
          })
        })
      })
    )
  } else {
    // Processa outros arquivos normalmente
    event.respondWith(fetch(event.request))
  }
})
