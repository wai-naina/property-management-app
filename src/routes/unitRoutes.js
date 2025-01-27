const express = require("express");
const { getUnits, createUnit, updateUnit, deleteUnit } = require("../controllers/unitController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect all routes with authentication and role-based access
router.use(authMiddleware(["landlord", "admin"]));

// Routes for units
router.get("/", getUnits);
router.post("/", createUnit);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);

module.exports = router;