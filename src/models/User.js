const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["tenant", "landlord", "admin"], required: true },
  phoneNumber: { type: String },
  idNumber: { type: String }, // For tenants
});

module.exports = mongoose.model("User", userSchema);