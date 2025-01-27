const Rating = require("../models/Rating");

// Get all ratings
const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new rating
const createRating = async (req, res) => {
  const { unitId, rating, review } = req.body;
  try {
    const newRating = new Rating({
      unitId,
      tenantId: req.user.id, // Associate the rating with the logged-in tenant
      rating,
      review,
    });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getRatings, createRating };