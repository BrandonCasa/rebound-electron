import express from 'express';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let mongod = null;

async function startMongoDevServer() {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongod = new MongoMemoryServer({
    instance: {
      port: 27017,
      dbName: 'rebound',
      dbPath: './mongod/',
      auth: true,
    },
    binary: {
      version: '6.0.4',
    },
  });

  await mongod.start();
  mongod.auth.customRootName = 'myUserAdmin';
  mongod.auth.customRootPassword = 'myUserAdminPassword';
  return mongod;
}

async function initDev() {
  if (process.env.NODE_ENV === 'development') {
    mongod = await startMongoDevServer();
    console.log('URI: ', mongod.getUri());
  }
}

async function startServer() {
  const app = express();

  await initDev();

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

startServer();