"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDataFields = void 0;
const checkDataFields = (data, dataModel) => {
    const modelKeys = Object.keys(dataModel);
    for (let key in data) {
        if (!modelKeys.includes(key)) {
            return false;
        }
    }
    return true;
};
exports.checkDataFields = checkDataFields;
//# sourceMappingURL=checkDataFields.js.map