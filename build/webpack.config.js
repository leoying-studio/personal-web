
var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
	entry: {
		app: './app.js'
	},
	mode: "production",
	output: {
		path: path.resolve(__dirname, '../', 'dist'),
		filename: 'bundle.js',
	},
	// 指定打包目标类型， 默认客户端
	target: 'node',
	node: {
		fs: 'empty',
		net: 'empty'
	},
	module: {
		rules: [
			{
			 test: /\.css$/, 
				use: [
					{
						loader: 'css-loader'
					},
					{ loader : 'style-loader'}
				] 
			},
			{
				
				test: /\.js$/, 
				use: [
					{
						loader: 'babel-loader'
					}
				] ,
				exclude:path.resolve(__dirname,'node_modules')
			   },
		]
	},
	plugins: [
		// 代码压缩
		new UglifyJSPlugin(),
	]
};