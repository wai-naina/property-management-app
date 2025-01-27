const Unit = require("../models/Unit");

// Get all units
const getUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new unit
const createUnit = async (req, res) => {
  const { unitName, rentAmount } = req.body;
  try {
    const unit = new Unit({
      unitName,
      rentAmount,
      landlordId: req.user.id, // Associate the unit with the logged-in landlord
    });
    await unit.save();
    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a unit
const updateUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await Unit.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(unit);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a unit
const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await Unit.findByIdAndDelete(id);
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getUnits, createUnit, updateUnit, deleteUnit };