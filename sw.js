/**
 * Service worker scripts.
 *
 * install event
 * - It is the first event a service worker gets.
 * - It's triggered as soon as the worker executes, and it's only called once per service worker.
 * - While the browser executes the register() code every time you refresh the page,
 * - it won't install the service worker if the service worker file hasn't changed.
 * - If the file only changed by 1 byte though, it'll install it as a new service worker.
 * - This is a good place to cache your files.
 *
 * activate event
 * - Is triggered once your service worker is ready to control clients and handle functional events like push and sync.
 * - This is a good point to delete other old service workers and claim the client.
 *
 * fetch event
 * - Is triggered after user refreshes and requests are sent to any file.
 * - It will trigger for any file request in the scope even if it was not cached, for example new image src.
 * - This is a good point to intercept the fetch request and return a cached copied or fetch if not cached.
 *
 * event.waitUntil()
 * - Service worker lifecycle will go idle and then terminate.
 * - We use waitUntil because it tells the event dispatcher that until the promise settles,
 * - it shouldn't terminate the service worker.
 *
 * caches.open()
 * - It returns a Promise that resolves to the Cache object matching the cacheName.
 * - If the specified Cache does not exist, a new cache is created with that cacheName.
 *
 * self.skipWaiting()
 * - It forces the waiting service worker to become the active service worker.
 *
 * self.clients.claim()
 * - It ensure that updates to the underlying service worker
 * - take effect immediately for both the current client and all other active clients ( Other tabs )
 *
 * event.respondWith()
 * - We want to hijack the request whenever any fetch request is made.
 * - It prevents the browser's default fetch handling, and allows you to provide a promise for a Response yourself.
 *
 * caches.match()
 * - It resolves to the Response associated with the first matching request in the Cache object.
 * - If no match is found in cache for the request, the Promise resolves to undefined, here we can do the fetch() ourselves.
 *
 * event
 * - When handling install event check InstallEvent interface docs
 * - When handling activate event check ExtendableEvent interface docs
 * - When handling fetch event check InstallEvent interface docs.
 */

const cacheName = 'test-v1';

const cacheAssets = [
	'index.html',
	'style.css',
	'main.js',
];

self.addEventListener( 'install', event => {
	event.waitUntil(
		caches.open( cacheName )
			.then( cache => cache.addAll( cacheAssets ) )
			.then( () => self.skipWaiting() )
	);
} );

self.addEventListener( 'activate', event => {
	event.waitUntil(
		caches.keys().then( keys => {
			return Promise.all(
				keys.filter( key => {
					if ( key !== cacheName ) {
						caches.delete( key );
					}
				} )
			);
		} )
	);

	return self.clients.claim();
} );

self.addEventListener( 'fetch', event => {
	event.respondWith(
		caches.open( cacheName ).then(  cache => {

			return cache.match( event.request ).then( response => {
				if ( response ) {
					return response;
				}

				return fetch( event.request ).then( networkResponse => {
					cache.put( event.request, networkResponse.clone() );

					return networkResponse;
				} );
			} ).catch(  error => throw error );

		} )
	);
} );
