"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResult = void 0;
class ApiResult {
    constructor(data, meta) {
        this.code = 200;
        this.status = true;
        this.message = 'Operation was successed !';
        this.data = data;
        this.meta = meta;
    }
}
exports.ApiResult = ApiResult;
//# sourceMappingURL=ApiResult.js.map