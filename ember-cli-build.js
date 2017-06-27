'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    fingerprint: {
      exclude: ['icon'],
      enabled: true,
    },
    'esw-cache-fallback': {
      patterns: [
        '/v0/(.+)',
      ],
    },
    minifyJS: {
      enabled: true,
    },
    minifyCSS: {
      enabled: true,
    },
    inlineContent: {
      'critical-css': 'src/ui/styles/app.css',
    },
    minifyHTML: {
      enabled: true,
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
