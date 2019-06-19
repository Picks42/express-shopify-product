var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var config = {
    // TODO: Add common Configuration
    module: {},
};
module.sorceEnable = false;

var barConfig = Object.assign({}, config, {
	entry:'./javascript/appjs.js',
	watch:true,
	output:{
		path:__dirname,
		filename:'public/theme.js'
	},
	module: {
		rules: [
		{
			test: /\.scss$/,
			use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: __dirname
          }
      },
      "css-loader",
      "sass-loader"
      ]
  }
  ]
},
plugins:[
new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "public/theme.css"
        }),
new webpack.ProvidePlugin({
	$:"jquery",
	jQuery:"jquery"
})
]
});
// Return Array of Configurations
module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		// barConfig.devtool = 'source-map';
	}
	return [
	 barConfig,       
	];
};