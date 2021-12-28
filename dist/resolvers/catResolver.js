"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catResolvers = void 0;
const catmodel_1 = require("./../model/catmodel");
exports.catResolvers = {
    Query: {
        hello: () => "hi",
        cats: async () => {
            const cats = await catmodel_1.Cat.find();
            console.log("catsc acts cats========== ", cats);
            return cats;
        }
    },
    Mutation: {
        createCat: async (_, { name }) => {
            const kitty = new catmodel_1.Cat({ name });
            await kitty.save();
            return kitty;
        }
    }
};
//# sourceMappingURL=catResolver.js.map