import Joi from 'joi';

module.exports = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
  .required(),
  email: Joi.string().email(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().
    pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  birthday: Joi.date().max('1-1-2002'),
});