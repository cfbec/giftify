import Router from 'koa-router';
import UserController from '../controllers/UserController';
import validator from '../validators';

const requestValid = validator('User');

const router = new Router({ prefix: '/v1/users' });

router
  .get('/', UserController.get)
  .get('/detail', UserController.getDetails)
  .post('/', requestValid, UserController.create)

module.exports = router;
