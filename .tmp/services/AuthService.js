"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const User_1 = require("../models/User");
const typedi_1 = require("typedi");
const ApiResult_1 = require("../controllers/ApiResult");
const auth_1 = require("../helpers/auth");
const Error_1 = require("../helpers/Error");
let AuthService = class AuthService {
    constructor() {
        this.Model = User_1.UserModel;
    }
    register(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isPassMatched = auth_1.checkPasswordMatch(user.password, user.re_password);
                if (!isPassMatched) {
                    throw new Error_1.CustomError('parolalar eşleşmiyor', 400);
                }
                const data = yield this.Model.create(Object.assign(Object.assign({}, user), { password: auth_1.hashCode(user.password) }));
                const returnData = yield this.Model.findOne({ _id: data._id });
                return new ApiResult_1.ApiResult(returnData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dbUser = yield this.Model.findOne({ email: user.email }).select('+password');
                if (!dbUser) {
                    throw new Error_1.CustomError('Böyle bir kullanıcı bulunmamaktadır', 401);
                }
                else {
                    if (!auth_1.compareSyncPass(user.password, dbUser.password)) {
                        throw new Error_1.CustomError('Lütfen parolanızı kontrol ediniz', 400);
                    }
                }
                return new ApiResult_1.ApiResult({ user: dbUser, token: auth_1.sendTokenToClient(dbUser) });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Model.find();
                return new ApiResult_1.ApiResult(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
AuthService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map