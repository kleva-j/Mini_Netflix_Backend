import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator';

export const returnValidationErrors = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) return next();
  return res.status(422).json({ errors, success: false });
};

const validateEmail = check('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .custom(value => !/\s/.test(value))
  .withMessage('No spaces are allowed in the email.');

const validatePassword = check('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long.')
  .custom(value => !/\s/.test(value))
  .withMessage('No spaces are allowed in the password.');

const validateUsername = check('username')
  .isAlphanumeric()
  .withMessage('Username is should be alphamumeric, no special characters and spaces.')
  .isLength({ min: 5, max: 15 })
  .withMessage('Username must be at least 5 characters long and not more than 15.')
  .custom(value => !/\s/.test(value))
  .withMessage('No spaces are allowed in the username.');

const paramsList = ['movies', 'tv'];

const validateParams = (req: Request, res: Response, next: Function) => {
  const { params: { type} } = req;
  return (paramsList.indexOf(type) === -1) ?
    res.status(400).json({
      status: 'Failed',
      message: 'Media type can either be movies or tv.'
    }) :
    next();
}

const queryOptions = ['title', 'year', 'language', 'imdbRating', 'imdbID', 'type'];
export const filterQuery = (req: Request, res: Response, next: Function) => {
  const filteredQuery: any = {};
  for (const query in req.query) {
    const lCased = query.toLowerCase();
    (typeof query) === 'string' && (queryOptions.indexOf(lCased) !== -1) && (filteredQuery[lCased] = req.query[query]);
  }
  req.query = filteredQuery;
  if (Object.entries(req.query).length === 0 && req.query.constructor === Object) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Query Fields are invalid or empty.'
    });
  }
  return next();
}

export const validateSignup = [validateUsername, validateEmail, validatePassword];
export const validateLogin = [validateEmail, validatePassword];
export const validateType = [validateParams];
