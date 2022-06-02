"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Cart_1 = require("../models/Cart");
const ApiResult_1 = require("../controllers/ApiResult");
const Error_1 = require("../helpers/Error");
let CartService = class CartService {
    constructor() {
        this.Model = Cart_1.CartModel;
    }
    // #region AddProductToCart
    addProductToCart(productId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!productId) {
                    throw new Error_1.CustomError('Lütfen ürün seçiniz.', 400);
                }
                const is_cart_created = yield this.Model.findOne({ user_id: user.id }).countDocuments();
                if (is_cart_created > 0) {
                    const is_there_in_products = yield this.Model.findOne({
                        $and: [
                            { user_id: user.id },
                            { products: { $in: [productId] } },
                        ],
                    }).countDocuments();
                    if (is_there_in_products > 0) {
                        throw new Error_1.CustomError('Zaten bu ürünü favorilerinize eklediniz.', 400);
                    }
                    yield this.Model.updateOne({ user_id: user.id }, { $push: { products: productId } });
                }
                else {
                    yield this.Model.create({ user_id: user.id, products: [productId] });
                }
                return new ApiResult_1.ApiResult({ code: 200, message: 'Ürün başarıyla sepete eklendi.' });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    // #region RemoveProductFromCart
    deleteProductFromCart(productId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const is_cart_created = yield this.Model.findOne({ user_id: user.id });
                if (!is_cart_created) {
                    throw new Error_1.CustomError('Sepetiniz bulunmamaktadır.', 400);
                }
                yield this.Model.updateOne({ user_id: user.id }, { $pull: { products: productId } });
                return new ApiResult_1.ApiResult({ code: 200, message: 'Ürün başarıyla sepetten çıkarıldı.' });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // #endregion
    // #region GetCart
    getAll(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Model.findOne({ user_id: user.id })
                    .populate({
                    path: 'products',
                    options: {
                        sort: { createdAt: -1 },
                        skip: 0,
                        limit: 1,
                    },
                });
                return new ApiResult_1.ApiResult(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // #endregion
    // #region DeleteProductFromCart
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Model.deleteOne({ _id: id });
                return new ApiResult_1.ApiResult(undefined);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
CartService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=CartService.js.map