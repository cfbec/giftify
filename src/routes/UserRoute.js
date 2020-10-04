import Router from 'koa-router';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import validator from '../validators';

const requestValid = validator('User');
const userController = new UserController(UserService);

const router = new Router({ prefix: '/v1/users' });

router
  .get('/', userController.get)
  .get('/:id', userController.getById)
  .post('/', requestValid, userController.create)
  .put('/:id', userController.update)
  .delete('/:id', userController.delete);

module.exports = router;
