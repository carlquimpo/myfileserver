import express from 'express';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';
import assert from 'assert';
import { env } from 'process';
import fs from 'fs';
import filesRouter from './routes/files';
import cleanUp from './jobs/cleanUp';

// Load env variables
config();

// Validate required env variables 
assert(env.PORT, "PORT configuration is required.");
assert(env.FOLDER, "FOLDER configuration is required.");

// Create directory for the folder configuration
fs.mkdir(env.FOLDER, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});

const app = express();

// Use file upload and routes resources
app.use(fileUpload());
app.use('/files', filesRouter);

// Listens to the specified port
app.listen(env.PORT, () => {
  // start scheduled cleanup jobs
  cleanUp.start();

  console.log(`File Sharing Server running at http://localhost:${env.PORT}`);
});