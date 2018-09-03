'use strict';

/**
 * This is the Form.io application server.
 */
const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs-extra');
const util = require('./src/util/util');
require('colors');
const Q = require('q');
const test = process.env.TEST_SUITE;

module.exports = function(options) {
  options = options || {};
  const q = Q.defer();

  util.log('');
  const rl = require('readline').createInterface({
    input: require('fs').createReadStream('logo.txt')
  });

  rl.on('line', function(line) {
    util.log(
      line.substring(0,4) +
      line.substring(4, 30).cyan.bold +
      line.substring(30, 33) +
      line.substring(33, 42).green.bold +
      line.substring(42)
    );
  });

  rl.on('close', function() {
    // Print the welcome screen.
    util.log('');
    util.log(fs.readFileSync('welcome.txt').toString().green);
  });

  // Use the express application.
  const app = options.app || express();

  // Use the given config.
  const config = options.config || require('config');

  // Configure nunjucks.
  nunjucks.configure('client', {
    autoescape: true,
    express: app
  });

  // Mount the client application.
  app.use('/', express.static(`${__dirname}/client/dist`));

  // Load the form.io server.
  const server = options.server || require('./index')(config);
  const hooks = options.hooks || {};

  app.use(server.formio.middleware.restrictRequestTypes);
  server.init(hooks).then(function(formio) {
    // Called when we are ready to start the server.
    const start = function() {

      // Mount the Form.io API platform.
      app.use(options.mount || '/', server);

      // Allow tests access server internals.
      app.formio = formio;

      // Listen on the configured port.
      return q.resolve({
        server: app,
        config: config
      });
    };

    // Which items should be installed.
    const install = {
      configure: false,
      import: false,
      user: false
    };

    // If not a test, reconfigure client (required for port updates)
    if (!test) {
      install.configure = true;
    }

    // See if they have any forms available.
    formio.db.collection('forms').count(function(err, numForms) {

      // Import the project and create the user.
      install.import = true;
      install.user = true;

      // If there are forms, then go ahead and start the server.
      if ((!err && numForms > 0) || test) {
        install.import = false;
        install.user = false;
        if (!install.configure) {
          return start();
        }
      }

      // Install.
      require('./install')(formio, install, function(err) {
        if (err) {
          return util.log(err.message);
        }

        // Start the server.
        start();
      });
    });
  });

  return q.promise;
};
