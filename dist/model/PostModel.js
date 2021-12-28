"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String },
    desc: { type: String },
}, {
    timestamps: true
});
exports.Post = (0, mongoose_1.model)('Post', schema);
//# sourceMappingURL=PostModel.js.map