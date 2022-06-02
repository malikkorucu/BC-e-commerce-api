"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const CartService_1 = require("../services/CartService");
let CartController = class CartController {
    constructor() {
        this.service = typedi_1.default.get(CartService_1.CartService);
    }
    getCart(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll(req.user);
            return res.json(result);
        });
    }
    addProductToCart(body, res, req, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.addProductToCart(body.product_id, req.user);
            return res.json(result);
        });
    }
    deleteCartItem(res, id, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.deleteProductFromCart(id, req.user);
            return res.json(result);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/cart'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "addProductToCart", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/cart/:id'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Param('id')), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItem", null);
CartController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Cart'),
    tslib_1.__metadata("design:paramtypes", [])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=CartController.js.map