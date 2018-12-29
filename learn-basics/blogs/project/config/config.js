const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/nodeblog'
  },

  test: {
    root: rootPath,
    app: {
      name: 'project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/project-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/project-production'
  }
};

module.exports = config[env];
