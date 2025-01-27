const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rating", ratingSchema);