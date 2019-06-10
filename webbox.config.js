const workboxBuild = require( 'workbox-build' );

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {

	return workboxBuild.injectManifest( {
		swSrc: 'sw.js',
		swDest: 'service-worker.js',
		globDirectory: __dirname,
		globPatterns: [
			'**\/*.{js,css,html,png,jpeg}',
		]
	} ).then( ( { count, size, warnings } ) => {
		warnings.forEach( console.warn );
		console.log( `${ count } files will be precached, totaling ${ size } bytes.` );
	} );
};

buildSW();
