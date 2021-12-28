"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const UserModel_1 = require("../model/UserModel");
exports.UserResolver = {
    Query: {
        defaultUser: () => {
            return "am the captain now";
        },
        users: async () => {
            const users = await UserModel_1.User.find();
            return users;
        }
    },
    Mutation: {
        createUser: async (parent, { name, email }) => {
            console.log("new user args ####", parent);
            const user = new UserModel_1.User({ name, email });
            await user.save().then((p) => console.log("create user response ========", p))
                .catch((p) => console.log("error response ========", p));
            return user;
        }
    }
};
//# sourceMappingURL=UserResolver.js.map