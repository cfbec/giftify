/* eslint no-underscore-dangle: 0 */
/**
 * @file UserController.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */

/**
 * @class UserController
 * @classdesc User's controller.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class UserController {

  async get(ctx) {
    const data = ctx.request.body;
    ctx.response.status = 200;
    ctx.response.body = data;
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
    console.log(data);
    ctx.response.status = 200;
    ctx.response.body = data;
  }

}

const UserCtrl = new UserController();

export default UserCtrl;
