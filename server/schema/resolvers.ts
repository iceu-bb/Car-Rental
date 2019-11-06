const resolvers: any = {
  Query: {
    test: (root: any, args: any): string => {
      return args.text;
    }
  }
};

export default resolvers;
