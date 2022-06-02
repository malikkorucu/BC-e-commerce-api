"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'CustomError';
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=Error.js.map