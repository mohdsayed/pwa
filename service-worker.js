importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "images/my-desktop.jpeg",
    "revision": "87b9f6546ba8c5c5807d7666d79db8cf"
  },
  {
    "url": "index.html",
    "revision": "b287dadfcda4957d79f995142a4b01cb"
  },
  {
    "url": "main.js",
    "revision": "150e3cec3bc3bebbd82da123b24352a4"
  },
  {
    "url": "style.css",
    "revision": "6cb3f636c5b40cce97691a3d1d049321"
  },
  {
    "url": "sw.js",
    "revision": "640a7b25992995be509727fa93ca8c9a"
  },
  {
    "url": "workbox.config.js",
    "revision": "a7e2df4d9798f56c743b06ee74daf30f"
  }
]);
