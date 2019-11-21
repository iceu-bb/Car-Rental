import Car from '../models/car';
import User from '../models/user';
import Booking, { IBooking } from '../models/booking';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../env';
import { ObjectId } from 'mongodb';
import moment from 'moment';

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
    },

    userBookings: async (root: any, { email }: any): Promise<any> => {
      let bookings;

      // Find user bookings(by unique email)in DB
      try {
        bookings = await Booking.find({
          email
        });
      } catch (error) {
        console.log(error);
        throw new Error('We have problem with finding your bookings');
      }

      const activeBookings: IBooking[] = [];
      const cancelledBookings: IBooking[] = [];
      const upcomingBookings: IBooking[] = [];
      const currentBookings: IBooking[] = [];
      const pastBookings: IBooking[] = [];

      // decide if booking active or not
      bookings.map(booking =>
        booking.status === 'active'
          ? activeBookings.push(booking)
          : cancelledBookings.push(booking)
      );

      const today = Date.now() / 1000;

      // decide if is past, current or upcoming booking
      activeBookings.map(booking => {
        const returnDateInSeconds =
          Number(moment(booking.returnDay, 'DD-MM-YYYY').format('X')) +
          Number(moment.duration(booking.returnHour).asSeconds());

        const startDateInSeconds =
          Number(moment(booking.startDay, 'DD-MM-YYYY').format('X')) +
          Number(moment.duration(booking.startHour).asSeconds());

        if (returnDateInSeconds < today) {
          pastBookings.push(booking);
        } else {
          if (startDateInSeconds < today) {
            currentBookings.push(booking);
          } else {
            upcomingBookings.push(booking);
          }
        }
      });

      // accountStatus, rentals, and moneySpend ,calculation from past bookings

      const rentals = pastBookings.length;
      const moneySpend = pastBookings.reduce(
        (acc, curr) => acc + curr.total,
        0
      );

      /* acountStatus
        standard
        classic: rentals> 5 && moneySpend > 150 000 ISK
        premium: rentals> 10 && moneySpend > 400 000 ISK

      */
      let accountStatus: 'standard' | 'classic' | 'premium' = 'standard';

      if (rentals >= 5 && moneySpend >= 150000) accountStatus = 'classic';

      if (rentals >= 10 && moneySpend >= 400000) accountStatus = 'premium';

      // -10 --> 'you reach maximum level'
      const rentalsToNextUpgrade =
        accountStatus === 'standard'
          ? 5 - rentals
          : accountStatus === 'classic'
          ? 10 - rentals
          : -10;

      // -10 --> 'you reach maximum level'
      const moneySpendToNextUpgrade =
        accountStatus === 'standard'
          ? 150000 - moneySpend
          : accountStatus === 'classic'
          ? 400000 - moneySpend
          : -10;

      return {
        upcomingBookings,
        currentBookings,
        pastBookings,
        cancelledBookings,
        accountStatus,
        rentals,
        rentalsToNextUpgrade,
        moneySpend,
        moneySpendToNextUpgrade
      };
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

    register: async (root: any, { input }: any): Promise<any> => {
      // validate here

      const { email, password, confirmPassword } = input;

      // 1) Check if user exists
      const user = await User.findOne({ email });
      if (user) {
        throw Error('There is account registered with this email');
      }

      // 2) Hash password and create user account
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUser = await new User({
        email,
        password: hashedPassword
      }).save();
      console.log('usre created', newUser);

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
      const user = await User.findOne({ _id: id }).select('+password');
      if (!user) {
        throw new Error(
          `Sorry we have problem to authenticate your account in system. Try again `
        );
      }

      const matchPasswords = bcrypt.compareSync(currentPassword, user.password);

      if (!matchPasswords) {
        throw new Error('Current Password is incorrect');
      }

      // 4) hash new Password and update password
      const hashedPassword = bcrypt.hashSync(
        newPassword,
        bcrypt.genSaltSync(10)
      );

      try {
        await User.findByIdAndUpdate(id, { password: hashedPassword });
      } catch (error) {
        throw new Error('We encouter problem to update your password.');
      }

      return true;
    },

    checkBookingDateForm: async (root: any, { input }: any): Promise<any> => {
      const { startDay, startHour, returnDay, returnHour, renterAge } = input;

      // check fields
      if (!startDay || !startHour || !returnDay || !returnHour) {
        return { error: 'Please select all dates' };
      }
      if (!renterAge) return { error: "Please select the driver's age" };

      //check valid type (regex)
      const testRegexStartDay = /^\d{2}\-\d{2}\-\d{4}$/.test(startDay);
      const testRegexStartHour = /^\d{2}\:\d{2}$/.test(startHour);
      const testRegexReturnDay = /^\d{2}\-\d{2}\-\d{4}$/.test(returnDay);
      const testRegexReturnHour = /^\d{2}\:\d{2}$/.test(returnHour);
      if (!testRegexStartDay)
        return { error: 'You type wrong format for Pickup Date' };
      if (!testRegexStartHour)
        return { error: 'You type wrong format for Pickup Time' };
      if (!testRegexReturnDay)
        return { error: 'You type wrong format for Return Date' };
      if (!testRegexReturnHour)
        return { error: 'You type wrong format for Return Time' };

      // CONSTANTS
      const tomorrow = moment().add(1, 'days');
      const yearForward = moment().add(1, 'years');
      const formattedStartDay = moment(startDay, 'DD-MM-YYYY').format();
      const formattedReturnDay = moment(returnDay, 'DD-MM-YYYY').format();

      // check if Return Day is not lesser than Start Day
      if (
        moment(formattedStartDay).format('X') >
        moment(formattedReturnDay).format('X')
      ) {
        return {
          error: 'Return date cannot be before Pickup Date'
        };
      }

      // check if booking is not within 24h
      if (
        Number(moment(tomorrow).format('X')) >
        Number(moment(formattedStartDay).format('X')) +
          Number(moment.duration(startHour).asSeconds())
      ) {
        return {
          error: 'We are sorry but you cannot reserve car within 24h from now'
        };
      }

      //check min anx max days if not exceeded
      if (
        moment(formattedStartDay).isAfter(yearForward) ||
        moment(formattedReturnDay).isAfter(yearForward)
      ) {
        return {
          error:
            'We are sorry but you cannot reserve car after a 1 year from now. Please call us to make an agreement'
        };
      }

      // check if it is the same day
      if (
        moment(formattedStartDay).diff(moment(formattedReturnDay), 'days') == 0
      ) {
        // check if hours are ok
        if (
          Number(moment.duration(startHour).asSeconds()) >
          Number(moment.duration(returnHour).asSeconds())
        ) {
          return {
            error: 'Please check the time of booking'
          };
        }

        //check if it is not below 1 hr
        if (
          Number(moment.duration(returnHour).asSeconds()) -
            Number(moment.duration(startHour).asSeconds()) <
          3601
        ) {
          return {
            error:
              'We are sorry but you cannot reserve a car for less than 1 hour'
          };
        }
      }

      //---- COUNT DAYS------

      let days = Number(
        moment(formattedReturnDay).diff(moment(formattedStartDay), 'days')
      );
      // check if booking is longer that 50days
      if (days > 49) {
        return {
          error:
            'If you are booking a car longer than 50 days, please call our service to reserve a car and get special discount'
        };
      }

      // returnTime should be lesser than startTime  -if no add 1day
      if (
        Number(moment.duration(startHour).asSeconds()) <
        Number(moment.duration(returnHour).asSeconds())
      ) {
        days++;
      }

      return { days };
    },
    createBooking: async (root: any, { input }: any): Promise<any> => {
      const {
        car,
        firstName,
        lastName,
        email,
        telephoneNumber,
        bookingDate: {
          startDay,
          startHour,
          returnDay,
          returnHour,
          renterAge,
          days,
          airlineCode,
          flightNumber
        },
        totalDays,
        extras
      } = input;

      let newBooking;

      try {
        newBooking = await new Booking({
          car,
          firstName,
          lastName,
          email,
          telephoneNumber,
          startDay,
          startHour,
          returnDay,
          returnHour,
          renterAge,
          days,
          totalDays,
          airlineCode,
          flightNumber,
          extras
        }).save();
      } catch (error) {
        console.log(error);
      }

      return newBooking;
    }
  }
};

export default resolvers;
