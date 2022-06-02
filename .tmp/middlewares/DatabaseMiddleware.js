"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const index_1 = require("../index");
let DatabaseMiddleware = class DatabaseMiddleware {
    use(request, response, next) {
        request.db = index_1.mongodbClient.db('beauty-center');
        next();
    }
};
DatabaseMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], DatabaseMiddleware);
exports.DatabaseMiddleware = DatabaseMiddleware;
//# sourceMappingURL=DatabaseMiddleware.js.map