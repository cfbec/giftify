import { ExtractJwt, Strategy } from 'passport-jwt';

class JwtStrategy extends Strategy {

  constructor() {
    super(JwtStrategy.options(), JwtStrategy.verify);
  }

  static options() {
    return {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    };
  }

  static verify(payload, done) {
    if (payload) {
      return done(null, payload);
    }
    return done(new Error('Invalid token'), null);
  }
}

module.exports = JwtStrategy;
