/* eslint no-underscore-dangle: 0 */
/**
 * @file UserController.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */

import UserModel from '../models/User';
import MongoUtil from '../helpers/MongoUtils';

/**
 * @class UserController
 * @classdesc User's controller.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class UserController {

  constructor(userService) {
    this.userServices = new userService(UserModel, MongoUtil);
  }

  get = async (ctx) => {
    const { query } = ctx.request;
    const { collection, pagination } = await this.userServices.get(query);
		ctx.response.set('X-Pagination-Total-Count', pagination.count);
	  ctx.response.set('X-Pagination-Limit', pagination.limit);
		ctx.response.status = 200;
		ctx.response.body = collection;
  }

  getById = async (ctx) => {
    const { id } = ctx.params;
    const response = await this.userServices.getById(id)
    ctx.response.status = 200;
    ctx.response.body = response;
  }

  create = async (ctx) => {
    const data = ctx.request.body;
    const response = await this.userServices.create(data);
    ctx.response.status = 201;
    ctx.response.body = response;
  }

  update = async (ctx) => {
    const data = ctx.request.body;
    const { id } = ctx.params;
    await this.userServices.updateById(id, data);
    ctx.response.status = 204;
  }

  delete = async (ctx) => {
    const { id } = ctx.params;
    await this.userServices.deleteById(id);
    ctx.response.status = 204;
  }

}

module.exports = UserController;
