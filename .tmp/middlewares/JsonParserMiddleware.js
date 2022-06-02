"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonBodyParserMiddleware = void 0;
const tslib_1 = require("tslib");
const body_parser_1 = require("body-parser");
const routing_controllers_1 = require("routing-controllers");
let JsonBodyParserMiddleware = class JsonBodyParserMiddleware {
    use(request, response, next) {
        return body_parser_1.json()(request, response, next);
    }
};
JsonBodyParserMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before', priority: 2 })
], JsonBodyParserMiddleware);
exports.JsonBodyParserMiddleware = JsonBodyParserMiddleware;
//# sourceMappingURL=JsonParserMiddleware.js.map