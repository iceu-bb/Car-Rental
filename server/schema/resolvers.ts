import Car from '../models/car';

const resolvers: any = {
  Query: {
    test: (root: any, args: any): string => {
      return args.text;
    },
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
    }
  }
};

export default resolvers;
