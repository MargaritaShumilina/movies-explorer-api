const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const {
  updateUserData,
  getMyProfile,
} = require('../controllers/users');

userRouter.get('/me', getMyProfile);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string()
          .required()
          .email({ tlds: { allow: false } }),
      })
      .unknown(false),
  }),
  updateUserData,
);

// userRouter.get(
//   '/:userId',
//   celebrate({
//     params: Joi.object()
//       .keys({
//         userId: Joi.string().required().length(24),
//       })
//       .unknown(false),
//   }),
//   getFiltredUser,
// );

// userRouter.patch(
//   '/me/avatar',
//   celebrate({
//     body: Joi.object()
//       .keys({
//         avatar: Joi.string()
//           .required()
//           .custom(validateUrl, 'custom validate url'),
//       })
//       .unknown(false),
//   }),
//   updateUserAvatar,
// );

module.exports = userRouter;
