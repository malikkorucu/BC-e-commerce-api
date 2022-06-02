"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSyncPass = exports.checkPhoneNumber = exports.checkEmail = exports.checkPasswordMatch = exports.hashCode = exports.sendTokenToClient = exports.generateToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const generateToken = (user) => {
    const { SECRET_KEY, EXPIRES_IN } = process.env;
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
    });
    return token;
};
exports.generateToken = generateToken;
const sendTokenToClient = (user) => {
    const { EXPIRES_IN } = process.env;
    const token = exports.generateToken(user);
    // tslint:disable-next-line: radix
    const expireDate = new Date(Date.now() + parseInt(EXPIRES_IN)).toUTCString();
    return { access_token: token, expireDate, expiresIn: EXPIRES_IN };
};
exports.sendTokenToClient = sendTokenToClient;
const hashCode = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
exports.hashCode = hashCode;
const checkPasswordMatch = (p1, p2) => p1 === p2;
exports.checkPasswordMatch = checkPasswordMatch;
const checkEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.checkEmail = checkEmail;
const checkPhoneNumber = (tel) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(tel);
};
exports.checkPhoneNumber = checkPhoneNumber;
const compareSyncPass = (pass, hashPass) => {
    return bcryptjs_1.default.compareSync(pass, hashPass);
};
exports.compareSyncPass = compareSyncPass;
//# sourceMappingURL=auth.js.map