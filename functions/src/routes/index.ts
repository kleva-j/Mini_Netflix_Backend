import * as express from 'express';
import movies from './movies';

const router = express.Router();

router.use(movies);

export default router;
