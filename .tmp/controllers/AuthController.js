"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const AuthService_1 = require("../services/AuthService");
let AuthController = class AuthController {
    constructor() {
        this.service = typedi_1.default.get(AuthService_1.AuthService);
    }
    register(user, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.register(user);
            return res.json(result);
        });
    }
    testFunction(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return res.send('this is test function');
        });
    }
    login(user, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.login(user);
            return res.json(result);
        });
    }
    getUsers(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getUsers();
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
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/test'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "testFunction", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/getUsers'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
AuthController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/Auth'),
    tslib_1.__metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map