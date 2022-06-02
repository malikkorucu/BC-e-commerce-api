"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../services/ProductService");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const upload_1 = require("../helpers/upload");
const Error_1 = require("./../helpers/Error");
const checkDataFields_1 = require("./../utility/checkDataFields");
const startDb_1 = require("../../src/helpers/startDb");
let ProductController = class ProductController {
    constructor() {
        this.service = typedi_1.default.get(ProductService_1.ProductService);
    }
    getProducts(res, req, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.getProducts(req.user, params);
            return res.json(data);
        });
    }
    getProductsByCategory(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.getProductsByCategory(req.user);
            return res.json(data);
        });
    }
    getProduct(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.getProduct(id);
            return res.json(data);
        });
    }
    addProduct(product, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.createProduct(product);
            return res.json(data);
        });
    }
    updateProduct(product, id, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.updateProduct(id, product);
            return res.json(data);
        });
    }
    testProduct(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = req.db;
                const data = {
                    phone: '42323423',
                    email: 'asdflkjl',
                };
                const check = checkDataFields_1.checkDataFields(data, startDb_1.UserProperties);
                if (!check) {
                    throw new Error_1.CustomError('test', 400);
                }
                const result = yield db.collection('users').insertOne(data);
                return res.json({ data: result });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProduct(res, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.deleteProduct(query.productIds);
            return res.json(data);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/products'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/productsByCategory'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByCategory", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/product/:id'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/product'),
    routing_controllers_1.UseBefore(upload_1.upload.fields([{ name: 'image', maxCount: 5 }, { name: 'other_images', maxCount: 5 }])),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/product/:id'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Param('id')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/testDb'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "testProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/product'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Product'),
    tslib_1.__metadata("design:paramtypes", [])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map