/* eslint no-underscore-dangle: 0 */
/**
 * @file UserController.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */

import UserService from '../services/UserService';

/**
 * @class UserController
 * @classdesc User's controller.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class UserController {

  async get(ctx) {
    const data = ctx.request.body;
    ctx.response.status = 200;
    ctx.response.body = { };
  }

  async getDetails(ctx) {
    const data = ctx.request.body;
    console.log(data);
    ctx.response.status = 200;
    ctx.response.body = { 
      details: {
        name: 'random',
        type: 'other type'
      }
    };
  }

  async create(ctx) {
    const data = ctx.request.body;
    const response = await UserService.create(data);
    ctx.response.status = 200;
    ctx.response.body = response;
  }

}

const UserCtrl = new UserController();

module.exports = UserCtrl;
