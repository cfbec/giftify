import requireAll from 'require-all';
import path from 'path';

const pathSchemas = requireAll(
  path.join(__dirname, './schemas'),
);

module.exports = (Schema) => {
  const schema = pathSchemas[Schema];
  return async (ctx, next) => {
    try {
      await schema.validateAsync(ctx.request.body);
      next();
    }
    catch (err) { 
      console.log(err);
      ctx.response.status = 422;
      ctx.response.body = {
        status: 'error',
        message: 'Invalid request data',
        data: ctx.response.body
      };
    }
  };
};
