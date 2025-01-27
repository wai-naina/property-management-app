const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);