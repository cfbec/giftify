module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.response.body = err;
      ctx.response.status = err.status;
    } else {
      ctx.response.body = err;
      ctx.response.status = 500;
    }
  }
};
  