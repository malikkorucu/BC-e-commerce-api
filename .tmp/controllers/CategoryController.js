"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const CategoryService_1 = require("../services/CategoryService");
const upload_1 = require("../helpers/upload");
let CategoryController = class CategoryController {
    constructor() {
        this.service = typedi_1.default.get(CategoryService_1.CategoryService);
    }
    createCategory(category, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.createCategory(category);
            return res.json(result);
        });
    }
    getCategories(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getCategories();
            return res.json(result);
        });
    }
    addProductToCategory(body, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { product_id, category_id } = body;
            const result = yield this.service.addProductToCategory(product_id, category_id);
            return res.json(result);
        });
    }
    updateCategory(category_id, category, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.updateCategory(category_id, category);
            return res.json(result);
        });
    }
    deleteCategories(res, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.deleteCategories(query.categoryIds);
            return res.json(result);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/category'),
    routing_controllers_1.UseBefore(upload_1.upload.single('image')),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/categories'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategories", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/addProduct'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "addProductToCategory", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/updateCategory/:categoryId'),
    routing_controllers_1.UseBefore(upload_1.upload.single('image')),
    tslib_1.__param(0, routing_controllers_1.Param('categoryId')), tslib_1.__param(1, routing_controllers_1.Body()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/deleteCategory'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategories", null);
CategoryController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Category'),
    tslib_1.__metadata("design:paramtypes", [])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map