import * as express from 'express';
import { Movies } from '../controllers';
import { validateType, filterQuery } from '../middlewares/validation';

const movies = express.Router();
const { getMovies, getSingleMovie } = Movies;

movies.route('/media/:type')
  .get(validateType, getMovies);

movies.route('/search')
  .get(filterQuery, getSingleMovie);

export default movies;
