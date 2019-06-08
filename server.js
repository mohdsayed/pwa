const express = require( 'express' );
const next = require( 'next' );

const dev = process.env.NODE_ENV !== 'production';

const app = next( { dev } );
const handle = app.getRequestHandler();

app.prepare().then( () => {
	const server = new express();

	server.get( '/p/:id', ( req, res ) => {
		const actualPage  = '/post';
		const queryParams = { id: req.params.id };
		app.render( req, res, actualPage, queryParams );
	} );

	server.get( '*', ( req, res ) => handle( req, res ) );

	server.listen( 3000, err => {
		if ( err ) {
			throw err;
		}

		console.warn( '> Ready on http://localhost:3000' );
	} );
} ).catch( exc => {
	console.error( exc.stack );
	process.exit( 1 );
} );
