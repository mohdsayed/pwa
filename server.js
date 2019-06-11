const express = require( 'express' ),
      app     = express(),
      dist    = 'dist';

app.use( express.static( dist ) );

app.get( '/', ( request, response ) => {
	response.sendFile( `${ __dirname }/${ dist }/index.html` );
} );

app.get( '/node_modules/workbox-sw/build/importScripts/:version', ( request, response ) => {
	response.sendFile( `${ __dirname }/node_modules/workbox-sw/build/importScripts/${ request.params.version }` );
} );

app.get( '/manifest.json', ( request, response ) => {
	response.json( {
		// Note: Borrowing sender ID from Simple Push Demo.
		// https://github.com/gauntface/simple-push-demo/blob/master/src/manifest.json
		"gcm_sender_id": "653317226796"
	} );
} );

const listener = app.listen( 5000, function () {
	console.log( `Your app is listening on port ${ listener.address().port }` );
} );
