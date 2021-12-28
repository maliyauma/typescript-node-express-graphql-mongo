
import { Cat, ICat } from './../model/catmodel';
import {HydratedDocument } from 'mongoose';

export const catResolvers = {
  Query: {
    hello: () => "hi",
    cats: async() => {
    const cats=await Cat.find()
    console.log("catsc acts cats========== ",cats)
    return cats
    }
  },
  Mutation: {
    createCat: async (_, { name }) => {
      const kitty: HydratedDocument<ICat> = new Cat({ name });
      await kitty.save();
      return kitty;
    }
  }
};
