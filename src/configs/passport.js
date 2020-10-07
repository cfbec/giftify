import passport from 'passport';

import UserModel from '../models/User';
import JwtService from '../services/JwtService';

import localStrategy from '../strategies/LocalStrategy';
import JwtStrategy from '../strategies/JwtStrategy';

module.exports = () => {
  passport.use(new localStrategy(UserModel, JwtService));
  passport.use(new JwtStrategy());
}
