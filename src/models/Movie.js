const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseDate: Date,
    ratings: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: Number,
        },
    ],
    averageRating: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            comment: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
