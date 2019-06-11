/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function init() {
	let manifest  = document.createElement( 'link' );
	manifest.rel  = 'manifest';
	manifest.href = '/manifest.json';
	document.head.appendChild( manifest );
	let title         = document.createElement( 'h1' );
	title.textContent = 'Top 10 Hacker News Stories';
	document.body.appendChild( title );
	let list = document.createElement( 'ol' );
	document.body.appendChild( list );
	fetchTop10().then( stories => renderTop10( stories ) );

	if ( 'serviceWorker' in navigator ) {
		window.addEventListener( 'load', () => {
			navigator.serviceWorker.register( '/sw.js' ).then( registration => {
				console.log( 'SW registered: ', registration );
				registration.pushManager.subscribe( { userVisibleOnly: true } );
			} ).catch( registrationError => {
				console.log( 'SW registration failed: ', registrationError );
			} );
		} );
	}
}

function fetchTop10() {
	return fetch( TOP_STORIES_URL ).then( response => {
		return response.json();
	} ).then( ids => {
		let top10Ids = ids.slice( 0, 10 );
		let urls     = top10Ids.map(
			id => `https://hacker-news.firebaseio.com/v0/item/${ id }.json`
		);
		let requests = urls.map( url => fetch( url ).then( response => response.json() ) );
		return Promise.all( requests );
	} );
}

function renderTop10( stories ) {
	let list       = document.querySelector( 'ol' );
	list.innerHTML = '';
	stories.forEach( story => {
		let item         = document.createElement( 'li' );
		item.textContent = story.title;
		list.appendChild( item );
	} );
}

init();


/***/ })
/******/ ]);