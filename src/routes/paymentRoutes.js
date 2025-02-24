const express = require("express");
const { getPayments, createPayment, mpesaCallback, getPaymentsByUnit } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect routes with authentication
router.use(authMiddleware(["tenant", "landlord", "admin"]));

// Define Routes BEFORE exporting router
router.get("/", getPayments);
router.post("/", authMiddleware(["tenant"]), createPayment);
router.post("/mpesa/callback", mpesaCallback);
router.get("/:unitId", getPaymentsByUnit);

module.exports = router;

