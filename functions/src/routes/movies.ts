import * as express from 'express';
import { Movies } from '../controllers';

const movies = express.Router();
const { getMovies, getSingleMovie } = Movies;

movies.route('/movies')
  .get(getMovies);

movies.route('/movies/search')
  .get(getSingleMovie);

export default movies;
