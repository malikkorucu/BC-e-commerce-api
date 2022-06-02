"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
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
        required: [true, 'Ürün başlığı zorunlu bir alandır.'],
        unique: [true, 'Bu ürün ismi zaten mevcut, lütfen farklı bir başlık giriniz.'],
    }, price: {
        type: Number,
        required: [true, 'Ürün fiyatı zorunlu bir alandır.'],
    }, description: {
        type: String,
        required: [true, 'Ürün açıklaması zorunlu bir alandır.'],
    }, price_with_discount: {
        type: Number,
        required: [true, 'Ürün fiyatı zorunlu bir alandır.'],
    }, other_images: {
        type: [String],
        default: [],
    }, image: {
        type: String,
        default: 'default_product_img.jpg',
    }, is_favorite: {
        type: Boolean,
        default: false,
    }, category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    } }), {
    timestamps: true,
    versionKey: false,
    autoIndex: true,
});
schema.index({ title: 'text', description: 'text' });
exports.ProductModel = mongoose_1.model('Product', schema);
//# sourceMappingURL=Product.js.map