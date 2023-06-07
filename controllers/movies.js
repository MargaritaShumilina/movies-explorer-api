const Movie = require('../models/movies');
const {
  PAGE_NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
} = require('../errors');

const createMovie = (req, res, next) => {
  const { id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BAD_REQUEST('Переданы некорректные данные при создании карточки.'),
        );
      }
      return next(error);
    });
};

const getMovies = async (req, res, next) => {
  const userId = req.user.id;
  Movie.find({ owner: userId })
    .orFail(() => {
      throw new PAGE_NOT_FOUND('Фильмы не найдены');
    })
    .then((moviesList) => {
      res.send(moviesList);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BAD_REQUEST('Невалидный id'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  Movie.findById(movieId)
    .orFail(() => {
      throw new PAGE_NOT_FOUND('Карточки с указанным id не существует');
    })
    .then((movie) => {
      if (movie.owner.equals(userId)) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send({ message: 'Карточка удалена успешно' }))
          .catch(next);
        return;
      }
      throw new FORBIDDEN('Доступ запрещен!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BAD_REQUEST('Невалидный id'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
