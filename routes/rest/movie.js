const Movie = require("../../models/movie");
const User = require("../../models/user");

module.exports = {
  async randomMovie(req, res) {
    try {
      const movieCount = await Movie.countDocuments({}).exec();
      const randomIndex = Math.floor(Math.random() * movieCount);
      const movie = await Movie.find({}).limit(1).skip(randomIndex).exec();

      return res.status(200).json({
        error: false,
        movie: movie[0],
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
  async movies(req, res) {
    try {
      const movies = await Movie.find({}).exec();

      return res.status(200).json({
        error: false,
        movies,
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
  async makeFavourite(req, res) {
    try {
      const { movieId } = req.body;
      console.log(req.body);
      console.log("inMakeFav", movieId);
      const existingMovie = await Movie.findOne({ _id: movieId }).exec();
      if (existingMovie === null) {
        return res.status(400).json({
          error: true,
          reason: "No Such Movies!!",
        });
      }

      const currentUser = await User.findOne({ _id: req.auth.id }).exec();
      if (currentUser === null) {
        return res.status(200).json({
          error: true,
          reason: "No Such currentUser!!",
        });
      }

      if (currentUser.favoriteIds === undefined) {
        currentUser.favoriteIds = [existingMovie._id];
      } else {
        currentUser.favoriteIds.push(existingMovie._id);
      }

      await currentUser.save();

      return res.status(200).json({
        error: false,
        currentUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
  async removeFavourite(req, res) {
    try {
      const { movieId } = req.body;
      console.log("inremFav", movieId);
      const existingMovie = await Movie.findOne({ _id: movieId }).exec();
      if (existingMovie === null) {
        return res.status(200).json({
          error: true,
          reason: "No Such Movie!!",
        });
      }

      const currentUser = await User.findOne({ _id: req.auth.id }).exec();
      if (currentUser === null) {
        return res.status(200).json({
          error: true,
          reason: "No Such User!!",
        });
      }

      if (currentUser.favoriteIds) {
        const index = currentUser.favoriteIds.indexOf(existingMovie._id);
        if (index > -1) {
          currentUser.favoriteIds.splice(index, 1);
        } else {
          return res.status(200).json({
            error: true,
            reason: "Movie not in favorites!!",
          });
        }
      } else {
        return res.status(200).json({
          error: true,
          reason: "No favorites to remove!!",
        });
      }

      await currentUser.save();

      return res.status(200).json({
        error: false,
        currentUser,
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
  async getAllFavouriteMovies(req, res) {
    try {
      const currentUser = await User.findOne({ _id: req.auth.id }).exec();
      if (currentUser === null) {
        return res.status(200).json({
          error: true,
          reason: "No Such User!!",
        });
      }

      if (currentUser.favoriteIds && currentUser.favoriteIds.length > 0) {
        const favouriteMovies = await Movie.find({
          _id: { $in: currentUser.favoriteIds },
        }).exec();
        return res.status(200).json({
          error: false,
          favouriteMovies,
        });
      } else {
        return res.status(200).json({
          error: true,
          reason: "No favorite movies found!!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
  async getMovieById(req, res) {
    try {
      console.log(req);
      const movie = await Movie.findOne({ _id: req.params.id });
      if (movie === null) {
        return res.status(400).json({
          error: true,
          reason: "No such movie",
        });
      }

      return res.status(200).json({
        error: false,
        movie,
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
};
