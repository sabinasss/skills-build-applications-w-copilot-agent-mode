import express, { type ErrorRequestHandler } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models/index.js';
import { createCrudRouter } from './routes/createCrudRouter.js';

const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

export const app = express();
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin ?? '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createCrudRouter(UserModel));
app.use('/api/teams', createCrudRouter(TeamModel));
app.use('/api/activities', createCrudRouter(ActivityModel, { sort: { recordedAt: -1 } }));
app.use('/api/leaderboard', createCrudRouter(LeaderboardModel, { sort: { rank: 1 } }));
app.use('/api/workouts', createCrudRouter(WorkoutModel));

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Unable to process request' });
};

app.use(errorHandler);

export { port };
