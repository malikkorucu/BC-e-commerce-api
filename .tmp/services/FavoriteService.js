"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ApiResult_1 = require("../controllers/ApiResult");
const Favorite_1 = require("../models/Favorite");
const Error_1 = require("../helpers/Error");
let FavoriteService = class FavoriteService {
    constructor() {
        this.Model = Favorite_1.FavoriteModel;
    }
    create(favoriteProduct, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dbData = {
                    user_id: user.id,
                    product: favoriteProduct.product,
                };
                const isInclude = yield this.Model.findOne({
                    user_id: user.id,
                    product: favoriteProduct.product,
                });
                if (isInclude) {
                    throw new Error_1.CustomError('Product already in favorites', 400);
                }
                const result = yield this.Model.create(dbData);
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Model.find({ user_id: userId })
                    .select('-user_id')
                    .populate('product');
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteByProductId(productIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Model.deleteMany({
                    _id: {
                        $in: productIds,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error_1.CustomError('Id is required', 400);
                }
                yield this.Model.findOneAndDelete({ product: id });
                return new ApiResult_1.ApiResult(undefined);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
FavoriteService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=FavoriteService.js.map