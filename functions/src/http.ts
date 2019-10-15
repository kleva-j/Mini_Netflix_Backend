import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import router from './routes';

const app = express();

// Enable/Install Middlewares
app.use(cors({ origin: true }));
app.use(router);

export const api = functions.https.onRequest(app);
