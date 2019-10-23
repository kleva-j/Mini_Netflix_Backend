import { Request, Response } from 'express';
import services from '../services';

const { admin } = services;

export class User {
  static async registerUser(req: Request, res: Response) {
    const { email, password, username } = req.body;
    try {
      const user = await admin.auth().createUser({
        email, password, displayName: username, photoURL: process.env.IMAGEURL,
      });
      return res.status(201).json({
        success: false,
        data: user
      });
    } catch(error) {
      return res.status(400).json({
        success: false,
        data: error.message,
      }); 
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    return res.status(200).json({
      success: true,
      data: user
    });
  }
}
