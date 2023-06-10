const router = require('express').Router();
const movieRouter = require('./movies');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const {
  PAGE_NOT_FOUND,
} = require('../errors');

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use((req, res, next) => {
  next(new PAGE_NOT_FOUND('Not Found'));
});
module.exports = router;
