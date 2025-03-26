const Movie = require("../models/Movie");

// ✅ Fetch Movies
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Rate a Movie
const rateMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { userId, rating } = req.body;

        if (!userId || rating === undefined) {
            return res.status(400).json({ message: "User ID and rating are required" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.ratings.push({ user: userId, rating });

        // Calculate new average rating
        const totalRatings = movie.ratings.reduce((sum, r) => sum + r.rating, 0);
        movie.averageRating = totalRatings / movie.ratings.length;

        await movie.save();
        res.json({ message: "Rating added", movie });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Add a Review
const reviewMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { userId, comment } = req.body;

        if (!userId || !comment) {
            return res.status(400).json({ message: "User ID and comment are required" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.reviews.push({ user: userId, comment });
        await movie.save();

        res.json({ message: "Review added", movie });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Export functions
module.exports = { getMovies, rateMovie, reviewMovie };