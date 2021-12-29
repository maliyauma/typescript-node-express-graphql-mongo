"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolver = void 0;
const Test_1 = require("../entities/Test");
const type_graphql_1 = require("type-graphql");
const Test_2 = require("../entities/Test");
const types_1 = require("../types");
const NEWUSER = "NEW_USER_ADDED";
let TestResolver = class TestResolver {
    async users() {
        const users = await Test_2.UserModel.find({});
        return users;
    }
    async createUser(input, publish) {
        const user = new Test_2.UserModel({
            name: input.name,
            email: input.email,
        });
        await user.save().then(async (e) => {
            await publish(e);
        });
        return user;
    }
    userAdded({ id, name, email }) {
        return { id, name, email };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Test_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Test_1.User),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.PubSub)(NEWUSER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UserInput, Function]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Subscription)({ topics: NEWUSER }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Test_1.User)
], TestResolver.prototype, "userAdded", null);
TestResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => Test_1.User)
], TestResolver);
exports.TestResolver = TestResolver;
//# sourceMappingURL=TestResolver.js.map