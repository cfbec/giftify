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
    const { query } = ctx.request;
    const { collection, pagination } = await UserService.get(query);
		ctx.response.set('X-Pagination-Total-Count', pagination.count);
	  ctx.response.set('X-Pagination-Limit', pagination.limit);
		ctx.response.status = 200;
		ctx.response.body = collection;
  }

  async getById(ctx) {
    const { id } = ctx.params;
    const response = await UserService.getById(id)
    ctx.response.status = 200;
    ctx.response.body = response;
  }

  async create(ctx) {
    const data = ctx.request.body;
    const response = await UserService.create(data);
    ctx.response.status = 201;
    ctx.response.body = response;
  }

  async update(ctx) {
    const data = ctx.request.body;
    const { id } = ctx.params;
    await UserService.updateById(id, data);
    ctx.response.status = 204;
  }

  async delete(ctx) {
    const { id } = ctx.params;
    await UserService.deleteById(id);
    ctx.response.status = 204;
  }

}

const UserCtrl = new UserController();

module.exports = UserCtrl;
