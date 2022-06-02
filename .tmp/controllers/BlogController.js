"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const BlogService_1 = require("../services/BlogService");
const ApiResult_1 = require("./ApiResult");
let BlogController = class BlogController {
    constructor(blogService = typedi_1.default.get(BlogService_1.BlogService)) {
        this.blogService = blogService;
    }
    register(blog, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.blogService.createBlog(blog);
            return res.json(new ApiResult_1.ApiResult(data));
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/blog'),
    tslib_1.__param(0, routing_controllers_1.Body()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "register", null);
BlogController = tslib_1.__decorate([
    routing_controllers_1.Controller(),
    routing_controllers_1.JsonController(),
    tslib_1.__metadata("design:paramtypes", [BlogService_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=BlogController.js.map