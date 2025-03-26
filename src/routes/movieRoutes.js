const express = require("express");
const { getMovies, rateMovie, reviewMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);
router.post("/:movieId/rate", rateMovie);
router.post("/:movieId/review", reviewMovie);

module.exports = router;