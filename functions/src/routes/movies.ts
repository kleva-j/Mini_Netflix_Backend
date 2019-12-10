import * as express from 'express';
import { Movies } from '../controllers';
import { validateType, filterQuery } from '../middlewares/validation';
import { CacheMiddleware } from '../middlewares/cacheMiddleware';

const movies = express.Router();
const { getMovies, getSingleMovie } = Movies;

movies.route('/media/:type')
  .get(validateType, CacheMiddleware(60), getMovies);

movies.route('/search')
  .get(filterQuery, CacheMiddleware(60), getSingleMovie);

export default movies;
