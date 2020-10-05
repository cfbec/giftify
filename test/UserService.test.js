import UserService from '../src/services/UserService';

describe('UserService', () => {

  let userModel;
  let mongoUtils;
  let userService;

  beforeAll(() => {
    userModel = {
      countDocuments: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    };
    mongoUtils = {
      buildOpts: jest.fn(),
    }
    userService = new UserService(userModel, mongoUtils);
  });

  describe('get Method', () => {
    it('calls userModel.countDocuments, userModel.find and returns the object', async () => {
      const mockOps = { fields: '', limit: 10, skip: 0, sort: -1 };
      mongoUtils.buildOpts.mockReturnValueOnce(mockOps)
      userModel.countDocuments.mockResolvedValue(1);
      userModel.find.mockResolvedValue(1);
      const result = await userService.get({});
      expect(mongoUtils.buildOpts).toHaveBeenCalledWith(
        {}, 
        {
          excludeFields: ['password', 'salt'],
          fieldsDefault: { password: 0, salt: 0 },
        }
      );
      expect(userModel.countDocuments).toHaveBeenCalledWith({});
      expect(userModel.find).toHaveBeenCalledWith(
        {}, 
        mockOps.fields, 
        { 
          limit: mockOps.limit, 
          skip: mockOps.skip, 
          sort: mockOps.sort 
        }
      );
      expect(result).toHaveProperty('collection', 1);
      expect(result).toHaveProperty(['pagination', 'count'], 1)
      expect(result).toHaveProperty(['pagination', 'limit'], 10)
    });
  });

  describe('getById Method', () => {
    it('calls userModel.findOne and returns the result', async () => {
      const _id = 1;
      userModel.findOne.mockResolvedValue(1);
      const result = await userService.getById(_id);
      expect(userModel.findOne).toHaveBeenCalledWith({ _id }, { password: 0, salt: 0 });
      expect(result).toEqual(1);
    });
    it('throw an error as user is not found', async () => {
      const _id = 1;
      userModel.findOne.mockResolvedValue(null);
      expect(userService.getById(_id)).rejects.toThrow(`User with id '${_id}' not found`);
    });
  });

  describe('create Method', () => {
    it('calls userModel.create and returns the result', async () => {
      const user = { 
        firstName: 'test', 
        username: 'test',
        salt: 'test',
        password: 'test',
        toObject: function() {
          return this;
        } 
      };
      userModel.create.mockResolvedValue(user);
      const result = await userService.create(user);
      expect(userModel.create).toHaveBeenCalledWith(user);
      expect(result).toHaveProperty('firstName', 'test');
      expect(result).toHaveProperty('username', 'test');
      expect(result).not.toHaveProperty('salt');
      expect(result).not.toHaveProperty('password');
    });
  });
  
  describe('updateById Method', () => {
    it('calls userModel.updateOne and returns the result', async () => {
      const _id = 1;
      const user = { 
        firstName: 'test', 
        username: 'test',
      };
      userModel.findOne.mockResolvedValue(1);
      userModel.updateOne.mockResolvedValue(user);
      const result = await userService.updateById(_id, user);
      expect(userModel.updateOne).toHaveBeenCalledWith({ _id }, { '$set': { ...user } });
      expect(result).toHaveProperty('firstName', 'test');
      expect(result).toHaveProperty('username', 'test');
    });
  });

  describe('deleteById Method', () => {
    it('calls userModel.deleteOne', async () => {
      const _id = 1;
      userModel.findOne.mockResolvedValue(1);
      await userService.deleteById(_id);
      expect(userModel.deleteOne).toHaveBeenCalledWith({ _id });
    });
  });
});