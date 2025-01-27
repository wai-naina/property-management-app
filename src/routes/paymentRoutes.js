const express = require("express");
const { getPayments, createPayment, getPaymentsByUnit } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect routes with authentication
router.use(authMiddleware(["tenant", "landlord", "admin"]));

// Routes for payments
router.get("/", getPayments);
router.post("/", authMiddleware(["tenant"]), createPayment);
router.get("/:unitId", getPaymentsByUnit);

module.exports = router;