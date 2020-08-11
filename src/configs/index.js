import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import error from './error';

import setRoutes from './routes';
import database from './db';

dotenv.config();

export default async (app) => {

  await database();
  
  app.use(bodyParser());
  app.use(error());

  setRoutes(app);

  app.listen(process.env.PORT, () => { 
    console.log(`Server running on ${process.env.PORT}`);
  });
}
