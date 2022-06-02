"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let TestMiddleware = class TestMiddleware {
    use(req, res, next) {
        next();
    }
};
TestMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], TestMiddleware);
exports.TestMiddleware = TestMiddleware;
//# sourceMappingURL=TestMiddleware.js.map