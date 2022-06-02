"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Blog_1 = require("../models/Blog");
let BlogService = class BlogService {
    createBlog(blog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield Blog_1.BlogModel.create(blog);
        });
    }
};
BlogService = tslib_1.__decorate([
    typedi_1.Service()
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=BlogService.js.map