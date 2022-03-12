import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import connectDatabase from './helpers/db';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from 'cors';
import { json } from 'body-parser';

dotenv.config({
  path: './config.env',
});

express().use(express.json());
express().use(express.urlencoded({ extended: true }));
express().use(cors());

const app = createExpressServer({
  cors: {
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
  },
  defaultErrorHandler: false,
  routePrefix: '/api',
  controllers: [path.join(__dirname + '/controllers/*.ts')],
  middlewares: [path.join(__dirname + '/middlewares/*.ts')],
});

app.use(express.static(__dirname + '/public'));

// SWAGGER OPTIONS
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LogRocket Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// fonksiyonunun aldığı obje parametresi bütün controllerları tek satırda init ediyor.
connectDatabase();
app.use(express.json());
app.use(json());

app.listen(8080, () => {
  console.log('server started');
});
