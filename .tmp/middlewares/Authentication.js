"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const Error_1 = require("../helpers/Error");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
// Authentication middleware
let AuthenticationMiddleware = class AuthenticationMiddleware {
    use(request, response, next) {
        const nonSecurePaths = ['/api/Auth/login', '/api/Auth/register', '/api/upload', '/api/Product/testDb'];
        const headers = request.headers;
        const { authorization } = headers;
        if (nonSecurePaths.includes(request.path) || !request.path.startsWith('/api/')) {
            return next();
        }
        if (!authorization) {
            return next(new Error_1.CustomError('Bu adrese ulaşmak için yetkiniz bulunmamaktadır.', 401));
        }
        else {
            const token = authorization.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return next(new Error_1.CustomError('Bu adrese ulaşmak için yetkiniz bulunmamaktadır.', 401));
                }
                request.user = decoded;
            });
        }
        next();
    }
};
AuthenticationMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=Authentication.js.map