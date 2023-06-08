const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regularExp = require('../utils/constants');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().regex(regularExp).required(),
      trailerLink: Joi.string().regex(regularExp).required(),
      thumbnail: Joi.string().regex(regularExp).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
movieRouter.get('/', getMovies);
movieRouter.delete(
  '/:movieId',
  celebrate({
    params: Joi.object()
      .keys({
        movieId: Joi.string().required().length(24),
      })
      .unknown(false),
  }),
  deleteMovie,
);

module.exports = movieRouter;
