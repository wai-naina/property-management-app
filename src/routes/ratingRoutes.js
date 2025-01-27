const express = require("express");
const { getRatings, createRating } = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect routes with authentication
router.use(authMiddleware(["tenant", "landlord", "admin"]));

// Routes for ratings
router.get("/", getRatings);
router.post("/", authMiddleware(["tenant"]), createRating);

module.exports = router;