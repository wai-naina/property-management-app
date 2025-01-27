const express = require("express");
const { getComplaints, createComplaint, updateComplaint } = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect routes with authentication
router.use(authMiddleware(["tenant", "landlord", "admin"]));

// Routes for complaints
router.get("/", getComplaints);
router.post("/", authMiddleware(["tenant"]), createComplaint);
router.put("/:id", authMiddleware(["landlord", "admin"]), updateComplaint);

module.exports = router;