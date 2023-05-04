const staticHealAnima = "dev-healthy-animal-site-v1"
const assets = [
  "/index.html",
  "/src/assets/main.css",
  "/src/main.js",
  "/images/logo.jpg",
  "/HealthyAnimalsSite/images/manifestLogo-192.png",
  "/HealthyAnimalsSite/images/manifestLogo-192.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticHealAnima).then(cache => {
      cache.addAll(assets)
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