import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';

import setRoutes from './routes';

dotenv.config();

export default (app) => {

  app.use(bodyParser());

  setRoutes(app);

  app.listen(process.env.PORT, () => { 
    console.log(`Server running on ${process.env.PORT}`);
  });
}
