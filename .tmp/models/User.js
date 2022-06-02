"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, base), { name: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: [
            true,
            'Email alanı zorunludur',
        ],
        index: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Lütfen geçerli bir email adresi giriniz !',
        ],
    }, phone: {
        type: String,
        required: [true,
            'Bu alan zorunludur'],
        unique: true,
        match: [
            /^[+]*[0-9]*[ ]{0,1}[(]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[)]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[0-9]{2}[ ]{0,1}[0-9]{2}[ ]{0,1}[-\.\/]{0,1}[ ]{0,1}[0-9]{1,5}$/g,
            'Lütfen geçerli bir telefon numarası giriniz',
        ],
    }, avatar: {
        type: String,
        default: 'default.jpg',
    }, password: {
        required: true,
        type: String,
        select: false,
        minlength: 6,
    } }));
exports.UserModel = mongoose_1.model('User', schema);
//# sourceMappingURL=User.js.map