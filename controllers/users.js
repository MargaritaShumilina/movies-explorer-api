const User = require('../models/users');
const {
  PAGE_NOT_FOUND,
  BAD_REQUEST,
} = require('../errors');

const getMyProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return next(new PAGE_NOT_FOUND('Пользователь не найден'));
      }
      const { name, email } = user;
      return res.send({ name, email });
    })
    .catch((err) => next(err));
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new PAGE_NOT_FOUND('Пользователь не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Ошибка данных'));
      }
      return next(err);
    });
};

module.exports = {
  updateUserData,
  getMyProfile,
};
