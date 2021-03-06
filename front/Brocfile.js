/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

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

//css
app.import('bower_components/foundation/css/normalize.css');


// 在这里使用 non-amd import js, 则是依次添加在后面的
app.import('bower_components/Cookies/dist/cookies.min.js');
app.import('bower_components/foundation/js/vendor/modernizr.js');
app.import('bower_components/foundation/js/foundation.js');

module.exports = app.toTree();
