const express = require("express");
const register = require("../rest/register");
const login = require("../rest/login");
const user = require("../rest/user");
const movie = require("../rest/movie");
const { expressjwt: expressJwt } = require("express-jwt");

const router = express.Router();

const checkJwt = expressJwt({
  secret: "surajsuperstart",
  algorithms: ["HS256"],
});

router.post("/register", register.post);
router.post("/login", login.post);

router.all("*", checkJwt);
router.get("/me", user.get);
router.get("/randomMovies", movie.randomMovie);
router.get("/movies", movie.movies);
router.post("/makefavourite", movie.makeFavourite);
router.post("/removefavourite", movie.removeFavourite);
router.get("/allfavouritesmovie", movie.getAllFavouriteMovies);
router.get("/movie/:id", movie.getMovieById);
module.exports = router;
