module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    if (err.status || err.name === 'MongoError') {
      // MongoError handle others code, for example E11000 duplicate key (schema constraints). 
      // For all these types of error only conflict error (409) is indicated
      ctx.response.status = err.status || 409;
      ctx.response.body = {
        status: ctx.response.status,
        message: err.message,
      };
    } else {
      ctx.response.body = err;
      ctx.response.status = 500;
    }
  }
};
  