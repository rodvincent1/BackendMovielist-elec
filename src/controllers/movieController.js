const Movie = require("../models/Movie");

const rateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId, rating } = req.body;

    if (!userId || !rating) {
      return res.status(400).json({ message: "User ID and rating required" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if user already rated the movie
    const existingRating = movie.ratings.find((r) => r.user.toString() === userId);
    if (existingRating) {
      existingRating.rating = rating; // Update rating
    } else {
      movie.ratings.push({ user: userId, rating });
    }

    // Recalculate the average rating
    const totalRatings = movie.ratings.reduce((acc, r) => acc + r.rating, 0);
    movie.averageRating = totalRatings / movie.ratings.length;

    await movie.save();

    return res.status(200).json({ message: "Rating submitted", movie });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { rateMovie };
