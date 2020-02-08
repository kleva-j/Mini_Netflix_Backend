import { https } from 'firebase-functions';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

import router from './routes';

const app = express();

// Enable/Install Middlewares
app.use(helmet())
   .use(logger('dev'))
   .use(cors({ origin: true }))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(router)
   .use('*', (_, res) => res.status(404)
   .json({
     status: 'success',
     data: 'Nothing to show here.',
   }));

export const api = https.onRequest(app);
