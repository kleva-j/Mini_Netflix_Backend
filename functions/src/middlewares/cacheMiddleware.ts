import NodeCache from 'node-cache';
import { Request, Response } from 'express';

export const CacheMiddleware = (timeout: number) => {
  // @ts-ignore
  return (req: Request, res: Response, next: Function) => {
    const Cache = new NodeCache({ stdTTL: timeout, checkperiod: timeout * 2, useClones: false })
    const key =  `cache<=>${req.originalUrl || req.url}`;
    const cacheContent = Cache.get(key);
    if(cacheContent) {
      return res.status(200).json({
        status: 'Success',
        result: cacheContent
      });
    } else{
      // @ts-ignore
      res.sendJson = res.json;
      // @ts-ignore
      res.json = ({ status, result, ...rest }) => {
        Cache.set(key, result, timeout);
        // @ts-ignore
        res.sendJson({ status, result, ...rest });
      }
      next();
    }
  }
}
