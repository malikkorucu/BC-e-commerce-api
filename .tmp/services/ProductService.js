"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = tslib_1.__importStar(require("typedi"));
const Product_1 = require("../models/Product");
const ApiResult_1 = require("../controllers/ApiResult");
const FavoriteService_1 = require("./FavoriteService");
const CommentService_1 = require("./CommentService");
const Product_2 = require("../repository/Product");
const MetaService_1 = tslib_1.__importDefault(require("../utility/MetaService"));
let ProductService = class ProductService extends MetaService_1.default {
    constructor() {
        super(Product_1.ProductModel);
        this.favoriteService = typedi_1.default.get(FavoriteService_1.FavoriteService);
        this.commentService = typedi_1.default.get(CommentService_1.CommentService);
        this.Model = Product_1.ProductModel;
    }
    //#region CreateProduct
    createProduct(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = yield this.Model.create(product);
                return new ApiResult_1.ApiResult(createdProduct);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region GetProducts
    getProducts(user, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.Model.aggregate(Product_2.getProductsQuery({ user, params }));
                const data = products.length > 0 ? products[0].data : [];
                const meta = products.length > 0 ? products[0].meta : {};
                return new ApiResult_1.ApiResult(data, meta);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region GetProdcutsByCategory
    getProductsByCategory(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const equalsProductIdAndUser = [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    // prettier-ignore
                                    { $eq: ['$$product_id', '$product'] },
                                    { $eq: ['$user_id', user.id] },
                                ],
                            },
                        },
                    },
                ];
                const result = yield this.Model.aggregate()
                    .lookup({
                    from: 'favorites',
                    let: { product_id: '$_id' },
                    as: 'is_favorite',
                    pipeline: equalsProductIdAndUser,
                })
                    .addFields({
                    is_favorite: {
                        $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true],
                    },
                })
                    .group({ _id: '$category', data: { $push: '$$ROOT' } })
                    .project({ _id: 0, category: '$_id', products: '$data' })
                    .lookup({
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                })
                    .unwind({ path: '$category' });
                //.project({
                //  category: {
                //    _id: '$category._id',
                //    title: '$category.title',
                //    image: '$category.image',
                //    text: '$category.text',
                //  },
                //  products: 1,
                //})
                //.limit(10)
                //.sort({ category: 1 });
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region GetProduct
    getProduct(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dbProduct = yield this.Model.findOne({ _id: id });
                return new ApiResult_1.ApiResult(dbProduct);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region DeleteProduct
    deleteProduct(productIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Model.deleteMany({
                    _id: {
                        $in: productIds,
                    },
                });
                yield this.favoriteService.deleteByProductId(productIds);
                return new ApiResult_1.ApiResult({ message: 'Product deleted' });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region UpdateProduct
    updateProduct(id, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.Model.findOneAndUpdate({ _id: id }, product, { new: true });
                return new ApiResult_1.ApiResult(updatedProduct);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //#endregion
    //#region AddComment
    addCommentToProduct(comment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.commentService.createComment(comment);
                return new ApiResult_1.ApiResult({ message: 'Product deleted' });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
ProductService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductService);
exports.ProductService = ProductService;
//#endregion
//# sourceMappingURL=ProductService.js.map