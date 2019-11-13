import Car from "../models/car";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../env";
import { ObjectId } from "mongodb";

const authenticated = (next: any) => (
  root: any,
  args: any,
  ctx: any,
  info: any
) => {
  if (!ctx.decodedToken) {
    throw new Error("You must be logged in");
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

    car: async (
      root: any,
      { input: { name, transmission } }: any
    ): Promise<any> => {
      const car = await Car.findOne({ name, transmission });
      return car;
    },

    cars: async () => {
      const cars = await Car.find({});
      return cars;
    },

    relatedCars: async (root: any, { id, group }: any): Promise<any> => {
      let cars;

      // B => C ; increment letter in Ascii and return to String
      const incrementedGroup = String.fromCharCode(group.charCodeAt(0) + 1);

      try {
        // find all cars from car group (except current selected car) and upper group
        cars = await Car.find({
          $or: [
            {
              group: group,
              _id: { $ne: new ObjectId(id) }
            },
            { group: incrementedGroup }
          ]
        });
      } catch (error) {
        console.log(error);
      }

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
        throw new Error("Can not create new car");
      }
      return newCar;
    },

    login: async (
      root: any,
      { email, password }: any,
      { res }: any
    ): Promise<any> => {
      // 1) Check if user with provided email exists
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw Error(`There is no user registered with email: ${email}`);
      }

      // 2) Check if provided password matches with password stored in db
      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new Error("Password is incorrect!");
      }

      // 3) generate Token
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "7d"
      });

      return { token };
    },

    register: async (root: any, { input }: any): Promise<any> => {
      // validate here

      const { email, password, confirmPassword } = input;

      // 1) Check if user exists
      const user = await User.findOne({ email });
      if (user) {
        throw Error("There is account registered with this email");
      }

      // 2) Hash password and create user account
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUser = await new User({
        email,
        password: hashedPassword
      }).save();
      console.log("usre created", newUser);

      return newUser;
    },

    updateUserData: async (root: any, { input }: any): Promise<any> => {
      const { id, ...rest } = input;
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { ...rest },
          { new: true }
        );

        console.log(updatedUser);
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },

    updateUserPassword: async (
      root: any,
      { id, newPassword, newPasswordConfirm, currentPassword }: any
    ): Promise<any> => {
      // 1) validate if passwords equal
      if (newPassword !== newPasswordConfirm) {
        throw new Error(`Given Passwords are not equal`);
      }

      // 2) check if currentPassword is correct
      const user = await User.findOne({ _id: id }).select("+password");
      if (!user) {
        throw new Error(
          `Sorry we have problem to authenticate your account in system. Try again `
        );
      }

      const matchPasswords = bcrypt.compareSync(currentPassword, user.password);

      if (!matchPasswords) {
        throw new Error("Current Password is incorrect");
      }

      // 4) hash new Password and update password
      const hashedPassword = bcrypt.hashSync(
        newPassword,
        bcrypt.genSaltSync(10)
      );

      try {
        await User.findByIdAndUpdate(id, { password: hashedPassword });
      } catch (error) {
        throw new Error("We encouter problem to update your password.");
      }

      return true;
    }
  }
};

export default resolvers;
