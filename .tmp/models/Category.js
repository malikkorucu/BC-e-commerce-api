"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
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
    }, image: {
        type: String,
        required: true,
    }, products: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ] }));
exports.CategoryModel = mongoose_1.model('Category', schema);
//# sourceMappingURL=Category.js.map