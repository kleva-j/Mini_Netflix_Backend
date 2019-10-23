import { Request, Response } from 'express';
import { sampleData } from '../models/sample';

export class Movies {
  static getMovies(req: Request, res: Response) {
    return res.status(200).json({
      success: false,
      data: sampleData,
    })
  }

  static getSingleMovie(req: Request, res: Response) {
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
      success: false,
      message: 'Movie not found',
    });
  }
}
