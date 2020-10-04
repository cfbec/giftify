/* eslint no-underscore-dangle: 0 */
/**
 * @file UserService.js
 * @version 1.0.0
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
import pick from 'lodash/pick';
import httpError from 'http-errors';
import MongoUtils from '../helpers/MongoUtils';
import User from '../models/User';

const ModifiableFields = [
  'firstName',
  'lastName',
  'email',
  'password',
  'username',
  'roles',
];

/**
 * @class UserService
 * @classdesc User's service.
 * @author Cristian Becerra <c.becerra.valdes@gmail.com>
 */
class UserService {

  constructor(userModel) {
    this.userModel = userModel;
  }

  get = async (query) => {
    const params = {
      excludeFields: ['password', 'salt'],
      fieldsDefault: { password: 0, salt: 0 },
    };
    const { fields, limit, skip, sort } = MongoUtils.buidOpts(query, params);
    const criteria = buildCriteria(query);
    const count = await User.countDocuments(criteria);
    const pagination = { count, limit };
    const collection = await User.find(criteria, fields, { limit, skip, sort });

    return { collection, pagination };
  }

  getById = async (_id) => {
    const criteria = { _id, $or: [{ deleted: { $exists: false } }, { deleted: false }] };
    const user = await User.findOne(criteria, { password: 0 });
    if (!user) {
      throw httpError(404, `User with id '${_id}' not found`);
    }
    return user;
  }

  create = async (data) => {
    const response = await User.create(data);
    const user = response.toObject();
    delete user.salt;
    delete user.password;
    return user; 
  }

  updateById = async (_id, data) => {
    await this.getById(_id);
    return User.updateOne({ _id }, { $set: { ...pick(data, ModifiableFields) } });
  }
  
  deleteById = async (id) => {
    await this.getById(id);
    return User.deleteOne({ _id: id });
  }

}

function buildCriteria(query = {}) {
  const { search, fromDate, toDate } = query;
  const criteria = { };
  const filterDate = [];
  if (search) {
    Object.assign(criteria, { $text: { $search: search } });
  }
  if (fromDate) {
    filterDate.push({
      createdAt: {
        $gte: moment(fromDate, 'DD-MM-YYYY').toDate(),
      },
    });
  }
  if (toDate) {
    filterDate.push({
      createdAt: {
        $lte: moment(toDate, 'DD-MM-YYYY').toDate(),
      },
    });
  }
  if (filterDate.length > 0) {
   Object.assign(criteria, { $and: filterDate });
  }
  return criteria;
}

const UserSrv = new UserService(User);

export default UserSrv;
