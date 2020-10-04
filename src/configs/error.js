module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = err;
    ctx.response.status = 500;
  }
};
  