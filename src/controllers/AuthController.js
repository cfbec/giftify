/* eslint no-underscore-dangle: 0 */
/**
 * @file AuthController.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */

import UserModel from '../models/User';
import MongoUtil from '../helpers/MongoUtils';

/**
 * @class AuthController
 * @classdesc Auth's controller.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class AuthController {

  constructor(userService) {
    this.userServices = new userService(UserModel, MongoUtil);
  }

  signIn = async (ctx) => {
    const { accessToken } = ctx.state.data;
    ctx.response.status = 200;
    ctx.response.body = { accessToken };
  }

}

module.exports = AuthController;
