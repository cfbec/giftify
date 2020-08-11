/* eslint no-underscore-dangle: 0 */
/**
 * @file UserService.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */

import User from '../models/User';

/**
 * @class UserService
 * @classdesc User's service.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class UserService {

  async create(data) {
    const user = await User.create(data);
    return user; 
  }

}

const UserSrv = new UserService();

export default UserSrv;
