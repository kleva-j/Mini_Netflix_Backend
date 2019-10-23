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
  .withMessage('No spaces are allowed in the username.')

export const validateSignup = [validateUsername, validateEmail, validatePassword];
export const validateLogin = [validateEmail, validatePassword];