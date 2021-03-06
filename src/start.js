import 'babel-polyfill';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import winston from 'winston';
import dotenv from 'dotenv';

import bootstrap from './bootstrap';

const app = express();

dotenv.config();

// connect to database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  winston.error(`Error!: ${err.message}`);
});

app.start = async () => {
  winston.info('Starting Server...');
  const port = process.env.PORT;
  app.set('port', port);
  bootstrap(app);
  const server = http.createServer(app);

  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    winston.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    winston.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port);
};

app.start().catch((err) => {
  winston.error(err);
});
