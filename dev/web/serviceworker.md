# Service Worker

## 简介

Service worker 是后台运行的一个 JavaScript 脚本。它由前台页面的 JavaScript 脚本新建，运行在独立的线程。它是异步的，不会造成页面的堵塞，可以发出通知（push notification），但拿不到 DOM。它要求页面必须使用 HTTPS 协议。

Service Worker 一共有6种状态。

- parsed
- installing
- installed
- activating
- activated
- redundant

登记Service Worker。

``` javascript
/* In main.js */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    console.log("Service Worker Registered", registration);
  })
  .catch(function(err) {
    console.log("Service Worker Failed to Register", err);
  })
}
```

一旦登记成功，Service Worker的状态就变成了`parsed`。

然后，浏览器尝试安装Service Worker脚本，这时它的状态就变成了`installing`。

```javascript
/* In main.js */
navigator.serviceWorker
.register('./sw.js')
.then(function(registration) {
  if (registration.installing) {
    // Service Worker is Installing
  }
})
```

一旦进入安装阶段，Service Worker脚本会接收到一个`install`事件。这个事件的回调函数里面，可以缓存静态文件。

```javascript
/* In sw.js */
var cacheName = 'your-first-service-worker';
var urlsToCache = [
  '/',
  'css/tachyons.min.css',
  'img/andre-benz-248755.jpg',
  'img/andre-benz-250740.jpg',
  'img/andre-benz-256762.jpg',
  'img/redd-angelo-230297.jpg'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
```

上面代码中，事件对象有一个`event.waitUntil()`方法，只有这个方法内部的 Promise 变成`resolved`以后，`installing`事件才会成功。如果Promise变成`rejected`，`installing`事件就会失败，Service Worker 变成`redundant`状态。

```javascript
/* In sw.js */
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.reject(); // Failure
  );
});
```

如果安装成功，Service Worker就变成`installed`状态，或者也叫`waiting`状态。这时，Service Worker是有效的，但还没有被激活。它还不受当前文档控制，而是等待接受控制的状态。

主脚本之中可以检查，是否处于`waiting`状态。

```javascript
/* In main.js */
navigator.serviceWorker.register('./sw.js').then(function(registration) {
  if (registration.waiting) {
    // Service Worker is Waiting
  }
})
```

这时可以通知用户升级版本，或者为他们自动更新。

以下几种情况，Service Worker会进入`activating`状态。

- 当前没有活跃的Worker
- Service Worker脚本里面，调用了`self.skipWaiting()`方法
- 用户离开当前页面，因此释放了前一个活跃的worker
- 经过一段时间，前一个活跃的worker已经释放

进入`activating`状态时，Service Worker 脚本会接收到`active`事件，通常在这个事件的回调函数里面清除旧缓存。

```javascript
/* In sw.js */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    // Get all the cache names
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // Get all the items that are stored under a different cache name than the current one
        cacheNames.filter(function(cacheName) {
          return cacheName != currentCacheName;
        }).map(function(cacheName) {
          // Delete the items
          return caches.delete(cacheName);
        })
      ); // end Promise.all()
    }) // end caches.keys()
  ); // end event.waitUntil()
});
```

上面代码中，也有一个`event.waitUntil()`方法，只有它里面的Promise变成`resolved`，激活才能成功。否则，就会激活失败，Service Worker变成`redundant`。

如果激活成功，Service Worker就变成`active`状态，这时Service Worker会完全控制文档。我们可以这样检查是否进入这个状态。

```javascript
/* In main.js */
navigator.serviceWorker.register('./sw.js').then(function(registration) {  
    if (registration.active) {
        // Service Worker is Active
    }
})
```

一旦Service Worker激活，它就能处理fetch 和 message 事件。

```javascript
/* In sw.js */

self.addEventListener('fetch', function(event) {  
  // Do stuff with fetch events
});

self.addEventListener('message', function(event) {  
  // Do stuff with postMessages received from document
});
```

由于以下原因，Service Worker会变成`redundant`状态。

- installing 事件失败
- activating 事件失败
- 一个新的Service Worker取代了当前活跃的Service worker

用户发出请求时，会触发`fetch`事件。

```javascript
// Fetch the contents and reply with cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
        })
    );
});
```

## 参考链接

- [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/), by Ire Aderinokun
- [Your first service worker](https://www.hacklabo.com/your-first-service-worker/), by Nicola
