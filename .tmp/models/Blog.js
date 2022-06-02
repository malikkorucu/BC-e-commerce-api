"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, base), { title: {
        type: String,
        required: true,
    }, text: {
        type: String,
        required: true,
    } }));
exports.BlogModel = mongoose_1.model('Blog', schema);
//# sourceMappingURL=Blog.js.map