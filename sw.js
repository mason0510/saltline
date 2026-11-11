/**
 * L3 document cache for https://3a.mwcpool.uk/.
 * Guarantees: a newer mason-3a-l3 cache replaces older mason-3a-l3 caches on activate.
 * Network-first for HTML and this script, so a redeploy is visible while online.
 * Cache is only the fallback when the network fails. Does not cache POST, and does not cache other origins.
 */
var MASON_L3 = "mason-3a-l3-v5";

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf("mason-3a-l3-") === 0 && key !== MASON_L3;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  var live = url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "/sw.js";
  event.respondWith(
    fetch(request).then(function (response) {
      if (response && response.ok) {
        var copy = response.clone();
        caches.open(MASON_L3).then(function (cache) {
          return cache.put(request, copy);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(request).then(function (hit) {
        return hit || (live ? caches.match("/") : Promise.reject());
      });
    })
  );
});
