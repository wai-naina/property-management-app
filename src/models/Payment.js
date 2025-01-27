const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  month: { type: String, required: true }, // e.g., "October 2023"
});

module.exports = mongoose.model("Payment", paymentSchema);