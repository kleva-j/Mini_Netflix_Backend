import NodeCache from 'node-cache';
import { Request, Response } from 'express';

export const CacheMiddleware = (timeout: number) => {
  // @ts-ignore
  return (req: Request, res: Response, next: Function) => {
    const Cache = new NodeCache({ stdTTL: timeout, checkperiod: timeout * 2, useClones: false })
    let key =  `cache<=>${req.originalUrl || req.url}`;
    let cacheContent = Cache.get(key);
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
        console.log(status, rest)
        Cache.set(key, result, timeout);
        // @ts-ignore
        res.sendJson({ status, result, ...rest });
      }
      next();
    }
  }
}
