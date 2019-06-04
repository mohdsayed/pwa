const title = document.getElementById( 'title' );

title.textContent = 'Updated with JS';

if ( 'serviceWorker' in navigator ) {

	navigator.serviceWorker.register( '/sw.js' );

}
