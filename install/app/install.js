'use strict';

const async = require('async');
const fs = require('fs-extra');
const _ = require('lodash');
const nunjucks = require('nunjucks');
nunjucks.configure([], {watch: false});
const util = require('./src/util/util');
const debug = require('debug')('formio:error');
const path = require('path');

module.exports = function(formio, items, done) {
  // The client directory
  const client = path.join(__dirname, 'client');

  // The formio project configuration
  const project = {
    config: {},
    template: 'project.default.json',
    user: {
      form: 'user',
      loginForm: 'user/login',
    },
    root: {
      email: 'admin@example.com',
      password: 'admin.123'
    }
  };

  if (formio.config.project) {
    if (formio.config.project.template) {
      project.template = `project.${formio.config.project.template}.json`;
    }
    if (formio.config.project.root.email) {
      project.root.email = formio.config.project.root.email;
    }
    if (formio.config.project.root.password) {
      project.root.password = formio.config.project.root.password;
    }
    if (formio.config.project.user) {
      project.user.form = formio.config.project.user.form || 'user';
      project.user.loginForm = formio.config.project.user.loginForm || 'user/login';
    }
  }

  const pkgs = {
    api: path.join(__dirname, 'package.json'),
    client: path.join(__dirname, 'client', 'package.json')
  }

  // All the steps in the installation.
  const steps = {

    /**
     * Extract the client.
     *
     * @param done
     * @returns {*}
     */
    configureClient: function(done) {
      if (!items.configure) {
        return done();
      }

      let templateFile = path.join(__dirname, 'templates', 'config.template.js');
      let directoryPath = client;

      // Get the package json file.
      let info = {
        api: {},
        client: {}
      };
      try {
        info.api = JSON.parse(fs.readFileSync(pkgs.api));
        info.client = JSON.parse(fs.readFileSync(pkgs.client));
      }
      catch (err) {
        debug(err);
        return done(err);
      }

      // Change the document root if we need to.
      if (info.client.formio && info.client.formio.docRoot) {
        directoryPath = path.join(directoryPath, info.client.formio.docRoot);
      }

      // Check that config.template.js exists
      if (!fs.existsSync(templateFile)) {
        templateFile = path.join(directoryPath, 'config.template.js');

        if (!fs.existsSync(templateFile)) {
          return done('Missing config.template.js file');
        }
      }

      // Change the project configuration.
      util.log('Configuring the client'.green);
      const config = fs.readFileSync(templateFile);
      const newConfig = nunjucks.renderString(config.toString(), {
        protocol: formio.config.protocol || 'http',
        host: formio.config.appHost || 'localhost',
        port: formio.config.appPort || '8080',
        userForm: project.user.form,
        userLoginForm: project.user.loginForm
      });
      fs.writeFileSync(path.join(directoryPath, 'config.js'), newConfig);

      let configInfo = `API=${info.api.version}\nCLIENT=${info.client.version}\nSCHEMA=${info.api.schema}\nTEMPLATE=${info.api.templateVersion}\nCREATED=${Date.now() / 1000 | 0}`;
      fs.writeFileSync(path.join(__dirname, '.formio'), configInfo);

      done();
    },

    /**
     * Import the template.
     * @param done
     */
    importTemplate: function(done) {
      if (!items.import) {
        return done();
      }

      let templateFile = path.join(__dirname, 'templates', project.template);
      let directoryPath = client;

      // Get the package json file.
      let info = {};
      try {
        info = JSON.parse(fs.readFileSync(path.join(directoryPath, 'package.json')));
      }
      catch (err) {
        debug(err);
        return done(err);
      }

      // Change the document root if we need to.
      if (info.formio && info.formio.docRoot) {
        directoryPath = path.join(directoryPath, info.formio.docRoot);
      }

      // Check that config.template.js exists
      if (!fs.existsSync(templateFile)) {
        templateFile = path.join(directoryPath, 'project.json');
        
        if (!fs.existsSync(templateFile)) {
          return done('Missing project.json file'.red);
        }
      }

      let template = {};
      try {
        template = JSON.parse(fs.readFileSync(templateFile));
      }
      catch (err) {
        debug(err);
        return done(err);
      }

      // Get the form.io service.
      util.log('Importing template'.green);
      const importer = require('./src/templates/import')({formio: formio});
      importer.template(template, function(err, template) {
        if (err) {
          return done(err);
        }

        project.config = template;
        done(null, template);
      });
    },

    /**
     * Create the root user object.
     *
     * @param done
     */
    createRootUser: function(done) {
        util.log('Checking if Root account exists')
      if (!items.user) {
        util.log('Root account already exists')
        return done();
      }
      util.log('Creating root user account...'.green);
      util.log('Encrypting password');
      formio.encrypt(project.root.password, function(err, hash) {
        if (err) {
          return done(err);
        }

        // Create the root user submission.
        util.log(`Creating root user account ${project.root.email}`);
        formio.resources.submission.model.create({
          form: project.config.resources.admin._id,
          data: {
            email: project.root.email,
            password: hash
          },
          roles: [
            project.config.roles.administrator._id
          ]
        }, function(err, item) {
          if (err) {
            return done(err);
          }

          done();
        });
      });
    }
  };

  util.log('Setting up FormIO');
  async.series([
    steps.configureClient,
    steps.importTemplate,
    steps.createRootUser
  ], function(err, result) {
    if (err) {
      util.log(err);
      return done(err);
    }

    util.log('Install successful!'.green);
    done();
  });
};
