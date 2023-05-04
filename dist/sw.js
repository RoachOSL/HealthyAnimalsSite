const staticHealAnima = "dev-healthy-animal-site-v1"
const assets = [
  "/HealthyAnimalsSite/index.html",
  "/HealthyAnimalsSite/src/assets/main.css",
  "/HealthyAnimalsSite/src/main.js",
  "/HealthyAnimalsSite/images/logo.jpg",
  "/HealthyAnimalsSite/manifestLogo-192.png",
  "/HealthyAnimalsSite/manifestLogo-512.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticHealAnima).then(cache => {
      cache.addAll(assets)
        .catch(error => {
          console.error('Error adding assets to cache:', error);
        });
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})