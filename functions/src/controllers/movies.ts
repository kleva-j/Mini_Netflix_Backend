import { sampleData } from '../models/sample';

export class Movies {
  static getMovies(req: any, res: any) {
    return res.status(200).json({
      status: 'success',
      data: sampleData,
    })
  }

  static getSingleMovie(req: any, res: any) {
    const { t } = req.query;
    const movie = t ? t.toLowerCase() : '';
    const moviesList = Object.keys(sampleData);
    if (moviesList.indexOf(movie) !== -1) {
      return res.status(200).json({
        status: 'success',
        result: sampleData[movie],
      });
    }
    return res.status(404).json({
      status: 'failed',
      message: 'Movie not found',
    })
  }
}
