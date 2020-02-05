const joi = require("@hapi/joi");

const registerValidation = (data) => {
  const Schema = {
    name: joi.string().required(),
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .required()
  };
  return joi.validate(data, Schema);
};

const LoginValidation = (data) => {
    const Schema = {
      
      email: joi
        .string()
        .min(6)
        .required()
        .email(),
      password: joi
        .string()
        .min(6)
        .required()
    };
    return joi.validate(data, Schema);
  };

module.exports.registerValidation = registerValidation ;
module.exports.LoginValidation = LoginValidation ;