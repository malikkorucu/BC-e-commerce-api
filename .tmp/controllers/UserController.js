"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const TestMiddleware_1 = require("../middlewares/TestMiddleware");
// @JsonController Eğer bu şekilde yapılırsa class sadece JSON dosya dönebilir...
let UserController = class UserController {
    getAll(id, request, response) {
        return response.send('Hello response!');
    }
    getUsers(limit, request, response) {
        return response.status(200).json({
            malik: 'aslşdfkjasdf',
        });
    }
    getOne(id) {
        return 'This action returns user #' + id;
    }
    post(user) {
        return user;
    }
    put(id, user) {
        return 'Updating a user...';
    }
    remove(id) {
        return 'Removing user...';
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/users/:id'),
    routing_controllers_1.UseBefore(TestMiddleware_1.TestMiddleware),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/users'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/users/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "getOne", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/users'),
    tslib_1.__param(0, routing_controllers_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/users/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "put", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/users/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Object)
], UserController.prototype, "remove", null);
UserController = tslib_1.__decorate([
    routing_controllers_1.Controller(),
    routing_controllers_1.JsonController()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map