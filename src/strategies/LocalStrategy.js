import { Strategy } from 'passport-local';
import httpError from 'http-errors';

const expiresIn = process.env.EXPIRES_IN || '1d';

class LocalStrategy extends Strategy {
  
  constructor(UserModel, JwtService) {
    super(LocalStrategy.options(), LocalStrategy.verify);
    this.userModel = UserModel;
    this.jwtService = JwtService;
  }

  static options() {
    return {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    };
  }

  static async verify(username, password, done) {
    try {
      let user = await this.userModel.findOne({ username });
      const isValidPassword = await user.validatePassword(password);
      
      if (!user || !isValidPassword) {
        throw new httpError(401, 'The credentials are invalids.');
      }

      user = user.toObject();
      // cleaning user object
      delete user.password;
      delete user.salt;
      delete user.__v;

      const accessToken = await this.jwtService.createToken(user, expiresIn);

      return done(null, { accessToken });
    } catch (e) {
      return done(e, null);
    }
  }
}

module.exports = LocalStrategy;
