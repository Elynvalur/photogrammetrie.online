const CACHE_NAME = "photogrammetrie.online-v1";
const URLS_CACHE_ONLY = ["./index.html"];

const URLS_OVER_NETWORK = [];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(URLS_CACHE_ONLY.concat(URLS_OVER_NETWORK));
      })
      .catch((err) => {
        console.error(err);
        return new Promise((resolve, reject) => {
          reject("Error: " + err);
        });
      })
  );
});

self.addEventListener("fetch", function (event) {
  const requestURL = new URL(event.request.url);

  console.log(requestURL.pathname);
  if (requestURL.pathname === "/") {
    event.respondWith(getURLNetwork("./index.html"));
  } else if (
    URLS_CACHE_ONLY.includes(requestURL.href) ||
    URLS_OVER_NETWORK.includes(requestURL.pathname)
  ) {
    event.respondWith(getURLNetwork(event.request));
  } else if (
    URLS_CACHE_ONLY.includes(requestURL.href) ||
    URLS_CACHE_ONLY.includes(requestURL.pathname)
  ) {
    event.respondWith(getURLCache(event.request));
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (
            CACHE_NAME !== cacheName &&
            cacheName.startsWith("photogrammetrie.online-v1")
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

const getURLNetwork = (request, showAlert = false) => {
  return caches.open(CACHE_NAME).then((cache) => {
    return fetch(request)
      .then((networkResponse) => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      })
      .catch(() => {
        if (showAlert) {
          alert("You are in offline mode.");
        }
        return caches.match(request);
      });
  });
};

const getURLCache = (request) => {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.match(request).then((response) => {
      return response;
    });
  });
};
