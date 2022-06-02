"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ApiResult_1 = require("../controllers/ApiResult");
const Comment_1 = require("../models/Comment");
let CommentService = class CommentService {
    constructor() {
        this.Model = Comment_1.CommentModel;
    }
    createComment(comment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const commentData = yield this.Model.create(comment);
                return new ApiResult_1.ApiResult({ message: 'Comment created', data: commentData });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
CommentService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=CommentService.js.map