"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const FavoriteService_1 = require("../services/FavoriteService");
let AuthController = class AuthController {
    constructor() {
        this.service = typedi_1.default.get(FavoriteService_1.FavoriteService);
    }
    addToFavorites(favoriteProduct, res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.create(favoriteProduct, req.user);
            return res.json(result);
        });
    }
    getFavorites(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll(req.user.id);
            return res.json(result);
        });
    }
    deleteFavorite(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.delete(id);
            return res.json(result);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/favorite'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "addToFavorites", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/favorites'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "getFavorites", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/favorite/:id'),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "deleteFavorite", null);
AuthController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Favorite'),
    tslib_1.__metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=FavoriteController.js.map