"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String },
}, {
    timestamps: true,
});
exports.Cat = (0, mongoose_1.model)("Cat", schema);
//# sourceMappingURL=catmodel.js.map