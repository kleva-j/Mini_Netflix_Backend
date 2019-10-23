import * as express from 'express';
import { User } from '../controllers';
import { validateLogin, validateSignup, returnValidationErrors } from '../middlewares/validation';

const userRoute = express.Router();
const { registerUser, loginUser } = User;

userRoute.route('/signup')
  .post(validateSignup, returnValidationErrors, registerUser);

userRoute.route('/login')
  .post(validateLogin, returnValidationErrors, loginUser);

export default userRoute;
