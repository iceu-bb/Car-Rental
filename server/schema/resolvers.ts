import Car from '../models/car';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../env';

const authenticated = (next: any) => (
  root: any,
  args: any,
  ctx: any,
  info: any
) => {
  if (!ctx.decodedToken) {
    throw new Error('You must be logged in');
  }
  return next(root, args, ctx, info);
};

const resolvers: any = {
  Query: {
    me: authenticated(
      async (
        root: any,
        args: any,
        { decodedToken: { userId } }: any
      ): Promise<any> => {
        const user = await User.findOne({ _id: userId });
        return user;
      }
    ),

    cars: async () => {
      const cars = await Car.find({});
      return cars;
    }
  },
  Mutation: {
    addCar: async (root: any, { input }: any): Promise<any> => {
      let newCar;
      try {
        newCar = await new Car({
          ...input
        }).save();
      } catch (error) {
        console.log(error);
        throw new Error('Can not create new car');
      }
      return newCar;
    },

    login: async (
      root: any,
      { email, password }: any,
      { res }: any
    ): Promise<any> => {
      // 1) Check if user with provided email exists
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw Error(`There is no user registered with email: ${email}`);
      }

      // 2) Check if provided password matches with password stored in db
      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new Error('Password is incorrect!');
      }

      // 3) generate Token
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: '7d'
      });

      return { token };
    },

    signup: async (root: any, { input }: any): Promise<any> => {
      // validate here
      const { name, email, password, confirmPassword, picture } = input;
      // 1) Check if user exists
      const user = await User.findOne({ email });
      if (user) {
        throw Error('There is account registered with this email');
      }
      // 2) Hash password and create user account
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        picture
      }).save();
      console.log('usre created', newUser);

      return newUser;
    }
  }
};

export default resolvers;
