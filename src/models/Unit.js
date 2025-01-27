const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unitName: { type: String, required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rentAmount: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
});

module.exports = mongoose.model("Unit", unitSchema);