const Payment = require("../models/Payment");

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const { unitId, amountPaid, month } = req.body;
  try {
    const payment = new Payment({
      unitId,
      tenantId: req.user.id, // Associate the payment with the logged-in tenant
      amountPaid,
      month,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get payments for a specific unit
const getPaymentsByUnit = async (req, res) => {
  const { unitId } = req.params;
  try {
    const payments = await Payment.find({ unitId });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getPayments, createPayment, getPaymentsByUnit };