"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
// import { CustomError } from 'src/helpers/Error';
const Category_1 = require("../models/Category");
const typedi_1 = require("typedi");
const ApiResult_1 = require("../controllers/ApiResult");
const Error_1 = require("../helpers/Error");
let CategoryService = class CategoryService {
    constructor() {
        this.Model = Category_1.CategoryModel;
    }
    createCategory(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isIncludesInDb = yield this.Model.findOne({ title: category.title });
                if (isIncludesInDb) {
                    throw new Error_1.CustomError('Bu alan veritabanında mevcut !', 400);
                }
                const result = yield this.Model.create(category);
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCategories(category_ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Model.deleteMany({ _id: { $in: category_ids } });
                return new ApiResult_1.ApiResult('Silme işlemi başarılı');
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCategory(categoryId, category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Model.findOneAndUpdate({ _id: categoryId }, category, { new: true }); // prettier-ignore
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategories() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Model.find({}).populate('products');
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProductToCategory(product, category_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.Model.updateOne({ _id: category_id }, {
                    $push: {
                        products: product,
                    },
                });
                return new ApiResult_1.ApiResult(result);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
CategoryService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map