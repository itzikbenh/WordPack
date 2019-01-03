const path                    = require('path');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const UglifyJSPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin       = require('browser-sync-webpack-plugin');

const config = {
	entry: {
		app: './assets/src/js/app.js',
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
				  	use: ['css-loader', 'postcss-loader', 'sass-loader']
				}),
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('/css/[name].css'),
		new BrowserSyncPlugin({
		    proxy: 'wordpack.dev',
		    port: 3000,
		    files: [
		        '**/*.php'
		    ],
		    ghostMode: {
		        clicks: false,
		        location: false,
		        forms: false,
		        scroll: false
		    },
		    injectChanges: true,
		    logFileChanges: true,
		    logLevel: 'debug',
		    logPrefix: 'wepback',
		    notify: true,
		    reloadDelay: 0
		})
	]
};

module.exports = (env, argv) => {
	if (argv.mode === 'production') { //If true JS and CSS files will be minified
		config.plugins.push(
			new UglifyJSPlugin(),
			new OptimizeCssAssetsPlugin()
		);
	}

	return config;
};
