// Core assets
let coreAssets = [];

// On install, cache core assets
self.addEventListener("install", function (event) {
  // Cache core assets
  event.waitUntil(
    caches.open("app").then(function (cache) {
      return cache.addAll(coreAssets);
    })
  );
});

// Listen for request events
self.addEventListener("fetch", function (event) {
  // Get the request
  let request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // Respond with cached assets if available
  event.respondWith(
    caches.match(request).then(function (response) {
      // If asset is found in cache, return it
      if (response) {
        return response;
      }

      // If asset is not found in cache, fetch it from the network
      return fetch(request)
        .then(function (response) {
          // If response is valid, clone it and add it to the cache
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          let responseToCache = response.clone();
          caches.open("app").then(function (cache) {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(function () {
          // If network fetch fails, serve offline page
          return caches.match("/offline.html");
        });
    })
  );
});
