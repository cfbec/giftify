import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import error from './error';

import setRoutes from './routes';
import configPassport from './passport';
import database from './db';

dotenv.config();

export default async (app) => {

  await database();

  app.use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
      exposedHeaders: ['X-Pagination-Total-Count', 'X-Pagination-Limit']
    })
  );

  app.use(bodyParser());
  app.use(error());
  
  configPassport();
  
  setRoutes(app);

  app.listen(process.env.PORT, () => { 
    console.log(`Server running on ${process.env.PORT}`);
  });
}
