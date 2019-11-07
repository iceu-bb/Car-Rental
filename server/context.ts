import { Response } from 'express';
import { IUser } from './models/user';

export type MyContext = {
  decodedToken: {
    userId: string;
  };
};
