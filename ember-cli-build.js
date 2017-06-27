'use strict';
const crypto = require('crypto');
const randomString = require('randomstring').generate();
const git = require('git-rev-sync');
const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const prod = process.env.EMBER_ENV === 'production';
const customHash = crypto.createHash('md5').update(randomString).digest('hex');
// get last commit short hash
const version = git.short();

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    fingerprint: {
      enabled: prod,
      exclude: ['icon'],
      generateAssetMap: prod,
      fingerprintAssetMap: prod,
      customHash,
    },
    'esw-index': {
      location: 'index.html',
      // Bypass esw-index and don't serve cached index file for matching URLs
      excludeScope: [/\/localhost(\/.*)?$/],
      version,
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        '**/*',
      ],
      exclude: [
        '**/*.txt',
        'test.json',
        'sw.js',
      ],
      version,
      requestMode: 'cors',
    },
    'esw-cache-fallback': {
      patterns: [
        '/',
        'index.html',
      ],
      version,
    },
    minifyJS: {
      enabled: prod,
      options: {
        mangle: true,
      },
    },
    minifyCSS: {
      enabled: prod,
    },
    inlineContent: {
      'critical-css': 'src/ui/styles/app.css',
    },
    minifyHTML: {
      enabled: prod,
      htmlFiles: ['index.html'],
      minifierOptions: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    },
  });
  
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  
  return app.toTree();
};
