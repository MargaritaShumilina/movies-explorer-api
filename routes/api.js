const apiRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  login,
  createUser,
} = require('../controllers/api');

apiRouter.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        email: Joi.string()
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string().required(),
      })
      .unknown(false),
  }),
  createUser,
);

apiRouter.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string().required(),
      })
      .unknown(false),
  }),
  login,
);
module.exports = apiRouter;
