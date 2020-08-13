import Router from 'koa-router';
import UserController from '../controllers/UserController';
import validator from '../validators';

const requestValid = validator('User');

const router = new Router({ prefix: '/v1/users' });

router
  .get('/', UserController.get)
  .get('/:id', UserController.getById)
  .post('/', requestValid, UserController.create)
  .put('/:id', UserController.update)
  .delete('/:id', UserController.delete);

module.exports = router;
