"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const dbErrors_1 = require("../helpers/dbErrors");
let CustomErrorHandler = class CustomErrorHandler {
    error(error, request, response, next) {
        const error_name = error.name !== 'MongoError' ? error.name : error.code;
        let message = undefined;
        let validation_fields = undefined;
        let status = error.status || 500;
        switch (error_name) {
            case dbErrors_1.DbErrors.DUPLICATE_KEY:
                validation_fields = [...Object.keys(error.keyPattern)];
                message = 'Lütfen ilgili alanları tekrar kontrol ediniz.';
                status = 400;
                break;
            case dbErrors_1.DbErrors.DUPLICATE_KEY_2:
                validation_fields = [...Object.keys(error.keyPattern)];
                message = 'Lütfen ilgili alanları tekrar kontrol ediniz.';
                status = 400;
                break;
            case dbErrors_1.DbErrors.VALIDATION_ERROR:
                const returnData = [];
                const obj = error.errors;
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        returnData.push({ name: key, message: obj[key].message });
                    }
                }
                validation_fields = returnData;
                status = 400;
                break;
            default:
                message = error.message;
                break;
        }
        return next(response.status(status).json({
            status: false,
            message,
            validation_fields,
            code: status,
        }));
    }
};
CustomErrorHandler = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], CustomErrorHandler);
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map