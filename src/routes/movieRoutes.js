const express = require("express");
const { rateMovie } = require("../controllers/movieController");

const router = express.Router();

// Route to rate a movie
router.post("/:movieId/rate", rateMovie);

module.exports = router;
