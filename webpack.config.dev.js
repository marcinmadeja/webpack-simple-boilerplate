const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const Main = require('./webpack.config.common');
const PATHS = Main.PATHS();

const commonConfig = merge([Main.commonConfig()]); 
const productionConfig = merge([
  {
    entry: {
      app: [PATHS.src + '/scripts/index.js'],
      sass: PATHS.src + '/sass/main.scss',
    },
  },
  parts.devServer(),
  parts.loadCSS(),
  parts.lintCSS({ include: PATHS.src }),
  parts.loadImages( {
    use: [ 
      { 
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]',
        },
      }, 
    ],
  }),

  parts.loadFonts({
    options: {
      name: './fonts/[name].[hash:8].[ext]',
    },
  }), 
]);

module.exports = () => {
  return merge(commonConfig, productionConfig);
};