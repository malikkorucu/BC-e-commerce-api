"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const AuthService_1 = require("../services/AuthService");
let CommentController = class CommentController {
    constructor() {
        this.service = typedi_1.default.get(AuthService_1.AuthService);
    }
    register(user, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.register(user);
            return res.json(result);
        });
    }
    login(user, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.login(user);
            return res.json(result);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/register'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommentController.prototype, "register", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommentController.prototype, "login", null);
CommentController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Comment'),
    tslib_1.__metadata("design:paramtypes", [])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map