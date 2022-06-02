"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbClient = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const express_1 = tslib_1.__importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const db_1 = tslib_1.__importDefault(require("./helpers/db"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const swagger_json_1 = tslib_1.__importDefault(require("./swagger.json"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const mongodb_1 = require("mongodb");
const startDb_1 = require("./helpers/startDb");
const PORT = process.env.PORT || 8080;
dotenv_1.default.config({
    path: './.env',
});
express_1.default().use(express_1.default.json());
express_1.default().use(express_1.default.urlencoded({ extended: true }));
express_1.default().use(cors_1.default());
const app = routing_controllers_1.createExpressServer({
    cors: {
        'origin': '*',
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': false,
        'optionsSuccessStatus': 204,
    },
    defaultErrorHandler: false,
    routePrefix: '/api',
    controllers: [path_1.default.join(__dirname + '/controllers/*ts'), path_1.default.join(__dirname + '/controllers/*js')],
    middlewares: [path_1.default.join(__dirname + '/middlewares/*.ts'), path_1.default.join(__dirname + '/middlewares/*js')],
});
app.use(express_1.default.static(__dirname + '/public'));
exports.mongodbClient = new mongodb_1.MongoClient('mongodb://localhost:27017');
const connect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.mongodbClient.connect();
        console.log('mongo ya bağlandı');
        startDb_1.startDb(exports.mongodbClient.db('beauty-center'));
    }
    catch (error) {
        console.log(error);
    }
});
connect();
// SWAGGER OPTIONS
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LogRocket Express API with Swagger',
            version: '0.1.0',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
    },
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, options));
// fonksiyonunun aldığı obje parametresi bütün controllerları tek satırda init ediyor.
db_1.default();
app.use(express_1.default.json());
app.use(body_parser_1.json());
app.listen(PORT, () => {
    console.log('server started');
});
//# sourceMappingURL=index.js.map