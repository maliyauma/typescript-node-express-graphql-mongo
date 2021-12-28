"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('Users', schema);
//# sourceMappingURL=UserModel.js.map