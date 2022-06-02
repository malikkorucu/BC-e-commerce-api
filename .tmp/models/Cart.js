"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, base), { user_id: {
        type: String,
        required: true,
    }, products: [
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
    ] }));
exports.CartModel = mongoose_1.model('Cart', schema);
//# sourceMappingURL=Cart.js.map