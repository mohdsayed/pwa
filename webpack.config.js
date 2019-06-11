const path        = require( 'path' ),
      htmlPlugin  = require( 'html-webpack-plugin' ),
      cleanPlugin = require( 'clean-webpack-plugin' ),
      dist        = 'dist';

const workboxPlugin = require( 'workbox-webpack-plugin' );

module.exports = {
	entry: {
		index: './src/app.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, dist )
	},
	plugins: [
		new cleanPlugin( [ dist ] ),
		new htmlPlugin( {
			filename: 'index.html',
			title: 'Get Started With Workbox For Webpack'
		} ),
		new workboxPlugin.InjectManifest( {
			swSrc: './src/sw.js',
		} )
	]
};
