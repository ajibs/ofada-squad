'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bootstrap = require('./bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

_dotenv2.default.config();

// connect to database
_mongoose2.default.connect(process.env.DATABASE);
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connection.on('error', err => {
  _winston2.default.error(`Error!: ${err.message}`);
});

_winston2.default.info(`My database is ${process.env.DATABASE}`);

app.start = async () => {
  _winston2.default.info('Starting Server...');
  const port = process.env.PORT;
  app.set('port', port);
  (0, _bootstrap2.default)(app);
  const server = _http2.default.createServer(app);

  server.on('error', error => {
    if (error.syscall !== 'listen') throw error;
    _winston2.default.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    _winston2.default.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port);
};

app.start().catch(err => {
  _winston2.default.error(err);
});