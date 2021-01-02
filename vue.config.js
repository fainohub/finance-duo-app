const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

// vue.config.js
module.exports = {
  lintOnSave: true,
  filenameHashing: true,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets')
      }
    },
    output: {
      chunkFilename: "[name].[hash].js",
      filename: "[name].[hash].js",
    },
  },

  pwa: {
    name: 'Artishup Studio',
    themeColor: '#ffc200',
    msTileColor: '#ffc200',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ffc200',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
    workboxOptions: {
      cacheId: 'phrasebook',
      importWorkboxFrom: 'local',
      navigateFallback: 'shell.html',
      navigateFallbackWhitelist: [/^((?!\/404).)*$/],
      // … other Workbox options …
    },
  },

  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
