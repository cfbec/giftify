import passport from 'koa-passport';
import httpError from 'http-errors';

class AuthenticationPolicies {

  localAuth = async (ctx, next) => {
    const cb = async (err, accessToken, missingCredentials) => {
      if (missingCredentials) {
        throw new httpError(401, 'You have missing some credentials fields.');
      } else if (err) {
        throw new httpError(401, 'The credentials are invalids.');
      }
      ctx.state.data = accessToken;
      await next();
    };
    return passport.authenticate('local', cb)(ctx, next);
  }

  jwt = async (ctx, next) => {
    const cb = async (internalErr, user, tokenError) => {
      if (tokenError && tokenError.name === 'TokenExpiredError') {
        throw new httpError(401, 'The Authentication token has expired');
      }
      if (tokenError && tokenError.name === 'JsonWebTokenError') {
        throw new httpError(401, 'The Authentication token is invalid or was vulnerated');
      }
      if (tokenError) {
        throw new httpError(401, 'Invalid token, Format is Authorization: Bearer [token]');
      }
      if (internalErr) {
        throw new httpError(500, 'Internal Error');
      }
      ctx.state.user = user;
      await next();
    };
    return passport.authenticate('jwt', cb)(ctx, next);
  }
}

const policy = new AuthenticationPolicies();

module.exports = policy;
