module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.response.body = err;
    ctx.response.status = 500;
  }
};
  