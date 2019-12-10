import { Request, Response } from 'express';
import { MovieSeries, TvSeries } from '../models/sample';
import { filterOptions } from '../helpers/filter';

export class Movies {
  static getMovies(req: Request, res: Response) {
    const { params: { type } } = req;
    return res.status(200).json({
      status: 'success',
      result: {
        [type]: type === 'movies'? MovieSeries : TvSeries,
      },
    })
  }

  static getSingleMovie(req: Request, res: Response) {
    const result = [...(TvSeries.filter(filterOptions, req.query)), ...(MovieSeries.filter(filterOptions, req.query))]
    return res.status(200).json({
      status: 'success',
      result,
      'search parameters': req.query
    });
  }
}
