import * as express from 'express';
import moviesRoute from './movies';
import usersRoute from './users';

const router = express.Router();

router.use(moviesRoute);
router.use('/user', usersRoute);

export default router;
