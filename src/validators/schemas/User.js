import Joi from 'joi';

const genericName = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();

module.exports = Joi.object({
  firstName: genericName,
  lastName: genericName,
  email: Joi.string().email(),
  username: genericName,
  password: Joi.string().
    pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  birthday: Joi.date().max('1-1-2002'),
});
