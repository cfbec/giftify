import Router from 'koa-router';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import validator from '../validators';
import { jwt } from '../policies/AuthenticationPolicies';

const requestValid = validator('User');
const userController = new UserController(UserService);

const router = new Router({ prefix: '/v1/users' });

router
  .get('/', jwt, userController.get)
  .get('/:id', jwt, userController.getById)
  .post('/', jwt, requestValid, userController.create)
  .put('/:id', jwt, userController.update)
  .delete('/:id', jwt, userController.delete);

module.exports = router;
