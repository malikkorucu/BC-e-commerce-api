"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDb = exports.UserProperties = void 0;
const tslib_1 = require("tslib");
exports.UserProperties = {
    phone: {
        bsonType: 'string',
        description: 'must be a string and required',
    },
    email: {
        bsonType: 'string',
        pattern: '@mongodb/.com$',
        description: 'must be a string and match',
    },
};
const startDb = (mongoClient) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const isCollectionIncludes = yield mongoClient.listCollections().toArray().then(docs => (docs.find((item) => item.name === 'users')));
    const options = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['phone', 'email'],
                properties: exports.UserProperties,
            },
        },
    };
    if (!isCollectionIncludes) {
        mongoClient.createCollection('users', options);
    }
});
exports.startDb = startDb;
//# sourceMappingURL=startDb.js.map