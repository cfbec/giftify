import passport from 'passport';

import UserModel from '../models/User';
import JwtService from '../services/JwtService';

import LocalStrategy from '../strategies/LocalStrategy';
import JwtStrategy from '../strategies/JwtStrategy';

module.exports = () => {
  passport.use(new LocalStrategy(UserModel, JwtService));
  passport.use(new JwtStrategy());
}
