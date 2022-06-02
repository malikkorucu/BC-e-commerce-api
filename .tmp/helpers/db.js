"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const connectDatabase = () => {
    mongoose_1.default
        .connect(process.env.DBKEY, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log('mongo db baglantısı başarılı');
    });
};
exports.default = connectDatabase;
//# sourceMappingURL=db.js.map