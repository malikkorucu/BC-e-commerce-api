"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorHandler = (err, req, res, next) => {
    const customError = err;
    res.status(err.status || 500).json({
        success: false,
        message: customError.message,
    });
};
exports.default = customErrorHandler;
//# sourceMappingURL=CustomErrorHandler.js.map