import Router from 'koa-router';
import UserService from '../services/UserService';
import AuthController from '../controllers/AuthController';
import { localAuth } from '../policies/AuthenticationPolicies';

const authController = new AuthController(UserService);
const router = new Router({ prefix: '/v1/auth' });

router
  .post('/signin', localAuth, authController.signIn);

module.exports = router;
