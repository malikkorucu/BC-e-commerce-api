import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import connectDatabase from './helpers/db';
import dotenv from 'dotenv';
import { AuthenticationMiddleware } from './middlewares/Authentication';
import path from 'path';
import { CustomErrorHandler } from './middlewares/ErrorHandler';

dotenv.config();

express().use(express.json());
express().use(express.urlencoded({ extended: true }));

const app = createExpressServer({
  defaultErrorHandler: false,
  routePrefix: '/api',
  controllers: [path.join(__dirname + '/controllers/*.ts')],
  middlewares: [AuthenticationMiddleware, CustomErrorHandler],
});

// fonksiyonunun aldığı obje parametresi bütün controllerları tek satırda init ediyor.
connectDatabase();
app.use(express.json());

app.listen(3500, () => {
  console.log('server started');
});
