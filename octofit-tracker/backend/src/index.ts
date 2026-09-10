import { connectDatabase } from './config/database.js';
import { app, port } from './server.js';

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed', error);
    process.exitCode = 1;
  });
