"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const upload_1 = require("../helpers/upload");
const ApiResult_1 = require("./ApiResult");
let UploadController = class UploadController {
    saveFile(file, res) {
        return res.json(new ApiResult_1.ApiResult({}));
    }
    saveFiles(file, res) {
        return res.json(new ApiResult_1.ApiResult({}));
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/file'),
    tslib_1.__param(0, routing_controllers_1.UploadedFile('photo', { options: upload_1.upload })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], UploadController.prototype, "saveFile", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/files'),
    tslib_1.__param(0, routing_controllers_1.UploadedFiles('photos', { options: upload_1.upload })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], UploadController.prototype, "saveFiles", null);
UploadController = tslib_1.__decorate([
    routing_controllers_1.Controller('/Upload'),
    routing_controllers_1.JsonController()
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=UploadController.js.map