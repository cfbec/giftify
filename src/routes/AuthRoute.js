import Router from 'koa-router';
import UserService from '../services/UserService';
import AuthController from '../controllers/AuthController';
import AuthPolicy from '../policies/AuthenticationPolicies';

const authController = new AuthController(UserService);
const localAuth = AuthPolicy.localAuth
const router = new Router({ prefix: '/v1/auth' });

router
  .post('/signin', localAuth, authController.signIn);

module.exports = router;
