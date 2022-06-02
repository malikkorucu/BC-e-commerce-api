"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, base), { rating: {
        required: [true, 'Ürün puanlamasını girmediniz.'],
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }, content: {
        required: [true, 'Ürün içeriğini giriniz.'],
        type: String,
    }, user: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    } }));
exports.CommentModel = mongoose_1.model('Comment', schema);
//# sourceMappingURL=Comment.js.map