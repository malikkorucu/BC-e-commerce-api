"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class MetaService {
    constructor(model) {
        this.DbModel = model;
    }
    createMetaData(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const total_count = yield this.DbModel.countDocuments();
            const pages = Math.ceil(total_count / Number(params.limit));
            const page = Number(params.skip) / Number(params.limit) + 1;
            return {
                pages,
                page,
                total_count,
            };
        });
    }
}
exports.default = MetaService;
//# sourceMappingURL=MetaService.js.map