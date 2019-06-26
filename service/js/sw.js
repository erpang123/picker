var cacheStoageKey = 'minimal-pwa-3'
var cacheList = [
    '../',
    '../servie.html',
    '../css/service.css'
]
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheStoageKey).then((cache) => {
            console.log(cache)
            return cache.addAll(cacheList)
        })
    )
})